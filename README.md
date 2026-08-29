# Gavin's Miscellany

Gavin's Miscellany is an AI-assisted personal knowledge and spaced-learning application. It is built around a deliberately simple rule: canonical knowledge lives in structured Markdown, and the app derives reading, navigation, quiz, review, and learning behavior from that content instead of from a CMS.

The project is meant to demonstrate disciplined AI-assisted engineering: AI-generated changes are constrained by explicit architecture notes, editorial standards, stable data contracts, regression tests, and Git history.

## What It Does

- Renders a personal encyclopedia from `content/**/*.md`.
- Provides category, topic, tag, search, related-entry, and Surprise Me navigation.
- Generates a Quiz Me experience from per-entry quiz metadata.
- Supports public reveal-only quiz answers without sign-in.
- Enables Gavin-only typed answers, Due reviews, and editorial Review through Supabase auth.
- Sends enrolled learning events to MemoryEngine for FSRS-style scheduling.
- Uses OpenAI server-side for typed-answer grading without sending full entry prose.

## Technical Shape

- Markdown is the canonical content source; React/Vinext renders the app.
- Stable entry slugs and stable quiz `question_id` values are the durable data contracts.
- Supabase Auth validates Gavin-only capabilities; Supabase/Postgres stores active Editorial Review rows and user-scoped entry readiness.
- MemoryEngine receives content-blind item IDs, ratings, and review timestamps; Miscellany owns question text, answers, rubrics, question IDs, and active/retired state.
- Browser code calls only Miscellany APIs for learning behavior; Miscellany calls MemoryEngine server-to-server.
- A browser outbox stores learning review events before delivery so acknowledged events can be removed only after MemoryEngine accepts them.
- The OpenAI grading route receives only `questionId` and typed answer from the browser, then resolves question/rubric metadata server-side.
- `CODEMAP.md` includes a Mermaid execution-flow diagram for the main architecture.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by the dev server. Public browsing and reveal-only quiz mode work without signing in.

For authenticated local development, place the required values in the Git-ignored project file `.env.local`, then use the same command:

```bash
npm run dev -- --port 3000
```

Use `.env.example` as the value-free variable list. The Supabase project URL and publishable key are browser-public; `MISCELLANY_OWNER_USER_ID`, `MEMORYENGINE_SERVICE_TOKEN`, and `OPENAI_API_KEY` are server-only. `OPENAI_API_KEY` is needed only for local typed-answer grading. Do not commit `.env.local`.

## Useful Commands

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm test
```

`npm test` runs the production build plus server-rendered, Review, MemoryEngine, grading, schema, and quiz-selection regression tests.

## Content Model

Entries live under `content/`, one Markdown file per entry. Adding or editing entries should not require React changes.

Each entry has YAML front matter for title, slug, category, topic, tags, relationships, optional sources/books/images/video, and optional quiz prompts. The front matter `slug` is the stable entry identity and canonical URL:

```text
/entry/time-dilation
```

The browsing hierarchy is:

```text
Category -> Topic -> Entry
```

Tags are cross-cutting indexes. Semantic relationships are curated links, separate from taxonomy.

## Documentation

- `PROJECT.md` records product scope, content rules, and architectural invariants.
- `CODEMAP.md` maps current implementation boundaries and execution flow.
- `AGENTS.md` gives AI contributors project-specific constraints.
- `docs/editorial-standard.md` is the canonical writing, markup, research, and visual standard.
- `docs/security-architecture.md` documents the real service boundaries and credential inventory.
- `supabase/migrations/` contains Miscellany-owned database schema for Editorial Review and quiz readiness.
