# Tools Index

Inventory of tools discovered across the cloned repositories.
Use the repo sections below to browse tools, then open the local link for in-project inspection or the raw link for the source file.

## Repository Summary

| Repo | Commands | Agents | Skills | Tools | Total | Best first | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| MySkills | 0 | 0 | 1 | 0 | 1 | README.md, then `skills/visual-architect/SKILL.md` | Best for quickly reviewing a compact Anthropic Skill pattern. |
| academic-paper-skills | 0 | 0 | 2 | 0 | 2 | README.md, then `strategist/SKILL.md` | Best for paper planning, outlining, and manuscript composition with checkpoints. |
| wtf-p | 36 | 11 | 2 | 3 | 52 | README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/` | Best when you want the assistant to behave like a structured writing tool; local clone keeps the Claude Code vendor tree only. |
| claude-scientific-writer | 1 | 0 | 27 | 3 | 31 | README.md, then `docs/DOCUMENTATION_INDEX.md` | Best for research-backed scientific output with citations, conversion, and figure generation; local clone keeps the canonical Claude Code skill tree only. |
| scientific-agent-skills | 0 | 0 | 134 | 0 | 134 | README.md, then `docs/scientific-skills.md` | Best when you want the widest scientific skill catalog and many domain-specific entry points. |

## Snapshot

- Total items: 6
- Commands: 0
- Agents: 0
- Skills: 0
- Tools: 6

## Quick Jump

- [MySkills](#myskills)
- [academic-paper-skills](#academic-paper-skills)
- [wtf-p](#wtf-p)
- [claude-scientific-writer](#claude-scientific-writer)
- [scientific-agent-skills](#scientific-agent-skills)

## Kind Filter: tool

## wtf-p

- Source URL: https://github.com/akougkas/wtf-p
- Local clone: `sources/wtf-p`
- Summary: Command-driven academic writing system with installer, commands, agents, and verification loops.
- Best first: README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/`
- How to use: Run `npx wtf-p`, then invoke the `/wtfp:*` commands in your assistant.
- Notes: Best when you want the assistant to behave like a structured writing tool; local clone keeps the Claude Code vendor tree only.
- Counts: 36 commands, 11 agents, 2 skills, 3 tools

### Tools

| Name | Summary | Contents | Use | Open | Raw | How to use | Tags | Status |
|---|---|---|---|---|---|---|---|---|
| [Claude plugin manifest](../sources/wtf-p/vendors/claude/.claude-plugin/plugin.json) | Plugin manifest that wires the Claude vendor bundle into the local install. | plugin.json | Installed through Claude's plugin flow when you want the WTF-P bundle available. | [open](../sources/wtf-p/vendors/claude/.claude-plugin/plugin.json) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/.claude-plugin/plugin.json) | Installed through Claude's plugin flow when you want the WTF-P bundle available. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `tool`, `tool-root`, `installation`, `plugin` | imported |
| [WCN workflow compressor](../sources/wtf-p/tools/wcn/SPEC.md) | Token-efficient workflow compression CLI and notation package. | SPEC.md, cli.js, converter.js, package.json, swap-workflows.sh, examples/ | Run `wcn` or read the WCN spec to convert verbose workflow instructions into compact notation. | [open](../sources/wtf-p/tools/wcn/SPEC.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/tools/wcn/SPEC.md) | Run `wcn` or read the WCN spec to convert verbose workflow instructions into compact notation. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `tool`, `tool-root`, `cli`, `package` | imported |
| [WTF-P command runtime](../sources/wtf-p/bin/commands/list.js) | Command runtime helpers for installation, listing, diagnostics, status, and updates. | doctor.js, install-logic.js, list.js, status.js, update.js | Used internally by WTF-P for install, list, status, doctor, and update flows. | [open](../sources/wtf-p/bin/commands/list.js) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/bin/commands/list.js) | Used internally by WTF-P for install, list, status, doctor, and update flows. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `tool`, `tool-root`, `installation`, `cli` | imported |

## claude-scientific-writer

- Source URL: https://github.com/K-Dense-AI/claude-scientific-writer
- Local clone: `sources/claude-scientific-writer`
- Summary: Scientific writing stack with plugin, CLI, Python package, and bundled skills.
- Best first: README.md, then `docs/DOCUMENTATION_INDEX.md`
- How to use: Install the plugin, or use `pip install scientific-writer` / `uv sync`, then follow the skill prompts.
- Notes: Best for research-backed scientific output with citations, conversion, and figure generation; local clone keeps the canonical Claude Code skill tree only.
- Counts: 1 commands, 0 agents, 27 skills, 3 tools

### Tools

| Name | Summary | Contents | Use | Open | Raw | How to use | Tags | Status |
|---|---|---|---|---|---|---|---|---|
| [Scientific Writer maintenance scripts](../sources/claude-scientific-writer/scripts/README.md) | Maintenance scripts for versioning, publishing, and verification. | bump_version.py, publish.py, verify_package.py | Use for packaging, publishing, and verification tasks around the Scientific Writer distribution. | [open](../sources/claude-scientific-writer/scripts/README.md) | [raw](https://raw.githubusercontent.com/K-Dense-AI/claude-scientific-writer/main/scripts/README.md) | Use for packaging, publishing, and verification tasks around the Scientific Writer distribution. | `scientific-writing`, `writing`, `claude-code`, `python`, `large`, `tool`, `tool-root`, `scripts` | imported |
| [Scientific Writer package](../sources/claude-scientific-writer/pyproject.toml) | Python package powering the Scientific Writer CLI and API. | scientific_writer/api.py, cli.py, core.py, models.py, utils.py | Install with `pip install scientific-writer` or `uv sync`, then use the CLI or import the package. | [open](../sources/claude-scientific-writer/pyproject.toml) | [raw](https://raw.githubusercontent.com/K-Dense-AI/claude-scientific-writer/main/pyproject.toml) | Install with `pip install scientific-writer` or `uv sync`, then use the CLI or import the package. | `scientific-writing`, `writing`, `claude-code`, `python`, `large`, `tool`, `tool-root`, `installation`, `cli`, `package` | imported |
| [Scientific Writer plugin manifest](../sources/claude-scientific-writer/.claude-plugin/marketplace.json) | Plugin metadata for the Scientific Writer bundle. | marketplace.json | Install through Claude's plugin flow to expose the bundled Scientific Writer skills. | [open](../sources/claude-scientific-writer/.claude-plugin/marketplace.json) | [raw](https://raw.githubusercontent.com/K-Dense-AI/claude-scientific-writer/main/.claude-plugin/marketplace.json) | Install through Claude's plugin flow to expose the bundled Scientific Writer skills. | `scientific-writing`, `writing`, `claude-code`, `python`, `large`, `tool`, `tool-root`, `installation`, `plugin` | imported |
