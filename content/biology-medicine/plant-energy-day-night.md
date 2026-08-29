---
title: "How Plants Store and Spend Energy"
slug: "plant-energy-day-night"
category: "biology-medicine"
topic: "metabolism-diabetes"
tags:
  - metabolism
  - plants
  - photosynthesis
  - starch
  - circadian-rhythm
date_added: "2026-08-15"
relationships:
  parent:
    - metabolic-fuel-use
  related:
    - food-to-atp
    - fat-vs-glycogen-energy-density
quiz:
  - question_id: "plant-energy-day-night:happens-much-temporary-carbohydrate-reserve-arabidopsis-leaf"
    version: 1
    question: "What happens to much of the temporary carbohydrate reserve in an Arabidopsis leaf at night?"
    answer: "Daytime-accumulated starch is degraded to support metabolism and growth when photosynthesis is unavailable."
    rubric: Correct if the answer conveys the canonical idea that Daytime-accumulated starch is degraded to support metabolism and growth when photosynthesis is unavailable.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "plant-energy-day-night:surprising-quantitative-behavior-did-scialdone-et-al"
    version: 1
    question: "What surprising quantitative behavior did Scialdone et al. find in Arabidopsis nighttime starch use?"
    answer: "The degradation rate adjusted to the starch reserve and expected time until dawn so that starch lasted almost precisely to dawn, behavior consistent with an arithmetic division of reserve by remaining night."
    rubric: Correct if the answer conveys the canonical idea that The degradation rate adjusted to the starch reserve and expected time until dawn so that starch lasted almost precisely to dawn, behavior consistent with an arithmetic division. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "plant-energy-day-night:plants-stop-cellular-respiration-daylight"
    version: 1
    question: "Do plants stop cellular respiration in daylight?"
    answer: "No. Plants perform respiration day and night; photosynthesis supplies additional energy and fixed carbon during light periods."
    rubric: Correct if the answer conveys the canonical idea that No. Plants perform respiration day and night; photosynthesis supplies additional energy and fixed carbon during light periods.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
image:
  url: "/images/plant-energy-day-night.svg"
  alt: "Day-night plant energy diagram showing photosynthetic carbon fixation, daytime starch accumulation, nighttime starch degradation and mitochondrial ATP production, with a graph of starch being rationed toward dawn."
  credit: "Local explanatory diagram"
  provenance: "local"
sources:
  - label: "Scialdone et al. — Arabidopsis plants perform arithmetic division to prevent starvation at night"
    url: https://doi.org/10.7554/eLife.00669
  - label: "Peter Mitchell — Coupling of Phosphorylation to Electron and Hydrogen Transfer by a Chemi-Osmotic type of Mechanism"
    url: https://doi.org/10.1038/191144a0
---

Animals have an obvious energy-storage problem:

> food arrives intermittently, but cells need ATP continuously.

Plants have the same problem in a different form.

- Their external energy source — sunlight — disappears every night.
- A leaf therefore has to do more than capture light.
- It has to **budget carbon across time**.

## Sunlight is not ATP stored for later

It is tempting to say:

> plants run on sunlight.

That is useful only at very high level.

During photosynthesis, chloroplast electron-transfer machinery converts light energy into chemical intermediates including ATP and reducing power used to support carbon fixation.

Carbon dioxide is incorporated into organic molecules.

Those molecules can then be:

- exported as sucrose;
- used in biosynthesis;
- temporarily stored as starch.

The long-duration transferable energy is therefore carried in **chemical bonds**, not in trapped photons sitting inside the leaf overnight.

## Plants also respire

Plants contain mitochondria.

They perform cellular respiration.

Carbon compounds can be oxidized, electrons passed through respiratory chains, proton gradients generated and ATP produced by ATP synthase.

This occurs day and night.

Photosynthesis does not replace mitochondrial respiration with a completely different ATP universe.

Instead, plants operate overlapping energy systems:

```text
light
→ photosynthetic energy conversion
→ fixed carbon
→ sugars / starch
→ respiration
→ ATP for cellular work
```

## Daytime: earn and store

During the day, a leaf can photosynthetically fix carbon while growth and metabolism continue.

In *Arabidopsis*, a fraction of this carbon is stored temporarily as **starch** in chloroplasts.

That reserve has a clear purpose.

Night is predictable.

Photosynthesis will stop when light disappears, but metabolism and growth cannot simply stop until sunrise.

So starch accumulates during the day and becomes a nighttime carbon source.

## Nighttime: spend the reserve

In darkness, leaf starch is degraded and carbon is released into metabolic pathways.

A naive strategy would be:

> use starch whenever you need it and hope it lasts.

Plants do something more controlled.

In *Arabidopsis*, starch often declines approximately linearly through the night.

The reserve is nearly exhausted around expected dawn.

That suggests active budgeting rather than accidental depletion.

## The arithmetic-division experiment

In 2013, Scialdone and colleagues manipulated two crucial variables:

- how much starch was available;
- how long the plant should expect to wait until dawn.

They found that the rate of starch degradation adjusted to both.

- If night came unexpectedly early, the plant slowed starch use.
- If the available reserve changed, degradation adjusted again.

The dynamics were consistent with a calculation equivalent to:

$$
\text{rate of starch use}
\approx
\frac{\text{starch remaining}}
{\text{expected time until dawn}}
$$

The authors described this as **arithmetic division**.

This does not mean a plant has a tiny calculator or consciously performs arithmetic.

It means the biochemical regulatory network produces dynamics mathematically equivalent to dividing the remaining reserve by the expected remaining time.

The result is remarkable:

> the plant avoids both starving too early and reaching dawn with a needlessly large unused reserve.

## A biological budgeting problem

Imagine having:

$$
120\ \text{units of starch}
$$

with:

$$
12\ \text{hours until dawn}
$$

A crude perfect budget would spend:

$$
10\ \text{units/hour}
$$

Now imagine darkness arrives four hours early.

- If the plant continued spending at its previous expected-night rate, the reserve could run out before dawn.
- The observed regulatory system adjusts.

The analogy is not perfect, but the control problem is real:

> use stored chemical energy at a rate matched to the expected no-input interval.

## The comparison with animal fasting

There is a useful sideways connection to human metabolism.

Both systems face:

```text
energy/carbon input now
→ predictable or unpredictable interval without input
→ stored reserve must bridge the gap
```

Humans use:

- liver glycogen;
- adipose triglyceride;
- gluconeogenesis;
- ketogenesis

to maintain fuel availability during fasting.

Plants can use daytime starch accumulation and regulated nighttime degradation.

The specific molecular mechanisms are different.

Do not force the analogy too far.

The shared principle is:

> metabolism is partly about **when** to spend stored chemical resources, not merely whether those resources contain energy.

## Why plants do not simply store everything as starch forever

Temporary leaf starch is not the only plant energy reserve.

Plants move carbon among many forms and organs.

Longer-term storage can include:

- starch in seeds or storage organs;
- oils;
- structural carbohydrates;
- other carbon compounds.

The nighttime *Arabidopsis* result is interesting precisely because it concerns a **short-term working reserve** that is actively budgeted over one predictable dark interval.

That makes it a good plant analogue to a working fuel buffer rather than a complete theory of all plant energy storage.

> **Main message:** Plants solve a scheduling problem as well as an energy problem. Daylight builds chemical carbon reserves; nighttime metabolism spends them at a regulated rate, and *Arabidopsis* can adjust starch use so the reserve lasts almost precisely to expected dawn.
