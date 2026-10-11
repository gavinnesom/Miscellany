---
title: "Magnetic Fields and Forces: Bending Motion Without Doing Work"
slug: "magnetic-fields-forces"
category: "physics-space"
topic: "electricity-magnetism"
tags:
  - physics
  - electromagnetism
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - electric-fields-superposition
    - electromagnetic-induction
    - torque-rotational-dynamics
sources:
  - label: "OpenStax University Physics Volume 2 — Magnetic fields"
    url: "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
  - label: "OpenStax University Physics Volume 2 — Charged-particle motion"
    url: "https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field"
  - label: "OpenStax University Physics Volume 2 — Force on a conductor"
    url: "https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor"
  - label: "OpenStax University Physics Volume 2 — Ampère’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/12-5-amperes-law"
  - label: "OpenStax University Physics Volume 2 — Biot–Savart law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law"
  - label: "OpenStax University Physics Volume 2 — Field of a current loop"
    url: "https://openstax.org/books/university-physics-volume-2/pages/12-4-magnetic-field-of-a-current-loop"
books: []
quiz:
  - question_id: "magnetic-fields-forces:magnetic-work"
    version: 1
    status: "active"
    question: "Why can a uniform magnetic field turn a charged particle without increasing its speed?"
    answer: "The magnetic force q v cross B is perpendicular to velocity, so its instantaneous power F dot v is zero. It changes direction rather than kinetic energy, assuming no other forces."
    rubric: "Require perpendicular force and zero power; specify magnetic force alone."
  - question_id: "magnetic-fields-forces:wire-field"
    version: 1
    status: "active"
    question: "For a long straight wire carrying a steady current, why does magnetic-field strength fall as 1/r?"
    answer: "Cylindrical symmetry makes B tangent and constant on a circular path. Ampère’s law gives B times 2 pi r = mu0 I, so B is inversely proportional to r."
    rubric: "Require symmetry/circular circulation reasoning, not electric inverse-square analogy."
---

Electric fields can push a stationary charge. Magnetic force on a point charge depends on its motion. The combined classical Lorentz force is

$$
\vec F=q(\vec E+\vec v\times\vec B).
$$

The magnetic term has magnitude \(|q|vB\sin\theta\). Use the right-hand rule for \(\vec v\times\vec B\), then reverse the direction for negative charge. Magnetic field is measured in teslas, with 1  T=1 N/(A m).

## Circular motion is a consequence, not a separate magnetic law

For velocity perpendicular to a uniform field and no other forces, the magnetic force supplies the centripetal acceleration:

$$
|q|vB=(mv^2)/(r),\qquad r=(mv)/(|q|B).
$$

The force is always perpendicular to instantaneous velocity. Consequently \(P=\vec F\cdot\vec v=0\): magnetic force alone changes direction, not kinetic energy. A velocity component parallel to the field remains unchanged, producing a helix rather than a circle.

For a proton moving at \(1.0\times10^6\ m/s\) perpendicular to \(0.20\  T\), using \(m_p=1.67\times10^{-27}\ kg\) and \(e=1.60\times10^{-19}\  C\), the radius is \(0.0522\  m\), about 5.2 cm. Doubling speed doubles radius, whereas doubling field halves it. The period 2π r/v=2π m/(|q|B) is independent of speed in this nonrelativistic idealization.

## A wire contains many moving charges

Summing magnetic forces over charge carriers in a straight wire segment gives

$$
\vec F=I\vec L\times\vec B.
$$

The vector \(\vec L\) points along conventional current. A \(0.10\  m\) segment carrying \(5.0\  A\) perpendicular to \(0.20\  T\) feels \(0.10\  N\). Opposite sides of a current loop can experience equal and opposite forces, giving zero net force but a torque. This is the basic motor geometry; a loop's magnetic moment is \(μ⃗=IAn̂\), and its torque is \(τ⃗=μ⃗\times\vec B\).

How can a motor do mechanical work if magnetic force does no work on a point charge? The motor is not an isolated charge in a static magnetic field. Its source drives current through electric fields, and forces on carriers are transmitted to the moving conductor. Track the entire electromechanical system: electrical input supplies mechanical output and losses. The point-charge perpendicular-force result has not failed.

## Currents produce magnetic fields

For steady currents in vacuum, Ampère's law is

$$
∮\vec B\cdot d\vec l=\mu_0 I_{enclosed}.
$$

Around an effectively infinite straight wire, symmetry makes the field tangent to circles and equal in magnitude at fixed radius. Thus

$$
B(2\pi r)=\mu_0 I,\qquad B=(\mu_0 I)/(2\pi r).
$$

With \(I=10\  A\) and \(r=1.0\ cm\), this gives \(2.0\times10^{-4}\  T\), or \(0.20\ mT\). Curl the right-hand fingers around the wire with the thumb along current to determine direction. Nearby return wires alter the resulting field by superposition.

When symmetry does not make Ampère's law easy to evaluate, the steady-current Biot–Savart law adds the contributions from individual wire elements:

$$
d\vec B=(\mu_0)/(4\pi)(I\,dℓ⃗\times r̂)/(r^2).
$$

Here \(r̂\) points from the source element to the observation point. At the center of a circular loop of radius \(a\), every element is perpendicular to \(r̂\), every distance is \(a\), and every contribution points along the loop axis. Integrating \(d\ell\) around circumference \(2\pi a\) gives B=μ₀I/(2a). This is a useful contrast: the wire's shape enters a common law through geometry, rather than each shape requiring a new physical principle.

A long, tightly wound solenoid approximately adds many loop fields into a nearly uniform interior field \(B\approx\mu_0nI\), where \(n\) is turns per unit length; end effects are neglected. Magnetic materials can strongly modify this relation, often nonlinearly. Permanent magnets also involve microscopic magnetic moments, not literally a hidden macroscopic coil.

Magnetic field lines have no starts or ends at magnetic charges; they may form closed loops or extend without bound. No isolated magnetic monopoles have been established. In changing-field problems Ampère's law needs Maxwell's additional electric-flux term. The steady-current expression is a deliberately limited model, just as electrostatic potential is limited when [induction](/entry/electromagnetic-induction) becomes important.
