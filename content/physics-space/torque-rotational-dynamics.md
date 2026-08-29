---
title: "Torque and Rotational Dynamics"
slug: "torque-rotational-dynamics"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - torque
  - rotation
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
  url: "/images/torque-lever-arm-inertia.svg"
  alt: "Door torque examples with different lever arms and a hoop versus disk inertia comparison."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "torque-rotational-dynamics:same-force-produce-different-angular-accelerations-same"
    version: 1
    question: "Why can the same force produce different angular accelerations on the same door?"
    answer: "Torque depends on where and at what angle the force is applied relative to the axis, so the perpendicular lever arm changes."
    rubric: Correct if the answer conveys the canonical idea that Torque depends on where and at what angle the force is applied relative to the axis, so the perpendicular lever arm changes.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

A force can change an object's translational motion. But for an extended object, **where the force acts** also matters.

Push a door near its hinge and little happens. Apply the same force near the handle and the door rotates readily.

Torque captures this rotational leverage.

### Torque

For a force \(\vec F\) applied at position \(\vec r\) from the chosen axis:

$$
\vec\tau = \vec r\times\vec F.
$$

Magnitude:

$$
\tau = rF\sin\theta.
$$

Equivalently:

$$
\tau = r_\perp F,
$$

where \(r_\perp\) is the perpendicular lever arm.

The SI unit is N·m. Although dimensionally the same as a joule, torque is not energy.

### Rotational inertia

Mass measures resistance to translational acceleration.

Moment of inertia \(I\) measures resistance to angular acceleration about a chosen axis.

For point masses:

$$
I=\sum_i m_ir_i^2.
$$

Mass farther from the axis matters much more because distance is squared.

This is why moving a skater's arms inward can strongly change rotational behavior without changing total mass.

### Newton's second law for rotation

For a rigid body about a fixed axis:

$$
\sum\tau = I\alpha,
$$

where:

- \(\tau\) = net torque
- \(I\) = rotational inertia
- \(\alpha\) = angular acceleration

This is the rotational partner of:

$$
\sum F=ma.
$$

### Angular kinematics

For constant angular acceleration:

$$
\omega = \omega_0+\alpha t
$$

$$
\theta=\theta_0+\omega_0t+\frac{1}{2}\alpha t^2.
$$

Linear and angular quantities connect through:

$$
v_t=r\omega
$$

$$
a_t=r\alpha.
$$

Points farther from the axis move faster for the same angular speed.

### Static equilibrium

An extended object is in static equilibrium only if both conditions hold:

$$
\sum\vec F=0
$$

and:

$$
\sum\vec\tau=0.
$$

Zero net force alone is not enough. Equal opposite forces applied at different locations can produce a pure turning tendency.

### Why axis choice matters

Torque and moment of inertia depend on the chosen axis.

The same door, wheel or rod can be easy or hard to rotate depending on the axis.

That is not a defect in the concept; rotation is inherently motion **about an axis**.

### Physics C bridge

For a continuous mass distribution:

$$
I=\int r^2\,dm.
$$

That integral is the origin of familiar tabulated results such as:

- hoop about center: \(I=MR^2\)
- solid disk about center: \(I=\frac12MR^2\)
- uniform rod about center: \(I=\frac1{12}ML^2\)

Those formulas should not feel like unrelated facts: each is the same mass-distribution integral applied to a different geometry.

> **Big idea:** Rotation depends not only on how much force or mass exists, but on how each is distributed relative to an axis.
