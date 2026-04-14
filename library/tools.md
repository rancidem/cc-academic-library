# Tools

Quick index of reusable Claude Code tools, environments, and helper utilities that support academic and scientific workflows.

## Entry Format

- Follow the shared schema in [Entry Template](entry-template.md)
- Keep tool entries short, comparable, and scan-friendly
- Prefer source paths, install commands, or package identifiers
- Add a short "best first" note so this page can be skimmed quickly.

## Recommended Fields

- Name
- Kind
- Source or location
- Purpose
- Contents
- Best use cases
- Status
- Tags
- Related entries
- Runtime or client support
- Strengths
- Tradeoffs

## Planned Tool Entry Types

- Claude Code setup helpers
- packaging and installation utilities
- file/indexing helpers
- search and tagging workflows

## Entries

### wtf-p

- Kind: tool
- Source: `sources/wtf-p`
- Scope: command-driven academic writing system for Claude Code, Gemini CLI, and OpenCode
- Purpose: provide a reusable installable workflow for papers, proposals, presentations, and posters
- Contents: installer commands, writing workflow commands, release/support scripts, and vendored skill helpers
- Best first: `README.md`, then `docs/BUILD_AND_RELEASE.md`
- Best use cases: command-first academic writing, assistant workflow orchestration, section planning, and publication prep
- Status: imported
- Tags: `tool`, `academic-writing`, `writing`, `cli`, `node`, `large`
- Related entries: [wtf-p](repositories.md#wtf-p), [Entry Template](entry-template.md), [Tag Taxonomy](taxonomy.md)
- Runtime or client support: Claude Code, Gemini CLI, OpenCode
- Strengths: broad command coverage, runtime support, and a documented install/update flow
- Tradeoffs: more moving parts than a pure skill repo and Node-specific packaging overhead

### claude-scientific-writer

- Kind: tool
- Source: `sources/claude-scientific-writer`
- Scope: scientific writing plugin, CLI, and Python package
- Purpose: support research-backed document generation with citations, conversion, and image generation
- Contents: Python package core, plugin metadata, CLI support, commands, templates, and bundled skills
- Best first: `README.md`, then `docs/DOCUMENTATION_INDEX.md`
- Best use cases: scientific papers, literature reviews, posters, grant proposals, and citation-grounded writing workflows
- Status: imported
- Tags: `tool`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large`
- Related entries: [claude-scientific-writer](repositories.md#claude-scientific-writer), [Entry Template](entry-template.md), [Tag Taxonomy](taxonomy.md)
- Runtime or client support: Claude Code, Python, CLI, plugin
- Strengths: rich end-to-end writing stack with real-time research and formatting support
- Tradeoffs: broad surface area and more maintenance overhead than the smaller skill repos

### scientific-agent-skills

- Kind: tool
- Source: `sources/scientific-agent-skills`
- Scope: large Agent Skills catalog for scientific and research workflows
- Purpose: provide a broad, reusable skill library for scientific data, writing, and research tasks
- Contents: scientific-skills tree, docs, scan tooling, package metadata, and security guidance
- Best first: `README.md`, then `docs/scientific-skills.md`
- Best use cases: agent-assisted scientific workflows, database lookups, research writing, and specialized analysis
- Status: imported
- Tags: `tool`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high`
- Related entries: [scientific-agent-skills](repositories.md#scientific-agent-skills), [Entry Template](entry-template.md), [Tag Taxonomy](taxonomy.md)
- Runtime or client support: Claude Code, Cursor, Codex, Agent Skills clients
- Strengths: widest coverage and strongest specialization across scientific domains
- Tradeoffs: largest review surface and highest operational complexity

## Status

Tool entries have been populated from the cloned repositories.
