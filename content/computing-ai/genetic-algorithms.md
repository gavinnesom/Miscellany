---
title: "Genetic Algorithms"
slug: "genetic-algorithms"
category: "computing-ai"
topic: "algorithms-computation"
tags:
  - optimization
  - evolution
  - search
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: []
sources:
  - label: "John Holland, *Adaptation in Natural and Artificial Systems* (1975/1992)"
  - label: "Mitchell, *An Introduction to Genetic Algorithms* (MIT Press)"
    url: "https://mitpress.mit.edu/9780262631853/an-introduction-to-genetic-algorithms/"
books: []
image:
  url: "/images/entry-genetic-algorithms.svg"
  alt: "Explanatory diagram for Genetic Algorithms."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "genetic-algorithms:fitness-function-both-power-danger-genetic-algorithm"
    version: 1
    question: "Why is the fitness function both the power and the danger of a genetic algorithm?"
    answer: "Evolution supplies the search metaphor, but the fitness function defines what “better” means. A GA can become extremely good at exploiting the wrong objective."
    rubric: Correct if the answer conveys the canonical idea that Evolution supplies the search metaphor, but the fitness function defines what better means. A GA can become extremely good at exploiting the wrong objective.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

A **genetic algorithm (GA)** searches by maintaining a *population* of candidate solutions rather than improving one solution along a single path.

A typical generation:

- evaluate each candidate with a **fitness function**;
- preferentially select candidates to reproduce;
- combine information through **crossover/recombination**;
- introduce variation through **mutation**;
- form the next population and repeat.

> **Big idea:** Evolution supplies the search metaphor, but the fitness function defines what “better” means. A GA can become extremely good at exploiting the wrong objective.

Compared with gradient descent, GAs do not require differentiability and can search discrete, irregular, or simulation-defined spaces. The price is usually many more objective evaluations. They also provide no general guarantee of finding the global optimum.

Population diversity matters. Too much selection pressure can cause **premature convergence**; too little selection means little progress. Mutation is not there merely to imitate biology — it helps reintroduce/search variation that selection and crossover may lose.

For your GA Playground, useful methods such as tournament selection and rank selection are different ways of controlling how strongly fitness differences translate into reproduction.
