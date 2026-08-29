# Design

## Ownership

Markdown owns entries, slugs, active or retired quiz questions, answers, and rubrics. `public.miscellany_quiz_entry_readiness` owns each authenticated user's choice to practice an entry. MemoryEngine owns registered item state, scheduling, and review history.

## Readiness Flow

The browser fetches readiness once through `GET /api/quiz/readiness`. Individual entry and Quiz-page bulk controls call the same POST endpoint. The server persists readiness through Supabase RLS first, then attempts bounded, idempotent MemoryEngine registration. A registration failure is reported separately and never removes readiness.

## Safety

Browser code calls Miscellany APIs only. It never receives the MemoryEngine service credential or calls MemoryEngine directly. Miscellany validates the browser bearer token with Supabase, compares its immutable user ID with the server-only configured owner ID, uses that token with RLS for the user's readiness and Editorial Review rows, and forwards the verified user ID to MemoryEngine with its server-only service token. A transient Supabase refresh failure does not clear the stored session; concurrent invalid-session recovery shares one refresh attempt. Application authorization failures and server configuration errors do not masquerade as bad Supabase passwords.

## Deliberate Limits

The accepted bulk action is `Mark selected ready to quiz`. There is no current `Mark not ready` behavior, import/reconstruction control, or automatic MemoryEngine diagnostic. Readiness remains valid if the separate idempotent registration attempt fails.
