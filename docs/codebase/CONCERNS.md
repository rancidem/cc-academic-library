# Concerns

## Repo hygiene

- The repo had `.DS_Store` noise at the repo root, in `docs/`, `commands/`, `resources/`, `templates/`, and inside `resources/cc-academic-sources/`; that cleanup is now complete.
- A repo-level ignore rule is still worth adding so the files do not come back and pollute future diffs or inventory refreshes.

## Source-bundle traceability

- `resources/source-references.md` now points to relative clone paths under `resources/cc-academic-sources/`. That is portable across checkouts, but it still needs regeneration after bundle moves or renames.
- The Matsen plugin subtree was flattened into tracked files by removing its nested `.git/` directory. That makes the bundle diffable here, but it also means upstream provenance now depends entirely on the reference table and the local clone path.

## Maintenance risk

- The library now mirrors six upstream bundles, but the sync rules are split across `README.md`, `STATUS.md`, `resources/source-references.md`, and `inventory.json`. Any future source refresh needs to update all of them together or the repo will drift.
- `resources/cc-academic-sources/` is a large vendor-style subtree inside the canonical library. Without a clear refresh procedure, it is easy to accidentally edit mirrored source files instead of the canonical copies, or to lose track of which changes are intentional local adaptations.

## Follow-up items

- Add a repo-level ignore rule for `.DS_Store` files and remove the already-added copies from the working tree.
- Decide whether `resources/source-references.md` should stay machine-local or switch to relative links plus a regeneration note.
- Document a repeatable refresh workflow for source bundles so future imports preserve provenance and keep `inventory.json` in sync.
