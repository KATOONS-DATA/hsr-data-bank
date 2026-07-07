import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entryFields = {
  title: z.string(),
  description: z.string().optional(),
  /** Shown in the infobox sidebar */
  faction: z.string().optional(),
  path: z.string().optional(),
  world: z.string().optional(),
  status: z.string().optional(),
  role: z.string().optional(),
  rarity: z.union([z.string(), z.number()]).optional(),
  /** Imported from coralie6626/hsr-databank — edit for table truth */
  gameData: z.boolean().optional(),
  /** Set true to hide from lists (draft / GM-only until ready) */
  draft: z.boolean().optional(),
};

const characters = defineCollection({
  loader: glob({ base: './src/content/characters', pattern: '**/*.{md,mdx}' }),
  schema: z.object(entryFields),
});

const factions = defineCollection({
  loader: glob({ base: './src/content/factions', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...entryFields,
    alignment: z.string().optional(),
    /** Associated Path — matches in-game Data Bank tags */
    associatedPath: z.string().optional(),
  }),
});

const aeons = defineCollection({
  loader: glob({ base: './src/content/aeons', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    path: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const locations = defineCollection({
  loader: glob({ base: './src/content/locations', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...entryFields,
    region: z.string().optional(),
  }),
});

const terminology = defineCollection({
  loader: glob({ base: './src/content/terminology', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const lightcones = defineCollection({
  loader: glob({ base: './src/content/lightcones', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    path: z.string().optional(),
    rarity: z.union([z.string(), z.number()]).optional(),
    gameData: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

const relics = defineCollection({
  loader: glob({ base: './src/content/relics', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    effect: z.string().optional(),
    gameData: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  characters,
  factions,
  aeons,
  locations,
  terminology,
  lightcones,
  relics,
};

export type WikiCollection = keyof typeof collections;

export const categories = [
  {
    id: 'characters' as const,
    label: 'Characters',
    href: '/characters/',
    icon: '◆',
    blurb: 'Individuals encountered across the stars.',
  },
  {
    id: 'factions' as const,
    label: 'Factions',
    href: '/factions/',
    icon: '✦',
    blurb: 'Organizations, allegiances, and power structures.',
  },
  {
    id: 'aeons' as const,
    label: 'Aeons',
    href: '/aeons/',
    icon: '☆',
    blurb: 'Divine beings who tread the Paths between the stars.',
  },
  {
    id: 'locations' as const,
    label: 'Locations',
    href: '/locations/',
    icon: '◎',
    blurb: 'Worlds, stations, and places of note.',
  },
  {
    id: 'terminology' as const,
    label: 'Terminology',
    href: '/terminology/',
    icon: '◇',
    blurb: 'Concepts, paths, and key terms.',
  },
  {
    id: 'lightcones' as const,
    label: 'Light Cones',
    href: '/lightcones/',
    icon: '✧',
    blurb: 'Weapons of legacy — paths etched in light.',
  },
  {
    id: 'relics' as const,
    label: 'Relics',
    href: '/relics/',
    icon: '❖',
    blurb: 'Relic sets and their recorded effects.',
  },
] as const;
