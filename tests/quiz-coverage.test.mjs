import assert from "node:assert/strict";
import test from "node:test";

import { buildEntryCoverage, coverageCounts, coverageSummaryLabel, filterCoverageHierarchy, buildCoverageHierarchy } from "../app/lib/quiz-coverage.ts";
import { readyQuestionIds } from "../app/lib/quiz-readiness.ts";

const spring = entry("spring", "Spring", [question("spring:q1"), question("spring:q2")]);
const retired = entry("retired", "Retired", [{ ...question("retired:q1"), status: "retired" }]);
const logic = entry("logic", "Logic", [question("logic:q1")]);
const groups = [{ slug: "engineering", title: "Engineering", entries: [spring] }, { slug: "philosophy", title: "Philosophy", entries: [logic, retired] }];
const topics = [{ key: "vehicles", label: "Vehicles", category: "engineering", entries: [spring] }, { key: "formal", label: "Formal", category: "philosophy", entries: [logic, retired] }];

test("saved entry readiness, not MemoryEngine registration, drives coverage", () => {
  const coverage = buildEntryCoverage([spring, logic, retired], new Set(["spring"]));
  assert.deepEqual(coverageCounts(coverage), { ready: 1, notReady: 2, problem: 0, total: 3, readyQuestionCount: 2, questionCount: 3 });
  assert.equal(coverage[0].readyQuestionCount, 2);
  assert.equal(coverage[2].questionCount, 0);
});

test("ready entries supply typed-question identities without per-question probes", () => {
  const ids = readyQuestionIds([{ ...question("spring:q1"), slug: "spring" }, { ...question("logic:q1"), slug: "logic" }], new Set(["spring"]));
  assert.deepEqual([...ids], ["spring:q1"]);
});

test("coverage filtering preserves hierarchy", () => {
  const hierarchy = buildCoverageHierarchy(groups, topics, buildEntryCoverage([spring, logic, retired], new Set(["spring"])));
  const filtered = filterCoverageHierarchy(hierarchy, { filter: "ready", query: "spring" });
  assert.deepEqual(filtered.flatMap((group) => group.topics.flatMap((topic) => topic.entries.map((entry) => entry.slug))), ["spring"]);
  assert.deepEqual({
    category: [hierarchy[0].ready, hierarchy[0].total, hierarchy[0].readyQuestionCount, hierarchy[0].questionCount],
    topic: [hierarchy[0].topics[0].ready, hierarchy[0].topics[0].total, hierarchy[0].topics[0].readyQuestionCount, hierarchy[0].topics[0].questionCount],
  }, { category: [1, 1, 2, 2], topic: [1, 1, 2, 2] });
  assert.deepEqual({
    filteredCategory: [filtered[0].ready, filtered[0].total, filtered[0].readyQuestionCount, filtered[0].questionCount],
    fullCategory: [hierarchy[0].ready, hierarchy[0].total, hierarchy[0].readyQuestionCount, hierarchy[0].questionCount],
  }, { filteredCategory: [1, 1, 2, 2], fullCategory: [1, 1, 2, 2] });
  assert.equal(coverageSummaryLabel("error", null), "Quiz coverage - readiness unavailable");
  assert.equal(coverageSummaryLabel("loaded", coverageCounts(buildEntryCoverage([spring, logic, retired], new Set(["spring"])))), "Quiz coverage - 1 of 3 entries ready to quiz · 2 of 3 active questions ready to quiz");
});

function question(question_id) { return { question_id, version: 1, status: "active", question: "Question?", answer: "Answer.", rubric: "Rubric." }; }
function entry(slug, title, quiz) { return { slug, title, category: slug === "spring" ? "engineering" : "philosophy", topic: slug === "spring" ? "vehicles" : "formal", quiz }; }
