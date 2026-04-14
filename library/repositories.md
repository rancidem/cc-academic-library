# Repository Summaries

Detailed comparison notes for the five cloned repositories.

Use `library/inventory.md` for item-level browsing across commands, agents, skills, and tools. Use this page when you want the repo-level comparison first.

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
- Local clone: `sources/MySkills`
- Summary: compact personal skill library centered on a single visual-architecture skill.
- What it is good for: quickly understanding one self-contained Anthropic Skill and extracting a useful pattern from it.
- Notable structure: `skills/`
- Best first: open `README.md`, then `skills/visual-architect/SKILL.md`
- Strengths: minimal, direct, and easy to inspect in one sitting
- Cautions: too small to serve as a broad reusable library on its own
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## academic-paper-skills

- Source: `sources/academic-paper-skills`
- Local clone: `sources/academic-paper-skills`
- Summary: two-skill strategist/composer workflow for philosophy and interdisciplinary papers.
- What it is good for: planning a paper, generating a detailed outline, and then composing the manuscript with validation gates.
- Notable structure: `strategist/`, `composer/`, `examples/`
- Best first: open `README.md`, then `strategist/SKILL.md`
- Strengths: clear stage separation and strong quality checkpoints
- Cautions: focused on a specific paper-writing workflow and lighter on runtime integrations
- Status: imported and indexed
- Tags: `skill`, `academic-writing`, `planning`, `review`, `claude-code`, `small`

## wtf-p

- Source: `sources/wtf-p`
- Local clone: `sources/wtf-p`
- Summary: command-driven academic writing system with installer, commands, and verification loops.
- Local scope: Claude Code vendor tree retained; Gemini and OpenCode mirrors removed from this inventory.
- What it is good for: papers, proposals, presentations, and posters when you want the assistant to behave like a structured writing system.
- Notable structure: `commands/`, `agents/`, `skills/`, `docs/`, `templates/`
- Best first: open `README.md`, then `docs/BUILD_AND_RELEASE.md`, then `bin/commands/`
- Strengths: strong orchestration, runtime support, and a documented install/update path
- Cautions: larger learning curve and more packaging overhead than a plain skill repo
- Status: imported and indexed
- Tags: `repository`, `academic-writing`, `writing`, `cli`, `node`, `large`

## claude-scientific-writer

- Source: `sources/claude-scientific-writer`
- Local clone: `sources/claude-scientific-writer`
- Summary: scientific writing stack with plugin, CLI, Python package, and bundled skills.
- Local scope: canonical Claude Code skill tree retained; duplicate runtime mirrors removed from this inventory.
- What it is good for: research-backed scientific writing where you need citations, conversion, figures, and a broad workflow toolkit.
- Notable structure: `commands/`, `.claude/`, `templates/`, `scientific_writer/`, `.claude-plugin/`
- Best first: open `README.md`, then `docs/DOCUMENTATION_INDEX.md`, then `.claude/skills/`
- Strengths: deep package structure, broad skill coverage, and practical plugin integration
- Cautions: broader and more complex than the small academic paper repos
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `writing`, `plugin`, `package`, `python`, `large`

## scientific-agent-skills

- Source: `sources/scientific-agent-skills`
- Local clone: `sources/scientific-agent-skills`
- Summary: large Agent Skills catalog for scientific and research workflows.
- What it is good for: broad research assistance when you need the largest available scientific skill catalog and many domain-specific entry points.
- Notable structure: `scientific-skills/`, `docs/`, `.github/`
- Best first: open `README.md`, then `docs/scientific-skills.md`, then `scientific-skills/`
- Strengths: widest coverage, specialized workflows, and explicit safety guidance
- Cautions: the largest review surface in the library and the highest operational complexity
- Status: imported and indexed
- Tags: `repository`, `scientific-writing`, `research-planning`, `skill-file`, `python`, `very-large`, `high`
