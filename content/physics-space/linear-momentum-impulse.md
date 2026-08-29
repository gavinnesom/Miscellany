---
title: "Linear Momentum, Impulse, and Collisions"
slug: "linear-momentum-impulse"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - momentum
  - impulse
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related: []
related: []
sources:
  - label: "College Board — AP Physics 1 Course and Exam Description"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf"
  - label: "OpenStax College Physics 2e — Linear Momentum"
    url: "https://openstax.org/books/college-physics-2e/pages/8-1-linear-momentum-and-force"
  - label: "OpenStax University Physics Volume 1"
    url: "https://openstax.org/books/university-physics-volume-1/pages/preface"
books: []
image:
  url: "/images/momentum-impulse-collision.svg"
  alt: "Force-time curves with equal impulse areas and before-after momentum vectors for a cart collision."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "linear-momentum-impulse:momentum-conserved-during-collision-even-collision-forces"
    version: 1
    question: "Why can momentum be conserved during a collision even when the collision forces are huge?"
    answer: "If the system includes both colliding objects, those huge forces are internal and exchange momentum within the system; only external impulse changes total system momentum."
    rubric: Correct if the answer conveys the canonical idea that If the system includes both colliding objects, those huge forces are internal and exchange momentum within the system; only external impulse changes total system momentum.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Momentum becomes especially powerful when forces are large, complicated, and short-lived — collisions, explosions, catches, impacts.

Linear momentum is:

$$
\vec p = m\vec v.
$$

It is a vector.

### Impulse changes momentum

Newton's second law can be written:

$$
\vec F_{\text{net}}=\frac{d\vec p}{dt}.
$$

Integrating over time:

$$
\vec J = \int \vec F\,dt = \Delta\vec p.
$$

For an approximately constant force:

$$
\vec J \approx \vec F_{\text{avg}}\Delta t.
$$

The area under a force-versus-time graph is therefore impulse.

### Why airbags and crumple zones help

To stop a person, their momentum must change.

For the same \(\Delta p\):

$$
F_{\text{avg}} \approx \frac{\Delta p}{\Delta t}.
$$

Increasing the stopping time reduces the average force.

That is the mechanical idea behind airbags, padding and vehicle crumple zones. They do not eliminate the required momentum change; they spread it over more time and often more distance.

### Conservation of momentum

For a chosen system:

$$
\Delta\vec p_{\text{system}} = \vec J_{\text{external}}.
$$

If external impulse is negligible:

$$
\vec p_{\text{before}}=\vec p_{\text{after}}.
$$

Internal collision forces can be enormous and momentum can still be conserved, because the internal interaction forces exchange momentum within the system.

### Collision types

**Elastic collision**

- momentum conserved
- kinetic energy conserved

**Inelastic collision**

- momentum conserved for an isolated system
- kinetic energy is not conserved as kinetic energy

**Perfectly inelastic collision**

- objects stick together afterward

Kinetic energy that disappears from the translational bookkeeping may become deformation, sound, thermal energy, vibration, rotation, or other internal energy.

### Center of mass

For particles:

$$
\vec r_{\text{CM}}=
\frac{\sum_i m_i\vec r_i}{\sum_i m_i}.
$$

The center of mass of a system responds to net external force as though the total mass were concentrated there for translational motion:

$$
\vec F_{\text{ext}}=M\vec a_{\text{CM}}.
$$

This is why an exploding firework's fragments can fly in many directions while the system's center of mass continues along the trajectory determined by external forces.

### Example: catching a ball

A 0.15 kg baseball moving at 40 m/s has momentum magnitude:

$$
p=mv=6.0\ \text{kg m/s}.
$$

Stopping it in 0.010 s requires an average force magnitude around:

$$
F\approx\frac{6.0}{0.010}=600\ \text{N}.
$$

If the glove and arm move backward so stopping takes 0.050 s:

$$
F\approx120\ \text{N}.
$$

Same momentum change; five times the stopping time; one fifth the average force.

### Physics C bridge

The force-time graph idea becomes exact through:

$$
\Delta\vec p = \int \vec F_{\text{ext}}\,dt.
$$

Calculus also makes variable-mass and continuous-system mechanics possible, although those are beyond the normal AP Physics C: Mechanics core.

> **Takeaway:** Momentum is the natural bookkeeping quantity for interactions over time.
