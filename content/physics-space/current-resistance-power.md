---
title: "Current, Resistance, and Power: Where Electrical Energy Goes"
slug: "current-resistance-power"
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
    - "electric-potential-energy"
    - "dc-circuits-kirchhoff"
    - "vehicle-starting-charging"
sources:
  - label: "OpenStax University Physics Volume 2 — Electrical current"
    url: "https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current"
  - label: "OpenStax University Physics Volume 2 — Resistivity and resistance"
    url: "https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance"
  - label: "OpenStax University Physics Volume 2 — Electrical energy and power"
    url: "https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power"
books: []
quiz:
  - question_id: "current-resistance-power:fixed-voltage-power"
    version: 1
    status: "active"
    question: "For an ideal fixed-voltage supply, does doubling a load resistance increase or decrease its power? Why can P=I squared R mislead here?"
    answer: "Power halves because I=V/R halves and P=V squared/R. P=I squared R would imply increasing power only if current stayed fixed, which it does not in this setup."
    rubric: "Require halving power and identification of which variable is fixed."
  - question_id: "current-resistance-power:wire-loss"
    version: 1
    status: "active"
    question: "A lead has resistance 0.020 ohm and carries 100 A. Find its voltage drop and heating power, and explain why such a small resistance matters."
    answer: "The drop is 2 V and heating is 200 W. High current magnifies loss quadratically, so a small series resistance is consequential in a low-voltage high-current circuit."
    rubric: "Require both numerical values with units and I squared sensitivity."
---

Closing a circuit does not send a fresh batch of electrons from a battery to a distant lamp at light speed. Mobile charges are already present in the wires. Changes in electromagnetic fields propagate through the circuit, establishing a drift motion whose speed is usually much smaller than the signal speed.

## Current is charge flow, not energy flow

Current is the rate at which net charge crosses a chosen section:

$$
I=(dQ)/(dt).
$$

One ampere is one coulomb per second. Conventional current follows positive-charge motion; in metals electrons drift the opposite way. With carrier number density \(n\), charge magnitude \(|q|\), cross-sectional area \(A\), and average drift-speed magnitude \(v_d\), counting carriers in the swept volume \(Av_d\,dt\) gives \(I=n|q|Av_d\).

Charge is not consumed by a resistor. In steady state the same current enters and leaves it. Energy is transferred to the material, largely through interactions of carriers with the lattice. A battery supplies energy by chemical processes; it does not create the circuit's charge.

## Ohm's law is a material model

For an ohmic component under roughly fixed physical conditions,

$$
V=IR,\qquad R=\rho(L)/(A).
$$

Here \(V\) means the voltage drop across the component, \(R\) resistance, and \(\rho\) resistivity. Doubling wire length doubles resistance; doubling area halves it. A microscopic linear-response description is \(\vec J=σ\vec E\), with conductivity \(σ=1/\rho\). Combining \(J=I/A\) and \(E\approx V/L\) yields the macroscopic equation.

Ohm's law is not a universal law of all circuit elements. Diodes are nonlinear; a filament's resistance changes strongly as it heats. Even a metal resistor only approximately maintains constant resistance as temperature varies. Nor is a working resistive conductor an electrostatic-equilibrium conductor: a sustained internal electric field is needed to drive its current.

## Derive power from energy per charge

A charge increment \(dQ\) falling through voltage \(V\) transfers energy \(dE=V\,dQ\). Dividing by time gives

$$
P=VI=I^2R=(V^2)/(R).
$$

The last two forms apply to an ohmic resistor. Under the passive sign convention, current entering a component's higher-potential terminal corresponds to positive absorbed power. A source delivering energy has negative absorbed power.

A smaller resistance dissipates **more** power if its voltage is held fixed, but **less** if its current is held fixed. There is no contradiction: the external constraint differs. Never infer a trend from one symbol while silently changing another.

## A small resistance can be a large problem

Consider a hypothetical low-voltage starter circuit carrying \(100\  A\) through a total lead/contact resistance of \(0.020\ \Omega\). The drop is \(IR=2.0\  V\), while heating is \(I^2R=200\  W\). In five seconds the leads dissipate \(1000\  J\). This is not a specification for a particular vehicle; it illustrates why high-current connections matter even when their resistance looks tiny.

If that resistance doubled, one cannot automatically say actual heating would double: the circuit current would generally change too. A starter is a motor with speed-dependent back emf, not a fixed resistor. The simple example prescribes current to isolate the loss mechanism; [starting and charging](/entry/vehicle-starting-charging) places it in a working system.

**Takeaway:** Current measures charge per time, voltage energy per charge, and their product energy per time. These quantities describe different parts of one conservation story.
