import type { CategoryGroup, Entry, TopicGroup } from "./content";

export type QuizCoverageStatus = "ready" | "not-ready" | "problem";
export type QuizCoverageFilter = "all" | "ready" | "not-ready";
export type QuizCoverageLoadState = "signed-out" | "loading" | "loaded" | "error";

export type EntryQuizCoverage = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  questionCount: number;
  readyQuestionCount: number;
  status: QuizCoverageStatus;
};

export type TopicQuizCoverage = {
  key: string;
  label: string;
  category: string;
  ready: number;
  total: number;
  readyQuestionCount: number;
  questionCount: number;
  entries: EntryQuizCoverage[];
};

export type CategoryQuizCoverage = {
  key: string;
  label: string;
  ready: number;
  total: number;
  readyQuestionCount: number;
  questionCount: number;
  topics: TopicQuizCoverage[];
};

export type QuizCoverageCounts = {
  ready: number;
  notReady: number;
  problem: number;
  total: number;
  readyQuestionCount: number;
  questionCount: number;
};

export type QuizCoverageQuery = {
  filter: QuizCoverageFilter;
  query: string;
};

export function buildEntryCoverage(entries: Entry[], readyEntrySlugs: Set<string>): EntryQuizCoverage[] {
  return entries.map((entry) => {
    const questionCount = entry.quiz.filter((item) => item.status !== "retired").length;
    const ready = questionCount > 0 && readyEntrySlugs.has(entry.slug);

    return {
      slug: entry.slug,
      title: entry.title,
      category: entry.category,
      topic: entry.topic,
      questionCount,
      readyQuestionCount: ready ? questionCount : 0,
      status: ready ? "ready" : "not-ready",
    };
  });
}

export function coverageCounts(entries: EntryQuizCoverage[]): QuizCoverageCounts {
  return entries.reduce<QuizCoverageCounts>((counts, entry) => {
    counts.total += 1;
    if (entry.status === "ready") counts.ready += 1;
    if (entry.status === "not-ready") counts.notReady += 1;
    if (entry.status === "problem") counts.problem += 1;
    counts.questionCount += entry.questionCount;
    counts.readyQuestionCount += entry.readyQuestionCount;
    return counts;
  }, { ready: 0, notReady: 0, problem: 0, total: 0, readyQuestionCount: 0, questionCount: 0 });
}

export function coverageSummaryLabel(loadState: QuizCoverageLoadState, counts: QuizCoverageCounts | null) {
  if (loadState === "signed-out") return "Quiz coverage - sign in to view readiness";
  if (loadState === "loading") return "Quiz coverage - checking readiness";
  if (loadState === "error" || !counts) return "Quiz coverage - readiness unavailable";
  return `Quiz coverage - ${counts.ready} of ${counts.total} entries ready to quiz · ${counts.readyQuestionCount} of ${counts.questionCount} active questions ready to quiz`;
}

export function buildCoverageHierarchy(
  groups: CategoryGroup[],
  topics: TopicGroup[],
  coverageEntries: EntryQuizCoverage[],
): CategoryQuizCoverage[] {
  const coverageBySlug = new Map(coverageEntries.map((entry) => [entry.slug, entry]));
  return groups.map((group) => {
    const categoryTopics = topics
      .filter((topic) => topic.category === group.key)
      .map((topic) => {
        const entries = topic.entries
          .map((entry) => coverageBySlug.get(entry.slug))
          .filter((entry): entry is EntryQuizCoverage => Boolean(entry));
        const counts = coverageCounts(entries);

        return {
          key: topic.key,
          label: topic.label,
          category: topic.category,
          ready: counts.ready,
          total: counts.total,
          readyQuestionCount: counts.readyQuestionCount,
          questionCount: counts.questionCount,
          entries,
        };
      })
      .filter((topic) => topic.total > 0);
    const categoryEntries = categoryTopics.flatMap((topic) => topic.entries);
    const counts = coverageCounts(categoryEntries);

    return {
      key: group.key,
      label: group.label,
      ready: counts.ready,
      total: counts.total,
      readyQuestionCount: counts.readyQuestionCount,
      questionCount: counts.questionCount,
      topics: categoryTopics,
    };
  }).filter((group) => group.total > 0);
}

export function filterCoverageHierarchy(
  hierarchy: CategoryQuizCoverage[],
  { filter, query }: QuizCoverageQuery,
): CategoryQuizCoverage[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  return hierarchy.map((category) => {
    const topics = category.topics.map((topic) => {
      const entries = topic.entries.filter((entry) => {
        const filterMatch = filter === "all" || entry.status === filter;
        const searchMatch = terms.every((term) => entry.title.toLowerCase().includes(term));
        return filterMatch && searchMatch;
      });
      const counts = coverageCounts(entries);

      return {
        ...topic,
        ready: counts.ready,
        total: counts.total,
        readyQuestionCount: counts.readyQuestionCount,
        questionCount: counts.questionCount,
        entries,
      };
    }).filter((topic) => topic.total > 0);
    const counts = coverageCounts(topics.flatMap((topic) => topic.entries));

    return {
      ...category,
      ready: counts.ready,
      total: counts.total,
      readyQuestionCount: counts.readyQuestionCount,
      questionCount: counts.questionCount,
      topics,
    };
  }).filter((category) => category.total > 0);
}
