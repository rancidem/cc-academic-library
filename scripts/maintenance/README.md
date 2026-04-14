# Maintenance Scripts

This folder contains the repo's maintenance entrypoints for registry, traceability, inventory, and audit refreshes.

## Commands

- `node scripts/maintenance/refresh.js` regenerates `resources/source-references.md`, `inventory.json`, and `STATUS.md`, then runs the built-in audit.
- `node scripts/maintenance/refresh.js source-references` regenerates only `resources/source-references.md`.
- `node scripts/maintenance/refresh.js inventory` regenerates only `inventory.json`.
- `node scripts/maintenance/refresh.js status` regenerates only `STATUS.md`.
- `node scripts/maintenance/refresh.js audit` checks bundle paths, canonical destinations, `.DS_Store` leakage, and stale Matsen sidecar references.

## Inputs

- `resources/bundle-registry.json` is the authoritative bundle mapping.
- `resources/cc-academic-sources/` is the upstream mirror to audit against.

## Notes

- Paths in the registry and generated traceability docs are relative to the repository root.
- The refresh workflow is intentionally simple so it can be run on any machine without extra dependencies.
