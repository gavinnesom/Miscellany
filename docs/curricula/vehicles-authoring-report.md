# Vehicle systems curriculum: authoring and integration report

Authoring date: 2026-10-11. Category `engineering-machines`; existing topic `vehicles-drivetrains`.

## Scope and coverage

Nine entries, six new and three replacements of existing identities. About 6,500 body words, 23 active quiz definitions, nine original SVG figures. This is an authored batch awaiting independent editorial review and integration tests, not a claim of published completion.

| Requested outcome | Entry | What makes it substantive |
| --- | --- | --- |
| Whole-car fuel/air, torque, electrical, thermal and control map | vehicle-energy-systems-map | Separates matter, energy and commands; uphill/downhill power accounting distinguishes radiator heat from all losses |
| Engine internals, crank geometry, valves, ignition/fueling, torque/power | four-stroke-engine (replace) | Derives finite-rod piston displacement; dead-center virtual-work argument; valve timing tradeoffs; carburetion/PFI/GDI distinctions; torque-power example |
| Manual/automatic powertrain and final drive | transmission-gearing | Equal-power torque/speed rectangles; constant-mesh synchronizers; converter stator reaction and stall heat; planetary constraint with three operating modes |
| Differential | differential-gears (replace) | Speed sum and virtual-work equal-torque reasoning; unequal-power example; low-grip numerical limit; locking/LSD distinctions |
| Hydraulics, friction, heat, ABS | brakes-hydraulics-abs | Master/caliper area calculation with explicit floating-caliper assumption; stop-energy and thermal example; load transfer; slip feedback and gravel exception |
| Steering and suspension geometry | steering-geometry | Derived Ackermann relationship and exact scale geometry; distinguishes no-slip kinematics from slip-angle tire force; alignment and bump-steer definitions |
| Spring/damper and tire contact | car-suspension-basics (replace) | Energy-storage/dissipation distinction; forced-base equation; damping/isolation tradeoff; road-spacing frequency; unsprung mass and anti-roll coupling |
| Cooling, lubrication, pressure | engine-cooling-lubrication | Bypass topology; mass-flow heat balance; temperature difference versus absolute temperature; hydrodynamic bearing wedge versus supply pressure |
| Starter, alternator, battery, charging | vehicle-starting-charging | Bootstrapping; high-current voltage/heat losses; parallel bus and changing battery current direction; field regulation and generation load |

No new repair procedures, parts recommendations, service specifications, or owner-vehicle configuration claims. The supplied owner fact “straight-six Mustang” is used only to ground the six-cylinder concept. No 1966 model specifications, firing order, transmission, brakes, or modifications are inferred. A Ford brochure scan was located but not relied on for factual additions.

## Proposed topic navigation (integration owns taxonomy)

Keep existing topic key `vehicles-drivetrains` and category. Set `startHere` to `vehicle-energy-systems-map`. Suggested `entryOrder`:

1. vehicle-energy-systems-map
2. four-stroke-engine
3. transmission-gearing
4. differential-gears
5. brakes-hydraulics-abs
6. steering-geometry
7. car-suspension-basics
8. engine-cooling-lubrication
9. vehicle-starting-charging

Existing mechanics dependencies: work-energy-power; torque-rotational-dynamics; oscillations-simple-harmonic-motion.

Explicit same-program batch dependencies, coordinated with physics author: current-resistance-power; electromagnetic-induction; first-law-thermodynamic-processes; entropy-heat-engines. Integrate those physics entries before or with this batch. Alternatively omit only those outgoing links temporarily; do not create placeholder duplicate articles.

## Source verification and cautions

Read full current AGENTS, PROJECT, README, editorial standard, topics/categories, parser, renderer, and the three existing vehicle entries through GitHub. Read all 153 handoff lines.

Research used primary technical/educational sources: MIT 2.61 engine lecture PDFs (operating characteristics, mixture preparation, gas exchange, combustion); DOE/EPA vehicle energy accounting; Bosch fuel injection/ABS; TREMEC synchronizers; ZF clutch/converter/damper documentation; MathWorks explicit mechanical/vehicle model constraints; HELLA cooling; MAHLE bearing/oil-system technical material; DENSO electrical principles/manual; Michelin tire-force/handling descriptions; MOOG alignment geometry; OpenStax hydraulic and oscillator derivations; NHTSA ABS testing. Per-entry sources are the authoritative bibliography.

Specific care taken:

- DOE's 12–30% is presented as drive-cycle-dependent vehicle energy accounting, not universal engine efficiency or a measurement of the owner's car.
- Eaton's simplified “least resistance” wording is not copied into a false all-torque-to-one-wheel claim. Equal torque is qualified as symmetric ideal quasi-steady behavior; power follows torque times speed.
- NHTSA's loose-gravel observation qualifies ABS claims; no universal shortest-stop promise.
- MathWorks documentation is used for explicit equations and model assumptions, not as evidence that real tires/vehicles exactly follow those models. No software defaults become real-world specifications.
- No third-party illustrations, photos, textbook cutaways, or brochure pixels are copied. The retained engine video is the pre-existing supplementary Animagraffs embed.
- DENSO's manual was accessible via search-index passages for rectification/regulation, but a full PDF open exceeded the web reader's size cap. The manufacturer product pages were read as well. No repair sections are reproduced.

## Visual provenance and geometry

All nine SVGs are original local explanatory figures generated by `scripts/generate-vehicle-diagrams.py`; no external image licensing dependence. Factual references are in entry image `source_url` fields and the source lists. Source material supports relationships/equations; the plots and numerical examples are independently computed, not traced proprietary graphics. Use the repository's ordinary contribution/license terms; no separate image license is invented.

- vehicle-slider-crank.svg: exact rigid-link construction with r=40 mm, l=140 mm, no offset; the same rod length in each panel. A generic kinematic model, not an engine cutaway.
- vehicle-ackermann.svg: wheel normals intersect at one center; L=2.7 m, t=1.6 m, R=6 m; geometry calculated, not imagined. Not a car reconstruction.
- vehicle-gearing-tradeoff.svg: rectangle areas encode equal torque × angular speed; axes have separate units.
- vehicle-braking-energy.svg: exact 1/2 mv² curve for hypothetical 1,400 kg car.
- vehicle-suspension-response.svg: analytical free response from nonzero displacement and zero velocity. Not measured damping or a tuning prescription.
- vehicle-differential-speeds.svg: exact 460/500/540 rpm average constraint, with no fabricated bevel tooth geometry.
- vehicle-electrical-bus.svg: genuinely parallel topology with closed return paths and a switched starter branch; not a service wiring diagram.
- vehicle-cooling-bypass.svg: functional bypass topology, explicitly not universal plumbing or component placement.
- vehicle-energy-paths.svg: branching energy/storage network; electrical generation feeds a shared DC bus, not a false series alternator–battery–load circuit. Arrow widths are explicitly nonquantitative.

SVGs include title/description and readable text; alt captions describe the mechanism. PNG previews were inspected, overlapping chart footnotes were corrected, and representative final figures were reinspected. Final app/mobile inspection remains an integration responsibility.

## Calculations and schema checks

All displayed worked calculations were independently recomputed in the authoring check script; values are recorded in `docs/curricula/vehicles-calculation-audit.json`. Examples include 21.7169 kW uphill wheel power; 96.5194 kW illustrative fuel input; 45.8359 mm piston travel at 90°; 40.7150 kW for both gear selections; 540.123 kJ stop energy; 68.4939 K illustrative disc rise; 49.1593 m ideal braking distance; 2.0347 kN front load transfer; 27.4397°/21.6560° steer angles; 1.3451 Hz suspension frequency; 8.3333 K coolant rise.

Local checks passed for all nine Markdown files: valid front matter, correct category/topic, unique slugs and 23 unique question IDs, complete quiz fields, positive versions, explicit active state, matching math delimiters, no blockquote callouts, resolved supplied SVG references, parseable SVG XML, and links resolving within existing or explicitly declared dependent batches.

The current app renderer is lightweight Unicode/text, not TeX layout. New math was normalized to Unicode/infix inside the supported delimiters. Fractions have explicit parenthesized numerator/denominator grouping; unsupported dot, double-dot, mathrm, eta/zeta and contour-integral commands are not left to render as literal words. Check long expressions in the real app at mobile widths. No renderer code change is requested.

Identity preservation:

- four-stroke-engine:four-stroke-engine-need-two-crankshaft-revolutions retained, version 1→2; old answer did not explain the two-revolution count, now corrected with explicit 4 × 1/2 = 2 reasoning.
- differential-gears:open-differential-s-equal-torque-behavior-become retained, version 1→2; truncated rubric repaired and torque/power distinction explicit.
- car-suspension-basics:different-jobs-spring-shock-absorber-perform retained, version 2 unchanged with exact prior question/answer/rubric.
- Existing dates_added and useful original tags retained. Readiness, enrollment, learning state, database schema, and application runtime untouched.

## Remaining integration/review requirements

Independent review should emphasize sign/angle definitions, slider-crank equation and zero-leverage argument, planetary ratios, hydraulic force factors, differentiation of gallery and film pressure, and all numerical assumptions. All examples are marked hypothetical.

Not run here: repository npm test, lint, typecheck, actual app rendering, browser/mobile route checks, deployment checks. This authoring workspace is not the designated integration checkout. Integration must run the required tests, intentionally update counts, verify physics-dependent links, review all final figures in situ, and handle PR/publication authorization separately. No authorship branch is itself release approval.
