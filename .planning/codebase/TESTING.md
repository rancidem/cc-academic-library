# Testing

## Current verification model

- There is no root-level automated test runner or app framework config in this checkout.
- No top-level `package.json`, `pytest` config, `vitest` config, `jest` config, or `playwright` config was present during the scan.
- Verification is mostly document-driven: the repo uses `STATUS.md`, `resources/source-references.md`, and `inventory.json` to confirm sync state.

## Repo-local checks that act like tests

- `scripts/maintenance/refresh.js audit` verifies bundle paths, canonical destinations, `.DS_Store` leakage, and removed Matsen sidecar references.
- `skills/README.md` instructs maintainers to regenerate `inventory.json` after any add, move, or delete.
- The same workflow expects a source-to-canonical diff rerun after each structural change.
- `STATUS.md` provides the visible verification summary, including missing/extra identity counts and the remaining delta.
- `resources/source-references.md` is used to confirm that each upstream bundle still points at the correct local clone path.

## Validation code present in mirrored bundles

- The source bundles contain many validation scripts instead of a single shared test harness.
- Common naming patterns include `validate_*.py`, `check_*.py`, and `verify_*.py`.
- Concrete examples in the mirrored bundles include `resources/cc-academic-sources/claude-scientific-writer/.claude/skills/document-skills/pdf/scripts/check_bounding_boxes_test.py` and `resources/cc-academic-sources/claude-scientific-writer/.claude/skills/scientific-schematics/test_ai_generation.py`.
- Other validation entrypoints include `validate_case_report.py`, `validate_cds_document.py`, `validate_treatment_plan.py`, `check_completeness.py`, and `check_system.py`.

## Recommended check sequence for mapping work

- Inspect the changed docs and source-reference rows.
- Run `node scripts/maintenance/refresh.js`.
- Regenerate `inventory.json`.
- Confirm the inventory line counts and source paths still match the filesystem.
- Review `STATUS.md` for any remaining delta or sync warning.
- If a bundle moved, verify the moved clone still matches its reference row and canonical subtree mapping.
