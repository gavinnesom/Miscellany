---
title: "Entropy and Heat Engines: Why Conserved Energy Is Not All Usable"
slug: "entropy-heat-engines"
category: "physics-space"
topic: "thermal-physics"
tags:
  - physics
  - thermodynamics
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - entropy
    - first-law-thermodynamic-processes
    - four-stroke-engine
sources:
  - label: "OpenStax University Physics Volume 2 — Heat engines"
    url: "https://openstax.org/books/university-physics-volume-2/pages/4-2-heat-engines"
  - label: "OpenStax University Physics Volume 2 — Carnot cycle"
    url: "https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle"
  - label: "OpenStax University Physics Volume 2 — Entropy"
    url: "https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy"
  - label: "OpenStax University Physics Volume 2 — Microscopic entropy"
    url: "https://openstax.org/books/university-physics-volume-2/pages/4-7-entropy-on-a-microscopic-scale"
books: []
quiz:
  - question_id: "entropy-heat-engines:carnot-test"
    version: 1
    status: "active"
    question: "An engine absorbs 1000 J at 600 K and rejects 400 J at 300 K each cycle. It conserves energy. Is it possible?"
    answer: "No. Reservoir entropy change is -1000/600 + 400/300 = -0.333 J/K, violating the second law for this two-reservoir cyclic engine. Its 60% efficiency exceeds the 50% Carnot limit."
    rubric: "Require second-law rejection with entropy or Carnot calculation; mere energy conservation is insufficient."
  - question_id: "entropy-heat-engines:free-expansion-entropy"
    version: 1
    status: "active"
    question: "An insulated ideal gas freely doubles its volume with no work. If Q=0, why is its entropy change not zero?"
    answer: "Entropy change must be calculated using a reversible path between the same equilibrium states, not actual Q/T for an irreversible path. The change is nR ln 2, positive; entropy is generated internally."
    rubric: "Require reversible-reference-path distinction and positive nR ln 2; avoid claiming heat entered."
---

The [statistical entropy entry](/entry/entropy) explains why macrostates with many compatible microstates are overwhelmingly favored. Here the aim is operational: calculate entropy changes and use them to decide whether an energy-conserving machine is possible.

## Entropy is a state function; heat is a transfer

For an infinitesimal **reversible** heat transfer at absolute temperature \(T\),

$$
dS=(\delta Q_{rev})/(T).
$$

To find the entropy difference between equilibrium states, integrate along a reversible path connecting them, even if the actual process was irreversible. One must not replace this with “actual heat divided by temperature” for every process.

For a closed system, entropy can enter with heat and can be produced internally by irreversibility. For an isolated system, the second law says \(\Delta S\ge0\). A subsystem can lose entropy if enough is exported to its surroundings. This is why a refrigerator can cool its contents without violating the law.

## A simple heat transfer exposes the inequality

Transfer \(100\  J\) from a very large 400 K reservoir to a very large 300 K reservoir. Their temperatures remain essentially fixed. The hot reservoir loses \(100/400=0.250\ J/K\); the cold one gains \(100/300=0.333\ J/K\). Total entropy rises by \(0.0833\ J/K\).

The reverse transfer without some other change would decrease total entropy. Energy conservation alone would allow it; the second law excludes it. Transfer across a finite temperature difference is irreversible. “Reversible” is a limiting process that can be undone without a net change in system and surroundings, not merely something that runs backward mechanically.

For the insulated ideal-gas free expansion discussed in the [first-law entry](/entry/first-law-thermodynamic-processes), actual \(Q=W=0\), but entropy rises. Calculate it using a hypothetical reversible isothermal path between the same states:

$$
\Delta S=\int(\delta Q_{rev})/(T)=nR\ln(V_2/V_1).
$$

For one mole doubling its volume this is \(5.76\ J/K\). No heat secretly entered during free expansion; the reversible path is a calculation device for a state difference.

## Derive the heat-engine ceiling

A cyclic engine absorbs heat magnitude \(Q_H\) from a hot reservoir at \(T_H\), rejects \(Q_C\) to a cold reservoir at \(T_C\), and delivers \(W=Q_H-Q_C\). Define efficiency

$$
η=W/Q_H=1-(Q_C)/(Q_H).
$$

After one cycle the engine itself has no net entropy change. The two reservoirs have

$$
\Delta S_{total}=-(Q_H)/(T_H)+(Q_C)/(T_C)\ge0.
$$

Therefore

$$
(Q_C)/(Q_H)\ge(T_C)/(T_H),\qquad η\le1-(T_C)/(T_H).
$$

The equality is the Carnot limit, attained only by a reversible engine between those reservoirs. A Carnot cycle uses two reversible isothermal legs to exchange heat and two reversible adiabatic legs to change temperature without exchanging heat. The result is independent of a particular working gas or machine design.

An engine between 600 and 300 K cannot exceed 50% efficiency. If it absorbs \(1000\  J\) per cycle and produces \(300\  J\) of work, it rejects \(700\  J\); reservoir entropy rises by \(-1000/600+700/300=0.667\ J/K\). Its 30% efficiency is thermodynamically allowed, although that alone does not prove a proposed mechanism works.

## What the ceiling does and does not say

Rejected heat is not necessarily evidence of sloppy engineering. Some rejection is required for any ordinary two-reservoir cyclic heat engine. Friction, finite temperature gradients, mixing, and other irreversible processes further reduce useful output.

A car's combustion gas changes temperature continuously, exchanges matter, and loses energy through exhaust, cooling, and friction. It is misleading to insert one peak flame temperature and ambient temperature into Carnot's equation and call the result its actual efficiency. The equation provides a bounding idealization, not an engine-performance specification.

A refrigerator uses work to move heat from cold to hot. Its coefficient of performance is \(COP=Q_C/W\), which can exceed one because it moves thermal energy rather than converting work into an equal amount of cooling energy. The reversible bound is T(cold)/(T(hot) − T(cold)). Here T(cold) and T(hot) are the absolute temperatures of the two reservoirs. This is not efficiency above 100%.

**Takeaway:** The first law tracks how much energy exists; the second law constrains which transfers can occur and how much work a thermal gradient can yield. Energy is conserved while its capacity to produce useful work can diminish.
