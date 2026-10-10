import type { QuizItem } from "./content";

/** Fisher–Yates on a copy; randomness belongs to run creation, never render. */
export function shuffleCopy<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export type QuizQuestionBase = QuizItem & {
  slug: string;
  category: string;
  topic: string;
};

export type ManualQuizMode = "all" | "category" | "topic" | "related";

type ManualSelectionInput<T extends QuizQuestionBase> = {
  category: string;
  mode: ManualQuizMode;
  question: T;
  registeredIds: Set<string>;
  relatedSlugs: Set<string>;
  topic: string;
  workloadOnly: boolean;
};

export function matchesManualQuizSelection<T extends QuizQuestionBase>({
  category,
  mode,
  question,
  registeredIds,
  relatedSlugs,
  topic,
  workloadOnly,
}: ManualSelectionInput<T>) {
  const modeMatch = mode === "all"
    || (mode === "category" && question.category === category)
    || (mode === "topic" && question.topic === topic)
    || (mode === "related" && relatedSlugs.has(question.slug));

  return modeMatch && (!workloadOnly || registeredIds.has(question.question_id));
}

export function isTrackedQuestion(question: QuizQuestionBase | undefined, registeredIds: Set<string>, isDueMode: boolean, hasSession: boolean) {
  return Boolean(question && hasSession && (isDueMode || registeredIds.has(question.question_id)));
}

export function nextManualQuestionIndex(currentIndex: number, questionCount: number) {
  if (questionCount <= 1) return 0;
  return (currentIndex + 1) % questionCount;
}

export function moveDueQuestionLater<T>(items: T[], index: number) {
  if (items.length <= 1 || index < 0 || index >= items.length) {
    return { items, index: Math.min(index, Math.max(items.length - 1, 0)) };
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(index, 1);
  nextItems.push(item);
  return { items: nextItems, index: index >= nextItems.length - 1 ? 0 : index };
}
