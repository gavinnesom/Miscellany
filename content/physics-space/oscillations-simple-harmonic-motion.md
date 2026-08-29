---
title: "Oscillations and Simple Harmonic Motion"
slug: "oscillations-simple-harmonic-motion"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - oscillations
  - simple-harmonic-motion
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related:
    - car-suspension-basics
related: []
sources:
  - label: "College Board — AP Physics 1 Course and Exam Description"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf"
  - label: "OpenStax College Physics 2e — Oscillations"
    url: "https://openstax.org/books/college-physics-2e/pages/16-introduction-to-oscillatory-motion-and-waves"
  - label: "OpenStax University Physics Volume 1"
    url: "https://openstax.org/books/university-physics-volume-1/pages/preface"
books: []
image:
  url: "/images/simple-harmonic-motion-phase.svg"
  alt: "A spring-mass oscillator with position, velocity, acceleration waves and energy bars at three phases."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "oscillations-simple-harmonic-motion:simple-pendulum-period-formula-only-approximate"
    version: 1
    question: "Why is the simple pendulum period formula only approximate?"
    answer: "It uses sin θ ≈ θ, which is valid for small angles in radians; at larger amplitudes the period changes."
    rubric: Correct if the answer conveys the canonical idea that It uses sin θ ≈ θ, which is valid for small angles in radians; at larger amplitudes the period changes.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Many systems displaced from a stable equilibrium experience a force pushing them back toward it.

If that restoring force is approximately proportional to displacement:

$$
F=-kx,
$$

the system performs **simple harmonic motion**.

The minus sign matters: the force points opposite the displacement.

### Spring-mass oscillator

Newton's second law gives:

$$
m\frac{d^2x}{dt^2}=-kx.
$$

or:

$$
\frac{d^2x}{dt^2}=-\frac{k}{m}x.
$$

A function whose second derivative is proportional to its negative is sinusoidal:

$$
x(t)=A\cos(\omega t+\phi),
$$

with:

$$
\omega=\sqrt{\frac{k}{m}}.
$$

Therefore:

$$
T=2\pi\sqrt{\frac{m}{k}}.
$$

A stiffer spring gives a shorter period. A larger mass gives a longer period.

For the ideal linear oscillator, amplitude does not appear in the period.

### Energy trades form

For an ideal spring-mass oscillator:

$$
E=\frac12kx^2+\frac12mv^2.
$$

At maximum displacement:

- speed is zero
- spring potential energy is maximum

At equilibrium:

- displacement is zero
- speed is maximum
- kinetic energy is maximum

Energy continually moves between potential and kinetic forms.

### Pendulum

For a simple pendulum of length \(\ell\), the exact restoring torque contains:

$$
\sin\theta.
$$

For small angles in radians:

$$
\sin\theta\approx\theta.
$$

That approximation makes the equation linear and gives:

$$
T\approx2\pi\sqrt{\frac{\ell}{g}}.
$$

The familiar amplitude-independent period is therefore an approximation. At large amplitudes the period grows.

### Why simple harmonic motion is everywhere

Near a stable equilibrium, many smooth potential-energy curves look approximately parabolic:

$$
U(x)\approx U_0+\frac12k_{\text{eff}}x^2.
$$

Differentiate:

$$
F=-\frac{dU}{dx}\approx-k_{\text{eff}}x.
$$

So small disturbances around stable equilibria naturally produce approximately harmonic motion.

That is why springs, pendulums, vibrating molecules, suspension systems, musical instruments and many electrical systems share similar mathematics.

### Real oscillators

Real systems may include:

- damping, which removes mechanical energy
- driving, which supplies energy periodically
- resonance, when driving couples efficiently to the system's natural motion
- nonlinear effects at large amplitudes

The ideal oscillator is powerful precisely because it is the first approximation to many real systems, not because the world is perfectly sinusoidal.

### Physics C bridge

Calculus is not merely an optional decoration here. The defining equation is differential:

$$
m x''=-kx.
$$

The sinusoidal solution follows from the structure of the equation.

This is one of the clearest places to see what calculus contributes to mechanics: it turns a local law about acceleration at each instant into an entire motion through time.

> **Takeaway:** Simple harmonic motion is what stable systems often do when displaced only a little from equilibrium.
