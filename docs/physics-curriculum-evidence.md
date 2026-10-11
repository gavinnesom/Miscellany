# Physics curriculum handoff

Prepared 2026-10-11. These are authoring deliverables, not an applied repository patch or a claim of passing application tests. Copy only the paths listed in manifest.json into the integration branch. The article and image files are final for independent review.

## Coverage and learning order

All new entries use category `physics-space`.

| Topic | Suggested entryOrder | Substantive mechanism / evidence of depth |
|---|---|---|
| electricity-magnetism | electric-fields-superposition | Vector superposition, dipole cancellation counterexample, perpendicular-bisector derivation and far-field limit |
| electricity-magnetism | electric-flux-gauss-law | Flux integral, symmetry requirement, uniform solid sphere inside/outside derivation, conductor/cavity distinction, line and sheet cases |
| electricity-magnetism | electric-potential-energy | Work integral to potential, gradient versus value, signed electron energy, electrostatic versus induced fields |
| electricity-magnetism | current-resistance-power | Carrier counting, local-to-lumped Ohm relation, power derivation and fixed-current/fixed-voltage distinction |
| electricity-magnetism | dc-circuits-kirchhoff | Charge and energy constraints, loaded-source branching example and independent power balance, non-obvious current change after branch removal |
| electricity-magnetism | capacitors-rc-circuits | Field-to-capacitance derivation, charging-work integral, differential equation, exponential response and missing-half energy accounting |
| electricity-magnetism | magnetic-fields-forces | Zero magnetic work, helical/circular motion, motor-work distinction, Ampère symmetry, Biot–Savart loop derivation |
| electricity-magnetism | electromagnetic-induction | Flux orientation, Lenz sign reasoning, sliding-rod force/power balance, stationary induced E, transformer and motor/generator connection |
| thermal-physics | temperature-heat-ideal-gases | Collision-to-pressure derivation, average kinetic energy versus total energy, mode/model limits, gas and calorimetry examples |
| thermal-physics | first-law-thermodynamic-processes | Boundary work, same-temperature-change heat comparison, identical-endpoint isothermal/free-expansion comparison, adiabatic derivation and limitations |
| thermal-physics | entropy-heat-engines | Reversible reference path versus actual heat, explicit entropy-production examples, derivation of Carnot inequality, refrigeration and real-engine caveats |

Suggested topic definitions:

- `electricity-magnetism`, label “Electricity & Magnetism”, order 60, startHere `["electric-fields-superposition"]`. Description: “From charge and field geometry through potential, circuits, magnetic forces and induction, with derivations and energy checks.”
- `thermal-physics`, label “Thermal Physics”, order 70, startHere `["temperature-heat-ideal-gases"]`. Description: “From microscopic motion and temperature to heat, work, entropy and the limits of thermal machines.”

Existing entropy remains in its existing topic; no duplicate statistical-entropy survey was created. No modifications to existing mechanics or engine files are included. Existing entry slugs and quizzes are untouched. All 22 new quiz IDs are unique, active version 1; no readiness/user-state writes occurred.

## Existing corpus inspected

Read the entire current main versions of AGENTS.md, PROJECT.md, README.md, docs/editorial-standard.md, app/lib/topics.ts, app/lib/categories.ts; and full article bodies for entropy, work-energy-power, physics-c-calculus-bridge, forces-newtons-laws, torque-rotational-dynamics, fluids-pressure-buoyancy-flow, four-stroke-engine. Read modular-inverses as a current complete quiz-schema exemplar. Read the exact full 153-line Library handoff. Authoring initially changed no repository files; the transfer subsequently adds only this new content, assets and report on an isolated authorship branch. Main and shared taxonomy remain untouched.

Current vehicle crosslinks were coordinated with the vehicle author:

- `vehicle-starting-charging` from current/resistance and induction
- `engine-cooling-lubrication` from temperature/heat
- Existing `four-stroke-engine` from first law and entropy/engines

The two new vehicle slugs must be present in the same integration branch or added before a standalone physics branch passes relationship validation. Integrator may omit those two relationship entries and inline links temporarily for an independent PR, explicitly documenting the dependency; do not silently leave broken links.

## Source verification

Every exact source URL appears in its article front matter. All are OpenStax University Physics Volume 2 sections, opened successfully via the web tool on 2026-10-11. The substantive laws are standard textbook material; prose, numerical scenarios and drawings here are original, not copied textbook passages or artwork. Source section groupings:

- Charge/fields: 5.3, 5.4
- Flux/conductors: 6.1–6.4
- Potential: 7.2, 7.3, 7.5
- Capacitors/RC: 8.1–8.3 and 10.5
- Current/power: 9.1, 9.3, 9.5
- Circuits: 10.1–10.3
- Magnetism: 11.2–11.4, 12.1, 12.4, 12.5
- Induction: 13.1–13.4
- Temperature/ideal gases: 1.1, 1.4, 2.1, 2.2
- First law: 3.1, 3.3, 3.4, 3.6
- Entropy/engines: 4.2, 4.5–4.7

Source caveat: the source's older treatment calls μ0 exactly 4π×10⁻⁷ in SI. The new text does not repeat that outdated exactness claim; numerical checks use it only to the modest precision of the examples. Some source prose uses oversimplified “maximum charge” language for capacitance; the new capacitor article expressly distinguishes C=Q/V from a breakdown/rating limit.

## Reproducible arithmetic verification

`python3 validate_physics.py` parses front matter, checks 22 durable quiz identities, image presence, matching math delimiters and SVG XML, and recalculates numerical examples into calculation-checks.json. It also asserts independent energy equality for the DC network and motional-induction example.

Selected results:

- Dipole midpoint E = 3596 N/C; signed test force = −3.596 μN.
- Uniform sphere E(surface, half radius, twice radius) = 674.25, 337.125, 168.5625 N/C.
- 200 eV electron energy = 3.20435×10⁻¹⁷ J; nonrelativistic speed = 8.38766×10⁶ m/s.
- Loaded-source branch currents = 2.4, 0.8, 1.6 A; source and summed loss power both 28.8 W.
- RC at t=τ: V=7.58545 V, I=0.441455 mA; stored final energy = 7.20 mJ.
- Proton radius = 0.0521875 m; sliding-rod mechanical and electrical power both 0.045 W.
- Constant-volume/pressure heating = 3741.51/6235.85 J; isothermal work = 1728.94 J.
- Free-expansion entropy = 5.76315 J/K; permitted sample engine entropy = 0.666667 J/K; impossible quiz engine = −0.333333 J/K.

This is a separate computational recalculation of the prose, not an independent second-person review. Parent's independent reviewer should still inspect physical assumptions and rubric adequacy.

## Visuals and provenance

Six original editable SVGs, all labeled and using scalable viewBox geometry, are included. No external image assets were copied.

- physics-dipole-midpoint.svg: source signs/field directions from Coulomb superposition; scalar cancellation distinguished from vector addition.
- physics-gauss-sphere.svg: sampled analytic E/E(R)=r/R inside and (R/r)² outside.
- physics-dc-network.svg: actual stated electrical topology, node potentials, branch directions and values.
- physics-rc-response.svg: calculated 1−exp(−t/RC) and exp(−t/RC) curves.
- physics-sliding-rod.svg: physically consistent rod/rails/contact schematic, into-page B, CCW induced current, rightward velocity, leftward drag.
- physics-pv-paths.svg: calculated normalized isothermal v⁻¹ and monatomic reversible-adiabatic v⁻⁵ᐟ³ paths.

`draw_figures.py` regenerates images. Six SVGs were rendered with Inkscape to PNG and visually inspected in two contact sheets. Axes, labels, source signs, curve directions and circuit topology are readable without color-only encoding. Source grounding is mathematical, with exact corresponding textbook sections in the articles. No screenshot of the application was taken by this worker. At narrow widths the SVG scales rather than overflowing; actual app/mobile readability must still be checked by the integrator.

Five articles have no dedicated image: current/resistance/power, electric-potential-energy, magnetic-fields-forces, temperature/heat/ideal-gases, and entropy/engines. Their mechanisms are expressed in worked examples/derivations rather than decorative diagrams. Potential explicitly revisits the dipole diagram's lesson; the other images support adjacent curriculum concepts. A diagram is not asserted as necessary solely for image coverage.

## Deliberate boundaries and remaining integration checks

This is not a full AP exam specification or university text. It does not develop AC phasors, RLC resonance, inductor transient solutions, Maxwell wave-equation derivations, full dielectric/magnetic-material constitutive theory, or detailed engineering heat-transfer correlations. These are coherent next steps, not necessary omissions from the handoff's bounded core.

The integrator still owns taxonomy edits, actual application parser/schema checks, npm test/lint/typecheck, source-link checks in the rendered app, desktop/mobile representative rendering, and Git/PR workflow. This worker has not claimed any of those application checks passed. Front matter was normalized to conventional scalar/list/shallow-object YAML after the integrator reported its custom simple parser; quoted scalars, no block values or anchors. Actual project parser validation remains required. No merge or deployment occurred.

## Integration-format correction

After inspecting app/lib/math-text.ts, unsupported Greek/unit/hat/closed-integral commands and variable exponents were rewritten using Unicode, explicit parenthesized ratios and exp(…) inside supported math delimiters. This avoids requiring an app change and preserves mathematical grouping. Nested fractions are flattened with explicit parentheses. Representative actual rendering still requires integrator QA.

Independent reviewer confirmed all numerical examples and six image geometries. Review corrections applied before final authorship commit: logarithm ratio explicitly grouped, integral bounds written explicitly, quiz gradient sign corrected, and magnetic field-line wording avoids implying every line closes.
