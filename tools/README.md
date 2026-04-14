# Tools

Auxiliary tooling lives here. This area is intentionally small and focused on the mirrored `wcn` package.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| WCN tool | `tools/wcn/` | Mirrored package, CLI, examples, and spec |

## Quick Links

| Go to | Open |
|---|---|
| Source map | [resources/source-references.md](resources/source-references.md) |
| Registry | [resources/bundle-registry.json](resources/bundle-registry.json) |
| Snapshot | [inventory.json](inventory.json) |
| Spec | [tools/wcn/SPEC.md](tools/wcn/SPEC.md) |

## Common Files

- `tools/wcn/package.json` - Node package metadata
- `tools/wcn/cli.js` - command-line entrypoint
- `tools/wcn/converter.js` - conversion logic
- `tools/wcn/SPEC.md` - tool specification
- `tools/wcn/examples/` - example inputs and outputs

## Related Surfaces

- `scripts/wtfp-commands/` and `scripts/wtfp-lib/` mirror the rest of the WTF-P runtime surface.
- `references/wtfp/` documents the workflow model this tool supports.
- `inventory.json` records the current tool file set for sync checks.
