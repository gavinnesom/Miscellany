import type { GradeResult } from "./grading.ts";
import { truncateAtWordBoundary } from "./grading.ts";
import type { MemoryRating } from "./memory-engine";

const ratingLabels: Record<MemoryRating, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

function sentenceCase(value: string) {
  return value ? `${value.slice(0, 1).toUpperCase()}${value.slice(1)}` : "";
}

function usefulGradeNote(result: GradeResult) {
  if (result.correct || result.rating === "good" || result.rating === "easy") return "";

  const explanation = result.explanation.replace(/\s+/g, " ").trim();
  const lower = explanation.toLowerCase();
  if (!explanation) return "";
  if (lower.includes("canonical answer")) return "";

  const note = `${sentenceCase(explanation.replace(/[.?!]\s*$/, ""))}.`;
  return truncateAtWordBoundary(note, 96);
}

export function gradeFeedback(result: GradeResult, answer: string) {
  const label = ratingLabels[result.rating] ?? result.label;
  const note = usefulGradeNote(result);

  if (result.correct || result.rating === "good" || result.rating === "easy") {
    return {
      lead: `${label}.`,
      answer,
    };
  }

  return {
    lead: note ? `${label}. ${note}` : `${label}.`,
    answer: `Correct answer: ${answer}`,
  };
}
