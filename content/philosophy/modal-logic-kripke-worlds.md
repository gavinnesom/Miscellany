---
title: "Modal Logic and Kripke Worlds"
slug: "modal-logic-kripke-worlds"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - modal-logic
  - kripke-semantics
  - possible-worlds
date_added: "2026-08-15"
relationships:
  parent: []
  deeper:
    - modal-systems-k-t-s4-s5
    - logic-time-knowledge-obligation
  related:
    - predicate-logic
sources:
  - label: "Saul Kripke - A Completeness Theorem in Modal Logic"
    url: "https://doi.org/10.2307/2964568"
  - label: "Saul Kripke - Semantical Analysis of Modal Logic I"
    url: "https://doi.org/10.1002/malq.19630090502"
books: []
image:
  url: "/images/modal-kripke-worlds.svg"
  alt: "Kripke-world diagram showing an actual evaluation world, accessible alternatives, and how necessity and possibility depend on which propositions hold in those accessible worlds."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "modal-logic-kripke-worlds:world-w-must-true-p-hold-standard"
    version: 1
    question: "At a world w, what must be true for □P to hold in standard Kripke semantics?"
    answer: "P must be true in every world accessible from w."
    rubric: Correct if the answer conveys the canonical idea that P must be true in every world accessible from w.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-logic-kripke-worlds:world-w-must-true-p-hold"
    version: 1
    question: "At a world w, what must be true for ◇P to hold?"
    answer: "P must be true in at least one world accessible from w."
    rubric: Correct if the answer conveys the canonical idea that P must be true in at least one world accessible from w.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-logic-kripke-worlds:difference-between-kripke-frame-kripke-model"
    version: 1
    question: "What is the difference between a Kripke frame and a Kripke model?"
    answer: "A frame gives the worlds and accessibility relation; a model adds which propositions are true at which worlds."
    rubric: Correct if the answer conveys the canonical idea that A frame gives the worlds and accessibility relation; a model adds which propositions are true at which worlds.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "modal-logic-kripke-worlds:kripke-possible-worlds-require-belief-literal-parallel"
    version: 1
    question: "Do Kripke possible worlds require belief in literal parallel universes?"
    answer: "No. They can simply be abstract points representing alternative states or possibilities relevant to the logic."
    rubric: Correct if the answer conveys the canonical idea that No. They can simply be abstract points representing alternative states or possibilities relevant to the logic.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Predicate logic lets us say surprisingly complicated things about the **actual situation**:

> Every cat is a mammal.

> Someone knows Alice.

> Every planet orbits a star.

But ordinary reasoning also contains words such as:

- must
- might
- necessarily
- possibly
- could have been
- cannot be.

These do something different. They compare what is actually true with **alternative ways things could be**.

That is the job of **modal logic**.

## Necessity and possibility

Suppose \(P\) means:

> The door is locked.

Modal logic adds two useful operators.

**Necessary P:**

$$
□P
$$

Read this aloud as:

> “necessarily P”

or:

> “P must be true.”

**Possible P:**

$$
◇P
$$

Read this as:

> “possibly P”

or:

> “P could be true.”

The box and diamond are not magic punctuation. Their meaning comes from considering alternatives.

## Possible worlds

Imagine the current situation plus several alternative situations:

- in one, the door is locked;
- in another, it is unlocked;
- in another, the key is somewhere else.

Modal logicians call these alternatives **worlds**.

A “world” here does **not** have to mean a literal science-fiction parallel universe.

It can simply mean:

> one complete state or alternative that the model is considering.

That abstraction is powerful because the same machinery can later represent different things: alternative physical situations, future moments, states compatible with what someone knows, or normatively ideal situations.

## The arrows matter

Not every world necessarily counts as a relevant alternative from every other world.

So we draw arrows.

If world \(w\) has an arrow to world \(v\), write:

$$
wRv
$$

and read it roughly as:

> “v is accessible from w.”

The symbol \(R\) is the **accessibility relation**.

The interpretation of that arrow depends on what kind of modality we are modeling. For ordinary possibility it may mean:

> v is an alternative we count as possible from w.

Later it might mean:

> v is a possible future of w.

or:

> v is compatible with what Alice knows at w.

For now, the important idea is simply that **arrows determine which worlds get checked**.

## Necessity means checking every accessible world

At a world \(w\):

$$
□P
$$

is true when **P is true at every world accessible from w**.

Suppose \(w\) can access three worlds:

- \(w_1\): P is true
- \(w_2\): P is true
- \(w_3\): P is true

Then at \(w\):

$$
□P
$$

is true.

But if P is false at even one accessible world, then P is not necessary at \(w\).

Necessity is therefore a kind of universal claim:

> check all the relevant alternatives.

## Possibility means finding one accessible world

At \(w\):

$$
◇P
$$

is true when **P is true at at least one accessible world**.

So if:

- \(w_1\): P is false
- \(w_2\): P is false
- \(w_3\): P is true

then:

$$
◇P
$$

is true at \(w\).

Possibility is therefore an existential claim:

> find at least one relevant alternative where P works.

That should feel familiar from predicate logic:

- `∀` meant “for every”
- `∃` meant “there exists”
- `□` behaves like “in every accessible world”
- `◇` behaves like “in at least one accessible world.”

That connection is one reason the earlier entries were worth learning first.

## Frame versus model

Two technical terms are worth keeping.

A **Kripke frame** gives us:

1. a set of worlds;
2. the accessibility arrows between them.

Think:

> the map, but not the facts written on it.

A **Kripke model** adds a **valuation** telling us which propositions are true at which worlds.

Think:

> the map **plus** the labels saying what is true at each location.

This distinction is another version of the syntax/semantics theme from the first Logic entry.

## A worked example

Suppose world \(w_0\) can access \(w_1,w_2,w_3\).

Let \(R\) mean:

> It is raining.

And suppose:

- \(w_1\): R is true
- \(w_2\): R is false
- \(w_3\): R is false

At \(w_0\):

$$
◇R
$$

is true, because at least one accessible world has rain.

But:

$$
□R
$$

is false, because rain does not occur in every accessible world.

Now let \(D\) mean:

> The device is powered.

If D is true at all three accessible worlds, then at \(w_0\):

$$
□D
$$

is true.

The graph plus the truth labels gives us the answer mechanically.

## Necessity and possibility are duals

There is a useful relationship:

$$
◇P ≡ ¬□¬P
$$

Read it in words:

> P is possible exactly when it is **not necessary that P is false**.

Likewise:

$$
□P ≡ ¬◇¬P
$$

P is necessary exactly when it is **not possible for P to be false**.

This is worth understanding rather than memorizing.

If there is no accessible world where P fails, P survives every relevant alternative.

That is necessity.

## Does the current world see itself?

Not automatically.

This is one of the important subtleties of Kripke semantics.

A world can have an arrow to itself, but the basic framework does not require that.

If every world **does** access itself, the relation is called **reflexive**.

Why might that matter?

Because if the actual world counts among its own relevant alternatives, then:

$$
□P → P
$$

must hold.

If P is necessary, P must actually be true here.

That apparently obvious principle is **not built into the weakest modal system**.

It is what separates the modal system **T** from the weaker system **K**.

That is our next entry.

## A strange edge case

Suppose a world has **no accessible worlds at all**.

Under the standard semantics:

- \(◇P\) is false — there is no accessible world where P is true;
- \(□P\) is true for every P — there is no accessible counterexample.

The second result can feel bizarre.

It is the same logic behind the mathematical statement:

> Every unicorn in this empty room is blue.

There is no unicorn that violates the claim.

This is called **vacuous truth**.

It is a useful reminder that formal semantics can produce consequences that differ from conversational intuition.

> **Main message:** Modal logic turns “must” and “might” into questions about a graph of alternatives. The worlds say what alternatives exist; the arrows say which alternatives matter from where we are.
