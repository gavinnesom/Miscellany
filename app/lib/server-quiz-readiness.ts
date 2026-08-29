import type { ServerAuth } from "./server-auth";

type ReadinessRow = {
  user_id: string;
  entry_slug: string;
  is_ready: boolean;
};

const readinessTable = "miscellany_quiz_entry_readiness";

function supabaseUrl(): string {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function supabaseApiKey(): string {
  return process.env.SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? "";
}

function readinessUrl(pathAndQuery: string) {
  const base = supabaseUrl().replace(/\/+$/, "");
  if (!base) throw new Error("Supabase URL is not configured.");
  return `${base}/rest/v1/${pathAndQuery}`;
}

async function readinessRequest<T>(auth: ServerAuth, pathAndQuery: string, init: RequestInit = {}): Promise<T> {
  const apiKey = supabaseApiKey();
  if (!apiKey) throw new Error("Supabase API key is not configured.");

  const response = await fetch(readinessUrl(pathAndQuery), {
    ...init,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = await response.json().catch(() => undefined);
  if (!response.ok) {
    const message = body && typeof body === "object" && "message" in body
      ? String((body as { message?: unknown }).message)
      : "Quiz readiness request failed.";
    throw new Error(message);
  }
  return body as T;
}

export async function getReadyEntrySlugs(auth: ServerAuth): Promise<Set<string>> {
  const query = [
    `${readinessTable}?select=entry_slug,is_ready`,
    `user_id=eq.${encodeURIComponent(auth.userId)}`,
    "is_ready=is.true",
  ].join("&");
  const rows = await readinessRequest<Pick<ReadinessRow, "entry_slug" | "is_ready">[]>(auth, query);
  return new Set(rows.filter((row) => row.is_ready).map((row) => row.entry_slug));
}

export async function setEntryReadiness(auth: ServerAuth, updates: Array<{ entrySlug: string; isReady: boolean }>) {
  if (!updates.length) return getReadyEntrySlugs(auth);
  const now = new Date().toISOString();
  const rows: ReadinessRow[] = updates.map((update) => ({
    user_id: auth.userId,
    entry_slug: update.entrySlug,
    is_ready: update.isReady,
  }));
  const query = `${readinessTable}?on_conflict=user_id,entry_slug`;
  await readinessRequest(auth, query, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows.map((row) => ({ ...row, updated_at: now }))),
  });
  return getReadyEntrySlugs(auth);
}
