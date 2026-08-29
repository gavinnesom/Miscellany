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

Categories are mutable metadata controlled by `app/lib/categories.ts`. Each category has a stable `key` and a display `label`; the older `slug` and `title` aliases are kept for compatibility with existing UI code.

Topics are mutable curriculum groupings controlled by `app/lib/topics.ts`. Each topic has a stable `key`, display `label`, category, description, optional `startHere` entries, and ordering metadata. New content should use:

```yaml
category: biology-medicine
topic: metabolism-diabetes
```

The older `section` field remains a compatibility alias during migration, but it is not the canonical field for new content.

Tags are cross-cutting descriptors. They are not hierarchy and should remain URL-safe slugs such as:

```yaml
tags:
  - insulin
  - metabolism
```

Semantic relationships are also separate from taxonomy. `relationships.parent` means a conceptual relationship between entries, not a topic assignment.

## Future Migration Workflow

1. Decide the target category keys and update `app/lib/categories.ts`.
2. Create a mapping file like `docs/taxonomy-migration.example.json`.
3. Preview the migration:

```bash
npm run taxonomy:migrate -- --mapping docs/taxonomy-migration.example.json
```

4. Review the proposal.
5. Apply the migration:

```bash
npm run taxonomy:migrate -- --mapping docs/taxonomy-migration.example.json --apply
```

6. Run:

```bash
npm test
npm run lint
```

The script changes YAML `category:` metadata only. Relationship links remain stable because they use entry slugs, not category paths.

If a future migration changes topics, update `app/lib/topics.ts`, migrate entry `topic:` keys, then run:

```bash
npm test
npm run lint
```
