# Agents Index

Inventory of agents discovered across the cloned repositories.
Use the repo sections below to browse agents, then open the local link for in-project inspection or the raw link for the source file.

## Repository Summary

| Repo | Commands | Agents | Skills | Tools | Total | Best first | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| MySkills | 0 | 0 | 1 | 0 | 1 | README.md, then `skills/visual-architect/SKILL.md` | Best for quickly reviewing a compact Anthropic Skill pattern. |
| academic-paper-skills | 0 | 0 | 2 | 0 | 2 | README.md, then `strategist/SKILL.md` | Best for paper planning, outlining, and manuscript composition with checkpoints. |
| wtf-p | 36 | 11 | 2 | 3 | 52 | README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/` | Best when you want the assistant to behave like a structured writing tool; local clone keeps the Claude Code vendor tree only. |
| claude-scientific-writer | 1 | 0 | 27 | 3 | 31 | README.md, then `docs/DOCUMENTATION_INDEX.md` | Best for research-backed scientific output with citations, conversion, and figure generation; local clone keeps the canonical Claude Code skill tree only. |
| scientific-agent-skills | 0 | 0 | 134 | 0 | 134 | README.md, then `docs/scientific-skills.md` | Best when you want the widest scientific skill catalog and many domain-specific entry points. |

## Snapshot

- Total items: 11
- Commands: 0
- Agents: 11
- Skills: 0
- Tools: 0

## Featured Paths

- [Browse by task](categories.md) - task-first navigation for review, download, and install flows.
- [Featured stacks](stacks.md) - curated workflow bundles that include agents alongside their companion repos.
- [Repository summaries](repositories.md) - compare the cloned sources before opening a specific agent.

## Quick Jump

- [wtf-p](#wtf-p)

## Kind Filter: agent

## wtf-p

- Source URL: https://github.com/akougkas/wtf-p
- Local clone: `sources/wtf-p`
- Summary: Command-driven academic writing system with installer, commands, agents, and verification loops.
- Best first: README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/`
- How to use: Run `npx wtf-p`, then invoke the `/wtfp:*` commands in your assistant.
- Notes: Best when you want the assistant to behave like a structured writing tool; local clone keeps the Claude Code vendor tree only.
- Counts: 36 commands, 11 agents, 2 skills, 3 tools

### Agents

| Name | Summary | Contents | Use | Open | Raw | How to use | Tags | Status |
|---|---|---|---|---|---|---|---|---|
| [citation-expert](../sources/wtf-p/vendors/claude/agents/wtfp/citation-expert.md) | Searches academic databases (Semantic Scholar, CrossRef) for relevant papers and analyzes bibliography coverage against the paper's argument map. Produces... | Citation Expert, Tools, Capabilities, Principles, Workflow | Searches academic databases (Semantic Scholar, CrossRef) for relevant papers and analyzes bibliography coverage against the paper's argument map. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/citation-expert.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/citation-expert.md) | Spawned by the repo's command orchestrator. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `citation-management`, `orchestration` | imported |
| [citation-formatter](../sources/wtf-p/vendors/claude/agents/wtfp/citation-formatter.md) | Audits BibTeX files for missing keys, duplicate entries, and formatting errors. Cross-references in-text citations against the .bib file. Writes corrections to a... | Citation Formatter, Tools, Core Responsibilities, Critical Rules, Common Workflows | Audits BibTeX files for missing keys, duplicate entries, and formatting errors. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/citation-formatter.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/citation-formatter.md) | Spawned by the repo's command orchestrator. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `review`, `citation-management`, `orchestration` | imported |
| [wtfp-argument-verifier](../sources/wtf-p/vendors/claude/agents/wtfp/argument-verifier.md) | Goal-backward verification of written sections — checks that planned claims are made and supported, not just that tasks completed. Returns VERIFIED, GAPS FOUND, or... | role, context_fidelity, User Decision Fidelity, core_principle, verification_process, Step 1: Establish Must-Haves | You are a WTF-P argument verifier. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/argument-verifier.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/argument-verifier.md) | You are a WTF-P argument verifier. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `orchestration` | imported |
| [wtfp-coherence-checker](../sources/wtf-p/vendors/claude/agents/wtfp/coherence-checker.md) | Verifies cross-section consistency across terminology, argument coverage, narrative flow, cross-references, and contradictions. Returns COHERENT or GAPS FOUND with... | role, execution_flow, Pass 1: Terminology Consistency, Pass 2: Argument Coverage, Pass 3: Narrative Flow, Pass 4: Cross-Reference Validity | You are a WTF-P coherence checker. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/coherence-checker.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/coherence-checker.md) | You are a WTF-P coherence checker. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `citation-management`, `orchestration` | imported |
| [wtfp-outliner](../sources/wtf-p/vendors/claude/agents/wtfp/outliner.md) | Generates outline.md, argument-map.md, narrative-arc.md, and ROADMAP.md from PROJECT.md. Produces the structural foundation — section breakdown, word budgets, wave... | role, context_fidelity, CRITICAL: User Decision Fidelity, execution_flow, ... for all sections, structured_returns | You are a WTF-P outliner. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/outliner.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/outliner.md) | You are a WTF-P outliner. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `orchestration` | imported |
| [wtfp-plan-checker](../sources/wtf-p/vendors/claude/agents/wtfp/plan-checker.md) | Validates section plans against 7 quality dimensions: argument coverage, citation planning, word budgets, outline compliance, CONTEXT.md fidelity, style consistency,... | role, context_fidelity, User Decision Fidelity, core_principle, verification_dimensions, Dimension 1: Argument Coverage | You are a WTF-P plan checker. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/plan-checker.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/plan-checker.md) | You are a WTF-P plan checker. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `citation-management`, `orchestration` | imported |
| [wtfp-prose-polisher](../sources/wtf-p/vendors/claude/agents/wtfp/prose-polisher.md) | Eliminates AI-sounding patterns, varies sentence structure, and tightens academic prose while preserving citations and technical accuracy. Applies a user-selected... | role, context_fidelity, User Decision Fidelity, ai_pattern_detection, Patterns to Eliminate, Sentence-Level | You are a WTF-P prose polisher. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/prose-polisher.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/prose-polisher.md) | You are a WTF-P prose polisher. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `citation-management`, `orchestration` | imported |
| [wtfp-research-synthesizer](../sources/wtf-p/vendors/claude/agents/wtfp/research-synthesizer.md) | Investigates literature for a section using citation pipeline tools and web search. Produces RESEARCH.md with key citations, standard approaches, literature gaps, and... | role, context_fidelity, User Decision Fidelity, downstream_consumer, tool_strategy, Citation Pipeline Tools | You are a WTF-P research synthesizer. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/research-synthesizer.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/research-synthesizer.md) | You are a WTF-P research synthesizer. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `citation-management`, `orchestration` | imported |
| [wtfp-section-planner](../sources/wtf-p/vendors/claude/agents/wtfp/section-planner.md) | Creates executable PLAN.md files with argument decomposition, word budgets, citation mapping, and checkpoint placement. Honors locked decisions from CONTEXT.md.... | role, context_fidelity, CRITICAL: User Decision Fidelity, philosophy, Solo Writer + Claude Workflow, Plans Are Prompts | You are a WTF-P section planner. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/section-planner.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/section-planner.md) | You are a WTF-P section planner. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `planning`, `citation-management`, `orchestration` | imported |
| [wtfp-section-reviewer](../sources/wtf-p/vendors/claude/agents/wtfp/section-reviewer.md) | Runs 3-layer verification (citation, coherence, rubric) on a written section with configurable reviewer persona (Hostile, Area Chair, Editor, Mentor). Produces... | role, context_fidelity, User Decision Fidelity, reviewer_personas, Persona Definitions, Reviewer #2 (Hostile) | You are a WTF-P section reviewer. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/section-reviewer.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/section-reviewer.md) | You are a WTF-P section reviewer. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `review`, `citation-management`, `orchestration` | imported |
| [wtfp-section-writer](../sources/wtf-p/vendors/claude/agents/wtfp/section-writer.md) | Executes a PLAN.md file to produce academic prose in co-author, scaffold, or reviewer mode. Produces paper section files, SUMMARY.md, and per-task git commits. Returns... | role, context_fidelity, CRITICAL: User Decision Fidelity, execution_flow, What NOT to Write, structured_returns | You are a WTF-P section writer. | [open](../sources/wtf-p/vendors/claude/agents/wtfp/section-writer.md) | [raw](https://raw.githubusercontent.com/akougkas/wtf-p/main/vendors/claude/agents/wtfp/section-writer.md) | You are a WTF-P section writer. | `academic-writing`, `writing`, `claude-code`, `node`, `large`, `agent`, `agent-file`, `review`, `planning`, `orchestration` | imported |
