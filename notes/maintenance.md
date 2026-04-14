# Maintenance Log

## 2026-04-14

- Refreshed the `.planning` docs so the project scope, requirements, roadmap, stack, integrations, and state all describe the action-first install/download workflow.
- Added action-first navigation for review, download, and install/setup workflows.
- Added install/setup fields to the shared entry template so tool and skill entries can carry verification and prerequisite notes.
- Added repo-level install and raw-download guidance to the repository summaries.
- Added raw-download and install guidance to the skills and tools indexes and the supporting resources page.
- Tightened the navigation hierarchy so `LIBRARY.md` is the single canonical dashboard.
- Converted `library/index.md` into a pointer page so `library/README.md` remains the only library intro page.
- Added task-based shortcuts at the top of `LIBRARY.md` for browsing by repo, item type, or maintenance/history.
- Shortened repeated intros in the inventory pages so the tables take visual priority sooner.
- Synced the dashboard, planning docs, and maintenance notes after the full inventory refresh.
- Expanded the library from a skills-only index into a full inventory of commands, agents, skills, and tools with raw source links.
- Added `library/inventory.md`, `library/commands.md`, `library/agents.md`, `library/skills.md`, and `library/tools.md` so each item type has its own fast index.
- Updated `LIBRARY.md` and the library docs to point to the master inventory first.
- Rebuilt the inventory generator so hidden and nested source folders are scanned for entry points.
- Trimmed the cloned sources to keep the Claude Code-relevant trees and removed redundant runtime mirrors.
- Added `scripts/generate_skills_index.py` so the library inventory pages can be rebuilt with summaries, use notes, open links, and raw download links.
- Rebuilt `library/inventory.md`, `library/commands.md`, `library/agents.md`, `library/skills.md`, and `library/tools.md` as indexed catalogs with summaries, use notes, open links, and raw download links.
- Updated the project docs to reflect the dashboard-first workflow and the active maintenance phase.
- Refined the master `LIBRARY.md` dashboard to prioritize personal usability.
- Expanded repository summaries with stronger entry points, cautions, and use cases.
- Tightened the library pages so the master catalog, repo matrix, and skills inventory agree on what to open first.
- Moved the project from `library/cc-academic` into `projects/cc-academic`.
- Removed stray `.DS_Store` files from the workspace.
- Prepared the project scaffold for active indexing work.
- Added a shared entry template, a comparison matrix, and a controlled tag taxonomy.
- Added the master `LIBRARY.md` catalog and `repos/README.md` quick-nav table.
- Added the exhaustive `library/inventory.md` master catalog and the type-specific index pages.

## 2026-04-14

- Created the cc-academic project scaffold.
- Cloned five upstream repositories into `sources/`.
- Added a markdown index in `library/`.
