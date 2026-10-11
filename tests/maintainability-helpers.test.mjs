import assert from "node:assert/strict";
import test from "node:test";

test("entry excerpts preserve hyphens and render inline mathematics as readable text", async () => {
  const { entryExcerpt } = await import("../app/lib/entry-excerpt.ts");
  assert.equal(entryExcerpt(String.raw`A **twelve-hour** clock: \(10+5=15\), with \(a-b\) and \(\phi(n)=40\).`),
    "A twelve-hour clock: 10+5=15, with a-b and phi(n)=40.");
  assert.equal(entryExcerpt(String.raw`Split equal-length blocks for [public-key encryption](/entry/rsa); \(2^{10}=1024\).`),
    "Split equal-length blocks for public-key encryption; 2¹⁰=1024.");
  assert.equal(entryExcerpt("A negative value -12 and x_y remain intact.\n\nA later paragraph."),
    "A negative value -12 and x_y remain intact.");
  assert.equal(entryExcerpt("> **A summary.**\n- A later list item."), "A summary.");
});

test("relationship helper preserves curated and inverse relationship semantics", async () => {
  const { relatedEntrySlugs, relationshipSections } = await importFreshRelationships();
  const entries = [
    entry("a", { deeper: ["b"], related: ["c"] }),
    entry("b", { parent: ["a"] }),
    entry("c", { related: ["a", "d"] }),
    entry("d", { related: ["a"] }),
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

test("random item selection uses the supplied random source", async () => {
  const { randomItem, randomItemExcept } = await importFreshRandom();
  assert.equal(randomItem(["first", "middle", "last"], () => 0), "first");
  assert.equal(randomItem(["first", "middle", "last"], () => 0.9), "last");
  assert.equal(randomItem([], () => 0), undefined);
  assert.equal(randomItemExcept(["first", "middle", "last"], "first", () => 0), "middle");
  assert.equal(randomItemExcept(["first"], "first", () => 0), "first");
  assert.equal(randomItemExcept([], "first", () => 0), undefined);
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

function entry(slug, relationships = {}) {
  return {
    slug,
    title: slug.toUpperCase(),
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

async function importFreshRandom() {
  const moduleUrl = new URL(`../app/lib/random.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}


test("math rendering distinguishes integral from membership and exponent signs from following arithmetic", async () => {
  const { renderMathText } = await import("../app/lib/math-text.ts");
  assert.equal(renderMathText(String.raw`W=\int P_{ext}\,dV.`), "W=∫ Pext dV.");
  assert.equal(renderMathText(String.raw`x\in A`), "x∈ A");
  assert.equal(renderMathText(String.raw`\int_A^B F\,dr`), "∫A^B F dr");
  assert.equal(renderMathText(String.raw`V_B-V_A; k_B`), "V(B)-V(A); k(B)");
  assert.equal(renderMathText(String.raw`\vec E\cdot d\vec l`), "vec(E)· dvec(l)");
  assert.equal(renderMathText(String.raw`τ⃗=μ⃗\times\vec B`), "vec(τ)=vec(μ)×vec(B)");
  assert.equal(renderMathText("√(a^2+y^2)"), "√(a²+y²)");
  assert.equal(renderMathText("x^2-y^2+x^-2+x^+3"), "x²-y²+x⁻²+x⁺³");
});
