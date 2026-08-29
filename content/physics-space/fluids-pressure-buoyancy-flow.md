---
title: "Fluids: Pressure, Buoyancy, and Flow"
slug: "fluids-pressure-buoyancy-flow"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - fluids
  - bernoulli
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related: []
sources:
  - label: "College Board — AP Physics 1 Course and Exam Description"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf"
  - label: "College Board — AP Physics 1 equation sheet"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-equations-sheet.pdf"
  - label: "OpenStax University Physics Volume 1"
    url: "https://openstax.org/books/university-physics-volume-1/pages/preface"
books: []
image:
  url: "/images/fluids-pressure-flow.svg"
  alt: "A reservoir and constricted pipe with pressure gauges, velocity arrows, and a buoyancy inset."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "fluids-pressure-buoyancy-flow:fast-fluid-always-has-lower-pressure-too"
    version: 1
    question: "Why is “fast fluid always has lower pressure” too strong?"
    answer: "Bernoulli gives that result only along a streamline under ideal steady, incompressible, nonviscous conditions with no added or removed energy."
    rubric: Correct if the answer conveys the canonical idea that Bernoulli gives that result only along a streamline under ideal steady, incompressible, nonviscous conditions with no added or removed energy.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

A fluid cannot sustain a static shear stress the way a rigid solid can. It deforms and flows.

That simple fact changes how forces are distributed.

### Density

Density is:

$$
\rho=\frac{m}{V}.
$$

Water near ordinary conditions has density close to:

$$
1000\ \text{kg/m}^3.
$$

Air near sea level is roughly:

$$
1.2\ \text{kg/m}^3,
$$

so water is about 800 times as dense as air.

### Pressure

Pressure is force per unit area:

$$
P=\frac{F}{A}.
$$

In a static fluid, pressure at a point acts in all directions.

For an incompressible fluid of density \(\rho\) in a uniform gravitational field:

$$
P=P_0+\rho gh.
$$

Pressure therefore rises linearly with depth.

At about 10 m depth in water:

$$
\rho gh\approx1000\times9.8\times10
\approx98,000\ \text{Pa},
$$

roughly one additional atmosphere of pressure.

### Pascal's principle and hydraulics

A pressure change applied to an enclosed incompressible fluid is transmitted through the fluid.

If two pistons experience the same pressure:

$$
\frac{F_1}{A_1}=\frac{F_2}{A_2}.
$$

A large output force is possible with a larger output area.

This does not create energy for free: the smaller piston must move farther so that displaced volumes match.

### Buoyancy

Pressure is greater on the bottom of a submerged object than on the top.

That pressure difference produces an upward net force.

Archimedes' principle states:

$$
F_B=\rho_{\text{fluid}}V_{\text{displaced}}g.
$$

The buoyant force equals the weight of displaced fluid.

An object floats when its average density is low enough that it can displace its own weight of fluid before becoming fully submerged.

### Continuity

For steady incompressible flow:

$$
A_1v_1=A_2v_2.
$$

If a pipe narrows, the fluid speed increases.

This is conservation of volume flow for an incompressible fluid.

### Bernoulli's equation

Along a streamline for steady, incompressible, nonviscous flow:

$$
P+\frac12\rho v^2+\rho gy=\text{constant}.
$$

The three terms can be read as pressure energy, kinetic energy and gravitational potential energy **per unit volume**.

Bernoulli is therefore an energy-accounting relation for a highly idealized fluid.

It does not mean "fast fluid always has low pressure" in every situation. Pumps, viscosity, turbulence, geometry and non-steady flow can invalidate that slogan.

### Why a constriction can lower static pressure

At equal height in ideal steady flow, continuity says a narrower region has larger \(v\).

Bernoulli then requires the static pressure term \(P\) to be smaller if no other energy input occurs.

That is a specific result under specific assumptions — much better than memorizing "fast air sucks."

### Real fluids

Real flows can involve:

- viscosity
- turbulence
- drag
- boundary layers
- compressibility
- pumps or turbines
- energy dissipation

Bernoulli is a model, not a universal incantation.

> **Big idea:** Fluid mechanics is still mechanics: pressure represents distributed force, buoyancy comes from pressure gradients, continuity expresses conservation, and Bernoulli expresses energy conservation under ideal-flow assumptions.
