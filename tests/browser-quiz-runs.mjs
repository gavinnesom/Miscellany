// Mounted browser regressions. Run against a local dev server configured with
// public fixture values only; all private API traffic is intercepted below.
// MISCELLANY_PLAYWRIGHT_MODULE may point to an existing Playwright installation.
// Server: NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_browser_fixture
// npm run dev -- --port 3002
// Check: node tests/browser-quiz-runs.mjs (with Playwright/Chromium available).
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const modulePath = process.env.MISCELLANY_PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : "playwright");
const origin = process.env.MISCELLANY_BROWSER_ORIGIN ?? "http://localhost:3002";
const browser = await chromium.launch({
  executablePath: process.env.MISCELLANY_CHROMIUM ?? "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const ids = [
  "special-relativity:special-relativity-mean-people-say-everything-relative",
  "time-dilation:0-8c-roughly-much-observer-frame-time",
  "recursion:prevents-recursive-definition-simply-referring-itself-forever",
];
const page = await browser.newPage();
const errors = [];
const unexpected = [];
const dueRequests = [];
const gradedIds = [];
let ready = [];
let summaryCount = 0;
page.on("pageerror", (error) => errors.push(error.message));

await page.addInitScript(() => {
  // Controlled Fisher–Yates: a three-card Due list becomes [second, third, first].
  Math.random = () => 0;
  const expiry = Math.floor(Date.now() / 1000) + 86400;
  const token = btoa(JSON.stringify({ alg: "none" })) + "." +
    btoa(JSON.stringify({ exp: expiry, sub: "00000000-0000-4000-8000-000000000001" })) + ".fixture";
  localStorage.setItem("miscellany-supabase-auth", JSON.stringify({
    access_token: token, refresh_token: "fixture-refresh", token_type: "bearer",
    expires_in: 86400, expires_at: expiry,
    user: { id: "00000000-0000-4000-8000-000000000001", email: "fixture@example.test" },
  }));
});
await page.route("**/*", async (route) => {
  const request = route.request();
  const url = new URL(request.url());
  const json = (body) => route.fulfill({ contentType: "application/json", body: JSON.stringify(body) });
  if (url.origin !== origin) {
    unexpected.push(url.origin + url.pathname);
    return route.abort();
  }
  if (!url.pathname.startsWith("/api/")) return route.continue();
  if (url.pathname === "/api/review/summary") return json({ total: 0 });
  if (url.pathname === "/api/quiz/readiness") {
    if (request.method() === "POST") {
      for (const update of request.postDataJSON().entries) {
        if (update.isReady && !ready.includes(update.entrySlug)) ready.push(update.entrySlug);
      }
    }
    return json({ readyEntrySlugs: ready, synchronization: { failures: [] } });
  }
  if (url.pathname === "/api/memory-engine/due") {
    dueRequests.push(route);
    return;
  }
  if (url.pathname === "/api/memory-engine/summary") {
    summaryCount += 1;
    return json({ due_now: 3, review_count: summaryCount, active_items: 3, median_stability_days: 1 });
  }
  if (url.pathname === "/api/quiz/grade") {
    const data = request.postDataJSON();
    gradedIds.push(data.questionId);
    return json({
      correct: true, rating: "good", label: "Correct", explanation: "Fixture",
      reviewSaved: true, event_id: data.review.event_id,
    });
  }
  unexpected.push(url.pathname);
  return route.abort();
});

const prompt = () => page.locator(".quiz-card h2").innerText();
const waitFor = async (predicate) => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error("Timed out waiting for fixture transition");
};
const release = (index, items) => dueRequests[index].fulfill({
  contentType: "application/json",
  body: JSON.stringify({ items: items.map((item_id) => ({ item_id })) }),
});
const chooseDue = () => page.getByRole("button", { name: /^Due(?: \(\d+\))?$/ }).click();
const markReady = async (title) => {
  await page.locator(".quiz-coverage > summary").click();
  await page.getByPlaceholder("Search entry titles...").fill(title);
  await page.getByRole("checkbox", { name: "Select " + title, exact: true }).check();
  await page.getByRole("button", { name: "Mark selected ready to quiz", exact: true }).click();
  await page.getByText("Ready to quiz saved and active questions synchronized.", { exact: true }).waitFor();
  await page.locator(".quiz-coverage > summary").click();
};
const grade = async () => {
  const before = await prompt();
  const count = summaryCount;
  await page.getByLabel("Answer", { exact: true }).fill("fixture answer");
  await page.getByRole("button", { name: "Submit answer", exact: true }).click();
  await page.getByRole("button", { name: "Next question", exact: true }).waitFor();
  await waitFor(() => summaryCount > count);
  assert.equal(await prompt(), before, "grading/summary must retain the current card");
};

try {
  await page.goto(origin + "/quiz?topic=relativity");
  await page.getByRole("button", { name: /^Due/ }).waitFor();
  await page.getByText("No ready-to-quiz questions match this filter.", { exact: true }).waitFor();
  // With controlled RNG, time-dilation precedes special-relativity. Start with
  // none ready, then reveal B and later add A ahead of B in the stored pool.
  await markReady("Special Relativity");
  await page.getByLabel("Answer", { exact: true }).waitFor();
  const manualB = await prompt();
  await grade();
  const resultBefore = await page.locator(".quiz-answer").innerText();
  await markReady("Time Dilation");
  assert.equal(await prompt(), manualB, "readiness addition must retain initially empty run's anchored card");
  assert.equal(await page.getByLabel("Answer", { exact: true }).inputValue(), "fixture answer");
  assert.equal(await page.locator(".quiz-answer").innerText(), resultBefore);
  assert.equal(gradedIds[0], ids[0]);
  await page.getByRole("button", { name: "Next question", exact: true }).click();
  assert.notEqual(await prompt(), manualB);
  await markReady("Recursion");

  await chooseDue();
  await waitFor(() => dueRequests.length === 1);
  assert.equal(await page.locator("#typed-answer").count(), 0, "no answer entry while Due loads");
  await chooseDue();
  await waitFor(() => dueRequests.length === 2);
  await release(1, ids);
  await page.getByLabel("Answer", { exact: true }).waitFor();
  const dueOrder = [];
  dueOrder.push(await prompt());
  assert.match(dueOrder[0], /0\.8c/);
  await grade();
  assert.equal(gradedIds.at(-1), ids[1]);
  await page.getByRole("button", { name: "Next question", exact: true }).click();
  dueOrder.push(await prompt());
  assert.match(dueOrder[1], /recursive definition/);
  await release(0, [ids[0]]);
  await page.waitForTimeout(100);
  assert.equal(await prompt(), dueOrder[1], "older Due response must not replace newer run/cursor");
  await page.getByRole("button", { name: "Later", exact: true }).click();
  dueOrder.push(await prompt());
  assert.match(dueOrder[2], /everything is relative/);
  await grade();
  await page.getByRole("button", { name: "Next question", exact: true }).click();
  assert.equal(await prompt(), dueOrder[1], "Later moves only current item behind remaining cards");

  await chooseDue();
  await waitFor(() => dueRequests.length === 3);
  await page.getByText("Loading due reviews", { exact: true }).waitFor();
  assert.equal(await page.locator("#typed-answer").count(), 0, "restart hides old Due card while loading");
  await page.getByRole("button", { name: "All topics", exact: true }).click();
  await page.getByLabel("Answer", { exact: true }).waitFor();
  const manual = await prompt();
  await release(2, [ids[2]]);
  await page.waitForTimeout(100);
  assert.equal(await prompt(), manual, "stale response cannot publish into manual mode");

  await chooseDue();
  await waitFor(() => dueRequests.length === 4);
  await page.getByRole("button", { name: "All topics", exact: true }).click();
  await chooseDue();
  await waitFor(() => dueRequests.length === 5);
  await release(4, [ids[1]]);
  await page.getByLabel("Answer", { exact: true }).waitFor();
  const latest = await prompt();
  await dueRequests[3].fulfill({ status: 503, contentType: "application/json", body: '{"error":"stale fixture failure"}' });
  await page.waitForTimeout(100);
  assert.equal(await prompt(), latest, "stale error cannot clear the latest Due run");
  assert.equal(await page.getByText("Review schedule unavailable. Try Due again in a moment.", { exact: true }).count(), 0);
  assert.deepEqual(errors, []);
  assert.deepEqual(unexpected, []);
  console.log(JSON.stringify({
    mounted: true, initialEmptyReadinessAnchor: true, gradingSummaryStable: true,
    dueOutOfOrderStable: true, dueLoadingSafe: true, laterOrderPreserved: true,
    rapidModeSwitchSafe: true, staleErrorsIgnored: true, realLearnerWrites: 0,
    dueRequests: dueRequests.length, gradedIds, summaryCount,
  }));
} finally {
  await browser.close();
}
