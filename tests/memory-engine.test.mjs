import assert from "node:assert/strict";
import test from "node:test";

import {
  createReview,
  enqueueReview,
  flushOutbox,
  getDueItemIds,
  hasMemoryEngineConfig,
  MISCELLANY_SOURCE_ID,
  readOutbox,
  recordReview,
  registerQuestion,
} from "../app/lib/memory-engine.ts";
import { questionsForEntry } from "../app/lib/quiz-questions.ts";
import { canonicalReviewPayload } from "../app/lib/server-memory-engine.ts";

const session = {
  email: "gavin-auth@example.test",
  accessToken: "test-token",
};

const quizQuestion = {
  question_id: "propositional-logic:implication-false-case",
  version: 1,
  question: "What is the only truth-value combination that makes P -> Q false?",
  answer: "P is true and Q is false.",
  rubric: "Correct if the answer identifies P true and Q false as the only false case.",
};

test("creates Miscellany review payloads with stable question IDs", () => {
  const review = createReview(quizQuestion, "easy", "manual");

  assert.equal(review.source_id, MISCELLANY_SOURCE_ID);
  assert.equal(review.item_id, "propositional-logic:implication-false-case");
  assert.equal(review.rating, "easy");
  assert.equal(review.trigger, "manual");
  assert.ok(review.event_id);
  assert.ok(!Number.isNaN(Date.parse(review.reviewed_at)));
});

test("explicit enrollment and review recording use only Miscellany APIs from the browser", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push([String(url), init]);
    return ok({ source_id: MISCELLANY_SOURCE_ID, item_id: quizQuestion.question_id });
  };

  try {
    await registerQuestion(quizQuestion, session);
    await recordReview(createReview(quizQuestion, "again", "due"), session);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 2);
  assert.ok(calls.every(([url]) => url.startsWith("/api/memory-engine/")));
  assert.ok(calls.every(([url]) => !url.includes("memoryengine.gavinnesom.com")));
  assert.ok(calls.every(([url]) => !url.includes("/auth/v1/")));
  assert.deepEqual(JSON.parse(calls[0][1].body), {
    source_id: MISCELLANY_SOURCE_ID,
    item_id: quizQuestion.question_id,
  });
  assert.equal(JSON.parse(calls[1][1].body).rating, "again");
});

test("recording a review never enrolls an unregistered question", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push([String(url), init]);
    return ok({ source_id: MISCELLANY_SOURCE_ID, item_id: quizQuestion.question_id });
  };

  try {
    await recordReview(createReview(quizQuestion, "again", "manual"), session);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.match(calls[0][0], /\/api\/memory-engine\/reviews$/);
  assert.doesNotMatch(calls[0][0], /\/api\/memory-engine\/items/);
});

test("MemoryEngine browser integration does not require a public service URL", () => {
  assert.equal(hasMemoryEngineConfig(), true);
});

test("Due mode consumes item IDs only", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ok({
    source_id: MISCELLANY_SOURCE_ID,
    items: [{ item_id: quizQuestion.question_id, prompt: "server text must be ignored" }],
  });

  try {
    assert.deepEqual(await getDueItemIds(session), [quizQuestion.question_id]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});


test("failed review events use the small browser outbox shape", () => {
  installLocalStorage();

  const review = createReview(quizQuestion, "good", "manual");
  enqueueReview(review);

  assert.deepEqual(readOutbox(), [{
    event_id: review.event_id,
    source_id: MISCELLANY_SOURCE_ID,
    item_id: quizQuestion.question_id,
    rating: "good",
    trigger: "manual",
    reviewed_at: review.reviewed_at,
  }]);
});

test("server proxy canonicalizes review events without typed answers or client source", () => {
  const payload = canonicalReviewPayload({
    event_id: "40000000-0000-4000-8000-000000000001",
    source_id: "browser-controlled",
    item_id: quizQuestion.question_id,
    rating: "good",
    trigger: "manual",
    reviewed_at: "2026-08-25T12:00:00.000Z",
    user_id: "browser-user",
    typedAnswer: "this must not be forwarded",
  });

  assert.deepEqual(payload, {
    event_id: "40000000-0000-4000-8000-000000000001",
    source_id: MISCELLANY_SOURCE_ID,
    item_id: quizQuestion.question_id,
    rating: "good",
    trigger: "manual",
    reviewed_at: "2026-08-25T12:00:00.000Z",
  });
});

test("outbox events are durable before delivery and removed only after acknowledgement", async () => {
  installLocalStorage();

  const review = createReview(quizQuestion, "good", "manual");
  enqueueReview(review);

  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push([String(url), init, readOutbox().map((item) => item.event_id)]);
    return ok({ source_id: MISCELLANY_SOURCE_ID, item_id: quizQuestion.question_id });
  };

  try {
    const sent = await flushOutbox([quizQuestion], session);
    assert.equal(sent, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][2], [review.event_id]);
  assert.deepEqual(readOutbox(), []);
});

test("selects authored questions for one entry", () => {
  const entry = fakeEntry("propositional-logic", [
    quizQuestion,
    {
      question_id: "propositional-logic:argument-p-then-q-q-therefore-p",
      version: 1,
      question: "Why is affirming the consequent invalid?",
      answer: "Q may be true for some other reason.",
      rubric: "Correct if the answer says Q may be true for another reason.",
    },
  ]);
  const otherEntry = fakeEntry("predicate-logic", [
    {
      question_id: "predicate-logic:forall",
      version: 1,
      question: "What does ∀ mean?",
      answer: "For all.",
      rubric: "Correct if the answer says for all.",
    },
  ]);

  assert.deepEqual(questionsForEntry(entry).map((item) => item.question_id), [
    quizQuestion.question_id,
    "propositional-logic:argument-p-then-q-q-therefore-p",
  ]);
  assert.deepEqual(questionsForEntry(otherEntry).map((item) => item.question_id), ["predicate-logic:forall"]);
});

function ok(body) {
  return response(200, body);
}

function response(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

function installLocalStorage() {
  const values = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
      removeItem: (key) => values.delete(key),
    },
  };
}

function fakeEntry(slug, quiz) {
  return {
    title: slug,
    slug,
    category: "philosophy",
    topic: "logic-formal-reasoning",
    tags: [],
    date_added: "2026-08-16",
    related: [],
    relationships: { parent: [], deeper: [], related: [] },
    sources: [],
    books: [],
    quiz,
    body: "",
    excerpt: "",
    searchText: "",
  };
}
