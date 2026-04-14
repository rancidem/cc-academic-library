# Structure

## Workspace Tree

```text
cc-academic/
├── README.md
├── LIBRARY.md
├── IDEA.md
├── library/
│   ├── README.md
│   ├── index.md
│   ├── inventory.md
│   ├── commands.md
│   ├── agents.md
│   ├── skills.md
│   ├── tools.md
│   ├── resources.md
│   ├── repositories.md
│   ├── entry-template.md
│   ├── taxonomy.md
│   └── generated/
│       └── .gitkeep
├── notes/
│   ├── README.md
│   └── maintenance.md
├── repos/
│   └── README.md
├── scripts/
│   └── generate_skills_index.py
├── sources/
│   ├── academic-paper-skills/
│   ├── wtf-p/
│   ├── MySkills/
│   ├── claude-scientific-writer/
│   └── scientific-agent-skills/
└── .planning/
    ├── PROJECT.md
    ├── REQUIREMENTS.md
    ├── ROADMAP.md
    ├── STATE.md
    ├── config.json
    ├── quick/
    │   └── 1-clone-github-repos-into-personal-library/
    │       └── 1-PLAN.md
    └── codebase/
        ├── STACK.md
        ├── INTEGRATIONS.md
        ├── ARCHITECTURE.md
        └── STRUCTURE.md
```

## Source Repository Structures

### `academic-paper-skills`

```text
academic-paper-skills/
├── strategist/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── composer/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
└── examples/
```

### `wtf-p`

```text
wtf-p/
├── bin/
│   ├── install.js
│   └── uninstall.js
├── core/
├── docs/
├── scripts/
├── test/
├── tests/
├── tools/
├── vendors/
└── package.json
```

### `MySkills`

```text
MySkills/
├── skills/
│   └── visual-architect/
├── README.md
├── index.html
└── marketplace.json
```

### `claude-scientific-writer`

```text
claude-scientific-writer/
├── commands/
├── docs/
├── scripts/
├── skills/
├── templates/
├── scientific_writer/
├── .claude/
├── .claude-plugin/
├── .cursor/
└── pyproject.toml
```

### `scientific-agent-skills`

```text
scientific-agent-skills/
├── docs/
├── scientific-skills/
├── scan_skills.py
├── pyproject.toml
└── uv.lock
```

## Structural Notes

- The workspace root is documentation-heavy and intentionally light on application code.
- `LIBRARY.md` is the canonical dashboard, while `library/README.md` is the library-folder landing page.
- The source clones are the only places where behavior, commands, and skill definitions live.
- The richest structure is in `scientific-agent-skills/`, but it is still organized as a catalog of independent skill units rather than a single app.
- The most package-like source is `claude-scientific-writer/`, which combines implementation code with plugin and workflow metadata.
- `library/` is the working index surface, and `notes/` is the short-lived maintenance/history surface.
