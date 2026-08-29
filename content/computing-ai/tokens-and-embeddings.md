---
title: "Tokens and Embeddings"
slug: "tokens-and-embeddings"
category: "computing-ai"
topic: "ai-language-models"
tags:
  - llms
  - representations
  - language
date_added: "2026-08-11"
date_updated: "2026-08-22"
relationships:
  parent: 
    - llm-predictions
  deeper: []
  related: 
    - transformer-attention
related:
  - transformer-attention
sources:
  - label: "OpenAI Tokenizer"
    url: "https://platform.openai.com/tokenizer"
  - label: "OpenAI Help — tokens"
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
  - label: "Vaswani et al. (2017)"
    url: "https://arxiv.org/abs/1706.03762"
books: []
image:
  url: "/images/entry-tokens-and-embeddings.svg"
  alt: "Explanatory diagram for Tokens and Embeddings."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "tokens-and-embeddings:difference-between-token-id-embedding-vector"
    version: 1
    question: "What is the difference between a token ID and an embedding vector?"
    answer: "Tokenization makes language discrete enough for computation; embeddings make those discrete symbols continuous enough for neural networks to learn useful relationships."
    rubric: Correct if the answer conveys the canonical idea that Tokenization makes language discrete enough for computation; embeddings make those discrete symbols continuous enough for neural networks to learn useful relationships.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

LLMs do not normally read text one character or one word at a time. A **tokenizer** converts text into integer token IDs representing chunks such as whole short words, word pieces, punctuation, or byte-level patterns.

A rough English rule of thumb for many modern tokenizers is **1 token ≈ 4 characters ≈ ¾ of a word**, but code, non-English languages, unusual names, and whitespace can behave very differently.

A token ID itself has no geometry. The model looks it up in an **embedding matrix**, replacing the discrete ID with a learned vector of numbers. If the model width is \(d\), each token becomes a point/vector in a \(d\)-dimensional representation space.

> **Big idea:** Tokenization makes language discrete enough for computation; embeddings make those discrete symbols continuous enough for neural networks to learn useful relationships.

## What an embedding lookup looks like

Imagine a tiny vocabulary with only 5 tokens and an embedding width of 3. The embedding table is a learned matrix \(E\) with shape `5 x 3`:

```text
E, shape 5 x 3

token ID   token       dim 1    dim 2    dim 3
0          <pad>        0.00     0.00     0.00
1          The          0.21    -0.15     0.72
2          dog         -0.44     0.80     0.18
3          ran          0.33     0.09    -0.51
4          .           -0.10     0.27     0.05
```

If the tokenizer turns `The dog ran.` into token IDs `[1, 2, 3, 4]`, the model performs row lookups:

```text
1 -> E[1] = [ 0.21, -0.15,  0.72]
2 -> E[2] = [-0.44,  0.80,  0.18]
3 -> E[3] = [ 0.33,  0.09, -0.51]
4 -> E[4] = [-0.10,  0.27,  0.05]
```

The resulting input to the first transformer layer is therefore a `4 x 3` matrix: 4 token positions, each with a 3-number vector. Real models might use widths in the thousands rather than 3, but the lookup idea is the same.

The initial embedding is not a permanent dictionary definition. Transformer layers repeatedly transform each token's representation using its context, so the vector representing “bank” in “river bank” evolves differently from “bank” in “bank account.”

“Similar embeddings mean similar words” is therefore only a first approximation. Contextual representations encode many properties at once, and no individual coordinate has to correspond cleanly to a human concept.
