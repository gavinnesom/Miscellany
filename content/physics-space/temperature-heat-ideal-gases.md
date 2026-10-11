---
title: "Temperature, Heat, and the Ideal-Gas Bridge"
slug: "temperature-heat-ideal-gases"
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
    - "first-law-thermodynamic-processes"
    - "entropy"
    - "engine-cooling-lubrication"
sources:
  - label: "OpenStax University Physics Volume 2 — Thermal equilibrium"
    url: "https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium"
  - label: "OpenStax University Physics Volume 2 — Heat and calorimetry"
    url: "https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry"
  - label: "OpenStax University Physics Volume 2 — Ideal-gas model"
    url: "https://openstax.org/books/university-physics-volume-2/pages/2-1-molecular-model-of-an-ideal-gas"
  - label: "OpenStax University Physics Volume 2 — Kinetic theory"
    url: "https://openstax.org/books/university-physics-volume-2/pages/2-2-pressure-temperature-and-rms-speed"
books: []
quiz:
  - question_id: "temperature-heat-ideal-gases:same-temperature"
    version: 1
    status: "active"
    question: "Two samples of the same monatomic ideal gas have equal temperature, but one contains ten times as many particles. Compare mean translational kinetic energy per particle and total internal energy."
    answer: "Mean translational kinetic energy per particle is the same, 3kT/2. Total internal energy is ten times larger in the larger sample, 3NkT/2."
    rubric: "Require intensive versus extensive distinction and correct factor of ten."
  - question_id: "temperature-heat-ideal-gases:gas-compression"
    version: 1
    status: "active"
    question: "An ideal gas is compressed to half its volume while its absolute temperature rises by 20%. By what factor does pressure change, and why is Celsius unsuitable for this ratio?"
    answer: "Pressure increases by a factor of 2.4 at fixed particle number, from P proportional to T/V. Gas-law temperature is absolute kelvin; Celsius has an arbitrary offset and does not preserve ratios."
    rubric: "Require 2.4, fixed amount, and absolute-temperature reasoning."
---

Temperature, heat, and internal energy answer different questions. Their separation is what allows thermal physics to extend mechanics rather than replace it.

- **Temperature** characterizes thermal equilibrium and predicts the direction of spontaneous heat transfer between ordinary systems: from hotter to colder.
- **Internal energy** is a state quantity encompassing microscopic kinetic and interaction energies, excluding the system's bulk motion and external potential energy in the chosen accounting.
- **Heat** is energy transferred because of a temperature difference. It describes a transfer, not a substance stored inside an object.

Two objects can have the same temperature but very different internal energies. Heating is also not the only way to raise internal energy: compression and electrical work can do so. The [first law](/entry/first-law-thermodynamic-processes) keeps these routes distinct.

## Why a thermometer can work

The zeroth law says that if A and B are each in thermal equilibrium with C, they are in thermal equilibrium with each other. This lets a thermometer compare temperatures without needing direct contact between every pair of objects. A thermometer must first approach equilibrium with what it measures; an immediate reading need not be the object's original temperature.

Absolute temperature in kelvin belongs in gas-law ratios. A change of 1 K equals a change of 1 °C, but 20 °C is not twice the absolute temperature of 10 °C.

## Deriving gas pressure from collisions

Assume many classical particles moving randomly in a box, negligible particle volume, negligible intermolecular forces except brief elastic collisions, and equilibrium with no preferred direction. A particle of mass \(m\), with velocity component \(v_x\), transfers momentum \(2mv_x\) on reflecting from a wall. Its round-trip time to that wall is \(2L/|v_x|\). Average force is therefore \(mv_x^2/L\).

Sum over particles and divide by wall area. With box volume \(V\) and isotropy \(⟨ v_x^2⟩=⟨ v^2⟩/3\),

$$
PV=1/3Nm⟨ v^2⟩.
$$

The ideal-gas equation of state is \(PV=Nk_BT=nRT\), where \(N\) counts particles and \(n\) counts moles. Combining the two gives

$$
\left⟨(1/2)mv^2\right⟩=(3/2)k_BT.
$$

Thus temperature measures mean translational kinetic energy for this model. It is not universally a synonym for “all particle motion”: solids, molecular rotations and vibrations, and interaction energies require a richer description. At equal temperature, lighter gas particles have greater root-mean-square speeds because \(v_{rms}=√(3k_BT/m)\).

A monatomic ideal gas has \(U=(3/2)nRT\), up to a reference constant. Diatomic molecules can store rotational and, at sufficiently high temperatures, vibrational energy. Their heat capacities depend on which modes are thermally accessible.

## A pressure example that forces assumptions into view

A fixed amount of ideal gas begins at \(100\ kPa\) and \(300\  K\). Its volume is halved and its final temperature is \(360\  K\). Then

$$
(P_2)/(P_1)=(T_2)/(T_1)(V_1)/(V_2)=(360)/(300)\times2=2.4,
$$

so \(P_2=240\ kPa\) **absolute**. The same volume reduction would only double pressure if temperature stayed constant. Gauge pressure would need conversion to absolute pressure before taking this ratio. Nothing in the ideal-gas equation alone tells us the required heat or work; that depends on the path.

## Heat capacity is a response, not a temperature definition

When heat capacity is approximately constant and no phase change or other relevant work complicates the process, \(Q=mc\Delta T\). For two isolated water samples of masses \(0.20\) and \(0.30\ kg\), initially 80 and 20 °C, equal specific heats give

$$
0.20(80-T_f)=0.30(T_f-20),\qquad T_f=44\ ° C.
$$

The common specific heat cancels. This assumes negligible container heat capacity, evaporation, and heat loss. During a phase change, appreciable energy can change molecular arrangement without changing temperature, so the same formula cannot be stretched through melting or boiling.

The ideal-gas model is strongest for sufficiently dilute gases away from condensation. High density and low-temperature quantum behavior expose its limits. A good model earns its usefulness by stating where it stops.
