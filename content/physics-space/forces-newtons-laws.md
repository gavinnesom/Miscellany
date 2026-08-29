---
title: "Forces and Newton's Laws"
slug: "forces-newtons-laws"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - newtons-laws
  - forces
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related: []
related: []
sources:
  - label: "College Board — AP Physics 1 Course and Exam Description"
    url: "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf"
  - label: "OpenStax College Physics 2e — Newton's Laws"
    url: "https://openstax.org/books/college-physics-2e/pages/4-introduction-to-dynamics-newtons-laws-of-motion"
  - label: "OpenStax University Physics Volume 1"
    url: "https://openstax.org/books/university-physics-volume-1/pages/preface"
books: []
image:
  url: "/images/newtons-laws-free-body.svg"
  alt: "Free-body diagrams for a car, a block on an incline, and circular motion vectors."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "forces-newtons-laws:weight-normal-force-resting-book-third-law"
    version: 1
    question: "Why are weight and normal force on a resting book not a third-law pair?"
    answer: "They act on the same object. Third-law pairs act on different objects: Earth on book and book on Earth; table on book and book on table."
    rubric: Correct if the answer conveys the canonical idea that They act on the same object. Third-law pairs act on different objects Earth on book and book on Earth; table on book and book on table.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Kinematics says how motion changes. Dynamics asks **why**.

Newton's central idea is not that "force causes motion." Objects do not need a force to keep moving. Net force causes **acceleration** — a change in velocity.

### First law: inertia

If the net external force on an object is zero:

$$
\sum \vec F = 0,
$$

then its velocity is constant.

Constant velocity includes the special case of rest.

The first law therefore rejects an everyday intuition produced largely by friction: moving objects do not naturally "run out of motion."

### Second law: interaction changes momentum

For constant mass, the familiar form is:

$$
\sum \vec F = m\vec a.
$$

The more general statement is:

$$
\sum \vec F_{\text{ext}} = \frac{d\vec p}{dt},
$$

where:

$$
\vec p = m\vec v.
$$

Force is therefore a rate of momentum change.

### Third law: forces come in interaction pairs

If object A exerts a force on object B, then B exerts an equal-magnitude, opposite-direction force on A.

These forces do **not** cancel each other on a free-body diagram because they act on different objects.

A book resting on a table illustrates two different pairs:

- Earth pulls the book downward; the book pulls Earth upward.
- The table pushes the book upward; the book pushes the table downward.

The upward normal force and downward weight on the **book** are not a third-law pair. They happen to balance in this situation because the book's acceleration is zero.

### Free-body diagrams

A free-body diagram contains only forces **acting on the chosen object or system**.

Common forces include:

- weight \(mg\)
- normal force
- tension
- friction
- spring force
- drag
- electric or magnetic forces in broader physics

Then apply Newton's second law separately by component:

$$
\sum F_x = ma_x
$$

$$
\sum F_y = ma_y.
$$

### Friction is not always \(\mu mg\)

The usual models are:

$$
f_k = \mu_k N
$$

for kinetic friction, and:

$$
f_s \le \mu_s N
$$

for static friction.

Static friction adjusts up to a maximum. It is **not automatically equal** to \(\mu_sN\).

Also, \(N=mg\) only in particular geometries. On a slope, in an accelerating elevator, or during curved motion, the normal force may differ substantially from weight.

### Circular motion

An object moving in a circle of radius \(r\) at speed \(v\) has inward acceleration:

$$
a_c = \frac{v^2}{r}.
$$

Therefore the inward **net** force must satisfy:

$$
F_{\text{net,inward}} = \frac{mv^2}{r}.
$$

"Centripetal force" names this required inward net force; it is not an additional physical interaction.

For a satellite, gravity supplies it. For a car turning on a level road, static friction often supplies it. For a mass on a string, tension may supply it.

### Gravitation

For point masses or spherically symmetric bodies:

$$
F_g = G\frac{m_1m_2}{r^2}.
$$

Near Earth's surface this becomes approximately:

$$
F_g = mg
$$

because \(r\) changes little compared with Earth's radius.

### Physics C bridge

The deeper Newtonian statement is:

$$
\vec F_{\text{net}} = \frac{d\vec p}{dt}.
$$

For a constant-mass particle this reduces to \(m\vec a\). Calculus becomes essential when force varies with position, velocity or time.

> **Big idea:** Forces describe interactions. The vector sum of the external interactions on a system determines how its momentum changes.

## Quantitative anchor

A 70 kg person standing still on level ground has weight of about:

$$
mg \approx 70\times9.8 \approx 686\ \text{N}.
$$

That is roughly 154 pounds-force, though newtons and pounds-force are different units.
