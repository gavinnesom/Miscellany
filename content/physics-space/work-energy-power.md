---
title: "Work, Energy, and Power"
slug: "work-energy-power"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - energy
  - power
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related: []
related: []
sources:
  - label: "College Board — AP Physics 1 Course and Exam Description"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf"
  - label: "OpenStax College Physics 2e — Work and Energy"
    url: "https://openstax.org/books/college-physics-2e/pages/7-introduction-to-work-energy-and-energy-resources"
  - label: "OpenStax University Physics Volume 1"
    url: "https://openstax.org/books/university-physics-volume-1/pages/preface"
books: []
image:
  url: "/images/work-energy-landscape.svg"
  alt: "A cart on a track with energy bars and a potential-energy curve whose slope indicates force."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "work-energy-power:carrying-suitcase-horizontally-constant-height-involve-little"
    version: 1
    question: "Why does carrying a suitcase horizontally at constant height involve little mechanical work on the suitcase by the upward hand force?"
    answer: "The upward force is perpendicular to the horizontal displacement, so its dot product with displacement is essentially zero."
    rubric: Correct if the answer conveys the canonical idea that The upward force is perpendicular to the horizontal displacement, so its dot product with displacement is essentially zero.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Force is a local description: what interaction acts **right now**?

Energy often lets us ignore the detailed motion between two states and ask instead:

> What energy entered, left, or changed form?

### Work transfers energy through displacement

For a constant force:

$$
W = Fd\cos\theta,
$$

where \(\theta\) is the angle between force and displacement.

The general form is:

$$
W = \int \vec F\cdot d\vec r.
$$

Only the component of force along the displacement contributes to work.

A person carrying a suitcase horizontally at constant height may exert a large upward force on it, but that upward force does essentially zero mechanical work on the suitcase because the displacement is horizontal.

### Kinetic energy

For a particle:

$$
K = \frac{1}{2}mv^2.
$$

The work-energy theorem is:

$$
W_{\text{net}} = \Delta K.
$$

Because speed is squared, doubling speed multiplies kinetic energy by four.

A car at 60 mph therefore has four times the translational kinetic energy it had at 30 mph, assuming the same mass.

### Potential energy belongs to a system

Near Earth's surface:

$$
U_g = mgy.
$$

For an ideal spring:

$$
U_s = \frac{1}{2}kx^2.
$$

For two gravitating point masses:

$$
U_g = -G\frac{Mm}{r}.
$$

Potential energy does not reside mysteriously "inside the object." It belongs to an interacting system and depends on configuration.

### Conservation of energy

For an isolated system:

$$
E_{\text{total}} = \text{constant}.
$$

Mechanical energy \(K+U\) is conserved only when the chosen accounting excludes transfers that change mechanical energy, such as thermal dissipation.

Friction does not destroy energy. It commonly transfers organized mechanical energy into less organized internal/thermal energy.

### Power is a rate

Average power:

$$
P = \frac{W}{\Delta t}.
$$

Instantaneously:

$$
P = \frac{dW}{dt} = \vec F\cdot\vec v.
$$

A machine can perform the same work with different power depending on how quickly it does it.

### Example: climbing stairs

Suppose an 80 kg person climbs 3.0 m vertically.

The increase in gravitational potential energy is:

$$
\Delta U_g = mgh
$$

$$
\approx 80\times9.8\times3.0
$$

$$
\approx 2350\ \text{J}.
$$

If this takes 5 s, the average mechanical power delivered against gravity is roughly:

$$
P \approx 470\ \text{W}.
$$

The body's metabolic power is larger because muscles are not 100% efficient.

### Physics C bridge

Calculus clarifies what work means when force varies with position:

$$
W_{A\rightarrow B}=\int_A^B \vec F\cdot d\vec r.
$$

For a conservative one-dimensional force:

$$
F_x = -\frac{dU}{dx}.
$$

That compact equation says the force points "downhill" on the potential-energy landscape.

Stable equilibrium occurs near a local minimum of \(U(x)\). That connection leads naturally to oscillations.

> **Main message:** Energy is a state-accounting tool. It can solve problems without reconstructing every moment of the motion.

## Misconceptions

- Force and energy are not interchangeable.
- Work in physics is not the same as effort.
- Friction does not violate energy conservation.
- Potential energy depends on system choice and reference.
- Power is not energy; it is energy transferred per unit time.
