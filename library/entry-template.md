# Entry Template

Use this template for every item in the library so tools, skills, and resources stay comparable.

## Repository Summary Schema

Use this structure for every repo summary in `library/repositories.md`.

- What it is
- What do I do first?
- Install / setup
- Download / raw
- How to use
- Why choose it
- Caution

## Required Fields

- Name
- Kind
- Source
- Open
- Raw
- Scope
- Purpose
- Contents
- Best use cases
- Status
- Tags
- Related entries

## Recommended Fields

- Runtime or client support
- Size or scale
- Strengths
- Tradeoffs
- Download target
- Install or setup method
- Prerequisites
- Verification step
- Maintenance notes

## Template

```markdown
# Name

- Kind: command | agent | skill | tool | resource
- Source: `path/or/url`
- Open: `local/path/or/link`
- Raw: `raw/download/url`
- Scope: one-sentence summary of what this entry covers
- Purpose: why this entry exists in the library
- Contents: primary modules, directories, or reference materials
- Best use cases: situations where this item is the right choice
- Status: imported | indexed | draft | active | archived
- Tags: `tag-one`, `tag-two`, `tag-three`
- Related entries: `entry-a`, `entry-b`
- Runtime or client support: Claude Code | Cursor | Gemini CLI | OpenCode | Python | Node | Markdown
- Size or scale: small | medium | large | very large
- Strengths: what makes it worth using
- Tradeoffs: limits, risk, or maintenance cost
- Download target: direct raw file, archive, package, or folder path
- Install or setup method: copy, plugin install, npx, pip, uv, or n/a
- Prerequisites: runtime, permissions, API keys, or companion tools
- Verification step: command or check that confirms the item is usable
```

## Usage Rules

- Keep fields in the same order across entries.
- Keep repo summaries in the same order as the repository summary schema.
- Use short controlled tags instead of free-form prose keywords.
- Prefer explicit source paths over vague references.
- Keep the first line summary short enough for quick scanning.
