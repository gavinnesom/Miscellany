# Miscellany curriculum coverage — living integration matrix

Baseline verified 2026-10-11: gavinnesom/Miscellany, main eb1db9ea82f8a399cb81949f00816786b1f53a3e; 128 canonical entries and 187 baseline quiz questions. No existing work changed before branching. All 153 Library handoff lines read. Publication authorized by latest direct owner confirmation; independent editorial/fact review and release tests remain required.

Final release deployed successfully at https://vercel.com/gavins-projects-a20eaba9/miscellany/7FNmxe6XakFNSYedc3SUiK9ncD4g. Final corpus at main 750868d1d9272d6aaaf63a9b6a2d60b51cfddc5d: 168 entries and 273 canonical questions, adding 40 entries and 86 questions to the verified baseline. All existing slugs and question IDs survive; material quiz changes increase versions. The matrix compares complete inspected baseline articles against complete integrated articles, rather than treating draft count as coverage. No requested major curriculum concept remains deferred. History cases and territory exceptions are deliberately selected, not claims of exhaustive national histories or disputed-border inventories.

| Requested concepts | Current full-body coverage | Integrated destination | Coverage payoff / remaining limits |
| --- | --- | --- | --- |
| Prime factorization existence/uniqueness | primes-factorization defined/asserted it only | content/mathematics/primes-factorization.md | Integrated in PR #4: Bézout proof of Euclid lemma, cancellation proof, composite counterexample |
| Primality vs factor recovery; binary input cost | primes-factorization gave trial division only | Same | Integrated in PR #4: decision/search distinction, exponential trial range, AKS distinction |
| Structured factoring example; RSA assumptions | RSA has correctness and padding depth | Same; preserve rsa-first-principles | Integrated in PR #4: Fermat worked examples and close-factor mechanism; no impossibility claim |
| Other six number-theory lessons | modular-arithmetic, gcd-euclidean-algorithm, modular-inverses, fast-modular-exponentiation, euler-totient-theorem, rsa-first-principles | Preserve current sequence | Existing: mechanisms, worked examples, caveats; no identified need for blanket expansion |
| Earth age and dating | earth-age, radiometric-dating | Reuse | Existing: isotope measurements, independent clocks; do not duplicate |
| Hadean/Archean water, habitats, energy | geological-time-overview has dates only | content/physics-space/early-earth-habitability.md | Integrated: Zircon dating versus isotope/environment inference, habitats and compatibility trade-offs |
| Prebiotic organic chemistry | No adequate origins chemistry lesson | content/physics-space/prebiotic-chemistry-energy.md | Integrated: Spark experiments, precursor networks, catalysts versus free energy, concentration-rate derivation and polymer chemistry |
| Polymers, information, replication | dna-vs-rna describes modern molecular roles | content/physics-space/rna-replication-origins.md | Integrated: Four copying requirements, handedness, fidelity/error-threshold derivation, 2024/2026 experiments and limits |
| Membranes and protocells | No origins compartmentalization lesson | content/physics-space/protocells-origin-hypotheses.md | Integrated: Permeability, osmotic competition, catalyst-associated growth, parasites and magnesium compatibility |
| RNA world vs metabolism-first/vents | No adequate coverage | content/physics-space/protocells-origin-hypotheses.md | Integrated: Mechanism/setting distinctions, specific experimental support and unresolved integration transitions |
| Earliest life evidence; photosynthesis transition | geological-time-overview gives ~3.5 Ga; GOE explains sinks | content/physics-space/earliest-life-evidence.md | Integrated: Syngenicity, convergent biosignatures, Dresser/Isua disputes, LUCA versus first life and three oxygen chronologies |
| Charge, Coulomb, superposition | Mechanics foundation, no E&M curriculum | content/physics-space/electric-fields-superposition.md | Integrated: Vector cancellation, dipole midpoint, continuous distributions and calculated field diagram |
| Electric flux and symmetry | No current lesson | content/physics-space/electric-flux-gauss-law.md | Integrated: Closed-surface accounting, uniform sphere inside/outside derivation, conductor/cavity distinctions |
| Work, potential energy, voltage | work-energy-power provides mechanics prerequisite | content/physics-space/electric-potential-energy.md | Integrated: Potential differences, conservative fields, equipotentials and worked electron-energy example |
| Current, resistance, power | junction-boxes is practical enclosure orientation only | content/physics-space/current-resistance-power.md | Integrated: Drift, resistivity and microscopic limits of Ohm’s law, temperature and energy accounting |
| Kirchhoff DC circuit reasoning | No current lesson | content/physics-space/dc-circuits-kirchhoff.md | Integrated: Signed loop/junction constraints, mixed network, internal resistance and full power balance |
| Capacitance, stored energy, RC dynamics | No current lesson | content/physics-space/capacitors-rc-circuits.md | Integrated: Geometry, energy derivation, exponential charge/discharge and time-constant model limits |
| Magnetic charge/wire forces and sources | No current lesson | content/physics-space/magnetic-fields-forces.md | Integrated: Lorentz/vector forces, trajectories, currents and Biot–Savart/Ampère symmetry |
| Faraday/Lenz, coupled changing fields | No current lesson | content/physics-space/electromagnetic-induction.md | Integrated: Flux derivative, motional emf, mechanical/electrical power agreement, transformers and Maxwell bridge |
| Temperature, heat, internal energy, kinetic gases | entropy is statistical; galileo-thermometer concerns buoyancy | content/physics-space/temperature-heat-ideal-gases.md | Integrated: Zeroth law, kinetic pressure, rms speed, degrees of freedom and ideal-gas limitations |
| First law and thermodynamic paths | four-stroke-engine labels strokes, lacks thermal accounting | content/physics-space/first-law-thermodynamic-processes.md | Integrated: Work sign convention, PV paths, heat capacities, free expansion and adiabatic conditions |
| Second law, entropy, engines, efficiency | entropy already supplies multiplicity and local-decrease caveat | content/physics-space/entropy-heat-engines.md | Integrated: Reversible entropy accounting, finite-temperature transfer, Carnot limits and heat-pump energy |
| Whole-car integrated energy/torque/support map | Three disjoint mechanism lessons | content/engineering-machines/vehicle-energy-systems-map.md | Integrated: Combustion-to-road and braking energy paths, component interfaces and combined force constraints |
| Valves/cam/crank geometry, torque vs power, ignition/fueling | four-stroke-engine has strokes, cam half-speed, ignition contrast | content/engineering-machines/four-stroke-engine.md | Integrated: Slider-crank geometry, valve timing, torque/power, firing intervals, fueling and ignition roles |
| Gearing, clutch/converter, manual/automatic, final drive | differential-gears explains speed constraint and equal torque | content/engineering-machines/transmission-gearing.md; differential-gears.md | Integrated: Torque/speed/work tradeoff, clutch/converter and gear-selection mechanisms, differential speeds and traction limits |
| Hydraulic brakes, dissipation, ABS | work-energy-power and fluids-pressure-buoyancy-flow provide foundations | content/engineering-machines/brakes-hydraulics-abs.md | Integrated: Pascal force/volume tradeoff, heat/load transfer, slip feedback and loose-surface limits |
| Steering and suspension geometry | car-suspension-basics distinguishes spring/damper, unsprung mass and lists alignment terms | content/engineering-machines/steering-geometry.md; car-suspension-basics.md | Integrated: Ackermann derivation, tire slip, alignment, damped quarter-car response and unsprung/contact-load effects |
| Cooling, lubrication, thermal/pressure behavior | No integrated vehicle lesson | content/engineering-machines/engine-cooling-lubrication.md | Integrated: Warm-up bypass, coolant heat balance, boiling/pressure and hydrodynamic bearing film |
| Battery, starter, alternator, charging | No vehicle electrical lesson | content/engineering-machines/vehicle-starting-charging.md | Integrated: Cranking losses, parallel bus, regulation/rectification and mechanical generation cost |
| 1966 Mustang straight-six examples | No verified owner-specific specs in corpus | content/engineering-machines/four-stroke-engine.md | Integrated: Generic six-cylinder firing-interval example; owner’s straight-six context preserved without inventing model configuration or service specifications |
| Whole-world country/capital/location coverage | No geographic reference curriculum | Eight world-geography entries under content/history-society/ | Integrated: 195 unique country rows (54/44/24/24/35/14), spatial routes, river/island comparisons and dated exception notes |
| Disputed statehood, dependencies, capital exceptions | No adequate coverage | content/history-society/sovereignty-capitals-territories.md | Integrated: Membership/recognition/claim/control distinctions; selective dependencies, free association and administrative versus designated capitals |
| Explanatory history spine | origins-of-civilization ends at Bronze Age; out-of-africa gives prehistoric dispersals | Ten modern-world-history entries under content/history-society/ | Integrated: Causal chronology, imperial institutions/languages, revolutions, nationalism, treaty systems, decolonization and successor states |
| UK/US-connected and global case studies | napoleon-height-myth is satire/measurement; guns-germs-steel is qualified book thesis; nexus-harari is information framework | Atlantic, Vienna, WWI, Ottoman, WWII, South Asia, African and Cold War entries | Integrated: Mechanism-led comparisons with local agency and specific sources; archival map retained as historical proposal, not redrawn modern boundaries |

## Integration contract

Authors supply full Markdown or unified patches with exact repository-relative paths and all image assets, source and visual provenance, prerequisite/order proposal, coverage mapping, numerical checks and uncertainty notes. Keep taxonomy edits as proposed snippets; integration owns app/lib/topics.ts and app/lib/categories.ts. Use existing earth-history-geology and vehicles-drivetrains; new electricity-magnetism, thermal-physics, world-geography and modern-world-history topics.

Front matter uses the repository's simple parser: scalars, simple lists and shallow nested objects; no folded/block scalars or anchors. Every quiz needs stable slug-scoped question_id, positive integer version, explicit status, question, answer and rubric. Preserve existing IDs and increment substantive revisions. Never write owner readiness or learning state. Relationships may only target existing or same-batch entries unless an explicit batch dependency is declared.

Math is lightweight text rendering, not full TeX layout; inspect rendered nested expressions. Visuals need real explanatory value and grounded geometry/boundaries, alt text, provenance/source/license. Existing tests snapshot article/question counts and require intentional updates with additions.

Release evidence per batch: exact commit, reviewable diff/PR, independent editorial/fact review, npm test, lint, typecheck, representative rendered/mobile checks, exact Vercel commit/status, public route smoke checks. Separate passed/failed/not-run. No production release before reviewed and tested.

## Number-theory draft evidence

Reviewed and merged PR #4: https://github.com/gavinnesom/Miscellany/pull/4; reviewed head 3c5a1c5e0f9de8fdd7207f2c2b7eb0658cea1bd3; merge 9fea8c43a73f1b639f89213e89e290931919fe02, identical tree. Vercel preview success for that exact head. Production build, typecheck, schema and numerical/SSR checks passed. Full npm test 64/64 with process-scoped public fixtures documented in tests/browser-quiz-runs.mjs. Unconfigured baseline reproduces the sign-in label assertion failure. Lint fails pre-existing MiscellanyApp.tsx:200. Independent editorial/fact review approved exact head. Supported installed Playwright browser inspection passed at desktop and 390px mobile; no page overflow, bounded existing horizontal scrolling for table. Vercel production deployment succeeded for exact merge 9fea8c43a73f1b639f89213e89e290931919fe02 (https://vercel.com/gavins-projects-a20eaba9/miscellany/DebWZ7ga93EahEyiaLHvJLgVHrJg); direct live-route smoke check blocked by executor proxy HTTP 403 and web-tool inaccessibility.

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

## Completed release evidence (2026-10-11)

| Batch | Reviewed integration head | Main merge | Checks | Deployment |
| --- | --- | --- | --- | --- |
| Number theory, PR #4 | 3c5a1c5e0f9de8fdd7207f2c2b7eb0658cea1bd3 | 9fea8c43a73f1b639f89213e89e290931919fe02 | 64/64 fixture tests, build/typecheck, schema/numeric/SSR and desktop/mobile | Production success; parent confirmed live article/topic/quiz |
| Physics + vehicles, PR #5 | 78b75e88d490da7cf5e1462b6b9a8c6f2044e7f5 | 4bfbaed63d1ac9c697361ddde75c286bbaa0dee7 | 65/65 fixture tests, build/typecheck, Vercel-format build, ID/version/link/asset audit, 28 browser views | Vercel production success AP3h61kaYkJKBzPBfx22tMbHhEex |
| Origins, PR #6 | 1fcc8865ab07fc2f1d0b2a5a4e1b739a2342696d | 20dc0acb117c1209c4b3629819f695cc7d68e717 | 66/66 cumulative tests, build/typecheck, Vercel-format build, audit, ten browser views | Vercel production success 3V945RVNesRYodk93yYDJqqApHYQ |
| Geography + history, PR #7 | 7f8c15abf2e00e391af2b6fc6052476505424a81 | 750868d1d9272d6aaaf63a9b6a2d60b51cfddc5d | 67/67 cumulative tests, build/typecheck, Vercel-format build, 195-row reconciliation, audit, 26 browser views and actual mobile table scrolling | Vercel production success 7FNmxe6XakFNSYedc3SUiK9ncD4g |

Each merge tree was compared with the tested integration head and was identical. Process-scoped public browser fixtures are the existing values documented in tests/browser-quiz-runs.mjs; no account credential, schema or learning-state write was introduced. Final diff is limited to canonical Markdown, assets, shared taxonomy/descriptions and meaningful rendered/schema tests. Author evidence reports and generators remain private working files.

Independent editorial/fact/visual reviews cleared exact source commits: physics 27b64f3770dcb707928fedb5bacc08a8c486011b; vehicles 274ae6625667b9e01f9793cf7a149e809041b964; origins fa143a1e19db8edb82bbf3569dd5464cbe73fae3; geography c41688cb96ff70ac0ec2aca0000ec0498249360c; history 8c1df4a3072d3482c1c488326a4ef03c32b8f172. Integration normalized parser-sensitive quoted list items and removed generated SVG trailing whitespace after verifying normalized XML element/attribute/text identity. Parent exact-diff/live review subsequently found notation regressions in some Unicode conversions; the earlier blanket equivalence claim is withdrawn. PR #8 contains the combined correction and regression checks, pending exact-head independent source/visual re-review. History/origins article bodies match their reviewed sources; geography changes only quoted scalar lists.

Failed check: npm run lint still reports the pre-existing react-hooks/set-state-in-effect error at app/components/MiscellanyApp.tsx:200; unrelated app behavior was intentionally outside this content task. No other lint error or warning remains.

Not verified in executor: direct live-site browser QA (domain blocked by executor proxy) Parent live browser QA now confirms Sykes–Picot and representative local images load, and six requested topic routes show 168 entries. The UN map companion URL is correct but returns an external CloudFront403; no restriction was bypassed. Geography explicitly dates the reference to 11 October 2026; source differences, unverified later decree status and selective exception coverage are retained rather than hidden.

Durable state preserved: no slug removal, question-ID removal, version decrease, unversioned semantic quiz revision, readiness write, learning-record write, MemoryEngine change, schema/auth change or new persistent access. Two adjacent geology quiz answers now answer their existing questions at version 2. The suspension’s existing version-2 question remains unchanged.

## Post-release notation correction awaiting independent review

PR #8, head 800adf17fc3a2f8e6ee525b379e995c85c380b8c, corrects integral/membership token collision, exponent arithmetic swallowing, misleading node/temperature/Boltzmann labels and unsupported combining vector glyphs. Passed 69/69 cumulative tests/build, typecheck, Vercel-format build, identity/link/asset audit, 26 desktop/mobile views and 14 focused mathematical screenshot checks. No count or learner-state change. Baseline lint failure persists. Production remains at 750868d1d9272d6aaaf63a9b6a2d60b51cfddc5d until the parent’s required final source/visual re-review clears this exact patch.
