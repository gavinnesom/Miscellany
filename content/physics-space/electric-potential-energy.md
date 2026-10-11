---
title: "Electric Potential: Turning a Field into an Energy Landscape"
slug: "electric-potential-energy"
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
    - work-energy-power
    - dc-circuits-kirchhoff
sources:
  - label: "OpenStax University Physics Volume 2 — Potential and potential difference"
    url: "https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference"
  - label: "OpenStax University Physics Volume 2 — Calculating potential"
    url: "https://openstax.org/books/university-physics-volume-2/pages/7-3-calculations-of-electric-potential"
  - label: "OpenStax University Physics Volume 2 — Equipotentials"
    url: "https://openstax.org/books/university-physics-volume-2/pages/7-5-equipotential-surfaces-and-conductors"
books: []
quiz:
  - question_id: "electric-potential-energy:zero-potential"
    version: 1
    status: "active"
    question: "Equal opposite charges produce zero potential at their midpoint. Why can a charge there nevertheless accelerate?"
    answer: "Potential is a scalar sum and cancels, but the field is the negative spatial gradient of potential, not its value. At the midpoint both fields point from positive to negative and add. A nonzero field exerts qE."
    rubric: "Require zero potential does not imply zero gradient/field, and correct field addition."
  - question_id: "electric-potential-energy:electron-energy"
    version: 1
    status: "active"
    question: "An electron moves through a potential increase of 200 V with only electric work acting. What happens to its potential and kinetic energy?"
    answer: "Its potential energy decreases by 200 eV because q is negative; its kinetic energy increases by 200 eV."
    rubric: "Require both changes and negative charge reasoning; accept joules approximately 3.20e-17."
---

Voltage is not a stock of charge or a force. It is **potential-energy difference per unit charge**. This lets us translate the local force description into the [energy accounting](/entry/work-energy-power) already familiar from mechanics.

For a fixed electrostatic source configuration, work done by the field is \(W=q∫[A→B]\vec E\cdot d\vec l\). Conservative-force accounting gives \(\Delta U=-W\). Divide by the charge:

$$
V_B-V_A=-∫[A→B]\vec E\cdot d\vec l,\qquad \Delta U=q\Delta V.
$$

A volt is a joule per coulomb. The zero of potential can be chosen conveniently; potential differences have physical consequences. Using zero at infinity for an isolated point charge gives

$$
V(r)=(kQ)/(r).
$$

This follows by integrating the inverse-square field, not by confusing potential with field strength. Potentials of several point charges add as signed scalars: \(V=\sum_i kQ_i/r_i\). Field vectors still require directional addition.

## Slope, not height, determines force

In one dimension,

$$
E_x=-(dV)/(dx),\qquad F_x=-(dU)/(dx)=qE_x.
$$

Positive charges accelerate toward lower potential; negative charges accelerate toward higher potential. Both move toward lower **potential energy** when released from rest under the electric force. Their initial velocity can of course carry them uphill temporarily.

Between ideal large plates separated by \(5.0\ mm\) with a \(200\  V\) difference, the approximately uniform field has magnitude \(E=200/0.0050=4.0\times10^4\ V/m\). It points from the positive, higher-potential plate toward the negative plate. An electron traveling the other way gains \(200\ eV=3.20\times10^{-17}\  J\) of kinetic energy. Starting nearly at rest, its nonrelativistic speed is

$$
v=√((2\Delta K)/(m_e))\approx8.39\times10^6\ m/s.
$$

This is about 2.8% of light speed, so the nonrelativistic approximation is adequate here. The calculation assumes negligible collisions, radiation, and gravity and ignores edge fields.

## Zero potential need not mean zero field

Return to equal opposite charges symmetrically placed about an origin. At the midpoint their potentials cancel because distances are equal. Their fields add because “away from positive” and “toward negative” point the same way there. A charge at zero potential can therefore feel a force. Conversely, the interior of a charged conducting sphere has constant, generally nonzero potential and zero field.

An equipotential surface connects points of equal potential. Movement along it costs no electrostatic work, since \(\Delta V=0\). The field is perpendicular to it: any tangential component would make potential change along the surface. Closely spaced equal-voltage contours indicate a steep potential gradient and stronger field, much as close elevation contours indicate a steep hillside.

## The limit that matters for circuits

In static electrostatics, returning to the starting point gives \(∮\vec E\cdot d\vec l=0\); a unique potential difference does not depend on the route. This underlies the ordinary voltage bookkeeping in [DC circuits](/entry/dc-circuits-kirchhoff).

When magnetic flux changes, an induced electric field can have a nonzero circulation. Then a single electrostatic potential cannot describe the entire field, and a loop can have an induced emf. [Induction](/entry/electromagnetic-induction) does not violate energy conservation; it identifies a regime in which “just subtract the two scalar potentials” is incomplete.
