/** StarRailRes-image — portrait / icon CDN (build-time fetch, static output). */
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

let indexCache: CharacterIndex | null = null;

export async function loadCharacterIndex(): Promise<CharacterIndex> {
  if (indexCache) return indexCache;
  const res = await fetch(`${ASSETS_BASE}/index_new/en/characters.json`);
  if (!res.ok) throw new Error(`Failed to load character index: ${res.status}`);
  indexCache = (await res.json()) as CharacterIndex;
  return indexCache;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function resolveCharacter(
  index: CharacterIndex,
  slug: string,
  title: string,
): GameCharacter | undefined {
  const slugKey = normalizeKey(slug);
  const titleKey = normalizeKey(title);

  for (const char of Object.values(index)) {
    const tagKey = normalizeKey(char.tag);
    const nameKey = normalizeKey(char.name);
    if (tagKey === slugKey || nameKey === titleKey) return char;
    if (slugKey.includes(tagKey) || tagKey.includes(slugKey)) return char;
  }
  return undefined;
}

export function portraitUrl(char: GameCharacter): string {
  return `${ASSETS_BASE}/${char.portrait}`;
}

export function characterIconUrl(char: GameCharacter): string {
  return `${ASSETS_BASE}/${char.icon}`;
}

export function pathIconUrl(pathName: string): string {
  const file = pathName.replace(/\s+/g, '');
  return `${ASSETS_BASE}/icon/path/${file}.png`;
}

export function elementIconUrl(element: string): string {
  return `${ASSETS_BASE}/icon/element/${element}.png`;
}
