# Glossary

Short definitions for the terms used in this library.

## Core Terms

- Skill: a reusable instruction bundle, usually centered on a `SKILL.md` file and sometimes shipped with `references/`, `scripts/`, or `assets/`.
- Command: a named entry point that tells the assistant to run a specific workflow.
- Agent: a specialized worker or role with a narrower task focus than a general command.
- Tool: a reusable package root, manifest, script, or helper component that supports skills or commands.
- Plugin: an installable package that adds commands, skills, or workflows to a client.
- Repo: one cloned source repository under `sources/`.

## File And Setup Terms

- Raw: a direct source-file link, usually the fastest way to download one file exactly as stored upstream.
- Install path: the place where you copy or install a skill, plugin, or package so your client can use it.
- Setup: the commands or copy steps needed before the repo becomes usable.
- Runtime: the environment needed to run something, such as Claude Code, Python, Node, `npx`, `pip`, or `uv`.

## How To Read A Repo Summary

- `What it is`: plain description of the repository.
- `What do I do first?`: first file or folder to open if you are new to that repo.
- `Install / setup`: shortest path to get the repo working locally.
- `Download / raw`: where to get the files directly.
- `How to use`: plain-language description of the practical workflow.
- `Why choose it`: the main reason to pick this repo over another repo here.
- `Caution`: the main limit, tradeoff, or complexity cost.

## Where To Go Next

- Beginner orientation: [library/start-here.md](start-here.md)
- Repository comparison: [library/repositories.md](repositories.md)
- Main dashboard: [../LIBRARY.md](../LIBRARY.md)
