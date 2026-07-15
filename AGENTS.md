# AGENTS.md

## Cursor Cloud specific instructions

### Project

Trailblaze Data Bank is a single-product **Astro static site** (`output: 'static'`) — a
player-facing campaign wiki. There is **no backend, database, or runtime service**. Content
lives as Markdown + YAML frontmatter under `src/content/<collection>/` and is validated at
build time against the Zod schemas in `src/content.config.ts` (invalid frontmatter fails the
build — this is the closest thing to an automated test).

### Running / building / testing

Standard commands are in `package.json` and `README.md`; use those. Notes:

- Dev server: `npm run dev`. It is served under the configured `base`, so the URL is
  `http://localhost:4321/hsr-data-bank/` (NOT the bare root `/`). The bare root returns 404.
- Build: `npm run build` (outputs to `dist/`). Preview built output with `npm run preview`.
- No test framework and no linter are configured. `npm test`/`npm run lint` do not exist.
  For type/content checking you can run `npx astro check` (not wired as a script).
- Hot reload: adding/editing a Markdown file under `src/content/<collection>/` with valid
  frontmatter automatically publishes a page (e.g. `/characters/<slug>/`); `draft: true`
  hides it from index listings.

### Optional scripts (need internet, not required to run the site)

`npm run import:game*`, `npm run fetch:assets`, and `npm run seed:lore` pull data/assets
from public GitHub endpoints (unauthenticated, ~60 req/hr rate limit). `import:game:local`
reads `vendor/hsr-databank/`, which is empty unless that repo is cloned there first.

No environment variables or secrets are required.
