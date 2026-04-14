# cc-academic canonical library

This folder is the canonical index for the academic skills library. It mirrors six source bundles:

- `academic-paper-skills`
- `claude-scientific-writer`
- `MySkills`
- `scientific-agent-skills`
- `wtf-p`
- `matsengrp/plugins`

The upstream source repos are stored locally under `resources/cc-academic-sources/` so the traceability links in `resources/source-references.md` point at on-disk clones instead of remote paths.

## Current status

- Missing skill identities synced: `paper-2-web`, `matlab`, `pyzotero`
- `wtf-p` command inventory mirrored into `scripts/wtfp-commands`
- `wtfp` library inventory mirrored into `scripts/wtfp-lib`
- `tools/wcn` package mirrored, including examples
- Verification target: no remaining source-to-canonical delta except any deliberate aliasing or deduplication
- `inventory.json` provides a machine-readable snapshot for future sync checks
- `resources/source-references.md` tracks the upstream source bundles and canonical subtree mapping
- `skills/README.md` documents how to create, reorganize, and maintain canonical skills

## Layout

- `agents/` - orchestration and reviewer agents
- `commands/` - command entrypoints and workflows
- `references/` - cross-cutting documentation and examples
- `scripts/` - mirrored `wtf-p` command and library inventory
- `skills/` - canonical skill identities
- `resources/` - source references and sync metadata
- `resources/cc-academic-sources/` - local clones of upstream source bundles
- `templates/` - reusable prompt and document templates
- `tools/` - mirrored auxiliary tooling, including `wcn`

## Regeneration

The canonical tree is built by copying the source bundles into the folder layout above and then re-running the source-to-canonical diff.
