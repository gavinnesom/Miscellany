import assert from "node:assert/strict";
import test from "node:test";

import { createSingleFlight, isDefinitiveSessionFailure, shouldRefreshSessionForResponse } from "../app/lib/auth.ts";

test("simultaneous invalid-session responses share one refresh attempt", async () => {
  const coordinator = createSingleFlight();
  let attempts = 0;
  const refresh = async () => {
    attempts += 1;
    await new Promise((resolve) => setTimeout(resolve, 5));
    return "fresh-session";
  };

  const results = await Promise.all(Array.from({ length: 5 }, () => coordinator.run(refresh)));
  assert.deepEqual(results, ["fresh-session", "fresh-session", "fresh-session", "fresh-session", "fresh-session"]);
  assert.equal(attempts, 1);
});

test("only an explicitly invalid Supabase session response triggers one retry", () => {
  assert.equal(shouldRefreshSessionForResponse(new Response(null, { status: 401 })), false);
  assert.equal(shouldRefreshSessionForResponse(new Response(null, { status: 403 })), false);
  assert.equal(shouldRefreshSessionForResponse(new Response(null, { status: 401, headers: { "x-miscellany-session-invalid": "true" } })), true);
});

test("transient refresh failures preserve the session while definitive invalidation can clear it", () => {
  assert.equal(isDefinitiveSessionFailure({ status: 429 }, null), false);
  assert.equal(isDefinitiveSessionFailure({ status: 500 }, null), false);
  assert.equal(isDefinitiveSessionFailure(new Error("network timeout"), null), false);
  assert.equal(isDefinitiveSessionFailure({ status: 401 }, { access_token: "still-present" }), false);
  assert.equal(isDefinitiveSessionFailure({ status: 400 }, null), true);
  assert.equal(isDefinitiveSessionFailure({ status: 401 }, null), true);
});
