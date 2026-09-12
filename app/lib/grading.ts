import type { MemoryRating } from "./memory-engine-types";

export const defaultGradingModel = "gpt-5-mini";

export type GradeInput = {
  question: string;
  canonicalAnswer: string;
  rubric: string;
  userAnswer: string;
};

export type GradeResult = {
  correct: boolean;
  rating: MemoryRating;
  label: string;
  explanation: string;
};

export type GraderPayload = GradeInput & {
  questionId: string;
};

export function sanitizeGradeResult(value: unknown): GradeResult {
  if (!value || typeof value !== "object") {
    throw new Error("Grader returned an invalid result.");
  }

  const record = value as Record<string, unknown>;
  const rating = record.rating;
  if (!["again", "hard", "good", "easy"].includes(String(rating))) {
    throw new Error("Grader returned an invalid rating.");
  }

  return {
    correct: Boolean(record.correct),
    rating: rating as MemoryRating,
    label: cleanText(record.label, Boolean(record.correct) ? "Correct" : rating === "hard" ? "Close" : "Not quite", 40),
    explanation: cleanText(record.explanation, "Graded against the rubric.", 240),
  };
}

export function gradePrompt(input: GraderPayload) {
  return [
    "Grade the user's quiz answer against the canonical answer and rubric.",
    "Use only the supplied question, canonical answer, rubric, and user answer.",
    "Do not use or assume any source entry prose.",
    "Map the result to exactly one rating:",
    "- easy: fully correct and clear",
    "- good: correct or substantially equivalent",
    "- hard: partially correct, close, or missing an important condition",
    "- again: incorrect, empty, or too vague",
    "Return concise feedback suitable to show in a quiz card.",
    "",
    JSON.stringify({
      question_id: input.questionId,
      question: input.question,
      canonical_answer: input.canonicalAnswer,
      rubric: input.rubric,
      user_answer: input.userAnswer,
    }),
  ].join("\n");
}

function cleanText(value: unknown, fallback: string, maxLength: number) {
  const text = typeof value === "string" ? value : fallback;
  return truncateAtWordBoundary(text.replace(/\s+/g, " ").trim(), maxLength) || fallback;
}

export function truncateAtWordBoundary(text: string, maxLength: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;

  const truncated = clean.slice(0, maxLength + 1);
  const sentenceBoundary = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("!"),
    truncated.lastIndexOf("?"),
  );
  if (sentenceBoundary >= Math.floor(maxLength * 0.5)) {
    return `${truncated.slice(0, sentenceBoundary + 1).trim()}...`;
  }

  const boundary = truncated.lastIndexOf(" ");
  const end = boundary >= Math.floor(maxLength * 0.5) ? boundary : maxLength;
  return `${clean.slice(0, end).trim().replace(/[.,;:!?-]+$/, "")}...`;
}
