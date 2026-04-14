# Commands

Slash commands and workflow entrypoints live here. This is the canonical command surface for the library.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| General commands | `commands/*.md` | Core workflow commands and utilities |
| Matsen commands | `commands/matsengrp-agents/` | Imported plugin command mirrors |

## Quick Links

| Go to | Open |
|---|---|
| Source map | [resources/source-references.md](resources/source-references.md) |
| Registry | [resources/bundle-registry.json](resources/bundle-registry.json) |
| Snapshot | [inventory.json](inventory.json) |
| State | [docs/STATE.md](docs/STATE.md) |

## Common Files

- `quick.md` - quick task launcher
- `progress.md` - status and progress check
- `map-project.md` - project mapping entrypoint
- `scientific-writer-init.md` - scientific writer initialization
- `create-outline.md` - outline generation workflow

## Related Surfaces

- `agents/` contains the orchestration and reviewer agents used by these commands.
- `templates/` contains reusable prompt templates used by several commands.
- `inventory.json` records the current command file set for sync checks.
