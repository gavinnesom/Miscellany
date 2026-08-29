---
title: "What an LLM Actually Predicts"
slug: "llm-predictions"
category: "computing-ai"
topic: "ai-language-models"
tags:
  - llms
  - prediction
  - language
date_added: "2026-08-11"
date_updated: "2026-08-22"
relationships:
  parent: []
  deeper: 
    - tokens-and-embeddings
    - transformer-attention
  related: []
sources:
  - label: "OpenAI — Tokenizer / token orientation"
    url: "https://platform.openai.com/tokenizer"
  - label: "Vaswani et al. (2017), *Attention Is All You Need*"
    url: "https://arxiv.org/abs/1706.03762"
  - label: "Jurafsky & Martin, *Speech and Language Processing* draft — language models"
    url: "https://web.stanford.edu/~jurafsky/slp3/"
books: []
image:
  url: "/images/entry-llm-predictions.svg"
  alt: "Explanatory diagram for What an LLM Actually Predicts."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "llm-predictions:llm-only-predicts-next-token-simultaneously-true"
    version: 1
    question: "Why is “an LLM only predicts the next token” simultaneously true and potentially misleading?"
    answer: "“Predict the next token” describes the training/output interface, not the complexity of the internal computation needed to make a good prediction."
    rubric: Correct if the answer conveys the canonical idea that Predict the next token describes the training/output interface, not the complexity of the internal computation needed to make a good prediction.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

An autoregressive large language model is trained around an almost embarrassingly simple objective: given previous tokens, assign probabilities to the **next token**.

Mathematically, a sequence probability is decomposed as

$$
P(x_1,\ldots,x_n)=\prod_{t=1}^{n}P(x_t\mid x_1,\ldots,x_{t-1}).
$$

During training, the model repeatedly sees a context and is rewarded for assigning high probability to the token that actually followed. During generation, it turns the resulting probability distribution into one next token, appends that token to the context, and repeats.

> **Big idea:** “Predict the next token” describes the training/output interface, not the complexity of the internal computation needed to make a good prediction.

## A small linear-algebra view

Suppose the context has 3 tokens and the model width is 4. After tokenization and embedding, the current context can be represented as a matrix:

```text
X, shape 3 x 4

          feature 1  feature 2  feature 3  feature 4
token 1      0.2       -0.1        0.7        0.0
token 2      0.0        0.5       -0.4        0.3
token 3      0.6        0.1        0.2       -0.2
```

Each row is one token's 4-dimensional vector. A learned layer can multiply those token vectors by a weight matrix:

```text
W, shape 4 x 2

feature 1     1.0     0.2
feature 2    -0.5     0.4
feature 3     0.3     0.8
feature 4     0.1    -0.6
```

Then

```text
XW, shape 3 x 2

token 1      0.46     0.56
token 2     -0.34     0.34
token 3      0.59     0.34
```

The important university-linear-algebra point is the shape rule: `(3 token rows × 4 features) · (4 features × 2 output features) = (3 token rows × 2 output features)`. Real models use much wider matrices and many layers, but the operation is still learned matrix/vector mapping applied to token representations.

At the end, another learned matrix maps the final hidden vector for the current position to one score per vocabulary token. Softmax converts those scores into a probability distribution for the next token.

To predict well across code, proofs, dialogue, stories, and factual text, the network benefits from learning internal representations of syntax, entities, relationships, procedures, styles, and many regularities about the world. That does not mean every internal representation is a clean human-readable fact table.

Chat models add post-training — instruction tuning, preference optimization, safety behavior, tool use, and other scaffolding — but at generation time the core model still produces distributions over possible next tokens.

A common misconception is that an LLM simply retrieves the most common phrase seen in training. Novel token sequences can be produced because probabilities are computed from learned parameters and the current context, although memorization can also occur.
