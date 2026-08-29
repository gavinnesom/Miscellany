---
title: "K, T, S4 and S5: Change the Arrows, Change the Logic"
slug: "modal-systems-k-t-s4-s5"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - modal-logic
  - kripke-semantics
  - formal-systems
date_added: "2026-08-15"
relationships:
  parent:
    - modal-logic-kripke-worlds
  deeper: []
  related: []
related: []
sources:
  - label: "Saul Kripke - A Completeness Theorem in Modal Logic"
    url: "https://doi.org/10.2307/2964568"
  - label: "Saul Kripke - Semantical Analysis of Modal Logic I"
    url: "https://doi.org/10.1002/malq.19630090502"
books: []
image:
  url: "/images/modal-systems-k-t-s4-s5.svg"
  alt: "Four Kripke-frame diagrams comparing arbitrary accessibility in K, reflexivity in T, reflexivity plus transitivity in S4, and equivalence-style mutual accessibility in S5."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "modal-systems-k-t-s4-s5:accessibility-property-modal-system-t-add-basic"
    version: 1
    question: "What accessibility property does modal system T add to the basic K framework?"
    answer: "Reflexivity — every world accesses itself."
    rubric: Correct if the answer conveys the canonical idea that Reflexivity — every world accesses itself.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-systems-k-t-s4-s5:accessibility-property-central-s4-beyond-reflexivity"
    version: 1
    question: "What accessibility property is central to S4 beyond reflexivity?"
    answer: "Transitivity — if w accesses v and v accesses u, then w also accesses u."
    rubric: Correct if the answer conveys the canonical idea that Transitivity — if w accesses v and v accesses u, then w also accesses u.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-systems-k-t-s4-s5:standard-kripke-frame-picture-s5-worlds-within"
    version: 1
    question: "In the standard Kripke-frame picture of S5, how are worlds within one equivalence cluster related?"
    answer: "Accessibility is an equivalence relation; within a cluster the worlds are mutually accessible, with reflexivity, symmetry and transitivity."
    rubric: Correct if the answer conveys the canonical idea that Accessibility is an equivalence relation; within a cluster the worlds are mutually accessible, with reflexivity, symmetry and transitivity.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-systems-k-t-s4-s5:stronger-modal-systems-validate-more-formulas"
    version: 1
    question: "Why do stronger modal systems validate more formulas?"
    answer: "They allow fewer accessibility structures. Adding constraints on the arrows removes countermodels, so more modal formulas become valid in every remaining frame."
    rubric: Correct if the answer conveys the canonical idea that They allow fewer accessibility structures. Adding constraints on the arrows removes countermodels, so more modal formulas become valid in every remaining frame.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

The previous entry gave us worlds and arrows.

Now comes the important trick:

> **Change the rules governing the arrows, and you change which modal principles are valid.**

That is the basic geometric intuition behind famous modal systems such as **K, T, S4 and S5**.

The names look cryptic.

The underlying idea is much less mysterious.

## Start with K

**K** is the basic normal modal logic.

For our purposes, think:

> the accessibility relation can have essentially any shape.

Worlds may:

- access themselves or not;
- access one another in one direction or both;
- form chains;
- form disconnected regions;
- have no outgoing arrows.

K validates a basic distribution principle:

$$
□(P → Q) → (□P → □Q)
$$

In words:

> If it is necessary that P implies Q, and P is necessary, then Q is necessary.

You do **not** need to memorize that formula yet.

The useful fact is that K imposes no special geometric property such as reflexivity or transitivity on the accessibility arrows.

## T: every world sees itself

System **T** adds **reflexivity**.

For every world \(w\):

$$
wRw
$$

Graphically, every world gets a self-loop.

This validates:

$$
□P → P
$$

In words:

> If P is necessary, then P is true.

Why?

Because if \(w\) is accessible from itself, then “P is true in every world accessible from w” includes the requirement:

> P is true at w itself.

For interpretations where necessity is supposed to include actuality, reflexivity feels natural.

But the important lesson is that the principle comes from a **property of the arrows** rather than from the visual appearance of the box symbol.

## S4: add transitivity

**S4** includes T and adds **transitivity**.

If:

$$
wRv
$$

and:

$$
vRu
$$

then transitivity requires:

$$
wRu
$$

In graph language:

> if w can reach v, and v can reach u, then w must also be able to reach u directly as an accessible alternative.

A characteristic S4 principle is:

$$
□P → □□P
$$

Read:

> If P is necessary, then it is necessary that P is necessary.

The graph explains why.

If P holds throughout everything accessible from w, and accessibility is transitive, then the worlds reachable from those worlds stay inside the region whose P-status has already been constrained.

Again, the geometry does the work.

## S5: accessibility becomes equivalence-like

A standard Kripke-frame presentation of **S5** uses an **equivalence relation**.

That means accessibility is:

- **reflexive:** every world accesses itself;
- **symmetric:** if w accesses v, then v accesses w;
- **transitive:** if w accesses v and v accesses u, then w accesses u.

Within one equivalence cluster, you can picture the worlds as all mutually accessible.

A characteristic S5 principle is:

$$
◇P → □◇P
$$

In words:

> If P is possible, then it is necessarily possible.

Why might that hold?

Suppose one world in the cluster makes P true.

If every world in the cluster can access the same collection of mutually accessible worlds, then from any world in that cluster, the P-world remains reachable.

So P's possibility cannot disappear merely because we move to another world in the same cluster.

## Stronger logic means fewer allowed frames

There is a useful reversal here.

Moving:

$$
K → T → S4 → S5
$$

adds logical principles.

So the logic becomes **stronger**: more formulas count as theorems.

But geometrically, the allowed models become **more restricted**.

- K permits many arrow structures.
- T throws out non-reflexive frames.
- S4 additionally throws out failures of transitivity.
- S5 restricts accessibility still further to equivalence-style frames.

Fewer possible counterexamples means more formulas become valid in all surviving frames.

This is an unusually concrete connection between syntax and semantics:

> add a formal axiom on the syntax side; restrict possible graph shapes on the semantic side.

## These are not four levels of truth

Do not picture K, T, S4 and S5 as:

> weak truth → stronger truth → very true.

They are different **logical systems** built from different assumptions about accessibility.

Which assumptions make sense depends on what the arrows mean.

For one application, reflexivity may be appropriate.

For another, symmetry may be absurd.

That becomes clearer when modal logic is used for time, knowledge and obligation.

> **Main message:** Modal axioms have geometry. K, T, S4 and S5 differ because they permit different accessibility structures between worlds.
