/** StarRailRes-image — portrait / icon CDN + local fallbacks. */
export const ASSETS_BASE =
  'https://raw.githubusercontent.com/Mar7thLover/StarRailRes-image/master';

export interface GameCharacter {
  id: string;
  name: string;
  tag: string;
  rarity: number;
  path: string;
  element: string;
  portrait: string;
  icon: string;
}

export type CharacterIndex = Record<string, GameCharacter>;

interface PathEntry {
  name: string;
  icon: string;
  icon_small?: string;
}

interface ElementEntry {
  id: string;
  name: string;
  icon: string;
}

let indexCache: CharacterIndex | null = null;
let pathsCache: Record<string, PathEntry> | null = null;
let elementsCache: Record<string, ElementEntry> | null = null;
let tagIndexCache: Map<string, GameCharacter> | null = null;

/** Content slug → game tag (when slug does not match tag). */
const SLUG_TO_TAG: Record<string, string> = {
  'trailblazer': 'playergirl',
  'dan-heng-imbibitor-lunae': 'danhengil',
  'dr-ratio': 'drratio',
  'topaz-numby': 'topaz',
  'firefly': 'sam',
  'march-7th': 'mar7th',
  'black-swan': 'blackswan',
  'silver-wolf': 'silverwolf',
  'fu-xuan': 'fuxuan',
  'jing-yuan': 'jingyuan',
  'jingliu': 'jingliu',
  'ruan-mei': 'ruanmei',
  'dan-heng': 'danheng',
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${ASSETS_BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function loadCharacterIndex(): Promise<CharacterIndex> {
  if (indexCache) return indexCache;
  indexCache = await fetchJson<CharacterIndex>('index_new/en/characters.json');
  tagIndexCache = new Map(
    Object.values(indexCache).map((c) => [c.tag.toLowerCase(), c]),
  );
  return indexCache;
}

async function loadPaths(): Promise<Record<string, PathEntry>> {
  if (pathsCache) return pathsCache;
  pathsCache = await fetchJson('index_new/en/paths.json');
  return pathsCache;
}

async function loadElements(): Promise<Record<string, ElementEntry>> {
  if (elementsCache) return elementsCache;
  elementsCache = await fetchJson('index_new/en/elements.json');
  return elementsCache;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function resolveCharacter(
  index: CharacterIndex,
  slug: string,
  title: string,
): GameCharacter | undefined {
  const tags = tagIndexCache ?? new Map(
    Object.values(index).map((c) => [c.tag.toLowerCase(), c]),
  );

  const overrideTag = SLUG_TO_TAG[slug];
  if (overrideTag) {
    const hit = tags.get(overrideTag.toLowerCase());
    if (hit) return hit;
  }

  const slugKey = normalizeKey(slug);
  const byTag = tags.get(slugKey);
  if (byTag) return byTag;

  const titleKey = normalizeKey(title);
  for (const char of Object.values(index)) {
    if (normalizeKey(char.name) === titleKey) return char;
  }

  return undefined;
}

export function assetUrl(relativePath: string): string {
  return `${ASSETS_BASE}/${relativePath}`;
}

export function portraitUrl(char: GameCharacter): string {
  return assetUrl(char.portrait);
}

export function characterIconUrl(char: GameCharacter): string {
  return assetUrl(char.icon);
}

export async function pathIconUrl(pathName: string): Promise<string> {
  const paths = await loadPaths();
  for (const entry of Object.values(paths)) {
    if (entry.name === pathName) {
      const icon = entry.icon_small ?? entry.icon;
      return assetUrl(icon);
    }
  }
  const fallback = pathName.replace(/^The\s+/i, '').replace(/\s+/g, '');
  return assetUrl(`icon/path/${fallback}.png`);
}

export async function elementIconUrl(elementName: string): Promise<string> {
  const elements = await loadElements();
  for (const entry of Object.values(elements)) {
    if (entry.id === elementName || entry.name === elementName) {
      return assetUrl(entry.icon);
    }
  }
  return assetUrl(`icon/element/${elementName}.png`);
}

/** Local bundled UI assets (path relative to site public root). */
export function localAsset(path: string): string {
  return `/assets/${path}`;
}
