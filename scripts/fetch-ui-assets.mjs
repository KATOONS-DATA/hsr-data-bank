#!/usr/bin/env node
/** Download UI icons into public/assets for reliable loading. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE =
  'https://raw.githubusercontent.com/Mar7thLover/StarRailRes-image/master';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'assets');

const FILES = [
  'icon/sign/DataBankIcon.png',
  'icon/path/Destruction.png',
  'icon/path/Hunt.png',
  'icon/path/Erudition.png',
  'icon/path/Harmony.png',
  'icon/path/Nihility.png',
  'icon/path/Preservation.png',
  'icon/path/Abundance.png',
  'icon/path/Remembrance.png',
  'icon/element/Physical.png',
  'icon/element/Fire.png',
  'icon/element/Ice.png',
  'icon/element/Thunder.png',
  'icon/element/Wind.png',
  'icon/element/Quantum.png',
  'icon/element/Imaginary.png',
];

async function download(rel) {
  const url = `${BASE}/${rel}`;
  const dest = path.join(OUT, rel);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log('ok', rel);
}

await Promise.all(FILES.map(download));
console.log(`\n${FILES.length} assets in public/assets/`);
