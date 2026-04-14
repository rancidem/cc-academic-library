# cc-academic canonical library

Canonical home for the academic skills library. This repo mirrors upstream bundles into a stable local layout and keeps the published surface easy to navigate.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| Mirror | `resources/cc-academic-sources/` | Local upstream clones and source-bundle workspace |
| Registry | `resources/bundle-registry.json` | Authoritative bundle-to-canonical mapping |
| Traceability | `resources/source-references.md` | Generated source map for humans |
| Snapshot | `inventory.json` | Generated filesystem snapshot for drift checks |
| State | `.planning/STATE.md` | Current work position and continuity |
| Roadmap | `.planning/ROADMAP.md` | Phase plan and maintenance sequence |

## Quick Links

| Go to | Open |
|---|---|
| Current model | [.planning/PROJECT.md](.planning/PROJECT.md) |
| Current state | [.planning/STATE.md](.planning/STATE.md) |
| Phase plan | [.planning/ROADMAP.md](.planning/ROADMAP.md) |
| Source map | [resources/source-references.md](resources/source-references.md) |
| Registry | [resources/bundle-registry.json](resources/bundle-registry.json) |
| Maintenance script | [scripts/maintenance/refresh.js](scripts/maintenance/refresh.js) |

## Published Surface

- `agents/` - orchestration and reviewer agents
- `commands/` - slash commands and workflow entrypoints
- `references/` - supporting reference material and examples
- `scripts/` - mirrored command and library utilities
- `skills/` - canonical skill identities grouped by domain
- `templates/` - reusable prompt and document templates
- `tools/` - auxiliary tooling, including `wcn`

## Source Bundle Model

- Mirrored upstream content stays under `resources/cc-academic-sources/`.
- Canonical published content lives in the top-level domain folders.
- Matsen content is canonical only in `agents/matsengrp-agents` and `commands/matsengrp-agents`.
- `resources/matsengrp-agents` is intentionally absent.

## Common Actions

| Task | Command |
|---|---|
| Refresh registry, traceability, inventory, and status | `./scripts/maintenance/refresh.js` |
| Audit the current state | `./scripts/maintenance/refresh.js audit` |
| Add or move source-bundle content | Update `resources/bundle-registry.json`, then refresh |
| Review the current model | Open `.planning/PROJECT.md` |
| Check execution state | Open `.planning/STATE.md` |

## Adding New Content

1. Put mirrored upstream files under `resources/cc-academic-sources/`.
2. Publish only the content that belongs in the canonical root surface.
3. Update `resources/bundle-registry.json` when a bundle mapping changes.
4. Run `./scripts/maintenance/refresh.js` to regenerate `resources/source-references.md`, `inventory.json`, and `STATUS.md`.
5. Verify the new paths, generated docs, and inventory snapshot are aligned.
6. Commit the mirror, canonical files, and generated metadata together.

## Maintenance Rules

- Keep `.DS_Store` ignored and out of the inventory.
- Regenerate the registry-derived docs together.
- Prefer small, reviewable maintenance updates over broad reorganizations.
- Use the planning files for state, roadmap, and quick-task continuity.
