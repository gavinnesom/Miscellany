---
title: "Logic of Time, Knowledge and Obligation"
slug: "logic-time-knowledge-obligation"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - modal-logic
  - temporal-logic
  - epistemic-logic
  - deontic-logic
date_added: "2026-08-15"
relationships:
  parent:
    - modal-logic-kripke-worlds
  deeper: []
  related: []
sources:
  - label: "Arthur N. Prior - Time and Modality"
    url: "https://openlibrary.org/works/OL17980708W/Time_and_modality"
  - label: "Jaakko Hintikka - Knowledge and Belief"
    url: "https://books.google.com/books?id=eAHJEcNh938C"
  - label: "G. H. von Wright - Deontic Logic"
    url: "https://www.jstor.org/stable/i313291"
books: []
image:
  url: "/images/modal-applications-time-knowledge-obligation.svg"
  alt: "Three-panel diagram showing similar world-and-arrow structures interpreted respectively as future moments, states compatible with an agent's knowledge, and normatively ideal states."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "logic-time-knowledge-obligation:epistemic-logic-accessibility-arrow-represent"
    version: 1
    question: "In epistemic logic, what can an accessibility arrow represent?"
    answer: "A world compatible with an agent's information — a possibility the agent cannot rule out."
    rubric: Correct if the answer conveys the canonical idea that A world compatible with an agent's information — a possibility the agent cannot rule out.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "logic-time-knowledge-obligation:should-p-obligatory-normally-imply-p-actually"
    version: 1
    question: "Why should “P is obligatory” not normally imply “P is actually true”?"
    answer: "Obligations can be violated. A norm can require P even when the actual situation is not P."
    rubric: Correct if the answer conveys the canonical idea that Obligations can be violated. A norm can require P even when the actual situation is not P.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "logic-time-knowledge-obligation:deep-connection-among-temporal-epistemic-deontic-logics"
    version: 1
    question: "What is the deep connection among temporal, epistemic and deontic logics in this entry?"
    answer: "They can reuse modal-style relational semantics while interpreting worlds and accessibility arrows differently — as temporal alternatives, information-compatible states, or normatively ideal states."
    rubric: Correct if the answer conveys the canonical idea that They can reuse modal-style relational semantics while interpreting worlds and accessibility arrows differently — as temporal alternatives, information-compatible states, or. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Kripke-style worlds and arrows are useful because the word **possible** can mean different things.

An arrow might mean:

> could physically happen from here.

But it might instead mean:

> could happen later.

or:

> is compatible with what Alice knows.

or:

> satisfies the rules we are supposed to follow.

That lets variants of modal logic model **time, knowledge and obligation**.

The mathematics may look similar while the interpretation changes.

## Temporal logic: arrows as time

Suppose each world represents a moment or state in time.

An arrow might mean:

> this state can lead to that later state.

Then modal-style operators can express temporal ideas such as:

- P will be true sometime in the future;
- P will remain true at every future point;
- P was true sometime in the past;
- P has always been true.

Arthur Prior's work in the 1950s helped establish modern tense logic by treating tense as something logic could represent formally rather than merely as grammar.

The important idea for us is not the historical notation.

It is this:

> Replace “accessible alternative” with “relevant time-state,” and the world-and-arrow machinery becomes a logic of time.

A temporal accessibility relation is usually **directional**:

- Tomorrow is later than today.
- Today is not later than tomorrow.

That immediately tells us why an S5-style “every world mutually accesses every other” relation would usually be a terrible model of ordinary time.

The intended meaning of the arrows determines which frame properties make sense.

## Epistemic logic: arrows as information

Now suppose the worlds represent complete situations and the arrows mean:

> this world is compatible with what Alice knows.

If Alice cannot distinguish the actual world from three alternatives, those alternatives are epistemically accessible for Alice.

Write informally:

$$
K_A P
$$

for:

> Alice knows P.

A standard possible-worlds idea is:

> Alice knows P when P is true in every world compatible with Alice's information.

Suppose Alice sees a closed box but cannot see inside it.

She considers three worlds possible:

- red ball inside;
- blue ball inside;
- green ball inside.

If **all three** worlds contain exactly one ball, then Alice may know:

> There is one ball in the box.

But she does not know:

> The ball is red.

because at least one world compatible with her information makes that false.

Knowledge becomes another “check all accessible alternatives” operation.

## Knowledge versus belief

A common idealization treats knowledge as **factive**:

$$
K_A P → P
$$

The key contrast is:

- If Alice knows P, P is true.
- Belief does not have that guarantee.
- Someone can believe a false proposition.

This is one reason epistemic and doxastic logics — logics of knowledge and belief — may use different assumptions.

Jaakko Hintikka's *Knowledge and Belief* (1962) was foundational in developing this style of formal epistemic analysis.

## Deontic logic: arrows as ideal or permitted states

Now change the interpretation again.

Suppose arrows point toward worlds that satisfy the relevant norms or standards.

Then:

> P is obligatory

can be modeled roughly as:

> P holds in every relevant normatively ideal world.

And:

> P is permitted

can be treated roughly as:

> there is at least one normatively acceptable world in which P holds.

G. H. von Wright's 1951 paper “Deontic Logic” was a foundational early treatment of this kind of formal reasoning about obligation, permission and prohibition.

There is an immediate difference from knowledge.

If:

> You ought to pay the bill.

that does **not** imply:

> You actually pay the bill.

Obligations can be violated.

So we should not automatically force the actual world to be one of the ideal worlds.

That would make:

$$
O(P) → P
$$

valid — effectively saying every obligation is always fulfilled.

That is plainly not what “ought” means.

This is another example of why the geometry cannot be chosen independently of the interpretation.

## Same skeleton, different meaning

The reusable structure is:

1. choose a set of states/worlds;
2. define what the arrows mean;
3. define an operator by quantifying over the worlds reached by those arrows;
4. ask which properties the arrows should have.

Then the application changes.

| Logic | A world can represent | Accessibility can mean |
|---|---|---|
| Temporal | a moment or possible state in time | later/reachable in time |
| Epistemic | a complete possible situation | compatible with an agent's information |
| Deontic | a possible situation | normatively ideal/acceptable relative to a standard |

The table looks simple, but it exposes something deep:

> modal logic is not primarily about a particular subject. It is a reusable architecture for reasoning over structured alternatives.

## Do not over-unify them

The similarity is powerful, but it can also mislead.

- Time, knowledge and obligation are not literally the same concept.
- Their accessibility relations may need very different properties.

For example:

- time is typically directional;
- idealized knowledge is factive;
- obligation can be violated in actuality.

So “use possible worlds” is the beginning of the modeling problem, not the end.

> **Main message:** The same world-and-arrow machinery can model very different ideas because the meaning of an accessibility arrow is supplied by the application.
