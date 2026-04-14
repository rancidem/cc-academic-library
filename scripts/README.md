# Scripts

Mirrored command and library utilities live here. The folder is organized by source bundle and maintenance support.

## Navigate

| Area | Path | Purpose |
|---|---|---|
| Maintenance | `scripts/maintenance/` | Registry, traceability, inventory, and audit refreshes |
| Academic composer | `scripts/academic-paper-composer/` | Mirrored composer utilities |
| Academic strategist | `scripts/academic-paper-strategist/` | Mirrored strategist utilities |
| WTF-P commands | `scripts/wtfp-commands/` | Command-side runtime helpers |
| WTF-P library | `scripts/wtfp-lib/` | Library-side runtime helpers |

## Common Entry Points

- `scripts/maintenance/refresh.js` - refreshes registry-derived docs, inventory, and status
- `scripts/maintenance/README.md` - explains the maintenance workflow
- `scripts/wtfp-commands/status.js` - CLI status helper
- `scripts/wtfp-lib/manifest.js` - manifest utilities for WTF-P

## Related Surfaces

- `resources/bundle-registry.json` is the source-of-truth for bundle mappings.
- `resources/source-references.md` is regenerated from the registry.
- `tools/` contains the mirrored auxiliary tooling.
