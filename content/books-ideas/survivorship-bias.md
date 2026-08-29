---
title: "Survivorship Bias"
slug: "survivorship-bias"
category: "books-ideas"
topic: "learning-reasoning"
tags:
  - bias
  - statistics
  - reasoning
date_added: "2026-08-11"
date_updated: "2026-08-14"
relationships:
  parent: []
  deeper: []
  related:
    - scientific-method
sources:
  - label: "Wikimedia Commons — Survivorship-bias.svg"
    url: "https://commons.wikimedia.org/wiki/File:Survivorship-bias.svg"
  - label: "Columbia Statistical Research Group / Abraham Wald, *A Method of Estimating Plane Vulnerability Based on Damage of Survivors* (1943), bibliographic record"
    url: "https://books.google.com/books/about/A_Method_of_Estimating_Plane_Vulnerabili.html?id=hZtWtAEACAAJ"
  - label: "Mangel & Samaniego (1984), “Abraham Wald's Work on Aircraft Survivability,” *JASA*"
    url: "https://doi.org/10.1080/01621459.1984.10478038"
books: []
image:
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Survivorship-bias.svg/960px-Survivorship-bias.svg.png"
  alt: "Modern aircraft-damage illustration of the Abraham Wald survivorship-bias example."
  credit: "Martin Grandjean / McGeddon, Wikimedia Commons, CC BY-SA 4.0"
  source_url: "https://commons.wikimedia.org/wiki/File:Survivorship-bias.svg"
  provenance: "external"
quiz:
  - question_id: "survivorship-bias:could-areas-fewer-bullet-holes-returning-aircraft"
    version: 1
    question: "Why could the areas with *fewer* bullet holes on returning aircraft deserve *more* armor?"
    answer: "Before explaining the visible sample, ask what process decided which cases became visible at all."
    rubric: Correct if the answer conveys the canonical idea that Before explaining the visible sample, ask what process decided which cases became visible at all.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

**Survivorship bias** occurs when the cases you can observe are a filtered subset of the cases that originally existed, and you forget to reason about what is missing.

The classic wartime aircraft example comes from statistical work by **Abraham Wald** and the Columbia Statistical Research Group. Engineers could map bullet damage on aircraft that returned from missions. The tempting response was to armor the areas with the most holes.

But the returning aircraft were precisely the **survivors**. Damage concentrated on them showed places a plane could often be hit and still return. Areas with few hits could instead be places where a hit was more likely to prevent return, so the missing aircraft carried crucial unseen information.

The underlying problem is **selection on the outcome**. Modern examples include:

- studying successful companies to infer what causes success while excluding failed companies that did the same things;
- asking long-lived people what habits caused longevity without sampling comparable people who died earlier;
- evaluating investment strategies only in funds that survived long enough to appear in today's databases.

> **Takeaway:** Before explaining the visible sample, ask what process decided which cases became visible at all.

The popular aircraft story is often told as one dramatic instant of insight. Wald's actual wartime work was a more technical program on estimating aircraft vulnerability from damage to survivors.

The familiar red-dot aircraft image is a modern illustration of the Wald example, not Wald's original wartime damage chart.
