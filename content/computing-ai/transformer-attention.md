---
title: "Transformer Attention"
slug: "transformer-attention"
category: "computing-ai"
topic: "ai-language-models"
tags:
  - transformers
  - attention
  - llms
date_added: "2026-08-11"
date_updated: "2026-08-22"
relationships:
  parent: 
    - llm-predictions
  deeper: []
  related: 
    - tokens-and-embeddings
related:
  - tokens-and-embeddings
sources:
  - label: "Vaswani et al. (2017), *Attention Is All You Need*"
    url: "https://arxiv.org/abs/1706.03762"
  - label: "Jay Alammar — Illustrated Transformer (useful explanatory source)"
    url: "https://jalammar.github.io/illustrated-transformer/"
books: []
image:
  url: "/images/attention-heads.svg"
  alt: "Explanatory diagram for Transformer Attention."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "transformer-attention:roles-queries-keys-values-play-attention"
    version: 1
    question: "What roles do queries, keys, and values play in attention?"
    answer: "Attention is dynamic routing. The network does not compress the entire previous sentence into one fixed state; it can directly weight many previous token representations when constructing the next layer."
    rubric: Correct if the answer conveys the canonical idea that Attention is dynamic routing. The network does not compress the entire previous sentence into one fixed state; it can directly weight many previous token representations when. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Attention lets each token build a new representation by **selectively combining information from other tokens** in the context.

In scaled dot-product attention,

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V.
$$

Each token produces a **query** vector; candidate source tokens produce **keys** and **values**. Query–key similarity creates weights, and the output is a weighted mixture of value vectors.

For autoregressive language models, a **causal mask** prevents a token from attending to future tokens during next-token training/generation.

## What changes during inference?

There are two different kinds of "matrix" in this story.

- **Learned parameter matrices** are fixed during inference. For example, a trained attention head has weight matrices that map each token representation into queries, keys, and values: \(W_Q\), \(W_K\), and \(W_V\).
- **Computed activation matrices** change with the current input. The actual \(Q\), \(K\), and \(V\) matrices are recomputed for the tokens in the current context.
- **Attention scores** are also recomputed from the current context, because they come from \(QK^T\).

So the model has fixed learned machinery, but the attention/mixing matrix is dynamic.

For a toy 3-token context, suppose one head produces this query-key score matrix before softmax:

```text
scores = QK^T / sqrt(d_k), shape 3 x 3

             source token 1  source token 2  source token 3
target 1          1.8           masked         masked
target 2          0.4             1.2          masked
target 3          0.1             2.0            0.7
```

After softmax over each allowed row, the third token might mix values roughly like this:

```text
target token 3 output = 0.10 * V_token1 + 0.69 * V_token2 + 0.21 * V_token3
```

If the third token or earlier context changes, the token representations change, so \(Q\), \(K\), \(V\), \(QK^T\), and the attention weights can all change even though \(W_Q\), \(W_K\), \(W_V\), and the rest of the trained parameters stay fixed.

**Multi-head attention** runs several learned attention operations in parallel. Different heads can specialize in different useful patterns, although interpreting a head as one neat human rule is often too simplistic.

> **Big idea:** Attention is dynamic routing. The network does not compress the entire previous sentence into one fixed state; it can directly weight many previous token representations when constructing the next layer.

Attention is also not “what the model is consciously paying attention to.” The weights are mathematical components of computation, and attention maps alone do not provide a complete explanation of model reasoning.
