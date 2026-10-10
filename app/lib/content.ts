import { entryExcerpt } from "./entry-excerpt";
import { categories, categoryFor, categoryKeys } from "./categories";
import { duplicateTopicKeys, topicFor, topicKeys, topics } from "./topics";

export type Source = {
  label: string;
  url?: string;
};

export type QuizItem = {
  question_id: string;
  version: number;
  status: "active" | "retired";
  question: string;
  answer: string;
  rubric: string;
};

export type EntryImage = {
  url: string;
  alt?: string;
  credit?: string;
  source_url?: string;
  provenance?: "local" | "collaborative" | "external" | "user";
};

export type EntryVideo = {
  youtube_id: string;
  title: string;
  note?: string;
};

export type EntryRelationships = {
  parent: string[];
  deeper: string[];
  related: string[];
};

export type Entry = {
  title: string;
  slug: string;
  category: string;
  topic: string;
  entry_type?: string;
  author?: string;
  year?: string;
  book_type?: string;
  tags: string[];
  date_added: string;
  date_updated?: string;
  relationships: EntryRelationships;
  sources: Source[];
  books: string[];
  image?: EntryImage;
  video?: EntryVideo;
  quiz: QuizItem[];
  body: string;
  excerpt: string;
  searchText: string;
};

export type CategoryGroup = {
  key: string;
  label: string;
  note: string;
  description: string;
  entries: Entry[];
};

export type TopicGroup = {
  key: string;
  label: string;
  category: string;
  description: string;
  order: number;
  startHere?: string[];
  entryOrder?: string[];
  entries: Entry[];
};

export type TagGroup = {
  slug: string;
  label: string;
  entries: Entry[];
};

const files = import.meta.glob("../../content/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (value === "[]") return [];
  if (value === "") return "";
  const quoted = value.match(/^(['"])([\s\S]*)\1$/);
  if (!quoted) return value;

  return quoted[2]
    .replace(/\\(["'\\])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t");
}

function parseFrontMatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Entry is missing YAML front matter.");
  }

  const meta: Record<string, unknown> = {};
  const lines = match[1].split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const pair = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, rawValue] = pair;

    if (rawValue.trim() !== "") {
      meta[key] = parseValue(rawValue);
      continue;
    }

    if (index + 1 < lines.length && /^\s{2,}[A-Za-z0-9_]+:/.test(lines[index + 1])) {
      const objectValue: Record<string, unknown> = {};
      while (index + 1 < lines.length && /^\s{2,}[A-Za-z0-9_]+:/.test(lines[index + 1])) {
        index += 1;
        const nested = lines[index].match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
        if (!nested) continue;

        if (nested[2].trim() === "" && index + 1 < lines.length && /^\s{4,}-/.test(lines[index + 1])) {
          const nestedItems: string[] = [];
          while (index + 1 < lines.length && /^\s{4,}-/.test(lines[index + 1])) {
            index += 1;
            nestedItems.push(lines[index].replace(/^\s+-\s*/, "").trim());
          }
          objectValue[nested[1]] = nestedItems;
        } else {
          objectValue[nested[1]] = parseValue(nested[2]);
        }
      }
      meta[key] = objectValue;
      continue;
    }

    const items: unknown[] = [];
    while (index + 1 < lines.length && /^\s+-/.test(lines[index + 1])) {
      index += 1;
      const itemLine = lines[index];
      const objectStart = itemLine.match(/^\s+-\s+([A-Za-z0-9_]+):\s*(.*)$/);

      if (objectStart) {
        const objectValue: Record<string, unknown> = {
          [objectStart[1]]: parseValue(objectStart[2]),
        };

        while (index + 1 < lines.length && /^\s{4,}[A-Za-z0-9_]+:/.test(lines[index + 1])) {
          index += 1;
          const nested = lines[index].match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
          if (nested) objectValue[nested[1]] = parseValue(nested[2]);
        }

        items.push(objectValue);
      } else {
        items.push(itemLine.replace(/^\s+-\s*/, "").trim());
      }
    }

    meta[key] = items;
  }

  return { meta, body: match[2].trim() };
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || !value.trim()) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function asQuizItems(value: unknown): QuizItem[] {
  if (!Array.isArray(value)) return [];

  return value.map((item, index) => {
    if (!item || Array.isArray(item) || typeof item !== "object") {
      throw new Error(`Quiz item ${index + 1} is not an object.`);
    }
    const record = item as Record<string, unknown>;
    const question_id = asString(record.question_id);
    const version = asNumber(record.version);
    const status = asString(record.status, "active");
    const question = asString(record.question);
    const answer = asString(record.answer);
    const rubric = asString(record.rubric);

    if (!question_id || !version || !question || !answer || !rubric) {
      throw new Error(`Quiz item ${index + 1} is missing question_id, version, question, answer, or rubric.`);
    }
    if (status !== "active" && status !== "retired") {
      throw new Error(`Quiz item ${question_id} has an invalid status.`);
    }

    return {
      question_id,
      version,
      status,
      question,
      answer,
      rubric,
    };
  });
}

function asImage(value: unknown): EntryImage | undefined {
  if (typeof value === "string" && value) return { url: value };
  if (!value || Array.isArray(value) || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  const url = asString(record.url);
  if (!url) return undefined;

  return {
    url,
    alt: asString(record.alt) || undefined,
    credit: asString(record.credit) || undefined,
    source_url: asString(record.source_url) || undefined,
    provenance: ["local", "collaborative", "external", "user"].includes(asString(record.provenance))
      ? (asString(record.provenance) as EntryImage["provenance"])
      : undefined,
  };
}

function asVideo(value: unknown): EntryVideo | undefined {
  if (!value || Array.isArray(value) || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  const youtube_id = asString(record.youtube_id);
  const title = asString(record.title);
  if (!youtube_id || !title) return undefined;

  return {
    youtube_id,
    title,
    note: asString(record.note) || undefined,
  };
}

function asRelationships(value: unknown): EntryRelationships {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return { parent: [], deeper: [], related: [] };
  }

  const record = value as Record<string, unknown>;
  return {
    parent: asStringArray(record.parent),
    deeper: asStringArray(record.deeper),
    related: asStringArray(record.related),
  };
}

export const entries: Entry[] = Object.entries(files)
  .map(([path, markdown]) => {
    const { meta, body } = parseFrontMatter(markdown);
    const title = asString(meta.title);
    const slug = asString(meta.slug, path.split("/").pop()?.replace(/\.md$/, "") ?? title.toLowerCase());
    const category = asString(meta.category, "uncategorized");
    const tags = asStringArray(meta.tags);
    const relationships = asRelationships(meta.relationships);
    const sources = Array.isArray(meta.sources) ? (meta.sources as Source[]) : [];
    const books = asStringArray(meta.books);
    const quiz = asQuizItems(meta.quiz);
    const topic = asString(meta.topic);
    const entry_type = asString(meta.entry_type);
    const author = asString(meta.author);
    const year = asString(meta.year);
    const book_type = asString(meta.book_type);

    return {
      title,
      slug,
      category,
      topic,
      entry_type,
      author,
      year,
      book_type,
      tags,
      date_added: asString(meta.date_added),
      date_updated: asString(meta.date_updated) || undefined,
      relationships,
      sources,
      books,
      image: asImage(meta.image),
      video: asVideo(meta.video),
      quiz,
      body,
      excerpt: entryExcerpt(body),
      searchText: [title, author, year, book_type, body, categoryFor(category).label, topicFor(topic).label, entry_type, ...tags]
        .join(" ")
        .toLowerCase(),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export const entryBySlug = new Map(entries.map((entry) => [entry.slug, entry]));

export const categoryGroups: CategoryGroup[] = categories.map((category) => ({
  ...category,
  entries: entries.filter((entry) => entry.category === category.key),
}));

function orderEntriesForTopic(topic: typeof topics[number], topicEntries: Entry[]) {
  const explicitOrder = new Map((topic.entryOrder ?? []).map((slug, index) => [slug, index]));
  const fallbackOffset = explicitOrder.size;

  return [...topicEntries].sort((a, b) => {
    const left = explicitOrder.get(a.slug);
    const right = explicitOrder.get(b.slug);
    const leftOrder = left ?? fallbackOffset;
    const rightOrder = right ?? fallbackOffset;
    return leftOrder - rightOrder || a.title.localeCompare(b.title);
  });
}

export const topicGroups: TopicGroup[] = topics.map((topic) => ({
  ...topic,
  entries: orderEntriesForTopic(topic, entries.filter((entry) => entry.topic === topic.key)),
}));

export const tagGroups: TagGroup[] = Array.from(
  entries.reduce((groups, entry) => {
    for (const tag of entry.tags) {
      const existing = groups.get(tag) ?? [];
      existing.push(entry);
      groups.set(tag, existing);
    }
    return groups;
  }, new Map<string, Entry[]>()),
)
  .map(([slug, taggedEntries]) => ({
    slug,
    label: slug,
    entries: taggedEntries.sort((a, b) => a.title.localeCompare(b.title)),
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const topicByKey = new Map(topicGroups.map((topic) => [topic.key, topic]));

export const tagBySlug = new Map(tagGroups.map((tag) => [tag.slug, tag]));

const reservedRouteKeys = new Set(["category", "entry", "quiz", "tag", "topic"]);

export const quizItems = entries.flatMap((entry) =>
  entry.quiz.filter((item) => item.status === "active").map((item) => ({
    ...item,
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    topic: entry.topic,
  })),
);

export const brokenRelatedSlugs = entries.flatMap((entry) =>
  {
    const declared = [
      ...entry.relationships.parent.map((slug) => ["relationships.parent", slug] as const),
      ...entry.relationships.deeper.map((slug) => ["relationships.deeper", slug] as const),
      ...entry.relationships.related.map((slug) => ["relationships.related", slug] as const),
    ];
    const problems: string[] = [];
    const seen = new Set<string>();

    for (const [kind, slug] of declared) {
      const key = `${kind}:${slug}`;
      if (slug === entry.slug) problems.push(`${entry.slug} self-reference in ${kind}`);
      if (seen.has(key)) problems.push(`${entry.slug} duplicate ${kind} -> ${slug}`);
      if (!entryBySlug.has(slug)) problems.push(`${entry.slug} broken ${kind} -> ${slug}`);
      seen.add(key);
    }

    return problems;
  }
);

export const contentValidationProblems = [
  ...entries.flatMap((entry) => {
    const problems: string[] = [];
    if (!entry.slug) problems.push(`${entry.title || "Untitled entry"} is missing a slug`);
    if (!entry.category) problems.push(`${entry.slug} is missing a category`);
    if (entry.category && !categoryKeys.has(entry.category)) {
      problems.push(`${entry.slug} uses unknown category "${entry.category}"`);
    }
    if (!entry.topic) problems.push(`${entry.slug} is missing a topic`);
    if (entry.topic && !topicKeys.has(entry.topic)) {
      problems.push(`${entry.slug} uses unknown topic "${entry.topic}"`);
    }
    const topic = topicFor(entry.topic);
    if (entry.topic && topic.category && topic.category !== entry.category) {
      problems.push(`${entry.slug} topic "${entry.topic}" belongs to "${topic.category}", not "${entry.category}"`);
    }
    for (const tag of entry.tags) {
      if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(tag)) {
        problems.push(`${entry.slug} has tag "${tag}" that is not URL-safe`);
      }
    }
    return problems;
  }),
  ...duplicateTopicKeys.map((key) => `duplicate topic key "${key}"`),
  ...categories
    .filter((category) => reservedRouteKeys.has(category.key))
    .map((category) => `category key "${category.key}" collides with an app route`),
  ...topics
    .filter((topic) => !categoryKeys.has(topic.category))
    .map((topic) => `topic "${topic.key}" uses unknown category "${topic.category}"`),
  ...topics
    .filter((topic) => reservedRouteKeys.has(topic.key))
    .map((topic) => `topic key "${topic.key}" collides with an app route`),
  ...topics.flatMap((topic) => {
    const topicEntrySlugs = new Set(entries.filter((entry) => entry.topic === topic.key).map((entry) => entry.slug));
    return (topic.entryOrder ?? [])
      .filter((slug) => !topicEntrySlugs.has(slug))
      .map((slug) => `topic "${topic.key}" entryOrder references missing topic entry "${slug}"`);
  }),
  ...Array.from(
    entries.reduce((counts, entry) => {
      counts.set(entry.slug, (counts.get(entry.slug) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
  )
    .filter(([, count]) => count > 1)
    .map(([slug]) => `duplicate slug "${slug}"`),
  ...brokenRelatedSlugs,
];
