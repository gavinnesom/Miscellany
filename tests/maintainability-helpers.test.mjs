import assert from "node:assert/strict";
import test from "node:test";

test("relationship helper preserves curated and inverse relationship semantics", async () => {
  const { relatedEntrySlugs, relationshipSections } = await importFreshRelationships();
  const entries = [
    entry("a", { deeper: ["b"], related: ["c"] }),
    entry("b", { parent: ["a"] }),
    entry("c", { related: ["a"] }, ["d"]),
    entry("d", {}, ["a"]),
  ];

  assert.deepEqual(relatedEntrySlugs(entries, entries[0]), ["a", "b", "c", "d"]);
  assert.deepEqual(
    relationshipSections(entries, entries[0]).map((section) => [section.label, section.entries.map((item) => item.slug)]),
    [
      ["go deeper", ["b"]],
      ["connected to", ["c", "d"]],
    ],
  );
});

test("grade feedback formatting is generic and does not special-case individual answers", async () => {
  const { gradeFeedback } = await importFreshQuizFeedback();

  assert.deepEqual(gradeFeedback({
    correct: false,
    rating: "again",
    label: "Not quite",
    explanation: "misses the explicit 2^n but has the right shape",
  }, "2^n states"), {
    lead: "Again. Misses the explicit 2^n but has the right shape.",
    answer: "Correct answer: 2^n states",
  });

  assert.deepEqual(gradeFeedback({
    correct: true,
    rating: "good",
    label: "Correct",
    explanation: "Equivalent.",
  }, "P is true and Q is false."), {
    lead: "Good.",
    answer: "P is true and Q is false.",
  });
});

test("grade feedback truncates long explanations at a readable boundary", async () => {
  const { gradeFeedback } = await importFreshQuizFeedback();
  const feedback = gradeFeedback({
    correct: false,
    rating: "hard",
    label: "Close",
    explanation: "this response captures the first causal step but misunderstands the downstream mechanism and substitutes a vague memorized slogan for the actual explanation",
  }, "Name the causal mechanism.");

  assert.equal(feedback.answer, "Correct answer: Name the causal mechanism.");
  assert.match(feedback.lead, /^Hard\. This response captures/);
  assert.match(feedback.lead, /\.\.\.$/);
  assert.doesNotMatch(feedback.lead, /mechanis\.\.\.$|downstrea\.\.\.$|substitute\.\.\.$/);
  assert.ok(feedback.lead.length <= 104);
});

function entry(slug, relationships = {}, related = []) {
  return {
    slug,
    title: slug.toUpperCase(),
    related,
    relationships: {
      parent: relationships.parent ?? [],
      deeper: relationships.deeper ?? [],
      related: relationships.related ?? [],
    },
  };
}

async function importFreshRelationships() {
  const moduleUrl = new URL(`../app/lib/relationships.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}

async function importFreshQuizFeedback() {
  const moduleUrl = new URL(`../app/lib/quiz-feedback.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}
