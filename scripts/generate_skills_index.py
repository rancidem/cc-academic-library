#!/usr/bin/env python3
"""Generate the skills inventory markdown for cc-academic.

The generator reads the cloned repositories under `sources/`, extracts
per-skill metadata from each `SKILL.md`, and writes a grouped Markdown index
with local open links, raw download links, summary text, usage notes, and tags.
"""

from __future__ import annotations

import re
import textwrap
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import quote


ROOT = Path("/Users/emersonburke/Documents/developer/projects/cc-academic")
SOURCES = ROOT / "sources"
OUTPUT = ROOT / "library" / "skills.md"


@dataclass(frozen=True)
class RepoConfig:
    name: str
    local_root: Path
    source_url: str
    best_first: str
    how_to_use: str
    scale: str
    runtime_tags: tuple[str, ...]
    base_tags: tuple[str, ...]
    summary: str
    notes: str


REPOS: tuple[RepoConfig, ...] = (
    RepoConfig(
        name="MySkills",
        local_root=SOURCES / "MySkills",
        source_url="https://github.com/WilsonWukz/MySkills",
        best_first="README.md, then `skills/visual-architect/SKILL.md`",
        how_to_use="Copy the skill folder into Claude Code project knowledge or your user skills path.",
        scale="small",
        runtime_tags=("claude-code",),
        base_tags=("skill", "academic-writing", "presentation", "skill-file"),
        summary="Small personal skill library centered on a single visual-architecture skill.",
        notes="Best for quickly reviewing a compact Anthropic Skill pattern.",
    ),
    RepoConfig(
        name="academic-paper-skills",
        local_root=SOURCES / "academic-paper-skills",
        source_url="https://github.com/lishix520/academic-paper-skills",
        best_first="README.md, then `strategist/SKILL.md`",
        how_to_use="Copy `strategist/` and `composer/` into `~/.claude/skills`.",
        scale="small",
        runtime_tags=("claude-code", "python"),
        base_tags=("skill", "academic-writing", "planning", "review", "skill-file"),
        summary="Two-skill strategist/composer workflow for planning and writing academic papers.",
        notes="Best for paper planning, outlining, and manuscript composition with checkpoints.",
    ),
    RepoConfig(
        name="wtf-p",
        local_root=SOURCES / "wtf-p",
        source_url="https://github.com/akougkas/wtf-p",
        best_first="README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/`",
        how_to_use="Run `npx wtf-p`, then invoke the `/wtfp:*` commands in your assistant.",
        scale="large",
        runtime_tags=("claude-code", "gemini-cli", "opencode", "node"),
        base_tags=("repository", "academic-writing", "writing", "cli"),
        summary="Command-driven academic writing system with installer, commands, and verification loops.",
        notes="Best when you want the assistant to behave like a structured writing tool.",
    ),
    RepoConfig(
        name="claude-scientific-writer",
        local_root=SOURCES / "claude-scientific-writer",
        source_url="https://github.com/K-Dense-AI/claude-scientific-writer",
        best_first="README.md, then `docs/DOCUMENTATION_INDEX.md`",
        how_to_use="Install the plugin, or use `pip install scientific-writer` / `uv sync`, then follow the skill prompts.",
        scale="large",
        runtime_tags=("claude-code", "python"),
        base_tags=("repository", "scientific-writing", "writing", "plugin", "package"),
        summary="Scientific writing stack with plugin, CLI, Python package, and bundled skills.",
        notes="Best for research-backed scientific output with citations, conversion, and figure generation.",
    ),
    RepoConfig(
        name="scientific-agent-skills",
        local_root=SOURCES / "scientific-agent-skills",
        source_url="https://github.com/K-Dense-AI/scientific-agent-skills",
        best_first="README.md, then `docs/scientific-skills.md`",
        how_to_use="Run `npx skills add K-Dense-AI/scientific-agent-skills`.",
        scale="very-large",
        runtime_tags=("claude-code", "cursor", "python"),
        base_tags=("repository", "scientific-writing", "research-planning", "skill-file"),
        summary="Large Agent Skills catalog for scientific and research workflows.",
        notes="Best when you want the widest scientific skill catalog and many domain-specific entry points.",
    ),
)


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        return {}

    lines = text.splitlines()
    data: dict[str, str] = {}
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data


def extract_section_bullets(text: str, heading_names: Iterable[str]) -> list[str]:
    lines = text.splitlines()
    headings = {name.lower() for name in heading_names}
    start = None

    for index, line in enumerate(lines):
        if re.match(r"^##+\s+", line):
            heading = re.sub(r"^##+\s+", "", line).strip().lower()
            if heading in headings:
                start = index + 1
                break

    if start is None:
        return []

    bullets: list[str] = []
    current: list[str] = []
    for line in lines[start:]:
        if re.match(r"^##+\s+", line):
            break
        stripped = line.strip()
        if stripped.startswith(("- ", "* ")):
            if current:
                bullets.append(" ".join(current).strip())
                current = []
            current.append(stripped[2:].strip())
        elif current and stripped:
            current.append(stripped)
        elif current and not stripped:
            bullets.append(" ".join(current).strip())
            current = []
    if current:
        bullets.append(" ".join(current).strip())
    return bullets


def first_sentence(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return ""
    match = re.search(r"^(.+?[.!?])\s", text)
    if match:
        return match.group(1).strip()
    if len(text) > 180:
        return textwrap.shorten(text, width=180, placeholder="...")
    return text


def summarize_use(bullets: list[str], fallback: str) -> str:
    if bullets:
        selected = bullets[:2]
        return " ".join(first_sentence(b) for b in selected if b)
    return fallback


def infer_tags(repo: RepoConfig, skill_name: str, path: str, description: str, use_text: str) -> list[str]:
    text = f"{skill_name} {path} {description} {use_text}".lower()
    tags: list[str] = []

    def add(tag: str) -> None:
        if tag not in tags:
            tags.append(tag)

    for tag in repo.base_tags:
        add(tag)
    for tag in repo.runtime_tags:
        add(tag)
    add(repo.scale)
    if any(keyword in text for keyword in ["install", "setup", "configure", "uninstall", "update"]):
        add("installation")
    elif any(keyword in text for keyword in ["review", "evaluate", "audit", "critique"]):
        add("review")
    elif any(keyword in text for keyword in ["write", "draft", "compose", "generate", "manuscript"]):
        add("writing")
    else:
        add("planning")

    keyword_map = [
        (r"\bcitation(s)?\b", "citation-management"),
        (r"\bliterature[- ]review\b", "literature-review"),
        (r"\bpeer-review\b", "review"),
        (r"\bscholar-evaluation\b", "review"),
        (r"\bslides?\b|\bpptx\b|\bmarp\b", "presentation"),
        (r"\bposter(s)?\b", "poster"),
        (r"\bclinical\b|\btreatment(s)?\b|\bpatient(s)?\b", "clinical"),
        (r"\bgeopandas\b|\bgeomaster\b", "geospatial"),
    ]
    for pattern, tag in keyword_map:
        if re.search(pattern, text):
            add(tag)

    if repo.name == "scientific-agent-skills" and any(k in text for k in ["clinical", "patient", "treatment"]):
        add("sensitive")
    elif repo.name == "scientific-agent-skills":
        add("high")

    return tags


def make_raw_url(repo_url: str, rel_path: str) -> str:
    owner_repo = repo_url.rstrip("/").split("github.com/")[-1]
    return f"https://raw.githubusercontent.com/{owner_repo}/main/{quote(rel_path)}"


def make_local_link(repo_name: str, rel_path: str) -> str:
    return f"../sources/{repo_name}/{rel_path}"


def skill_sort_key(path: Path) -> tuple[str, str]:
    skill_name = path.parent.name
    return skill_name.lower(), str(path).lower()


def render_repo_section(repo: RepoConfig, files: list[Path]) -> str:
    lines: list[str] = []
    lines.append(f"## {repo.name}")
    lines.append("")
    lines.append(f"- Source URL: {repo.source_url}")
    lines.append(f"- Local clone: `sources/{repo.name}`")
    lines.append(f"- Summary: {repo.summary}")
    lines.append(f"- Best first: {repo.best_first}")
    lines.append(f"- How to use: {repo.how_to_use}")
    lines.append(f"- Notes: {repo.notes}")
    lines.append(f"- Skill files discovered: {len(files)}")
    lines.append("")
    lines.append("| Skill | Summary | Use | Raw | How to use | Tags | Status |")
    lines.append("|---|---|---|---|---|---|---|")

    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        frontmatter = parse_frontmatter(text)
        skill_name = frontmatter.get("name") or path.parent.name
        description = frontmatter.get("description") or ""
        use_bullets = extract_section_bullets(text, ("when to use this skill", "when to use", "usage guide", "how to use this skill"))

        if not description:
            description = first_sentence(text.split("\n\n", 1)[0])
        summary = textwrap.shorten(description.replace("\n", " "), width=160, placeholder="...")
        use_text = summarize_use(
            use_bullets,
            fallback=f"Use when working in this repo’s domain with the {skill_name} skill.",
        )
        use_text = textwrap.shorten(use_text, width=170, placeholder="...")
        rel_path = str(path.relative_to(repo.local_root))
        open_link = make_local_link(repo.name, rel_path)
        raw_link = make_raw_url(repo.source_url, rel_path)
        tags = infer_tags(repo, skill_name, rel_path, summary, use_text)

        lines.append(
            "| "
            f"[{skill_name}]({open_link})"
            " | "
            f"{summary}"
            " | "
            f"{use_text}"
            " | "
            f"[raw]({raw_link})"
            " | "
            f"{repo.how_to_use}"
            " | "
            f"`{'`, `'.join(tags)}`"
            " | imported |"
        )

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    repo_entries: list[tuple[RepoConfig, list[Path]]] = []
    all_skill_files: list[Path] = []

    for repo in REPOS:
        files = sorted(repo.local_root.rglob("SKILL.md"), key=skill_sort_key)
        repo_entries.append((repo, files))
        all_skill_files.extend(files)

    repo_summary_rows = [
        "| Repo | Source URL | Skill count | Best first | Notes |",
        "|---|---|---:|---|---|",
    ]
    for repo, files in repo_entries:
        repo_summary_rows.append(
            "| "
            f"{repo.name}"
            " | "
            f"{repo.source_url}"
            " | "
            f"{len(files)}"
            " | "
            f"{repo.best_first}"
            " | "
            f"{repo.notes}"
            " |"
        )

    intro = [
        "# Skills Inventory",
        "",
        "Indexed list of every discovered skill file in the cloned repositories.",
        "",
        "## How To Use",
        "",
        "- Start with the repo section you care about.",
        "- Open the skill link to inspect the local file in this project.",
        "- Use the raw link when you want the download-ready source file from GitHub.",
        "- Treat mirrored skill trees as separate files unless a repo section says otherwise.",
        "",
        "## Repository Summary",
        "",
        *repo_summary_rows,
        "",
        "## Notes",
        "",
        "- Open links are local paths relative to the project root.",
        "- Raw links point to download-ready GitHub URLs.",
        "- `How to use` is intentionally brief and repo-specific so the page stays scannable.",
        "",
    ]

    body = ["\n".join(intro)]
    for repo, files in repo_entries:
        body.append(render_repo_section(repo, files))

    OUTPUT.write_text("\n".join(body).rstrip() + "\n", encoding="utf-8")

    print(f"Wrote {OUTPUT} with {len(all_skill_files)} skill files.")


if __name__ == "__main__":
    main()
