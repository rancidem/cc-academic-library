# Repository Summaries

Detailed comparison notes for the five cloned repositories.

Use `library/inventory.md` for item-level browsing across commands, agents, skills, and tools. Use this page when you want the repo-level comparison first.

## Install And Download Paths

- Use the repo sections below first when you want the fastest path to open, download, install, or use a whole repository.
- Use the `Raw` links in `library/skills.md` and `library/tools.md` when you want direct file downloads.
- Use `library/categories.md` only when you want a backup task-first route to the right repo.
- Use `library/stacks.md` only when you want a curated workflow bundle instead of a single repo.

## Comparison Matrix

| Repository | Size | Format / Runtime | Why It Matters Here | Strengths | Cautions | Best First | Tags |
|---|---:|---|---|---|---|---|---|
| MySkills | Small | Markdown skill library | Fastest repo to inspect and the simplest example of a reusable skill bundle. | Minimal, readable, easy to copy patterns from. | Very narrow surface area. | `README.md`, then `skills/visual-architect/SKILL.md` | `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small` |
| academic-paper-skills | Small | Markdown skills + Python scripts | Compact strategist/composer workflow for paper planning and composition. | Clear phase split, checkpointed flow, lightweight structure. | Narrow domain and few runtime integrations. | `README.md`, then `strategist/SKILL.md` | `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small` |
| wtf-p | Large | Node CLI + commands + tests | Best example of an installable, command-first academic writing system. | Deep command coverage, orchestration, and runtime support. | More moving parts and Node-specific tooling overhead. | `README.md`, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/` | `repository`, `academic-writing`, `writing`, `cli`, `node`, `large` |
| claude-scientific-writer | Large | Python package + plugin + commands | Strongest scientific writing stack for research-backed document generation. | Rich package structure, many skills, plugin integration, strong docs. | Broader and more complex, with higher maintenance cost. | `README.md`, then `docs/DOCUMENTATION_INDEX.md` and `skills/` | `repository`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large` |
| scientific-agent-skills | Very large | Agent Skills catalog + Python tooling | Broadest catalog for scientific and research workflows across many domains. | Widest coverage, specialized skills, governance and safety emphasis. | Largest review surface and highest operational complexity. | `README.md`, then `docs/scientific-skills.md` and `scientific-skills/` | `repository`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high` |

## Beginner Picks

- Easiest repo: [MySkills](#myskills)
- Easiest skill: `paper-visualizer` in [MySkills](#myskills)
- Easiest install: [scientific-agent-skills](#scientific-agent-skills)
- Broadest catalog: [scientific-agent-skills](#scientific-agent-skills)
- Best full writing workflow: [wtf-p](#wtf-p)
- Best scientific writing workflow: [claude-scientific-writer](#claude-scientific-writer)

## MySkills

- Source: `sources/MySkills`
- What it is: one small skill bundle built around a single visual-architecture skill.
- What do I do first?: open `README.md`, then open `skills/visual-architect/SKILL.md`.
- Install / setup: copy `skills/visual-architect/` into your Claude Code project knowledge or user skills path.
- Download / raw: copy `skills/visual-architect/` or use the raw `SKILL.md` link in `library/skills.md`.
- How to use: treat it as the simplest example of a reusable skill bundle and copy the folder into your own skills location.
- Why choose it: best when you want the smallest, easiest repo to understand quickly.
- Caution: too small to serve as a broad reusable library on its own.
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## academic-paper-skills

- Source: `sources/academic-paper-skills`
- What it is: a two-skill workflow for planning and writing academic papers.
- What do I do first?: open `README.md`, then open `strategist/SKILL.md`.
- Install / setup: copy `strategist/` and `composer/` into `~/.claude/skills`.
- Download / raw: use the raw `SKILL.md` links in `library/skills.md`, and keep the `references/` and `scripts/` folders when you need the full workflow.
- How to use: start with the strategist skill to plan the paper, then use the composer skill to write it.
- Why choose it: best when you want a short, checkpointed paper workflow instead of a large system.
- Caution: focused on one paper-writing pattern and lighter on runtime integrations.
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## wtf-p

- Source: `sources/wtf-p`
- What it is: a command-driven academic writing system with installer, commands, and verification loops.
- What do I do first?: open `README.md`, then open `docs/BUILD_AND_RELEASE.md`, then scan `bin/commands/`.
- Install / setup: run `npx wtf-p` for the default install, `npx wtf-p --global` for a persistent install, or `npx wtf-p --local` for a project-only install.
- Download / raw: use `library/tools.md`, `library/commands.md`, and `library/skills.md` for raw links to the plugin manifest, workflow compressor, commands, and runtime helpers.
- How to use: use it when you want command-driven writing for papers, proposals, presentations, and posters.
- Why choose it: best when you want the most complete installable writing workflow and explicit command structure.
- Caution: larger learning curve and more packaging overhead than a plain skill repo.
- Status: imported and indexed
- Tags: `repository`, `academic-writing`, `writing`, `cli`, `node`, `large`

## claude-scientific-writer

- Source: `sources/claude-scientific-writer`
- What it is: a scientific writing stack with plugin, CLI, Python package, and bundled skills.
- What do I do first?: open `README.md`, then open `docs/DOCUMENTATION_INDEX.md`, then inspect `.claude/skills/`.
- Install / setup: install the plugin with `/plugin marketplace add https://github.com/K-Dense-AI/claude-scientific-writer` followed by `/plugin install claude-scientific-writer`, or use `pip install scientific-writer`, or clone the repo and run `uv sync`.
- Download / raw: use `library/tools.md` and `library/skills.md` for raw links to the package metadata, plugin manifest, and bundled skill files.
- How to use: use it when you want research-backed scientific writing with citations, conversion, figures, and a broad workflow toolkit.
- Why choose it: best when you want the strongest scientific writing stack with both installable tooling and bundled skills.
- Caution: broader and more complex than the small paper-writing repos.
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large`

## scientific-agent-skills

- Source: `sources/scientific-agent-skills`
- What it is: a large Agent Skills catalog for scientific and research workflows.
- What do I do first?: open `README.md`, then open `docs/scientific-skills.md`, then inspect `scientific-skills/`.
- Install / setup: run `npx skills add K-Dense-AI/scientific-agent-skills`; install `uv` first if you want the optional dependency or scanner workflows.
- Download / raw: use `library/skills.md` for direct `SKILL.md` downloads and copy the full skill folder when the row's Contents column mentions `references/`, `scripts/`, or `assets/`.
- How to use: use it when you need the widest scientific skill catalog and many domain-specific entry points.
- Why choose it: best when breadth matters more than simplicity.
- Caution: the largest review surface in the library and the highest operational complexity.
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high`
