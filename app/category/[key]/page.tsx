import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDirectory } from "../../components/DirectoryPages";
import { categoryGroups, contentValidationProblems, entries, topicGroups } from "../../lib/content";

type Props = {
  params: Promise<{
    key: string;
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return categoryGroups.map((group) => ({ key: group.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const group = categoryGroups.find((item) => item.slug === key);

  if (!group) {
    return {
      title: "Category Not Found | Gavin's Miscellany",
    };
  }

  return {
    title: `${group.title} | Gavin's Miscellany`,
    description: group.description,
    alternates: {
      canonical: `/category/${group.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  const { key } = await params;
  const group = categoryGroups.find((item) => item.slug === key);

  if (!group) notFound();

  return <CategoryDirectory group={group} topics={topicGroups.filter((topic) => topic.category === group.slug)} entryCount={entries.length} surpriseSlugs={entries.map((entry) => entry.slug)} />;
}
