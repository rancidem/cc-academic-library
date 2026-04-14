# Integrations

## Claude Code Plugin Surface

- `resources/cc-academic-sources/matsengrp/plugins/` is a Claude Code plugin bundle.
- Its `.claude-plugin/plugin.json` declares the plugin name, homepage, license, agent directory, and hook entrypoint.
- The bundle includes `agents/`, `commands/pre-pr-check.md`, and `hooks/hooks.json`.
- The plugin content is now represented canonically only by `agents/matsengrp-agents/` and `commands/matsengrp-agents/`.

## External Tooling And Services

- `hooks/hooks.json` integrates with `terminal-notifier` on macOS.
- Notification hooks fire on `Notification` and `Stop` events.
- The plugin README explicitly lists `brew install terminal-notifier` as the prerequisite for desktop notifications.
- The plugin README also references the official Claude Code plugin documentation and a YouTube walkthrough for installation guidance.

## Upstream Repositories And Local Traceability

- `resources/bundle-registry.json` is the registry that drives the generated traceability doc and the refresh workflow.
- `resources/source-references.md` is the cross-reference table that maps each upstream source bundle to its local clone and canonical subtree.
- The mapped source bundles currently include `academic-paper-skills`, `claude-scientific-writer`, `MySkills`, `scientific-agent-skills`, `wtf-p`, and `matsengrp/plugins`.
- The upstream source repos are stored locally under `resources/cc-academic-sources/`, not referenced only by remote URLs.
- `resources/source-references.md` is the primary traceability layer for understanding where each canonical subtree came from.

## Runtime Dependencies Exposed By Mirrored Sources

- `resources/cc-academic-sources/claude-scientific-writer/pyproject.toml` depends on `claude-agent-sdk`, `python-dotenv`, `requests`, and `pymupdf`.
- The same project documents external system requirements for LaTeX distributions, `pdflatex`, `bibtex`, `latexmk`, Ghostscript, and ImageMagick.
- `resources/cc-academic-sources/wtf-p/package.json` exposes the `wcn` CLI and its Node scripts.
- `resources/cc-academic-sources/academic-paper-skills/README.md` describes a Claude Code workflow that depends on Python verification scripts and LaTeX-based authoring.

## Integration Summary

- The repo bridges local documentation with upstream source clones, while preserving provenance in a generated markdown table backed by a registry.
- The main live integrations are Claude Code plugin hooks, macOS notifications, and the runtimes required by the mirrored Python and Node subprojects.
