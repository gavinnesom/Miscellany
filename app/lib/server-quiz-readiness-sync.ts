import { entryBySlug } from "./content";
import { MISCELLANY_SOURCE_ID } from "./memory-engine-types";
import { type QuizReadinessSyncResult } from "./quiz-readiness";
import { questionsForEntry } from "./quiz-questions";
import { memoryEngineRequest } from "./server-memory-engine";
import type { ServerAuth } from "./server-auth";

const registrationConcurrency = 6;

export async function synchronizeReadyEntries(auth: ServerAuth, entrySlugs: string[]): Promise<QuizReadinessSyncResult> {
  const items = entrySlugs.flatMap((slug) => {
    const entry = entryBySlug.get(slug);
    return entry ? questionsForEntry(entry).map((item) => ({ entrySlug: slug, item })) : [];
  });
  const failures: QuizReadinessSyncResult["failures"] = [];
  let registeredQuestionCount = 0;
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const current = items[nextIndex];
      nextIndex += 1;
      try {
        const result = await memoryEngineRequest("/v1/items", auth, {
          method: "POST",
          body: { source_id: MISCELLANY_SOURCE_ID, item_id: current.item.question_id },
        });
        if (!result.ok) {
          failures.push({
            entrySlug: current.entrySlug,
            questionId: current.item.question_id,
            message: typeof result.body?.error === "string" ? result.body.error : "MemoryEngine registration failed.",
          });
          continue;
        }
        registeredQuestionCount += 1;
      } catch (error) {
        failures.push({
          entrySlug: current.entrySlug,
          questionId: current.item.question_id,
          message: error instanceof Error ? error.message : "MemoryEngine registration failed.",
        });
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(registrationConcurrency, items.length) }, () => worker()));
  return { attemptedQuestionCount: items.length, registeredQuestionCount, failures };
}
