---
title: "RSA from First Principles"
slug: "rsa-first-principles"
category: "mathematics"
topic: "number-theory-cryptography"
tags:
  - number-theory
  - cryptography
  - rsa
date_added: "2026-10-10"
relationships:
  parent: []
  deeper: []
  related:
    - euler-totient-theorem
    - primes-factorization
    - modular-inverses
    - fast-modular-exponentiation
sources:
  - label: "Rivest, Shamir and Adleman — original RSA construction"
    url: "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
  - label: "RFC 8017 — RSA definitions, OAEP encryption and PSS signatures"
    url: "https://www.rfc-editor.org/rfc/rfc8017.html"
  - label: "Ben Lynn, Stanford — Chinese Remainder Theorem"
    url: "https://crypto.stanford.edu/pbc/notes/numbertheory/crt.html"
books: []
quiz:
  - question_id: "rsa-first-principles:exponents-and-correctness"
    version: 1
    status: "active"
    question: "Why choose ed congruent to 1 modulo phi(n), and what extra argument handles non-coprime messages?"
    answer: "It makes ed=1+k phi(n), so Euler's theorem recovers coprime messages. For any message, work modulo each distinct prime: a divisible message stays zero; otherwise Fermat applies because each prime minus 1 divides ed-1. Agreement modulo both primes gives agreement modulo their product."
    rubric: "Require exponent condition, Euler's restricted domain, and the zero/Fermat split plus combining prime congruences."
  - question_id: "rsa-first-principles:textbook-security"
    version: 1
    status: "active"
    question: "Why are large primes alone insufficient to make textbook RSA secure?"
    answer: "Textbook RSA is deterministic and algebraically malleable. Real encryption requires a vetted scheme such as RSA-OAEP, commonly used to protect a symmetric key in hybrid encryption; signatures use a separate scheme such as RSA-PSS with hashing and encoding."
    rubric: "Require determinism or malleability plus vetted encoding/padding; distinguish signing from simply encrypting with a private key."
---

A public-key system lets anyone encrypt for a recipient while only the recipient can decrypt. RSA builds that separation from a modulus whose prime factors the owner knows. The mathematics is a reversible operation with a secret shortcut; a secure encryption scheme needs additional encoding and protocol rules.

## Make a toy key

Choose distinct primes \(p=5\) and \(q=11\). Then \(n=pq=55\) and φ(n)=(p-1)(q-1)=40. Choose a public exponent e coprime to 40: \(e=3\). Extended Euclid supplies its inverse, \(d=27\), because 3×27=81≡1 (mod 40).

| Quantity | Toy value | Role |
| --- | --- | --- |
| Public key (n,e) | (55, 3) | Anyone can apply the forward power |
| Private exponent d | 27 | Owner applies the reverse power |
| Prime factors p, q | 5, 11 | Secret information enabling the reverse exponent |

Real private-key representations also retain factors and other values for efficient computation. Using an inverse modulo the totient is sufficient here; standards can instead express the condition modulo λ(n)=lcm(p-1,q-1), the least common multiple.

## Send 7, recover 7

For the arithmetic primitive, represent a message as an integer m with \(0≤ m<n\). Encryption computes ciphertext c≡ mᵉ (mod n); decryption computes m'≡ cᵈ (mod n), choosing the representative in the same range.

$$
m=7,    c=7³ mod 55=343 mod 55=13.
$$

[Repeated squaring](/entry/fast-modular-exponentiation) gives residues 13, 4, 16, 36 and 31 for powers 1, 2, 4, 8 and 16. Since \(27=16+8+2+1\), decryption is:

$$
13²⁷≡31×36×4×13
≡16×4×13
≡9×13
≡7 (mod 55).
$$

This is a demonstration, not a secure key: an observer can factor 55 immediately.

## Why every representative comes back

For coprime m, Euler gives \(m⁴⁰≡1\), so m⁸¹=m(m⁴⁰)²≡ m (mod 55). But Euler cannot be applied to a message such as 5.

For the general case, let r be either prime p or q:

- If r divides m, both \(mᵉᵈ\) and m are zero modulo r.
- Otherwise Fermat gives mʳ⁻¹≡1 (mod r). Since \(r-1\) divides \(ed-1\), it follows that mᵉᵈ≡ m (mod r).

The recovered value and m agree modulo both distinct primes. Their difference is divisible by both, hence by pq; equivalently, the Chinese remainder theorem gives a unique residue modulo pq. Choosing \(0≤ m'<n\) recovers the exact representative. This handles all 55 toy messages, including multiples of 5 or 11 and zero.

## Correctness is not security

**Textbook RSA must not be used for production encryption.** It is deterministic: encrypting the same representative produces the same ciphertext. It is also malleable: multiplying ciphertexts produces an encryption of the product of their messages modulo n. Larger primes do not remove these flaws.

Real RSA encryption uses a vetted scheme such as **RSA-OAEP**, whose randomized encoding is part of the security design, not decorative padding. RSA can protect a randomly generated symmetric key; authenticated symmetric encryption handles the bulk data. This is **hybrid encryption**, rather than applying RSA separately to every character.

Signatures serve a different purpose: demonstrating message integrity and possession of a private signing key, rather than hiding a message. **RSA-PSS** hashes and encodes the message for signing; verification uses the public key. Signing is not simply “encrypting with the private key.” All of these operations belong in vetted libraries and protocols; this sequence explains their mathematics rather than providing a cryptography implementation.

