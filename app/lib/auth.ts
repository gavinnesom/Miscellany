"use client";

import { createClient, type AuthChangeEvent, type Session, type SupabaseClient } from "@supabase/supabase-js";

export type AuthLifecycle = "initializing" | "authenticated" | "anonymous" | "expired";

export type AuthSession = {
  email: string;
  accessToken: string;
};

export type AuthState = {
  status: AuthLifecycle;
  session: AuthSession | null;
  message: string;
};

export class SessionExpiredError extends Error {
  constructor(message = "Your session expired - please sign in again.") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

let client: SupabaseClient | null = null;
const refreshCoordinator = createSingleFlight<AuthSession>();

function supabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function supabasePublishableKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
}

export function hasAuthConfig(): boolean {
  return Boolean(supabaseUrl() && supabasePublishableKey());
}

export function getSupabaseClient(): SupabaseClient {
  if (!hasAuthConfig()) throw new Error("Supabase sign-in is not configured.");
  if (!client) {
    client = createClient(supabaseUrl(), supabasePublishableKey(), {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
        storageKey: "miscellany-supabase-auth",
      },
    });
  }
  return client;
}

export async function getInitialAuthState(): Promise<AuthState> {
  if (!hasAuthConfig()) return { status: "anonymous", session: null, message: "Sign-in unavailable" };

  const { data, error } = await getSupabaseClient().auth.getSession();
  if (error) {
    return { status: "anonymous", session: null, message: "Sign-in unavailable. Try again in a moment." };
  }

  return sessionToAuthState(data.session);
}

export async function signInWithPassword(email: string, password: string): Promise<AuthSession> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
  if (error || !data.session) throw new Error(error?.message ?? "Unable to sign in");

  const session = toAuthSession(data.session);
  if (!session) throw new Error("Supabase did not return a usable session.");
  return session;
}

export async function clearStoredSession() {
  if (!hasAuthConfig()) return;
  await getSupabaseClient().auth.signOut();
}

export function subscribeToAuthChanges(callback: (state: AuthState, event: AuthChangeEvent) => void) {
  const { data } = getSupabaseClient().auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      callback({ status: "anonymous", session: null, message: "" }, event);
      return;
    }

    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
      callback(sessionToAuthState(session), event);
    }
  });

  return () => data.subscription.unsubscribe();
}

export async function refreshAuthSession(failedAccessToken?: string): Promise<AuthSession> {
  return refreshCoordinator.run(async () => {
    const supabase = getSupabaseClient();
    const { data: currentData, error: currentError } = await supabase.auth.getSession();
    const currentSession = toAuthSession(currentData.session);
    if (!currentError && currentSession && currentSession.accessToken !== failedAccessToken) {
      return currentSession;
    }

    const { data, error } = await supabase.auth.refreshSession();
    const session = toAuthSession(data.session);
    if (!error && session) return session;

    if (isDefinitiveSessionFailure(error, data.session)) {
      await clearStoredSession();
      throw new SessionExpiredError();
    }

    throw new Error("Your session could not be refreshed. Please try again in a moment.");
  });
}

export async function fetchWithSessionRefresh(session: AuthSession, input: RequestInfo | URL, init: RequestInit = {}) {
  const first = await fetchWithToken(input, init, session.accessToken);
  if (!shouldRefreshSessionForResponse(first)) return first;

  const refreshed = await refreshAuthSession(session.accessToken);
  return fetchWithToken(input, init, refreshed.accessToken);
}

export function shouldRefreshSessionForResponse(response: Pick<Response, "status" | "headers">): boolean {
  return response.status === 401 && response.headers.get("x-miscellany-session-invalid") === "true";
}

export function createSingleFlight<T>() {
  let inFlight: Promise<T> | null = null;

  return {
    run(work: () => Promise<T>): Promise<T> {
      if (!inFlight) {
        inFlight = work().finally(() => {
          inFlight = null;
        });
      }
      return inFlight;
    },
  };
}

function fetchWithToken(input: RequestInfo | URL, init: RequestInit, accessToken: string) {
  return fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
  });
}

function sessionToAuthState(session: Session | null): AuthState {
  const authSession = toAuthSession(session);
  return authSession
    ? { status: "authenticated", session: authSession, message: "" }
    : { status: "anonymous", session: null, message: "" };
}

function toAuthSession(session: Session | null): AuthSession | null {
  const email = session?.user?.email;
  const accessToken = session?.access_token;
  if (!email || !accessToken) return null;
  return { email, accessToken };
}

export function isDefinitiveSessionFailure(error: unknown, session: Session | null) {
  if (session) return false;
  if (!error || typeof error !== "object" || !("status" in error)) return false;
  const status = Number((error as { status?: unknown }).status);
  return status === 400 || status === 401;
}
