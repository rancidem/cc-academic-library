# Scripts

Mirrored command and library utilities live here. The folder is organized by source bundle and maintenance support.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| Maintenance | `scripts/maintenance/` | Registry, traceability, inventory, and audit refreshes |
| Academic composer | `scripts/academic-paper-composer/` | Mirrored composer utilities |
| Academic strategist | `scripts/academic-paper-strategist/` | Mirrored strategist utilities |
| WTF-P commands | `scripts/wtfp-commands/` | Command-side runtime helpers |
| WTF-P library | `scripts/wtfp-lib/` | Library-side runtime helpers |

## Quick Links

| Go to | Open |
|---|---|
| Source map | [resources/source-references.md](resources/source-references.md) |
| Registry | [resources/bundle-registry.json](resources/bundle-registry.json) |
| Snapshot | [inventory.json](inventory.json) |
| Maintenance script | [scripts/maintenance/refresh.js](scripts/maintenance/refresh.js) |

## Common Entry Points

- `scripts/maintenance/refresh.js` - refreshes registry-derived docs, inventory, and status
- `scripts/maintenance/README.md` - explains the maintenance workflow
- `scripts/wtfp-commands/status.js` - CLI status helper
- `scripts/wtfp-lib/manifest.js` - manifest utilities for WTF-P

## Related Surfaces

- `resources/bundle-registry.json` is the source-of-truth for bundle mappings.
- `resources/source-references.md` is regenerated from the registry.
- `tools/` contains the mirrored auxiliary tooling.
