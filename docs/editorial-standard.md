# Gavin's Miscellany Editorial Standard

This is the canonical standard for researching, writing, revising, auditing, and reorganizing Gavin's Miscellany entries.

For any substantive content work, read this file before editing content. Follow it unless Gavin explicitly overrides it in the current request.

## Purpose

Gavin's Miscellany is a personal encyclopedia and learning curriculum.

The goal is not completeness. The goal is:

- understanding
- long-term recall
- useful connections
- enjoyable browsing

Use as little space as necessary to explain the concept properly, not as little space as possible. Err slightly toward extra depth. Entries can be compressed later as Gavin learns them.

Do not stop after:

- giving a definition
- answering the immediate question
- stating one fact

Usually answer the next one or two obvious follow-up questions as well. When appropriate, explain why something happens, how it works, what evidence supports it, what is commonly misunderstood, and what is not true.

## Layered Entry Model

A strong entry may include:

1. quick orientation
2. image or explanatory diagram
3. Big Idea, Main Message, or Takeaway when the subject genuinely has one
4. core mechanism or explanation
5. useful detail
6. numbers, scale, or comparisons
7. evidence, examples, or history
8. misconception or limitation
9. semantic relationships
10. sources

Do not force every layer into every entry.

The main entry title must come before any entry image. Front-matter images should appear after the title, metadata, and introductory prose at a sensible explanatory point. Book entries keep their metadata treatment, but their image still must not render above the title.

Entries may use multiple visuals when each one earns its space. Use front matter for the primary representative image, and ordinary Markdown image syntax for additional in-body figures. Body images should have useful alt text because the renderer uses that text as the figure caption. Do not turn multi-image entries into carousels or decorative galleries.

Optional YouTube embeds are allowed only as supplementary learning aids. Use front matter with `video.youtube_id`, `video.title`, and optional `video.note`. A video must not appear above the title, replace the written entry, or become required for understanding the article.

Use callout labels as normal paragraphs, not block quotes. Prefer `**Big idea:**`, `**Takeaway:**`, or `**Main message:**` at the start of a paragraph. Do not leave a literal `>` marker before these labels.

## Bullets And Paragraphs

Short parallel statements should be real Markdown bullets.

Use paragraphs when an idea actually needs development.

Do not create several tiny standalone paragraphs that are functionally a list.

Good:

```markdown
## During fasting

- Insulin falls.
- Glucagon becomes relatively more important.
- The liver increases glycogenolysis and gluconeogenesis.
```

Use paragraphs when explaining how or why those things happen.

## Text Normalization And Inline Markup

Write ordinary reader-facing prose with ordinary characters directly: `"quoted text"`, `Festival™`, `3–3.5 ft`, `15 °F`, and `Cordyline banksii × pumilio`.

Do not use backticks as generic emphasis. Reserve inline code for genuinely code-like material, such as commands, API paths, identifiers, token IDs, symbolic logic tokens where code-style distinction is intentional, and short source literals. Use ordinary prose or Markdown emphasis for cultivar names, measurements, botanical/scientific names, and explanatory phrases.

Do not store visible JSON/YAML-style escaped quotes in reader-facing text. Escaping may be required internally, but the rendered article should not show `\"` unless the backslash itself is the point.

Use the project's supported math notation consistently. Inline math should use `\(...\)` and display math should use fenced `$$` blocks; raw TeX commands should not leak into ordinary prose.

## Numbers And Comparisons

Numbers should usually have context.

When describing non-human quantities, compare to humans or another familiar reference where useful.

When discussing measurements such as blood glucose, blood pressure, ketones, weight, height, age, distance, speed, neuron count, or sleep-cycle duration, provide normal ranges, thresholds, familiar comparisons, or another useful scale anchor when available.

Avoid vague descriptions such as "very high," "many," "large," or "rare" when a useful number exists.

Do not imply that a numerical comparison is more meaningful than it is. For example, neuron count is a scale anchor, not an IQ score.

## Research Workflow

For substantive content work, follow this order.

### 1. Inspect The Existing Corpus

Before researching:

- read the current entry if it exists
- inspect its category and topic
- inspect nearby entries
- inspect current tags
- inspect semantic relationships
- look for duplication or missing bridge entries

Do not write an entry in isolation if the surrounding corpus affects how it should fit.

### 2. Decide What Is Worth Preserving

Do not indiscriminately copy everything found.

Identify:

- the central mechanism
- memorable evidence
- useful numbers
- practical consequences
- surprising facts
- misconceptions
- strong connections

The entry should contain things worth remembering, not generic padding.

### 3. Research

Research enough to avoid misleading simplification.

For medical, disputed, technically specific, surprising, current, controversial, or consequential claims, verify them and prefer stronger, primary, or authoritative sources where practical.

For ordinary stable topics, Wikipedia, reputable explanatory sources, useful individual websites, books, universities, government institutions, reputable publications, research papers, and journals are acceptable.

Sources exist primarily so Gavin can verify a claim or continue reading, not for academic citation theater.

Clearly distinguish established fact, estimate, author's argument, hypothesis, and controversy.

Do not preserve something merely because Gavin heard or read it somewhere.

### 4. Write In Gavin's Preferred Style

Assume Gavin is scientifically and mathematically literate.

Use technical terminology, equations, mechanisms, tables, diagrams, and quantitative detail when they improve understanding.

Do not simplify merely to make an entry shorter.

### 5. Add Useful Visuals

An image or diagram is expected for almost every entry when a useful visual exists.

Visuals must earn their space. A visual is useful when it conveys something more effectively than prose alone.

No visual is better than a bad visual. Do not manufacture a visual merely to reach 100% image coverage.

A visual should be approximately the visual a good textbook, museum exhibit, field guide, technical manual, serious reference page, or scholarly introduction would choose for the subject.

Prefer visuals that show one or more of:

- shape
- structure
- spatial arrangement
- scale
- mechanism
- change over time
- comparison
- hierarchy
- geography
- anatomy
- physical appearance
- real objects, organisms, people, or places

A visual is not sufficient merely because it contains boxes and arrows.

Do not use a diagram that mostly:

- repeats sentences from the body
- puts prose inside rectangles
- acts as a decorative summary
- uses arrows without adding mechanistic or spatial meaning

Test every proposed visual with:

> If I replaced this visual with one or two sentences, would Gavin lose meaningful information or understanding?

If the answer is no, replace it with a better visual or omit it.

Also test:

> If I were making a strong textbook/reference page on this subject, is this approximately the visual I would choose?

If either test fails, replace the visual or omit it.

Prefer:

1. real explanatory image: organism, object, person, place, anatomy, mechanism, or hardware
2. true explanatory diagram: mechanism, anatomy, material/energy/information flow, geometry, or structure
3. map, timeline, or comparison graphic: geographic change, historical sequence, side-by-side states, or scale comparison
4. chart or quantitative graphic: numerical relationship, distribution, trend, or thresholds
5. conceptual box-and-arrow diagram, only when the concept is genuinely abstract and the labels are compressed concepts, not paragraphs

Prefer Wikimedia Commons, government or public-domain sources, or other appropriately usable sources.

Local diagrams are encouraged and should be editable or reproducible where practical.

Local diagrams should use the available article width deliberately. Timelines, charts, mechanisms, flow diagrams, and spatial schematics should usually spread their meaningful structure across roughly 80-90% of the useful SVG canvas instead of leaving large empty side margins around a compressed center. Preserve responsive behavior by using normal scalable SVGs, readable text sizes, generous but not excessive internal padding, and no fixed layout that creates horizontal page overflow on narrow screens.

Real subjects should usually be shown as real subjects. For people, organisms, plants, places, buildings, machines, artworks, and historical objects, prefer a real external image when appropriately usable. A generic silhouette, symbolic head, avatar, or icon does not count merely because the entry is about a person.

For geography, geology, astronomy, anatomy, engineering geometry, historical reconstruction, and scientific spatial structure, the image must be grounded in a credible published/reference source. Use an authoritative external map/diagram/photo, or a local redraw based closely on identified source material. Do not invent shapes or spatial layouts that could be mistaken for factual reconstruction. If a visual is schematic, label it clearly as schematic.

For mechanisms and physical systems, prefer technically accurate schematics, cutaways, labeled photos, motion sequences, or real component diagrams. Simplification is fine, but the important geometry and relationships must remain accurate.

For processes, algorithms, and bridge, only diagram when the visual shows something prose does poorly: branching, states, dependencies, feedback, geometry, competing paths, or decision structure. A straight sequence of circles or boxes saying A -> B -> C -> D usually does not qualify. For bridge bidding, prefer actual bidding trees, hand examples, decision branches, and contract-selection structure.

For film, television, music, books, and visual art, prefer the real cultural object when appropriately usable: official/publicity stills, archival/promotional images, portraits, covers/posters where usage is appropriate, externally hosted images with attribution/source, or genuine composition/structure diagrams grounded in the work. If rights or usage are unclear, prefer a legal/attributed alternative or no image over a weak homemade substitute. Do not copy copyrighted stills, posters, covers, or album art into the repo casually.

For individual philosophers and other real people, prefer a real public-domain or appropriately licensed portrait, bust, engraving, photograph, or other historically grounded image. The written entry can do the explanatory work. Add a conceptual visual only when it reveals a specific, real intellectual structure that prose or a portrait does not show as well. Keyword clouds, generic concept maps, and diagrams of the form "philosopher -> idea 1 / idea 2 / idea 3" do not qualify.

### 6. Add Relationships

Use:

- Part of
- Go deeper
- Connected to

`Connected to` is curated semantic navigation. Tags do not automatically create relationships.

Inspect the corpus and choose only strong connections.

Test each relationship with this question:

> Would clicking this genuinely help Gavin understand or continue this topic?

If not, do not create the connection. Isolation is acceptable.

### 7. Set Metadata

Preserve stable slug identity. Do not change stable slugs casually.

Set:

- category
- topic
- useful tags
- `entry_type` when relevant
- image provenance
- optional supplementary `video` metadata when a narrow embed is genuinely useful
- `date_added`
- `date_updated` when materially changed

### 8. Add Quiz Material

Add quiz questions when worthwhile.

Prefer questions about why, mechanism, distinction, scale, evidence, or consequence.

Avoid arbitrary trivia.

### 9. Validate

Run relevant validation and tests.

Check stable routes, broken relationship slugs, images, sources, Markdown lists or tables, and diagram readability.

Do not run irrelevant expensive checks simply out of habit.

## Images And Provenance

Use these provenance values:

```yaml
provenance: external
provenance: local
provenance: collaborative
provenance: user
```

Meanings:

- `external` means sourced elsewhere with attribution/source
- `local` means generated specifically for Miscellany
- `collaborative` means materially designed through back-and-forth with Gavin and renders as `Created with Gavin`
- `user` means Gavin supplied or created the image and renders as `Gavin's image`

Do not label something `collaborative` merely because Gavin requested an image. Use it only when he materially shaped the design.

## Structural Organization

The hierarchy is:

```text
Category -> Topic -> Entry
```

Category is the broad shelf. Topic is a coherent subject or curriculum cluster. Entry is the actual thing to learn.

Do not over-optimize organization during capture. Taxonomy can be changed later. Stable entry identity should remain independent of category and topic moves.

When a topic has a natural teaching sequence, order entries by that sequence: chronology, prerequisite to advanced, mechanism to application, workflow order, or another meaningful structure. Alphabetical order is only the fallback. Deliberate entry ordering belongs in `app/lib/topics.ts` as stable slugs.

## Tags

Tags are loose indexing and search metadata.

They may describe subject or format/type, such as:

- metabolism
- evolution
- AI
- book
- album
- song

Tags do not automatically create relationships.

Do not agonize over perfect vocabulary. Tag cleanup and normalization can be performed later across the corpus.

## Books

Books should usually live where their subject belongs.

Examples:

- quantum mechanics book -> Science / Physics / Quantum Mechanics
- bridge book -> Bridge & Games
- history book -> History & Society

Use:

```yaml
entry_type: book
```

and/or a `book` tag to identify the format.

Book entries generally include:

- book in one sentence
- main ideas or themes
- very brief chapter, part, or structure map when useful
- things worth remembering
- criticisms or limitations when important
- connections

Do not force chapter-by-chapter summaries when another structure is better.

## Plants And Weeds

For plants Gavin grows or may grow, usually include:

- what it is and why useful
- light
- water
- soil and drainage
- pH when meaningful
- habit, size, and spread
- seasonal behavior
- underwatering signs
- overwatering signs
- poor drainage or unsuitable-condition signs
- practical growing advice

For weeds, also include a `How to remove/control it` section covering lifecycle, seed production, timing, effective removal, recurrence, and seed bank where relevant.

## Music

Albums and songs can be entries.

They should live under the subject or cultural home that makes sense, typically Arts & Culture -> Music.

Use:

```yaml
entry_type: album
```

or:

```yaml
entry_type: song
```

and tags such as `album` or `song`.

Album entries may include:

- why it matters or why Gavin likes it
- sound and style
- themes and context
- standout tracks
- related artists or albums

Songs should be standalone only when worth preserving separately.

## Compression Over Time

The Miscellany is allowed to evolve.

As Gavin learns an entry well:

- shorten it
- compress explanations
- retain deeper material where useful

As a topic becomes more interesting:

- expand it
- split it
- add diagrams
- create deeper entries

Do not preserve old verbosity merely because it once existed.
