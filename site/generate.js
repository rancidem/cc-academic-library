// generate.js — Skill entry page generator for cc-academic-library-site
// Usage: node generate.js  (run from cc-academic-library/site/)
// Requires: Node.js (no npm packages)

const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '..');  // cc-academic-library root
const OUTPUT = path.join(__dirname, '.');   // cc-academic-library/site

const DOMAIN_CLASS = {
  'bioinformatics':        'domain-bioinformatics',
  'cheminformatics':       'domain-cheminformatics',
  'clinical-medical':      'domain-clinical',
  'computational-biology': 'domain-compbio',
  'data-science':          'domain-datascience',
  'document-formats':      'domain-docformats',
  'earth-geo-astro':       'domain-earthgeo',
  'lab-automation':        'domain-labautomation',
  'machine-learning':      'domain-ml',
  'misc':                  'domain-misc',
  'quantum-computing':     'domain-quantum',
  'visualization':         'domain-visualization',
  'writing-research':      'domain-writing',
};

const DOMAIN_COUNTS = {
  'bioinformatics':        24,
  'cheminformatics':       8,
  'clinical-medical':      6,
  'computational-biology': 12,
  'data-science':          13,
  'document-formats':      13,
  'earth-geo-astro':       3,
  'lab-automation':        11,
  'machine-learning':      11,
  'misc':                  12,
  'quantum-computing':     4,
  'visualization':         7,
  'writing-research':      19,
};

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const raw = match[1];
  const get = (pattern) => { const m = raw.match(pattern); return m ? m[1].trim() : ''; };
  return {
    name:        get(/^name:\s*(.+)$/m),
    description: get(/^description:\s*(.+)$/m),
    tools:       get(/^allowed-tools:\s*(.+)$/m),
    license:     get(/^license:\s*(.+)$/m),
    author:      get(/skill-author:\s*(.+)$/m),
  };
}

function listDir(dir) {
  try { return fs.readdirSync(dir).filter(f => !f.startsWith('.')); }
  catch { return []; }
}

function mkdirp(dir) { fs.mkdirSync(dir, { recursive: true }); }

function copyFile(src, dst) {
  try {
    const stat = fs.statSync(src);
    if (!stat.isFile()) return;  // skip directories/symlinks
    mkdirp(path.dirname(dst));
    fs.copyFileSync(src, dst);
  } catch { /* skip inaccessible entries */ }
}

function copyDirFiles(srcDir, dstDir, filterFn) {
  const files = listDir(srcDir).filter(filterFn || (() => true));
  for (const f of files) {
    copyFile(path.join(srcDir, f), path.join(dstDir, f));
  }
}

function extractBody(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : content.trim();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildDomainFilterRows(currentDomain) {
  const domains = Object.keys(DOMAIN_COUNTS).sort();
  return domains.map(d => {
    const name = d.toUpperCase();
    const count = DOMAIN_COUNTS[d];
    const isActive = d === currentDomain;
    const activeClass = isActive ? ' class="active-domain"' : '';
    return `                <tr${activeClass}><td><a href="../../../skills/${d}/index.html">${name}</a></td><td class="domain-filter-count">[${count}]</td></tr>`;
  }).join('\n');
}

function buildSkillHtml({ domain, domainClass, skillSlug, fm, refs, scripts, assets, body }) {
  const skillName = escapeHtml((fm.name || skillSlug).toUpperCase());
  const domainName = domain.toUpperCase();
  const desc = escapeHtml(fm.description || '');
  const license = escapeHtml(fm.license || '—');
  const author = escapeHtml(fm.author || '—');
  const tools = escapeHtml(fm.tools || '—');

  const refRows = refs.length
    ? refs.map(f =>
        `            <tr><td>${escapeHtml(f)}</td><td>skills/${domain}/${skillSlug}/references/${escapeHtml(f)}</td></tr>`
      ).join('\n')
    : '            <tr><td colspan="2">—</td></tr>';

  const scriptList = scripts.length ? escapeHtml(scripts.join(', ')) : '—';
  const assetList  = assets.length  ? escapeHtml(assets.join(', '))  : '—';

  const rawFileRows = [
    `            <tr><td>SKILL.md</td><td><a href="raw/SKILL.md" download>DOWNLOAD</a></td></tr>`,
    ...refs.map(f => `            <tr><td>references/${escapeHtml(f)}</td><td><a href="raw/references/${escapeHtml(f)}" download>DOWNLOAD</a></td></tr>`),
    ...scripts.map(f => `            <tr><td>scripts/${escapeHtml(f)}</td><td><a href="raw/scripts/${escapeHtml(f)}" download>DOWNLOAD</a></td></tr>`),
    ...assets.map(f => `            <tr><td>assets/${escapeHtml(f)}</td><td><a href="raw/assets/${escapeHtml(f)}" download>DOWNLOAD</a></td></tr>`),
  ].join('\n');
  const bodyHtml = escapeHtml(body || '');

  const domainFilterRows = buildDomainFilterRows(domain);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${skillName} — ${domainName} — CC ACADEMIC LIBRARY</title>
  <link rel="stylesheet" href="../../../styles.css">
  <script src="../../../search-index.js" defer></script>
  <script src="../../../search.js" defer></script>
</head>
<body class="${domainClass}">
<a class="skip-to-content" href="#main-content">Skip to content</a>
<div class="page">
  <h1 class="site-title">CC ACADEMIC LIBRARY</h1>
  <div class="top-meta">YOU ARE HERE: <a href="../../../index.html">HOME</a> / <a href="../../index.html">SKILLS</a> / <a href="../index.html">${domainName}</a> / <strong>${skillName}</strong></div>

  <table class="palette-bar" aria-hidden="true">
    <tr><td class="p1"></td><td class="p2"></td><td class="p3"></td><td class="p4"></td><td class="p5"></td></tr>
  </table>

  <table class="layout">
    <tr>
      <td class="sidebar">
        <div class="sidebar-inner">

          <div class="system-panel">
            <div class="system-head">SYSTEM PANEL</div>
            <div class="system-subhead">SITE NAVIGATION</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../../../index.html"><span class="icon icon-dot"></span>HOME</a></td></tr>
                <tr><td><a class="active" href="../../index.html"><span class="icon icon-skill"></span>SKILLS <span class="nav-count">[143]</span></a></td></tr>
                <tr><td><a href="../../../commands/index.html"><span class="icon icon-note"></span>COMMANDS <span class="nav-count">[37]</span></a></td></tr>
                <tr><td><a href="../../../agents/index.html"><span class="icon icon-dot"></span>AGENTS <span class="nav-count">[11]</span></a></td></tr>
                <tr><td><a href="../../../templates/index.html"><span class="icon icon-folder"></span>TEMPLATES</a></td></tr>
                <tr><td><a href="../../../tools/index.html"><span class="icon icon-folder"></span>TOOLS</a></td></tr>
                <tr><td><a href="../../../resources/index.html"><span class="icon icon-dot"></span>RESOURCES</a></td></tr>
                <tr><td><a href="../../../status/index.html"><span class="icon icon-dot"></span>STATUS</a></td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">DOMAIN FILTER</div>
            <div class="system-body compact">
              <table class="domain-filter-list">
${domainFilterRows}
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">QUICK FIND</div>
            <div class="system-body">
              <div class="search-row">
                <input type="text" placeholder="SKILLS / COMMANDS / AGENTS" aria-label="Search">
                <button>SEARCH</button>
              </div>
            </div>
            <div class="search-results" id="search-results"></div>
          </div>

          <div class="system-panel">
            <div class="system-head">SYSTEM INFO</div>
            <div class="system-body">
              <table class="meta-table">
                <tr><td class="meta-key">SKILL</td><td>${skillName}</td></tr>
                <tr><td class="meta-key">DOMAIN</td><td>${domainName}</td></tr>
                <tr><td class="meta-key">DATE</td><td>2026-04-14</td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">IN THIS DOMAIN</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../index.html">&larr; ALL ${domainName}</a></td></tr>
              </table>
            </div>
          </div>

        </div>
      </td>
      <td class="content">
        <div class="content-inner" id="main-content">

          <div class="breadcrumb">YOU ARE HERE: <a href="../../../index.html">HOME</a> / <a href="../../index.html">SKILLS</a> / <a href="../index.html">${domainName}</a> / <strong>${skillName}</strong></div>
          <div class="marquee-line"><strong>SKILL:</strong> ${skillName} / DOMAIN: ${domainName}</div>
          <h2 class="section-title">${skillName}</h2>
          <div class="rule"></div>

          <table class="meta-table">
            <tr><td class="meta-key">DOMAIN</td><td>${domainName}</td></tr>
            <tr><td class="meta-key">PATH</td><td>skills/${domain}/${skillSlug}/SKILL.md</td></tr>
            <tr><td class="meta-key">LICENSE</td><td>${license}</td></tr>
            <tr><td class="meta-key">AUTHOR</td><td>${author}</td></tr>
            <tr><td class="meta-key">TOOLS</td><td>${tools}</td></tr>
          </table>

          <div class="dotted-rule"></div>

          <div class="intro-panel">
            <div class="intro-panel-head">DESCRIPTION</div>
            <div class="intro-panel-body">${desc}</div>
          </div>

          <h3 class="sub-title">REFERENCE FILES</h3>
          <table class="list-table">
            <tr><th>FILE</th><th>PATH</th></tr>
${refRows}
          </table>

          <h3 class="sub-title">COMPANION FILES</h3>
          <table class="companion-table">
            <tr><td class="companion-type">SCRIPTS</td><td>${scriptList}</td></tr>
            <tr><td class="companion-type">ASSETS</td><td>${assetList}</td></tr>
          </table>

          <h3 class="sub-title">RAW FILES</h3>
          <table class="list-table">
            <tr><th>FILE</th><th>DOWNLOAD</th></tr>
${rawFileRows}
          </table>

          <h3 class="sub-title">FULL CONTENT</h3>
          <div class="skill-body">
            <pre class="raw-content">${bodyHtml}</pre>
          </div>

        </div>
      </td>
    </tr>
  </table>

  <div class="footer">CC ACADEMIC LIBRARY / CLAUDE CODE / ACADEMIC + SCIENTIFIC SKILLS / STATIC HTML / ZERO DEPENDENCIES</div>
</div>
</body>
</html>`;
}

// ── Command stage mapping ─────────────────────────────────────────────────────

const COMMAND_STAGE = {
  'new-paper':             'PLANNING',
  'create-outline':        'PLANNING',
  'plan-section':          'PLANNING',
  'map-project':           'PLANNING',
  'research-gap':          'PLANNING',
  'list-assumptions':      'PLANNING',
  'write-section':         'WRITING',
  'discuss-section':       'WRITING',
  'insert-section':        'WRITING',
  'execute-outline':       'WRITING',
  'remove-section':        'WRITING',
  'review-section':        'REVIEW',
  'plan-revision':         'REVIEW',
  'plan-milestone-gaps':   'REVIEW',
  'check-refs':            'REVIEW',
  'verify-work':           'REVIEW',
  'polish-prose':          'POLISH',
  'export-latex':          'EXPORT',
  'create-slides':         'EXPORT',
  'create-poster':         'EXPORT',
  'checkpoint':            'LIFECYCLE',
  'progress':              'LIFECYCLE',
  'pause-writing':         'LIFECYCLE',
  'resume-writing':        'LIFECYCLE',
  'add-todo':              'LIFECYCLE',
  'check-todos':           'LIFECYCLE',
  'audit-milestone':       'LIFECYCLE',
  'submit-milestone':      'LIFECYCLE',
  'quick':                 'LIFECYCLE',
  'update':                'LIFECYCLE',
  'settings':              'LIFECYCLE',
  'help':                  'UTILITY',
  'scientific-writer-init':'UTILITY',
  'report-bug':            'UTILITY',
  'request-feature':       'UTILITY',
  'contribute':            'UTILITY',
  'analyze-bib':           'UTILITY',
};

function buildCommandHtml({ slug, name, description, tools, stage, body }) {
  const titleName = escapeHtml(name.toUpperCase());
  const desc = escapeHtml(description || '');
  const toolsStr = escapeHtml(Array.isArray(tools) ? tools.join(', ') : (tools || '—'));
  const stageStr = escapeHtml(stage || '—');
  const bodyHtml = escapeHtml(body || '');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${titleName} — COMMANDS — CC ACADEMIC LIBRARY</title>
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../search-index.js" defer></script>
  <script src="../../search.js" defer></script>
</head>
<body class="section-commands">
<a class="skip-to-content" href="#main-content">Skip to content</a>
<div class="page">
  <h1 class="site-title">CC ACADEMIC LIBRARY</h1>
  <div class="top-meta">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">COMMANDS</a> / <strong>${titleName}</strong></div>

  <table class="palette-bar" aria-hidden="true">
    <tr><td class="p1"></td><td class="p2"></td><td class="p3"></td><td class="p4"></td><td class="p5"></td></tr>
  </table>

  <table class="layout">
    <tr>
      <td class="sidebar">
        <div class="sidebar-inner">

          <div class="system-panel">
            <div class="system-head">SYSTEM PANEL</div>
            <div class="system-subhead">SITE NAVIGATION</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../../index.html"><span class="icon icon-dot"></span>HOME</a></td></tr>
                <tr><td><a href="../../skills/index.html"><span class="icon icon-skill"></span>SKILLS <span class="nav-count">[143]</span></a></td></tr>
                <tr><td><a class="active" href="../index.html"><span class="icon icon-note"></span>COMMANDS <span class="nav-count">[37]</span></a></td></tr>
                <tr><td><a href="../../agents/index.html"><span class="icon icon-dot"></span>AGENTS <span class="nav-count">[11]</span></a></td></tr>
                <tr><td><a href="../../templates/index.html"><span class="icon icon-folder"></span>TEMPLATES</a></td></tr>
                <tr><td><a href="../../tools/index.html"><span class="icon icon-folder"></span>TOOLS</a></td></tr>
                <tr><td><a href="../../resources/index.html"><span class="icon icon-dot"></span>RESOURCES</a></td></tr>
                <tr><td><a href="../../status/index.html"><span class="icon icon-dot"></span>STATUS</a></td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">QUICK FIND</div>
            <div class="system-body">
              <div class="search-row">
                <input type="text" placeholder="SKILLS / COMMANDS / AGENTS" aria-label="Search">
                <button>SEARCH</button>
              </div>
            </div>
            <div class="search-results" id="search-results"></div>
          </div>

          <div class="system-panel">
            <div class="system-head">SYSTEM INFO</div>
            <div class="system-body">
              <table class="meta-table">
                <tr><td class="meta-key">COMMAND</td><td>${titleName}</td></tr>
                <tr><td class="meta-key">STAGE</td><td>${stageStr}</td></tr>
                <tr><td class="meta-key">DATE</td><td>2026-04-14</td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">ALL COMMANDS</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../index.html">&larr; COMMANDS INDEX</a></td></tr>
              </table>
            </div>
          </div>

        </div>
      </td>
      <td class="content">
        <div class="content-inner" id="main-content">

          <div class="breadcrumb">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">COMMANDS</a> / <strong>${titleName}</strong></div>
          <div class="marquee-line"><strong>COMMAND:</strong> ${titleName} / STAGE: ${stageStr}</div>
          <h2 class="section-title">${titleName}</h2>
          <div class="rule"></div>

          <table class="meta-table">
            <tr><td class="meta-key">SOURCE FILE</td><td>commands/${escapeHtml(slug)}.md</td></tr>
            <tr><td class="meta-key">WORKFLOW STAGE</td><td>${stageStr}</td></tr>
            <tr><td class="meta-key">INVOCATION</td><td>/wtfp:${escapeHtml(slug)}</td></tr>
            <tr><td class="meta-key">TOOLS</td><td>${toolsStr}</td></tr>
          </table>

          <div class="dotted-rule"></div>

          <div class="intro-panel intro-panel--commands">
            <div class="intro-panel-head">DESCRIPTION</div>
            <div class="intro-panel-body">${desc}</div>
          </div>

          <h3 class="sub-title">RAW FILES</h3>
          <table class="list-table">
            <tr><th>FILE</th><th>DOWNLOAD</th></tr>
            <tr><td>${escapeHtml(slug)}.md</td><td><a href="raw/${escapeHtml(slug)}.md" download>DOWNLOAD</a></td></tr>
          </table>

          <h3 class="sub-title">FULL CONTENT</h3>
          <div class="skill-body">
            <pre class="raw-content">${bodyHtml}</pre>
          </div>

        </div>
      </td>
    </tr>
  </table>

  <div class="footer">CC ACADEMIC LIBRARY / CLAUDE CODE / ACADEMIC + SCIENTIFIC SKILLS / STATIC HTML / ZERO DEPENDENCIES</div>
</div>
</body>
</html>`;
}

function parseToolsList(raw) {
  if (!raw) return [];
  // handles YAML list format (lines starting with "  - ") or inline comma list
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines[0] && lines[0].startsWith('-')) {
    return lines.map(l => l.replace(/^-\s*/, ''));
  }
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

function parseFrontMatterFull(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const raw = match[1];
  const get = (pattern) => { const m = raw.match(pattern); return m ? m[1].trim() : ''; };
  const toolsRaw = get(/^allowed-tools:\s*([\s\S]*?)(?:\n\w|\n---)/m) || get(/^allowed-tools:\s*(.+)$/m);
  // Extract multi-line list for allowed-tools
  const toolsMatch = raw.match(/^allowed-tools:\s*\n((?:\s+-.+\n?)+)/m);
  let tools;
  if (toolsMatch) {
    tools = toolsMatch[1].split('\n').map(l => l.trim()).filter(l => l.startsWith('-')).map(l => l.replace(/^-\s*/, ''));
  } else {
    const inline = get(/^allowed-tools:\s*(.+)$/m);
    tools = inline ? inline.split(',').map(s => s.trim()).filter(Boolean) : [];
  }
  return {
    name:        get(/^name:\s*(.+)$/m),
    description: get(/^description:\s*(.+)$/m),
    tools,
  };
}

// ── Agent HTML builder ────────────────────────────────────────────────────────

function buildAgentHtml({ slug, name, description, tools, body }) {
  const titleName = escapeHtml(name.toUpperCase());
  const desc = escapeHtml(description || '');
  const toolsStr = escapeHtml(Array.isArray(tools) ? tools.join(', ') : (tools || '—'));
  const bodyHtml = escapeHtml(body || '');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${titleName} — AGENTS — CC ACADEMIC LIBRARY</title>
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../search-index.js" defer></script>
  <script src="../../search.js" defer></script>
</head>
<body class="section-agents">
<a class="skip-to-content" href="#main-content">Skip to content</a>
<div class="page">
  <h1 class="site-title">CC ACADEMIC LIBRARY</h1>
  <div class="top-meta">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">AGENTS</a> / <strong>${titleName}</strong></div>

  <table class="palette-bar" aria-hidden="true">
    <tr><td class="p1"></td><td class="p2"></td><td class="p3"></td><td class="p4"></td><td class="p5"></td></tr>
  </table>

  <table class="layout">
    <tr>
      <td class="sidebar">
        <div class="sidebar-inner">

          <div class="system-panel">
            <div class="system-head">SYSTEM PANEL</div>
            <div class="system-subhead">SITE NAVIGATION</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../../index.html"><span class="icon icon-dot"></span>HOME</a></td></tr>
                <tr><td><a href="../../skills/index.html"><span class="icon icon-skill"></span>SKILLS <span class="nav-count">[143]</span></a></td></tr>
                <tr><td><a href="../../commands/index.html"><span class="icon icon-note"></span>COMMANDS <span class="nav-count">[37]</span></a></td></tr>
                <tr><td><a class="active" href="../index.html"><span class="icon icon-dot"></span>AGENTS <span class="nav-count">[11]</span></a></td></tr>
                <tr><td><a href="../../templates/index.html"><span class="icon icon-folder"></span>TEMPLATES</a></td></tr>
                <tr><td><a href="../../tools/index.html"><span class="icon icon-folder"></span>TOOLS</a></td></tr>
                <tr><td><a href="../../resources/index.html"><span class="icon icon-dot"></span>RESOURCES</a></td></tr>
                <tr><td><a href="../../status/index.html"><span class="icon icon-dot"></span>STATUS</a></td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">QUICK FIND</div>
            <div class="system-body">
              <div class="search-row">
                <input type="text" placeholder="SKILLS / COMMANDS / AGENTS" aria-label="Search">
                <button>SEARCH</button>
              </div>
            </div>
            <div class="search-results" id="search-results"></div>
          </div>

          <div class="system-panel">
            <div class="system-head">SYSTEM INFO</div>
            <div class="system-body">
              <table class="meta-table">
                <tr><td class="meta-key">AGENT</td><td>${titleName}</td></tr>
                <tr><td class="meta-key">DATE</td><td>2026-04-14</td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">ALL AGENTS</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../index.html">&larr; AGENTS INDEX</a></td></tr>
              </table>
            </div>
          </div>

        </div>
      </td>
      <td class="content">
        <div class="content-inner" id="main-content">

          <div class="breadcrumb">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">AGENTS</a> / <strong>${titleName}</strong></div>
          <div class="marquee-line"><strong>AGENT:</strong> ${titleName}</div>
          <h2 class="section-title">${titleName}</h2>
          <div class="rule"></div>

          <table class="meta-table">
            <tr><td class="meta-key">SOURCE FILE</td><td>agents/${escapeHtml(slug)}.md</td></tr>
            <tr><td class="meta-key">TOOLS</td><td>${toolsStr}</td></tr>
          </table>

          <div class="dotted-rule"></div>

          <div class="intro-panel intro-panel--agents">
            <div class="intro-panel-head">DESCRIPTION</div>
            <div class="intro-panel-body">${desc}</div>
          </div>

          <h3 class="sub-title">RAW FILES</h3>
          <table class="list-table">
            <tr><th>FILE</th><th>DOWNLOAD</th></tr>
            <tr><td>${escapeHtml(slug)}.md</td><td><a href="raw/${escapeHtml(slug)}.md" download>DOWNLOAD</a></td></tr>
          </table>

          <h3 class="sub-title">FULL CONTENT</h3>
          <div class="skill-body">
            <pre class="raw-content">${bodyHtml}</pre>
          </div>

        </div>
      </td>
    </tr>
  </table>

  <div class="footer">CC ACADEMIC LIBRARY / CLAUDE CODE / ACADEMIC + SCIENTIFIC SKILLS / STATIC HTML / ZERO DEPENDENCIES</div>
</div>
</body>
</html>`;
}

// ── WCN tool HTML ─────────────────────────────────────────────────────────────

function buildWcnHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>WCN — TOOLS — CC ACADEMIC LIBRARY</title>
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../search-index.js" defer></script>
  <script src="../../search.js" defer></script>
</head>
<body class="section-tools">
<a class="skip-to-content" href="#main-content">Skip to content</a>
<div class="page">
  <h1 class="site-title">CC ACADEMIC LIBRARY</h1>
  <div class="top-meta">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">TOOLS</a> / <strong>WCN</strong></div>

  <table class="palette-bar" aria-hidden="true">
    <tr><td class="p1"></td><td class="p2"></td><td class="p3"></td><td class="p4"></td><td class="p5"></td></tr>
  </table>

  <table class="layout">
    <tr>
      <td class="sidebar">
        <div class="sidebar-inner">

          <div class="system-panel">
            <div class="system-head">SYSTEM PANEL</div>
            <div class="system-subhead">SITE NAVIGATION</div>
            <div class="system-body compact">
              <table class="system-list">
                <tr><td><a href="../../index.html"><span class="icon icon-dot"></span>HOME</a></td></tr>
                <tr><td><a href="../../skills/index.html"><span class="icon icon-skill"></span>SKILLS <span class="nav-count">[143]</span></a></td></tr>
                <tr><td><a href="../../commands/index.html"><span class="icon icon-note"></span>COMMANDS <span class="nav-count">[37]</span></a></td></tr>
                <tr><td><a href="../../agents/index.html"><span class="icon icon-dot"></span>AGENTS <span class="nav-count">[11]</span></a></td></tr>
                <tr><td><a href="../../templates/index.html"><span class="icon icon-folder"></span>TEMPLATES</a></td></tr>
                <tr><td><a class="active" href="../index.html"><span class="icon icon-folder"></span>TOOLS</a></td></tr>
                <tr><td><a href="../../resources/index.html"><span class="icon icon-dot"></span>RESOURCES</a></td></tr>
                <tr><td><a href="../../status/index.html"><span class="icon icon-dot"></span>STATUS</a></td></tr>
              </table>
            </div>
          </div>

          <div class="system-panel">
            <div class="system-head">QUICK FIND</div>
            <div class="system-body">
              <div class="search-row">
                <input type="text" placeholder="SKILLS / COMMANDS / AGENTS" aria-label="Search">
                <button>SEARCH</button>
              </div>
            </div>
            <div class="search-results" id="search-results"></div>
          </div>

          <div class="system-panel">
            <div class="system-head">SYSTEM INFO</div>
            <div class="system-body">
              <table class="meta-table">
                <tr><td class="meta-key">TOOL</td><td>WCN</td></tr>
                <tr><td class="meta-key">VERSION</td><td>1.0.0</td></tr>
                <tr><td class="meta-key">STATUS</td><td>DRAFT</td></tr>
                <tr><td class="meta-key">DATE</td><td>2026-04-14</td></tr>
              </table>
            </div>
          </div>

        </div>
      </td>
      <td class="content">
        <div class="content-inner" id="main-content">

          <div class="breadcrumb">YOU ARE HERE: <a href="../../index.html">HOME</a> / <a href="../index.html">TOOLS</a> / <strong>WCN</strong></div>
          <div class="marquee-line"><strong>TOOL:</strong> WCN — WORKFLOW COMPRESSION NOTATION</div>
          <h2 class="section-title">WCN</h2>
          <div class="rule"></div>

          <table class="meta-table">
            <tr><td class="meta-key">PATH</td><td>tools/wcn/</td></tr>
            <tr><td class="meta-key">VERSION</td><td>1.0.0</td></tr>
            <tr><td class="meta-key">STATUS</td><td>DRAFT</td></tr>
            <tr><td class="meta-key">FILES</td><td>cli.js, converter.js, SPEC.md</td></tr>
          </table>

          <div class="dotted-rule"></div>

          <div class="intro-panel">
            <div class="intro-panel-head">DESCRIPTION</div>
            <div class="intro-panel-body">WCN (WORKFLOW COMPRESSION NOTATION) IS A COMPACT, LLM-OPTIMIZED NOTATION FOR ENCODING WORKFLOW INSTRUCTIONS. ACHIEVES 40-60% TOKEN REDUCTION WHILE IMPROVING COMPREHENSION FOR SMALLER MODELS (HAIKU-CLASS). DESIGNED FOR AI AGENT INSTRUCTIONS, WORKFLOWS, AND PROMPTS.</div>
          </div>

          <h3 class="sub-title">DESIGN PRINCIPLES</h3>
          <table class="list-table">
            <tr><th>PRINCIPLE</th><th>DESCRIPTION</th></tr>
            <tr><td>TOKEN EFFICIENCY</td><td>Minimize tokens without losing semantics</td></tr>
            <tr><td>LLM READABILITY</td><td>Structure that models parse reliably</td></tr>
            <tr><td>HUMAN EDITABLE</td><td>No build step required, plain text</td></tr>
            <tr><td>LOSSLESS</td><td>All information preserved, just compressed</td></tr>
            <tr><td>INCREMENTAL</td><td>Can be applied partially to existing files</td></tr>
          </table>

          <h3 class="sub-title">FILES</h3>
          <table class="list-table">
            <tr><th>FILE</th><th>PURPOSE</th></tr>
            <tr><td>SPEC.md</td><td>Full notation specification</td></tr>
            <tr><td>cli.js</td><td>Command-line converter tool</td></tr>
            <tr><td>converter.js</td><td>Core conversion library</td></tr>
            <tr><td>examples/</td><td>Example WCN files</td></tr>
          </table>

        </div>
      </td>
    </tr>
  </table>

  <div class="footer">CC ACADEMIC LIBRARY / CLAUDE CODE / ACADEMIC + SCIENTIFIC SKILLS / STATIC HTML / ZERO DEPENDENCIES</div>
</div>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const skillsDir = path.join(SOURCE, 'skills');
const domains = fs.readdirSync(skillsDir).filter(d => {
  try { return fs.statSync(path.join(skillsDir, d)).isDirectory(); } catch { return false; }
});

const searchIndex = [];
let count = 0;

for (const domain of domains.sort()) {
  const domainPath = path.join(skillsDir, domain);
  const skills = fs.readdirSync(domainPath)
    .filter(s => { try { return fs.statSync(path.join(domainPath, s)).isDirectory(); } catch { return false; } })
    .sort();

  for (const skillSlug of skills) {
    const skillPath = path.join(domainPath, skillSlug);
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) continue;

    const content = fs.readFileSync(skillMdPath, 'utf8');
    const fm = parseFrontMatter(content);
    const body    = extractBody(content);
    const refs    = listDir(path.join(skillPath, 'references')).filter(f => /\.(md|txt|yaml)$/.test(f));
    const scripts = listDir(path.join(skillPath, 'scripts')).filter(f => /\.(py|js|sh|r|R)$/.test(f));
    const assets  = listDir(path.join(skillPath, 'assets')).filter(f => !/^\./.test(f));
    const domainClass = DOMAIN_CLASS[domain] || 'domain-misc';

    const html = buildSkillHtml({ domain, domainClass, skillSlug, fm, refs, scripts, assets, body });
    const outDir = path.join(OUTPUT, 'skills', domain, skillSlug);
    mkdirp(outDir);
    fs.writeFileSync(path.join(outDir, 'index.html'), html);

    // Copy raw source files for download
    const rawDir = path.join(outDir, 'raw');
    mkdirp(rawDir);
    copyFile(skillMdPath, path.join(rawDir, 'SKILL.md'));
    if (refs.length)    copyDirFiles(path.join(skillPath, 'references'), path.join(rawDir, 'references'));
    if (scripts.length) copyDirFiles(path.join(skillPath, 'scripts'),    path.join(rawDir, 'scripts'));
    if (assets.length)  copyDirFiles(path.join(skillPath, 'assets'),     path.join(rawDir, 'assets'));

    searchIndex.push({
      title: (fm.name || skillSlug).toUpperCase(),
      url: `skills/${domain}/${skillSlug}/`,
      tags: fm.description || '',
      section: 'skills',
      domain,
    });

    count++;
    process.stdout.write(`  [${String(count).padStart(3)}] skills/${domain}/${skillSlug}/index.html\n`);
  }
}

// ── Commands ──────────────────────────────────────────────────────────────────

const commandsDir = path.join(SOURCE, 'commands');
const commandFiles = fs.readdirSync(commandsDir)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort();

let cmdCount = 0;
for (const file of commandFiles) {
  const slug = file.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(commandsDir, file), 'utf8');
  const fm = parseFrontMatterFull(content);
  const body = extractBody(content);
  const stage = COMMAND_STAGE[slug] || 'UTILITY';
  const name = fm.name ? fm.name.replace(/^wtfp:/, '') : slug;

  const html = buildCommandHtml({ slug, name, description: fm.description, tools: fm.tools, stage, body });
  const outDir = path.join(OUTPUT, 'commands', slug);
  mkdirp(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  // Copy raw source file for download
  const rawDir = path.join(outDir, 'raw');
  mkdirp(rawDir);
  copyFile(path.join(commandsDir, file), path.join(rawDir, `${slug}.md`));

  searchIndex.push({
    title: name.toUpperCase(),
    url: `commands/${slug}/`,
    tags: fm.description || '',
    section: 'commands',
    domain: stage.toLowerCase(),
  });

  cmdCount++;
  process.stdout.write(`  [CMD ${String(cmdCount).padStart(2)}] commands/${slug}/index.html\n`);
}

// ── Agents ────────────────────────────────────────────────────────────────────

const agentsDir = path.join(SOURCE, 'agents');
const agentFiles = fs.readdirSync(agentsDir)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort();

let agentCount = 0;
for (const file of agentFiles) {
  const slug = file.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(agentsDir, file), 'utf8');
  const fm = parseFrontMatterFull(content);
  const body = extractBody(content);
  const name = fm.name ? fm.name.replace(/^wtfp-/, '') : slug;

  const html = buildAgentHtml({ slug, name, description: fm.description, tools: fm.tools, body });
  const outDir = path.join(OUTPUT, 'agents', slug);
  mkdirp(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  // Copy raw source file for download
  const rawDir = path.join(outDir, 'raw');
  mkdirp(rawDir);
  copyFile(path.join(agentsDir, file), path.join(rawDir, `${slug}.md`));

  searchIndex.push({
    title: name.toUpperCase(),
    url: `agents/${slug}/`,
    tags: fm.description || '',
    section: 'agents',
    domain: 'agents',
  });

  agentCount++;
  process.stdout.write(`  [AGT ${String(agentCount).padStart(2)}] agents/${slug}/index.html\n`);
}

// ── Tool: WCN ─────────────────────────────────────────────────────────────────

const wcnOutDir = path.join(OUTPUT, 'tools', 'wcn');
mkdirp(wcnOutDir);
fs.writeFileSync(path.join(wcnOutDir, 'index.html'), buildWcnHtml());
searchIndex.push({ title: 'WCN', url: 'tools/wcn/', tags: 'Workflow Compression Notation — token-efficient AI prompt encoding', section: 'tools', domain: 'tools' });
process.stdout.write(`  [TOOL] tools/wcn/index.html\n`);

// ── Write search index ────────────────────────────────────────────────────────

const indexJs = `// Auto-generated by generate.js — do not edit manually\nconst SEARCH_INDEX = ${JSON.stringify(searchIndex, null, 2)};\n`;
const searchIndexPath = path.join(OUTPUT, 'search-index.js');
fs.writeFileSync(searchIndexPath, indexJs);

console.log(`\nDone. ${count} skill pages + ${cmdCount} command pages + ${agentCount} agent pages + 1 tool page. Search index: ${searchIndex.length} entries.`);
