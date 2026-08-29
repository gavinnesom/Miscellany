import { NextResponse } from "next/server";
import { canonicalReviewPayload, memoryEngineRequest } from "../../../lib/server-memory-engine";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Sign in to save review progress." }, { status: 401 });

  const review = canonicalReviewPayload(await request.json().catch(() => ({})));
  if (!review) return NextResponse.json({ error: "Invalid review event." }, { status: 400 });

  const result = await memoryEngineRequest("/v1/reviews", auth, {
    method: "POST",
    body: review,
  });
  return NextResponse.json(result.body, { status: result.status });
}
