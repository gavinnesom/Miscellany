# Gavin's Miscellany

Gavin's Miscellany is a personal encyclopedia and learning curriculum: a place to keep short, memorable notes about things Gavin encounters and wants to remember.

## Core Principle

There is one canonical source of truth. Knowledge lives in structured Markdown files under `content/`. The website renders those files, and future exports, quizzes, maps, indexes, or print views should derive from the same content.

The detailed writing and research standard lives in `docs/editorial-standard.md`. For content creation, revision, audit, or reorganization, use that file as the canonical guide; this project overview only summarizes the main ideas.

## Version 0.1 Scope

Version 0.1 is a content-driven website with:

- top-level category browsing
- individual entry reading
- local search
- Surprise Me random browsing
- related-entry cross references
- image support through front matter and Markdown
- narrow supplementary YouTube embed support through optional front matter
- a Quiz Me surface built from optional `quiz` metadata
- a signed-in Quiz Coverage view for browsing readiness and bulk-marking selected entries ready to quiz
- Supabase authentication for Gavin-only editing/learning features
- Supabase-backed active editorial Review state
- MemoryEngine enrollment, Due scheduling, and review-event recording
- server-side OpenAI grading for signed-in typed answers

It intentionally does not include a CMS, automated ingestion, LibraryThing integration, signup/multi-user product flows, Review history, or canonical-content editing through the website.

## Content Model

Each entry is one Markdown file with YAML front matter:

```yaml
---
title: Tardigrades and Cryptobiosis
slug: tardigrades-cryptobiosis
category: natural-world
topic: microscopic-life
tags:
  - animals
  - extremophiles
date_added: 2026-08-11
related:
  - entropy
sources: []
books: []
image: /images/cryptobiosis-cycle.svg
video:
  youtube_id: ZQvfHyfgBtA
  title: How a Car Engine Works
  note: Supplementary animation; the written entry remains the core explanation.
quiz:
  - question: What survival state can tardigrades enter?
    answer: A tun state associated with cryptobiosis.
---
```

The body should use as little space as necessary to explain the concept properly, not as little space as possible. Short entries are still welcome when the idea is simple, but entries may use sections, tables, equations, diagrams, or fuller examples when those make the concept easier to remember. Favor mechanisms, memorable distinctions, and useful comparisons over encyclopedia-style coverage.

Strong entries often layer information:

- quick orientation
- an image or explanatory diagram when useful
- a Big Idea / Main Message / Takeaway when it genuinely clarifies the entry
- mechanism or core explanation
- useful detail such as numbers, comparisons, evidence, examples, history, or edge cases
- misconception or limitation
- semantic connections
- sources

Do not force every layer into every entry.

Render the main entry title before any entry image. Front-matter images should appear after the title, metadata, tags/review controls, and introductory prose at a sensible explanatory point; book entries keep their book metadata treatment, but the cover/representative image still must not precede the title.

An entry may have more than one useful visual. Use front matter for the primary representative image, and ordinary Markdown image syntax for additional diagrams or figures in the body. Body images render as normal figures with their alt text as the caption; they are not a carousel or gallery.

Optional `video` front matter is reserved for a small number of genuinely helpful supplementary YouTube embeds. Use `youtube_id`, `title`, and optional `note`; embeds render responsively with privacy-enhanced `youtube-nocookie.com`, no autoplay, and normal controls. The article must remain useful without the video, and video should not replace the written explanation or render above the title.

Use callout labels as normal text, not Markdown block quotes. Write `**Big idea:**`, `**Takeaway:**`, or `**Main message:**` at the start of a paragraph when useful; the renderer gives the label a lightweight accent. Do not leave a literal `>` marker in front of these labels.

Use real Markdown bullets for short parallel statements. Use paragraphs when an idea needs development. Avoid several tiny standalone paragraphs that are functionally a list.

Numbers need context. A neuron count, diagnostic threshold, blood-glucose range, ketone range, sleep index, age, size, or speed should usually include a boundary condition or comparison that makes it memorable.

Images should include provenance when represented in front matter:

```yaml
image:
  url: /images/example.svg
  alt: Short useful description.
  credit: Local explanatory diagram
  provenance: local
```

Use `external` for sourced images, `local` for diagrams generated specifically for the Miscellany, `collaborative` only when Gavin materially shaped the visual through back-and-forth, and `user` for Gavin's own images.

No visual is better than a bad visual. Real people, organisms, places, machines, artworks, and factual spatial subjects should use real or reference-grounded visuals when possible. Do not use invented shapes, generic silhouettes, or decorative prose diagrams as substitutes for the visual a strong reference page would choose. The detailed rule lives in `docs/editorial-standard.md`.

## Organization

The main browsing hierarchy is:

```text
Category -> Topic -> Entry
```

Categories are broad shelves such as `biology-medicine`. Topics are stable curriculum clusters such as `metabolism-diabetes`. Entries are the actual things to learn.

Entries within a topic should be ordered by the structure that best teaches the topic when a natural structure exists: chronology, prerequisite to advanced, mechanism to application, workflow order, or another clear learning sequence. Alphabetical order is the fallback. Deliberate topic order belongs in the optional `entryOrder` slug list in `app/lib/topics.ts`, not duplicated in components.

Tags are cross-cutting descriptors and get their own index pages:

```text
/tag/insulin
```

Relationships are semantic links between entries, separate from the browsing hierarchy:

```text
part of / go deeper / connected to
```

Relationships are curated navigation, not automatic tag/category links. Use a small number of strong links and ask whether clicking the link would genuinely help Gavin understand or continue the topic.

The site chrome uses a shared compact header across entry, quiz, review queue, category, topic, and tag views. It contains only `Gavin's Miscellany`, the subtitle `Personal encyclopedia and learning curriculum`, a derived corpus count such as `119 entries`, and page-level controls. Do not add a second large Gavin's Miscellany masthead below it; page-specific identity belongs underneath the shared header.

The shared header keeps `Surprise Me`, `Quiz Me`, and `Review (N)` in fixed conceptual action slots. Authentication/account UI comes after those three actions and must not reposition them when signing in or out.

## Adding An Entry

1. Pick the best current category folder under `content/`.
2. Add a new `.md` file with a unique `slug`.
3. Fill in the front matter, including a stable `topic` key from `app/lib/topics.ts`. Empty arrays are fine.
4. Add concise Markdown body text.
5. Run `npm test` to confirm the app builds and related slugs resolve.

The `slug` is also the durable public route for the entry:

```text
/entry/tardigrades-cryptobiosis
```

Do not derive entry identity or links from category folders, topic display labels, or other mutable labels.

## Editorial Review

Editorial Review is an authenticated Gavin workflow. It lets Gavin flag entries for later ChatGPT/Codex review without turning the website into a CMS. The website captures requests only; it never edits canonical content and the active review state is Miscellany-specific, not part of MemoryEngine.

Run the app with:

```bash
npm run dev
```

Logged-out/public visitors get content browsing and reveal-only quiz answers, with no typed answers, Due controls, memory stats, MemoryEngine writes, or Review controls. Logged in as Gavin enables Editorial Review controls and can mark an entry `Ready to quiz`.

Active Review state lives in Supabase/Postgres:

```text
public.miscellany_editorial_reviews
```

The table is scoped by `user_id` plus `entry_slug` and has one active row per entry. A review is a persistent annotation/flag attached to the entry with an optional note and selected text. First click creates the active row; later saves update that same row; Remove deletes/cancels it. Opening an entry from the Review Queue opens the entry with authenticated Review controls enabled.

Canonical content still lives in Markdown under `content/` and is changed through Git. MemoryEngine remains separate: Miscellany sends only source/item/rating review events to MemoryEngine, never editorial notes or entry prose.

Quiz question front matter uses one complete schema: `question_id`, `version`, `question`, canonical `answer`, explicit `rubric`, and active/retired status. Markdown owns that schema and stable question identity. `public.miscellany_quiz_entry_readiness` owns an authenticated user's entry-level `Ready to quiz` choices. An entry with zero active questions cannot become ready.

The browser loads readiness once from `GET /api/quiz/readiness`; ordinary entry, Quiz, and Quiz Coverage rendering never probes MemoryEngine registration status per question. The entry-level control and Quiz Coverage share `POST /api/quiz/readiness`. Private APIs validate the Supabase access token and require its immutable user ID to match the server-only owner configuration. The API writes readiness through Supabase RLS first, then separately attempts bounded idempotent registration of active questions with MemoryEngine. Registration failure never reverses the saved readiness choice. Quiz Coverage supports the accepted bulk action `Mark selected ready to quiz`; it deliberately exposes neither an import/reconstruction action nor `Mark not ready`.

Signed-in typed quiz grading goes through `/api/quiz/grade` only for ready questions. The route calls OpenAI server-side using `OPENAI_API_KEY`. The browser sends only `questionId` and the typed answer; the server resolves the question, canonical answer, and rubric from Markdown metadata. Do not send full entry prose to the grader. The grading response maps to MemoryEngine ratings `again`, `hard`, `good`, or `easy`.

Authenticated entry pages include a closed question audit section at the bottom of each entry. It shows question text only so Gavin can select a prompt and use the existing Review workflow without exposing answers, rubrics, IDs, or versions in the entry body.

## Project Handoff

`CHATGPT_HANDOFF.md` is a rolling current-state handoff. Rewrite it after material work; do not append an indefinitely growing chronological history. Git history is the archive.

## Books

Use `data/books/` later for LibraryThing CSV or TSV exports. Entries can already reference books in their `books` array, but no live integration exists yet.

## Roadmap

Likely future directions include PDF/book export, richer diagrams, LibraryThing references, automated idea intake, private/public content, spaced repetition, timelines, taxonomies, and topic maps.
