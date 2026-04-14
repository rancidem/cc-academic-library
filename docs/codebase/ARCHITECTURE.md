# Architecture

## System Role

This repository is a canonical index for an academic skills library. It is not a single application; it is a curated mirror that normalizes content from multiple upstream source bundles into a stable on-disk layout.

## Core Layers

- `resources/cc-academic-sources/` holds the local clones of upstream bundles.
- `agents/`, `commands/`, `references/`, `scripts/`, `skills/`, `templates/`, and `tools/` hold the canonicalized outputs and supporting docs.
- `resources/source-references.md` links each upstream bundle to its local clone and canonical subtree mapping.
- `inventory.json` is the machine-readable snapshot that records the current repository shape and file kinds.
- `docs/` stores project state, roadmap, and codebase mapping artifacts.

## Content Flow

1. Upstream bundles are cloned into `resources/cc-academic-sources/`.
2. Bundle contents are mirrored or reorganized into canonical locations under the repository root.
3. Cross-references are updated so canonical files can be traced back to their source bundle.
4. `inventory.json` is regenerated to capture the current tree and support sync checks.

## Bundle-to-Canonical Mapping

- `academic-paper-skills` maps into writing-research skills plus `references/examples`.
- `claude-scientific-writer` maps into `commands/scientific-writer-init.md` and the paper-writing skill and script trees.
- `MySkills` maps into `skills/visualization/visual-architect`.
- `scientific-agent-skills` maps into the scientific domain skill families under `skills/`.
- `wtf-p` maps into `references/wtfp`, `scripts/wtfp-commands`, `scripts/wtfp-lib`, and `tools/wcn`.
- `matsengrp/plugins` maps into `agents/matsengrp-agents` and `commands/matsengrp-agents`.

## Design Principles

- Keep a single canonical location for each identity.
- Preserve source provenance in local paths instead of remote URLs.
- Keep related companions together when a bundle includes agents, commands, hooks, or scripts.
- Prefer stable, descriptive directory names that make source-to-canonical diffs easy to audit.

## Structural Characteristics

- The repository is documentation-heavy and file-oriented, with many markdown-defined agents, commands, and templates.
- Several canonical trees are direct mirrors of upstream package structure, especially under `scripts/` and `tools/`.
- The moved source bundle tree under `resources/cc-academic-sources/` acts as the traceability anchor for the entire library.
