---
title: "Modular Inverses and Extended Euclid"
slug: "modular-inverses"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - inverses
  - algorithms
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - gcd-euclidean-algorithm
    - fast-modular-exponentiation
sources:
  - label: "Ben Lynn, Stanford — Euclid's Algorithm and Bézout coefficients"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/euclid.html"
  - label: "Ben Lynn, Stanford — Units and the Totient Function"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/units.html"
books: []
quiz:
  - question_id: "modular-inverses:inverse-existence"
    version: 1
    status: "active"
    question: "When does a have a multiplicative inverse modulo n, and why?"
    answer: "Exactly when gcd(a,n)=1. Bézout gives integers x,y with ax+ny=1, so ax is congruent to 1 modulo n; conversely an inverse implies such an equation and forces every common divisor to divide 1."
    rubric: "Require the gcd condition and Bézout or equivalent reasoning; do not confuse inverse with a reciprocal fraction."
  - question_id: "modular-inverses:three-mod-forty"
    version: 1
    status: "active"
    question: "Use 40=13×3+1 to find the inverse of 3 modulo 40."
    answer: "Rearrange to 1=40-13×3. Thus the inverse is -13, represented as 27 modulo 40; 3×27=81=2×40+1."
    rubric: "Require 27 and the back-substitution or the product leaving remainder 1."
---

An ordinary reciprocal undoes multiplication: multiplying by 3 and then by \(1/3\) returns the starting value. Modulo \(n\), we need an integer that undoes multiplication **up to a remainder**.

An inverse of \(a\) modulo \(n\) is an integer \(x\) satisfying:

$$
ax≡1 (mod n).
$$

The notation a⁻¹ (mod n) means this modular inverse, not the fraction \(1/a\). For \(n>1\), an inverse exists exactly when gcd(a,n)=1.

## Why coprimality matters

Bézout's identity says the gcd of a and n can be written as \(ax+ny\) for some integers x and y. If that gcd is 1, reducing the equation modulo n leaves \(ax≡1\). The coefficient x is the inverse.

Conversely, if ax≡1 (mod n), then \(ax-kn=1\) for an integer k. Any common divisor of a and n must divide the left side, hence must divide 1. The gcd has to be 1.

For a failure case, 2 has no inverse modulo 12. Every product \(2x\) is even; subtracting a multiple of 12 keeps it even, so it cannot leave residue 1. Multiplication by 2 merges residues instead of permuting them.

## Extended Euclid finds the inverse

Ordinary Euclid finds the gcd. **Extended Euclid** also tracks how each remainder is an integer combination of the original numbers, then works backward.

Our RSA example is particularly short:

$$
40=13×3+1
   ⇒   
1=40-13×3.
$$

The coefficient of 3 is \(-13\). Add one modulus to get the usual representative: \(-13+40=27\). Check independently:

$$
3×27=81=2×40+1.
$$

For a longer back-substitution, \(26=3×7+5\), \(7=1×5+2\), and \(5=2×2+1\). Therefore 1=5-2(7-5)=3(26-3×7)-2×7=3×26-11×7. The inverse of 7 modulo 26 is \(-11≡15\), and \(7×15=105≡1\).

In RSA, 27 will undo exponent 3 in the exponent arithmetic modulo 40. Actually raising a ciphertext to that power is a separate job: [fast modular exponentiation](/entry/fast-modular-exponentiation).

