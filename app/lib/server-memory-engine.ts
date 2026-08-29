import { MISCELLANY_SOURCE_ID, type QueuedReview } from "./memory-engine-types.ts";
import type { ServerAuth } from "./server-auth";

type MemoryRequestOptions = {
  method?: string;
  body?: unknown;
};

export function hasServerMemoryEngineConfig() {
  return Boolean(process.env.MEMORYENGINE_URL && process.env.MEMORYENGINE_SERVICE_TOKEN);
}

export async function memoryEngineRequest(path: string, auth: ServerAuth, options: MemoryRequestOptions = {}) {
  const baseUrl = process.env.MEMORYENGINE_URL?.replace(/\/+$/, "");
  const serviceToken = process.env.MEMORYENGINE_SERVICE_TOKEN;
  if (!baseUrl || !serviceToken) {
    return {
      ok: false,
      status: 503,
      body: { error: "MemoryEngine is not configured." },
    };
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${serviceToken}`,
      "Content-Type": "application/json",
      "X-MemoryEngine-User-Id": auth.userId,
      "X-MemoryEngine-Service": "miscellany",
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body };
}

export function canonicalReviewPayload(value: unknown): QueuedReview | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (
    typeof record.event_id !== "string"
    || typeof record.item_id !== "string"
    || !["again", "hard", "good", "easy"].includes(String(record.rating))
    || !["manual", "due"].includes(String(record.trigger))
    || typeof record.reviewed_at !== "string"
  ) {
    return null;
  }

  return {
    event_id: record.event_id,
    source_id: MISCELLANY_SOURCE_ID,
    item_id: record.item_id,
    rating: record.rating as QueuedReview["rating"],
    trigger: record.trigger as QueuedReview["trigger"],
    reviewed_at: record.reviewed_at,
  };
}

export function sourceIsMiscellany(value: string | null) {
  return !value || value === MISCELLANY_SOURCE_ID;
}
