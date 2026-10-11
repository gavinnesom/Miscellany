---
title: "The First Law: Why the Path Matters"
slug: "first-law-thermodynamic-processes"
category: "physics-space"
topic: "thermal-physics"
tags:
  - "physics"
  - "thermodynamics"
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - "temperature-heat-ideal-gases"
    - "entropy-heat-engines"
    - "four-stroke-engine"
sources:
  - label: "OpenStax University Physics Volume 2 — Thermodynamic systems"
    url: "https://openstax.org/books/university-physics-volume-2/pages/3-1-thermodynamic-systems"
  - label: "OpenStax University Physics Volume 2 — First law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics"
  - label: "OpenStax University Physics Volume 2 — Thermodynamic processes"
    url: "https://openstax.org/books/university-physics-volume-2/pages/3-4-thermodynamic-processes"
  - label: "OpenStax University Physics Volume 2 — Adiabatic processes"
    url: "https://openstax.org/books/university-physics-volume-2/pages/3-6-adiabatic-processes-for-an-ideal-gas"
books: []
quiz:
  - question_id: "first-law-thermodynamic-processes:two-paths"
    version: 1
    status: "active"
    question: "One mole of monatomic ideal gas warms from 300 K to 600 K. Compare the heat required at constant volume and constant pressure. Why do they differ?"
    answer: "Delta U is 3R(300)/2, approximately 3.74 kJ, in both cases. At constant volume W=0 and Q=3.74 kJ. At constant pressure W=R(300)=2.49 kJ and Q=6.24 kJ. Extra heat supplies expansion work."
    rubric: "Require same internal-energy change, zero versus positive work, and correct approximate heat values."
  - question_id: "first-law-thermodynamic-processes:adiabatic-free-expansion"
    version: 1
    status: "active"
    question: "An ideal gas freely expands into an evacuated part of an insulated rigid container. Must its temperature fall because it expanded?"
    answer: "No. Q=0 and external pressure is zero, so W=0 and Delta U=0. For an ideal gas U depends only on T, so final equilibrium temperature is unchanged. Reversible adiabatic expansion formulas do not apply."
    rubric: "Require zero heat and work, unchanged ideal-gas temperature, and distinguish irreversible free expansion."
image:
  url: "/images/physics-pv-paths.svg"
  alt: "Pressure-volume plot comparing isothermal and reversible adiabatic expansion from the same initial state; the steeper adiabatic curve reflects falling temperature."
  credit: "Original schematic calculated from the physical model; references in Sources."
  provenance: "local"
---

Energy conservation becomes thermodynamics when we specify a system boundary and distinguish energy transfer as heat from energy transfer as work. For a closed system with negligible changes in bulk kinetic and gravitational potential energy, use

$$
\Delta U=Q-W.
$$

Here \(Q>0\) means heat enters the system and \(W>0\) means the system does work on its surroundings. Some texts define work **on** the system as positive; their equation looks different but expresses the same accounting. State the convention before calculating.

Internal energy \(U\) is a state function. Heat and work are not: there is no “amount of heat in this state.” Their values depend on how the state was reached.

## Pressure-volume work comes from force and displacement

A gas pushes a piston of area \(A\) through displacement \(dx\) against external pressure \(P_{ext}\). The work is \(dW=Fdx=P_{ext}A\,dx=P_{ext}dV\), so

$$
W=\int P_{ext}\,dV.
$$

For a mechanically quasistatic process with negligible friction, the gas and external pressures differ only infinitesimally; then we can use the gas's equilibrium \(P(V)\) curve. The area under that curve is work. Expansion gives positive work; compression negative. Do not apply an equilibrium gas-pressure curve to a violent irreversible expansion that lacks well-defined intermediate states.

## Same temperature change, different heat

Warm one mole of monatomic ideal gas from 300 to 600 K. Its internal-energy change is

$$
\Delta U=3/2nR\Delta T=3.74\ kJ.
$$

At constant volume, \(W=0\) and all \(3.74\ kJ\) of heat increases internal energy. At constant pressure, \(P\Delta V=nR\Delta T=2.49\ kJ\), so heat input must be \(6.24\ kJ\). The constant-pressure sample expands and pushes the surroundings as well as warming. This derives \(C_P=C_V+R\) for an ideal gas, with molar heat capacities and only pressure-volume work.

These two heating processes finish at different volumes, but equal \(\Delta U\) because ideal-gas internal energy depends on temperature alone. To compare genuinely identical endpoints, consider expansion from \((V_1,T)\) to \((2V_1,T)\) in two ways.

## Isothermal expansion versus free expansion

A reversible isothermal ideal-gas expansion does work

$$
W=∫[V₁→V₂](nRT)/(V)\,dV=nRT\ln(V_2/V_1).
$$

At fixed temperature \(\Delta U=0\), so \(Q=W\). For one mole at 300 K doubling its volume, each is \(1.73\ kJ\). Energy enters as heat while an equal amount leaves as work, even though temperature does not rise.

Now let the same gas freely expand into a vacuum within an insulated rigid container, doubling its accessible volume. External pressure at the advancing gas boundary is zero, so \(W=0\); insulation gives \(Q=0\). Its final temperature is unchanged for an ideal gas. Same endpoints, entirely different heat and work. “Expansion cools a gas” is not a universal rule.

## Adiabatic does not mean isothermal

Adiabatic means \(Q=0\). A gas that expands while doing positive work must then lose internal energy. For a reversible adiabatic ideal-gas process with constant heat capacities,

$$
nC_VdT=-P\,dV=-(nRT)/(V)dV.
$$

Integrating gives \(T V^(γ-1)=constant\), or \(P V^(γ)=constant\), where \(\gamma=C_P/C_V\). The restrictions matter: free expansion is adiabatic but irreversible and does **not** satisfy this relation.

## Cycles turn enclosed area into output

On a complete cycle, the working substance returns to its original state, so \(\Delta U_{cycle}=0\) and net heat input equals net work output. A clockwise quasistatic loop on a pressure-volume graph has positive net work: expansion occurs at higher average pressure than compression. A [four-stroke engine](/entry/four-stroke-engine) makes the connection to a machine, although a real open gas-exchange cycle is not literally a sealed ideal gas following a textbook loop.

The first law permits any conversion consistent with energy conservation. It cannot tell us why a cyclic engine cannot turn all heat drawn from one reservoir into work. That additional constraint is the [second law](/entry/entropy-heat-engines).
