#!/usr/bin/env node
/**
 * Import game data JSON from coralie6626/hsr-databank into markdown content files.
 *
 * Source: https://github.com/coralie6626/hsr-databank
 *
 * Usage:
 *   node scripts/import-game-data.mjs                  # all characters (remote)
 *   node scripts/import-game-data.mjs --local          # read vendor/hsr-databank clone
 *   node scripts/import-game-data.mjs --only kafka     # one character
 *   node scripts/import-game-data.mjs --publish        # draft: false
 *   node scripts/import-game-data.mjs --type lightcones
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VENDOR = path.join(ROOT, 'vendor', 'hsr-databank');
const CONTENT = path.join(ROOT, 'src', 'content');

const REMOTE_BASE =
  'https://raw.githubusercontent.com/coralie6626/hsr-databank/main';

const args = new Set(process.argv.slice(2));
const useLocal = args.has('--local');
const publish = args.has('--publish');
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : null;
const typeIdx = process.argv.indexOf('--type');
const type = typeIdx >= 0 ? process.argv[typeIdx + 1] : 'characters';

function yamlString(value) {
  if (value == null || value === '') return '""';
  const s = String(value);
  if (/[:#"'[\]{}&,*?|>!%@`]|^\s|\s$/.test(s)) return JSON.stringify(s);
  return s;
}

function slugFromCharacterFile(file) {
  return file.replace(/-character(-\d+)?\.json$/, '').replace(/\.json$/, '');
}

function slugFromLightconeFile(file) {
  return file.replace(/-item\.json$/, '');
}

function slugFromRelicFile(file) {
  return file.replace(/-relic_set(-\d+)?\.json$/, '');
}

function storyToParagraphs(story) {
  if (!story) return '';
  return story
    .replace(/\.([A-Z])/g, '.\n\n$1')
    .trim();
}

function formatSkills(skills = []) {
  if (!skills.length) return '';
  const lines = ['## Skills', ''];
  for (const s of skills) {
    if (!s.name || !s.description) continue;
    lines.push(`### ${s.name}`, '', s.description, '');
    if (s.weaknessBreak) lines.push(`*${s.weaknessBreak}*`, '');
  }
  return lines.join('\n');
}

function formatEidolons(eidolons = []) {
  if (!eidolons.length) return '';
  const lines = ['## Eidolons', ''];
  for (const e of eidolons) {
    lines.push(`### E${e.level} — ${e.name}`, '', e.description, '');
  }
  return lines.join('\n');
}

function formatRelicSlots(slots = []) {
  if (!slots.length) return '';
  const lines = ['## Pieces', ''];
  for (const slot of slots) {
    lines.push(`### ${slot.name || slot.slot || 'Piece'}`, '');
    if (slot.story) lines.push(slot.story, '');
  }
  return lines.join('\n');
}

async function listRemoteJson(folder) {
  const api = `https://api.github.com/repos/coralie6626/hsr-databank/contents/${folder}`;
  const res = await fetch(api, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub API failed: ${res.status} ${folder}`);
  const files = await res.json();
  return files.filter((f) => f.name.endsWith('.json')).map((f) => f.name);
}

async function readJson(folder, filename) {
  if (useLocal) {
    const filePath = path.join(VENDOR, folder, filename);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  }
  const url = `${REMOTE_BASE}/${folder}/${filename}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url}`);
  return res.json();
}

async function writeMarkdown(collection, slug, frontmatter, body) {
  const dir = path.join(CONTENT, collection);
  await fs.mkdir(dir, { recursive: true });
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${yamlString(v)}`)
    .join('\n');
  const content = `---\n${fm}\n---\n\n${body.trim()}\n`;
  const out = path.join(dir, `${slug}.md`);
  await fs.writeFile(out, content, 'utf8');
  return out;
}

async function importCharacters() {
  const files = useLocal
    ? (await fs.readdir(path.join(VENDOR, 'characters'))).filter((f) =>
        f.endsWith('.json'),
      )
    : await listRemoteJson('characters');

  let count = 0;
  for (const file of files) {
    const slug = slugFromCharacterFile(file);
    if (only && slug !== only && !file.includes(only)) continue;

    const data = await readJson('characters', file);
    const desc = data.story
      ? data.story.slice(0, 120).replace(/\s+/g, ' ').trim() + '…'
      : `${data.name} — ${data.path || 'Unknown path'}`;

    const body = [
      '> **Game data** — imported from [coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank). Edit this file for your table version.',
      '',
      '## Overview',
      '',
      storyToParagraphs(data.story),
      '',
      '## At the table',
      '',
      '_What your party has learned in play — replace or append above._',
      '',
      formatSkills(data.skills),
      formatEidolons(data.eidolons),
    ]
      .filter(Boolean)
      .join('\n');

    const out = await writeMarkdown(
      'characters',
      slug,
      {
        title: data.name,
        description: desc,
        faction: data.faction || '',
        path: data.path || '',
        rarity: data.rarity ?? '',
        role: data.combatTypes ? `${data.combatTypes}` : '',
        gameData: true,
        draft: publish ? false : true,
      },
      body,
    );
    console.log('wrote', path.relative(ROOT, out));
    count++;
  }
  return count;
}

async function importLightcones() {
  const files = useLocal
    ? (await fs.readdir(path.join(VENDOR, 'lightcones'))).filter((f) =>
        f.endsWith('.json'),
      )
    : await listRemoteJson('lightcones');

  let count = 0;
  for (const file of files) {
    const slug = slugFromLightconeFile(file);
    if (only && slug !== only) continue;

    const data = await readJson('lightcones', file);
    const body = [
      '> **Game data** — imported from [coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank).',
      '',
      '## Story',
      '',
      storyToParagraphs(data.story),
      '',
      '## Skill',
      '',
      data.skill || '_No skill text._',
    ].join('\n');

    const out = await writeMarkdown(
      'lightcones',
      slug,
      {
        title: data.name,
        description: data.skill?.slice(0, 100) || data.name,
        path: data.path || '',
        rarity: data.rarity ?? '',
        gameData: true,
        draft: publish ? false : true,
      },
      body,
    );
    console.log('wrote', path.relative(ROOT, out));
    count++;
  }
  return count;
}

async function importRelics() {
  const files = useLocal
    ? (await fs.readdir(path.join(VENDOR, 'relics'))).filter((f) =>
        f.endsWith('.json'),
      )
    : await listRemoteJson('relics');

  let count = 0;
  for (const file of files) {
    const slug = slugFromRelicFile(file);
    if (only && slug !== only) continue;

    const data = await readJson('relics', file);
    const body = [
      '> **Game data** — imported from [coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank).',
      '',
      '## Effect',
      '',
      data.effect || '_No effect text._',
      '',
      formatRelicSlots(data.slots),
    ].join('\n');

    const out = await writeMarkdown(
      'relics',
      slug,
      {
        title: data.name,
        description: data.effect?.slice(0, 100) || data.name,
        effect: data.effect || '',
        gameData: true,
        draft: publish ? false : true,
      },
      body,
    );
    console.log('wrote', path.relative(ROOT, out));
    count++;
  }
  return count;
}

async function main() {
  console.log(
    `Importing ${type} from ${useLocal ? VENDOR : REMOTE_BASE} …`,
  );
  let n = 0;
  if (type === 'characters') n = await importCharacters();
  else if (type === 'lightcones') n = await importLightcones();
  else if (type === 'relics') n = await importRelics();
  else throw new Error(`Unknown --type ${type}`);

  console.log(`\nDone — ${n} file(s).`);
  if (!publish) {
    console.log(
      'Entries are draft: true (hidden from index). Re-run with --publish when ready for players.',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
