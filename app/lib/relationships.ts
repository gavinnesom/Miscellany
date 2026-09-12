import type { Entry } from "./content";

export type RelationshipSection = {
  label: string;
  entries: Entry[];
};

export function uniqueSlugs(slugs: string[]) {
  return Array.from(new Set(slugs.filter(Boolean)));
}

export function relatedEntrySlugs(entries: Entry[], selected: Entry) {
  const inverseParents = entries
    .filter((entry) => entry.relationships.parent.includes(selected.slug))
    .map((entry) => entry.slug);
  const inverseDeeper = entries
    .filter((entry) => entry.relationships.deeper.includes(selected.slug))
    .map((entry) => entry.slug);
  const inverseRelated = entries
    .filter((entry) => entry.relationships.related.includes(selected.slug))
    .map((entry) => entry.slug);

  return uniqueSlugs([
    selected.slug,
    ...selected.relationships.parent,
    ...selected.relationships.deeper,
    ...selected.relationships.related,
    ...inverseParents,
    ...inverseDeeper,
    ...inverseRelated,
  ]);
}

export function relationshipSections(entries: Entry[], selected: Entry): RelationshipSection[] {
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const inverseParents = entries
    .filter((entry) => entry.relationships.parent.includes(selected.slug))
    .map((entry) => entry.slug);
  const inverseDeeperParents = entries
    .filter((entry) => entry.relationships.deeper.includes(selected.slug))
    .map((entry) => entry.slug);
  const inverseConnected = entries
    .filter((entry) => entry.relationships.related.includes(selected.slug))
    .map((entry) => entry.slug);

  const parents = uniqueSlugs([...selected.relationships.parent, ...inverseDeeperParents])
    .filter((slug) => slug !== selected.slug);
  const deeper = uniqueSlugs([...selected.relationships.deeper, ...inverseParents])
    .filter((slug) => slug !== selected.slug);
  const connected = uniqueSlugs([...selected.relationships.related, ...inverseConnected])
    .filter((slug) => slug !== selected.slug && !parents.includes(slug) && !deeper.includes(slug));

  return [
    { label: "part of", entries: parents.map((slug) => bySlug.get(slug)).filter((entry): entry is Entry => Boolean(entry)) },
    { label: "go deeper", entries: deeper.map((slug) => bySlug.get(slug)).filter((entry): entry is Entry => Boolean(entry)) },
    { label: "connected to", entries: connected.map((slug) => bySlug.get(slug)).filter((entry): entry is Entry => Boolean(entry)) },
  ].filter((section) => section.entries.length > 0);
}
