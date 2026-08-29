export type ServerAuth = {
  accessToken: string;
  userId: string;
};

export type ServerAuthFailure = "missing-configuration" | "missing-token" | "invalid-session" | "not-allowed";
export type ServerAuthResult = { auth: ServerAuth; failure: null } | { auth: null; failure: ServerAuthFailure };

type SupabaseUser = {
  id?: unknown;
};

function supabaseUrl(): string {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function supabaseApiKey(): string {
  return process.env.SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? "";
}

function ownerUserId() {
  return process.env.MISCELLANY_OWNER_USER_ID?.trim() ?? "";
}

export function hasServerAuthConfig() {
  return Boolean(supabaseUrl() && supabaseApiKey() && ownerUserId());
}

export async function requireServerAuth(request: Request): Promise<ServerAuth | null> {
  return (await authenticateServerRequest(request)).auth;
}

export async function authenticateServerRequest(request: Request): Promise<ServerAuthResult> {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!hasServerAuthConfig()) return { auth: null, failure: "missing-configuration" };
  if (!match) return { auth: null, failure: "missing-token" };

  const response = await fetch(`${supabaseUrl().replace(/\/+$/, "")}/auth/v1/user`, {
    headers: {
      apikey: supabaseApiKey(),
      Authorization: `Bearer ${match[1]}`,
    },
  });
  if (!response.ok) return { auth: null, failure: "invalid-session" };

  const user = await response.json().catch(() => ({})) as SupabaseUser;
  const userId = typeof user.id === "string" ? user.id : "";

  if (!userId) return { auth: null, failure: "invalid-session" };
  if (userId !== ownerUserId()) return { auth: null, failure: "not-allowed" };
  return { auth: { accessToken: match[1], userId }, failure: null };
}

export function serverAuthFailureResponse(failure: ServerAuthFailure, action: string): { body: { error: string }; status: number; headers: Record<string, string> } {
  if (failure === "missing-configuration") {
    return { body: { error: "Server authentication is not configured." }, status: 503, headers: {} as Record<string, string> };
  }
  if (failure === "not-allowed") return { body: { error: "This account is not allowed to use Miscellany." }, status: 403, headers: {} as Record<string, string> };
  if (failure === "invalid-session") {
    return { body: { error: `Your session is invalid. Sign in again to ${action}.` }, status: 401, headers: { "x-miscellany-session-invalid": "true" } };
  }
  return { body: { error: `Sign in to ${action}.` }, status: 401, headers: {} as Record<string, string> };
}
