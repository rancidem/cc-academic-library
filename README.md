# cc-academic

Personal library of Claude Code academic, scientific, and research-oriented skills and tools.

This project now lives at `/Users/emersonburke/Documents/developer/projects/cc-academic`.

## Purpose

Build a structured, searchable, and maintainable inventory of Claude Code tools, skills, and supporting resources with a focus on academic writing workflows.

## Layout

- `LIBRARY.md` - single canonical dashboard and master catalog
- `library/start-here.md` - plain-language beginner guide
- `library/glossary.md` - short definitions for common library terms
- `repos/README.md` - quick navigation table for the cloned repositories
- `library/README.md` - library-folder landing page
- `library/categories.md` - backup task-first catalog navigation
- `library/stacks.md` - curated workflow combinations
- `library/index.md` - pointer-only compatibility page
- `library/` - working index for commands, agents, skills, tools, resources, and repo summaries
- `library/inventory.md` - master inventory of all commands, agents, skills, and tools
- `library/commands.md` - command entry index with summaries and raw links
- `library/agents.md` - agent entry index with summaries and raw links
- `library/skills.md` - skill inventory across cloned repos with summaries, usage notes, and raw links
- `library/repositories.md` - detailed per-repo comparison and entry points
- `notes/` - working notes, comparisons, and maintenance logs
- `scripts/` - utility scripts for regenerating indexed docs
- `.planning/` - project context, requirements, roadmap, and work state
- `sources/` - cloned upstream repositories

## Current Status

- The project is organized around a single dashboard-first workflow.
- `LIBRARY.md` is the canonical start page.
- `library/start-here.md` and `library/glossary.md` support beginner use without changing the repo-first structure.
- The repo summaries are the primary navigation layer, with quick-nav, task categories, featured stacks, and indexed command/agent/skill/tool inventories available as helpers.
- The planning docs and maintenance notes are synchronized with the current library structure.
- The local source set has been trimmed toward Claude Code-only usage where runtime mirrors were redundant.
- Phase 4 focuses on personal usability, repo summaries, and maintenance.
- The dashboard-first layout is the intended way to browse and extend the library.

## Next Steps

1. Keep the repo summaries current when upstream READMEs or structures change.
2. Use `LIBRARY.md` as the main start page, `library/start-here.md` and `library/glossary.md` when terms or next steps are unclear, and `library/repositories.md` for deep comparison.
3. Keep source sync notes and index refreshes in `.planning/` and `notes/`.
4. Expand tool and resource entries as new reusable items are discovered.
5. Keep the dashboard concise so it stays useful at a glance.
6. Keep the task categories and featured stacks aligned with the underlying repository summaries and secondary to them.
