---
title: "Capacitors and RC Circuits: Energy Storage Takes Time"
slug: "capacitors-rc-circuits"
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
    - "electric-flux-gauss-law"
    - "electric-potential-energy"
    - "dc-circuits-kirchhoff"
sources:
  - label: "OpenStax University Physics Volume 2 — Capacitance"
    url: "https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance"
  - label: "OpenStax University Physics Volume 2 — Stored energy"
    url: "https://openstax.org/books/university-physics-volume-2/pages/8-3-energy-stored-in-a-capacitor"
  - label: "OpenStax University Physics Volume 2 — RC circuits"
    url: "https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits"
  - label: "OpenStax University Physics Volume 2 — Capacitors in series and parallel"
    url: "https://openstax.org/books/university-physics-volume-2/pages/8-2-capacitors-in-series-and-in-parallel"
books: []
quiz:
  - question_id: "capacitors-rc-circuits:energy-half"
    version: 1
    status: "active"
    question: "Charging an initially empty ideal capacitor from a fixed ideal voltage source through a resistor stores only half the source’s supplied energy. Where does the rest go, and would a smaller nonzero resistor eliminate it?"
    answer: "Half is dissipated in the resistor. Reducing resistance raises current and shortens the transient, leaving integrated resistor loss unchanged in this ideal RC model. The zero-resistance limit requires omitted circuit physics."
    rubric: "Require resistor dissipation and unchanged integrated loss for nonzero R; do not claim energy disappears."
  - question_id: "capacitors-rc-circuits:discharge"
    version: 1
    status: "active"
    question: "After two RC time constants of discharge, what fractions of initial capacitor voltage and energy remain?"
    answer: "Voltage is exp(-2), about 13.5%; energy is proportional to voltage squared, so exp(-4), about 1.83%, remains."
    rubric: "Require distinction between amplitude and energy decay."
image:
  url: "/images/physics-rc-response.svg"
  alt: "Calculated normalized charging voltage and current versus time in units of RC; at one time constant voltage is 0.632 and current is 0.368 of its initial value."
  credit: "Original schematic calculated from the physical model; references in Sources."
  provenance: "local"
---

A capacitor stores energy by separating opposite charges, creating an electric field between conductors. In the ideal two-terminal model the plates hold \(+Q\) and \(-Q\); the device can remain neutral overall while storing energy.

## Geometry becomes capacitance

For linear materials and fixed geometry, \(Q=CV\), where \(V\) is the potential difference between plates. Capacitance \(C\) is measured in farads, or coulombs per volt. It is not a universal maximum charge rating; breakdown and construction impose separate limits.

Large parallel plates of area \(A\), gap \(d\), and vacuum between them have approximately \(E=Q/(ε_0A)\). Ignoring edge fields, \(V=Ed\), so

$$
C=(ε_0A)/(d).
$$

A linear dielectric completely filling the gap replaces \(ε_0\) by its permittivity \(ε\). This approximation excludes leakage, dielectric nonlinearity, and breakdown. Increasing plate area gives more charge at the same voltage; reducing separation reduces the voltage needed for a given charge.

Capacitors in parallel share a voltage, so their stored charge magnitudes add: \(C_{eq}=C_1+C_2\). In a simple series chain with initially neutral intermediate conductors, each capacitor has the same charge magnitude and the voltages add, giving \(1/C_{eq}=1/C_1+1/C_2\). These are the reverse of the resistor rules because capacitance relates charge to voltage, while resistance relates voltage to current.

## Why stored energy has a factor of one-half

As the capacitor charges, adding each increment \(dq\) requires work \(dU=V(q)dq=(q/C)dq\). Integrating from empty to \(Q\),

$$
U=∫[0→Q](q/C)\,dq=(Q^2)/(2C)=(1/2)CV^2.
$$

The final voltage was not present throughout the charging process. For parallel plates, substitution also gives energy density \(u=U/(Ad)=(1/2)ε E^2\): the energy can be described as residing in the electric field.

## A resistor turns charging into a differential equation

Connect an initially uncharged capacitor in series with resistance \(R\) and a constant ideal emf \(ℰ\). Kirchhoff's loop rule and \(I=dQ/dt\) give

$$
ℰ-R(dQ)/(dt)-(Q/C)=0.
$$

The unfilled amount \(Cℰ-Q\) shrinks at a rate proportional to itself. The solution is

$$
Q(t)=Cℰ(1-exp(-t/RC)),\qquad I(t)=(ℰ)/(R)exp(-t/RC).
$$

The time constant \(\tau=RC\) has units of seconds. At one time constant the voltage reaches 63.2% of its final value; at five it reaches 99.3%. Charging slows because the capacitor's rising voltage leaves less voltage across the resistor.

For \(R=10\ k\Omega\), \(C=100\ \mu F\), and \(ℰ=12\  V\), \(\tau=1.0\  s\). Initially current is \(1.20\ mA\); at one second capacitor voltage is \(7.59\  V\) and current \(0.441\ mA\). Its eventual energy is \(7.20\ mJ\).

On discharge through the resistor, \(V(t)=V_0exp(-t/RC)\), so energy decays as \(U(t)=U_0exp(-2t/RC)\). The energy time constant is half the voltage time constant; squaring matters.

## The missing half is a lesson about the source

The fixed-voltage source supplies total energy \(ℰ Q_{final}=Cℰ^2\), twice the final stored energy. The remainder is resistor heating. For any nonzero \(R\) in this ideal model, reducing \(R\) changes how rapidly energy is dissipated, not its total.

This does not mean all charging schemes must lose half their energy. A gradually adjusted source or suitable energy-transfer circuit changes the process. Nor can we set \(R=0\) in the transient and ignore everything else: inductance, radiation, and source dynamics then matter.

An ideal capacitor blocks sustained DC after charging but permits transient current in the connected wires without charges crossing its insulating gap. This distinction makes capacitors useful for timing and filtering and is a first encounter with circuits whose behavior depends on history.
