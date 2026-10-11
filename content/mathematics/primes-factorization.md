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
date_updated: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - modular-arithmetic
    - gcd-euclidean-algorithm
sources:
  - label: "Rivest, Shamir and Adleman — original RSA paper, Section IX"
    url: "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
  - label: "Ben Lynn, Stanford — Euclid and Bézout coefficients"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/euclid.html"
  - label: "Agrawal, Kayal and Saxena — PRIMES is in P"
    url: "https://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf"
  - label: "William Stein — Fermat factorization when primes are close"
    url: "https://wstein.org/edu/2007/spring/ent/ent-html/node44.html"
books: []
quiz:
  - question_id: "primes-factorization:unique-factors"
    version: 2
    status: "active"
    question: "How does Euclid's lemma rule out two different prime factorizations of an integer greater than 1, and why exclude 1?"
    answer: "A prime dividing a product must divide a factor. A prime in one factorization therefore equals a prime in the other; cancel matching primes and repeat until all factors match. Allowing 1 would permit arbitrary extra factors of 1."
    rubric: "Require prime divides a product implies it divides a factor, matching prime factors and repeated cancellation, and arbitrary factors of 1 as the reason for exclusion."
  - question_id: "primes-factorization:rsa-factor-asymmetry"
    version: 1
    status: "active"
    question: "Why are prime factors useful in RSA, and is difficult factoring a proved impossibility?"
    answer: "Multiplying chosen large primes is efficient; recovering suitably chosen large prime factors from their product is believed difficult for classical computers. Knowing the factors reveals the totient and enables computation of the private exponent. This is practical hardness, not a proof of impossibility."
    rubric: "Require multiplication versus factor recovery, the role of factors in finding the private exponent, and no claim of proved impossibility."
  - question_id: "primes-factorization:testing-versus-factoring"
    version: 1
    status: "active"
    question: "Why can fast primality testing coexist with difficult factorization?"
    answer: "Testing decides whether an integer is prime; it can establish compositeness without recovering factors. Factoring must produce the ingredients. Trial division is slow in the binary input length, but it is not the best primality test or general factoring method."
    rubric: "Require decision versus factor recovery, and recognition that trial division does not set the complexity of all algorithms."
  - question_id: "primes-factorization:fermat-close-factors"
    version: 1
    status: "active"
    question: "Why does 102 squared minus 10403 equal to 1 expose factors immediately, and why does this not make all semiprimes easy?"
    answer: "10403=102 squared minus 1 squared=(102-1)(102+1)=101 times 103. Fermat searches from the ceiling of the square root; close factors put their mean near that start, whereas widely separated factors can require many increments."
    rubric: "Require the factors 101 and 103 through difference of squares, and factor closeness determining how near the successful mean is to the square root."
---

Why should different ways of breaking a number apart always reach the same prime ingredients? And if those ingredients are unique, why can finding them be difficult? These are separate questions: a theorem can guarantee an answer without supplying a fast way to calculate it.

A **prime** is an integer greater than 1 whose only positive divisors are 1 and itself. A composite integer has a factorization into smaller integers greater than 1. Repeatedly splitting composite factors must terminate because the factors decrease, so every integer greater than 1 has a prime factorization. For example, splitting 60 as \(6×10\) or \(4×15\) ends at \(2²×3×5\).

**Big idea:** Existence comes from splitting into smaller integers. Uniqueness comes from a stronger property: a prime cannot divide a product without dividing at least one of its factors.

## Why the prime ingredients cannot change

That property is **Euclid's lemma**. If a prime p divides ab but does not divide a, then the greatest common divisor of p and a is 1: a prime has no other possible common divisor. Bézout's identity, obtained by [extended Euclid](/entry/modular-inverses), gives integers x and y such that:

$$
px+ay=1.
$$

Multiply by b:

$$
pbx+aby=b.
$$

Both terms on the left are divisible by p, so b must be divisible by p. This proves the lemma. The coefficients may be negative; divisibility works for integer combinations, not just positive sums.

Now suppose an integer had two prime factorizations. Pick a prime p from the first. It divides the product in the second, so repeated use of the lemma shows that p divides one of its prime factors. That factor must be p itself. Cancel the matching p and repeat. Neither side can have factors left over when the other reaches 1, because a product of primes is greater than 1. Thus the factorizations differ only in order: the **fundamental theorem of arithmetic**.

For a concrete instance of the lemma, \(7×1+3×(-2)=1\). Multiplying by 14 gives \(98-84=14\): since 7 divides \(3×14\) but not 3, it has to divide 14. The prime assumption matters. Although 6 divides \(2×3\), it divides neither factor; a composite can distribute its prime ingredients across the product.

The number 1 is neither prime nor composite. Treating it as prime would let us insert arbitrarily many factors of 1 into a supposedly unique list. Repeated factors of a real prime are meaningful: 12 contains two factors of 2 and one of 3. The prime 2 is the only even prime, because any larger even integer already has a proper divisor 2.

## Testing is different from recovering factors

**Primality testing** asks whether n is prime. **Factorization** asks for its prime ingredients. A test may report that n is composite without producing any factor.

Trial division can do both jobs for small numbers. It is enough to check divisors through √n: if \(n=ab\) and both a and b exceeded √n, their product would exceed n. Once a divisor is found, divide it out and continue to factor the remaining number.

But measure computation against the length of the input. A k-bit integer lies between 2 raised to k−1 and 2 raised to k; checking every candidate through its square root takes on the order of **2 raised to k/2** trials in the worst case. Adding two bits roughly doubles that search range. Testing only primes improves the count but does not turn trial division into a polynomial-time method in k.

Modern primality tests do far better. The AKS theorem proves that a deterministic test can decide primality in time polynomial in the bit length. Practical randomized tests such as Miller–Rabin are also fast, with controlled error when used correctly. This lets RSA key generation test candidate primes without factoring every candidate. No general polynomial-time **classical** factoring algorithm is known; that is a statement about present knowledge, not a proof that none can exist.

## A second method: find a difference of squares

An odd integer can be searched for in the form:

$$
n=a²-b²=(a-b)(a+b).
$$

**Fermat factorization** starts at the smallest integer a at least √n and increases a until a²−n is a perfect square b². For \(n=5959\), 77² is too small, so start at 78:

| a | a²−5959 | A square? |
| --- | --- | --- |
| 78 | 125 | No |
| 79 | 282 | No |
| 80 | 441 = 21² | Yes |

Therefore:

$$
5959=(80-21)(80+21)=59×101.
$$

Both factors are prime: testing the primes up to their square roots verifies this. The method would give an ordinary factor pair even if either factor were composite; full factorization would then continue.

Why does closeness help? For odd factors p and q, the successful values are \(a=(p+q)/2\) and \(b=|p-q|/2\). Expanding their squares gives a²−n=b², hence:

$$
a-√n=b²/(a+√n).
$$

When the factors are close, b is small and the successful a is close to the starting point. For \(10403=101×103\), the very first attempt succeeds: \(102²-10403=1\). By contrast, \(303=3×101\) needs a to reach 52 from a starting value of 18; trial division finds 3 immediately. Fermat is useful for a particular structure, not a universal replacement for better general algorithms. For a prime, it eventually reaches only the trivial pair 1 and n.

## What RSA actually assumes

RSA chooses large distinct primes and publishes their product. Multiplication is efficient in their bit lengths; reversing it must uncover hidden factors rather than perform ordinary division by a known operand. **Uniqueness is no guarantee of an efficient search.**

Knowing the factors gives the totient \((p-1)(q-1)\), which permits calculation of the private exponent. Suitably chosen large factors make this route difficult for known classical methods; exceptionally close primes illustrate why size alone is insufficient. Factoring the modulus is enough to recover the key, but every possible RSA attack has not been proved equivalent to factoring. Padding flaws, implementation mistakes, and a sufficiently capable quantum computer are separate considerations; the [RSA article](/entry/rsa-first-principles) explains why the arithmetic primitive alone is not a secure encryption scheme.

Next, [modular arithmetic](/entry/modular-arithmetic) explains why RSA computes remainders instead of retaining enormous powers.
