---
task: 1
description: Clone GitHub repos into personal library index
mode: quick
date: 2026-04-13
must_haves:
  truths:
    - repos/ directory exists with all 5 repos cloned
    - LIBRARY.md exists at project root with per-repo breakdown
    - repos/README.md quick-nav table exists
  artifacts:
    - repos/academic-paper-skills/
    - repos/wtf-p/
    - repos/MySkills/
    - repos/claude-scientific-writer/
    - repos/scientific-agent-skills/
    - LIBRARY.md
    - repos/README.md
---

# Quick Task 1: Clone GitHub Repos Into Personal Library Index

## Goal

Clone 5 GitHub repos containing academic/scientific Claude Code skills into a `repos/` folder and build a `LIBRARY.md` master index so the user can quickly browse, understand, and reuse the tools.

## Repos

| Repo | URL |
|------|-----|
| academic-paper-skills | https://github.com/lishix520/academic-paper-skills |
| wtf-p | https://github.com/akougkas/wtf-p |
| MySkills | https://github.com/WilsonWukz/MySkills |
| claude-scientific-writer | https://github.com/K-Dense-AI/claude-scientific-writer |
| scientific-agent-skills | https://github.com/K-Dense-AI/scientific-agent-skills |

---

## Task 1: Clone All Repos

**Files:** repos/

**Action:**
1. [ ] `mkdir -p repos`
2. [ ] Clone each repo into `repos/` (shallow clone for speed)
3. [ ] Verify all 5 dirs exist

**Verify:** `ls repos/ | wc -l` should output 5

---

## Task 2: Inspect Repos and Build LIBRARY.md

**Files:** LIBRARY.md, repos/README.md

**Action:**
1. [ ] Walk each cloned repo: read README, list skill files (.md in skills/ or root)
2. [ ] Write `LIBRARY.md` at project root with:
   - Repo name, source URL, description
   - List of skills/tools with brief description
   - Usage notes (how to install/use the skills)
3. [ ] Write `repos/README.md` as a quick-nav table linking to each repo subdir

**Verify:** `wc -l LIBRARY.md` > 50 lines; `cat repos/README.md` shows table

---

## Task 3: Commit Library Snapshot

**Files:** all

**Action:**
1. [ ] `git add repos/ LIBRARY.md repos/README.md`
2. [ ] `git commit -m "feat: clone academic skills repos + build library index"`

**Verify:** `git log --oneline -1` shows commit

---

## Success Criteria

- [ ] All 5 repos cloned under `repos/`
- [ ] `LIBRARY.md` documents every repo with skill list and usage notes
- [ ] `repos/README.md` quick-nav table exists
- [ ] Changes committed
