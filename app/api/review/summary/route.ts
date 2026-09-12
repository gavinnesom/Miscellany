import { NextResponse } from "next/server";
import { getReviewSummary } from "../../../lib/review";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireServerAuth(request);
  return NextResponse.json(await getReviewSummary(auth));
}
