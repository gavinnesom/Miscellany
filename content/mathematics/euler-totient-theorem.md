---
title: "Euler's Totient and Theorem"
slug: "euler-totient-theorem"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - totient
  - coprimality
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - fast-modular-exponentiation
    - rsa-first-principles
sources:
  - label: "Ben Lynn, Stanford — Units and the Totient Function"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/units.html"
  - label: "Ben Lynn, Stanford — Euler's Theorem"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/order.html"
books: []
quiz:
  - question_id: "euler-totient-theorem:totient-distinct-primes"
    version: 1
    status: "active"
    question: "Why is the totient of pq equal to (p−1)(q−1) for distinct primes?"
    answer: "Among pq residues, exclude q multiples of p and p multiples of q, then restore zero counted twice: pq-q-p+1=(p-1)(q-1). These are exactly the residues coprime to pq."
    rubric: "Require excluding multiples, the overlap correction, and distinct prime assumptions."
  - question_id: "euler-totient-theorem:euler-coprimality"
    version: 1
    status: "active"
    question: "Can Euler's theorem conclude that 5 to the power 40 is 1 modulo 55? Why?"
    answer: "No. Euler's theorem requires the base to be coprime to the modulus, but gcd(5,55)=5. The power remains divisible by 5 and cannot be congruent to 1 modulo 55."
    rubric: "Require coprimality condition and correct reason this example fails."
---

Multiplication modulo n sometimes loses information. Multiplication by a number coprime to n does the opposite: it rearranges all the invertible residues without merging any. Euler's theorem is a consequence of that rearrangement.

The **totient** φ(n), pronounced “phi of n,” counts integers from 1 through n that are coprime to n. For \(n>1\), this is also the number of invertible residues among \(0,…,n-1\). For example, the residues coprime to 10 are 1, 3, 7 and 9, so φ(10)=4.

## Count the usable residues

A prime p has φ(p)=p-1: every nonzero residue is coprime to p.

For **distinct primes** p and q, a residue fails the test exactly when it is divisible by p or q. Among the pq residues, there are q multiples of p and p multiples of q. Their only overlap is 0, counted twice. Inclusion–exclusion gives:

$$
φ(pq)=pq-q-p+1=(p-1)(q-1).
$$

With \(p=5\) and \(q=11\), this is \(55-11-5+1=40\). The other 15 residues share a factor with 55. The formula needs distinct primes: φ(25)=20, not (5-1)²=16.

## The theorem and its mechanism

Euler's theorem says:

$$
gcd(a,n)=1   ⇒    a raised to φ(n)≡1 (mod n).
$$

Multiplying every invertible residue by a produces the same set in a different order. If two products coincided, multiplication by a's inverse would show the originals were the same. Compare the product of the original set with the product of the permuted set: the latter gains φ(n) factors of a. Cancelling the invertible original product leaves a raised to φ(n) congruent to 1 modulo n. This is why the coprimality condition is essential.

For a prime modulus, the theorem becomes Fermat's little theorem: aᵖ⁻¹≡1 (mod p) when p does not divide a.

## The bridge to RSA

Since gcd(7,55)=1, we know 7⁴⁰≡1 (mod 55). Our exponents satisfy \(3×27=81=1+2×40\), so:

$$
(7³)²⁷=7⁸¹
=7(7⁴⁰)²
≡7 (mod 55).
$$

That proves the round trip for 7 and other coprime messages. It does **not** prove the same statement for every message: 5 is not coprime to 55. [RSA from first principles](/entry/rsa-first-principles) handles those messages by reasoning separately modulo each prime.

