# Commands

Slash commands and workflow entrypoints live here. This is the canonical command surface for the library.

## Navigate

| Area | Path | Purpose |
|---|---|---|
| General commands | `commands/*.md` | Core workflow commands and utilities |
| Matsen commands | `commands/matsengrp-agents/` | Imported plugin command mirrors |

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
