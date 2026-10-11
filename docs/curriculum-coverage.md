# Miscellany curriculum coverage — living integration matrix

Baseline verified 2026-10-11: gavinnesom/Miscellany, main eb1db9ea82f8a399cb81949f00816786b1f53a3e; 128 canonical entries and 187 baseline quiz questions. No existing work changed before branching. All 153 Library handoff lines read. Publication authorized by latest direct owner confirmation; independent editorial/fact review and release tests remain required.

Status conventions: existing = current full article covers the named bridge, partial = relevant foundation but insufficient requested coverage, drafted = local unreviewed changes, assigned = parent-coordinated author work, integrated = reviewed/tested batch incorporated. Proposed paths are not completion evidence.

| Requested concepts | Current full-body coverage | Assigned/proposed destination | Status and gap |
| --- | --- | --- | --- |
| Prime factorization existence/uniqueness | primes-factorization defined/asserted it only | content/mathematics/primes-factorization.md | Integrated in PR #4: Bézout proof of Euclid lemma, cancellation proof, composite counterexample |
| Primality vs factor recovery; binary input cost | primes-factorization gave trial division only | Same | Integrated in PR #4: decision/search distinction, exponential trial range, AKS distinction |
| Structured factoring example; RSA assumptions | RSA has correctness and padding depth | Same; preserve rsa-first-principles | Integrated in PR #4: Fermat worked examples and close-factor mechanism; no impossibility claim |
| Other six number-theory lessons | modular-arithmetic, gcd-euclidean-algorithm, modular-inverses, fast-modular-exponentiation, euler-totient-theorem, rsa-first-principles | Preserve current sequence | Existing: mechanisms, worked examples, caveats; no identified need for blanket expansion |
| Earth age and dating | earth-age, radiometric-dating | Reuse | Existing: isotope measurements, independent clocks; do not duplicate |
| Hadean/Archean water, habitats, energy | geological-time-overview has dates only | Five origins articles, exact slugs pending | Assigned: environmental evidence and uncertainty |
| Prebiotic organic chemistry | No adequate origins chemistry lesson | Origins sequence | Assigned: reactions, energy and concentration constraints |
| Polymers, information, replication | dna-vs-rna describes modern molecular roles | Origins sequence linking dna-vs-rna | Assigned: polymer formation, copying fidelity and unresolved transitions |
| Membranes and protocells | No origins compartmentalization lesson | Origins sequence | Assigned: selective permeability, growth/division, coupling problems |
| RNA world vs metabolism-first/vents | No adequate coverage | Origins sequence | Assigned: evidence, strengths, failures, no settled abiogenesis narrative |
| Earliest life evidence; photosynthesis transition | geological-time-overview gives ~3.5 Ga; GOE explains sinks | Origins sequence linking great-oxidation-event | Assigned: distinguish biosignature inference and later oxygenation |
| Charge, Coulomb, superposition | Mechanics foundation, no E&M curriculum | content/physics-space/electric-fields-superposition.md | Assigned |
| Electric flux and symmetry | No current lesson | content/physics-space/electric-flux-gauss-law.md | Assigned: meaningful calculus bridge |
| Work, potential energy, voltage | work-energy-power provides mechanics prerequisite | content/physics-space/electric-potential-energy.md | Assigned |
| Current, resistance, power | junction-boxes is practical enclosure orientation only | content/physics-space/current-resistance-power.md | Assigned |
| Kirchhoff DC circuit reasoning | No current lesson | content/physics-space/dc-circuits-kirchhoff.md | Assigned |
| Capacitance, stored energy, RC dynamics | No current lesson | content/physics-space/capacitors-rc-circuits.md | Assigned |
| Magnetic charge/wire forces and sources | No current lesson | content/physics-space/magnetic-fields-forces.md | Assigned |
| Faraday/Lenz, coupled changing fields | No current lesson | content/physics-space/electromagnetic-induction.md | Assigned |
| Temperature, heat, internal energy, kinetic gases | entropy is statistical; galileo-thermometer concerns buoyancy | content/physics-space/temperature-heat-ideal-gases.md | Assigned |
| First law and thermodynamic paths | four-stroke-engine labels strokes, lacks thermal accounting | content/physics-space/first-law-thermodynamic-processes.md | Assigned |
| Second law, entropy, engines, efficiency | entropy already supplies multiplicity and local-decrease caveat | content/physics-space/entropy-heat-engines.md | Assigned: thermodynamic bridge, avoid re-teaching whole statistical lesson |
| Whole-car integrated energy/torque/support map | Three disjoint mechanism lessons | Vehicle systems map, exact slug pending | Assigned |
| Valves/cam/crank geometry, torque vs power, ignition/fueling | four-stroke-engine has strokes, cam half-speed, ignition contrast | Focused revision of content/engineering-machines/four-stroke-engine.md | Assigned; retain question ID; fix answer/rubric mismatch if refining |
| Gearing, clutch/converter, manual/automatic, final drive | differential-gears explains speed constraint and equal torque | Gearing entry plus differential-gears revision | Assigned |
| Hydraulic brakes, dissipation, ABS | work-energy-power and fluids-pressure-buoyancy-flow provide foundations | Brakes/ABS entry | Assigned |
| Steering and suspension geometry | car-suspension-basics distinguishes spring/damper, unsprung mass and lists alignment terms | Steering entry plus suspension revision | Assigned; existing suspension question version 2 and ID retained |
| Cooling, lubrication, thermal/pressure behavior | No integrated vehicle lesson | Cooling/lubrication entry | Assigned |
| Battery, starter, alternator, charging | No vehicle electrical lesson | Vehicle electrical entry | Assigned |
| 1966 Mustang straight-six examples | No verified owner-specific specs in corpus | Examples only if reliable historical sources verify them | Assigned: do not assume configuration/modifications |
| Whole-world country/capital/location coverage | No geographic reference curriculum | world-geography-reference; africa-countries-capitals; europe-countries-capitals; west-central-asia-countries-capitals; south-east-asia-countries-capitals; americas-countries-capitals; oceania-countries-capitals | Assigned: baseline UN members + observers, each exactly once; spatial teaching, source date |
| Disputed statehood, dependencies, capital exceptions | No adequate coverage | sovereignty-capitals-territories | Assigned: transparent neutral inclusion convention |
| Explanatory history spine | origins-of-civilization ends at Bronze Age; out-of-africa gives prehistoric dispersals | Modern history spine, exact slugs pending | Assigned: empire/successors, colonial expansion, decolonization, nation states, border treaties, alliances |
| UK/US-connected and global case studies | napoleon-height-myth is satire/measurement; guns-germs-steel is qualified book thesis; nexus-harari is information framework | Parent history author, approximately eight substantive transformations | Assigned: choose causal cases, give colonized societies agency, grounded maps when useful |

## Integration contract

Authors supply full Markdown or unified patches with exact repository-relative paths and all image assets, source and visual provenance, prerequisite/order proposal, coverage mapping, numerical checks and uncertainty notes. Keep taxonomy edits as proposed snippets; integration owns app/lib/topics.ts and app/lib/categories.ts. Use existing earth-history-geology and vehicles-drivetrains; new electricity-magnetism, thermal-physics, world-geography and modern-world-history topics.

Front matter uses the repository's simple parser: scalars, simple lists and shallow nested objects; no folded/block scalars or anchors. Every quiz needs stable slug-scoped question_id, positive integer version, explicit status, question, answer and rubric. Preserve existing IDs and increment substantive revisions. Never write owner readiness or learning state. Relationships may only target existing or same-batch entries unless an explicit batch dependency is declared.

Math is lightweight text rendering, not full TeX layout; inspect rendered nested expressions. Visuals need real explanatory value and grounded geometry/boundaries, alt text, provenance/source/license. Existing tests snapshot article/question counts and require intentional updates with additions.

Release evidence per batch: exact commit, reviewable diff/PR, independent editorial/fact review, npm test, lint, typecheck, representative rendered/mobile checks, exact Vercel commit/status, public route smoke checks. Separate passed/failed/not-run. No production release before reviewed and tested.

## Number-theory draft evidence

Reviewed and merged PR #4: https://github.com/gavinnesom/Miscellany/pull/4; reviewed head 3c5a1c5e0f9de8fdd7207f2c2b7eb0658cea1bd3; merge 9fea8c43a73f1b639f89213e89e290931919fe02, identical tree. Vercel preview success for that exact head. Production build, typecheck, schema and numerical/SSR checks passed. Full npm test 64/64 with process-scoped public fixtures documented in tests/browser-quiz-runs.mjs. Unconfigured baseline reproduces the sign-in label assertion failure. Lint fails pre-existing MiscellanyApp.tsx:200. Independent editorial/fact review approved exact head. Supported installed Playwright browser inspection passed at desktop and 390px mobile; no page overflow, bounded existing horizontal scrolling for table. Production deployment pending; direct live-route smoke check blocked by executor proxy HTTP 403 and web-tool inaccessibility.

## Exact-file transfer protocol

Preferred route: a temporary topic authorship branch in gavinnesom/Miscellany. Authors may use connected GitHub create_blob/create_tree/create_commit/create_branch tools (or create_file/update_file on an isolated branch). Keep base main SHA explicit; full batches authored against original eb1db9e are compatible because PR #4 changed only primes-factorization and the question-count snapshot. Before integration, executor fetches branch and reads the exact committed tree/diff; it does not infer file bytes from message excerpts.

Return repository_full_name, branch name, exact final commit SHA, base commit SHA, and ordered manifest of repository-relative paths, Git blob SHAs, modes (normally 100644), encodings (UTF-8 Markdown/SVG; binary assets as appropriate), new-versus-existing status and intended topic/category. Also return source verification, numerical/chronology checks, image source/license/provenance, readiness/identity preservation evidence, coverage mapping, topic order proposal and review scope. Shared taxonomy stays proposed text; no shared taxonomy commits in author branches.

For Library fallback, return exact library_file_id plus authoritative file_id, filename and retained version_id if available, MIME type/size and intended repository-relative target. The consuming executor owns materialization into its current workspace using current Library skill instructions and verifies readable bytes; authors/parent never assume their own local paths exist here. Do not provide guessed URLs or manually reimplement authenticated transfer.

## Minimal new-entry schema

```yaml
---
title: "A concrete explanatory title"
slug: "durable-entry-slug"
category: "physics-space"
topic: "electricity-magnetism"
tags:
  - physics
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related: []
sources:
  - label: "Specific source title"
    url: "https://source.example/page"
books: []
quiz:
  - question_id: "durable-entry-slug:mechanism-distinction"
    version: 1
    status: "active"
    question: "A substantial unambiguous question?"
    answer: "A complete canonical answer."
    rubric: "Explicit required concepts and unacceptable conflations."
---

Opening prose establishes the question worth understanding.
```

Material revisions add date_updated and preserve date_added. Optional front-matter image uses url, alt, credit, source_url and provenance (external/local/collaborative/user), with license evidence in delivery notes. Additional body images need useful alt captions and supplied assets. No readiness field. Sources and image metadata use supported simple objects, no complex YAML. Absolute-value pipes inside Markdown tables will confuse the simple table splitter; rewrite those expressions or move them outside tables.

Supported math is lightweight Unicode/text conversion: inline `\(...\)` and blank-line-separated `$$` blocks. Inspect actual rendering; unknown commands and complex TeX layouts are unsafe. Existing tables have a 520px minimum width inside horizontally scrolling wrappers; mobile check must distinguish table scrolling from page-level overflow.

## Existing history inventory

All under content/history-society/: origins-of-civilization.md, out-of-africa.md, guns-germs-steel.md, nexus-harari.md, napoleon-height-myth.md, great-western-wamu.md, daylight-saving-debates.md, alcohol-fermentation-distillation-families.md, alcoholic-fermentation.md, distillation-alcohol.md, distilled-spirit-families.md, fermented-drink-families.md, history-of-alcohol.md. Origins-of-civilization reaches Bronze Age collapse; out-of-africa explains prehistoric dispersal/admixture. Guns/Germs/Steel is a qualified book thesis, Nexus an information-network framework, and Napoleon a height-myth correction. None supplies the requested modern geographic or geopolitical history spine.
