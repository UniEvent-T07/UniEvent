#!/usr/bin/env node
// Check PA4 test-case files (docs/test/F01.md … F08.md) and build the
// Requirements–Test Traceability matrix for the submission.
//
//   node scripts/test-cases.mjs            check; uncovered FRs are warnings
//   node scripts/test-cases.mjs --strict   final check before PA4.3: uncovered FRs
//                                          and missing specifications are errors
//   node scripts/test-cases.mjs --write    also write docs/test/TRACEABILITY.md
//
// Exit code 1 when any error is found. No dependencies; Node 18+.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPEC = join(ROOT, 'docs/requirements/UNIEVENT-SPEC.md');
const TEST_DIR = join(ROOT, 'docs/test');
const OUT = join(TEST_DIR, 'TRACEABILITY.md');
const FEATURES = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08'];
// Detailed specifications assigned per feature in docs/management/PA4-phan-cong.md (total 20).
const SPEC_QUOTA = { F01: 3, F02: 2, F03: 2, F04: 2, F05: 3, F06: 4, F07: 2, F08: 2 };
const EXPECTED_FR_TOTAL = 47;
const PRIORITIES = ['High', 'Medium', 'Low'];
const AUTOMATED = ['Yes', 'No'];

const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const write = args.has('--write');

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// --- Requirements from the spec: "`FR-F01-01–12`" expands to FR-F01-01 … FR-F01-12.
const specText = readFileSync(SPEC, 'utf8');
const requirements = [];
for (const m of specText.matchAll(/`FR-(F\d{2})-(\d{2})[–-](\d{2})`/g)) {
  const [, f, from, to] = m;
  for (let n = Number(from); n <= Number(to); n++) {
    requirements.push(`FR-${f}-${String(n).padStart(2, '0')}`);
  }
}
const knownFr = new Set(requirements);
if (requirements.length !== EXPECTED_FR_TOTAL) {
  err('UNIEVENT-SPEC.md', `found ${requirements.length} FRs, expected ${EXPECTED_FR_TOTAL}`);
}

// --- Helpers for the Markdown sections defined in docs/test/TEMPLATE-Fxx.md.
function section(text, heading) {
  const start = text.search(new RegExp(`^## ${heading}\\s*$`, 'm'));
  if (start < 0) return null;
  const rest = text.slice(start).split('\n').slice(1).join('\n');
  const next = rest.search(/^## /m);
  return next < 0 ? rest : rest.slice(0, next);
}

function tableRows(block) {
  return block
    .split('\n')
    .filter((l) => l.trim().startsWith('|'))
    .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
    .filter((cells) => !cells.every((c) => /^:?-{3,}:?$/.test(c)));
}

const cases = new Map(); // id -> { feature, file, frs, title }
const coverage = new Map(requirements.map((fr) => [fr, []]));

for (const f of FEATURES) {
  const name = `${f}.md`;
  const path = join(TEST_DIR, name);
  if (!existsSync(path)) {
    (strict ? err : warn)(name, 'file not created yet');
    continue;
  }
  const text = readFileSync(path, 'utf8');

  const body = text.replace(/<!--[\s\S]*?-->/g, '').replace(/<br\s*\/?>/gi, '');
  if (/TC-Fxx|FR-Fxx|<[^>\n]+>/.test(body)) {
    err(name, 'template placeholders (TC-Fxx, FR-Fxx or <...>) are still present');
  }

  // Section 4: list of test cases.
  const list = section(text, '4\\. List of Test Cases');
  if (!list) {
    err(name, 'missing section "## 4. List of Test Cases"');
    continue;
  }
  const rows = tableRows(list);
  const header = rows.shift() ?? [];
  const expectedHeader = ['ID', 'Title', 'Req. / use case', 'Technique', 'Priority', 'Automated?'];
  if (header.join('|') !== expectedHeader.join('|')) {
    err(name, `section 4 header must be: | ${expectedHeader.join(' | ')} |`);
    continue;
  }
  const linked = new Set();
  for (const [idCell, title, req, technique, priority, automated] of rows) {
    const id = idCell.match(/TC-F\d{2}-\d{2}/)?.[0];
    if (!id) {
      err(name, `invalid case ID "${idCell}"`);
      continue;
    }
    if (!id.startsWith(`TC-${f}-`)) err(name, `${id} does not belong to ${f}`);
    if (cases.has(id)) err(name, `${id} is duplicated (also in ${cases.get(id).file})`);
    if (idCell.startsWith('[')) linked.add(id);
    if (!/^Verify\b/.test(title)) warn(name, `${id} title should start with "Verify"`);
    if (!technique) err(name, `${id} has no technique`);
    if (!PRIORITIES.includes(priority)) err(name, `${id} priority must be ${PRIORITIES.join('/')}`);
    if (!AUTOMATED.includes(automated)) err(name, `${id} Automated? must be Yes/No`);
    const frs = [...req.matchAll(/FR-F\d{2}-\d{2}/g)].map((m) => m[0]);
    if (frs.length === 0) err(name, `${id} has no FR in "Req. / use case"`);
    for (const fr of frs) {
      if (!knownFr.has(fr)) err(name, `${id} references unknown ${fr}`);
      else coverage.get(fr).push(id);
    }
    cases.set(id, { feature: f, file: name, frs, title });
  }

  // Section 5: specifications; each heading must match a listed case.
  const specs = [...(section(text, '5\\. Test Case Specifications') ?? '').matchAll(/^### (TC-F\d{2}-\d{2})\s*$/gm)].map(
    (m) => m[1],
  );
  for (const id of specs) {
    if (!cases.has(id)) err(name, `specification ${id} is not in the list of test cases`);
    if (!linked.has(id)) warn(name, `${id} has a specification but is not linked from section 4`);
  }
  for (const id of linked) {
    if (!specs.includes(id)) err(name, `${id} is linked but has no specification in section 5`);
  }
  if (specs.length < SPEC_QUOTA[f]) {
    (strict ? err : warn)(name, `${specs.length}/${SPEC_QUOTA[f]} detailed specifications`);
  }

  // Section 3: decision-table columns must point at listed cases.
  const dt = section(text, '3\\. Decision Tables') ?? '';
  for (const line of dt.split('\n').filter((l) => /\*\*Test case\*\*/.test(l))) {
    for (const m of line.matchAll(/TC-F\d{2}-\d{2}/g)) {
      if (!cases.has(m[0])) err(name, `decision table references ${m[0]}, which is not in the list`);
    }
  }
}

// --- Coverage.
const uncovered = requirements.filter((fr) => coverage.get(fr).length === 0);
for (const f of FEATURES) {
  const missing = uncovered.filter((fr) => fr.startsWith(`FR-${f}-`));
  if (missing.length) (strict ? err : warn)('coverage', `no test case for ${missing.join(', ')}`);
}

// --- Output.
const covered = requirements.length - uncovered.length;
const specCount = [...cases.keys()].filter((id) =>
  readFileSync(join(TEST_DIR, cases.get(id).file), 'utf8').includes(`### ${id}`),
).length;

if (write) {
  const lines = [
    '# Requirements–Test Traceability',
    '',
    '<!-- Generated by `node scripts/test-cases.mjs --write`. Do not edit by hand. -->',
    '',
    `Covered: ${covered}/${requirements.length} FR · Test cases: ${cases.size} · Detailed specifications: ${specCount}`,
    '',
    '| Req. ID | Test cases | Covered? |',
    '| --- | --- | --- |',
    ...requirements.map((fr) => {
      const ids = coverage.get(fr);
      return `| ${fr} | ${ids.join(', ') || '—'} | ${ids.length ? 'Yes' : 'No'} |`;
    }),
    '',
  ];
  writeFileSync(OUT, lines.join('\n'));
}

for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.log(`error    ${e}`);
console.log(
  `\n${covered}/${requirements.length} FR covered · ${cases.size} cases · ${specCount}/20 specifications · ` +
    `${errors.length} error(s), ${warnings.length} warning(s)${write ? ` · wrote ${OUT.slice(ROOT.length + 1)}` : ''}`,
);
process.exit(errors.length ? 1 : 0);
