---
title: "Logic from Zero: Arguments, Truth and Validity"
slug: "logic-from-zero"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - reasoning
  - deduction
  - validity
date_added: "2026-08-15"
relationships:
  parent: []
  deeper:
    - propositional-logic
  related: []
related: []
sources:
  - label: "forall x - An Introduction to Formal Logic"
    url: "https://forallx.openlogicproject.org/"
books: []
image:
  url: "/images/logic-validity-forbidden-case.svg"
  alt: "Diagram showing that a valid argument excludes the one combination in which all premises are true and the conclusion is false."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "logic-from-zero:argument-logically-valid-even-conclusion-false"
    version: 1
    question: "Can an argument be logically valid even if its conclusion is false?"
    answer: "Yes. Validity requires only that there is no case where all the premises are true and the conclusion false. A valid argument may still contain false premises and therefore a false conclusion."
    rubric: Correct if the answer conveys the canonical idea that Yes. Validity requires only that there is no case where all the premises are true and the conclusion false. A valid argument may still contain false premises and therefore a. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "logic-from-zero:turns-valid-argument-into-sound-argument"
    version: 1
    question: "What turns a valid argument into a sound argument?"
    answer: "Its premises are true as well as the reasoning being valid."
    rubric: Correct if the answer conveys the canonical idea that Its premises are true as well as the reasoning being valid.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "logic-from-zero:argument-made-entirely-true-statements-necessarily-valid"
    version: 1
    question: "Why is an argument made entirely of true statements not necessarily valid?"
    answer: "Because validity concerns whether the conclusion follows from the premises, not whether the individual statements happen to be true."
    rubric: Correct if the answer conveys the canonical idea that Because validity concerns whether the conclusion follows from the premises, not whether the individual statements happen to be true.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Logic is mostly not about deciding whether a statement is true. It is about asking:

> **If these starting claims are true, what else must follow?**

An **argument** has one or more **premises** and a **conclusion**:

- Premise: All planets are made of cheese.
- Premise: Earth is a planet.
- Conclusion: Therefore, Earth is made of cheese.

This is a ridiculous argument, but an important one. The first premise is false and the conclusion is false, yet the **reasoning is valid**. If both premises *were* true, the conclusion could not be false.

## Truth and validity are different things

**Truth** is a property of statements.

> Earth orbits the Sun.

is true.

**Validity** is a property of arguments. An argument is valid when there is **no possible situation in which all its premises are true and its conclusion is false**.

That means you can have arguments involving:

| Premises/conclusion | Reasoning |
|---|---|
| True statements | Valid |
| False statements | Valid |
| True statements | Invalid |
| False statements | Invalid |

For example:

- Paris is in France.
- 2 + 2 = 4.
- Therefore, water freezes at 0 °C at one atmosphere.

Every sentence is true. The argument is nevertheless **invalid**: the first two facts give you no reason to conclude the third.

That is surprisingly important. **A pile of truths is not automatically an argument.**

## Soundness

A **sound** argument is:

1. valid, **and**
2. based on true premises.

So validity checks the logical machinery; soundness adds a reality check.

A useful mental model:

- **validity:** does the transmission work?
- **soundness:** is the information entering it actually correct?

## Deduction

The first part of this Logic curriculum is mainly about **deductive reasoning**: conclusions that must follow if the premises are true.

That is different from reasoning such as:

> Every swan I have seen is white, so the next swan will probably be white.

That may be sensible **inductive** reasoning, but the conclusion is not logically guaranteed.

Formal logic deliberately sets the probabilistic question aside and asks a stronger one:

> Could the premises all be true while the conclusion was false?

If yes, the deduction is invalid.

## Syntax and semantics

We will use this distinction repeatedly.

**Syntax** concerns the formal expressions and rules themselves: which symbols can be combined, what counts as a legitimate formula, and which manipulations are permitted.

**Semantics** concerns what those expressions mean and the conditions under which they are true.

A chess analogy is useful:

- syntax is rather like the rules governing legal moves;
- semantics is what position those pieces actually represent and what is true about that position.

Later, Kripke models will make this distinction much more concrete.

> **Main message:** Logic separates "is this true?" from "does this follow?"

That sounds like a small distinction. Almost everything else in the Logic family grows out of it.
