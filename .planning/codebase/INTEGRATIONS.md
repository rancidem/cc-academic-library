# Integrations

## Workspace Integrations

- **Git**: every cloned upstream repository is a git checkout under `sources/`
- **Markdown index workflow**: `library/` provides the human-facing catalog, while `.planning/` holds scan artifacts and planning state
- **Action-first navigation**: `LIBRARY.md` directs users to review, raw download, and install/setup paths before deeper browsing
- **No source mutation policy**: the workspace is intended to observe and document upstream repos, not patch them in place

## Agent and Editor Integrations

### Claude Code

- Primary target across the repository set
- Used by `academic-paper-skills`, `wtf-p`, `claude-scientific-writer`, and `scientific-agent-skills`
- Skill files and instruction files are designed to be copied into or discovered by Claude Code workflows
- Raw skill files can be downloaded directly from `library/skills.md` when you want the exact `SKILL.md` source

### Gemini CLI

- Explicitly supported by `wtf-p`
- Also referenced by `claude-scientific-writer` as a supported writing ecosystem

### OpenCode

- Explicitly supported by `wtf-p`
- Used as part of the same command distribution model as Claude Code and Gemini CLI

### Cursor

- Explicitly referenced by `claude-scientific-writer`
- Supported in `scientific-agent-skills` as an Agent Skills client

### Agent Skills Standard

- Central integration layer for `scientific-agent-skills`
- Defines a portable skill format across different agent clients
- `MySkills` and `academic-paper-skills` are both compatible with the broader skill-file pattern even though they are much smaller in scope

## External Services and APIs

### Research and Literature

- `claude-scientific-writer` integrates real-time research lookup through Perplexity-style research workflows
- `scientific-agent-skills` includes skills for paper lookup, literature review, citation management, and scholarly evaluation
- `academic-paper-skills` is oriented around citation-backed paper planning and composition

### Scientific Data and Platform Access

- `scientific-agent-skills` includes dedicated integrations for scientific databases, lab systems, omics tools, imaging systems, and related research platforms
- Examples visible in the repository tree include database lookup, biopython, pubmed-style research tooling, clinical research tools, and lab automation integrations

### Writing and Publishing Toolchains

- `wtf-p` supports writing workflows for papers, proposals, presentations, and posters across multiple assistant runtimes
- `claude-scientific-writer` integrates LaTeX/BibTeX-style document generation, plugin installation, and package publishing workflows
- `academic-paper-skills` uses platform-oriented paper planning and composition instructions for preprint-style publishing
- Repository summaries and tool indexes now expose the shortest install/setup path for each supported package or plugin

### Model and Media Services

- `claude-scientific-writer` references Anthropic API usage, optional OpenRouter-backed research lookup, and image-generation workflows for scientific figures
- `scientific-agent-skills` includes skills for scientific schematics, image generation, and related publication graphics workflows

## Integration Risk Notes

- The widest integration surface is in `scientific-agent-skills`; it should be treated as the most operationally sensitive repo because many skills can invoke external APIs or run code
- `wtf-p` and `claude-scientific-writer` are more controlled: they package explicit commands, scripts, and docs around a narrower writing workflow
- `MySkills` is the lowest-risk integration surface because it is mostly static catalog material
