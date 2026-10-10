"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CategoryGroup, Entry, QuizItem, TopicGroup } from "../lib/content";
import { categoryFor } from "../lib/categories";
import type { GradeResult } from "../lib/grading";
import {
  createReview,
  enqueueReview,
  flushOutbox,
  getDueItemIds,
  getSummary,
  removeOutboxEvent,
  readOutbox,
  type MemoryRating,
  type MemorySummary,
  type ReviewTrigger,
} from "../lib/memory-engine";
import { fetchWithSessionRefresh } from "../lib/auth";
import { gradeFeedback } from "../lib/quiz-feedback";
import { readyQuestionIds } from "../lib/quiz-readiness";
import { useQuizReadiness } from "../lib/quiz-readiness-client";
import { questionMap, questionsFromQuiz } from "../lib/quiz-questions";
import {
  isTrackedQuestion,
  createQuizRunRequestGuard,
  matchesManualQuizSelection,
  moveDueQuestionLater,
  nextManualQuestionIndex,
  shuffleCopy,
  type ManualQuizMode,
} from "../lib/quiz-selection";
import { relatedEntrySlugs } from "../lib/relationships";
import { entryPath } from "../lib/routes";
import { topicFor } from "../lib/topics";
import { useAuthSession } from "../lib/use-auth-session";
import { QuizCoveragePanel } from "./QuizCoveragePanel";
import { SiteHeader } from "./SiteHeader";

type QuizCard = QuizItem & {
  slug: string;
  title: string;
  category: string;
  topic: string;
};

type QuizMode = "all" | "category" | "topic" | "related" | "due";
type DueLoadState = "idle" | "loading" | "loaded" | "error";

type Props = {
  entries: Entry[];
  groups: CategoryGroup[];
  topics: TopicGroup[];
  quiz: QuizCard[];
  initialSlug?: string;
  initialTopic?: string;
};

export function QuizApp({ entries, groups, topics, quiz, initialSlug, initialTopic }: Props) {
  const session = useAuthSession();
  const initialEntry = entries.find((entry) => entry.slug === initialSlug) ?? entries[0];
  const initialTopicEntry = entries.find((entry) => entry.topic === initialTopic);
  const [mode, setMode] = useState<QuizMode>(initialSlug ? "related" : initialTopic ? "topic" : "all");
  const [category, setCategory] = useState(initialTopicEntry?.category ?? initialEntry?.category ?? groups[0]?.key ?? "");
  const [topicKey, setTopicKey] = useState(initialTopic ?? initialEntry?.topic ?? topics[0]?.key ?? "");
  const [relatedSlug, setRelatedSlug] = useState(initialEntry?.slug ?? entries[0]?.slug ?? "");
  const [manualRunNumber, setManualRunNumber] = useState(0);
  const [manualRun, setManualRun] = useState<{ key: string; questions: QuizCard[] } | null>(null);
  const [manualQuestionId, setManualQuestionId] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typedResult, setTypedResult] = useState<GradeResult | null>(null);
  const [typedError, setTypedError] = useState("");
  const [grading, setGrading] = useState(false);
  const [dueQuestions, setDueQuestions] = useState<QuizCard[]>([]);
  const [dueIndex, setDueIndex] = useState(0);
  const [dueLoadState, setDueLoadState] = useState<DueLoadState>("idle");
  const dueRequests = useRef(createQuizRunRequestGuard());
  const [memoryStatus, setMemoryStatus] = useState("");
  const [summary, setSummary] = useState<MemorySummary | null>(null);
  const [workloadOnly, setWorkloadOnly] = useState(true);
  const readiness = useQuizReadiness(session);

  const topicEntry = entries.find((entry) => entry.slug === relatedSlug) ?? initialEntry;
  const allQuestions = useMemo(
    () => questionsFromQuiz(quiz),
    [quiz],
  );
  const questionById = useMemo(
    () => questionMap(quiz),
    [quiz],
  );
  const relatedSlugs = useMemo(
    () => topicEntry ? new Set(relatedEntrySlugs(entries, topicEntry)) : new Set<string>(),
    [entries, topicEntry],
  );
  const manualQuestionSet = useMemo(() => {
    if (mode === "due") return [];
    return quiz.filter((question) => matchesManualQuizSelection({
      category,
      mode: mode as ManualQuizMode,
      question,
      registeredIds: new Set(),
      relatedSlugs,
      topic: topicKey,
      workloadOnly: false,
    }));
  }, [category, mode, quiz, relatedSlugs, topicKey]);
  const registeredIds = useMemo(() => readyQuestionIds(allQuestions, readiness.readyEntrySlugs), [allQuestions, readiness.readyEntrySlugs]);
  const workloadFilterActive = Boolean(session && workloadOnly);
  const workloadStatusUnavailable = Boolean(workloadFilterActive && readiness.loadState === "error");
  const workloadStatusLoading = Boolean(workloadFilterActive && readiness.loadState === "loading");
  const manualRunKey = JSON.stringify([mode, category, topicKey, relatedSlug, workloadFilterActive, manualRunNumber]);
  const manualRunLoading = mode !== "due" && manualRun?.key !== manualRunKey;

  useEffect(() => {
    if (mode === "due" || (workloadFilterActive && readiness.loadState !== "loaded")
      || manualRun?.key === manualRunKey) return;
    // Only the client creates a run. A timer also makes initialization cancellable
    // when filters change before the initial run has been prepared.
    const timer = window.setTimeout(() => {
      const questions = shuffleCopy(manualQuestionSet);
      const first = questions.find((question) => !workloadFilterActive || registeredIds.has(question.question_id));
      setManualRun({ key: manualRunKey, questions });
      setManualQuestionId(first?.question_id ?? null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [manualQuestionSet, manualRun, manualRunKey, mode, readiness.loadState, registeredIds, workloadFilterActive]);

  const questionSet = useMemo(() => {
    if (mode === "due") {
      return session ? dueQuestions : [];
    }

    if (workloadFilterActive && readiness.loadState !== "loaded") return [];

    if (manualRun?.key !== manualRunKey) return [];
    return manualRun.questions.filter((question) => matchesManualQuizSelection({
      category,
      mode: mode as ManualQuizMode,
      question,
      registeredIds,
      relatedSlugs,
      topic: topicKey,
      workloadOnly: workloadFilterActive,
    }));
  }, [category, dueQuestions, manualRun, manualRunKey, mode, readiness.loadState, registeredIds, relatedSlugs, session, topicKey, workloadFilterActive]);

  const current = mode === "due"
    ? questionSet[dueIndex]
    : questionSet.find((question) => question.question_id === manualQuestionId) ?? questionSet[0];
  // Anchor a newly eligible fallback before React commits it. In particular,
  // an initially empty run must keep its first available card when more entries
  // become ready. If eligibility removes the old card, clear its answer state.
  if (mode !== "due" && current && current.question_id !== manualQuestionId) {
    setManualQuestionId(current.question_id);
    setShowAnswer(false);
    resetTypedAnswer();
  }
  const currentIsEnrolled = isTrackedQuestion(current, registeredIds, mode === "due", Boolean(session));
  const typedMode = Boolean(session && currentIsEnrolled);
  const currentCategory = current ? categoryFor(current.category).label : "";
  const currentTopic = current ? topicFor(current.topic).label : "";
  const summaryText = !session ? "" : summary
    ? `Due ${summary.due_now} · Reviews ${summary.review_count}`
    : mode === "due" ? memoryStatus : "";
  const dueButtonLabel = dueLoadState === "loaded" ? `Due (${dueQuestions.length})` : "Due";
  const dueEmptyText = dueLoadState === "error"
    ? "Review schedule unavailable. Try Due again in a moment."
    : dueLoadState === "loading" ? "Preparing your due quiz run." : "No questions due.";
  const dueEmptyHeading = dueLoadState === "error"
    ? "Due reviews"
    : dueLoadState === "loading" ? "Loading due reviews" : "You're caught up";
  const dueEmptyClassName = dueLoadState === "error" ? "quiz-status-error" : "quiz-answer";
  const manualEmptyHeading = workloadStatusUnavailable
    ? "Quiz workload unavailable"
    : workloadStatusLoading || manualRunLoading
      ? "Loading quiz workload"
      : workloadFilterActive
        ? "No ready-to-quiz questions match this filter."
        : "This mode does not have quiz prompts yet.";
  const manualEmptyText = workloadStatusUnavailable
    ? "MemoryEngine registration status is unavailable. Try again in a moment."
    : workloadStatusLoading || manualRunLoading
      ? "Preparing your quiz run."
      : workloadFilterActive
        ? "Turn off Ready to quiz only or choose a different category, topic, or related run."
        : "Try all topics, or choose a different category or related-topic seed.";

  const loadDue = useCallback(async (activeSession = session) => {
    const request = dueRequests.current.begin();
    setDueQuestions([]);
    setDueIndex(0);
    if (!activeSession) {
      setMemoryStatus("");
      setDueLoadState("idle");
      return;
    }

    setDueLoadState("loading");
    try {
      await flushOutbox(allQuestions, activeSession);
      if (!dueRequests.current.owns(request)) return;
      const ids = await getDueItemIds(activeSession);
      if (!dueRequests.current.owns(request)) return;
      const nextSummary = await getSummary(activeSession);
      if (!dueRequests.current.owns(request)) return;
      setDueQuestions(shuffleCopy(ids.map((id) => questionById.get(id)).filter((item): item is QuizCard => Boolean(item))));
      setDueIndex(0);
      setSummary(nextSummary);
      setDueLoadState("loaded");
      setMemoryStatus(ids.length ? "Review schedule loaded" : "No questions due");
    } catch {
      if (!dueRequests.current.owns(request)) return;
      setDueQuestions([]);
      setDueIndex(0);
      setSummary(null);
      setDueLoadState("error");
      setMemoryStatus("Couldn't load review schedule");
    }
  }, [allQuestions, questionById, session]);

  function chooseMode(nextMode: QuizMode) {
    dueRequests.current.invalidate();
    setMode(nextMode);
    setManualRunNumber((number) => number + 1);
    setDueIndex(0);
    setShowAnswer(false);
    resetTypedAnswer();
    if (nextMode === "due") void loadDue();
  }

  function nextQuestion() {
    setShowAnswer(false);
    resetTypedAnswer();
    if (mode === "due") {
      setDueIndex((index) => index + 1);
      return;
    }
    const index = questionSet.findIndex((question) => question.question_id === current?.question_id);
    setManualQuestionId(questionSet[nextManualQuestionIndex(index, questionSet.length)]?.question_id ?? null);
  }

  function skipQuestion() {
    nextQuestion();
  }

  function deferDueQuestion() {
    if (mode !== "due" || !current) return;
    setShowAnswer(false);
    resetTypedAnswer();
    if (dueQuestions.length <= 1) {
      setMemoryStatus("Only due question left.");
      setDueIndex(0);
      return;
    }

    const deferred = moveDueQuestionLater(dueQuestions, dueIndex);
    setDueQuestions(deferred.items);
    setDueIndex(deferred.index);
  }

  function resetTypedAnswer() {
    setTypedAnswer("");
    setTypedResult(null);
    setTypedError("");
    setGrading(false);
  }

  function updateCategory(nextCategory: string) {
    setCategory(nextCategory);
    chooseMode("category");
  }

  function updateTopic(nextTopic: string) {
    setTopicKey(nextTopic);
    chooseMode("topic");
  }

  function updateRelatedSeed(nextSlug: string) {
    setRelatedSlug(nextSlug);
    chooseMode("related");
  }

  async function handleTypedSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!current || !currentIsEnrolled) return;

    if (typedResult) {
      nextQuestion();
      return;
    }

    if (!session) return;
    setTypedError("");
    setGrading(true);

    try {
      const trigger = mode === "due" ? "due" : "manual";
      const pendingReview = createReview(current, "again", trigger);
      const response = await fetchWithSessionRefresh(session, "/api/quiz/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: current.question_id,
          userAnswer: typedAnswer,
          review: pendingReview,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not grade answer.");

      setTypedResult(result);
      recordQuestionAnswer(current, result.rating, trigger, {
        eventId: typeof result.event_id === "string" ? result.event_id : pendingReview.event_id,
        reviewedAt: pendingReview.reviewed_at,
        saved: Boolean(result.reviewSaved),
      });
    } catch (error) {
      setTypedError(error instanceof Error ? error.message : "Could not grade answer.");
    } finally {
      setGrading(false);
    }
  }

  function recordQuestionAnswer(
    item: QuizCard,
    rating: MemoryRating,
    trigger: ReviewTrigger,
    persistence?: { eventId: string; reviewedAt: string; saved: boolean },
  ) {
    const review = persistence
      ? {
        ...createReview(item, rating, trigger),
        event_id: persistence.eventId,
        reviewed_at: persistence.reviewedAt,
      }
      : createReview(item, rating, trigger);
    if (!session) {
      return;
    }

    if (persistence?.saved) {
      removeOutboxEvent(review.event_id);
      setMemoryStatus("Review saved.");
      void getSummary(session)
        .then((nextSummary) => setSummary(nextSummary))
        .catch(() => setMemoryStatus("Review saved. Schedule status unavailable."));
      return;
    }

    enqueueReview(review);
    if (persistence && !persistence.saved) {
      setMemoryStatus("Review saved for retry.");
      return;
    }

    void flushOutbox(allQuestions, session)
      .then(() => {
        setMemoryStatus(readOutbox().length ? "Review saved. Syncing saved answers." : "Review saved.");
        return getSummary(session)
          .then((nextSummary) => setSummary(nextSummary))
          .catch(() => setMemoryStatus("Review saved. Schedule status unavailable."));
      })
      .catch(() => {
        setMemoryStatus("Review saved for retry.");
      });
  }

  return (
    <main className="quiz-page">
      <SiteHeader entryCount={entries.length} surpriseSlugs={entries.map((entry) => entry.slug)} />

      <section className="quiz-shell quiz-header">
        <p className="eyebrow">Quiz Me</p>
        <h1>Practice what stuck.</h1>
      </section>

      <section className="quiz-shell quiz-layout">
        <aside className="quiz-controls" aria-label="Quiz modes">
          <div className="mode-buttons">
            <button className={mode === "all" ? "active" : ""} type="button" onClick={() => chooseMode("all")}>
              All topics
            </button>
            <button className={mode === "category" ? "active" : ""} type="button" onClick={() => chooseMode("category")}>
              By category
            </button>
            <button className={mode === "topic" ? "active" : ""} type="button" onClick={() => chooseMode("topic")}>
              By topic
            </button>
            <button className={mode === "related" ? "active" : ""} type="button" onClick={() => chooseMode("related")}>
              Related-topic run
            </button>
            {session ? (
              <button className={mode === "due" ? "active" : ""} type="button" onClick={() => chooseMode("due")}>
                {dueButtonLabel}
              </button>
            ) : null}
          </div>

          <label>
            Category
            <select value={category} onChange={(event) => updateCategory(event.target.value)}>
              {groups.map((group) => (
                <option key={group.key} value={group.key}>
                  {group.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Topic
            <select value={topicKey} onChange={(event) => updateTopic(event.target.value)}>
              {topics.map((topic) => (
                <option key={topic.key} value={topic.key}>
                  {topic.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Related-topic seed
            <select value={topicEntry?.slug ?? ""} onChange={(event) => updateRelatedSeed(event.target.value)}>
              {entries.map((entry) => (
                <option key={entry.slug} value={entry.slug}>
                  {entry.title}
                </option>
              ))}
            </select>
          </label>

          {session ? (
            <label className="quiz-workload-toggle">
              <input
                checked={workloadOnly}
                type="checkbox"
                onChange={(event) => {
                  setWorkloadOnly(event.target.checked);
                  setManualRunNumber((number) => number + 1);
                  setShowAnswer(false);
                  resetTypedAnswer();
                }}
              />
                <span>Ready to quiz only</span>
            </label>
          ) : null}

          <p>
            {questionSet.length} {questionSet.length === 1 ? "question" : "questions"}
            {mode === "category" ? ` from ${categoryFor(category).label}` : null}
            {mode === "topic" ? ` from ${topicFor(topicKey).label}` : null}
            {mode === "related" && topicEntry ? ` around ${topicEntry.title}` : null}
          </p>
          {session && summaryText ? <p>{summaryText}</p> : null}
        </aside>

        <article className="quiz-card">
          {current ? (
            <>
              <div className="quiz-context">
                <p>{currentCategory} › {currentTopic}</p>
                <strong>{current.title}</strong>
              </div>
              {mode === "due" ? (
                <p className="quiz-progress">Due review · {dueIndex + 1} of {dueQuestions.length}</p>
              ) : null}
              <h2>{current.question}</h2>
              {typedMode ? (
                <form className="typed-answer-form" onSubmit={handleTypedSubmit}>
                  <label htmlFor="typed-answer">Answer</label>
                  <input
                    autoComplete="off"
                    id="typed-answer"
                    value={typedAnswer}
                    onChange={(event) => setTypedAnswer(event.target.value)}
                    disabled={typedResult !== null || grading}
                  />
                  {typedResult ? (
                    <p className={typedResult.correct ? "quiz-answer correct" : "quiz-answer incorrect"}>
                      {(() => {
                        const feedback = gradeFeedback(typedResult, current.answer);
                        return (
                          <>
                            <strong>{feedback.lead}</strong>
                            <span className="grade-canonical">{feedback.answer}</span>
                          </>
                        );
                      })()}
                    </p>
                  ) : null}
                  {typedError ? <p className="review-error">{typedError}</p> : null}
                  <div className="quiz-actions">
                    <button type="submit" disabled={grading || (!typedResult && typedAnswer.trim().length === 0)}>
                      {typedResult ? "Next question" : grading ? "Grading..." : "Submit answer"}
                    </button>
                    {!typedResult ? (
                      mode === "due" ? (
                        <button type="button" onClick={deferDueQuestion}>Later</button>
                      ) : (
                        <button type="button" onClick={skipQuestion}>Skip</button>
                      )
                    ) : null}
                    <Link href={entryPath(current.slug)}>Open source entry</Link>
                  </div>
                </form>
              ) : (
                <>
                  {showAnswer ? <p className="quiz-answer">{current.answer}</p> : null}
                  <div className="quiz-actions">
                    <button type="button" onClick={() => setShowAnswer((value) => !value)}>
                      {showAnswer ? "Hide answer" : "Reveal answer"}
                    </button>
                    <button type="button" onClick={showAnswer ? nextQuestion : skipQuestion}>
                      {showAnswer ? "Next question" : "Skip"}
                    </button>
                    <Link href={entryPath(current.slug)}>Open source entry</Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <p className="entry-kicker">{manualRunLoading || workloadStatusLoading || (mode === "due" && dueLoadState === "loading") ? "Preparing quiz" : "No questions yet"}</p>
              <h2>{mode === "due" ? dueEmptyHeading : manualEmptyHeading}</h2>
              <p className={mode === "due" ? dueEmptyClassName : "quiz-answer"}>
                {mode === "due" ? dueEmptyText : manualEmptyText}
              </p>
            </>
          )}
        </article>
      </section>

      <section className="quiz-shell">
        <QuizCoveragePanel
          groups={groups}
          topics={topics}
          loadState={readiness.loadState}
          readyEntrySlugs={readiness.readyEntrySlugs}
          onUpdate={readiness.update}
        />
      </section>
    </main>
  );
}
