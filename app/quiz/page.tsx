import type { Metadata } from "next";
import { QuizApp } from "../components/QuizApp";
import { categoryGroups, contentValidationProblems, entries, quizItems, topicGroups } from "../lib/content";

type Props = {
  searchParams: Promise<{
    from?: string;
    topic?: string;
  }>;
};

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Quiz Me | Gavin's Miscellany",
  description: "Practice questions from Gavin's Miscellany entries.",
};

export default async function QuizPage({ searchParams }: Props) {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  const { from, topic } = await searchParams;

  return (
    <QuizApp
      entries={entries}
      groups={categoryGroups}
      topics={topicGroups}
      quiz={quizItems}
      initialSlug={from}
      initialTopic={topic}
    />
  );
}
