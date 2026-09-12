import assert from "node:assert/strict";
import test from "node:test";

const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const originalServerUrl = process.env.SUPABASE_URL;
const originalServerKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const originalOwnerUserId = process.env.MISCELLANY_OWNER_USER_ID;

const auth = {
  accessToken: tokenFor("user-123", "gavin-auth@example.test"),
  userId: "user-123",
  email: "gavin-auth@example.test",
};

const entries = new Map([
  ["aristotle", { slug: "aristotle", title: "Aristotle" }],
  ["kant", { slug: "kant", title: "Immanuel Kant" }],
]);

test.afterEach(() => {
  restoreEnv();
});

test("review summary is unavailable without Gavin auth or Supabase config", async () => {
  const review = await importFreshReview();
  assert.deepEqual(await review.getReviewSummary(null), { available: false, total: 0, pending: [] });

  installEnv({ url: "", key: "" });
  assert.equal(review.isReviewCapable(auth), false);
});

test("server auth accepts only the Supabase-validated immutable owner", async () => {
  installEnv();
  const serverAuth = await importFreshServerAuth();
  const calls = mockFetch([
    { id: "user-123" },
    { id: "user-999" },
  ]);

  try {
    const accepted = await serverAuth.requireServerAuth(new Request("http://localhost", {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    }));
    assert.equal(accepted.userId, "user-123");
    assert.match(calls[0].url, /\/auth\/v1\/user$/);
    assert.equal(calls[0].headers.authorization, `Bearer ${auth.accessToken}`);

    const rejected = await serverAuth.requireServerAuth(new Request("http://localhost", {
      headers: { Authorization: `Bearer ${tokenFor("user-999", "gavin-auth@example.test")}` },
    }));
    assert.equal(rejected, null);
  } finally {
    restoreFetch();
  }
});

test("server auth rejects fabricated JWT-shaped tokens when Supabase rejects them", async () => {
  installEnv();
  const serverAuth = await importFreshServerAuth();
  const calls = mockFetch([{ error: "invalid token" }], { ok: false, status: 401 });

  try {
    const rejected = await serverAuth.requireServerAuth(new Request("http://localhost", {
      headers: { Authorization: `Bearer ${tokenFor("user-123", "gavin-auth@example.test")}` },
    }));
    assert.equal(rejected, null);
    assert.equal(calls.length, 1);
  } finally {
    restoreFetch();
  }
});

test("missing immutable owner ID is reported as server misconfiguration", async () => {
  installEnv();
  delete process.env.MISCELLANY_OWNER_USER_ID;
  const serverAuth = await importFreshServerAuth();

  const result = await serverAuth.authenticateServerRequest(new Request("http://localhost", {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  }));
  assert.deepEqual(result, { auth: null, failure: "missing-configuration" });
  assert.deepEqual(serverAuth.serverAuthFailureResponse(result.failure, "read quiz readiness"), {
    body: { error: "Server authentication is not configured." },
    status: 503,
    headers: {},
  });
});

test("summary reads active reviews through Supabase REST using the user token", async () => {
  installEnv();
  const review = await importFreshReview();
  const calls = mockFetch([[
    {
      id: "review-1",
      user_id: "user-123",
      entry_slug: "aristotle",
      entry_title: "Aristotle",
      message: "Clarify causes.",
      selected_text: "",
      created_at: "2026-08-16T10:00:00.000Z",
      updated_at: "2026-08-16T10:05:00.000Z",
    },
  ]]);

  try {
    const summary = await review.getReviewSummary(auth);
    assert.equal(summary.available, true);
    assert.equal(summary.total, 1);
    assert.match(calls[0].url, /\/rest\/v1\/miscellany_editorial_reviews\?/);
    assert.match(calls[0].url, /user_id=eq\.user-123/);
    assert.equal(calls[0].headers.authorization, `Bearer ${auth.accessToken}`);
  } finally {
    restoreFetch();
  }
});

test("review export returns a Supabase-backed JSON payload for Codex handoff", async () => {
  installEnv();
  const review = await importFreshReview();
  const calls = mockFetch([[
    {
      id: "review-1",
      user_id: "user-123",
      entry_slug: "aristotle",
      entry_title: "Aristotle",
      message: "Clarify causes.",
      selected_text: "",
      created_at: "2026-08-16T10:00:00.000Z",
      updated_at: "2026-08-16T10:05:00.000Z",
    },
  ]]);

  try {
    const payload = await review.getReviewExport(auth, "2026-08-22T19:00:00.000Z");
    assert.equal(payload.format, "miscellany-editorial-review-queue/v1");
    assert.equal(payload.exported_at, "2026-08-22T19:00:00.000Z");
    assert.equal(payload.total, 1);
    assert.equal(payload.pending[0].entry, "aristotle");
    assert.match(calls[0].url, /\/rest\/v1\/miscellany_editorial_reviews\?/);
  } finally {
    restoreFetch();
  }
});

test("createReviewRequest upserts one active review scoped to decoded user id", async () => {
  installEnv();
  const review = await importFreshReview();
  const calls = mockFetch([[
    {
      id: "review-2",
      user_id: "user-123",
      entry_slug: "kant",
      entry_title: "Immanuel Kant",
      message: "Explain categories.",
      selected_text: "space and time",
      created_at: "2026-08-16T10:00:00.000Z",
      updated_at: "2026-08-16T10:06:00.000Z",
    },
  ]]);

  try {
    const request = await review.createReviewRequest(auth, {
      entry: "kant",
      message: "Explain categories.",
      selectedText: "space and time",
      user_id: "attacker",
    }, entries);

    assert.equal(request.entry, "kant");
    assert.equal(request.message, "Explain categories.");
    assert.equal(calls[0].init.method, "POST");
    assert.match(calls[0].url, /on_conflict=user_id,entry_slug/);
    assert.equal(calls[0].headers.prefer, "resolution=merge-duplicates,return=representation");
    assert.deepEqual(JSON.parse(calls[0].init.body), {
      user_id: "user-123",
      entry_slug: "kant",
      entry_title: "Immanuel Kant",
      message: "Explain categories.",
      selected_text: "space and time",
      updated_at: JSON.parse(calls[0].init.body).updated_at,
    });
  } finally {
    restoreFetch();
  }
});

test("removeReviewRequest deletes only the signed-in user's active entry review", async () => {
  installEnv();
  const review = await importFreshReview();
  const calls = mockFetch([undefined]);

  try {
    const removed = await review.removeReviewRequest(auth, "aristotle", entries);
    assert.equal(removed.entry, "aristotle");
    assert.equal(calls[0].init.method, "DELETE");
    assert.match(calls[0].url, /user_id=eq\.user-123/);
    assert.match(calls[0].url, /entry_slug=eq\.aristotle/);
  } finally {
    restoreFetch();
  }
});

test("unknown entries are rejected before Supabase writes", async () => {
  installEnv();
  const review = await importFreshReview();
  const calls = mockFetch([]);

  try {
    await assert.rejects(
      () => review.createReviewRequest(auth, { entry: "../../package" }, entries),
      /unknown entry/i,
    );
    assert.equal(calls.length, 0);
  } finally {
    restoreFetch();
  }
});

function installEnv({ url = "https://project.supabase.co", key = "publishable-key" } = {}) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = url;
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = key;
  process.env.MISCELLANY_OWNER_USER_ID = "user-123";
}

function restoreEnv() {
  if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
  if (originalKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  else process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = originalKey;
  if (originalServerUrl === undefined) delete process.env.SUPABASE_URL;
  else process.env.SUPABASE_URL = originalServerUrl;
  if (originalServerKey === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY;
  else process.env.SUPABASE_PUBLISHABLE_KEY = originalServerKey;
  if (originalOwnerUserId === undefined) delete process.env.MISCELLANY_OWNER_USER_ID;
  else process.env.MISCELLANY_OWNER_USER_ID = originalOwnerUserId;
}

async function importFreshReview() {
  const moduleUrl = new URL(`../app/lib/review.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}

async function importFreshServerAuth() {
  const moduleUrl = new URL(`../app/lib/server-auth.ts?test=${Date.now()}-${Math.random()}`, import.meta.url);
  return import(moduleUrl.href);
}

const originalFetch = globalThis.fetch;

function mockFetch(responses, defaultResponse = { ok: true, status: 200 }) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const headers = Object.fromEntries(new Headers(init.headers).entries());
    calls.push({ url: String(url), init, headers });
    const body = responses.shift();
    return {
      ok: defaultResponse.ok,
      status: defaultResponse.status,
      json: async () => body,
    };
  };
  return calls;
}

function restoreFetch() {
  globalThis.fetch = originalFetch;
}

function tokenFor(sub, email) {
  return [
    encode({ alg: "none", typ: "JWT" }),
    encode({ sub, email }),
    "signature",
  ].join(".");
}

function encode(payload) {
  return Buffer.from(JSON.stringify(payload), "utf8")
    .toString("base64url");
}
