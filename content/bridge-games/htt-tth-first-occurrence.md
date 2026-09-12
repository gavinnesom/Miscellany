---
title: "Why HTT Beats TTH Head-to-Head"
slug: "htt-tth-first-occurrence"
category: "bridge-games"
topic: "probability-games"
tags:
  - probability
  - games
  - patterns
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: []
sources:
  - label: "Stanford/standard probability treatment of Penney's game; Wikipedia is acceptable for orientation"
    url: "https://en.wikipedia.org/wiki/Penney%27s_game"
  - label: "Feller, *An Introduction to Probability Theory and Its Applications*, pattern waiting/renewal methods."
books: []
image:
  url: "/images/entry-htt-tth-first-occurrence.svg"
  alt: "Explanatory diagram for Why HTT Beats TTH Head-to-Head."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "htt-tth-first-occurrence:htt-tth-each-have-expected-waiting-time"
    version: 1
    question: "How can HTT and TTH each have expected waiting time 8, while HTT still beats TTH 3:1 in a direct race?"
    answer: "Equal standalone waiting times do not imply equal head-to-head chances. Pattern races depend on how prefixes and suffixes overlap with *each other*."
    rubric: Correct if the answer conveys the canonical idea that Equal standalone waiting times do not imply equal head-to-head chances. Pattern races depend on how prefixes and suffixes overlap with *each other*.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

There are two different questions that are easy to accidentally mix up:

1. How long do you wait for **HTT** by itself?
2. If you race **HTT vs TTH**, which pattern appears first?

Individually, they are symmetric in an important sense: neither pattern has a proper prefix that is also a suffix, so each has expected waiting time

$$
E=2^3=8\text{ flips}.
$$

So **HTT and TTH do not differ in their individual expected waiting times**.

But in a direct race, **HTT appears before TTH with probability 3/4**.

The reason is overlapping partial progress. Once an `H` has appeared in the right state, the sequences of future flips that build toward HTT interact differently with the partial matches for TTH. The race is a small finite-state Markov process, not two independent eight-flip timers.

A particularly clean way to see it is to track the longest current suffix that is a prefix of either pattern. Solving the resulting states gives:

$$
P(HTT\text{ before }TTH)=\frac34,
\qquad
P(TTH\text{ before }HTT)=\frac14.
$$

> **Big idea:** Equal standalone waiting times do not imply equal head-to-head chances. Pattern races depend on how prefixes and suffixes overlap with *each other*.

This is the same family of phenomenon behind **Penney's game**, where a carefully chosen length-3 pattern can beat another pattern despite every specific three-flip string having probability 1/8 on any fixed block.
