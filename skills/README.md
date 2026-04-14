# Skills

Canonical skill identities grouped by domain live here. Keep the tree stable, deterministic, and easy to diff.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| Writing and research | `skills/writing-research/` | Paper-writing, peer review, and research workflows |
| Visualization | `skills/visualization/` | Plotting, slides, schematics, and poster tooling |
| Lab automation | `skills/lab-automation/` | Protocol and instrument integrations |
| Biological domains | `skills/bioinformatics/`, `skills/cheminformatics/`, `skills/clinical-medical/`, `skills/computational-biology/` | Domain-specific scientific skills |
| General utilities | `skills/misc/` | Cross-cutting or low-frequency utilities |

## Quick Links

| Go to | Open |
|---|---|
| Source map | [resources/source-references.md](resources/source-references.md) |
| Registry | [resources/bundle-registry.json](resources/bundle-registry.json) |
| Snapshot | [inventory.json](inventory.json) |
| State | [docs/STATE.md](docs/STATE.md) |

## Rules

- Add a skill only once, at a single canonical path.
- Prefer descriptive top-level domains when reorganizing.
- Preserve the skill `name:` frontmatter when copying from a source bundle.
- Keep companion `references/`, `assets/`, and `scripts/` files next to the skill they support.
- Mirror the source structure when that best preserves identity.
- Do not leave empty category directories unless they are intentional placeholders.
- Record aliases in the root inventory or status file if a skill is renamed.
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
