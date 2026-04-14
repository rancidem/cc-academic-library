# Structure

## Top-Level Layout

- `agents/` - canonical agent definitions, including both general writing agents and the `matsengrp-agents` subgroup.
- `commands/` - slash-command entrypoints and workflow commands.
- `references/` - supporting reference material, examples, and `wtf-p` guidance.
- `resources/` - local source-bundle clones plus sync metadata.
- `scripts/` - mirrored executable/script inventories, split into `wtfp-commands`, `wtfp-lib`, `scientific`, and related subtrees.
- `skills/` - canonical skill catalog organized by domain.
- `templates/` - reusable markdown and YAML templates for workflows, prompts, and documents.
- `tools/` - auxiliary tooling, currently centered on `wcn`.
- `.planning/` - project state, roadmap, and codebase map artifacts.

## Canonical Content Areas

### `agents/`

- General-purpose agents live directly under `agents/`.
- `agents/matsengrp-agents/` contains the imported Matsen plugin agents.
- Agent files are markdown documents that define behavior and review focus.

### `commands/`

- Command docs live directly under `commands/`.
- `commands/matsengrp-agents/pre-pr-check.md` is the Matsen plugin slash command mirror.
- `commands/scientific-writer-init.md` is the canonical command mapped from `claude-scientific-writer`.

### `references/`

- `references/examples/` contains example paper outputs.
- `references/wtfp/` contains workflow and policy references for the `wtf-p` bundle.

### `resources/`

- `resources/cc-academic-sources/` contains six local source bundles:
  - `academic-paper-skills`
  - `claude-scientific-writer`
  - `MySkills`
  - `scientific-agent-skills`
  - `wtf-p`
  - `matsengrp/plugins`
- `resources/matsengrp-agents/` contains the plugin metadata that supports the canonical Matsen agent subtree.
- `resources/source-references.md` is the main traceability table from upstream bundle to local clone and canonical mapping.

### `scripts/`

- `scripts/wtfp-commands/` holds the command-side mirroring of `wtf-p`.
- `scripts/wtfp-lib/` holds the library-side mirroring of `wtf-p`.
- `scripts/academic-paper-composer/` and `scripts/academic-paper-strategist/` are populated from the paper-writing bundle.
- `scripts/scientific/` is present as a grouped area for scientific utilities.

### `skills/`

- Domain folders are grouped by subject area: `bioinformatics`, `cheminformatics`, `clinical-medical`, `computational-biology`, `data-science`, `document-formats`, `earth-geo-astro`, `lab-automation`, `machine-learning`, `misc`, `quantum-computing`, `visualization`, and `writing-research`.
- `skills/README.md` defines the canonical rules for placement, flattening, and regeneration.

### `templates/`

- `templates/` holds reusable prompt and workflow templates.
- `templates/project-context/` contains focused guidance files for paper-writing context.
- `templates/slides/` and `templates/posters/` provide presentation-oriented variants.

### `tools/`

- `tools/wcn/` contains the executable wrapper, converter, spec, and package metadata for the WCN tooling mirror.

## Notable Cross-Linking

- `README.md` and `STATUS.md` describe the repo as a canonical library and point users to the source-bundle mirror.
- `inventory.json` enumerates files by kind and path for sync and diff checks.
- The Matsen plugin bundle is organized as a three-way split:
  - `agents/matsengrp-agents/`
  - `commands/matsengrp-agents/`
  - `resources/matsengrp-agents/`

## Organization Pattern

- Source bundles are stored verbatim or near-verbatim under `resources/cc-academic-sources/`.
- Canonical outputs are grouped by artifact type, not by source repository.
- Supporting docs stay near the content they describe so the tree can be audited without cross-referencing external systems.
