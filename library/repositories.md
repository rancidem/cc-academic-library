# Repository Summaries

Detailed comparison notes for the five cloned repositories.

Use `library/inventory.md` for item-level browsing across commands, agents, skills, and tools. Use this page when you want the repo-level comparison first.

## Install And Download Paths

- Use the repo sections below first when you want the fastest path to open, download, install, or use a whole repository.
- Use the `Raw` links in `library/skills.md` and `library/tools.md` when you want direct file downloads.
- Use `library/categories.md` when you want the shortest task-first route to the right repo.
- Use `library/stacks.md` when you want a curated workflow bundle instead of a single repo.

## Comparison Matrix

| Repository | Size | Format / Runtime | Why It Matters Here | Strengths | Cautions | Best First | Tags |
|---|---:|---|---|---|---|---|---|
| MySkills | Small | Markdown skill library | Fastest repo to inspect and the simplest example of a reusable skill bundle. | Minimal, readable, easy to copy patterns from. | Very narrow surface area. | `README.md`, then `skills/visual-architect/SKILL.md` | `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small` |
| academic-paper-skills | Small | Markdown skills + Python scripts | Compact strategist/composer workflow for paper planning and composition. | Clear phase split, checkpointed flow, lightweight structure. | Narrow domain and few runtime integrations. | `README.md`, then `strategist/SKILL.md` | `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small` |
| wtf-p | Large | Node CLI + commands + tests | Best example of an installable, command-first academic writing system. | Deep command coverage, orchestration, and runtime support. | More moving parts and Node-specific tooling overhead. | `README.md`, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/` | `repository`, `academic-writing`, `writing`, `cli`, `node`, `large` |
| claude-scientific-writer | Large | Python package + plugin + commands | Strongest scientific writing stack for research-backed document generation. | Rich package structure, many skills, plugin integration, strong docs. | Broader and more complex, with higher maintenance cost. | `README.md`, then `docs/DOCUMENTATION_INDEX.md` and `skills/` | `repository`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large` |
| scientific-agent-skills | Very large | Agent Skills catalog + Python tooling | Broadest catalog for scientific and research workflows across many domains. | Widest coverage, specialized skills, governance and safety emphasis. | Largest review surface and highest operational complexity. | `README.md`, then `docs/scientific-skills.md` and `scientific-skills/` | `repository`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high` |

## MySkills

- Source: `sources/MySkills`
- Summary: compact personal skill library centered on a single visual-architecture skill.
- Best first: open `README.md`, then `skills/visual-architect/SKILL.md`
- Download: copy `skills/visual-architect/` or use the raw `SKILL.md` link in `library/skills.md`
- Install / setup: copy `skills/visual-architect/` into your Claude Code project knowledge or user skills path.
- Use: the single bundled skill is meant to be copied as a simple Anthropic Skill pattern.
- Strengths: minimal, direct, and easy to inspect in one sitting
- Cautions: too small to serve as a broad reusable library on its own
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## academic-paper-skills

- Source: `sources/academic-paper-skills`
- Summary: two-skill strategist/composer workflow for philosophy and interdisciplinary papers.
- Best first: open `README.md`, then `strategist/SKILL.md`
- Download: use the raw `SKILL.md` links in `library/skills.md` and keep the `references/` and `scripts/` folders when you need the full workflow.
- Install / setup: copy `strategist/` and `composer/` into `~/.claude/skills`.
- Use: the strategist skill plans the paper and the composer skill writes it.
- Strengths: clear stage separation and strong quality checkpoints
- Cautions: focused on a specific paper-writing workflow and lighter on runtime integrations
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## wtf-p

- Source: `sources/wtf-p`
- Summary: command-driven academic writing system with installer, commands, and verification loops.
- Local scope: Claude Code vendor tree retained; Gemini and OpenCode mirrors removed from this inventory.
- Best first: open `README.md`, then `docs/BUILD_AND_RELEASE.md`, then `bin/commands/`
- Download: use `library/tools.md`, `library/commands.md`, and `library/skills.md` for raw links to the plugin manifest, workflow compressor, and runtime helpers.
- Install / setup: run `npx wtf-p` for the default install, `npx wtf-p --global` for a persistent install, or `npx wtf-p --local` for a project-only install.
- Use: command-driven academic writing for papers, proposals, presentations, and posters.
- Strengths: strong orchestration, runtime support, and a documented install/update path
- Cautions: larger learning curve and more packaging overhead than a plain skill repo
- Status: imported and indexed
- Tags: `repository`, `academic-writing`, `writing`, `cli`, `node`, `large`

## claude-scientific-writer

- Source: `sources/claude-scientific-writer`
- Summary: scientific writing stack with plugin, CLI, Python package, and bundled skills.
- Local scope: canonical Claude Code skill tree retained; duplicate runtime mirrors removed from this inventory.
- Best first: open `README.md`, then `docs/DOCUMENTATION_INDEX.md`, then `.claude/skills/`
- Download: use `library/tools.md` and `library/skills.md` for raw links to the package metadata, plugin manifest, and bundled skill files.
- Install / setup: install the plugin with `/plugin marketplace add https://github.com/K-Dense-AI/claude-scientific-writer` followed by `/plugin install claude-scientific-writer`, or use `pip install scientific-writer`, or clone the repo and run `uv sync`.
- Use: research-backed scientific writing with citations, conversion, figures, and a broad workflow toolkit.
- Strengths: deep package structure, broad skill coverage, and practical plugin integration
- Cautions: broader and more complex than the small academic paper repos
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large`

## scientific-agent-skills

- Source: `sources/scientific-agent-skills`
- Summary: large Agent Skills catalog for scientific and research workflows.
- Best first: open `README.md`, then `docs/scientific-skills.md`, then `scientific-skills/`
- Download: use `library/skills.md` for direct `SKILL.md` downloads and copy the full skill folder when the row's Contents column mentions `references/`, `scripts/`, or `assets/`.
- Install / setup: run `npx skills add K-Dense-AI/scientific-agent-skills`; install `uv` first if you want the optional dependency or scanner workflows.
- Use: broad research assistance when you need the largest available scientific skill catalog and many domain-specific entry points.
- Strengths: widest coverage, specialized workflows, and explicit safety guidance
- Cautions: the largest review surface in the library and the highest operational complexity
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high`
