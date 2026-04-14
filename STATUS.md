# Canonical Library Status

## Verification

- Source bundles tracked: 6
- Canonical destination groups tracked: 27
- .DS_Store entries in inventory: 0
- Matsen sidecar entries in inventory: 0
- Registry-driven maintenance rollout: complete

## Current Model

- `resources/cc-academic-sources/` is the upstream mirror.
- `agents/`, `commands/`, `references/`, `scripts/`, `skills/`, `templates/`, and `tools/` are the canonical published surfaces.
- `resources/bundle-registry.json` is the authoritative bundle registry.
- `resources/source-references.md` is generated from the registry.
- `inventory.json` is generated from the live filesystem.

## Maintenance Notes

- The Matsen plugin sidecar at `resources/matsengrp-agents` remains removed.
- `.DS_Store` entries are ignored and stripped from the inventory snapshot.
- Refresh the registry, traceability doc, and inventory together after any source-bundle change.
