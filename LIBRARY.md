# cc-academic Library

Master dashboard for the project’s cloned Claude Code academic and scientific tooling.

Last refreshed: 2026-04-14.

## Start Here

### Review, download, install

Use the sections below based on what you want to do right now.

- [Library inventory](library/inventory.md) - full cross-type catalog for quick review
- [Repository summaries](library/repositories.md) - repo-level comparison plus install/setup notes
- [Skills inventory](library/skills.md) - raw skill-file links and folder contents for direct download
- [Tools index](library/tools.md) - raw tool links and installable package/setup notes
- [Resources index](library/resources.md) - manifests, docs, and setup references
- [Entry template](library/entry-template.md) - shared fields for download, install, and verification notes

### Browse by repo

- This page is the canonical dashboard.
- [Repo quick-nav](repos/README.md) - direct links to each cloned repository
- [Repository summaries](library/repositories.md) - detailed per-repo comparison and usage notes

### Browse by item type

- [Library inventory](library/inventory.md) - master index of commands, agents, skills, and tools
- [Commands](library/commands.md) - indexed command entry points with summaries and raw links
- [Agents](library/agents.md) - indexed agent entry points with summaries and raw links
- [Skills](library/skills.md) - indexed skill files with summaries, use notes, open links, and raw download links
- [Tools](library/tools.md) - reusable tool roots, packages, and helper utilities
- [Resources](library/resources.md) - supporting references, guides, and maintenance material
- [Entry template](library/entry-template.md) - shared schema for all new entries
- [Taxonomy](library/taxonomy.md) - controlled tags and search terms

### Browse maintenance or history

- [Notes](notes/README.md) - working notes, comparisons, and maintenance logs
- [Maintenance log](notes/maintenance.md) - source syncs, index updates, and documentation changes

## What This Folder Is For

- `sources/` contains the cloned upstream repositories and should stay read-only during indexing.
- `library/` contains the project’s canonical indexes, templates, and tag rules.
- `notes/` contains maintenance logs and comparison notes.
- `.planning/` stores project memory, roadmap, requirements, and work state.

## Current State

- The master catalog, repo quick-nav, and exhaustive inventory pages are in place.
- The dashboard, planning docs, and maintenance notes are synchronized with the current library structure.
- Phase 4 is focused on maintenance, refreshes, and personal usability.
- The next useful work is tightening summaries and keeping the library easy to scan.

## Most Useful Now

- `library/inventory.md` - best when you want every command, agent, skill, and tool in one place.
- `wtf-p` - best when you want a command-first writing workflow with clear orchestration.
- `claude-scientific-writer` - best when you want a research-backed scientific writing stack.
- `scientific-agent-skills` - best when you want the widest scientific skill catalog.
- `academic-paper-skills` - best when you want a short paper-planning workflow with checkpoints.
- `MySkills` - best when you want a minimal example of a single reusable skill.

## Inventory Snapshot

- Total inventory items: 220
- Commands: 37
- Agents: 11
- Skills: 166
- Tools: 6
- MySkills: 1 skill
- academic-paper-skills: 2 skills
- wtf-p: 36 commands, 11 agents, 2 skills, 3 tools
- claude-scientific-writer: 1 command, 27 skills, 3 tools
- scientific-agent-skills: 134 skills

## Repository Highlights

### MySkills

- Single-skill repo with a very small review surface.
- Fastest place to inspect a compact Anthropic Skill pattern.
- Best if you want a simple visual-architecture example.

### academic-paper-skills

- Two-skill strategist/composer workflow for academic papers.
- Strong for planning, outlining, and manuscript composition.
- Best if you want a concise, checkpointed paper-writing flow.

### wtf-p

- Command-driven writing system for Claude Code, with command, agent, skill, and tool entry points.
- Trimmed local source scope now keeps the Claude Code vendor tree only.
- Strongest repository for installable assistant workflows.
- Best if you want the assistant to behave like a structured writing tool.

### claude-scientific-writer

- Scientific writing stack with plugin, CLI, command, skill, and Python package support.
- Trimmed local source scope now keeps the canonical Claude Code skill tree only.
- Strongest repository for research-backed scientific output.
- Best if you want citations, conversion, and figure generation in one place.

### scientific-agent-skills

- Largest scientific Agent Skills catalog in the library.
- Broadest coverage across research, clinical, and analysis workflows.
- Best if you want the most specialized and extensive skill collection.

## Maintenance Rules

- Keep `LIBRARY.md` as the first page you open.
- Use `library/inventory.md` for the full command, agent, skill, and tool catalog.
- Use `library/commands.md`, `library/agents.md`, `library/skills.md`, and `library/tools.md` for type-specific browsing.
- Use `library/repositories.md` for detailed repo comparison.
- Keep new entries consistent with `library/entry-template.md` and `library/taxonomy.md`.
- Record refreshes in `notes/maintenance.md` when source repos change.
- Treat `library/` as the working index and `LIBRARY.md` as the personal dashboard.
