import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeGradeResult } from "../app/lib/grading.ts";
import {
  isTrackedQuestion,
  matchesManualQuizSelection,
  moveDueQuestionLater,
  nextManualQuestionIndex,
  shuffleCopy,
} from "../app/lib/quiz-selection.ts";
import { selectedTextWithinElement } from "../app/lib/review-selection.ts";

const registeredQuestion = question({
  category: "engineering-machines",
  question_id: "car-suspension-basics:different-jobs-spring-shock-absorber-perform",
  slug: "car-suspension-basics",
  title: "Car Suspension Basics",
  topic: "vehicles-drivetrains",
});

const unregisteredQuestion = question({
  category: "philosophy",
  question_id: "beyond-classical-logic:law-of-excluded-middle",
  slug: "beyond-classical-logic",
  title: "Beyond Classical Logic",
  topic: "logic-formal-reasoning",
});

const registeredIds = new Set([registeredQuestion.question_id]);

test("shuffle copies empty, single and many-item pools without changing identity or eligibility", () => {
  for (const input of [[], [registeredQuestion], [registeredQuestion, unregisteredQuestion, question({ question_id: "third" })]]) {
    const original = [...input];
    const result = shuffleCopy(input, () => 0);
    assert.notEqual(result, input);
    assert.deepEqual(input, original);
    assert.deepEqual(new Set(result), new Set(input));
    assert.equal(result.length, input.length);
  }
});

test("fixed due IDs produce shuffled local presentation; Later preserves the remaining queue", () => {
  const ids = ["a", "missing", "b", "c"];
  const cards = new Map(["a", "b", "c"].map((question_id) => [question_id, { question_id }]));
  const eligible = ids.map((id) => cards.get(id)).filter(Boolean);
  const run = shuffleCopy(eligible, () => 0);
  assert.deepEqual(run.map((card) => card.question_id), ["b", "c", "a"]);
  assert.deepEqual(ids, ["a", "missing", "b", "c"]);
  assert.deepEqual(moveDueQuestionLater(run, 0).items.map((card) => card.question_id), ["c", "a", "b"]);
});

test("grading feedback truncates at a boundary with an ellipsis", () => {
  const result = sanitizeGradeResult({
    correct: false,
    rating: "hard",
    label: "Close",
    explanation: "This answer identifies that the tire should follow the road and that the body should remain calmer, but it never distinguishes the spring's role from the damper's role: springs support load and store energy while dampers dissipate energy as heat.",
  });

  assert.equal(result.explanation.endsWith("..."), true);
  assert.doesNotMatch(result.explanation, /whe$|sprin$/);
  assert.match(result.explanation, /\.\.\.$/);
  assert.ok(result.explanation.length <= 243);
});

test("manual workload filtering keeps only registered questions across modes", () => {
  assert.equal(matches(registeredQuestion, { mode: "all", workloadOnly: true }), true);
  assert.equal(matches(unregisteredQuestion, { mode: "all", workloadOnly: true }), false);
  assert.equal(matches(registeredQuestion, { mode: "category", category: "engineering-machines", workloadOnly: true }), true);
  assert.equal(matches(registeredQuestion, { mode: "category", category: "philosophy", workloadOnly: true }), false);
  assert.equal(matches(registeredQuestion, { mode: "topic", topic: "vehicles-drivetrains", workloadOnly: true }), true);
  assert.equal(matches(registeredQuestion, { mode: "topic", topic: "logic-formal-reasoning", workloadOnly: true }), false);
  assert.equal(matches(registeredQuestion, {
    mode: "related",
    relatedSlugs: new Set(["car-suspension-basics"]),
    workloadOnly: true,
  }), true);
});

test("manual filter off permits mixed corpus while tracked status stays per question", () => {
  assert.equal(matches(unregisteredQuestion, { mode: "all", workloadOnly: false }), true);
  assert.equal(isTrackedQuestion(registeredQuestion, registeredIds, false, true), true);
  assert.equal(isTrackedQuestion(unregisteredQuestion, registeredIds, false, true), false);
  assert.equal(isTrackedQuestion(registeredQuestion, registeredIds, false, false), false);
});

test("empty registered subset does not match unregistered questions", () => {
  assert.equal(matches(unregisteredQuestion, { mode: "topic", topic: "logic-formal-reasoning", workloadOnly: true }), false);
});

test("Skip advances without returning the same manual question when alternatives exist", () => {
  assert.equal(nextManualQuestionIndex(0, 3), 1);
  assert.equal(nextManualQuestionIndex(2, 3), 0);
  assert.equal(nextManualQuestionIndex(0, 1), 0);
  assert.equal(nextManualQuestionIndex(0, 0), 0);
});

test("Due Later moves the item behind alternatives without creating scheduling state", () => {
  assert.deepEqual(moveDueQuestionLater(["a", "b", "c"], 0), { items: ["b", "c", "a"], index: 0 });
  assert.deepEqual(moveDueQuestionLater(["a", "b", "c"], 1), { items: ["a", "c", "b"], index: 1 });
  assert.deepEqual(moveDueQuestionLater(["a", "b", "c"], 2), { items: ["a", "b", "c"], index: 0 });
  assert.deepEqual(moveDueQuestionLater(["a"], 0), { items: ["a"], index: 0 });
});

test("question-audit selections are accepted when they are inside the entry article", () => {
  const insideNode = {};
  const outsideNode = {};
  const selection = {
    isCollapsed: false,
    rangeCount: 1,
    getRangeAt: () => ({ commonAncestorContainer: insideNode }),
    toString: () => "What different jobs do the spring and shock absorber perform?",
  };
  const article = {
    contains: (node) => node === insideNode,
  };

  assert.equal(
    selectedTextWithinElement(selection, article),
    "What different jobs do the spring and shock absorber perform?",
  );
  assert.equal(
    selectedTextWithinElement({ ...selection, getRangeAt: () => ({ commonAncestorContainer: outsideNode }) }, article),
    "",
  );
});

function matches(questionToMatch, overrides = {}) {
  return matchesManualQuizSelection({
    category: "engineering-machines",
    mode: "all",
    question: questionToMatch,
    registeredIds,
    relatedSlugs: new Set(),
    topic: "vehicles-drivetrains",
    workloadOnly: true,
    ...overrides,
  });
}

function question(overrides) {
  return {
    version: 1,
    question: "Question?",
    answer: "Answer.",
    rubric: "Rubric.",
    ...overrides,
  };
}
