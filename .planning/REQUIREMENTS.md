# Requirements

## Functional

- Maintain an index of the five cloned upstream repositories.
- Keep `LIBRARY.md` as the first-page dashboard.
- Keep `library/inventory.md` as the full command, agent, skill, and tool inventory.
- Keep `library/repositories.md` as the detailed per-repo summary page.
- Keep `library/commands.md`, `library/agents.md`, `library/skills.md`, and `library/tools.md` as type-specific indexes.
- Keep `library/resources.md` as curated supporting references.
- Keep `repos/README.md` as the quick-nav table.
- Keep all entries readable in plain Markdown.
- Support fast navigation through cross-links and consistent headings.

## Content

- Each command, agent, skill, and tool entry must explain what it does, what it contains, when to use it, and where to open or download it.
- Each repository summary must show the best first document to open.
- Each entry should include useful tags, keywords, or related links when applicable.

## Maintenance

- Keep `sources/` aligned with upstream repositories.
- Note significant refreshes in `notes/maintenance.md`.
- Update the library when new command, agent, skill, tool, or notable workflow appears.
- Keep the dashboard, library pages, and planning files aligned.

## Non-Goals

- No shared runtime application.
- No database or publishing stack.
- No source repo mutation during indexing work.

## Acceptance Criteria

- The project lives in `projects/cc-academic`.
- The planning files describe the project clearly.
- The repository index is ready for expansion with consistent structure across all item types.
- Temporary desktop metadata files are removed from the workspace.
- The dashboard and per-repo summaries support quick personal reuse.
