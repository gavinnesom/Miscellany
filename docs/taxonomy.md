# Taxonomy Notes

Entry identity is the `slug` in front matter. Folder paths and category names are not identity.

The canonical route for an entry is:

```text
/entry/<slug>
```

For example, `slug: time-dilation` is always `/entry/time-dilation`, even if its category changes from `physics-space` to a future `science` category.

The browsing hierarchy is:

```text
Category -> Topic -> Entry
```

Categories are mutable metadata controlled by `app/lib/categories.ts`. Each category has a stable `key` and a display `label`.

Topics are mutable curriculum groupings controlled by `app/lib/topics.ts`. Each topic has a stable `key`, display `label`, category, description, optional `startHere` entries, and ordering metadata. New content should use:

```yaml
category: biology-medicine
topic: metabolism-diabetes
```

Tags are cross-cutting descriptors. They are not hierarchy and should remain URL-safe slugs such as:

```yaml
tags:
  - insulin
  - metabolism
```

Semantic relationships are also separate from taxonomy. `relationships.parent` means a conceptual relationship between entries, not a topic assignment.

If a future migration changes category or topic keys, update the relevant definitions and all affected entry metadata, then run:

```bash
npm test
npm run lint
```
