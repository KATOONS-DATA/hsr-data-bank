/** Prefix internal paths with the Astro base URL (required for GitHub project pages). */
export function sitePath(path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/' || path === '') {
    return `${base}/`;
  }
  const cleanPath = path.replace(/^\//, '');
  return `${base}/${cleanPath}`;
}
