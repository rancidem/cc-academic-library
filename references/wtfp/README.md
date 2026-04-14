# WTF-P References

Workflow and policy guidance for the writing system live here. These references explain the planning model, review rules, and orchestration patterns used across the repo.

## At A Glance

| Area | Path | Purpose |
|---|---|---|
| Core principles | `references/wtfp/principles.md` | WTF-P operating principles |
| Plan format | `references/wtfp/plan-format.md` | How prompts/plans are structured |
| Orchestration | `references/wtfp/orchestrator-pattern.md` | Multi-step orchestration model |
| Context fidelity | `references/wtfp/context-fidelity.md` | Keeping writing grounded in source context |
| Review and checks | `references/wtfp/checkpoints.md`, `references/wtfp/research-pitfalls.md` | Verification and failure modes |

## Quick Links

| Go to | Open |
|---|---|
| Root references | [references/README.md](../README.md) |
| Source map | [resources/source-references.md](../../resources/source-references.md) |
| Registry | [resources/bundle-registry.json](../../resources/bundle-registry.json) |
| Snapshot | [inventory.json](../../inventory.json) |

## Common Files

- `agent-model-matrix.md` - agent role mapping
- `continuation-format.md` - continuation and handoff formatting
- `deviation-rules.md` - when to auto-fix versus ask
- `git-integration.md` - commit and workflow conventions
- `ui-brand.md` - visual/brand guidance

## Related Surfaces

- `templates/` contains planning and writing templates used by these references.
- `skills/writing-research/` contains the canonical writing skills that consume this guidance.
- `scripts/maintenance/refresh.js` keeps the traceability and snapshot docs synchronized.
