# Agents

Orchestration and reviewer agents live here. This is the canonical home for agent prompts that coordinate writing, review, and quality checks.

## Navigate

| Area | Path | Purpose |
|---|---|---|
| General agents | `agents/*.md` | Core orchestration and review behavior |
| Matsen agents | `agents/matsengrp-agents/` | Imported plugin agents for the Matsen bundle |

## Common Files

- `section-writer.md` - section drafting workflow
- `section-reviewer.md` - section review workflow
- `section-planner.md` - section planning workflow
- `research-synthesizer.md` - synthesis and consolidation workflow
- `plan-checker.md` - plan quality checks

## Related Surfaces

- `commands/` contains the command entrypoints that invoke these agents.
- `resources/source-references.md` traces Matsen provenance back to the source bundle.
- `inventory.json` records the current agent file set for sync checks.
