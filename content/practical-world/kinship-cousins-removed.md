---
title: "Cousins and “Removed”: The Rule That Actually Works"
slug: "kinship-cousins-removed"
category: "practical-world"
topic: "kinship-family-tree"
tags:
  - kinship
  - family-tree
  - genealogy
  - relationships
date_added: "2026-08-15"
relationships:
  parent: []
  deeper: []
  related:
    - kinship-relationship-map
sources:
  - label: "Ancestry — Cousin chart"
    url: "https://www.ancestry.com/c/dna/cousins-dna-match"
  - label: "Michigan Tech Archives — Types of cousins and cousins removed"
    url: "https://blogs.mtu.edu/archives/2024/08/13/what-the-heck-is-that-types-of-cousins-and-cousins-removed/"
books: []
image:
  url: "/images/kinship-cousins-removed.svg"
  alt: "A family tree from a shared ancestral couple highlighting first cousins, second cousins, and first cousins once removed."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "kinship-cousins-removed:removed-mean-cousin-terminology"
    version: 1
    question: "What does “removed” mean in cousin terminology?"
    answer: "It means the generation offset between two collateral descendants relative to their nearest shared ancestor."
    rubric: Correct if the answer conveys the canonical idea that It means the generation offset between two collateral descendants relative to their nearest shared ancestor.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

Kinship terminology becomes much easier if you stop memorizing phrases such as "second cousin once removed."

There is a simple rule.

For two people:

1. find their **nearest shared ancestor**
2. count how many generations each person is below that ancestor
3. the smaller count determines the cousin number
4. the difference between the counts gives the number of removals

More precisely, if the two generation counts are \(a\) and \(b\):

```text
cousin degree = min(a,b) - 1
removed = |a-b|
```

This formula assumes both people descend from the shared ancestor through different child lines; direct ancestor/descendant relationships use different terms.

### First cousins

Two people share grandparents.

Each is two generations below the shared grandparents:

```text
grandparent
↓
parent
↓
you
```

So:

```text
a = 2
b = 2
```

Therefore:

```text
min(2,2)-1 = 1
```

They are **first cousins**.

### Second cousins

Two people share great-grandparents.

Each is three generations below:

```text
3 and 3
```

Therefore:

```text
3-1 = 2
```

They are **second cousins**.

### First cousin once removed

Suppose your grandparent is another person's great-grandparent.

You are two generations below the shared ancestor.

The other person is three generations below.

```text
2 and 3
```

Cousin degree:

```text
2-1 = 1
```

Removal:

```text
3-2 = 1
```

So the relationship is:

**first cousin once removed**.

### Your cousin's child

Your first cousin's child is your **first cousin once removed**.

Your child and that person's child are **second cousins** to each other because they occupy the same generation relative to the shared great-grandparents.

This is the part people often mix up.

### "Removed" means generation offset

"Removed" does not mean distant.

It tells you that the two people occupy different generation levels relative to their shared ancestor.

- Once removed = one-generation offset.
- Twice removed = two-generation offset.

### Why "third cousin" can be more distant than "first cousin twice removed"

The two numbers measure different things.

- Cousin degree measures how far back the shared ancestral branch point lies.
- Removal measures generational mismatch.

So there is no single linear ladder:

```text
first cousin
second cousin
third cousin
first cousin once removed
...
```

They describe a two-dimensional structure.

> **Takeaway:** Cousin number is about the shared ancestor; "removed" is about generation difference.
