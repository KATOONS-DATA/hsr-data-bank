/** In-game Path filters — order matches the Data Bank character list. */
export const PATHS = [
  { id: 'all', label: 'All' },
  { id: 'Destruction', label: 'Destruction' },
  { id: 'The Hunt', label: 'The Hunt' },
  { id: 'Erudition', label: 'Erudition' },
  { id: 'Harmony', label: 'Harmony' },
  { id: 'Nihility', label: 'Nihility' },
  { id: 'Preservation', label: 'Preservation' },
  { id: 'Abundance', label: 'Abundance' },
  { id: 'Remembrance', label: 'Remembrance' },
] as const;

export type PathId = (typeof PATHS)[number]['id'];
