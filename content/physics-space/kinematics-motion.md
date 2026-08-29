---
title: "Kinematics: Position, Velocity, and Acceleration"
slug: "kinematics-motion"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - kinematics
  - motion
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related: []
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
  url: "/images/kinematics-graph-hierarchy.svg"
  alt: "Motion dots aligned with position, velocity, and acceleration graphs showing slope and area relationships."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "kinematics-motion:object-have-zero-velocity-nonzero-acceleration"
    version: 1
    question: "Why can an object have zero velocity and nonzero acceleration?"
    answer: "Velocity describes motion at an instant; acceleration describes how velocity is changing, so a thrown ball has v = 0 at the top while gravity still accelerates it downward."
    rubric: Correct if the answer conveys the canonical idea that Velocity describes motion at an instant; acceleration describes how velocity is changing, so a thrown ball has v = 0 at the top while gravity still accelerates it downward.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Kinematics describes motion **without yet asking what causes it**.

Three quantities form the core:

- **position** \(x\): where an object is
- **velocity** \(v\): how fast position is changing, including direction
- **acceleration** \(a\): how fast velocity is changing

In one dimension:

$$
v = \frac{\Delta x}{\Delta t}
$$

for an average over a finite interval, while the instantaneous version is

$$
v = \frac{dx}{dt}.
$$

Likewise,

$$
a = \frac{\Delta v}{\Delta t}
$$

on average, and

$$
a = \frac{dv}{dt}
$$

instantaneously.

### The graph hierarchy

Kinematics becomes much clearer when graphs are read geometrically.

On a position-versus-time graph:

- slope = velocity

On a velocity-versus-time graph:

- slope = acceleration
- signed area = displacement

On an acceleration-versus-time graph:

- signed area = change in velocity

That relationship is more general than any memorized constant-acceleration formula.

### Constant acceleration

If acceleration is constant:

$$
v = v_0 + at
$$

$$
x = x_0 + v_0t + \frac{1}{2}at^2
$$

$$
v^2 = v_0^2 + 2a(x-x_0)
$$

where:

- \(x_0\) = initial position
- \(v_0\) = initial velocity
- \(a\) = constant acceleration
- \(t\) = elapsed time

These equations are convenient, but their **constant-acceleration assumption matters**.

A car accelerating hard from rest does not generally maintain the same acceleration all the way to highway speed. Air drag makes a falling object's acceleration depart from \(g\) as speed increases. The equations above stop being exact when \(a\) varies significantly.

### Velocity and acceleration need not point the same way

A ball thrown upward has upward velocity while gravity gives it downward acceleration.

At the very top:

$$
v = 0
$$

for an instant, but

$$
a \approx -9.8\ \text{m/s}^2
$$

near Earth's surface.

Zero velocity therefore does **not** imply zero acceleration.

### Two dimensions: treat vectors as vectors

Projectile motion can be decomposed into components.

Ignoring air resistance near Earth's surface:

$$
a_x = 0
$$

$$
a_y = -g.
$$

Horizontal and vertical motions share the same time coordinate but otherwise follow their own component equations.

This is why a horizontally fired projectile and a dropped object released from the same height hit the ground at the same time, assuming the ground is level and air resistance is negligible.

### Physics C bridge

Calculus removes the need for constant acceleration.

Given acceleration as a function of time:

$$
v(t)=v(t_0)+\int_{t_0}^{t}a(t')\,dt'
$$

and then:

$$
x(t)=x(t_0)+\int_{t_0}^{t}v(t')\,dt'.
$$

Differentiation goes the other way:

$$
x(t) \rightarrow v(t) \rightarrow a(t).
$$

The familiar kinematic equations are what these integrals produce when \(a\) is constant.

> **Takeaway:** Position, velocity and acceleration are not three formulas. They are a derivative/integral hierarchy describing how motion changes.

## Quantitative anchor

At \(9.8\ \text{m/s}^2\), an object in ideal free fall changes its downward velocity by about **9.8 m/s every second** — roughly 22 mph of speed change per second.

## Misconceptions

- Negative velocity does not mean slowing down.
- Negative acceleration does not automatically mean slowing down.
- A flat position graph means zero velocity, not zero position.
- A turning point can have \(v=0\) while \(a\neq0\).
