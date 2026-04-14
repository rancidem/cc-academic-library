# Skills Directory

This directory is the canonical skills index. Keep it stable, deterministic, and easy to diff.

## Rules

- Add a skill only once, at a single canonical path.
- Prefer descriptive top-level domains when reorganizing: `writing-research`, `visualization`, `lab-automation`, and similar groups.
- Preserve the skill `name:` frontmatter when copying from a source bundle.
- Keep companion `references/`, `assets/`, and `scripts/` files next to the skill they support.
- When a source bundle uses a nested package layout, flatten only if the canonical path already establishes a better home; otherwise mirror the source structure.
- Do not leave empty category directories unless they are intentional placeholders.
- If a skill is renamed in canonical form, record the alias in the root inventory or status file so sync checks can still trace it.
- After any add, move, or delete, update the bundle registry if the source bundle mapping changed, regenerate `resources/source-references.md`, regenerate `inventory.json`, and re-run the source-to-canonical diff.

## Maintenance Workflow

1. Copy new source files into the canonical path.
2. Confirm the skill name and frontmatter match the source identity.
3. Update the bundle registry if the mapping changed.
4. Regenerate `resources/source-references.md` and `inventory.json`.
5. Check for duplicate identities, missing companions, and empty directories.
6. Update the root `STATUS.md` if the sync state changed.

## Suggested Layout

- `writing-research/` for paper-writing and academic-workflow skills
- `visualization/` for plotting, slides, schematics, and poster tooling
- `lab-automation/` for protocol and instrument integrations
- `bioinformatics/`, `cheminformatics/`, and related scientific domains for package-specific skills
- `misc/` only for genuinely cross-cutting or low-frequency utilities
