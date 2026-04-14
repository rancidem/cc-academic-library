# Architecture

## Workspace Architecture

This repository is a **documentation and library workspace**. Its job is to index, compare, and curate five cloned upstream repositories:

- `academic-paper-skills`
- `wtf-p`
- `MySkills`
- `claude-scientific-writer`
- `scientific-agent-skills`

The workspace does not define a shared runtime. Instead, it provides a documentation shell around several independent upstream architectures.

## Layer Model

### 1. Catalog Layer

- `library/` is the curated entry point
- `library/README.md` is the library-folder landing page
- `library/index.md` is a pointer-only compatibility page
- `library/repositories.md` contains per-repository summaries

### 2. Working Layer

- `notes/` captures maintenance and comparison notes
- `.planning/` stores roadmap/state and scan outputs
- `.planning/codebase/` is the target for architecture and stack documentation

### 3. Source Layer

- `sources/` contains the cloned upstream repositories
- each source repo remains independent and should be treated as read-only for this scan

## Repository Archetypes

### Skill Pair: `academic-paper-skills`

- Two complementary Claude Code skills: strategist and composer
- Architectural pattern: phase-separated workflow
- Planning and composition are intentionally decoupled
- Support material lives beside the skills in `references/`, `scripts/`, and `examples/`

### Command System: `wtf-p`

- Node CLI that installs a structured academic writing system into multiple assistants
- Architectural pattern: thin orchestrator plus specialized command modules
- Runtime entrypoint is a single executable that dispatches to installation, status, update, and uninstall flows
- The package ships tests, release scripts, and vendored runtime assets

### Static Skill Library: `MySkills`

- Minimal repository that acts as a personal skills shelf
- Architectural pattern: docs + metadata rather than a full application
- `skills/` is the main meaningful content surface
- `index.html` and `marketplace.json` suggest browsing or distribution metadata rather than executable code

### Python Package + Plugin Bundle: `claude-scientific-writer`

- Hybrid architecture with package code, CLI entrypoints, plugin metadata, and extensive docs
- `scientific_writer/` contains the implementation core
- `commands/`, `skills/`, and `templates/` define the user-facing workflow layer
- `.claude-plugin/`, `.claude/`, and `.cursor/` show editor/agent integration surfaces
- `scripts/` contains release and verification support

### Large Skill Catalog: `scientific-agent-skills`

- Repository organized around a very large `scientific-skills/` tree
- Each skill is a self-contained unit with documentation and behavior rules
- `scan_skills.py` acts as a repository-wide governance tool for safety review
- The architecture is catalog-like and modular, not monolithic

## Cross-Repo Architectural Themes

- **Document-first interfaces**: SKILL files, READMEs, and markdown instructions define behavior as much as code does
- **Modularity**: each repo decomposes into independent units rather than a shared framework
- **Assistant portability**: the same research/writing ideas are adapted for Claude Code, Gemini CLI, OpenCode, Cursor, and generic Agent Skills clients
- **Verification**: tests, scanners, quality gates, and review instructions appear repeatedly across the repos
- **Distribution via metadata**: manifests and marketplace files are used to package skills for install and discovery

## Comparative Positioning

- `academic-paper-skills` is the most narrowly scoped and pedagogical
- `wtf-p` is the most operationally systemized for command-driven execution
- `MySkills` is the lightest and least coupled
- `claude-scientific-writer` is the most package-oriented
- `scientific-agent-skills` is the broadest and most scalable skill catalog
