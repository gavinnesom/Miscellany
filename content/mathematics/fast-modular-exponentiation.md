---
title: "Fast Modular Powers: Repeated Squaring"
slug: "fast-modular-exponentiation"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - algorithms
  - exponentiation
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - modular-inverses
    - euler-totient-theorem
sources:
  - label: "Ben Lynn, Stanford — Modular Exponentiation"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/exp.html"
books: []
quiz:
  - question_id: "fast-modular-exponentiation:binary-power-mechanism"
    version: 1
    status: "active"
    question: "How does repeated squaring avoid computing a huge power first?"
    answer: "Write the exponent as a sum of powers of two, repeatedly square the base while reducing modulo n, and multiply only the residues for the selected powers. Congruence is preserved throughout."
    rubric: "Require repeated squares, binary decomposition or selected powers, and intermediate modular reduction."
  - question_id: "fast-modular-exponentiation:rsa-power-twenty-seven"
    version: 1
    status: "active"
    question: "Which powers of two are multiplied when calculating a to the power 27 by repeated squaring?"
    answer: "Use powers 16, 8, 2 and 1 because 27=16+8+2+1; the power 4 is computed along the way but is not multiplied into the final result."
    rubric: "Require 16, 8, 2, 1 and exclusion of 4 from the final product."
---

Computing \(13²⁷\) as an ordinary integer creates a large number only to discard almost all of it when taking a remainder. Repeated squaring keeps the part we need at every step.

The trick is to make powers \(a¹,a²,a⁴,a⁸,…\). Each is the square of the previous one. Write the requested exponent as a sum of powers of two, then multiply the corresponding results. Since addition and multiplication preserve congruence, every intermediate value may be reduced modulo n.

## Decrypting the future RSA example

We want 13²⁷ (mod 55). Here are the actual reduced squares:

| Power | Calculation from previous residue | Residue modulo 55 |
| --- | --- | --- |
| 1 | Start with 13 | 13 |
| 2 | \(13²=169=3×55+4\) | 4 |
| 4 | \(4²=16\) | 16 |
| 8 | \(16²=256=4×55+36\) | 36 |
| 16 | \(36²=1296=23×55+31\) | 31 |

Because \(27=16+8+2+1\), select the residues 31, 36, 4 and 13. The power-4 row helps us compute higher squares but is not part of the final product.

$$
13²⁷≡31×36×4×13
≡16×4×13
≡9×13
≡7 (mod 55).
$$

Check the three reductions: \(31×36=1116=20×55+16\); \(16×4=64=55+9\); \(9×13=117=2×55+7\). No step needs the full integer \(13²⁷\).

## Why it scales

An exponent with k binary digits needs about k squaring stages, plus at most k selected multiplications, instead of a number of multiplications proportional to the exponent itself. The intermediate residues remain below n; a product before reduction can be as large as (n-1)².

This makes the modular exponentiation operations in RSA practical even when the exponent has hundreds or thousands of bits. It does not make every inverse problem easy: efficient forward computation is different from recovering a secret exponent or factoring a modulus.

The method explains **how to calculate** the power. [Euler's theorem](/entry/euler-totient-theorem) explains why a carefully chosen exponent returns the original message.

