# Stack

## What This Repository Is

- Canonical markdown library for academic and scientific Claude Code assets.
- Most content is documentation, skill definitions, command snippets, and mirrored source bundles rather than a single runnable application.
- The repo now stores upstream source clones under `resources/cc-academic-sources/` for traceability.

## Primary Languages And Formats

- Markdown is the dominant format across `README.md`, skill files, commands, and planning docs.
- Python appears in the mirrored source bundles, especially `resources/cc-academic-sources/claude-scientific-writer/` and `resources/cc-academic-sources/scientific-agent-skills/`.
- JavaScript appears in the mirrored `wtf-p` bundle and in `tools/wcn/package.json`.
- JSON is used for plugin manifests, hook configuration, inventory snapshots, and source-reference metadata.
- TOML is used for Python package metadata in the mirrored source bundles.

## Runtime And Tooling

- The only package manifest found at the repo root level is `tools/wcn/package.json`.
- `tools/wcn` is a Node-based CLI package named `@wtfp/wcn` with scripts for `convert`, `validate`, `stats`, and `test`.
- `resources/cc-academic-sources/claude-scientific-writer/pyproject.toml` defines a Python package named `scientific-writer` with a `scientific-writer` console script.
- `resources/cc-academic-sources/scientific-agent-skills/pyproject.toml` is another Python project boundary inside the mirrored sources.
- The academic-paper skill bundle expects Python 3.8+ for its verification scripts and documents a LaTeX-driven writing workflow.

## Build And Validation Surfaces

- `wtf-p` includes Node scripts for preflight, release, and test coverage under `scripts/` and `test/`.
- `claude-scientific-writer` includes packaging, CLI, verification, and release scripts in `scripts/` plus an example API usage file.
- `scientific-agent-skills` includes a `scan_skills.py` utility for skill inventory work.
- `scripts/maintenance/refresh.js` regenerates the registry-derived traceability doc, inventory snapshot, and status summary.
- `resources/bundle-registry.json` is the authoritative bundle registry used by the maintenance workflow.
- `inventory.json` is the machine-readable snapshot used to track the canonical tree.

## Practical Stack Summary

- This repo is a documentation-and-sync workspace, not a monolithic app.
- The effective stack is Markdown + JSON metadata, with embedded Python and Node subprojects mirrored from upstream source bundles.
- Tooling is intentionally lightweight at the root and specialized inside the mirrored bundles.
