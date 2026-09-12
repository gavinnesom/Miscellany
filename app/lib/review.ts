import type { Entry } from "./content.ts";
import type { ServerAuth } from "./server-auth";

export type ReviewAuth = ServerAuth;

export type ReviewRequest = {
  id: string;
  entry: string;
  entry_title: string;
  created: string;
  updated: string;
  selected_text: string;
  message: string;
};

export type ReviewSummary = {
  available: boolean;
  total: number;
  pending: ReviewRequest[];
};

export type ReviewExport = {
  exported_at: string;
  format: "miscellany-editorial-review-queue/v1";
  total: number;
  pending: ReviewRequest[];
};

export type CreateReviewInput = {
  entry: string;
  entryTitle?: string;
  message?: string;
  selectedText?: string;
};

type ReviewRow = {
  id: string;
  user_id: string;
  entry_slug: string;
  entry_title: string;
  message: string | null;
  selected_text: string | null;
  created_at: string;
  updated_at: string;
};

const reviewTable = "miscellany_editorial_reviews";
function supabaseUrl(): string {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function supabaseApiKey(): string {
  return process.env.SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? "";
}

function reviewUnavailable(): ReviewSummary {
  return { available: false, total: 0, pending: [] };
}

function cleanSingleLine(value: unknown, fallback = "") {
  return (typeof value === "string" ? value : fallback)
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
}

function cleanBody(value: unknown) {
  return (typeof value === "string" ? value : "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim()
    .slice(0, 4000);
}

export function isReviewCapable(auth?: ReviewAuth | null) {
  return Boolean(auth && supabaseUrl() && supabaseApiKey());
}

function reviewUrl(pathAndQuery: string) {
  const base = supabaseUrl().replace(/\/+$/, "");
  if (!base) throw new Error("Supabase URL is not configured.");
  return `${base}/rest/v1/${pathAndQuery}`;
}

async function reviewRequest<T>(auth: ReviewAuth, pathAndQuery: string, init: RequestInit = {}): Promise<T> {
  const apiKey = supabaseApiKey();
  if (!apiKey) throw new Error("Supabase API key is not configured.");

  const response = await fetch(reviewUrl(pathAndQuery), {
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
      : "Review request failed.";
    throw new Error(message);
  }

  return body as T;
}

function rowToRequest(row: ReviewRow): ReviewRequest {
  return {
    id: row.id,
    entry: row.entry_slug,
    entry_title: row.entry_title,
    created: row.created_at,
    updated: row.updated_at,
    selected_text: row.selected_text ?? "",
    message: row.message ?? "",
  };
}

export async function getReviewSummary(auth?: ReviewAuth | null): Promise<ReviewSummary> {
  if (!auth || !supabaseUrl() || !supabaseApiKey()) return reviewUnavailable();

  const query = [
    `${reviewTable}?select=id,user_id,entry_slug,entry_title,message,selected_text,created_at,updated_at`,
    `user_id=eq.${encodeURIComponent(auth.userId)}`,
    "order=updated_at.desc",
  ].join("&");
  const rows = await reviewRequest<ReviewRow[]>(auth, query);
  const pending = rows.map(rowToRequest);

  return {
    available: true,
    total: pending.length,
    pending,
  };
}

export async function getReviewExport(auth?: ReviewAuth | null, exportedAt = new Date().toISOString()): Promise<ReviewExport | null> {
  const summary = await getReviewSummary(auth);
  if (!summary.available) return null;

  return {
    exported_at: exportedAt,
    format: "miscellany-editorial-review-queue/v1",
    total: summary.total,
    pending: summary.pending,
  };
}

export async function createReviewRequest(auth: ReviewAuth, input: CreateReviewInput, entryLookup: Map<string, Entry>) {
  if (!isReviewCapable(auth)) {
    throw new Error("Review requires Gavin sign-in and Supabase configuration.");
  }

  const entrySlug = cleanSingleLine(input.entry).toLowerCase();
  const entry = entryLookup.get(entrySlug);
  if (!entry) throw new Error("Unknown entry.");

  const now = new Date().toISOString();
  const payload = {
    user_id: auth.userId,
    entry_slug: entry.slug,
    entry_title: cleanSingleLine(input.entryTitle, entry.title) || entry.title,
    message: cleanBody(input.message),
    selected_text: cleanBody(input.selectedText),
    updated_at: now,
  };
  const query = `${reviewTable}?on_conflict=user_id,entry_slug&select=id,user_id,entry_slug,entry_title,message,selected_text,created_at,updated_at`;
  const rows = await reviewRequest<ReviewRow[]>(auth, query, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(payload),
  });

  return rowToRequest(rows[0] ?? {
    id: entry.slug,
    user_id: auth.userId,
    entry_slug: entry.slug,
    entry_title: payload.entry_title,
    message: payload.message,
    selected_text: payload.selected_text,
    created_at: now,
    updated_at: now,
  });
}

export async function removeReviewRequest(auth: ReviewAuth, entrySlug: string, entryLookup?: Map<string, Entry>) {
  if (!isReviewCapable(auth)) {
    throw new Error("Review requires Gavin sign-in and Supabase configuration.");
  }

  const cleanSlug = cleanSingleLine(entrySlug).toLowerCase();
  if (entryLookup && !entryLookup.has(cleanSlug)) throw new Error("Unknown entry.");

  const query = [
    `${reviewTable}?user_id=eq.${encodeURIComponent(auth.userId)}`,
    `entry_slug=eq.${encodeURIComponent(cleanSlug)}`,
  ].join("&");
  await reviewRequest<undefined>(auth, query, { method: "DELETE" });
  return { entry: cleanSlug };
}
