---
title: "Recursion"
slug: "recursion"
category: "computing-ai"
topic: "formal-systems-mind"
tags:
  - computation
  - self-reference
  - algorithms
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: 
    - godel-escher-bach
related:
  - godel-escher-bach
sources:
  - label: "MIT OpenCourseWare — recursion / introductory algorithms material"
    url: "https://ocw.mit.edu/"
  - label: "Python documentation — recursion limit (implementation example)"
    url: "https://docs.python.org/3/library/sys.html#sys.getrecursionlimit"
books: []
image:
  url: "/images/entry-recursion.svg"
  alt: "Explanatory diagram for Recursion."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "recursion:prevents-recursive-definition-simply-referring-itself-forever"
    version: 1
    question: "What prevents a recursive definition from simply referring to itself forever?"
    answer: "Recursion is when a definition or procedure refers to a smaller or simpler instance of itself. A recursive algorithm needs two conceptual pieces: For factorial, In ordinary function recursion, each unfinished call usually occupies a stack f"
    rubric: Correct if the answer conveys the canonical idea that Recursion is when a definition or procedure refers to a smaller or simpler instance of itself. A recursive algorithm needs two conceptual pieces For factorial, In ordinary. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Recursion is when a definition or procedure refers to a **smaller or simpler instance of itself**.

A recursive algorithm needs two conceptual pieces:

- a **base case** that can be solved directly;
- a **recursive step** that reduces the problem toward the base case.

For factorial,

$$
n! = n(n-1)!,\qquad 0!=1.
$$

In ordinary function recursion, each unfinished call usually occupies a **stack frame** containing local state and where execution should return. That makes recursion elegant for trees, divide-and-conquer algorithms, and inductive structures, but very deep recursion can overflow a language/runtime's call stack.

Recursion and iteration are often computationally equivalent ways to express a process. A recursive formulation is not automatically faster, more mathematical, or more intelligent.

The concept becomes stranger with **self-reference**: a system can encode statements or structures that indirectly describe themselves. That is one reason recursion connects naturally to *Gödel, Escher, Bach* — but ordinary recursive programming and Gödelian self-reference are not the same phenomenon.
