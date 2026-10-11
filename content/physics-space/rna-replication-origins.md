---
title: "RNA and the Problem of Making Copies"
slug: "rna-replication-origins"
category: "physics-space"
topic: "earth-history-geology"
tags:
  - origins-of-life
  - RNA
  - replication
date_added: "2026-10-11"
relationships:
  parent:
    - prebiotic-chemistry-energy
  deeper:
    - protocells-origin-hypotheses
  related:
    - dna-vs-rna
sources:
  - label: "Nissen et al. (2000) — the ribosome’s RNA-based peptide-bond-forming centre"
    url: "https://doi.org/10.1126/science.289.5481.920"
  - label: "O’Flaherty et al. (2018) — mixed-sequence RNA copying inside model protocells"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7547884/"
  - label: "Papastavrou, Horning and Joyce (2024) — RNA-catalyzed evolution of catalytic RNA"
    url: "https://doi.org/10.1073/pnas.2321592121"
  - label: "Gianni et al. (2026) — a 45-nucleotide polymerase ribozyme"
    url: "https://doi.org/10.1126/science.adt2760"
  - label: "Müller et al. (2022) — experimental RNA–peptide chemistry"
    url: "https://doi.org/10.1038/s41586-022-04676-3"
  - label: "Joyce et al. (1984) — opposite-handed monomers can inhibit template-directed chain growth"
    url: "https://doi.org/10.1038/310602a0"
books: []
quiz:
  - question_id: "rna-replication-origins:fidelity-length"
    version: 1
    status: "active"
    question: "With independent copying accuracy of 99% at each position, what fraction of 100-position copies are exact? Why does this not by itself give a universal maximum genome length?"
    answer: "The fraction is 0.99^100, about 0.366 or 37%. A universal limit does not follow because mutations differ in effect, errors may not be independent, some sequences tolerate change, and population fitness, repair, recombination and compartmentalization alter the outcome."
    rubric: "Require the approximately 37% result or correct expression and at least two relevant limitations; do not require every listed mechanism."
  - question_id: "rna-replication-origins:copying-cycle"
    version: 1
    status: "active"
    question: "Why is extending an RNA strand along a template not the same as completing a self-sustaining replication cycle?"
    answer: "The products must separate, both complementary directions must be copied, substrates must be activated and replenished, and functional descendants must reproduce faster than loss or degradation. A catalyst also needs access to its template while folded RNA can hide that sequence."
    rubric: "Require at least three distinct missing requirements, including strand separation and a repeated cycle rather than a one-time extension."
  - question_id: "rna-replication-origins:lab-history"
    version: 1
    status: "active"
    question: "Why does demonstrating that an RNA can help make a copy of itself not yet establish an autonomous protocell or the historical origin of life?"
    answer: "One successful reaction does not establish repeated copying with renewed feedstocks, survival, compartment reproduction and heritable differential success. Laboratory possibility also does not identify which process actually occurred on ancient Earth."
    rubric: "Require the distinction between a component reaction and a sustained integrated reproductive system, and between chemical possibility and historical evidence."
---

A sequence can store information without being able to reproduce it. RNA is interesting because it can potentially join two roles that modern cells distribute among different molecules: **a sequence that can be copied and a folded structure that can catalyze chemistry**.

The [DNA versus RNA entry](/entry/dna-vs-rna) explains their chemical differences. Here the question is harder: could RNA help bootstrap a system that preserves and improves its own molecular machinery?

## Why propose an RNA world?

An RNA molecule is a chain of nucleotides. Complementary bases can recognize a template, while interactions among distant parts of one chain let it fold into a particular shape. Some folds are catalysts, called **ribozymes**. In principle, a changed sequence can therefore produce a changed catalytic function, and copying can transmit that difference.

Modern biology retains an important clue. Structural studies of the ribosome found an RNA-based active centre for peptide-bond formation. The machine that builds proteins depends on RNA at its catalytic core. [Nissen and colleagues' structures](https://doi.org/10.1126/science.289.5481.920) support RNA's chemical capabilities and deep biological role. They are not a fossilized transcript of the first replicator.

“RNA world” is most useful as a family of hypotheses about an early RNA-centred stage, not a claim that purified modern RNA appeared first and worked alone. Small peptides, minerals and other polymers could have assisted it. Experimental [RNA–peptide chemistry](https://doi.org/10.1038/s41586-022-04676-3) makes co-development a serious possibility; it does not yet explain the emergence of the genetic code and modern translation.

## Four tasks hidden in the word replication

1. **Supply the pieces.** Nucleobases, sugars and phosphate must reach suitable nucleotide structures and activation states. Having the elements present is insufficient.
2. **Make the right links.** Template recognition must lead to covalent chain extension, with workable connectivity and sufficiently low error.
3. **Separate the products.** A complementary copy tends to remain paired with its template. A very stable duplex is useful for recognition but can inhibit another round of copying.
4. **Repeat without destroying the machinery.** Conditions must allow both strands to be copied, replenish reactive substrates and preserve enough functional material.

There is also a folding conflict: a catalytic RNA needs its three-dimensional shape, but a copying system needs access to the sequence. Heating may expose a template while damaging RNA or disrupting a compartment. Success at one step can make the next harder.

[Mixed-sequence copying inside model vesicles](https://pmc.ncbi.nlm.nih.gov/articles/PMC7547884/) demonstrates part of this integration using activated building blocks and short assisting oligomers. “Copying” in such a result should not silently become “a cell reproducing indefinitely.”

Handedness adds a less obvious constraint. Mirror-image molecules can have the same formula but fit a template differently. In a [classic copying experiment](https://doi.org/10.1038/310602a0), opposite-handed activated guanosine monomers in a mixed pool could enter products and terminate further chain growth. This does not prove all possible early polymers required perfect homochirality, but it shows why “the correct ingredients were present” is weaker than “those ingredients could participate in compatible copying chemistry.”

## A small error becomes a large sequence problem

Suppose each position is copied correctly with probability \(q\), independently, and a strand has \(L\) positions. The probability of an exact copy is:

$$
Q=qᴸ.
$$

At 99% accuracy per position, an exact 100-position copy has probability \(0.99¹⁰⁰\approx0.366\): only about 37%. For 1,000 positions the corresponding value is about 0.000043, or 0.0043%. Long sequences amplify small error rates.

![Exact-copy probability falls with sequence length: independent per-position accuracies of 99% and 99.9% give very different outcomes. This mathematical model is not a measured universal limit on early genomes.](/images/origins-copy-fidelity.svg)

In an intentionally stripped-down selection model, suppose an exact sequence produces \(A\) copies per generation while a competing class produces \(B\). Ignoring back mutation, the exact lineage gains only \(AQ\) faithful descendants per generation. Maintaining it against that competitor requires \(AQ>B\), or \(qᴸ>B/A\).

This is the intuition behind an **error threshold**: sequence length, fidelity and selective advantage interact. It is not a universal nucleotide ceiling. Some mutations preserve function; errors can be correlated; real populations have many fitness classes and may share or partition functions. The calculation explains the pressure to improve copying without pretending every non-exact sequence is useless.

## What experiments now achieve

In [2024](https://doi.org/10.1073/pnas.2321592121), an experimentally evolved RNA polymerase ribozyme propagated another catalytic RNA through researcher-managed replication and selection, allowing that RNA population to evolve. The important distinction is between maintaining an evolving RNA function and independently rebuilding the entire replication apparatus.

A [2026 study](https://doi.org/10.1126/science.adt2760) reported QT45, a 45-nucleotide polymerase ribozyme selected from random sequence pools. In mildly alkaline eutectic ice, researchers demonstrated the two component reactions of copying: synthesis of QT45’s complementary strand and synthesis of its own sequence. These were separate experiments, not a continuous self-replication cycle. Complement synthesis from a random triplet pool achieved 94.1% per-nucleotide fidelity. Synthesis of QT45 itself used defined substrates, including a preformed six-nucleotide fragment, and a researcher-applied pH–heat–freeze cycle. Both reactions gave yields around 0.2% over 72 days. These results demonstrate molecular capability, not an autonomous protocell or proof of the historical path.

The remaining challenge is integration: an adequate copying system, plausible feedstocks, energy renewal and a means to keep useful products associated with their producers. That leads to [protocells and competing origin hypotheses](/entry/protocells-origin-hypotheses).
