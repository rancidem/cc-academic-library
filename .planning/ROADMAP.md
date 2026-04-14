# Roadmap: cc-academic canonical library

## Overview

Maintain a stable, organized canonical library of academic skills, commands, references, and mirrored source bundles. The near-term work is about keeping imports traceable, preserving layout discipline, and making quick-task tracking usable end to end.

## Phases

- [ ] **Phase 1: Canonical import hygiene** - Keep imported bundles grouped, documented, and traceable.
- [ ] **Phase 2: Quick-task tracking** - Establish the `.planning/quick/` workflow so ad hoc tasks can be recorded and reviewed.
- [ ] **Phase 3: Metadata maintenance** - Keep `inventory.json`, status notes, and source references synchronized with filesystem changes.

## Phase Details

### Phase 1: Canonical import hygiene
**Goal**: Preserve a clean canonical layout for source bundles.
**Depends on**: Nothing
**Requirements**: [stable grouping, provenance tracking]
**Success Criteria** (what must be TRUE):
  1. Imported bundles live in dedicated subtrees by source identity.
  2. `resources/source-references.md` records the upstream source and canonical mapping.
  3. `inventory.json` matches the filesystem.
**Plans**: TBD

### Phase 2: Quick-task tracking
**Goal**: Make quick tasks work end to end inside `.planning/quick/`.
**Depends on**: Phase 1
**Requirements**: [STATE tracking, quick task directories]
**Success Criteria** (what must be TRUE):
  1. `.planning/STATE.md` exists and reflects the current project position.
  2. `.planning/ROADMAP.md` exists so quick workflow validation passes.
  3. Quick task notes can be written under `.planning/quick/`.
**Plans**: TBD

### Phase 3: Metadata maintenance
**Goal**: Keep the library metadata synchronized with the filesystem.
**Depends on**: Phase 1
**Requirements**: [inventory consistency, status updates]
**Success Criteria** (what must be TRUE):
  1. `STATUS.md` reflects the current import state.
  2. `inventory.json` is regenerated after structural changes.
  3. Source mappings stay current after each import.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Canonical import hygiene | 0/TBD | Not started | - |
| 2. Quick-task tracking | 0/TBD | Not started | - |
| 3. Metadata maintenance | 0/TBD | Not started | - |
