import { NextResponse } from "next/server";
import { MISCELLANY_SOURCE_ID } from "../../../lib/memory-engine-types";
import { memoryEngineRequest, sourceIsMiscellany } from "../../../lib/server-memory-engine";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Sign in to load due reviews." }, { status: 401 });

  const url = new URL(request.url);
  if (!sourceIsMiscellany(url.searchParams.get("source_id"))) {
    return NextResponse.json({ error: "Unsupported source_id." }, { status: 400 });
  }

  const result = await memoryEngineRequest(`/v1/due?source_id=${encodeURIComponent(MISCELLANY_SOURCE_ID)}`, auth);
  return NextResponse.json(result.body, { status: result.status });
}
