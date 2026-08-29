---
title: "From Food to ATP: How Cells Release Energy"
slug: "food-to-atp"
category: "biology-medicine"
topic: "metabolism-diabetes"
tags:
  - metabolism
  - bioenergetics
  - mitochondria
  - ATP
date_added: "2026-08-15"
relationships:
  parent:
    - metabolic-fuel-use
  deeper:
    - atp-to-muscle-force
  related:
    - fasting-metabolism
    - ketones
quiz:
  - question_id: "food-to-atp:key-energetic-job-mitochondrial-electron-transport-chain"
    version: 1
    question: "What is the key energetic job of the mitochondrial electron-transport chain?"
    answer: "It uses energy released during electron transfer to build an electrochemical proton gradient across the inner mitochondrial membrane."
    rubric: Correct if the answer conveys the canonical idea that It uses energy released during electron transfer to build an electrochemical proton gradient across the inner mitochondrial membrane.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "food-to-atp:directly-powers-mitochondrial-atp-synthase-during-oxidative"
    version: 1
    question: "What directly powers mitochondrial ATP synthase during oxidative phosphorylation?"
    answer: "Proton-motive force — protons moving back down their electrochemical gradient through the membrane-embedded ATP synthase complex."
    rubric: Correct if the answer conveys the canonical idea that Proton-motive force — protons moving back down their electrochemical gradient through the membrane-embedded ATP synthase complex.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "food-to-atp:atp-better-described-energy-transfer-currency-long"
    version: 1
    question: "Why is ATP better described as an energy-transfer currency than a long-term energy store?"
    answer: "Cells maintain and turn over a relatively small ATP pool rapidly, continuously regenerating ATP from fuels to couple energy-releasing reactions to energy-requiring work."
    rubric: Correct if the answer conveys the canonical idea that Cells maintain and turn over a relatively small ATP pool rapidly, continuously regenerating ATP from fuels to couple energy-releasing reactions to energy-requiring work.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "food-to-atp:was-directly-observed-classic-1997-noji-atpase"
    version: 1
    question: "What was directly observed in the classic 1997 Noji ATPase experiment?"
    answer: "Rotation of the F1 ATPase rotor during ATP hydrolysis, directly demonstrating that this enzyme complex is a rotary molecular motor."
    rubric: Correct if the answer conveys the canonical idea that Rotation of the F1 ATPase rotor during ATP hydrolysis, directly demonstrating that this enzyme complex is a rotary molecular motor.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
image:
  url: "/images/food-to-atp-energy-chain.svg"
  alt: "Mechanism diagram tracing carbohydrate, fat and ketone carbon through reduced electron carriers, electron transport, a proton gradient and rotary ATP synthase to ATP."
  credit: "Local explanatory diagram"
  provenance: "local"
sources:
  - label: "Peter Mitchell — Coupling of Phosphorylation to Electron and Hydrogen Transfer by a Chemi-Osmotic type of Mechanism (1961)"
    url: https://doi.org/10.1038/191144a0
  - label: "Noji et al. — Direct observation of the rotation of F1-ATPase (1997)"
    url: https://doi.org/10.1038/386299a0
---

Food energy does not jump directly from a molecule of fat or glucose into a moving muscle.

Cells transform it through a chain of intermediate forms.

A useful high-level sequence is:

```text
food molecule
→ chemical oxidation
→ high-energy electrons
→ proton gradient
→ ATP
→ cellular work
```

Each arrow represents a real physical mechanism.

## Energy is transformed, not created

Food molecules contain chemical potential energy because of their molecular structure and oxidation state.

Cells release usable free energy by moving the atoms and electrons toward lower-free-energy products.

For aerobic metabolism, much of the carbon ultimately leaves as:

$$
CO_2
$$

and oxygen becomes reduced to:

$$
H_2O
$$

- The energy difference is not all captured.
- A substantial fraction is dissipated as heat.
- Biology is an energy-conversion system, not a perpetual-motion machine.

## Different fuels enter by different routes

The major fuels begin differently but eventually feed overlapping central metabolism.

### Carbohydrate

Glucose enters **glycolysis**:

```text
glucose
→ glycolysis
→ pyruvate
```

Glycolysis directly generates a small amount of ATP and reduced electron carrier.

Under oxidative conditions, pyruvate-derived carbon can enter mitochondria largely through acetyl-CoA and the citric-acid cycle.

### Fat

Triglyceride releases fatty acids.

Inside mitochondria, fatty-acid **β-oxidation** removes carbon units largely as acetyl-CoA while producing reduced electron carriers.

### Ketones

Extrahepatic tissues convert acetoacetate and β-hydroxybutyrate toward acetyl-CoA.

- Ketones are not a completely separate energy universe.
- They are another route for carbon and reducing equivalents to enter mitochondrial oxidation.

### Amino acids

Different amino acids feed central metabolism at different points after their nitrogen is handled.

There is no single universal “protein → glucose → ATP” route.

## The citric-acid cycle is partly an electron-harvesting machine

Acetyl-CoA enters the **citric-acid cycle**, also called the TCA or Krebs cycle.

One useful way to understand the cycle is:

> carbon is oxidized while electron carriers are reduced.

Important carriers include:

$$
NAD^+
\rightarrow NADH
$$

and:

$$
FAD
\rightarrow FADH_2
$$

NADH and FADH₂ are not ATP.

They are temporary carriers of high-energy electrons that can feed the electron-transport chain.

## The electron-transport chain builds a gradient

The inner mitochondrial membrane contains a sequence of electron-transfer complexes.

As electrons move through the respiratory chain toward oxygen, part of the released free energy is used to move protons:

$$
H^+
$$

from the mitochondrial matrix to the other side of the inner membrane.

This establishes both:

- a concentration difference;
- an electrical-potential difference.

Together these form the **proton-motive force**.

So the cell has converted:

```text
chemical reducing power
→ electrochemical potential across a membrane
```

This was the central insight of Peter Mitchell's **chemiosmotic** mechanism.

His 1961 proposal was radical because it made a transmembrane ion gradient, rather than a hypothetical high-energy chemical intermediate, the coupling mechanism between electron transport and ATP formation.

## Oxygen's role

Oxygen is not simply “energy.”

- Its crucial role in aerobic respiration is as the terminal electron acceptor.
- At the end of the respiratory chain, electrons and protons are ultimately combined with oxygen to form water.

If that electron sink disappears, the respiratory chain cannot continue operating normally.

The problem propagates backward:

- electron carriers cannot be oxidized normally;
- proton pumping stops;
- the proton gradient cannot continue driving oxidative ATP production.

This is why oxygen availability is tightly connected to mitochondrial energy production even though ATP synthase itself is driven directly by the proton gradient, not by oxygen molecules hitting the enzyme.

## ATP synthase: a molecular rotary machine

The proton gradient stores usable electrochemical potential.

Protons can move back toward the matrix through **ATP synthase**.

That flow drives rotation within the enzyme complex.

Mechanical changes in the catalytic portion are coupled to:

$$
ADP + P_i \rightarrow ATP
$$

This is not metaphorically motor-like.

ATP synthase is genuinely a rotary molecular machine.

In 1997, Hiroyuki Noji and colleagues attached a fluorescent actin filament to the rotor of an isolated \(F_1\)-ATPase molecule and directly observed rotation for more than 100 revolutions in the presence of ATP.

There is an important direction caveat.

Their direct visual experiment watched the isolated F₁ motor rotate while **hydrolyzing ATP**.

The intact \(F_0F_1\) complex is reversible: transmembrane proton flow can drive the machinery in the ATP-synthesis direction.

So the experiment is spectacular direct evidence for the rotary-motor architecture, not a movie of an intact mitochondrion manufacturing ATP in a living person.

## ATP is spendable currency, not the main storage tank

ATP is often called the cell's **energy currency**.

That analogy is useful if we do not push it too far.

Cells do not store months of energy as ATP.

Long-term energy is stored largely in molecules such as triglyceride and glycogen.

ATP is repeatedly:

```text
made
→ spent
→ remade
```

Its value is that hydrolysis can be **coupled** to processes that otherwise require free-energy input.

Those processes include:

- ion pumping;
- biosynthesis;
- molecular transport;
- muscle contraction.

The body therefore converts a huge, relatively inert reserve such as adipose triglyceride into a rapidly spendable molecular currency.

## ATP is not “a packet of force”

Hydrolyzing ATP does not automatically push something.

ATP-dependent proteins have molecular structures in which binding, hydrolysis and product release alter conformations and interaction states.

The protein machinery converts chemical free energy into:

- motion;
- altered binding;
- ion gradients;
- other work.

Myosin in muscle is one such molecular motor.

That is the next causal step:

```text
ATP
→ myosin molecular cycle
→ actin sliding
→ sarcomere shortening
→ muscle force
```

> **Main message:** Cells release food energy through controlled electron transfer. Mitochondria convert that chemical energy into a proton gradient, ATP synthase converts the gradient into ATP, and ATP-dependent molecular machines convert ATP free energy into cellular work.
