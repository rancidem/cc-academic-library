#!/usr/bin/env python3
"""Generate the cc-academic inventory indexes.

The generator scans cloned repositories under ``sources/`` and writes
Markdown indexes for commands, agents, skills, tools, plus a master
inventory that groups everything by repository and kind.
"""

from __future__ import annotations

import re
import textwrap
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import quote


ROOT = Path("/Users/emersonburke/Documents/developer/projects/cc-academic")
SOURCES = ROOT / "sources"
OUTPUTS = {
    "inventory": ROOT / "library" / "inventory.md",
    "commands": ROOT / "library" / "commands.md",
    "agents": ROOT / "library" / "agents.md",
    "skills": ROOT / "library" / "skills.md",
    "tools": ROOT / "library" / "tools.md",
}


@dataclass(frozen=True)
class ToolConfig:
    name: str
    root_path: str
    primary_rel_path: str
    how_to_use: str
    summary_hint: str = ""
    contents_hint: str = ""


@dataclass(frozen=True)
class RepoConfig:
    name: str
    local_root: Path
    source_url: str
    summary: str
    notes: str
    best_first: str
    skill_how_to_use: str
    scale: str
    runtime_tags: tuple[str, ...]
    base_tags: tuple[str, ...]
    command_namespace: str = ""
    skill_roots: tuple[str, ...] = ()
    command_roots: tuple[str, ...] = ()
    agent_roots: tuple[str, ...] = ()
    tool_entries: tuple[ToolConfig, ...] = ()


@dataclass(frozen=True)
class InventoryItem:
    repo: str
    kind: str
    name: str
    rel_path: str
    source_url: str
    local_link: str
    raw_link: str
    summary: str
    contents: str
    use_text: str
    how_to_use: str
    tags: tuple[str, ...]
    status: str = "imported"


REPOS: tuple[RepoConfig, ...] = (
    RepoConfig(
        name="MySkills",
        local_root=SOURCES / "MySkills",
        source_url="https://github.com/WilsonWukz/MySkills",
        summary="Small personal skill library centered on a single visual-architecture skill.",
        notes="Best for quickly reviewing a compact Anthropic Skill pattern.",
        best_first="README.md, then `skills/visual-architect/SKILL.md`",
        skill_how_to_use="Copy the skill folder into Claude Code project knowledge or your user skills path.",
        scale="small",
        runtime_tags=("claude-code",),
        base_tags=("academic-writing", "presentation"),
        skill_roots=("skills",),
    ),
    RepoConfig(
        name="academic-paper-skills",
        local_root=SOURCES / "academic-paper-skills",
        source_url="https://github.com/lishix520/academic-paper-skills",
        summary="Two-skill strategist/composer workflow for planning and writing academic papers.",
        notes="Best for paper planning, outlining, and manuscript composition with checkpoints.",
        best_first="README.md, then `strategist/SKILL.md`",
        skill_how_to_use="Copy `strategist/` and `composer/` into `~/.claude/skills`.",
        scale="small",
        runtime_tags=("claude-code", "python"),
        base_tags=("academic-writing", "planning", "review"),
        skill_roots=("strategist", "composer"),
    ),
    RepoConfig(
        name="wtf-p",
        local_root=SOURCES / "wtf-p",
        source_url="https://github.com/akougkas/wtf-p",
        summary="Command-driven academic writing system with installer, commands, agents, and verification loops.",
        notes="Best when you want the assistant to behave like a structured writing tool; local clone keeps the Claude Code vendor tree only.",
        best_first="README.md, then `docs/BUILD_AND_RELEASE.md` and `bin/commands/`",
        skill_how_to_use="Run `npx wtf-p`, then invoke the `/wtfp:*` commands in your assistant.",
        scale="large",
        runtime_tags=("claude-code", "node"),
        base_tags=("academic-writing", "writing"),
        command_namespace="wtfp",
        skill_roots=("vendors/claude/skills",),
        command_roots=("vendors/claude/commands/wtfp",),
        agent_roots=("vendors/claude/agents/wtfp",),
        tool_entries=(
            ToolConfig(
                name="WCN workflow compressor",
                root_path="tools/wcn",
                primary_rel_path="tools/wcn/SPEC.md",
                how_to_use="Run `wcn` or read the WCN spec to convert verbose workflow instructions into compact notation.",
                summary_hint="Token-efficient workflow compression CLI and notation package.",
                contents_hint="SPEC.md, cli.js, converter.js, package.json, swap-workflows.sh, examples/",
            ),
            ToolConfig(
                name="WTF-P command runtime",
                root_path="bin/commands",
                primary_rel_path="bin/commands/list.js",
                how_to_use="Used internally by WTF-P for install, list, status, doctor, and update flows.",
                summary_hint="Command runtime helpers for installation, listing, diagnostics, status, and updates.",
                contents_hint="doctor.js, install-logic.js, list.js, status.js, update.js",
            ),
            ToolConfig(
                name="Claude plugin manifest",
                root_path="vendors/claude/.claude-plugin",
                primary_rel_path="vendors/claude/.claude-plugin/plugin.json",
                how_to_use="Installed through Claude's plugin flow when you want the WTF-P bundle available.",
                summary_hint="Plugin manifest that wires the Claude vendor bundle into the local install.",
                contents_hint="plugin.json",
            ),
        ),
    ),
    RepoConfig(
        name="claude-scientific-writer",
        local_root=SOURCES / "claude-scientific-writer",
        source_url="https://github.com/K-Dense-AI/claude-scientific-writer",
        summary="Scientific writing stack with plugin, CLI, Python package, and bundled skills.",
        notes="Best for research-backed scientific output with citations, conversion, and figure generation; local clone keeps the canonical Claude Code skill tree only.",
        best_first="README.md, then `docs/DOCUMENTATION_INDEX.md`",
        skill_how_to_use="Install the plugin, or use `pip install scientific-writer` / `uv sync`, then follow the skill prompts.",
        scale="large",
        runtime_tags=("claude-code", "python"),
        base_tags=("scientific-writing", "writing"),
        command_namespace="scientific-writer",
        skill_roots=(".claude/skills",),
        command_roots=("commands",),
        tool_entries=(
            ToolConfig(
                name="Scientific Writer package",
                root_path="scientific_writer",
                primary_rel_path="pyproject.toml",
                how_to_use="Install with `pip install scientific-writer` or `uv sync`, then use the CLI or import the package.",
                summary_hint="Python package powering the Scientific Writer CLI and API.",
                contents_hint="scientific_writer/api.py, cli.py, core.py, models.py, utils.py",
            ),
            ToolConfig(
                name="Scientific Writer plugin manifest",
                root_path=".claude-plugin",
                primary_rel_path=".claude-plugin/marketplace.json",
                how_to_use="Install through Claude's plugin flow to expose the bundled Scientific Writer skills.",
                summary_hint="Plugin metadata for the Scientific Writer bundle.",
                contents_hint="marketplace.json",
            ),
            ToolConfig(
                name="Scientific Writer maintenance scripts",
                root_path="scripts",
                primary_rel_path="scripts/README.md",
                how_to_use="Use for packaging, publishing, and verification tasks around the Scientific Writer distribution.",
                summary_hint="Maintenance scripts for versioning, publishing, and verification.",
                contents_hint="bump_version.py, publish.py, verify_package.py",
            ),
        ),
    ),
    RepoConfig(
        name="scientific-agent-skills",
        local_root=SOURCES / "scientific-agent-skills",
        source_url="https://github.com/K-Dense-AI/scientific-agent-skills",
        summary="Large Agent Skills catalog for scientific and research workflows.",
        notes="Best when you want the widest scientific skill catalog and many domain-specific entry points.",
        best_first="README.md, then `docs/scientific-skills.md`",
        skill_how_to_use="Run `npx skills add K-Dense-AI/scientific-agent-skills`.",
        scale="very-large",
        runtime_tags=("claude-code", "python"),
        base_tags=("scientific-writing", "research-planning"),
        skill_roots=("scientific-skills",),
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


def extract_block(text: str, tag: str) -> str:
    pattern = rf"<{re.escape(tag)}>(.*?)</{re.escape(tag)}>"
    match = re.search(pattern, text, flags=re.S | re.I)
    if match:
        return re.sub(r"\s+", " ", match.group(1)).strip()
    return ""


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


def extract_headings(text: str, limit: int = 6) -> list[str]:
    headings: list[str] = []
    for line in text.splitlines():
        match = re.match(r"^(#{1,3})\s+(.+)$", line)
        if match:
            headings.append(match.group(2).strip())
        elif re.match(r"^<([a-zA-Z0-9_-]+)>$", line.strip()):
            headings.append(re.sub(r"^<|>$", "", line.strip()))
        if len(headings) >= limit:
            break
    return headings


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


def make_raw_url(repo_url: str, rel_path: str) -> str:
    owner_repo = repo_url.rstrip("/").split("github.com/")[-1]
    return f"https://raw.githubusercontent.com/{owner_repo}/main/{quote(rel_path)}"


def make_local_link(repo_name: str, rel_path: str) -> str:
    return f"../sources/{repo_name}/{rel_path}"


def normalize_rel_path(path: Path, root: Path) -> str:
    return str(path.relative_to(root)).replace("\\", "/")


def collect_skill_files(repo: RepoConfig) -> list[Path]:
    files: list[Path] = []
    for rel_root in repo.skill_roots:
        skill_root = repo.local_root / rel_root
        if skill_root.exists():
            files.extend(sorted(skill_root.rglob("SKILL.md"), key=lambda p: (p.parent.name.lower(), str(p).lower())))
    return sorted({path for path in files}, key=lambda p: (p.parent.name.lower(), str(p).lower()))


def collect_files(root: Path, pattern: str) -> list[Path]:
    if not root.exists():
        return []
    return sorted(root.rglob(pattern), key=lambda p: (p.name.lower(), str(p).lower()))


def summarize_contents_from_markdown(text: str) -> str:
    headings = extract_headings(text, limit=6)
    if headings:
        return ", ".join(headings)
    return "frontmatter, instructions"


def summarize_support_contents(root: Path, max_items: int = 8) -> str:
    if not root.exists():
        return ""
    items: list[str] = []
    for child in sorted(root.iterdir(), key=lambda p: p.name.lower()):
        if child.name == ".DS_Store":
            continue
        if child.is_dir():
            items.append(f"{child.name}/")
        else:
            items.append(child.name)
    if not items:
        return ""
    if len(items) > max_items:
        return ", ".join(items[:max_items]) + f", +{len(items) - max_items} more"
    return ", ".join(items)


def derive_tags(
    repo: RepoConfig,
    kind: str,
    rel_path: str,
    summary: str,
    use_text: str,
) -> tuple[str, ...]:
    text = f"{repo.name} {kind} {rel_path} {summary} {use_text}".lower()
    tags: list[str] = []

    def add(tag: str) -> None:
        if tag not in tags:
            tags.append(tag)

    for tag in repo.base_tags:
        add(tag)
    for tag in repo.runtime_tags:
        add(tag)
    add(repo.scale)
    add(kind)

    surface_map = {
        "command": "command-file",
        "agent": "agent-file",
        "skill": "skill-file",
        "tool": "tool-root",
    }
    add(surface_map[kind])

    if any(keyword in text for keyword in ["install", "setup", "configure", "update"]):
        add("installation")
    if any(keyword in text for keyword in ["review", "evaluate", "audit", "critique"]):
        add("review")
    if any(keyword in text for keyword in ["write", "draft", "compose", "generate", "manuscript"]):
        add("writing")
    if any(keyword in text for keyword in ["plan", "roadmap", "outline", "argu", "structure"]):
        add("planning")
    if any(keyword in text for keyword in ["slides", "pptx", "marp"]):
        add("presentation")
    if any(keyword in text for keyword in ["poster"]):
        add("poster")
    if any(keyword in text for keyword in ["citation", "bibtex", "references"]):
        add("citation-management")
    if any(keyword in text for keyword in ["clinical", "patient", "treatment"]):
        add("clinical")

    if kind in {"command", "agent"}:
        add("orchestration")
    if kind == "tool":
        if any(keyword in text for keyword in ["cli", "command", "command-line"]):
            add("cli")
        if any(keyword in text for keyword in ["plugin"]):
            add("plugin")
        if any(keyword in text for keyword in ["package", "pyproject", "python"]):
            add("package")
        if any(keyword in text for keyword in ["scripts"]):
            add("scripts")

    return tuple(tags)


def build_skill_item(repo: RepoConfig, path: Path) -> InventoryItem:
    text = path.read_text(encoding="utf-8", errors="ignore")
    frontmatter = parse_frontmatter(text)
    skill_name = frontmatter.get("name") or path.parent.name
    description = frontmatter.get("description") or extract_block(text, "description")
    if not description:
        overview = summarize_use(extract_section_bullets(text, ("overview",)), fallback="")
        description = overview or first_sentence(text.split("\n\n", 1)[0])
    summary = textwrap.shorten(description.replace("\n", " "), width=170, placeholder="...")

    use_text = summarize_use(
        extract_section_bullets(text, ("when to use this skill", "when to use", "usage guide", "how to use this skill")),
        fallback=f"Use through Claude Code skill invocation for {skill_name}.",
    )
    use_text = textwrap.shorten(use_text, width=180, placeholder="...")

    rel_path = normalize_rel_path(path, repo.local_root)
    contents = summarize_support_contents(path.parent)
    how_to_use = repo.skill_how_to_use
    tags = derive_tags(repo, "skill", rel_path, summary, use_text)
    return InventoryItem(
        repo=repo.name,
        kind="skill",
        name=skill_name,
        rel_path=rel_path,
        source_url=repo.source_url,
        local_link=make_local_link(repo.name, rel_path),
        raw_link=make_raw_url(repo.source_url, rel_path),
        summary=summary,
        contents=contents or summarize_contents_from_markdown(text),
        use_text=use_text,
        how_to_use=how_to_use,
        tags=tags,
    )


def derive_command_name(repo: RepoConfig, path: Path, frontmatter: dict[str, str]) -> str:
    if frontmatter.get("name"):
        return frontmatter["name"]
    stem = path.stem
    prefix = f"{repo.command_namespace}-"
    if repo.command_namespace and stem.startswith(prefix):
        return f"/{repo.command_namespace}:{stem[len(prefix):]}"
    if repo.command_namespace:
        return f"/{repo.command_namespace}:{stem}"
    return stem


def build_command_item(repo: RepoConfig, path: Path) -> InventoryItem:
    text = path.read_text(encoding="utf-8", errors="ignore")
    frontmatter = parse_frontmatter(text)
    command_name = derive_command_name(repo, path, frontmatter)
    description = frontmatter.get("description") or extract_block(text, "objective")
    if not description:
        description = first_sentence(extract_block(text, "context") or text.split("\n\n", 1)[0])
    summary = textwrap.shorten(description.replace("\n", " "), width=170, placeholder="...")

    objective = extract_block(text, "objective")
    context = extract_block(text, "context")
    use_text = first_sentence(objective or context or summary)
    if not use_text:
        use_text = f"Run {command_name} in Claude Code."
    use_text = textwrap.shorten(use_text, width=180, placeholder="...")

    contents = ", ".join(extract_headings(text)) or "frontmatter, objective, context, process"
    rel_path = normalize_rel_path(path, repo.local_root)
    how_to_use = first_sentence(context or objective or f"Run {command_name} in Claude Code.")
    if not how_to_use:
        how_to_use = f"Run {command_name} in Claude Code."
    tags = derive_tags(repo, "command", rel_path, summary, use_text)
    return InventoryItem(
        repo=repo.name,
        kind="command",
        name=command_name,
        rel_path=rel_path,
        source_url=repo.source_url,
        local_link=make_local_link(repo.name, rel_path),
        raw_link=make_raw_url(repo.source_url, rel_path),
        summary=summary,
        contents=contents,
        use_text=use_text,
        how_to_use=how_to_use,
        tags=tags,
    )


def build_agent_item(repo: RepoConfig, path: Path) -> InventoryItem:
    text = path.read_text(encoding="utf-8", errors="ignore")
    frontmatter = parse_frontmatter(text)
    agent_name = frontmatter.get("name") or path.stem
    description = frontmatter.get("description") or extract_block(text, "role")
    if not description:
        description = first_sentence(text.split("\n\n", 1)[0])
    summary = textwrap.shorten(description.replace("\n", " "), width=170, placeholder="...")

    role = extract_block(text, "role")
    execution = extract_block(text, "execution_flow")
    use_text = first_sentence(role or execution or summary)
    if not use_text:
        use_text = f"Spawned by the repo's command orchestrator."
    use_text = textwrap.shorten(use_text, width=180, placeholder="...")

    contents = ", ".join(extract_headings(text)) or "role, execution_flow, structured_returns"
    rel_path = normalize_rel_path(path, repo.local_root)
    how_to_use = first_sentence(role or f"Spawned by the repo's command orchestrator.")
    if not how_to_use:
        how_to_use = "Spawned by the repo's command orchestrator."
    tags = derive_tags(repo, "agent", rel_path, summary, use_text)
    return InventoryItem(
        repo=repo.name,
        kind="agent",
        name=agent_name,
        rel_path=rel_path,
        source_url=repo.source_url,
        local_link=make_local_link(repo.name, rel_path),
        raw_link=make_raw_url(repo.source_url, rel_path),
        summary=summary,
        contents=contents,
        use_text=use_text,
        how_to_use=how_to_use,
        tags=tags,
    )


def build_tool_item(repo: RepoConfig, tool: ToolConfig) -> InventoryItem:
    root = repo.local_root / tool.root_path
    primary = repo.local_root / tool.primary_rel_path
    text = primary.read_text(encoding="utf-8", errors="ignore") if primary.exists() else ""
    frontmatter = parse_frontmatter(text)
    description = tool.summary_hint or frontmatter.get("description") or extract_block(text, "overview") or first_sentence(
        text.split("\n\n", 1)[0] if text else tool.name
    )
    summary = textwrap.shorten(description.replace("\n", " "), width=170, placeholder="...")

    use_text = tool.how_to_use
    if not use_text:
        use_text = first_sentence(extract_block(text, "quick start") or extract_block(text, "installation") or summary)
    use_text = textwrap.shorten(use_text, width=180, placeholder="...")

    contents = tool.contents_hint or summarize_support_contents(root) or summarize_contents_from_markdown(text)
    rel_path = normalize_rel_path(primary, repo.local_root)
    tags = derive_tags(repo, "tool", rel_path, summary, use_text)
    return InventoryItem(
        repo=repo.name,
        kind="tool",
        name=tool.name,
        rel_path=rel_path,
        source_url=repo.source_url,
        local_link=make_local_link(repo.name, rel_path),
        raw_link=make_raw_url(repo.source_url, rel_path),
        summary=summary,
        contents=contents,
        use_text=use_text,
        how_to_use=tool.how_to_use,
        tags=tags,
    )


def collect_repo_items(repo: RepoConfig) -> list[InventoryItem]:
    items: list[InventoryItem] = []

    for path in collect_skill_files(repo):
        items.append(build_skill_item(repo, path))

    for rel_root in repo.command_roots:
        root = repo.local_root / rel_root
        for path in collect_files(root, "*.md"):
            items.append(build_command_item(repo, path))

    for rel_root in repo.agent_roots:
        root = repo.local_root / rel_root
        for path in collect_files(root, "*.md"):
            items.append(build_agent_item(repo, path))

    for tool in repo.tool_entries:
        items.append(build_tool_item(repo, tool))

    return sorted(items, key=lambda item: (item.kind, item.name.lower(), item.rel_path.lower()))


def render_table(items: list[InventoryItem], include_kind: bool) -> str:
    if include_kind:
        headers = "| Kind | Name | Summary | Contents | Use | Open | Raw | How to use | Tags | Status |"
        sep = "|---|---|---|---|---|---|---|---|---|---|"
    else:
        headers = "| Name | Summary | Contents | Use | Open | Raw | How to use | Tags | Status |"
        sep = "|---|---|---|---|---|---|---|---|---|"

    lines = [headers, sep]
    for item in items:
        tags = "`" + "`, `".join(item.tags) + "`"
        if include_kind:
            row = [
                item.kind,
                f"[{item.name}]({item.local_link})",
                item.summary,
                item.contents or "—",
                item.use_text,
                f"[open]({item.local_link})",
                f"[raw]({item.raw_link})",
                item.how_to_use,
                tags,
                item.status,
            ]
        else:
            row = [
                f"[{item.name}]({item.local_link})",
                item.summary,
                item.contents or "—",
                item.use_text,
                f"[open]({item.local_link})",
                f"[raw]({item.raw_link})",
                item.how_to_use,
                tags,
                item.status,
            ]
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def build_repo_summary_rows(repo_to_items: dict[str, list[InventoryItem]]) -> list[str]:
    rows = ["| Repo | Commands | Agents | Skills | Tools | Total | Best first | Notes |", "|---|---:|---:|---:|---:|---:|---|---|"]
    for repo in REPOS:
        items = repo_to_items.get(repo.name, [])
        counts = Counter(item.kind for item in items)
        rows.append(
            "| "
            f"{repo.name}"
            " | "
            f"{counts.get('command', 0)}"
            " | "
            f"{counts.get('agent', 0)}"
            " | "
            f"{counts.get('skill', 0)}"
            " | "
            f"{counts.get('tool', 0)}"
            " | "
            f"{len(items)}"
            " | "
            f"{repo.best_first}"
            " | "
            f"{repo.notes}"
            " |"
        )
    return rows


def render_page(title: str, repo_to_items: dict[str, list[InventoryItem]], kind_filter: str | None) -> str:
    all_items = [item for repo in REPOS for item in repo_to_items.get(repo.name, [])]
    if kind_filter:
        page_items = [item for item in all_items if item.kind == kind_filter]
    else:
        page_items = all_items

    kind_name = kind_filter or "all"
    totals = Counter(item.kind for item in page_items)
    total_count = len(page_items)
    intro_map = {
        None: "Inventory of commands, agents, skills, and tools discovered across the cloned repositories.",
        "command": "Inventory of commands discovered across the cloned repositories.",
        "agent": "Inventory of agents discovered across the cloned repositories.",
        "skill": "Inventory of skills discovered across the cloned repositories.",
        "tool": "Inventory of tools discovered across the cloned repositories.",
    }

    intro = [
        f"# {title}",
        "",
        intro_map[kind_filter],
        "",
        "## How To Use",
        "",
        "- Start with the repo section you care about.",
        "- Open the local link to inspect the item inside this project.",
        "- Use the raw link when you want the download-ready source file from GitHub.",
        "- Treat hidden and nested source folders as first-class inventory unless the repo section says otherwise.",
        "",
        "## Repository Summary",
        "",
        *build_repo_summary_rows(repo_to_items),
        "",
        "## Snapshot",
        "",
        f"- Total items: {total_count}",
        f"- Commands: {totals.get('command', 0)}",
        f"- Agents: {totals.get('agent', 0)}",
        f"- Skills: {totals.get('skill', 0)}",
        f"- Tools: {totals.get('tool', 0)}",
        "",
        "## Quick Jump",
        "",
        "- [MySkills](#myskills)",
        "- [academic-paper-skills](#academic-paper-skills)",
        "- [wtf-p](#wtf-p)",
        "- [claude-scientific-writer](#claude-scientific-writer)",
        "- [scientific-agent-skills](#scientific-agent-skills)",
        "",
        f"## Kind Filter: {kind_name}",
        "",
    ]

    body = ["\n".join(intro)]
    for repo in REPOS:
        items = [item for item in repo_to_items.get(repo.name, []) if kind_filter is None or item.kind == kind_filter]
        counts = Counter(item.kind for item in repo_to_items.get(repo.name, []))
        if not items:
            continue
        body.append(f"## {repo.name}")
        body.append("")
        body.append(f"- Source URL: {repo.source_url}")
        body.append(f"- Local clone: `sources/{repo.name}`")
        body.append(f"- Summary: {repo.summary}")
        body.append(f"- Best first: {repo.best_first}")
        body.append(f"- How to use: {repo.skill_how_to_use}")
        body.append(f"- Notes: {repo.notes}")
        body.append(
            f"- Counts: {counts.get('command', 0)} commands, {counts.get('agent', 0)} agents, {counts.get('skill', 0)} skills, {counts.get('tool', 0)} tools"
        )
        body.append("")

        grouped: dict[str, list[InventoryItem]] = defaultdict(list)
        for item in items:
            grouped[item.kind].append(item)

        for kind in ("command", "agent", "skill", "tool"):
            kind_items = grouped.get(kind)
            if not kind_items:
                continue
            body.append(f"### {kind.capitalize()}s")
            body.append("")
            body.append(render_table(kind_items, include_kind=kind_filter is None))
            body.append("")

    return "\n".join(body).rstrip() + "\n"


def render_resources_page() -> str:
    rows = [
        ("Project", "README.md", "Project overview and the main dashboard link", "../README.md"),
        ("Project", "LIBRARY.md", "Canonical dashboard and fastest orientation page", "../LIBRARY.md"),
        ("Project", "repos/README.md", "Quick navigation table for the cloned repositories", "../repos/README.md"),
        ("Library", "library/inventory.md", "Master catalog of commands, agents, skills, and tools", "inventory.md"),
        ("Library", "library/repositories.md", "Detailed per-repo comparison and usage notes", "repositories.md"),
        ("Library", "library/taxonomy.md", "Controlled tags and search terms", "taxonomy.md"),
        ("Library", "library/entry-template.md", "Shared schema for new entries", "entry-template.md"),
        ("Library", "library/commands.md", "Command entry index", "commands.md"),
        ("Library", "library/agents.md", "Agent entry index", "agents.md"),
        ("Library", "library/skills.md", "Skill inventory", "skills.md"),
        ("Library", "library/tools.md", "Tool index", "tools.md"),
        ("Library", "notes/maintenance.md", "Refresh and cleanup log", "../notes/maintenance.md"),
        ("MySkills", "README.md", "Compact overview of the personal skill library", "../sources/MySkills/README.md"),
        ("MySkills", "marketplace.json", "Plugin/catalog metadata for the personal skill bundle", "../sources/MySkills/marketplace.json"),
        ("academic-paper-skills", "README.md", "Primary repo overview", "../sources/academic-paper-skills/README.md"),
        ("academic-paper-skills", "README_CN.md", "Chinese-language overview", "../sources/academic-paper-skills/README_CN.md"),
        ("academic-paper-skills", "CONTRIBUTING.md", "Contribution guidance", "../sources/academic-paper-skills/CONTRIBUTING.md"),
        ("wtf-p", "README.md", "Primary workflow overview", "../sources/wtf-p/README.md"),
        ("wtf-p", "docs/BUILD_AND_RELEASE.md", "Build, release, and packaging guide", "../sources/wtf-p/docs/BUILD_AND_RELEASE.md"),
        ("wtf-p", "vendors/claude/.claude-plugin/plugin.json", "Claude plugin manifest for the vendor bundle", "../sources/wtf-p/vendors/claude/.claude-plugin/plugin.json"),
        ("claude-scientific-writer", "README.md", "Primary project overview", "../sources/claude-scientific-writer/README.md"),
        ("claude-scientific-writer", "CLAUDE.md", "Project-specific Claude Code guidance", "../sources/claude-scientific-writer/CLAUDE.md"),
        ("claude-scientific-writer", "docs/DOCUMENTATION_INDEX.md", "Documentation navigation index", "../sources/claude-scientific-writer/docs/DOCUMENTATION_INDEX.md"),
        ("claude-scientific-writer", "docs/SKILLS.md", "Skill-oriented documentation index", "../sources/claude-scientific-writer/docs/SKILLS.md"),
        ("claude-scientific-writer", ".claude/WRITER.md", "Hidden writer instructions used by the bundle", "../sources/claude-scientific-writer/.claude/WRITER.md"),
        ("claude-scientific-writer", ".claude-plugin/marketplace.json", "Plugin marketplace metadata", "../sources/claude-scientific-writer/.claude-plugin/marketplace.json"),
        ("claude-scientific-writer", "commands/scientific-writer-init.md", "Init command for the Scientific Writer project setup", "../sources/claude-scientific-writer/commands/scientific-writer-init.md"),
        ("scientific-agent-skills", "README.md", "Primary catalog overview", "../sources/scientific-agent-skills/README.md"),
        ("scientific-agent-skills", "docs/scientific-skills.md", "High-level scientific skills guide", "../sources/scientific-agent-skills/docs/scientific-skills.md"),
        ("scientific-agent-skills", "scan_skills.py", "Repository-wide skill scanning and governance tool", "../sources/scientific-agent-skills/scan_skills.py"),
    ]

    lines = [
        "# Resources Index",
        "",
        "Curated supporting references, docs, manifests, and maintenance pages for the library.",
        "",
        "## How To Use",
        "",
        "- Use this page for supporting docs rather than entry-point commands, agents, skills, or tools.",
        "- Keep the highest-value references here so the main inventory stays focused.",
        "",
        "| Area | Resource | Why it matters | Open |",
        "|---|---|---|---|",
    ]
    for area, resource, why, open_link in rows:
        lines.append(f"| {area} | {resource} | {why} | [open]({open_link}) |")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    repo_to_items: dict[str, list[InventoryItem]] = {}
    for repo in REPOS:
        repo_to_items[repo.name] = collect_repo_items(repo)

    OUTPUTS["inventory"].write_text(render_page("Library Inventory", repo_to_items, None), encoding="utf-8")
    OUTPUTS["commands"].write_text(render_page("Commands Index", repo_to_items, "command"), encoding="utf-8")
    OUTPUTS["agents"].write_text(render_page("Agents Index", repo_to_items, "agent"), encoding="utf-8")
    OUTPUTS["skills"].write_text(render_page("Skills Index", repo_to_items, "skill"), encoding="utf-8")
    OUTPUTS["tools"].write_text(render_page("Tools Index", repo_to_items, "tool"), encoding="utf-8")
    (ROOT / "library" / "resources.md").write_text(render_resources_page(), encoding="utf-8")

    totals = Counter(item.kind for repo_items in repo_to_items.values() for item in repo_items)
    print("Wrote library inventory pages:")
    for name, path in OUTPUTS.items():
        print(f"- {name}: {path}")
    print(f"- resources: {ROOT / 'library' / 'resources.md'}")
    print(
        "Totals: "
        f"{totals.get('command', 0)} commands, "
        f"{totals.get('agent', 0)} agents, "
        f"{totals.get('skill', 0)} skills, "
        f"{totals.get('tool', 0)} tools"
    )


if __name__ == "__main__":
    main()
