import { NextResponse } from "next/server";
import { entryBySlug } from "../../../lib/content";
import { createReviewRequest, getReviewSummary, removeReviewRequest } from "../../../lib/review";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Review requires Gavin sign-in." }, { status: 403 });

  try {
    const body = await request.json().catch(() => ({}));
    const entrySlug = typeof body.entry === "string" ? body.entry.toLowerCase().trim() : "";
    const entry = entryBySlug.get(entrySlug);
    if (!entry) {
      throw new Error("Unknown entry.");
    }

    const review = await createReviewRequest(auth, { ...body, entry: entry.slug, entryTitle: entry.title }, entryBySlug);
    return NextResponse.json({ review, summary: await getReviewSummary(auth) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save review request." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Review requires Gavin sign-in." }, { status: 403 });

  try {
    const body = await request.json().catch(() => ({}));
    const entrySlug = typeof body.entry === "string" ? body.entry.toLowerCase().trim() : "";
    if (!entryBySlug.has(entrySlug)) throw new Error("Unknown entry.");

    const removed = await removeReviewRequest(auth, entrySlug, entryBySlug);
    return NextResponse.json({ removed, summary: await getReviewSummary(auth) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not remove review request." }, { status: 400 });
  }
}
