/** Prefix internal paths with the Astro base URL (required for GitHub project pages). */
export function sitePath(path: string = '/'): string {
  const base = import.meta.env.BASE_URL;
  if (path === '/' || path === '') return base;
  return `${base}${path.replace(/^\//, '')}`;
}
