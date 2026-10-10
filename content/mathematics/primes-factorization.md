---
title: "Primes and Factorization"
slug: "primes-factorization"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - primes
  - factorization
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - modular-arithmetic
sources:
  - label: "Rivest, Shamir and Adleman — original RSA paper, Section IX"
    url: "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
books: []
quiz:
  - question_id: "primes-factorization:unique-factors"
    version: 1
    status: "active"
    question: "What does unique prime factorization say, and why is 1 excluded from the primes?"
    answer: "Every integer greater than 1 has a prime factorization unique apart from order. Excluding 1 prevents arbitrarily many extra factors of 1 from destroying uniqueness."
    rubric: "Require uniqueness up to order, restriction to integers greater than 1, and the reason excluding 1 matters."
  - question_id: "primes-factorization:rsa-factor-asymmetry"
    version: 1
    status: "active"
    question: "Why are prime factors useful in RSA, and is difficult factoring a proved impossibility?"
    answer: "Multiplying chosen large primes is efficient; recovering suitably chosen large prime factors from their product is believed difficult for classical computers. Knowing the factors reveals the totient and enables computation of the private exponent. This is practical hardness, not a proof of impossibility."
    rubric: "Require multiplication versus factor recovery, the role of factors in finding the private exponent, and no claim of proved impossibility."
---

A prime is an integer greater than 1 whose only positive divisors are 1 and itself. Primes are the multiplicative building blocks of positive integers: a composite number can be broken into smaller factors until only primes remain.

For example, 60 can be split as \(6×10\) or \(4×15\). Both routes end at the same pieces:

$$
60=2²×3×5.
$$

**Big idea:** The route through a factor tree can change; the final prime pieces cannot. This is the fundamental theorem of arithmetic: every integer greater than 1 has a prime factorization unique apart from the order of its factors.

## What counts as prime?

- 2 is prime and is the only even prime.
- 1 is neither prime nor composite. Calling it prime would allow unlimited extra factors of 1 in a “unique” factorization.
- A prime can appear more than once: 12 contains two factors of 2 and one of 3.

To test a small integer for primality by trial division, it is enough to look for prime divisors up to its square root. If \(n=ab\) is composite and both factors exceeded \(√n\), their product would exceed \(n\). At least one factor must therefore be small enough to find. For 55, trying 2, 3 and 5 already finds \(55=5×11\).

## A product can hide its ingredients

Multiplying 5 by 11 is easy, and factoring 55 is easy too. The RSA idea uses the same direction asymmetry at a vastly larger scale: key generation chooses large primes, multiplies them, and publishes their product. The factors remain secret because they let the owner calculate the inverse exponent used for decryption.

For suitably chosen large prime factors, no efficient general classical factoring algorithm is known. That is a practical security assumption, not a theorem that factorization is impossible. Some numbers have easy factors; a sufficiently capable quantum computer would also change the assumption. Factoring an RSA modulus is enough to break its underlying key, but breaking every RSA instance has not been proved equivalent to factoring.

Next, [modular arithmetic](/entry/modular-arithmetic) explains why RSA computes remainders instead of retaining enormous powers.

