# Continuation Format

Standard format for presenting next steps after completing a command or workflow.

## Core Structure

```
---

## ▶ Next Up

**{identifier}: {name}** — {one-line description}

`{command to copy-paste}`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- `{alternative option 1}` — description
- `{alternative option 2}` — description

---
```

## Format Rules

1. **Always show what it is** — name + description, never just a command path
2. **Pull context from source** — ROADMAP.md for sections, PLAN.md `<objective>` for plans
3. **Command in inline code** — backticks, easy to copy-paste, renders as clickable link
4. **`/clear` explanation** — always include, keeps it concise but explains why
5. **"Also available" not "Other options"** — sounds more app-like
6. **Visual separators** — `---` above and below to make it stand out

## Variants

### Execute Next Plan

```
---

## ▶ Next Up

**02-01: Methods Overview** — Draft study design and participant sections

`/wtfp:write-section docs/sections/02-methods/02-01-PLAN.md`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- Review plan before executing
- `/wtfp:list-assumptions 2` — check assumptions

---
```

### Plan a Section

```
---

## ▶ Next Up

**Section 2: Methods** — Describe study design, participants, and procedures

`/wtfp:plan-section 2`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- `/wtfp:discuss-section 2` — gather context first
- `/wtfp:research-gap 2` — investigate literature

---
```

### Section Complete, Ready for Next

```
---

## ✓ Section 2 Complete

2/2 plans executed
800 words written

## ▶ Next Up

**Section 3: Results** — Present main findings and analyses

`/wtfp:plan-section 3`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- `/wtfp:review-section 2` — verify before continuing
- `/wtfp:discuss-section 3` — gather context first

---
```

### Multiple Equal Options

When there's no clear primary action:

```
---

## ▶ Next Up

**Section 3: Results** — Present main findings and analyses

**To plan directly:** `/wtfp:plan-section 3`

**To discuss context first:** `/wtfp:discuss-section 3`

**To research literature:** `/wtfp:research-gap 3`

<sub>`/clear` first → fresh context window</sub>

---
```

### Draft Complete

```
---

## 🎉 Draft Complete

All 6 sections written
Total: 6,500 words

## ▶ Next Up

**Review & Polish** — Verify and prepare for submission

`/wtfp:review-section` — run full verification
`/wtfp:export-latex` — generate LaTeX output

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- `/wtfp:submit-milestone "draft-1"` — archive this version

---
```

## Pulling Context

### For sections (from ROADMAP.md):

```markdown
### 2. Methods
- **Goal**: Describe study design, participants, and procedures
- **Word Target**: 1500 words
```

Extract: `**Section 2: Methods** — Describe study design, participants, and procedures`

### For plans (from PLAN.md `<objective>`):

```xml
<objective>
Draft the study design and participant description.

Purpose: Establish methodological rigor and replicability.
Output: 800 words covering design, participants, procedures.
</objective>
```

Extract: `**02-01: Methods Overview** — Draft study design and participant sections`

## Anti-Patterns

### Don't: Command-only (no context)

```
## To Continue

Run `/clear`, then paste:
/wtfp:write-section docs/sections/02-methods/02-01-PLAN.md
```

User has no idea what 02-01 is about.

### Don't: Missing /clear explanation

```
`/wtfp:plan-section 3`

Run /clear first.
```

Doesn't explain why. User might skip it.

### Don't: "Other options" language

```
Other options:
- Review roadmap
```

Sounds like an afterthought. Use "Also available:" instead.

### Don't: Fenced code blocks for commands

```
```
/wtfp:plan-section 3
```
```

Fenced blocks inside templates create nesting ambiguity. Use inline backticks instead.
