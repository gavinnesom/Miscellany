export type QuizReadinessLoadState = "signed-out" | "loading" | "loaded" | "error";

export type QuizReadinessUpdate = {
  entrySlug: string;
  isReady: boolean;
};

export type QuizReadinessSyncFailure = {
  entrySlug: string;
  questionId: string;
  message: string;
};

export type QuizReadinessSyncResult = {
  attemptedQuestionCount: number;
  registeredQuestionCount: number;
  failures: QuizReadinessSyncFailure[];
};

export type QuizReadinessResponse = {
  readyEntrySlugs: string[];
  synchronization?: QuizReadinessSyncResult;
};

export function readyQuestionIds<T extends { question_id: string; slug: string }>(items: T[], readyEntrySlugs: Set<string>) {
  return new Set(items.filter((item) => readyEntrySlugs.has(item.slug)).map((item) => item.question_id));
}
