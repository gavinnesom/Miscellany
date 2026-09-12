"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CategoryGroup, TopicGroup } from "../lib/content";
import type { QuizReadinessSyncResult, QuizReadinessUpdate } from "../lib/quiz-readiness";
import {
  buildEntryCoverage,
  buildCoverageHierarchy,
  coverageCounts,
  coverageSummaryLabel,
  filterCoverageHierarchy,
  type CategoryQuizCoverage,
  type EntryQuizCoverage,
  type QuizCoverageFilter,
  type QuizCoverageLoadState,
  type TopicQuizCoverage,
} from "../lib/quiz-coverage";
import { entryPath } from "../lib/routes";

type Props = {
  groups: CategoryGroup[];
  topics: TopicGroup[];
  loadState: QuizCoverageLoadState;
  readyEntrySlugs: Set<string>;
  onUpdate: (updates: QuizReadinessUpdate[]) => Promise<{ synchronization?: QuizReadinessSyncResult }>;
};

function countLabel(ready: number, total: number, readyQuestionCount: number, questionCount: number) {
  return `${ready}/${total} entries · ${readyQuestionCount}/${questionCount} questions`;
}

function statusLabel(entry: EntryQuizCoverage) {
  return entry.status === "ready" ? "Ready to quiz" : "Not ready to quiz";
}

function questionLabel(entry: EntryQuizCoverage) {
  if (entry.questionCount === 1) return "1 active question";
  return `${entry.questionCount} active questions`;
}

export function QuizCoveragePanel({ groups, topics, loadState, readyEntrySlugs, onUpdate }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<QuizCoverageFilter>("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(() => new Set());
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(() => new Set());
  const [saving, setSaving] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const coverageEntries = useMemo(() => buildEntryCoverage(groups.flatMap((group) => group.entries), readyEntrySlugs), [groups, readyEntrySlugs]);
  const counts = useMemo(() => coverageCounts(coverageEntries), [coverageEntries]);
  const hierarchy = useMemo(() => buildCoverageHierarchy(groups, topics, coverageEntries), [coverageEntries, groups, topics]);
  const filteredHierarchy = useMemo(() => filterCoverageHierarchy(hierarchy, { filter, query }), [filter, hierarchy, query]);
  const fullCategoryCounts = useMemo(() => new Map(hierarchy.map((category) => [category.key, category])), [hierarchy]);
  const fullTopicCounts = useMemo(() => {
    const countMap = new Map<string, TopicQuizCoverage>();
    for (const category of hierarchy) for (const topic of category.topics) countMap.set(topic.key, topic);
    return countMap;
  }, [hierarchy]);
  const searchActive = query.trim().length > 0;
  const summary = coverageSummaryLabel(loadState, loadState === "loaded" ? counts : null);
  const selectableSlugs = useMemo(() => new Set(coverageEntries.filter((entry) => entry.questionCount > 0).map((entry) => entry.slug)), [coverageEntries]);
  const selectedEntries = [...selectedSlugs].filter((slug) => selectableSlugs.has(slug));

  function toggleCategory(category: CategoryQuizCoverage, open: boolean) {
    if (searchActive) return;
    setExpandedCategories((current) => {
      const next = new Set(current);
      if (open) next.add(category.key);
      else next.delete(category.key);
      return next;
    });
  }

  function toggleTopic(topic: TopicQuizCoverage, open: boolean) {
    if (searchActive) return;
    setExpandedTopics((current) => {
      const next = new Set(current);
      if (open) next.add(topic.key);
      else next.delete(topic.key);
      return next;
    });
  }

  function toggleSelection(slug: string) {
    setSelectedSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  async function markSelectedReady() {
    if (!selectedEntries.length) return;
    setSaving(true);
    setSyncMessage("");
    try {
      const result = await onUpdate(selectedEntries.map((entrySlug) => ({ entrySlug, isReady: true })));
      const failures = result.synchronization?.failures.length ?? 0;
      setSyncMessage(failures ? `Ready to quiz saved. ${failures} question${failures === 1 ? "" : "s"} still need registration.` : "Ready to quiz saved and active questions synchronized.");
      setSelectedSlugs(new Set());
    } catch (error) {
      setSyncMessage(error instanceof Error ? error.message : "Could not update quiz readiness.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <details className="quiz-coverage">
      <summary><span>{summary}</span></summary>
      {loadState === "signed-out" ? <p className="quiz-coverage-message">Sign in to choose entries to mark ready to quiz.</p> : null}
      {loadState === "loading" ? <p className="quiz-coverage-message">Loading saved readiness.</p> : null}
      {loadState === "error" ? <p className="quiz-coverage-message error">Readiness could not be loaded. This is not treated as Not ready.</p> : null}
      {loadState === "loaded" ? (
        <>
          <div className="quiz-coverage-toolbar" aria-label="Quiz coverage filters">
            <label><span>Search entries</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search entry titles..." /></label>
            <div className="quiz-coverage-filter" role="group" aria-label="Readiness filter">
              {(["all", "ready", "not-ready"] as const).map((option) => <button key={option} type="button" className={filter === option ? "active" : ""} onClick={() => setFilter(option)}>{option === "all" ? "All" : option === "ready" ? "Ready to quiz" : "Not ready to quiz"}</button>)}
            </div>
          </div>
          <div className="quiz-readiness-actions" aria-live="polite">
            <span>{selectedEntries.length ? `${selectedEntries.length} selected` : "Select entries to mark ready to quiz"}</span>
            <button type="button" disabled={saving || selectedEntries.length === 0} onClick={() => void markSelectedReady()}>Mark selected ready to quiz</button>
            {syncMessage ? <p>{syncMessage}</p> : null}
          </div>
          {filteredHierarchy.length ? <div className="quiz-coverage-tree">{filteredHierarchy.map((category) => {
            const fullCategory = fullCategoryCounts.get(category.key) ?? category;
            const categoryOpen = searchActive || expandedCategories.has(category.key);
            return <details key={category.key} className="coverage-category" open={categoryOpen} onToggle={(event) => toggleCategory(category, event.currentTarget.open)}>
              <summary><span>{category.label}</span><em>{countLabel(fullCategory.ready, fullCategory.total, fullCategory.readyQuestionCount, fullCategory.questionCount)}</em></summary>
              {category.topics.map((topic) => {
                const fullTopic = fullTopicCounts.get(topic.key) ?? topic;
                const topicOpen = searchActive || expandedTopics.has(topic.key);
                return <details key={topic.key} className="coverage-topic" open={topicOpen} onToggle={(event) => toggleTopic(topic, event.currentTarget.open)}>
                  <summary><span>{topic.label}</span><em>{countLabel(fullTopic.ready, fullTopic.total, fullTopic.readyQuestionCount, fullTopic.questionCount)}</em></summary>
                  <ul>{topic.entries.map((entry) => <li key={entry.slug} className={`coverage-entry ${entry.status}`}>
                    {entry.status === "not-ready" ? <input aria-label={`Select ${entry.title}`} type="checkbox" checked={selectedSlugs.has(entry.slug)} disabled={entry.questionCount === 0 || saving} onChange={() => toggleSelection(entry.slug)} /> : <span aria-hidden="true" />}
                    <Link href={entryPath(entry.slug)}>{entry.title}</Link><span>{questionLabel(entry)}</span><strong>{statusLabel(entry)}</strong>
                  </li>)}</ul>
                </details>;
              })}
            </details>;
          })}</div> : <p className="quiz-coverage-message">No entries match that coverage view.</p>}
        </>
      ) : null}
    </details>
  );
}
