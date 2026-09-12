import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicDirectory } from "../../components/DirectoryPages";
import { contentValidationProblems, entries, topicByKey, topicGroups } from "../../lib/content";

type Props = {
  params: Promise<{
    key: string;
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return topicGroups.map((topic) => ({ key: topic.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const topic = topicByKey.get(key);

  if (!topic) {
    return {
      title: "Topic Not Found | Gavin's Miscellany",
    };
  }

  return {
    title: `${topic.label} | Gavin's Miscellany`,
    description: topic.description,
    alternates: {
      canonical: `/topic/${topic.key}`,
    },
  };
}

export default async function TopicPage({ params }: Props) {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  const { key } = await params;
  const topic = topicByKey.get(key);

  if (!topic) notFound();

  return <TopicDirectory topic={topic} entryCount={entries.length} surpriseSlugs={entries.map((entry) => entry.slug)} />;
}
