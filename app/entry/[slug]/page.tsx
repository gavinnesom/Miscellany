import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MiscellanyApp } from "../../components/MiscellanyApp";
import { categoryGroups, contentValidationProblems, entries, entryBySlug, topicGroups } from "../../lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = entryBySlug.get(slug);

  if (!entry) {
    return {
      title: "Entry Not Found | Gavin's Miscellany",
    };
  }

  return {
    title: `${entry.title} | Gavin's Miscellany`,
    description: entry.excerpt,
    alternates: {
      canonical: `/entry/${entry.slug}`,
    },
  };
}

export default async function EntryPage({ params }: Props) {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  const { slug } = await params;
  const entry = entryBySlug.get(slug);

  if (!entry) notFound();

  return (
    <MiscellanyApp
      entries={entries}
      groups={categoryGroups}
      topics={topicGroups}
      initialSlug={entry.slug}
    />
  );
}
