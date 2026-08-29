---
title: "Double Pendulum: Two Simple Joints, Nonlinear Motion"
slug: "double-pendulum"
category: "physics-space"
topic: "physical-principles"
tags:
  - physics
  - chaos
  - pendulum
  - nonlinear-dynamics
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related:
    - chaos-sensitive-dependence
    - oscillations-simple-harmonic-motion
sources:
  - label: "OpenStax — Complexity and Chaos"
    url: "https://openstax.org/books/college-physics-ap-courses-2e/pages/34-5-complexity-and-chaos"
  - label: "OpenStax University Physics — Pendulums"
    url: "https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums"
  - label: "APS News — Lorenz and the butterfly effect"
    url: "https://www.aps.org/apsnews/2003/01/lorenz-butterfly-effect-1961"
  - label: "Shinbrot et al. — Chaos in a Double Pendulum"
    url: "https://yorke.umd.edu/Yorke_papers_most_cited_and_post2000/1992-04-Wisdom_Shinbrot_AmerJPhys_double_pendulum.pdf"
  - label: "Parker et al. — Double-pendulum chaotic initial-condition sets"
    url: "https://arxiv.org/abs/2106.13518"
books: []
image:
  url: "/images/double-pendulum-geometry-chaos.svg"
  alt: "A double-pendulum geometry diagram with two nearly identical numerical trajectories that initially overlap and later diverge."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "double-pendulum:ideal-double-pendulum-chaotic-even-energy-conserved"
    version: 1
    question: "Why can an ideal double pendulum be chaotic even when energy is conserved?"
    answer: "Chaos does not require noise or energy loss; deterministic nonlinear coupling can amplify tiny initial differences while total ideal energy remains constant."
    rubric: Correct if the answer conveys the canonical idea that Chaos does not require noise or energy loss; deterministic nonlinear coupling can amplify tiny initial differences while total ideal energy remains constant.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

A simple pendulum already has nonlinear dynamics at large angles.

Attach a second pendulum to its end and the system becomes dramatically richer.

A double pendulum has two angular coordinates:

```text
θ₁(t)
θ₂(t)
```

but their motions are coupled.

- The first arm moves the pivot of the second.
- The second arm pushes back dynamically on the first.
- Neither can generally be solved as an independent pendulum.

### Geometry

For point masses and massless rods of lengths \(\ell_1\) and \(\ell_2\):

$$
x_1=\ell_1\sin\theta_1
$$

$$
y_1=-\ell_1\cos\theta_1
$$

$$
x_2=x_1+\ell_2\sin\theta_2
$$

$$
y_2=y_1-\ell_2\cos\theta_2.
$$

These coordinates lead to kinetic and potential energies and therefore to coupled equations of motion.

### Why the equations become ugly

For the single small-angle pendulum:

$$
\theta''\approx-\frac{g}{\ell}\theta
$$

and the motion is nearly sinusoidal.

The double pendulum contains combinations such as:

- \(\sin(\theta_1-\theta_2)\)
- angular velocities multiplying one another
- denominators depending on relative angle

The equations are deterministic but nonlinear.

"Nonlinear" here means that the variables do not appear only as simple first powers that add independently.

### Deterministic does not mean predictable forever

If the exact initial angles and angular velocities were known with infinite precision, the equations determine the future trajectory.

But real measurements never have infinite precision.

In chaotic regions of the double pendulum's phase space, two extremely similar initial states can diverge rapidly.

- The problem is not randomness in the equations.
- It is amplification of uncertainty.

### Not every motion is equally chaotic

- At sufficiently low energy, the double pendulum can show comparatively regular oscillations.
- At other energies and initial conditions, its motion can become chaotic.
- Modern analyses show a mixture of regular and chaotic regions rather than one universal "everything is chaos" state.

### Energy is still conserved in the ideal model

For an undamped ideal double pendulum:

$$
E=K+U=\text{constant}.
$$

- Yet the motion can still be chaotic.
- Chaos does **not** require energy loss, noise or an external random force.
- A deterministic conservative system can be chaotic.

### Why numerical simulation is natural

Closed-form elementary solutions are generally unavailable for arbitrary double-pendulum motion.

Numerical integration advances the equations through many small time steps.

That does not mean the system lacks physical laws.

It means the laws produce behavior whose exact trajectory is more naturally computed than expressed by a simple formula.

### Connection to the AP Physics family

The simple pendulum entry in classical mechanics explains:

```text
small displacement
→ approximately linear restoring force
→ simple harmonic motion
```

The double pendulum is a useful next step:

```text
coupling + nonlinearity
→ richer phase space
→ possible chaos
```

> **Takeaway:** The double pendulum is compelling because nothing random is added. Two ordinary pendulum arms, coupled nonlinearly, are enough to produce deterministic chaos.
