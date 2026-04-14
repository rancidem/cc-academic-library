# Requirements

## Functional

- Maintain an index of the five cloned upstream repositories.
- Keep `LIBRARY.md` as the first-page dashboard.
- Keep `library/repositories.md` as the detailed per-repo summary page.
- Keep `library/skills.md` as the exhaustive skill inventory.
- Organize content into tools, skills, and resources.
- Keep `repos/README.md` as the quick-nav table.
- Keep all entries readable in plain Markdown.
- Support fast navigation through cross-links and consistent headings.

## Content

- Each entry must explain what it does, what it contains, and when to use it.
- Each repository summary must show the best first document to open.
- Each entry should include useful tags, keywords, or related links when applicable.

## Maintenance

- Keep `sources/` aligned with upstream repositories.
- Note significant refreshes in `notes/maintenance.md`.
- Update the library when new skill directories or notable workflows appear.
- Keep the dashboard, library pages, and planning files aligned.

## Non-Goals

- No shared runtime application.
- No database or publishing stack.
- No source repo mutation during indexing work.

## Acceptance Criteria

- The project lives in `projects/cc-academic`.
- The planning files describe the project clearly.
- The repository index is ready for expansion with consistent structure.
- Temporary desktop metadata files are removed from the workspace.
- The dashboard and per-repo summaries support quick personal reuse.
