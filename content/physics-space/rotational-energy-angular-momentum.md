---
title: "Rotational Energy and Angular Momentum"
slug: "rotational-energy-angular-momentum"
category: "physics-space"
topic: "classical-mechanics"
tags:
  - physics
  - mechanics
  - angular-momentum
  - rotation
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related:
    - four-stroke-engine
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
  url: "/images/angular-momentum-rolling.svg"
  alt: "A rotating skater changes moment of inertia while angular momentum stays constant, with a rolling hoop and disk inset."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "rotational-energy-angular-momentum:skater-spin-faster-while-angular-momentum-conserved"
    version: 1
    question: "Why can a skater spin faster while angular momentum is conserved?"
    answer: "Pulling arms inward decreases moment of inertia, so angular speed increases to keep Iω constant when external torque is small."
    rubric: Correct if the answer conveys the canonical idea that Pulling arms inward decreases moment of inertia, so angular speed increases to keep Iω constant when external torque is small.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Rotation has close analogues of the energy and momentum ideas used for translation.

For a rigid body rotating about a fixed axis:

$$
K_{\text{rot}}=\frac12I\omega^2.
$$

Compare with translational kinetic energy:

$$
K_{\text{trans}}=\frac12mv^2.
$$

The correspondence is:

```text
mass m                 ↔ rotational inertia I
linear speed v         ↔ angular speed ω
force F                ↔ torque τ
linear momentum p      ↔ angular momentum L
```

The analogy is useful, but it is not perfect; rotational quantities depend on an axis or origin.

### Angular momentum

For a rigid body about a fixed principal axis:

$$
L=I\omega.
$$

More generally for a particle:

$$
\vec L=\vec r\times\vec p.
$$

External torque changes angular momentum:

$$
\vec\tau_{\text{ext}}=\frac{d\vec L}{dt}.
$$

Therefore:

$$
\Delta\vec L=\int\vec\tau_{\text{ext}}\,dt.
$$

If net external torque is negligible:

$$
\vec L=\text{constant}.
$$

### The spinning-skater effect

Suppose a skater pulls their arms inward.

Their mass does not change, but \(I\) decreases because more mass lies closer to the rotation axis.

If external torque is small:

$$
I_i\omega_i=I_f\omega_f.
$$

So decreasing \(I\) increases \(\omega\).

This does **not** mean rotational kinetic energy must remain constant.

The skater does internal work while pulling the arms inward, so \(K_{\text{rot}}\) can increase even while angular momentum stays constant.

That distinction is important: conservation of angular momentum and conservation of mechanical energy are different statements with different conditions.

### Rolling without slipping

For a rolling wheel:

$$
v_{\text{CM}}=R\omega.
$$

Its kinetic energy contains both translation and rotation:

$$
K=\frac12Mv_{\text{CM}}^2+\frac12I_{\text{CM}}\omega^2.
$$

Two objects with the same mass and radius can roll down a ramp differently if their mass distributions — and therefore their moments of inertia — differ.

A hoop has more rotational inertia than a solid disk of the same mass and radius, so more of its gravitational potential-energy loss goes into rotation and less into center-of-mass speed.

### Rotational work and power

For fixed-axis rotation:

$$
W=\int\tau\,d\theta.
$$

Instantaneous rotational power:

$$
P=\tau\omega.
$$

This equation is extremely practical in engines and motors: power depends on both torque and rotational speed.

> **Main message:** Angular momentum is the rotational conservation law associated with external torque, while rotational kinetic energy tracks the energetic cost of spinning mass around an axis.

## Useful connection

This entry can have a curated sideways relationship to the engine/drivetrain material because \(P=\tau\omega\) is the clean bridge between mechanics and engine torque/power.
