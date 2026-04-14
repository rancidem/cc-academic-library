# cc-academic canonical library

This repository is the canonical index for the academic skills library. It mirrors upstream bundles into a stable local layout so agents, commands, references, and tools stay organized and traceable.

## What to know

- `resources/cc-academic-sources/` is the upstream mirror.
- `resources/bundle-registry.json` is the source-of-truth registry for bundle mappings.
- `resources/source-references.md` is generated from the registry and stays human-readable.
- `inventory.json` is generated from the filesystem and used for drift checks.
- `resources/matsengrp-agents` has been removed; Matsen content is canonical only in `agents/matsengrp-agents` and `commands/matsengrp-agents`.

## Canonical surface

- `agents/` - orchestration and reviewer agents
- `commands/` - command entrypoints and workflows
- `references/` - cross-cutting documentation and examples
- `scripts/` - mirrored command and library utilities
- `skills/` - canonical skill identities
- `templates/` - reusable prompt and document templates
- `tools/` - mirrored auxiliary tooling, including `wcn`

## Maintenance

- Run `./scripts/maintenance/refresh.js` to regenerate the registry-derived traceability doc, inventory snapshot, and status summary.
- Update the bundle registry first when source bundles change.
- Regenerate `resources/source-references.md` and `inventory.json` together.
- Keep `.DS_Store` ignored and out of the inventory.
- Use `.planning/STATE.md` for current work position and `.planning/ROADMAP.md` for the phase plan.
