# cc-academic canonical library

## What This Is

This repository is the canonical index for the academic skills library. It mirrors upstream bundles into a stable local layout so agents, commands, references, and tools stay organized and traceable.

## Core Value

Keep the canonical library organized, accurate, and easy to sync back to upstream sources.

## Requirements

### Validated

- ✓ Existing academic skills tree remains stable and navigable
- ✓ Imported source bundles retain traceable upstream provenance

### Active

- [ ] New upstream bundles can be added without breaking the canonical layout
- [ ] Quick tasks can track work in `.planning/quick/`
- [ ] Source-to-canonical mapping stays explicit in metadata

### Out of Scope

- Manual rewriting of upstream content — preserve source wording unless normalization is required
- Application runtime code — this repo is documentation and library organization only

## Context

- The tree already contains multiple academic skill families, command entrypoints, and reference bundles.
- The Matsen Group plugin bundle was added as a grouped subtree under `agents/`, `commands/`, and `resources/`.
- The repository is now initialized as a git repository so future imports can be committed cleanly.

## Constraints

- **Organization**: Keep each imported bundle grouped under a distinct subtree — avoid mixing source identities.
- **Traceability**: Update `resources/source-references.md` and `inventory.json` whenever source bundles change.
- **Low drift**: Prefer small, reviewable metadata updates over broad reorganizations.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Group `matsengrp/plugins` under dedicated subtrees | Preserves upstream identity without colliding with existing academic skills | ✓ Good |
| Treat the repo as a canonical index rather than a code project | Matches the existing library structure and keeps maintenance simple | ✓ Good |
| Track source provenance in `resources/source-references.md` and `inventory.json` | Makes sync checks and future imports auditable | ✓ Good |

---
*Last updated: 2026-04-14 after Matsen Group plugin import*
