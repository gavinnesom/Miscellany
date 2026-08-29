---
title: "Predicate Logic: All, Some and None"
slug: "predicate-logic"
category: "philosophy"
topic: "logic-formal-reasoning"
tags:
  - logic
  - predicate-logic
  - quantifiers
  - formal-reasoning
date_added: "2026-08-15"
relationships:
  parent:
    - propositional-logic
  deeper: []
  related: []
related: []
sources:
  - label: "forall x - Quantifiers and Predicate Logic"
    url: "https://forallx.openlogicproject.org/html/A1.html"
books: []
image:
  url: "/images/predicate-quantifier-scope.svg"
  alt: "Diagram comparing everyone-loves-someone with one-person-loved-by-everyone to show how quantifier order changes meaning."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "predicate-logic:symbol-mean"
    version: 1
    question: "What does the symbol ∀ mean?"
    answer: "\"For every\" or \"for all.\""
    rubric: Correct if the answer conveys the canonical idea that For every or for all.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "predicate-logic:symbol-mean-2"
    version: 1
    question: "What does the symbol ∃ mean?"
    answer: "\"There exists\" or \"there is at least one.\""
    rubric: Correct if the answer conveys the canonical idea that There exists or there is at least one.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "predicate-logic:x-y-loves-x-y-y-x"
    version: 1
    question: "Why are ∀x∃y Loves(x,y) and ∃y∀x Loves(x,y) different?"
    answer: "The first allows each person to love a different someone; the second says there is one particular person whom everyone loves."
    rubric: Correct if the answer conveys the canonical idea that The first allows each person to love a different someone; the second says there is one particular person whom everyone loves.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
  - question_id: "predicate-logic:correct-negation-everyone-passed"
    version: 1
    question: "What is the correct negation of \"Everyone passed\"?"
    answer: "\"At least one person did not pass,\" not \"Nobody passed.\""
    rubric: Correct if the answer conveys the canonical idea that At least one person did not pass, not Nobody passed.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Propositional logic hits a wall surprisingly quickly.

Consider:

> All cats are mammals.  
> Fuzzy is a cat.  
> Therefore Fuzzy is a mammal.

If we replace those sentences with:

$$
P,\quad Q,\quad R
$$

we have thrown away exactly the information that makes the reasoning work.

We need to look **inside** propositions.

## Objects and predicates

Instead of treating:

> Fuzzy is a cat

as one indivisible statement, write something like:

$$
Cat(Fuzzy)
$$

`Fuzzy` names an object.

`Cat(x)` is a **predicate**: something that can be true or false of an object.

Likewise:

$$
Mammal(Fuzzy)
$$

means that Fuzzy has the property of being a mammal.

Now the logical relationship has something to work with.

## "All"

Suppose we want:

> Every cat is a mammal.

First understand the idea:

> For every object we consider, **if it is a cat, then it is a mammal**.

Then introduce the notation:

$$
\forall x\,(Cat(x) \rightarrow Mammal(x))
$$

The symbol

$$
\forall
$$

means **for every**.

Read `∀x` aloud initially as:

> "for every x..."

There is no prize for learning to stare silently at the symbol.

## "Some"

Now:

> Some cat is black.

means:

> There exists at least one object which is both a cat and black.

Notation:

$$
\exists x\,(Cat(x) \land Black(x))
$$

The symbol

$$
\exists
$$

means **there exists**.

Notice how differently `all` and `some` behave. One ranges over every object; the other needs only one successful example.

## Scope changes meaning

Here is where predicate logic becomes genuinely interesting.

Compare:

> Everyone loves someone.

and:

> Someone is loved by everyone.

They sound similar.

Their structures are not.

Everyone loves **someone, perhaps a different person**:

$$
\forall x\,\exists y\,Loves(x,y)
$$

There is **one particular person** loved by everyone:

$$
\exists y\,\forall x\,Loves(x,y)
$$

Simply reversing the quantifiers changes the claim dramatically.

That is worth remembering:

$$
\forall x\exists y
$$

usually does **not** mean the same thing as

$$
\exists y\forall x
$$

## Negation gets interesting too

Negating:

> Everyone passed.

does **not** mean:

> Nobody passed.

It means:

> At least one person did not pass.

Symbolically:

$$
\neg\forall x\,Passed(x)
$$

is equivalent to:

$$
\exists x\,\neg Passed(x)
$$

Likewise:

> It is not true that someone passed

means:

> Nobody passed.

These relationships are the quantifier counterparts of De Morgan-style reasoning.

## Why this matters

Predicate logic can represent structures that propositional logic simply cannot see:

- every
- some
- none
- exactly one
- relations between objects
- nested claims about different objects.

It is expressive enough to formalize enormous parts of mathematics.

But even predicate logic has trouble expressing ideas such as:

> It **must** be true.

> It **could** have been otherwise.

Those are not merely claims about objects in the actual situation.

They compare the actual situation with **alternatives**.

And that gives us our bridge into the centerpiece of the next Logic batch: **Modal Logic and Kripke Worlds**.

Instead of asking only:

> Is P true?

we will ask:

> In which possible worlds is P true, and which of those worlds are accessible from where we currently are?
