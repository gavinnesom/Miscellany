"use client";

import type { AuthSession } from "./auth.ts";
import { fetchWithSessionRefresh } from "./auth.ts";
import type { QuizItem } from "./content.ts";
export {
  MISCELLANY_SOURCE_ID,
  type MemoryRating,
  type MemorySummary,
  type QueuedReview,
  type ReviewTrigger,
} from "./memory-engine-types.ts";
import {
  MISCELLANY_SOURCE_ID,
  type MemoryRating,
  type MemorySummary,
  type QueuedReview,
  type ReviewTrigger,
} from "./memory-engine-types.ts";

const outboxKey = "miscellany-memoryengine-outbox";

export function hasMemoryEngineConfig(): boolean {
  return true;
}

export function createReview(item: QuizItem, rating: MemoryRating, trigger: ReviewTrigger): QueuedReview {
  return {
    event_id: crypto.randomUUID(),
    source_id: MISCELLANY_SOURCE_ID,
    item_id: item.question_id,
    rating,
    trigger,
    reviewed_at: new Date().toISOString(),
  };
}

export async function registerQuestion(item: QuizItem, session: AuthSession): Promise<void> {
  await memoryRequest("/api/memory-engine/items", session, {
    method: "POST",
    body: JSON.stringify({ source_id: MISCELLANY_SOURCE_ID, item_id: item.question_id }),
  });
}

export async function recordReview(review: QueuedReview, session: AuthSession): Promise<void> {
  await memoryRequest("/api/memory-engine/reviews", session, {
    method: "POST",
    body: JSON.stringify(review),
  });
}

export async function getDueItemIds(session: AuthSession): Promise<string[]> {
  const body = await memoryRequest(`/api/memory-engine/due?source_id=${encodeURIComponent(MISCELLANY_SOURCE_ID)}`, session);
  return Array.isArray(body.items) ? body.items.map((item: { item_id: string }) => item.item_id) : [];
}

export async function getSummary(session: AuthSession): Promise<MemorySummary> {
  return memoryRequest(`/api/memory-engine/summary?source_id=${encodeURIComponent(MISCELLANY_SOURCE_ID)}`, session);
}

export function enqueueReview(review: QueuedReview) {
  const queued = readOutbox();
  window.localStorage.setItem(outboxKey, JSON.stringify([...queued, review]));
}

export function readOutbox(): QueuedReview[] {
  const raw = window.localStorage.getItem(outboxKey);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as QueuedReview[];
  } catch {
    window.localStorage.removeItem(outboxKey);
    return [];
  }
}

export async function flushOutbox(items: QuizItem[], session: AuthSession): Promise<number> {
  const byId = new Map(items.map((item) => [item.question_id, item]));
  const remaining: QueuedReview[] = [];
  let sent = 0;

  for (const review of readOutbox()) {
    const item = byId.get(review.item_id);
    if (!item) continue;

    try {
      await recordReview(review, session);
      sent += 1;
    } catch {
      remaining.push(review);
    }
  }

  window.localStorage.setItem(outboxKey, JSON.stringify(remaining));
  return sent;
}

export function removeOutboxEvent(eventId: string) {
  const remaining = readOutbox().filter((review) => review.event_id !== eventId);
  window.localStorage.setItem(outboxKey, JSON.stringify(remaining));
}

function memoryFetch(path: string, session: AuthSession, init: RequestInit = {}) {
  return fetchWithSessionRefresh(session, path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

async function memoryRequest(path: string, session: AuthSession, init: RequestInit = {}) {
  const response = await memoryFetch(path, session, init);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error?.message ?? "MemoryEngine request failed");
  }

  return body;
}
