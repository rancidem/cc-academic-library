# Conventions

## Repository shape

- The canonical library is organized into stable top-level buckets: `agents/`, `commands/`, `references/`, `scripts/`, `skills/`, `templates/`, `tools/`, and `resources/`.
- Local source bundles live under `resources/cc-academic-sources/` and are treated as the traceable upstream copies for sync work.
- Canonical skill paths use descriptive, mostly kebab-case directory names such as `skills/writing-research/`, `skills/visualization/`, and `skills/clinical-medical/`.
- Mirrored bundle subtrees keep related files together instead of flattening them into unrelated folders.

## Markdown style

- Root-facing docs rely on short headings, compact bullet lists, and tables rather than long prose blocks.
- `README.md`, `STATUS.md`, and `resources/source-references.md` are the primary coordination documents for the library.
- Tables are used for source traceability and mapping, especially in `resources/source-references.md`.
- Fenced code blocks are used for commands, installation steps, and workflow examples.
- Backticks are used consistently for repo names, directories, skill names, and file paths.

## Traceability and sync rules

- `resources/bundle-registry.json` is the authoritative bundle registry and should be updated before derived docs.
- `resources/source-references.md` is the authoritative source-to-canonical map for the bundled upstream repos.
- `inventory.json` is the machine-readable snapshot used for sync checks and drift detection.
- `skills/README.md` states that any add, move, or delete should be followed by an `inventory.json` refresh and a source-to-canonical diff.
- `STATUS.md` is the short-form status ledger and records whether any source-to-canonical delta remains.

## What to preserve

- Keep summaries short and factual.
- Keep links and absolute paths current when a source bundle moves.
- Prefer deterministic structure over decorative formatting.
- Avoid introducing new layout conventions unless the canonical tree is being reorganized on purpose.
