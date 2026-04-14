# Tools

Auxiliary tooling lives here. This area is intentionally small and focused on the mirrored `wcn` package.

## Navigate

| Area | Path | Purpose |
|---|---|---|
| WCN tool | `tools/wcn/` | Mirrored package, CLI, examples, and spec |

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
