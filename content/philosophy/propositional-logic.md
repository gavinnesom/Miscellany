---
title: "Propositional Logic"
slug: "propositional-logic"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - propositional-logic
  - truth-tables
  - deduction
date_added: "2026-08-15"
relationships:
  parent:
    - logic-from-zero
  deeper:
    - predicate-logic
  related: []
related: []
sources:
  - label: "forall x - Propositional Logic"
    url: "https://forallx.openlogicproject.org/bookml/Ch4.html"
books: []
image:
  url: "/images/propositional-implication-states.svg"
  alt: "Four possible truth-value states for P and Q, highlighting that P implies Q is false only when P is true and Q is false."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "propositional-logic:truth-table-rows"
    version: 1
    question: "With n independent propositions, how many rows are needed in a complete truth table?"
    answer: "2^n rows, because each proposition can independently be true or false."
    rubric: Correct if the answer conveys the canonical idea that 2^n rows, because each proposition can independently be true or false.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "propositional-logic:implication-false-case"
    version: 1
    question: "What is the only truth-value combination that makes P -> Q false?"
    answer: "P is true and Q is false."
    rubric: Correct if the answer conveys the canonical idea that P is true and Q is false.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "propositional-logic:argument-p-then-q-q-therefore-p"
    version: 1
    question: "Why is the argument \"If P then Q; Q; therefore P\" invalid?"
    answer: "Q may be true for some other reason. This invalid form is called affirming the consequent."
    rubric: Correct if the answer conveys the canonical idea that Q may be true for some other reason. This invalid form is called affirming the consequent.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Propositional logic begins by deliberately throwing away most of what sentences mean.

Take:

> The cat is asleep.

Call the entire statement \(P\).

And:

> The door is open.

Call that \(Q\).

Propositional logic treats \(P\) and \(Q\) as indivisible blocks and studies what happens when we combine them.

## Five basic operations

| Symbol | Meaning | Example |
|---|---|---|
| \(\neg P\) | NOT P | The cat is not asleep |
| \(P \land Q\) | P AND Q | The cat is asleep and the door is open |
| \(P \lor Q\) | P OR Q | The cat is asleep or the door is open |
| \(P \rightarrow Q\) | IF P THEN Q | If the cat is asleep, the door is open |
| \(P \leftrightarrow Q\) | P IFF Q | The cat is asleep exactly when the door is open |

Here `OR` normally means **inclusive OR**: P, Q, or both.

That differs from conversational statements such as "soup or salad," where context often implies one but not both.

## Truth tables

With one proposition \(P\), there are only two possibilities:

- true
- false

With two independent propositions \(P,Q\), there are:

$$
2^2 = 4
$$

possible combinations.

With three:

$$
2^3 = 8
$$

In general, \(n\) propositions require:

$$
2^n
$$

truth-table rows.

That exponential growth is our first tiny taste of why brute-force logical reasoning eventually becomes computationally expensive.

## The strange one: IF P THEN Q

The truth table for implication is:

| P | Q | \(P \rightarrow Q\) |
|---|---|---|
| True | True | True |
| True | False | **False** |
| False | True | True |
| False | False | True |

The last two rows usually feel odd initially.

A better intuition is to treat:

> If P, then Q

as imposing **one prohibition**:

> **P is not allowed to occur without Q.**

Only the combination

$$
P = \text{true}, \qquad Q = \text{false}
$$

violates the rule.

If P never happens, the condition has not been violated.

Think of:

> If it rains, I will bring an umbrella.

The one situation that proves the promise false is:

> it rains, and I do not bring an umbrella.

A sunny day tells you very little about the promise.

That is why formal implication differs from the richer causal implications of ordinary English.

## Modus ponens

Now we can represent a classic valid pattern:

$$
P \rightarrow Q
$$

$$
P
$$

therefore

$$
Q
$$

Example:

> If the switch is closed, current flows.  
> The switch is closed.  
> Therefore current flows.

This form is called **modus ponens**.

The subject matter does not matter to validity. Cats, electrons, governments and imaginary dragons all behave identically once represented by the same logical structure.

That abstraction is the point.

## A tempting invalid argument

Compare:

$$
P \rightarrow Q
$$

$$
Q
$$

therefore

$$
P
$$

This is **not** valid.

> If it rains, the street gets wet.  
> The street is wet.  
> Therefore it rained.

Maybe.

Or perhaps a sprinkler ran.

This mistake is called **affirming the consequent**.

Formal notation is useful partly because it strips away a convincing story and exposes that two arguments have the same underlying structure.

## Tautologies and contradictions

Some compound propositions are true however their components turn out.

$$
P \lor \neg P
$$

is a **tautology** in classical propositional logic.

Others can never be true:

$$
P \land \neg P
$$

is a **contradiction**.

Everything else is **contingent**: sometimes true, sometimes false.

These ideas will matter enormously when we eventually ask what is **necessarily** true rather than merely actually true.

> **Main message:** Propositional logic ignores the internal structure of statements and studies the logical machinery connecting whole statements.

That simplification makes truth-table reasoning possible, but it also creates the limitation that motivates predicate logic.
