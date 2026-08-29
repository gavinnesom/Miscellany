import assert from "node:assert/strict";
import test from "node:test";

const originalKey = process.env.OPENAI_API_KEY;
const originalModel = process.env.OPENAI_GRADING_MODEL;

test.afterEach(() => {
  restoreEnv();
  restoreFetch();
});

test("quiz grading calls OpenAI with only quiz metadata and typed answer", async () => {
  process.env.OPENAI_API_KEY = "test-openai-key";
  process.env.OPENAI_GRADING_MODEL = "test-grader";
  const calls = mockFetch({
    output_text: JSON.stringify({
      correct: true,
      rating: "good",
      label: "Correct",
      explanation: "Equivalent to the canonical false case.",
    }),
  });
  const { gradeWithOpenAI } = await importFreshOpenAIGrading();
  const result = await gradeWithOpenAI({
    questionId: "propositional-logic:implication-false-case",
    question: "What is the only truth-value combination that makes P -> Q false?",
    canonicalAnswer: "P is true and Q is false.",
    rubric: "Correct if the answer identifies P true and Q false as the only false case.",
    userAnswer: "the antecedent is true and the consequent is false",
  });

  assert.deepEqual(result, {
    correct: true,
    rating: "good",
    label: "Correct",
    explanation: "Equivalent to the canonical false case.",
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].headers.authorization, "Bearer test-openai-key");

  const payload = JSON.parse(calls[0].init.body);
  assert.equal(payload.model, "test-grader");
  const userPrompt = payload.input.find((item) => item.role === "user").content;
  assert.match(userPrompt, /propositional-logic:implication-false-case/);
  assert.match(userPrompt, /P is true and Q is false/);
  assert.match(userPrompt, /antecedent is true and the consequent is false/);
  assert.match(userPrompt, /rubric/);
  assert.doesNotMatch(userPrompt, /Propositional logic begins by deliberately throwing away/);
});

test("quiz grading reports missing OpenAI key without local fallback", async () => {
  delete process.env.OPENAI_API_KEY;
  const { gradeWithOpenAI } = await importFreshOpenAIGrading();

  await assert.rejects(
    () => gradeWithOpenAI({
      questionId: "propositional-logic:implication-false-case",
      question: "What is the only truth-value combination that makes P -> Q false?",
      canonicalAnswer: "P is true and Q is false.",
      rubric: "Correct if the answer identifies P true and Q false as the only false case.",
      userAnswer: "P true Q false",
    }),
    /OPENAI_API_KEY/,
  );
});

test("quiz grading handles empty answers without calling OpenAI", async () => {
  delete process.env.OPENAI_API_KEY;
  const calls = mockFetch({});
  const { gradeWithOpenAI } = await importFreshOpenAIGrading();

  const result = await gradeWithOpenAI({
    questionId: "propositional-logic:implication-false-case",
    question: "What is the only truth-value combination that makes P -> Q false?",
    canonicalAnswer: "P is true and Q is false.",
    rubric: "Correct if the answer identifies P true and Q false as the only false case.",
    userAnswer: "   ",
  });

  assert.deepEqual(result, {
    correct: false,
    rating: "again",
    label: "Not quite",
    explanation: "No answer submitted.",
  });
  assert.equal(calls.length, 0);
});

async function importFreshOpenAIGrading() {
  const moduleUrl = new URL(`../app/lib/openai-grading.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}

const originalFetch = globalThis.fetch;

function mockFetch(body) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      init,
      headers: Object.fromEntries(new Headers(init.headers).entries()),
    });
    return {
      ok: true,
      status: 200,
      json: async () => body,
    };
  };
  return calls;
}

function restoreFetch() {
  globalThis.fetch = originalFetch;
}

function restoreEnv() {
  if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = originalKey;
  if (originalModel === undefined) delete process.env.OPENAI_GRADING_MODEL;
  else process.env.OPENAI_GRADING_MODEL = originalModel;
}
