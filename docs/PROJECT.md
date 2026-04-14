# cc-academic canonical library

## What This Is

This repository is the canonical index for the academic skills library. It mirrors upstream bundles into a stable local layout so agents, commands, references, and tools stay organized and traceable.

## Core Value

Keep the canonical library organized, accurate, and easy to sync back to upstream sources.

## Requirements

### Validated

- ✓ Existing academic skills tree remains stable and navigable
- ✓ Imported source bundles retain traceable upstream provenance
- ✓ The Matsen plugin sidecar `resources/matsengrp-agents` has been removed

### Active

- [ ] New upstream bundles can be added without breaking the canonical layout
- [ ] Quick tasks can track work in `docs/quick/`
- [ ] Source-to-canonical mapping stays explicit in metadata
- [ ] Registry, traceability doc, inventory, and status stay synchronized

### Out of Scope

- Manual rewriting of upstream content — preserve source wording unless normalization is required
- Application runtime code — this repo is documentation and library organization only

## Context

- `resources/cc-academic-sources/` is the upstream mirror and local source-bundle workspace.
- `agents/`, `commands/`, `references/`, `scripts/`, `skills/`, `templates/`, and `tools/` are the canonical published surfaces.
- `resources/bundle-registry.json` is the authoritative bundle registry.
- `resources/source-references.md` is generated from the registry for human-readable traceability.
- `inventory.json` is generated from the live filesystem for drift detection.

## Constraints

- **Organization**: Keep each imported bundle grouped under a distinct subtree — avoid mixing source identities.
- **Traceability**: Update the bundle registry, `resources/source-references.md`, `STATUS.md`, and `inventory.json` together whenever source bundles change.
- **Low drift**: Prefer generated metadata plus small, reviewable maintenance updates over broad reorganizations.
- **Hygiene**: Ignore `.DS_Store` and remove other local noise before committing maintenance snapshots.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Group `matsengrp/plugins` under dedicated canonical subtrees | Preserves upstream identity without colliding with existing academic skills | ✓ Good |
| Remove `resources/matsengrp-agents` from the canonical tree | Avoids a redundant metadata sidecar with no active consumer | ✓ Good |
| Treat the repo as a canonical index rather than a code project | Matches the existing library structure and keeps maintenance simple | ✓ Good |
| Track source provenance in a registry plus generated traceability docs | Makes sync checks and future imports auditable | ✓ Good |

---
*Last updated: 2026-04-14 during registry and maintenance automation rollout*
