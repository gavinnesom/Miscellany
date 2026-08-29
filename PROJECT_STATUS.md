# Project Status

Quiz readiness is live in production. The applied additive migration is `supabase/migrations/202608280001_miscellany_quiz_entry_readiness.sql`; it creates the user-scoped readiness table with a unique `(user_id, entry_slug)` constraint, authenticated grants, and RLS based on `auth.uid()`.

At the completed historical reconstruction, 11 of 121 entries had every active question already registered and were persisted as ready. That number is deployment evidence, not an application constant; current totals are computed from Markdown content plus each user's Supabase readiness rows.

Production runs the Miscellany-owned readiness model: Markdown owns authored content and active/retired questions, Supabase owns `Ready to quiz` selections and Editorial Review rows, and MemoryEngine owns item registration, schedules, due state, ratings, and review history. Ordinary Quiz and Coverage rendering makes one bulk readiness request and does not probe MemoryEngine registration status per question.

Relationship metadata is canonical under `relationships.parent`, `relationships.deeper`, and `relationships.related`; absent child fields mean empty lists. All 121 entries were semantically compared before and after retiring the obsolete root-level `related` field. Browser navigation accepts canonical `/entry/<slug>` paths rather than legacy hash URLs.
