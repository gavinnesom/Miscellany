---
title: "DC Circuits: Kirchhoff’s Laws and Loaded Sources"
slug: "dc-circuits-kirchhoff"
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
    - current-resistance-power
    - capacitors-rc-circuits
    - electric-potential-energy
sources:
  - label: "OpenStax University Physics Volume 2 — Kirchhoff’s rules"
    url: "https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules"
  - label: "OpenStax University Physics Volume 2 — Resistors in series and parallel"
    url: "https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel"
  - label: "OpenStax University Physics Volume 2 — Electromotive force"
    url: "https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force"
books: []
quiz:
  - question_id: "dc-circuits-kirchhoff:loaded-source"
    version: 1
    status: "active"
    question: "A 12 V emf source has 1 ohm internal resistance and drives a 5 ohm load. Find current, terminal voltage, and the missing power."
    answer: "Current is 2 A; terminal voltage is 10 V; the source supplies 24 W, the load receives 20 W, and internal resistance dissipates 4 W."
    rubric: "Require current, terminal voltage, and explicit internal-loss energy balance."
  - question_id: "dc-circuits-kirchhoff:junction-loop"
    version: 1
    status: "active"
    question: "What physical principles underlie Kirchhoff’s junction and ordinary loop rules, and when does the simplest loop rule need modification?"
    answer: "The junction rule expresses charge conservation with negligible charge accumulation. The loop rule is energy/potential accounting in the lumped circuit approximation; changing linked magnetic flux adds induced emf and cannot simply be ignored."
    rubric: "Require charge versus energy distinction and changing-flux caveat."
image:
  url: "/images/physics-dc-network.svg"
  alt: "Schematic of a 12 V source, 1 ohm internal resistance, 2 ohm series resistor, and parallel 6 and 3 ohm branches, with calculated node voltages."
  credit: "Original schematic calculated from the physical model; references in Sources."
  provenance: "local"
---

A circuit drawing is a claim about connections, not a picture of physical wire positions. Two components are in parallel only if both ends connect to the same two nodes. They are in series only when the same current must pass through both, with no branching junction between them.

## Two conservation rules

The junction rule says

$$
\sum I_{in}=\sum I_{out}.
$$

It follows from charge conservation when appreciable charge is not accumulating at the node. In a transient, charge accumulation must be accounted for; capacitors explicitly model one important way this happens.

The ordinary loop rule says the signed voltage changes around a closed loop sum to zero. Choose a traversal direction. Crossing an ideal source from its negative to positive terminal contributes \(+ℰ\); moving through a resistor in its assumed current direction contributes \(-IR\). A negative solved current means the chosen direction was opposite reality, not that the method failed.

This is a lumped-circuit model: propagation delays, radiated energy, and unmodeled changing magnetic flux are negligible. If a magnetic flux threads the loop and changes, include the [induced emf](/entry/electromagnetic-induction). Conservation still holds; the simplified inventory was incomplete.

## Series and parallel results are consequences

For resistors in series, the voltage drops add while current is common: V=I(R₁+R₂). Hence \(R_{eq}=R_1+R_2\).

For parallel resistors the voltage is common and currents add:

$$
I=V/R_1+V/R_2,\qquad 1/R_{eq}=1/R_1+1/R_2.
$$

Adding another positive-resistance parallel path lowers equivalent resistance. It need not leave every other current unchanged if the source has internal resistance.

## Worked network: the source is part of the circuit

Take a \(12\  V\) emf source with \(1\ \Omega\) internal resistance. Outside it, put \(2\ \Omega\) in series with parallel branches of \(6\ \Omega\) and \(3\ \Omega\). Their equivalent is \(2\ \Omega\), so the full resistance seen by the emf is \(1+2+2=5\ \Omega\).

The source current is \(2.4\  A\). Its terminal voltage is only 12-(2.4)(1)=9.6  V. The outer series resistor drops \(4.8\  V\), leaving \(4.8\  V\) across both branches. Their currents are \(0.8\  A\) and \(1.6\  A\), which sum to \(2.4\  A\).

Check energy independently:

- Source power: 12(2.4)=28.8  W.
- Internal loss: (2.4)²(1)=5.76  W.
- Outer series resistor: (2.4)²(2)=11.52  W.
- Branch losses: (0.8)²(6)=3.84  W and (1.6)²(3)=7.68  W.

The losses total \(28.8\  W\). This check catches sign and topology errors that plausible-looking currents may hide.

Now disconnect the \(3\ \Omega\) branch. Current becomes 12/(1+2+6)=1.33  A, and the remaining \(6\ \Omega\) resistor has \(8.0\  V\) across it. Its current has **increased** from \(0.8\) to \(1.33\  A\), although total source current fell. Removing the competing branch reduced voltage loss upstream.

## Networks that do not collapse into series and parallel

Use a reference node and assign unknown node voltages. At each other node, express every outgoing resistor current as (Vnode-Vneᵢghbor)/R, and set their sum to zero, including source currents as appropriate. Alternatively assign independent loop currents and write signed voltage equations. Solve the simultaneous linear equations, then check junctions and total power.

An ideal voltmeter draws no current and reads across two nodes; an ideal ammeter has zero resistance and goes in series. Real instruments perturb the circuit. Putting a low-resistance current meter directly across a source is effectively creating a short, not measuring its ordinary operating current.
