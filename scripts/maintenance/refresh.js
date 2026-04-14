#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const registryPath = path.join(root, 'resources', 'bundle-registry.json');
const sourceRefsPath = path.join(root, 'resources', 'source-references.md');
const inventoryPath = path.join(root, 'inventory.json');
const statusPath = path.join(root, 'STATUS.md');

const kindByTopLevel = {
  agents: 'agent',
  commands: 'command',
  references: 'reference',
  resources: 'resource',
  scripts: 'script',
  skills: 'skill',
  templates: 'template',
  tools: 'tool',
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text.endsWith('\n') ? text : `${text}\n`);
}

function bundleRegistry() {
  return readJson(registryPath);
}

function formatMarkdownLink(label, url) {
  return url ? `[${label}](${url})` : label;
}

function formatBundleReferences(registry) {
  const lines = [];
  lines.push('# Source References');
  lines.push('');
  lines.push('This page records the upstream source bundles that feed the canonical index.');
  lines.push('');
  if (registry.referenceListUrl) {
    lines.push(`Curated reference list: [cc-academic stars list](${registry.referenceListUrl})`);
    lines.push('');
  }
  lines.push('| Repo | Summary | Upstream repo | Source path | Local README |');
  lines.push('|---|---|---|---|---|');

  for (const bundle of registry.bundles) {
    const upstreamLink = bundle.upstreamUrl || registry.referenceListUrl || null;
    const upstreamLabel = bundle.upstreamUrl ? 'Repo' : 'Browse list';
    lines.push(
      `| \`${bundle.name}\` | ${bundle.summary} | ${formatMarkdownLink(upstreamLabel, upstreamLink)} | \`${bundle.sourcePath}\` | [README.md](${bundle.sourceReadme}) |`
    );
  }

  lines.push('');
  lines.push('');
  lines.push('## Canonical Mapping');
  lines.push('');
  lines.push('| Repo | Canonical subtrees |');
  lines.push('|---|---|');

  for (const bundle of registry.bundles) {
    lines.push(`| \`${bundle.name}\` | ${bundle.canonicalDestinations.map((d) => `\`${d}\``).join(', ')} |`);
  }

  lines.push('');
  lines.push('## Usage');
  lines.push('');
  lines.push('- Use this table when checking source parity or tracing a canonical item back to its upstream origin.');
  lines.push('- Use the curated reference list link above when you want to browse the source bundles as a set.');
  lines.push('- Update this page whenever a source bundle is added, renamed, or replaced.');
  lines.push('- Keep summaries short and factual so the table stays readable in diffs.');
  lines.push('');
  lines.push('## Registry Note');
  lines.push('');
  lines.push('- This file is generated from `resources/bundle-registry.json`.');
  lines.push('- Paths are relative to the repository root so the registry can be regenerated on any machine.');

  return lines.join('\n');
}

function classifyFile(relativePath) {
  const top = relativePath.split('/')[0];
  return kindByTopLevel[top] || 'file';
}

function walkFiles(dir) {
  const entries = [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    if (dirent.name === '.git') {
      continue;
    }

    const fullPath = path.join(dir, dirent.name);
    const relativePath = path.relative(root, fullPath).split(path.sep).join('/');

    if (dirent.isDirectory()) {
      entries.push(...walkFiles(fullPath));
      continue;
    }

    if (dirent.name === '.DS_Store') {
      continue;
    }

    const stat = fs.statSync(fullPath);
    entries.push({
      kind: classifyFile(relativePath),
      path: relativePath,
      size: stat.size,
    });
  }

  return entries;
}

function buildInventory() {
  const directories = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '.git')
    .map((entry) => entry.name)
    .sort();

  const entries = walkFiles(root).sort((a, b) => a.path.localeCompare(b.path));

  return {
    directories,
    entries,
    format: 'cc-academic-canonical-inventory/v1',
    generated: new Date().toISOString(),
  };
}

function buildStatus(registry, inventory) {
  const bundleCount = registry.bundles.length;
  const canonicalCount = registry.bundles.reduce((sum, bundle) => sum + bundle.canonicalDestinations.length, 0);
  const dsStoreCount = inventory.entries.filter((entry) => entry.path.includes('.DS_Store')).length;
  const matsenSidecarCount = inventory.entries.filter((entry) => entry.path.startsWith('resources/matsengrp-agents/')).length;

  return [
    '# Canonical Library Status',
    '',
    '## Verification',
    '',
    `- Source bundles tracked: ${bundleCount}`,
    `- Canonical destination groups tracked: ${canonicalCount}`,
    `- .DS_Store entries in inventory: ${dsStoreCount}`,
    `- Matsen sidecar entries in inventory: ${matsenSidecarCount}`,
    '- Registry-driven maintenance rollout: complete',
    '',
    '## Current Model',
    '',
    '- `resources/cc-academic-sources/` is the upstream mirror.',
    '- `agents/`, `commands/`, `references/`, `scripts/`, `skills/`, `templates/`, and `tools/` are the canonical published surfaces.',
    '- `resources/bundle-registry.json` is the authoritative bundle registry.',
    '- `resources/source-references.md` is generated from the registry.',
    '- `inventory.json` is generated from the live filesystem.',
    '',
    '## Maintenance Notes',
    '',
    '- The Matsen plugin sidecar at `resources/matsengrp-agents` remains removed.',
    '- `.DS_Store` entries are ignored and stripped from the inventory snapshot.',
    '- Refresh the registry, traceability doc, and inventory together after any source-bundle change.',
    '',
  ].join('\n');
}

function audit(registry, inventory) {
  const problems = [];

  for (const bundle of registry.bundles) {
    if (!fs.existsSync(path.join(root, bundle.sourcePath))) {
      problems.push(`Missing source bundle path: ${bundle.sourcePath}`);
    }
    if (!fs.existsSync(path.join(root, bundle.sourceReadme))) {
      problems.push(`Missing source README: ${bundle.sourceReadme}`);
    }
    for (const dest of bundle.canonicalDestinations) {
      if (!fs.existsSync(path.join(root, dest))) {
        problems.push(`Missing canonical destination: ${dest}`);
      }
    }
  }

  if (inventory.entries.some((entry) => entry.path.includes('.DS_Store'))) {
    problems.push('Inventory still includes .DS_Store paths');
  }
  if (inventory.entries.some((entry) => entry.path.startsWith('resources/matsengrp-agents/'))) {
    problems.push('Inventory still includes resources/matsengrp-agents');
  }

  return problems;
}

function refresh() {
  const registry = bundleRegistry();
  writeText(sourceRefsPath, formatBundleReferences(registry));

  const inventory = buildInventory();
  writeText(inventoryPath, JSON.stringify(inventory, null, 2));

  writeText(statusPath, buildStatus(registry, inventory));

  const problems = audit(registry, inventory);
  if (problems.length > 0) {
    console.error(problems.join('\n'));
    process.exitCode = 1;
  }
}

function main() {
  const command = process.argv[2] || 'refresh';
  const registry = bundleRegistry();

  if (command === 'source-references') {
    writeText(sourceRefsPath, formatBundleReferences(registry));
    return;
  }

  if (command === 'inventory') {
    writeText(inventoryPath, JSON.stringify(buildInventory(), null, 2));
    return;
  }

  if (command === 'audit') {
    const inventory = buildInventory();
    const problems = audit(registry, inventory);
    if (problems.length === 0) {
      console.log('OK');
      return;
    }
    console.error(problems.join('\n'));
    process.exitCode = 1;
    return;
  }

  if (command === 'status') {
    writeText(statusPath, buildStatus(registry, buildInventory()));
    return;
  }

  refresh();
}

main();
