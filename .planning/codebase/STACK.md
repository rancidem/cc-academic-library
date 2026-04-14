# Stack Overview

## Workspace Layer

- **Purpose**: documentation/library workspace for indexing and comparing Claude Code-adjacent academic and scientific tooling
- **Primary content**: curated Markdown indexes in `library/`, working notes in `notes/`, project state in `.planning/`, cloned upstream repositories in `sources/`
- **File format bias**: Markdown-first documentation with repository-local manifests and skill instructions
- **User workflow**: review entries in `LIBRARY.md`, download raw skill/tool sources from the indexes, and follow repo-level install/setup notes when a package or plugin is available
- **Repository policy**: scan and document only; do not modify upstream source repositories under `sources/`

## Upstream Repository Stacks

### `academic-paper-skills`

- **Core format**: Claude Code skill repository
- **Primary languages**: Markdown for skill definitions and docs; Python for helper scripts
- **Runtime footprint**: lightweight, file-based skill pair
- **Main components**: `strategist/`, `composer/`, `examples/`
- **Role**: two-stage academic paper workflow, split into strategic planning and composition

### `wtf-p`

- **Core format**: Node.js command-line package
- **Primary languages**: JavaScript for install/runtime logic and tests
- **Runtime footprint**: npm package with executable entrypoints
- **Main components**: `bin/`, `core/`, `docs/`, `scripts/`, `test/`, `tools/`, `vendors/`
- **Package metadata**: `package.json` exposes `wtfp`, `wtf-p`, and `wtf-p-uninstall`
- **Role**: command-driven academic writing system for Claude Code, Gemini CLI, and OpenCode
- **Install surface**: `npx wtf-p`, `npx wtf-p --global`, `npx wtf-p --local`, and `npx wtf-p-uninstall`

### `MySkills`

- **Core format**: personal skill library
- **Primary languages**: Markdown, HTML, JSON
- **Runtime footprint**: minimal; mostly static reference material
- **Main components**: `skills/`, `index.html`, `marketplace.json`
- **Role**: compact curated collection with a small skill footprint

### `claude-scientific-writer`

- **Core format**: Python package plus Claude Code plugin/workflow bundle
- **Primary languages**: Python, Markdown, TOML, JSON
- **Runtime footprint**: installable CLI/API package with plugin metadata and command docs
- **Main components**: `scientific_writer/`, `commands/`, `skills/`, `templates/`, `scripts/`, `docs/`
- **Packaging**: `pyproject.toml` defines a `scientific-writer` console script
- **Role**: scientific writing system with CLI, API, plugin, and writing instructions
- **Install surface**: Claude Code plugin install, `pip install scientific-writer`, or `uv sync`

### `scientific-agent-skills`

- **Core format**: large Agent Skills collection managed as a Python project
- **Primary languages**: Markdown, Python, TOML, YAML-style project metadata in skill files
- **Runtime footprint**: broad skill library with a scan/validation script
- **Main components**: `scientific-skills/`, `docs/`, `scan_skills.py`, `pyproject.toml`, `uv.lock`
- **Role**: cross-domain scientific skill catalog with scanning and security review support
- **Install surface**: `npx skills add K-Dense-AI/scientific-agent-skills`, plus `uv` for scanner and dependency workflows

## Observed Tooling Patterns

- Markdown skill files named `SKILL.md` are the primary executable contract in skill-based repos
- Package manifests differ by ecosystem: `package.json` for Node, `pyproject.toml` for Python, JSON marketplaces for skill catalogs
- Validation is a first-class concern across the stack: tests in `wtf-p`, scanners in `scientific-agent-skills`, and documentation workflows in the writing repos
- External tooling is mostly invoked through thin wrappers around commands, scripts, and skill instructions rather than through a large shared codebase
