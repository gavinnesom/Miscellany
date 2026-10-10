---
title: "Modular Arithmetic: Numbers on a Clock"
slug: "modular-arithmetic"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - remainders
  - congruence
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - primes-factorization
    - gcd-euclidean-algorithm
sources:
  - label: "Ben Lynn, Stanford — Modular Arithmetic"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/arith.html"
books: []
image:
  url: "/images/modular-residue-wheel.svg"
  alt: "A twelve-position residue wheel: five clockwise steps from 10 wrap through 0 and land at 3."
  credit: "Local original arithmetic diagram"
  provenance: "local"
quiz:
  - question_id: "modular-arithmetic:same-remainder"
    version: 1
    status: "active"
    question: "What does a ≡ b modulo n mean?"
    answer: "The integers a and b differ by a multiple of positive n, equivalently they have the same remainder on division by n."
    rubric: "Require equal remainders or n dividing a minus b; do not require equal ordinary integers."
  - question_id: "modular-arithmetic:reduce-during-calculation"
    version: 1
    status: "active"
    question: "Why may intermediate sums and products be reduced modulo n?"
    answer: "Replacing a number by a congruent remainder changes it by a multiple of n, and addition and multiplication preserve congruence. The final remainder therefore stays the same."
    rubric: "Require preservation of congruence under addition and multiplication, rather than only saying it keeps numbers small."
---

A clock forgets complete turns. Starting at 10 on a twelve-hour clock and moving forward 5 hours lands at 3: \(10+5=15\), but 15 and 3 differ by one full turn of 12.

Modular arithmetic formalizes that kind of forgetting. The **modulus** \(n\) is a positive integer specifying the turn size. We write a≡ b (mod n), read “a is congruent to b modulo n,” when \(n\) divides \(a-b\). Equivalently, a and b have the same remainder. Congruence is not ordinary equality: 15 is not 3, even though they occupy the same place modulo 12.

## Choosing a representative

The usual representatives modulo \(n\) are \(0,1,…,n-1\). On our clock, 0 corresponds to the dial's 12. Negative numbers work too: -1≡11 (mod 12), because their difference is \(-12\). Moving backward one step from 0 lands at 11.

For the RSA example later:

$$
343=6×55+13,    343≡13 (mod 55).
$$

The phrase “343 modulo 55” commonly asks for the representative 13; the congruence statement describes a relationship between integers.

## Reduce along the way

Adding or multiplying congruent numbers preserves congruence. Suppose \(a=r+kn\) and \(b=s+\ell n\). Their sum differs from \(r+s\) by a multiple of \(n\); their product differs from \(rs\) by a multiple of \(n\) too. This is why intermediate remainders are safe:

$$
17×19≡5×7=35≡11 (mod 12).
$$

The full product is 323, which also leaves remainder 11. Reduction avoids carrying irrelevant complete turns through a long calculation.

Division needs more care. Modulo 12, \(2×1≡2×7\), although \(1≢7\). Cancelling the 2 loses information because multiplication by 2 merges different residues. We will learn which numbers can be safely “divided by” using [modular inverses](/entry/modular-inverses). First, [the Euclidean algorithm](/entry/gcd-euclidean-algorithm) supplies the test for whether an inverse exists.

