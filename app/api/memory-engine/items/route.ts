import { NextResponse } from "next/server";
import { MISCELLANY_SOURCE_ID } from "../../../lib/memory-engine-types";
import { memoryEngineRequest } from "../../../lib/server-memory-engine";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Sign in to save quiz readiness." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const itemId = typeof body.item_id === "string" ? body.item_id : "";
  if (!itemId) return NextResponse.json({ error: "item_id is required." }, { status: 400 });

  const result = await memoryEngineRequest("/v1/items", auth, {
    method: "POST",
    body: { source_id: MISCELLANY_SOURCE_ID, item_id: itemId },
  });
  return NextResponse.json(result.body, { status: result.status });
}
