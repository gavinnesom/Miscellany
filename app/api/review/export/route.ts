import { NextResponse } from "next/server";
import { getReviewExport } from "../../../lib/review";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireServerAuth(request);
  const reviewExport = await getReviewExport(auth);

  if (!reviewExport) {
    return NextResponse.json(
      { error: "Review export requires Gavin sign-in and Supabase configuration." },
      { status: 403 },
    );
  }

  return NextResponse.json(
    reviewExport,
    {
      headers: {
        "Content-Disposition": `attachment; filename="miscellany-review-queue-${reviewExport.exported_at.slice(0, 10)}.json"`,
      },
    },
  );
}
