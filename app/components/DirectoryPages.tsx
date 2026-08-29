import Link from "next/link";
import type { CategoryGroup, Entry, TagGroup, TopicGroup } from "../lib/content";
import { categoryFor } from "../lib/categories";
import { categoryPath, entryPath, topicPath } from "../lib/routes";
import { topicFor } from "../lib/topics";
import { SiteHeader } from "./SiteHeader";

function entryList(entries: Entry[]) {
  return (
    <ul className="directory-list">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link href={entryPath(entry.slug)}>{entry.title}</Link>
          <span>{entry.excerpt}</span>
        </li>
      ))}
    </ul>
  );
}

function groupEntriesByTopic(entries: Entry[], topics: TopicGroup[]) {
  const allowed = new Set(entries.map((entry) => entry.slug));
  return topics
    .map((topic) => ({
      topic,
      entries: topic.entries.filter((entry) => allowed.has(entry.slug)),
    }))
    .filter((group) => group.entries.length > 0);
}

export function DirectoryHeader({ eyebrow, title, description, entryCount, surpriseSlugs }: { eyebrow: string; title: string; description?: string; entryCount: number; surpriseSlugs: string[] }) {
  return (
    <>
      <SiteHeader entryCount={entryCount} surpriseSlugs={surpriseSlugs} />
      <header className="directory-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p className="lede">{description}</p> : null}
      </header>
    </>
  );
}

export function CategoryDirectory({ group, topics, entryCount, surpriseSlugs }: { group: CategoryGroup; topics: TopicGroup[]; entryCount: number; surpriseSlugs: string[] }) {
  const topicEntries = groupEntriesByTopic(group.entries, topics);

  return (
    <main className="directory-page">
      <DirectoryHeader eyebrow="Category" title={group.title} description={group.description} entryCount={entryCount} surpriseSlugs={surpriseSlugs} />
      <section className="directory-shell">
        <section className="directory-section" aria-labelledby="topics-heading">
          <h2 id="topics-heading">Topics</h2>
          <div className="topic-index">
            {topicEntries.map(({ topic, entries }) => (
              <Link className="topic-row" href={topicPath(topic.key)} key={topic.key}>
                <span>
                  <strong>{topic.label}</strong>
                  <small>{topic.description}</small>
                </span>
                <em>{entries.length}</em>
              </Link>
            ))}
          </div>
        </section>

        <section className="directory-section" aria-labelledby="entries-heading">
          <h2 id="entries-heading">All Entries</h2>
          {topicEntries.map(({ topic, entries }) => (
            <section className="entry-topic-group" key={topic.key}>
              <h3>{topic.label}</h3>
              {entryList(entries)}
            </section>
          ))}
        </section>
      </section>
    </main>
  );
}

export function TopicDirectory({ topic, entryCount, surpriseSlugs }: { topic: TopicGroup; entryCount: number; surpriseSlugs: string[] }) {
  const startHere = (topic.startHere ?? [])
    .map((slug) => topic.entries.find((entry) => entry.slug === slug))
    .filter((entry): entry is Entry => Boolean(entry));
  const startSlugs = new Set(startHere.map((entry) => entry.slug));
  const deeper = topic.entries.filter((entry) => !startSlugs.has(entry.slug));
  const category = categoryFor(topic.category);

  return (
    <main className="directory-page">
      <DirectoryHeader eyebrow="Topic" title={topic.label} description={topic.description} entryCount={entryCount} surpriseSlugs={surpriseSlugs} />
      <section className="directory-shell">
        <nav className="directory-breadcrumb" aria-label="Topic location">
          <Link href={categoryPath(category.key)}>{category.title}</Link>
          <span>/</span>
          <span>{topic.label}</span>
        </nav>

        {startHere.length ? (
          <section className="directory-section" aria-labelledby="start-heading">
            <h2 id="start-heading">Start Here</h2>
            {entryList(startHere)}
          </section>
        ) : null}

        <section className="directory-section" aria-labelledby="topic-entries-heading">
          <h2 id="topic-entries-heading">{startHere.length ? "Go Deeper" : "Entries"}</h2>
          {entryList(deeper.length ? deeper : topic.entries)}
        </section>
      </section>
    </main>
  );
}

export function TagDirectory({ tag, entryCount, surpriseSlugs }: { tag: TagGroup; entryCount: number; surpriseSlugs: string[] }) {
  const grouped = Array.from(
    tag.entries.reduce((groups, entry) => {
      const key = `${entry.category}:${entry.topic}`;
      const existing = groups.get(key) ?? [];
      existing.push(entry);
      groups.set(key, existing);
      return groups;
    }, new Map<string, Entry[]>()),
  ).sort(([left], [right]) => left.localeCompare(right));

  return (
    <main className="directory-page">
      <DirectoryHeader eyebrow="Tag" title={tag.label} description={`${tag.entries.length} ${tag.entries.length === 1 ? "entry" : "entries"} tagged ${tag.label}.`} entryCount={entryCount} surpriseSlugs={surpriseSlugs} />
      <section className="directory-shell">
        {grouped.map(([key, entries]) => {
          const [category, topic] = key.split(":");
          return (
            <section className="directory-section entry-topic-group" key={key}>
              <h2>{categoryFor(category).title}</h2>
              <h3>{topicFor(topic).label}</h3>
              {entryList(entries)}
            </section>
          );
        })}
      </section>
    </main>
  );
}
