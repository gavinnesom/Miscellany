---
title: "Electromagnetic Induction: Flux Change, Lenz’s Law, and Energy"
slug: "electromagnetic-induction"
category: "physics-space"
topic: "electricity-magnetism"
tags:
  - "physics"
  - "electromagnetism"
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - "magnetic-fields-forces"
    - "electric-potential-energy"
    - "vehicle-starting-charging"
sources:
  - label: "OpenStax University Physics Volume 2 — Faraday’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
  - label: "OpenStax University Physics Volume 2 — Lenz’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law"
  - label: "OpenStax University Physics Volume 2 — Motional emf"
    url: "https://openstax.org/books/university-physics-volume-2/pages/13-3-motional-emf"
  - label: "OpenStax University Physics Volume 2 — Induced electric fields"
    url: "https://openstax.org/books/university-physics-volume-2/pages/13-4-induced-electric-fields"
books: []
quiz:
  - question_id: "electromagnetic-induction:lenz-decrease"
    version: 1
    status: "active"
    question: "A field directed into the page through a conducting loop is decreasing. Which way does induced current circulate, viewed on the page, and why?"
    answer: "Clockwise, creating an into-page field that opposes the decrease of into-page flux. It opposes the change, not the existing field itself."
    rubric: "Require clockwise and correct opposition-to-decrease explanation."
  - question_id: "electromagnetic-induction:sliding-rod"
    version: 1
    status: "active"
    question: "A rod of length 0.20 m moves at 3.0 m/s across a 0.50 T perpendicular field in a closed 2.0 ohm circuit. What emf, current, and mechanical power are needed at constant speed?"
    answer: "Emf is 0.30 V, current 0.15 A, magnetic drag 0.015 N, and required power 0.045 W, equal to I squared R."
    rubric: "Require emf/current/power with units and energy consistency; drag may be implicit."
image:
  url: "/images/physics-sliding-rod.svg"
  alt: "Schematic sliding rod moving right through an into-page magnetic field; induced current runs counterclockwise and magnetic drag points left."
  credit: "Original schematic calculated from the physical model; references in Sources."
  provenance: "local"
---

A stationary magnet near a stationary wire does not continually generate current. What matters is a change in magnetic flux through a circuit, or motion that produces the equivalent electromechanical effect.

Magnetic flux through an oriented surface is

$$
Φ_B=\int\vec B\cdot d\vec A.
$$

For a uniform field through a flat area, \(Φ_B=BA\cos\theta\), where the angle is to the area normal. Field magnitude, loop area, or orientation can change flux. For \(N\) identical turns linking the same flux,

$$
ℰ=-N(dΦ_B)/(dt).
$$

Emf is energy supplied per unit charge around the circuit, measured in volts, despite the historical name “electromotive force.” Induced emf can exist with an open circuit; appreciable circulating current also requires a conducting path, with resistance and inductance determining its response.

## The minus sign is physical

Choose an area normal; the positive loop direction follows the curled fingers of the right hand when the thumb points along that normal. Faraday's minus sign then encodes Lenz's law: the induced response opposes the **change** in linked flux.

If into-page flux is increasing, the induced current creates an out-of-page field: counterclockwise as viewed on the page. If into-page flux is decreasing, the induced current is clockwise, reinforcing the into-page field. “The induced field opposes the applied field” gives the wrong answer in the second case.

An external agent must generally do work to sustain a motion that drives a loaded generator. If the induced current helped the flux-changing motion while delivering energy to a resistor, the system would gain energy without a source. Lenz's sign is the local expression of the opposing mechanical response.

## A moving rod makes the energy balance visible

Imagine a conducting rod sliding right along two horizontal conducting rails, closing a rectangular loop through a resistor at the left. A uniform field points into the page. The rail separation is \(\ell\); the rod speed is \(v\). Loop area increases at rate \(\ell v\), giving emf magnitude \(B\ell v\).

Microscopically, \(q\vec v\times\vec B\) separates charges along the moving rod. In the closed circuit, current runs upward through the rod and counterclockwise around the loop, producing an opposing out-of-page field. The current-carrying rod feels a leftward magnetic force.

Use \(B=0.50\  T\), \(\ell=0.20\  m\), \(v=3.0\ m/s\), and total resistance \(R=2.0\ \Omega\), neglecting circuit inductance and friction:

$$
ℰ=B\ell v=0.30\  V,  I=ℰ/R=0.15\  A.
$$

The drag magnitude is \(I\ell B=0.015\  N\). To keep speed constant, an external pull supplies

$$
P_{mechanical}=Fv=0.045\  W=I^2R.
$$

The resistor's energy came from the pull. With an open circuit, charge separation can still produce a voltage, but negligible sustained current means negligible corresponding magnetic drag in this ideal model.

## Induction does not always require a moving conductor

In a stationary loop with changing magnetic field, charges have no initial bulk motion to explain the emf by the rod argument. Instead, the changing field creates a circulating electric field:

$$
∮\vec E\cdot d\vec l=-(dΦ_B)/(dt).
$$

Its circulation need not vanish, unlike an electrostatic field. It exists even without a wire; a wire merely constrains a possible current path. Transformers exploit changing flux linking stationary coils. For an ideal transformer sharing all flux, the voltage ratio equals the turns ratio; real devices have resistance, leakage flux, and core losses.

A generator rotates a loop or magnetic structure so flux changes; a motor experiences torque from supplied current and develops a back emf as it turns. [Vehicle starting and charging](/entry/vehicle-starting-charging) connects these reciprocal effects. Maxwell's completed field laws connect changing electric and magnetic fields and permit electromagnetic waves. This sequence stops short of solving those wave equations, but the unifying idea is already visible: fields are dynamic participants in energy transfer, not merely labels attached to charges.
