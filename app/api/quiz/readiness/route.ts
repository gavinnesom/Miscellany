import { NextResponse } from "next/server";
import { entryBySlug } from "../../../lib/content";
import type { QuizReadinessUpdate } from "../../../lib/quiz-readiness";
import { getReadyEntrySlugs, setEntryReadiness } from "../../../lib/server-quiz-readiness";
import { synchronizeReadyEntries } from "../../../lib/server-quiz-readiness-sync";
import { authenticateServerRequest, serverAuthFailureResponse } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const result = await authenticateServerRequest(request);
  if (!result.auth) {
    const failure = serverAuthFailureResponse(result.failure, "read quiz readiness");
    return NextResponse.json(failure.body, { status: failure.status, headers: failure.headers });
  }

  try {
    return NextResponse.json({ readyEntrySlugs: [...await getReadyEntrySlugs(result.auth)].sort() });
  } catch {
    return NextResponse.json({ error: "Quiz readiness is unavailable." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const result = await authenticateServerRequest(request);
  if (!result.auth) {
    const failure = serverAuthFailureResponse(result.failure, "save quiz readiness");
    return NextResponse.json(failure.body, { status: failure.status, headers: failure.headers });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const updates = parseUpdates(body.entries);
    if (!updates.length) return NextResponse.json({ error: "At least one readiness choice is required." }, { status: 400 });

    const readyEntrySlugs = await setEntryReadiness(result.auth, updates);
    const newlyReady = updates.filter((update) => update.isReady).map((update) => update.entrySlug);
    const synchronization = await synchronizeReadyEntries(result.auth, newlyReady);
    return NextResponse.json({ readyEntrySlugs: [...readyEntrySlugs].sort(), synchronization });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save quiz readiness." }, { status: 400 });
  }
}

function parseUpdates(value: unknown): QuizReadinessUpdate[] {
  if (!Array.isArray(value) || value.length > entryBySlug.size) throw new Error("Invalid readiness update list.");
  const bySlug = new Map<string, QuizReadinessUpdate>();

  for (const raw of value) {
    if (!raw || typeof raw !== "object") throw new Error("Invalid readiness update.");
    const record = raw as Record<string, unknown>;
    const entrySlug = typeof record.entrySlug === "string" ? record.entrySlug.trim().toLowerCase() : "";
    if (!entrySlug || typeof record.isReady !== "boolean" || !entryBySlug.has(entrySlug)) {
      throw new Error("Unknown entry in readiness update.");
    }
    bySlug.set(entrySlug, { entrySlug, isReady: record.isReady });
  }

  return [...bySlug.values()];
}
