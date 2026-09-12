import { NextResponse } from "next/server";
import { entryBySlug } from "../../../lib/content";
import { gradeWithOpenAI } from "../../../lib/openai-grading";
import { canonicalReviewPayload, memoryEngineRequest } from "../../../lib/server-memory-engine";
import { getReadyEntrySlugs } from "../../../lib/server-quiz-readiness";
import { requireServerAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireServerAuth(request);
  if (!auth) return NextResponse.json({ error: "Quiz grading requires Gavin sign-in." }, { status: 403 });

  try {
    const body = await request.json().catch(() => ({}));
    const questionId = typeof body.questionId === "string" ? body.questionId.trim() : "";
    const userAnswer = typeof body.userAnswer === "string" ? body.userAnswer.trim() : "";
    const item = findQuestion(questionId);
    if (!item) throw new Error("Unknown question.");

    const grade = await gradeWithOpenAI({
      questionId,
      question: item.question,
      canonicalAnswer: item.canonicalAnswer,
      rubric: item.rubric,
      userAnswer,
    });
    const review = canonicalReviewPayload(body.review);
    if (!review) return NextResponse.json(grade);

    const readyEntrySlugs = await getReadyEntrySlugs(auth);
    if (!readyEntrySlugs.has(item.entrySlug)) {
      return NextResponse.json({ error: "Mark this entry ready to quiz before recording a review." }, { status: 409 });
    }

    // A ready entry may have had a recent question addition; register only this question before its review.
    const registration = await memoryEngineRequest("/v1/items", auth, {
      method: "POST",
      body: { source_id: review.source_id, item_id: review.item_id },
    });
    if (!registration.ok) {
      return NextResponse.json({ ...grade, rating: grade.rating, event_id: review.event_id, reviewSaved: false });
    }

    const result = await memoryEngineRequest("/v1/reviews", auth, {
      method: "POST",
      body: { ...review, rating: grade.rating },
    });

    return NextResponse.json({
      ...grade,
      rating: grade.rating,
      event_id: review.event_id,
      reviewSaved: result.ok,
    });
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status)
      : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not grade answer." },
      { status: Number.isFinite(status) ? status : 400 },
    );
  }
}

function findQuestion(questionId: string) {
  if (!questionId) return undefined;

  for (const entry of entryBySlug.values()) {
    const item = entry.quiz.find((question) => question.question_id === questionId && question.status === "active");
    if (!item) continue;

    return {
      entrySlug: entry.slug,
      question: item.question,
      canonicalAnswer: item.answer,
      rubric: item.rubric,
    };
  }

  return undefined;
}
