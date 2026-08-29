import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TagDirectory } from "../../components/DirectoryPages";
import { contentValidationProblems, entries, tagBySlug, tagGroups } from "../../lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return tagGroups.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = tagBySlug.get(slug);

  if (!tag) {
    return {
      title: "Tag Not Found | Gavin's Miscellany",
    };
  }

  return {
    title: `${tag.label} | Gavin's Miscellany`,
    description: `${tag.entries.length} entries tagged ${tag.label}.`,
    alternates: {
      canonical: `/tag/${tag.slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  const { slug } = await params;
  const tag = tagBySlug.get(slug);

  if (!tag) notFound();

  return <TagDirectory tag={tag} entryCount={entries.length} surpriseSlugs={entries.map((entry) => entry.slug)} />;
}
