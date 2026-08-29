"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import type { CategoryGroup, Entry, TopicGroup } from "../lib/content";
import { categoryFor } from "../lib/categories";
import { fetchWithSessionRefresh } from "../lib/auth";
import { questionsForEntry } from "../lib/quiz-questions";
import { relationshipSections } from "../lib/relationships";
import type { ReviewSummary } from "../lib/review";
import { selectedTextWithinElement } from "../lib/review-selection";
import { categoryPath, entryPath, quizTopicPath, tagPath, topicPath } from "../lib/routes";
import { topicFor } from "../lib/topics";
import { useAuthSession } from "../lib/use-auth-session";
import { useQuizReadiness } from "../lib/quiz-readiness-client";
import { EntryFigure, EntryMarkdown, EntryVideo } from "./EntryMarkdown";
import { SiteHeader } from "./SiteHeader";

type Props = {
  entries: Entry[];
  groups: CategoryGroup[];
  topics: TopicGroup[];
  initialSlug?: string;
};

function formatEntryDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest(
    "input, textarea, select, button, a, summary, details, [contenteditable='true'], [role='button'], [role='link'], [role='textbox'], [role='combobox'], [role='menuitem'], [tabindex]",
  ));
}

function slugFromLocation() {
  const entryMatch = window.location.pathname.match(/^\/entry\/([^/]+)\/?$/);
  if (entryMatch) return decodeURIComponent(entryMatch[1]);
  if (window.location.hash.length > 1) return decodeURIComponent(window.location.hash.slice(1));
  return "";
}

export function MiscellanyApp({ entries, groups, topics, initialSlug }: Props) {
  const session = useAuthSession();
  const initialEntry = entries.find((entry) => entry.slug === initialSlug) ?? entries[0];
  const [selectedSlug, setSelectedSlug] = useState(initialEntry?.slug ?? "");
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(() => new Set(initialEntry?.topic ? [initialEntry.topic] : []));
  const [query, setQuery] = useState("");
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary>({ available: false, total: 0, pending: [] });
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewPanelOpen, setReviewPanelOpen] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewSelectedText, setReviewSelectedText] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSaving, setReviewSaving] = useState(false);
  const [memoryStatus, setMemoryStatus] = useState("");
  const [memorySaving, setMemorySaving] = useState(false);

  const selected = entries.find((entry) => entry.slug === selectedSlug) ?? entries[0];
  const selectedQuestions = useMemo(
    () => questionsForEntry(selected),
    [selected],
  );
  const readiness = useQuizReadiness(session);
  const selectedReady = selectedQuestions.length > 0
    && readiness.readyEntrySlugs.has(selected.slug);
  const learningUnavailable = Boolean(session && selectedQuestions.length > 0 && readiness.loadState === "error");

  const searchResults = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return entries.filter((entry) => {
      return terms.every((term) => entry.searchText.includes(term));
    });
  }, [entries, query]);

  const categoryTopics = useMemo(() => {
    return topics
      .filter((topic) => topic.category === selected.category)
      .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  }, [selected.category, topics]);

  const selectedTopicEntries = useMemo(() => {
    return topics.find((topic) => topic.key === selected.topic)?.entries ?? [];
  }, [selected.topic, topics]);
  const selectedReview = useMemo(() => {
    return reviewSummary.pending.find((request) => request.entry === selected.slug);
  }, [reviewSummary.pending, selected.slug]);


  const resetReviewPanel = useCallback(() => {
    setReviewPanelOpen(false);
    setReviewMessage("");
    setReviewSelectedText("");
    setReviewError("");
  }, []);


  const selectedRelationshipSections = useMemo(() => relationshipSections(entries, selected), [entries, selected]);

  useEffect(() => {
    let cancelled = false;

    async function loadReviewSummary() {
      if (!session) {
        setReviewSummary({ available: false, total: 0, pending: [] });
        setReviewMode(false);
        return;
      }

      try {
        const response = await fetchWithSessionRefresh(session, "/api/review/summary", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const summary = await response.json() as ReviewSummary;
        if (!cancelled) {
          setReviewSummary(summary);
          const params = new URLSearchParams(window.location.search);
          if (summary.available && params.get("review") === "1") setReviewMode(true);
        }
      } catch {
        if (!cancelled) setReviewSummary({ available: false, total: 0, pending: [] });
      }
    }


    loadReviewSummary();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const openEntry = useCallback((slug: string) => {
    const entry = entries.find((candidate) => candidate.slug === slug);
    resetReviewPanel();
    setMemoryStatus("");
    setSelectedSlug(slug);
    if (entry) {
      setExpandedTopics((current) => new Set([...current, entry.topic]));
    }
    setQuery("");
    window.history.pushState(null, "", entryPath(slug));
  }, [entries, resetReviewPanel]);

  useEffect(() => {
    const slugs = new Set(entries.map((entry) => entry.slug));
    const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));

    function syncFromLocation() {
      const locationSlug = slugFromLocation();
      if (slugs.has(locationSlug)) {
        resetReviewPanel();
        setMemoryStatus("");
        setSelectedSlug(locationSlug);
        const entry = bySlug.get(locationSlug);
        if (entry) {
          setExpandedTopics((current) => new Set([...current, entry.topic]));
        }
        if (window.location.hash === `#${locationSlug}`) {
          window.history.replaceState(null, "", entryPath(locationSlug));
        }
      }
    }

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);

    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [entries, resetReviewPanel]);

  useEffect(() => {
    document.title = window.location.pathname.startsWith("/entry/")
      ? `${selected.title} | Gavin's Miscellany`
      : "Gavin's Miscellany";
  }, [selected.title]);

  useEffect(() => {
    if (!reviewPanelOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (target instanceof HTMLElement && !target.closest(".entry-review-cluster")) {
        setReviewPanelOpen(false);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reviewPanelOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      if (event.key === "[" || event.key === "]") {
        const topicIndex = categoryTopics.findIndex((topic) => topic.key === selected.topic);
        const nextTopic = categoryTopics[event.key === "[" ? topicIndex - 1 : topicIndex + 1];
        const nextEntry = nextTopic?.entries[0];

        if (nextEntry) {
          event.preventDefault();
          openEntry(nextEntry.slug);
        }
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const entryIndex = selectedTopicEntries.findIndex((entry) => entry.slug === selected.slug);
        const nextEntry = selectedTopicEntries[event.key === "ArrowLeft" ? entryIndex - 1 : entryIndex + 1];

        if (nextEntry) {
          event.preventDefault();
          openEntry(nextEntry.slug);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [categoryTopics, entries, openEntry, selected.slug, selected.topic, selectedTopicEntries]);

  function firstEntryForCategory(category: string) {
    const firstTopic = topics
      .filter((topic) => topic.category === category)
      .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
      .find((topic) => entries.some((entry) => entry.topic === topic.key));

    if (!firstTopic) return entries.filter((entry) => entry.category === category).sort((a, b) => a.title.localeCompare(b.title))[0];
    return firstTopic.entries[0];
  }

  function openCategory(category: string) {
    const entry = firstEntryForCategory(category);
    if (entry) openEntry(entry.slug);
  }

  function surprise() {
    const next = entries[Math.floor(Math.random() * entries.length)];
    if (next) openEntry(next.slug);
  }

  function captureEntrySelection() {
    const article = document.getElementById(selected.slug);
    return selectedTextWithinElement(window.getSelection(), article);
  }

  function openReviewPanel() {
    const selectedText = captureEntrySelection();
    setReviewMessage(selectedReview?.message ?? "");
    setReviewSelectedText(selectedText || selectedReview?.selected_text || "");
    setReviewError("");
    setReviewPanelOpen(true);
  }

  async function createReviewRequest({ message, selectedText }: { message: string; selectedText: string }) {
    if (!session) throw new Error("Sign in to use Review.");

    const response = await fetchWithSessionRefresh(session, "/api/review/request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        entry: selected.slug,
        entryTitle: selected.title,
        message,
        selectedText,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Could not save review.");
    setReviewSummary(result.summary);
    return result;
  }

  async function flagEntryForReview() {
    setReviewError("");

    if (selectedReview) {
      openReviewPanel();
      return;
    }

    setReviewSaving(true);
    try {
      await createReviewRequest({ message: "", selectedText: "" });
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Could not save review.");
    } finally {
      setReviewSaving(false);
    }
  }

  async function saveReview() {
    setReviewError("");
    setReviewSaving(true);

    try {
      await createReviewRequest({
        message: reviewMessage,
        selectedText: reviewSelectedText,
      });
      setReviewPanelOpen(false);
      setReviewMessage("");
      setReviewSelectedText("");
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Could not save review.");
    } finally {
      setReviewSaving(false);
    }
  }

  async function removeReview() {
    if (!session) return;
    setReviewError("");
    setReviewSaving(true);

    try {
      const response = await fetchWithSessionRefresh(session, "/api/review/request", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ entry: selected.slug }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not remove review.");

      setReviewSummary(result.summary);
      resetReviewPanel();
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Could not remove review.");
    } finally {
      setReviewSaving(false);
    }
  }

  async function markReadyToQuiz() {
    if (!session || selectedQuestions.length === 0 || learningUnavailable) return;

    setMemorySaving(true);
    setMemoryStatus("");

    try {
      const result = await readiness.update([{ entrySlug: selected.slug, isReady: true }], session);
      const failures = result.synchronization?.failures.length ?? 0;
      setMemoryStatus(failures ? `Ready for quiz. ${failures} question${failures === 1 ? "" : "s"} still need registration.` : "Ready for quiz.");
    } catch (error) {
      setMemoryStatus(error instanceof Error ? error.message : "Could not save quiz readiness.");
    } finally {
      setMemorySaving(false);
    }
  }

  function toggleTopic(topic: string) {
    setExpandedTopics((current) => {
      const next = new Set(current);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setQuery("");
    window.history.pushState(null, "", "/");
    document.title = "Gavin's Miscellany";
    document.getElementById("top")?.scrollIntoView();
  }

  const browserPanelContent = (
    <>
      {query.trim() ? (
        <>
          <div className="panel-heading">
            <h2>Search Results</h2>
            <button type="button" onClick={() => setQuery("")}>Close</button>
          </div>
          <div className="entry-list">
            {searchResults.map((entry) => (
              <button
                type="button"
                key={entry.slug}
                className={entry.slug === selected.slug ? "entry-row selected" : "entry-row"}
                onClick={() => openEntry(entry.slug)}
              >
                <span>{entry.title}</span>
                <small>{categoryFor(entry.category).title} / {topicFor(entry.topic).label}</small>
              </button>
            ))}
            {searchResults.length === 0 ? <p className="empty-list">No matching entries.</p> : null}
          </div>
        </>
      ) : (
        <>
          <div className="panel-heading tree-heading">
            <div>
              <h2>{categoryFor(selected.category).title}</h2>
              <Link href={categoryPath(selected.category)}>Overview</Link>
            </div>
          </div>
          <div className="topic-tree">
            {categoryTopics.map((topic) => {
              const topicEntries = topic.entries;
              const expanded = expandedTopics.has(topic.key);

              return (
                <section className="topic-node" key={topic.key}>
                  <div className={topic.key === selected.topic ? "topic-node-heading active" : "topic-node-heading"}>
                    <button type="button" onClick={() => toggleTopic(topic.key)} aria-expanded={expanded}>
                      <span>{expanded ? "▾" : "▸"}</span>
                      {topic.label}
                    </button>
                    <div className="topic-node-actions">
                      <Link href={quizTopicPath(topic.key)}>quiz</Link>
                      <Link href={topicPath(topic.key)}>overview</Link>
                    </div>
                  </div>
                  {expanded ? (
                    <div className="entry-list topic-entry-list">
                      {topicEntries.map((entry) => (
                        <button
                          type="button"
                          key={entry.slug}
                          className={entry.slug === selected.slug ? "entry-row selected" : "entry-row"}
                          onClick={() => openEntry(entry.slug)}
                        >
                          <span>{entry.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </>
      )}
    </>
  );

  return (
    <main>
      <SiteHeader
        entryCount={entries.length}
        onHome={goHome}
        onSurprise={surprise}
        review={session ? {
          available: reviewSummary.available,
          count: reviewSummary.total,
          active: reviewMode,
          onToggle: () => setReviewMode((current) => !current),
        } : undefined}
        search={(
          <div className="search-wrap">
            <label htmlFor="search">Search the miscellany</label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Search entries..."
            />
          </div>
        )}
      />

      <section className="category-index" aria-label="Categories">
        {groups.map((group) => (
          <button
            className={selected.category === group.slug ? "category-tile active" : "category-tile"}
            key={group.slug}
            type="button"
            onClick={() => openCategory(group.slug)}
          >
            <span>{group.title}</span>
            <small>{group.entries.length}</small>
          </button>
        ))}
      </section>

      <details className="mobile-browser-drawer">
        <summary>
          <span>Browse</span>
          <em>{categoryFor(selected.category).title} / {topicFor(selected.topic).label}</em>
        </summary>
        <aside className="library-panel mobile-library-panel" aria-label="Mobile category browser">
          {browserPanelContent}
        </aside>
      </details>

      <section className="workspace">
        <aside className="library-panel desktop-library-panel" aria-label="Category browser">
          {browserPanelContent}
        </aside>

        <article className={selected.entry_type === "book" ? "entry-card book-entry" : "entry-card"} id={selected.slug}>
          <nav className="entry-kicker entry-breadcrumb" aria-label="Entry location">
            <Link href={categoryPath(selected.category)}>{categoryFor(selected.category).title}</Link>
            <span>/</span>
            <Link href={topicPath(selected.topic)}>{topicFor(selected.topic).label}</Link>
          </nav>
          <h2>{selected.title}</h2>
          {selected.entry_type === "book" ? (
            <div className="book-header" aria-label="Book details">
              <span className="book-badge">Book</span>
              {[selected.author, selected.year, selected.book_type].filter(Boolean).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
          <div className="entry-meta-row">
            {session && reviewSummary.available && reviewMode ? (
              <section className="entry-review-cluster" aria-label="Editorial review controls">
                <button
                  type="button"
                  className="review-button"
                  onClick={flagEntryForReview}
                  disabled={reviewSaving}
                >
                  Review{selectedReview ? " ✓" : ""}
                </button>
                {reviewPanelOpen ? (
                  <div className="review-panel">
                    <div className="review-panel-heading">
                      <strong>Review {selected.title}</strong>
                      <button type="button" onClick={() => setReviewPanelOpen(false)}>Close</button>
                    </div>
                    {reviewSelectedText ? (
                      <p className="review-selected">Selected: &quot;{reviewSelectedText}&quot;</p>
                    ) : null}
                    <label>
                      <span>Note</span>
                      <textarea
                        value={reviewMessage}
                        onChange={(event) => setReviewMessage(event.target.value)}
                        placeholder="Tell the AI what you want changed..."
                        rows={4}
                      />
                    </label>
                    {reviewError ? <p className="review-error">{reviewError}</p> : null}
                    <div className="review-panel-actions">
                      <button type="button" onClick={saveReview} disabled={reviewSaving}>Save review</button>
                      <button type="button" className="review-remove-button" onClick={removeReview} disabled={reviewSaving}>Remove review</button>
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}
            {session && selectedQuestions.length && !learningUnavailable ? (
              <section className="memory-ready-cluster" aria-label="Learning controls">
                <button
                  type="button"
                  className="memory-ready-button"
                  onClick={markReadyToQuiz}
                  disabled={memorySaving || selectedReady || readiness.loadState !== "loaded"}
                >
                  {selectedReady ? "Ready to quiz ✓" : "Ready to quiz? ○"}
                </button>
                {session && memoryStatus ? <span>{memoryStatus}</span> : null}
              </section>
            ) : null}
            {learningUnavailable ? (
              <section className="memory-ready-cluster" aria-label="Learning controls">
                <span>Quiz status unavailable</span>
              </section>
            ) : null}
            {selected.tags.length ? (
              <nav className="entry-tags" aria-label="Entry tags">
                {selected.tags.map((tag) => <Link key={tag} href={tagPath(tag)}>{tag}</Link>)}
              </nav>
            ) : null}
          </div>
          <EntryMarkdown
            body={selected.body}
            afterIntro={<EntryFigure entry={selected} />}
          />
          <EntryVideo entry={selected} />
          {selectedRelationshipSections.length ? (
            <section className="relationship-nav" aria-label="Entry relationships">
              {selectedRelationshipSections.map((section) => (
                <div className="relationship-group" key={section.label}>
                  <h3>{section.label}</h3>
                  <div>
                    {section.entries.map((entry) => (
                      <button key={entry.slug} type="button" onClick={() => openEntry(entry.slug)}>
                        {entry.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : null}
          {selected.sources.length ? (
            <section className="sources">
              <h3>sources</h3>
              {selected.sources.map((source) =>
                source.url ? <a key={source.label} href={source.url} target="_blank" rel="noreferrer">{source.label}</a> : <span key={source.label}>{source.label}</span>,
              )}
            </section>
          ) : null}
          {session && selected.quiz.length ? (
            <details className="question-audit">
              <summary>Questions ({selected.quiz.length})</summary>
              <ol>
                {selected.quiz.map((item) => (
                  <li key={item.question_id}>{item.question}</li>
                ))}
              </ol>
            </details>
          ) : null}
          <footer>
            <span>
              Added {formatEntryDate(selected.date_added)}
              {selected.date_updated ? ` · Updated ${formatEntryDate(selected.date_updated)}` : ""}
            </span>
          </footer>
        </article>
      </section>
    </main>
  );
}
