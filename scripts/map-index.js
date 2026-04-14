#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'docs', 'map', 'index.json');
const CACHE_TTL_MS = 5 * 60 * 1000;
const MIRROR_PREFIX = 'resources/cc-academic-sources/';
const SKIP_PATHS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '__pycache__',
  '.next',
  'target',
  '.venv',
  'venv',
]);
const TEXT_EXTENSIONS = new Set([
  '.md', '.markdown', '.mdx', '.txt', '.json', '.yaml', '.yml', '.toml',
  '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.py', '.go', '.rs',
  '.css', '.scss', '.html', '.htm', '.sh', '.bash', '.zsh', '.fish',
  '.csv', '.tsv', '.ini', '.env', '.cfg', '.conf', '.xml', '.svg',
]);
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.mp4', '.mp3', '.wav',
  '.woff', '.woff2', '.ttf', '.eot', '.zip', '.tar', '.gz', '.jar', '.dll',
  '.so', '.dylib', '.exe', '.bin', '.dat', '.db', '.sqlite', '.pdf',
]);

function parseArgs(argv) {
  const args = {
    root: ROOT,
    generate: true,
    force: false,
    query: null,
    stats: false,
    maxFiles: 20,
    includeMirrors: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--root' && argv[i + 1]) {
      args.root = path.resolve(argv[++i]);
    } else if (token === '--force') {
      args.force = true;
    } else if (token === '--generate') {
      args.generate = true;
    } else if (token === '--query' && argv[i + 1]) {
      args.query = argv[++i];
      args.generate = false;
    } else if (token === '--stats') {
      args.stats = true;
      args.generate = false;
    } else if (token === '--max-files' && argv[i + 1]) {
      args.maxFiles = Number.parseInt(argv[++i], 10) || args.maxFiles;
    } else if (token === '--include-mirrors') {
      args.includeMirrors = true;
    }
  }

  return args;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function gitTrackedFiles(root) {
  const output = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], {
    cwd: root,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function isTrackedSource(filePath, includeMirrors) {
  if (filePath === 'docs/map/index.json' || filePath.startsWith('docs/map/')) {
    return false;
  }
  if (!includeMirrors && filePath.startsWith(MIRROR_PREFIX)) {
    return false;
  }
  return true;
}

function isBinaryPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

function isTextPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(ext) || ext === '';
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function readText(root, filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function countLines(text) {
  if (!text) return 0;
  return text.split(/\r\n|\r|\n/).length;
}

function firstHeading(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function baseTitle(filePath) {
  const base = path.basename(filePath);
  if (base === 'README.md') {
    return path.basename(path.dirname(filePath));
  }
  return base.replace(path.extname(base), '');
}

function inferLanguage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.js':
    case '.cjs':
    case '.mjs':
      return 'javascript';
    case '.ts':
    case '.tsx':
      return 'typescript';
    case '.jsx':
      return 'javascript';
    case '.py':
      return 'python';
    case '.go':
      return 'go';
    case '.rs':
      return 'rust';
    case '.css':
      return 'css';
    case '.scss':
      return 'scss';
    case '.html':
    case '.htm':
      return 'html';
    case '.json':
      return 'json';
    case '.yaml':
    case '.yml':
      return 'yaml';
    case '.md':
    case '.markdown':
    case '.mdx':
      return 'markdown';
    case '.sh':
    case '.bash':
    case '.zsh':
    case '.fish':
      return 'shell';
    case '.toml':
      return 'toml';
    case '.xml':
    case '.svg':
      return 'xml';
    default:
      return 'text';
  }
}

function inferRole(filePath) {
  const parts = filePath.split('/');
  const base = path.basename(filePath);

  if (filePath === 'README.md') return 'root-home';
  if (filePath === 'STATUS.md') return 'status';
  if (filePath === 'inventory.json') return 'snapshot';
  if (filePath === 'resources/bundle-registry.json') return 'registry';
  if (filePath === 'resources/source-references.md') return 'traceability';
  if (parts[0] === 'docs') {
    if (base === 'README.md') return 'docs-hub';
    if (['PROJECT.md', 'ROADMAP.md', 'STATE.md', 'REQUIREMENTS.md'].includes(base)) {
      return 'project-doc';
    }
    if (parts[1] === 'codebase') return 'codebase-doc';
    if (parts[1] === 'quick') return 'quick-task-doc';
    return 'docs';
  }
  if (parts[0] === 'agents') {
    return base === 'README.md' ? 'agent-hub' : 'agent';
  }
  if (parts[0] === 'commands') {
    return base === 'README.md' ? 'command-hub' : 'command';
  }
  if (parts[0] === 'references') {
    if (base === 'README.md') return 'reference-hub';
    if (parts[1] === 'wtfp') return 'reference';
    return 'reference';
  }
  if (parts[0] === 'scripts') {
    if (base === 'README.md') return 'scripts-hub';
    if (parts[1] === 'maintenance') return 'maintenance-script';
    if (parts[1] === 'wtfp-commands') return 'command-support';
    if (parts[1] === 'wtfp-lib') return 'library-support';
    return 'script';
  }
  if (parts[0] === 'skills') {
    return base === 'README.md' ? 'skills-hub' : (base === 'SKILL.md' ? 'skill' : 'skill-support');
  }
  if (parts[0] === 'templates') {
    return base === 'README.md' ? 'template-hub' : 'template';
  }
  if (parts[0] === 'tools') {
    return base === 'README.md' ? 'tools-hub' : 'tool';
  }
  if (parts[0] === 'library') return 'library-doc';
  if (parts[0] === 'notes') return 'note';
  if (parts[0] === 'repos') return 'repo-hub';
  if (parts[0] === 'resources') return 'resource-meta';
  return 'file';
}

function resolveRelativePath(root, fromFile, spec) {
  if (!spec || spec.startsWith('http://') || spec.startsWith('https://') || spec.startsWith('mailto:') || spec.startsWith('#')) {
    return null;
  }
  const cleaned = spec.split('#')[0].split('?')[0];
  if (!cleaned.startsWith('.') && !cleaned.startsWith('/')) {
    return null;
  }

  const absBase = path.resolve(root, path.dirname(fromFile), cleaned);
  const candidates = [
    absBase,
    `${absBase}.md`,
    `${absBase}.markdown`,
    `${absBase}.mdx`,
    `${absBase}.js`,
    `${absBase}.cjs`,
    `${absBase}.mjs`,
    `${absBase}.ts`,
    `${absBase}.tsx`,
    `${absBase}.jsx`,
    `${absBase}.py`,
    `${absBase}.go`,
    `${absBase}.rs`,
    `${absBase}.json`,
    `${absBase}.yaml`,
    `${absBase}.yml`,
    path.join(absBase, 'index.md'),
    path.join(absBase, 'index.js'),
    path.join(absBase, 'README.md'),
  ];

  for (const candidate of candidates) {
    const relative = normalizePath(path.relative(root, candidate));
    if (fs.existsSync(candidate)) {
      return relative;
    }
  }

  return null;
}

function parseSourceFile(root, filePath, content) {
  const language = inferLanguage(filePath);
  const result = {
    exports: [],
    imports: [],
    symbols: [],
    links: [],
  };

  if (language === 'javascript' || language === 'typescript') {
    const importRegex = /import\s+(?:[^'"]+from\s+)?['"]([^'"]+)['"]/g;
    const requireRegex = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
    const exportFnRegex = /export\s+(?:default\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g;
    const exportClassRegex = /export\s+(?:default\s+)?class\s+([A-Za-z0-9_$]+)/g;
    const exportConstRegex = /export\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)/g;
    const exportListRegex = /module\.exports\s*=\s*{([\s\S]*?)}/g;
    const namedExportRegex = /exports\.([A-Za-z0-9_$]+)\s*=/g;
    const symbolRegex = /\b(?:function|class|const|let|var)\s+([A-Za-z0-9_$]+)/g;

    for (const match of content.matchAll(importRegex)) result.imports.push(match[1]);
    for (const match of content.matchAll(requireRegex)) result.imports.push(match[1]);
    for (const match of content.matchAll(exportFnRegex)) result.exports.push(match[1]);
    for (const match of content.matchAll(exportClassRegex)) result.exports.push(match[1]);
    for (const match of content.matchAll(exportConstRegex)) result.exports.push(match[1]);
    for (const match of content.matchAll(namedExportRegex)) result.exports.push(match[1]);
    for (const match of content.matchAll(symbolRegex)) result.symbols.push(match[1]);

    for (const block of content.matchAll(exportListRegex)) {
      const names = block[1]
        .split(',')
        .map((entry) => entry.trim().split(':')[0].trim())
        .filter(Boolean);
      result.exports.push(...names);
    }
  } else if (language === 'python') {
    const importRegex = /^import\s+([A-Za-z0-9_.]+)(?:\s+as\s+[A-Za-z0-9_]+)?/gm;
    const fromImportRegex = /^from\s+([A-Za-z0-9_.]+)\s+import\s+(.+)$/gm;
    const defRegex = /^def\s+([A-Za-z0-9_]+)/gm;
    const classRegex = /^class\s+([A-Za-z0-9_]+)/gm;
    for (const match of content.matchAll(importRegex)) result.imports.push(match[1]);
    for (const match of content.matchAll(fromImportRegex)) result.imports.push(match[1]);
    for (const match of content.matchAll(defRegex)) result.symbols.push(match[1]);
    for (const match of content.matchAll(classRegex)) result.symbols.push(match[1]);
  } else if (language === 'markdown') {
    const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
    for (const match of content.matchAll(linkRegex)) {
      const target = resolveRelativePath(root, filePath, match[1]);
      if (target) result.links.push(target);
    }
  }

  return result;
}

function buildIndex(root, { includeMirrors = false } = {}) {
  const trackedFiles = gitTrackedFiles(root)
    .map(normalizePath)
    .filter((filePath) => isTrackedSource(filePath, includeMirrors))
    .filter((filePath) => !SKIP_PATHS.has(filePath.split('/')[0]));

  const files = [];
  const filesByPath = new Map();
  const fileSet = new Set(trackedFiles);
  let totalLines = 0;
  let totalBytes = 0;
  let exportCount = 0;
  let dependencyEdges = 0;
  const languageCounts = {};
  const roleCounts = {};
  const edges = [];

  for (const filePath of trackedFiles) {
    if (!isTextPath(filePath) || isBinaryPath(filePath)) {
      continue;
    }

    const fullPath = path.join(root, filePath);
    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      continue;
    }

    const text = readText(root, filePath);
    const stat = fs.statSync(fullPath);
    const language = inferLanguage(filePath);
    const role = inferRole(filePath);
    const parsed = parseSourceFile(root, filePath, text);
    const title = firstHeading(text) || baseTitle(filePath);

    const fileRecord = {
      path: filePath,
      title,
      language,
      role,
      lines: countLines(text),
      bytes: stat.size,
      exports: [...new Set(parsed.exports)].sort(),
      imports: [],
      symbols: [...new Set(parsed.symbols)].sort(),
      links: [...new Set(parsed.links)].sort(),
    };

    const resolvedImports = new Set();
    for (const spec of parsed.imports) {
      const resolved = resolveRelativePath(root, filePath, spec);
      if (resolved && fileSet.has(resolved)) {
        resolvedImports.add(resolved);
        edges.push({ from: filePath, to: resolved });
      }
    }
    for (const link of fileRecord.links) {
      if (fileSet.has(link)) {
        edges.push({ from: filePath, to: link });
      }
    }

    fileRecord.imports = [...resolvedImports].sort();

    files.push(fileRecord);
    filesByPath.set(filePath, fileRecord);
    totalLines += fileRecord.lines;
    totalBytes += stat.size;
    exportCount += fileRecord.exports.length;
    dependencyEdges += fileRecord.imports.length + fileRecord.links.length;
    languageCounts[language] = (languageCounts[language] || 0) + 1;
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  }

  files.sort((a, b) => a.path.localeCompare(b.path));
  edges.sort((a, b) => (a.from + a.to).localeCompare(b.from + b.to));

  const roots = [...new Set(
    files
      .filter((file) => file.path.includes('/'))
      .map((file) => file.path.split('/')[0])
      .filter((segment) => segment && !segment.startsWith('.'))
  )].sort().map((name) => {
    const filesInRoot = files.filter((file) => file.path === name || file.path.startsWith(`${name}/`));
    return {
      path: `${name}/`,
      purpose: inferRole(`${name}/README.md`),
      file_count: filesInRoot.length,
    };
  });

  return {
    generated: new Date().toISOString(),
    root,
    includeMirrors,
    fileCount: files.length,
    lineCount: totalLines,
    totalBytes,
    exportCount,
    dependencyEdgeCount: dependencyEdges,
    languages: languageCounts,
    roles: roleCounts,
    roots,
    files,
    edges,
  };
}

function loadIndex() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    throw new Error('Index not found. Run `node scripts/map-index.js --generate` first.');
  }
  return readJson(OUTPUT_PATH);
}

function isFresh(index, force) {
  if (force) return false;
  if (!index.generated) return false;
  const age = Date.now() - new Date(index.generated).getTime();
  return Number.isFinite(age) && age < CACHE_TTL_MS;
}

function scoreFile(file, terms) {
  const haystack = [
    file.path,
    file.title,
    file.role,
    file.language,
    file.exports.join(' '),
    file.symbols.join(' '),
  ].join(' ').toLowerCase();

  let score = 0;
  for (const term of terms) {
    const needle = term.toLowerCase();
    if (file.path.toLowerCase().includes(needle)) score += 3;
    if (file.exports.some((entry) => entry.toLowerCase().includes(needle))) score += 5;
    if (file.symbols.some((entry) => entry.toLowerCase().includes(needle))) score += 2;
    if (file.role.toLowerCase().includes(needle)) score += 1;
    if (haystack.includes(needle)) score += 1;
  }
  return score;
}

function printStats(index) {
  const languages = Object.entries(index.languages)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => `- ${name}: ${count}`)
    .join('\n');

  const roles = Object.entries(index.roles)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => `- ${name}: ${count}`)
    .join('\n');

  console.log(`Files: ${index.fileCount}`);
  console.log(`Lines: ${index.lineCount}`);
  console.log(`Exports: ${index.exportCount}`);
  console.log(`Dependency edges: ${index.dependencyEdgeCount}`);
  console.log('');
  console.log('Languages:');
  console.log(languages || '- none');
  console.log('');
  console.log('Roles:');
  console.log(roles || '- none');
}

function printQuery(index, query, maxFiles) {
  const terms = query.split(/\s+/).filter(Boolean);
  const scored = index.files
    .map((file) => ({ file, score: scoreFile(file, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.file.path.localeCompare(b.file.path))
    .slice(0, maxFiles);

  console.log(`Results for "${query}" (${scored.length} matches):`);
  console.log('  Score  Role                  Path');
  console.log('  -----------------------------------------------');
  for (const { file, score } of scored) {
    const role = file.role.padEnd(20);
    console.log(`  ${String(score).padStart(5)}  ${role}  ${file.path}`);
  }
}

function generateAndWrite(args) {
  const index = buildIndex(args.root, { includeMirrors: args.includeMirrors });
  writeJson(OUTPUT_PATH, index);
  console.log(`Map index generated: ${index.fileCount} files, ${index.dependencyEdgeCount} dependency links`);
  console.log(`Languages: ${Object.entries(index.languages).map(([k, v]) => `${k}:${v}`).join(', ') || 'none'}`);
  console.log(`Roles: ${Object.entries(index.roles).map(([k, v]) => `${k}:${v}`).join(', ') || 'none'}`);
  return index;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.query) {
    const index = loadIndex();
    printQuery(index, args.query, args.maxFiles);
    return;
  }

  if (args.stats) {
    const index = loadIndex();
    printStats(index);
    return;
  }

  if (args.generate) {
    if (fs.existsSync(OUTPUT_PATH) && !args.force) {
      const existing = readJson(OUTPUT_PATH);
      if (isFresh(existing, false)) {
        console.log(`Map index fresh: ${existing.fileCount} files, ${existing.dependencyEdgeCount} dependency links`);
        return;
      }
    }
    generateAndWrite(args);
    return;
  }

  generateAndWrite(args);
}

main();
