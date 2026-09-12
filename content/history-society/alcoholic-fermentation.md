---
title: "Alcoholic Fermentation: How Sugar Becomes Ethanol"
slug: "alcoholic-fermentation"
category: "history-society"
topic: "alcohol-history-science"
tags:
  - alcohol
  - fermentation
  - yeast
  - metabolism
date_added: "2026-08-15"
relationships:
  parent:
    - alcohol-fermentation-distillation-families
  deeper:
    - fermented-drink-families
  related:
    - metabolic-fuel-use
quiz:
  - question_id: "alcoholic-fermentation:alcoholic-fermentation-reduce-acetaldehyde-ethanol"
    version: 1
    question: "Why does alcoholic fermentation reduce acetaldehyde to ethanol?"
    answer: "The reaction oxidizes NADH back to NAD+, helping regenerate the NAD+ needed for glycolysis to continue."
    rubric: Correct if the answer conveys the canonical idea that The reaction oxidizes NADH back to NAD+, helping regenerate the NAD+ needed for glycolysis to continue.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "alcoholic-fermentation:gas-released-pyruvate-converted-toward-ethanol-classic"
    version: 1
    question: "What gas is released when pyruvate is converted toward ethanol in the classic yeast pathway?"
    answer: "Carbon dioxide, during the pyruvate-to-acetaldehyde decarboxylation step."
    rubric: Correct if the answer conveys the canonical idea that Carbon dioxide, during the pyruvate-to-acetaldehyde decarboxylation step.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "alcoholic-fermentation:grapes-fermented-more-directly-unmalted-grain"
    version: 1
    question: "Why can grapes be fermented more directly than unmalted grain?"
    answer: "Grapes already contain readily fermentable sugars, while much of a grain's carbohydrate is starch that must first be broken into smaller sugars."
    rubric: Correct if the answer conveys the canonical idea that Grapes already contain readily fermentable sugars, while much of a grain's carbohydrate is starch that must first be broken into smaller sugars.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
image:
  url: "/images/alcoholic-fermentation-pathway.svg"
  alt: "Simplified biochemical pathway from glucose through glycolysis to pyruvate, acetaldehyde and ethanol, showing carbon dioxide release and NADH to NAD+ recycling."
  credit: "Local explanatory diagram"
  provenance: "local"
sources:
  - label: "de Smidt et al. — Alcohol dehydrogenases in Saccharomyces cerevisiae"
    url: https://doi.org/10.1111/j.1567-1364.2011.00760.x
  - label: "van Maris et al. — Pyruvate decarboxylase-negative yeast and alcoholic fermentation"
    url: https://pmc.ncbi.nlm.nih.gov/articles/PMC154831/
  - label: "Japan National Tax Agency — Nihonshu specification and koji saccharification"
    url: https://www.nta.go.jp/english/taxes/liquor_administration/02_2.htm
---

Alcoholic fermentation is often summarized as:

$$
\text{sugar} \rightarrow \text{alcohol}
$$

That is directionally correct, but it hides the clever part.

Yeast does not primarily make ethanol because humans enjoy wine.

Ethanol production is part of a metabolic route that allows the cell to keep extracting a small amount of usable energy from sugar while maintaining the redox chemistry required for glycolysis.

## First: glycolysis

A glucose molecule contains six carbon atoms.

Glycolysis splits and rearranges it into two three-carbon molecules of **pyruvate**.

In simplified bookkeeping, glycolysis produces a net:

$$
2\ ATP
$$

per glucose, along with reduced electron carrier:

$$
NADH
$$

ATP is useful chemical currency.

But the supply of oxidized:

$$
NAD^+
$$

must also be regenerated for glycolysis to continue.

That redox problem is what fermentation helps solve.

## Pyruvate becomes acetaldehyde

In the classic alcoholic-fermentation pathway of *Saccharomyces cerevisiae*, pyruvate decarboxylase converts pyruvate into **acetaldehyde**.

A carbon is removed as carbon dioxide:

$$
\text{pyruvate} \rightarrow \text{acetaldehyde} + CO_2
$$

That carbon dioxide is not merely a laboratory detail.

It is the gas that can inflate bread dough and contribute carbonation during alcoholic fermentation.

## Acetaldehyde becomes ethanol

Alcohol dehydrogenase then reduces acetaldehyde to ethanol.

In simplified form:

$$
\text{acetaldehyde} + NADH \rightarrow \text{ethanol} + NAD^+
$$

The important product for the yeast's metabolic bookkeeping is not only ethanol.

It has regenerated:

$$
NAD^+
$$

which can return to glycolysis.

A useful overall shorthand is therefore:

$$
\text{glucose} \rightarrow 2\ \text{ethanol} + 2CO_2
$$

with a net two ATP from glycolysis in the simplified pathway.

Real beverage fermentation is messier.

Carbon also goes into yeast biomass and numerous side products that affect aroma and flavor.

## Ethanol is not the cell's energy currency

A common conceptual mistake is:

> Yeast turns sugar into alcohol because alcohol stores the ATP.

No.

ATP is the immediate chemical currency generated and spent by cellular reactions.

Ethanol is a reduced end product of this fermentative redox pathway.

It still contains substantial chemical energy.

That is precisely why burning ethanol releases heat and why other organisms can oxidize ethanol under suitable conditions.

Fermentation has extracted only part of the chemical energy originally available in glucose.

## Is fermentation “anaerobic”?

Alcoholic fermentation is commonly associated with oxygen-poor conditions because fermentation allows glycolysis to continue without relying on mitochondrial oxidative phosphorylation to regenerate the necessary redox cofactors.

But “yeast only ferments when there is absolutely no oxygen” is too simple.

Some yeasts, notably *S. cerevisiae*, can produce ethanol even in oxygenated environments when sugar is abundant.

For understanding beverages, the durable point is:

> alcoholic fermentation is not the same process as respiration, and it does not require oxygen as the terminal electron acceptor.

## The hidden problem: not every raw material contains free sugar

Fruit gives yeast an easy starting point.

Grapes contain glucose and fructose.

Apple juice contains fermentable sugars.

Honey is already rich in sugars.

Grains and rice store much of their carbohydrate as **starch**, a large glucose polymer.

Before yeast can efficiently ferment that reserve, enzymes must cut the starch into smaller sugars.

This is **saccharification**.

### Beer: malt and mash

Traditional brewing exploits enzymes associated with malted grain.

During mashing, those enzymes act on starch and generate a sugar-rich liquid called wort.

Yeast then ferments the wort.

The grain-to-beer story is therefore:

```text
starch
→ enzymatic saccharification
→ fermentable sugars
→ yeast fermentation
→ ethanol + CO₂ + flavor metabolites
```

### Sake: koji solves the starch problem differently

Sake also starts from starch-rich material: polished rice.

Koji is made by growing a mold, commonly *Aspergillus oryzae*, on steamed rice.

Its enzymes help convert rice starch toward sugars that yeast can ferment.

The distinctive cleverness of sake is that saccharification and alcoholic fermentation can proceed in overlapping fashion rather than as one completely finished step followed by the other.

That is why calling sake merely “rice wine” is convenient but mechanistically misleading.

Wine begins with sugar-rich fruit juice.

Sake begins with starch that must be enzymatically unlocked.

## Fermentation makes more than ethanol

The final aroma of a fermented drink is influenced by far more than ethanol concentration.

Yeast strain, temperature, nutrients, oxygen exposure, substrate chemistry and other microorganisms can change the production of:

- esters;
- higher alcohols;
- organic acids;
- aldehydes;
- sulfur compounds;
- many other trace molecules.

So two liquids can contain similar ABV and taste nothing alike.

> **Main message:** Alcoholic fermentation couples sugar breakdown to redox recycling. Ethanol is the visible product humans care about, but the metabolic trick is regenerating NAD⁺ so glycolysis can keep running.
