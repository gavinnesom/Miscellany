---
title: "GCD and the Euclidean Algorithm"
slug: "gcd-euclidean-algorithm"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - algorithms
  - coprimality
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - modular-arithmetic
    - modular-inverses
    - recursion
sources:
  - label: "Ben Lynn, Stanford — Euclid's Algorithm"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/euclid.html"
books: []
quiz:
  - question_id: "gcd-euclidean-algorithm:remainder-invariant"
    version: 1
    status: "active"
    question: "Why does replacing (a,b) by (b,a modulo b) preserve the greatest common divisor?"
    answer: "Writing a=qb+r, any common divisor of a and b also divides r=a-qb, and any common divisor of b and r also divides a=qb+r. The two pairs have exactly the same common divisors."
    rubric: "Require both directions or an equivalent argument that the common divisors are unchanged."
  - question_id: "gcd-euclidean-algorithm:coprime-not-prime"
    version: 1
    status: "active"
    question: "Must two coprime numbers both be prime? Give an example."
    answer: "No. Coprime means their greatest common divisor is 1; for example 8 and 15 are both composite but share no prime factor."
    rubric: "Require gcd 1 and a correct composite coprime example."
---

Imagine cutting two ropes into equal-length pieces without leaving a remainder. The longest possible piece length is their **greatest common divisor**, abbreviated gcd. For integers, divisors are exact: 6 divides both 48 and 18, and no larger positive integer does.

Two integers are **coprime** when their gcd is 1. Coprime is a relationship, not a claim that either number is prime: 8 and 15 are composite but coprime.

## Keep the remainder, keep the answer

Euclid's algorithm repeatedly divides and replaces the larger problem by a smaller one:

| Division | Next pair |
| --- | --- |
| \(48=2×18+12\) | 18 and 12 |
| \(18=1×12+6\) | 12 and 6 |
| \(12=2×6+0\) | Stop: gcd is 6 |

The last nonzero remainder is the gcd. Why does throwing away the quotient work? If \(a=qb+r\), every common divisor of a and b divides \(r=a-qb\). Conversely, every common divisor of b and r divides \(a=qb+r\). Thus:

$$
gcd(a,b)=gcd(b,r).
$$

The common divisors are preserved at each step. The nonnegative remainders strictly decrease until one is zero, so the process terminates. At that point gcd(b,0)=b: every integer divides 0, and the largest divisor of b is b itself.

## The small calculation RSA needs

Our later example chooses exponent 3 and totient 40. Euclid gives:

$$
40=13×3+1,    3=3×1+0.
$$

So gcd(3,40)=1. This tells us that multiplication by 3 has an inverse modulo 40. Choosing exponent 5 instead would fail: it shares a factor 5 with 40.

Euclid can be written as a loop or by [recursion](/entry/recursion), with the zero remainder as the base case. Its usefulness is not only speed: keeping track of how each remainder was obtained also produces the coefficients needed for [modular inverses](/entry/modular-inverses).

