# cc-academic canonical library

Canonical home for the academic skills library. This repo mirrors upstream bundles into a stable local layout and keeps the published surface easy to navigate.

## Start Here

- `resources/cc-academic-sources/` - upstream mirror and local source-bundle workspace
- `resources/bundle-registry.json` - authoritative bundle-to-canonical registry
- `resources/source-references.md` - generated traceability table
- `inventory.json` - generated filesystem snapshot
- `.planning/STATE.md` - current working state
- `.planning/ROADMAP.md` - active phase plan

## Main Areas

- `agents/` - orchestration and reviewer agents
- `commands/` - slash commands and workflow entrypoints
- `references/` - supporting reference material and examples
- `scripts/` - mirrored command and library utilities
- `skills/` - canonical skill identities grouped by domain
- `templates/` - reusable prompt and document templates
- `tools/` - auxiliary tooling, including `wcn`

## What Lives Where

- Mirrored upstream content stays under `resources/cc-academic-sources/`.
- Canonical published content lives in the top-level domain folders.
- Matsen content is canonical only in `agents/matsengrp-agents` and `commands/matsengrp-agents`.
- `resources/matsengrp-agents` is intentionally absent.

## Common Actions

- Add or move source-bundle content: update `resources/bundle-registry.json`, then run `./scripts/maintenance/refresh.js`.
- Check whether the repo is in sync: run `./scripts/maintenance/refresh.js audit`.
- Review the current model: read `.planning/PROJECT.md` and `.planning/STATE.md`.
- Inspect the current mapping: open `resources/source-references.md`.

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

