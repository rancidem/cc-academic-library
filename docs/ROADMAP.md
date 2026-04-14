# Roadmap: cc-academic canonical library

## Overview

Maintain a stable, organized canonical library of academic skills, commands, references, and mirrored source bundles. The current work is about hardening the maintenance model so imports, traceability, inventory, and audits stay in sync.

## Phases

- [x] **Phase 1: Rebaseline And Freeze The Current Model** - Record the current canonical layout, remove the old Matsen sidecar from the model, and make hygiene rules explicit.
- [x] **Phase 2: Introduce A Bundle Registry** - Add one authoritative registry for bundle origins and canonical destinations.
- [x] **Phase 3: Generate Traceability Docs From The Registry** - Generate `resources/source-references.md` from the registry so the traceability table stays in sync.
- [x] **Phase 4: Formalize Inventory Regeneration** - Make `inventory.json` a generated filesystem snapshot with `.DS_Store` and removed paths excluded.
- [x] **Phase 5: Add Maintenance Automation** - Provide a repeatable refresh command for registry, inventory, and status updates.
- [x] **Phase 6: Add Audit And Hygiene Checks** - Add repo-wide checks for stray files, stale sidecars, and metadata drift.
- [x] **Phase 7: Stabilize The Maintenance Docs** - Finish aligning README, STATUS, PROJECT, STATE, and skills guidance with the new operating model.

## Phase Details

### Phase 1: Rebaseline And Freeze The Current Model
**Goal**: Make the current repo state explicit before automation.
**Depends on**: Nothing
**Requirements**: [current architecture, hygiene rules]
**Success Criteria** (what must be TRUE):
  1. `resources/cc-academic-sources/` is clearly described as the upstream mirror.
  2. The canonical root surface is documented as the published output layer.
  3. `resources/matsengrp-agents` is absent from the canonical model.
  4. `.DS_Store` is ignored and no longer represented as maintenance noise.
**Plans**: Registry and traceability rollout in progress.

### Phase 2: Introduce A Bundle Registry
**Goal**: Create one authoritative source-of-truth for source bundles and canonical destinations.
**Depends on**: Phase 1
**Requirements**: [registry, canonical mapping]
**Success Criteria** (what must be TRUE):
  1. One registry file defines all bundle mappings.
  2. The registry includes the six tracked bundles and their canonical destinations.
  3. `matsengrp/plugins` is modeled as a two-way canonical split.
**Plans**: TBD

### Phase 3: Generate Traceability Docs From The Registry
**Goal**: Eliminate hand-maintained drift in the source map.
**Depends on**: Phase 2
**Requirements**: [generated markdown, traceability]
**Success Criteria** (what must be TRUE):
  1. `resources/source-references.md` is generated from the registry.
  2. The traceability table uses relative repository-root paths.
  3. `README.md` and `STATUS.md` summarize the model rather than define it.
**Plans**: TBD

### Phase 4: Formalize Inventory Regeneration
**Goal**: Make `inventory.json` a generated snapshot, not a maintenance burden.
**Depends on**: Phase 3
**Requirements**: [inventory generation, filesystem parity]
**Success Criteria** (what must be TRUE):
  1. `inventory.json` is regenerated from the live filesystem.
  2. `.DS_Store` entries are excluded from the snapshot.
  3. Removed canonical sidecars do not survive in the inventory.
**Plans**: TBD

### Phase 5: Add Maintenance Automation
**Goal**: Make the repo harder to drift.
**Depends on**: Phase 4
**Requirements**: [refresh command, repeatability]
**Success Criteria** (what must be TRUE):
  1. One repeatable refresh workflow updates registry, traceability, inventory, and status.
  2. Maintainers can run the maintenance workflow without remembering every step manually.
**Plans**: TBD

### Phase 6: Add Audit And Hygiene Checks
**Goal**: Catch structural and cleanliness regressions early.
**Depends on**: Phase 5
**Requirements**: [audit, hygiene]
**Success Criteria** (what must be TRUE):
  1. A single audit pass reports stray files and metadata drift.
  2. `.DS_Store` reintroduction is visible before commit.
  3. Registry, traceability docs, and inventory can be checked together.
**Plans**: TBD

### Phase 7: Stabilize The Maintenance Docs
**Goal**: Make the docs align with the new operating model.
**Depends on**: Phase 6
**Requirements**: [documentation, onboarding]
**Success Criteria** (what must be TRUE):
  1. New maintainers can follow the docs without historical context.
  2. The docs describe the current system, not the migration.
  3. Quick-task guidance stays available under `docs/quick/`.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Rebaseline And Freeze The Current Model | 1/TBD | Complete | 2026-04-14 |
| 2. Introduce A Bundle Registry | 1/TBD | Complete | 2026-04-14 |
| 3. Generate Traceability Docs From The Registry | 1/TBD | Complete | 2026-04-14 |
| 4. Formalize Inventory Regeneration | 1/TBD | Complete | 2026-04-14 |
| 5. Add Maintenance Automation | 1/TBD | Complete | 2026-04-14 |
| 6. Add Audit And Hygiene Checks | 1/TBD | Complete | 2026-04-14 |
| 7. Stabilize The Maintenance Docs | 1/TBD | Complete | 2026-04-14 |
