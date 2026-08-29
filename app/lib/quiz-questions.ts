import type { Entry, QuizItem } from "./content";

export function questionsForEntry(entry: Entry): QuizItem[] {
  return entry.quiz.filter((item) => item.status !== "retired");
}

export function questionsFromQuiz<T extends QuizItem>(quiz: T[]): T[] {
  return quiz.filter((item) => item.status !== "retired");
}

export function questionMap<T extends QuizItem>(quiz: T[]) {
  return new Map(questionsFromQuiz(quiz).map((item) => [item.question_id, item]));
}
