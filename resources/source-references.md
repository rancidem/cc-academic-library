# Source References

This page records the upstream source bundles that feed the canonical index.

Curated reference list: [cc-academic stars list](https://github.com/stars/rancidem/lists/cc-academic)

| Repo | Summary | Upstream repo | Source path | Local README |
|---|---|---|---|---|
| `academic-paper-skills` | Systematic philosophy and interdisciplinary paper-writing workflows with strategist and composer skills, validation gates, and research-to-manuscript support. | [Browse list](https://github.com/stars/rancidem/lists/cc-academic) | `resources/cc-academic-sources/academic-paper-skills` | [README.md](resources/cc-academic-sources/academic-paper-skills/README.md) |
| `claude-scientific-writer` | Claude Code plugin and Python package for deep research writing, citation-backed scientific documents, and related academic outputs. | [Repo](https://github.com/K-Dense-AI/claude-scientific-writer) | `resources/cc-academic-sources/claude-scientific-writer` | [README.md](resources/cc-academic-sources/claude-scientific-writer/README.md) |
| `MySkills` | Paper Visualizer skill bundle focused on turning papers into high-fidelity technical schematics and related visual outputs. | [Repo](https://github.com/rancidem/MySkills) | `resources/cc-academic-sources/MySkills` | [README.md](resources/cc-academic-sources/MySkills/README.md) |
| `scientific-agent-skills` | Large Agent Skills collection covering scientific libraries, databases, workflows, and domain-specific research operations. | [Repo](https://github.com/K-Dense-AI/scientific-agent-skills) | `resources/cc-academic-sources/scientific-agent-skills` | [README.md](resources/cc-academic-sources/scientific-agent-skills/README.md) |
| `wtf-p` | WTF-P writing framework for structured academic authoring, citation grounding, outline execution, and quality checks. | [Repo](https://github.com/akougkas/wtf-p) | `resources/cc-academic-sources/wtf-p` | [README.md](resources/cc-academic-sources/wtf-p/README.md) |
| `matsengrp/plugins` | Claude Code plugin with specialized agents, a pre-PR checklist command, and desktop notification hooks. | [Repo](https://github.com/matsengrp/plugins) | `resources/cc-academic-sources/matsengrp/plugins` | [README.md](resources/cc-academic-sources/matsengrp/plugins/README.md) |


## Canonical Mapping

| Repo | Canonical subtrees |
|---|---|
| `academic-paper-skills` | `skills/writing-research/academic-paper-composer`, `skills/writing-research/academic-paper-strategist`, `references/examples` |
| `claude-scientific-writer` | `commands/scientific-writer-init.md`, `skills/writing-research/paper-2-web`, `scripts/academic-paper-composer`, `scripts/academic-paper-strategist` |
| `MySkills` | `skills/visualization/visual-architect` |
| `scientific-agent-skills` | `skills/bioinformatics`, `skills/cheminformatics`, `skills/clinical-medical`, `skills/computational-biology`, `skills/data-science`, `skills/document-formats`, `skills/earth-geo-astro`, `skills/lab-automation`, `skills/machine-learning`, `skills/misc`, `skills/quantum-computing`, `skills/visualization`, `skills/writing-research` |
| `wtf-p` | `references/wtfp`, `scripts/wtfp-commands`, `scripts/wtfp-lib`, `tools/wcn` |
| `matsengrp/plugins` | `agents/matsengrp-agents`, `commands/matsengrp-agents` |

## Usage

- Use this table when checking source parity or tracing a canonical item back to its upstream origin.
- Use the curated reference list link above when you want to browse the source bundles as a set.
- Update this page whenever a source bundle is added, renamed, or replaced.
- Keep summaries short and factual so the table stays readable in diffs.

## Registry Note

- This file is generated from `resources/bundle-registry.json`.
- Paths are relative to the repository root so the registry can be regenerated on any machine.
