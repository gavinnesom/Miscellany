---
title: "Classical Mechanics: The Map"
slug: "classical-mechanics-map"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - ap-physics
  - models
date_added: "2026-08-15"
relationships:
  parent: []
  deeper:
    - kinematics-motion
    - forces-newtons-laws
    - work-energy-power
    - linear-momentum-impulse
    - torque-rotational-dynamics
    - fluids-pressure-buoyancy-flow
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
  url: "/images/classical-mechanics-map.svg"
  alt: "A map showing motion, interactions, energy, momentum, rotation, oscillation, and fluids as connected ways of describing physical systems."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "classical-mechanics-map:central-difference-between-kinematics-dynamics"
    version: 1
    question: "What is the central difference between kinematics and dynamics?"
    answer: "Kinematics describes how motion changes; dynamics asks what interactions or forces produce that change."
    rubric: Correct if the answer conveys the canonical idea that Kinematics describes how motion changes; dynamics asks what interactions or forces produce that change.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Physics becomes much easier once the formulas stop looking like unrelated tricks.

Classical mechanics repeatedly asks only a few kinds of question:

- **How is the object moving?** Position, velocity and acceleration are kinematics.
- **What is interacting with it?** Forces and torques describe interactions.
- **What changes can be tracked without following every instant?** Energy and momentum often let us jump directly between states.
- **What changes when the object has size and can rotate?** Translational ideas acquire rotational partners.
- **What happens near a stable equilibrium?** Many systems oscillate.
- **What if the material itself flows?** Fluids add pressure, buoyancy and flow constraints.

A good physics solution therefore starts before any equation is chosen.

### 1. Choose the system

"The system" is the part of the universe whose behavior you want to track.

If the system is a falling ball alone, Earth exerts an external gravitational force on it.

If the system is **ball + Earth**, gravity becomes an internal interaction and it is often more natural to talk about gravitational potential energy.

That choice is not bookkeeping trivia. It determines which conservation laws are useful.

### 2. Choose a representation

The same physical situation can be represented as:

- a sketch
- a motion diagram
- a free-body diagram
- a graph
- an equation
- an energy bar chart
- a momentum vector diagram

Experts switch among these representations constantly. A graph can reveal something an equation hides; a free-body diagram can expose a force that prose forgot.

### 3. Decide what changes and what is conserved

Several of mechanics' most powerful statements have the form:

$$
\text{change in something} = \text{influence accumulated over time or distance}
$$

Examples:

$$
\Delta \vec p = \int \vec F_{\text{net}}\,dt
$$

$$
\Delta K = \int \vec F_{\text{net}}\cdot d\vec r
$$

$$
\Delta \vec L = \int \vec\tau_{\text{ext}}\,dt
$$

The algebra-based course often uses constant-force or constant-acceleration versions of these ideas. Calculus reveals that the familiar formulas are special cases of more general accumulation rules.

### The main conceptual spine

A useful way to organize mechanics is:

```text
motion
  ↓ asks why
forces
  ↓ can be accumulated through distance
energy
  ↓ can be accumulated through time
momentum
  ↓ extended objects add lever arms
rotation
  ↓ stable restoring forces produce
oscillation
```

Fluids reuse many of the same ideas — force, pressure, energy and conservation — but apply them to matter that can move and deform continuously.

> **Main message:** Mechanics is not a bag of equations. It is a small collection of models for describing change, interaction and conservation.

## Useful misconceptions to address

- A force is not required to keep an object moving at constant velocity.
- Energy is not "used up"; useful forms are transformed and often dispersed.
- Momentum conservation is a statement about a chosen system and its external impulse.
- Centripetal force is not a new kind of force; it is the inward net force required for curved motion.
- Conservation laws are not magic exceptions to Newton's laws. They are closely connected descriptions of the same physics.
