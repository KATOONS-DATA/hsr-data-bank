# Trailblaze Data Bank

Player-facing campaign wiki styled like Honkai: Star Rail's in-game **Data Bank**. Built with [Astro](https://astro.build/) — free to host on GitHub Pages or Cloudflare Pages.

---

## Quick start (local preview)

### 1. Install Node.js (one time)

Download **Node.js 20+** from [nodejs.org](https://nodejs.org/) (LTS). Restart your terminal after installing.

### 2. Install and run

```bash
cd hsr-data-bank
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321`).

### 3. Edit site settings

Open `site.config.ts` and set your title, tagline, and deployment URL.

---

## Add a new lore entry

1. Create a `.md` file in the right folder:

| Folder | Example |
| ------ | ------- |
| `src/content/characters/` | `himeko.md` |
| `src/content/factions/` | `wildfire.md` |
| `src/content/locations/` | `belobog.md` |
| `src/content/terminology/` | `aeon.md` |

2. Add frontmatter at the top:

```yaml
---
title: Himeko
description: One-line summary for the index page.
faction: Astral Express
path: Erudition
world: —
status: Alive
draft: false
---
```

3. Write the article body in markdown below the `---`.

4. Save — the dev server hot-reloads. The new page appears automatically at `/characters/himeko/`.

**Hide a draft from players:** set `draft: true` — it won't show in category lists.

---

## Deploy free on GitHub Pages

Everything below is **$0**.

### Step 1 — Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `hsr-data-bank` (or anything — update `base` in `site.config.ts` to match)
3. Create the repo **without** a README

### Step 2 — Push this folder

```bash
cd hsr-data-bank
git init
git add .
git commit -m "Initial Data Bank site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hsr-data-bank.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Wait for the workflow to finish (Actions tab)

Your site will be live at:

`https://YOUR-USERNAME.github.io/hsr-data-bank/`

### Step 4 — Update `site.config.ts`

```ts
export const site = {
  title: 'Data Bank',
  tagline: 'Trailblaze Campaign Archive',
  url: 'https://YOUR-USERNAME.github.io',
  base: '/hsr-data-bank',
};
```

Commit and push — GitHub Actions rebuilds automatically.

**Share with players:** send the GitHub Pages URL.

---

## Deploy free on Cloudflare Pages (alternative)

1. Push the repo to GitHub
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Build settings: **Astro** preset, command `npm run build`, output `dist`
4. Set `base: '/'` in `site.config.ts`

---

## Customize the HSR look

All styling: `src/styles/databank.css`

Site title and tagline: `site.config.ts`

---

## Project structure

```text
hsr-data-bank/
├── site.config.ts
├── src/content/            ← your lore (markdown)
├── src/styles/databank.css ← HSR theme
└── .github/workflows/      ← free auto-deploy
```

---

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Local preview |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run import:game` | Import characters from [coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank) (draft) |
| `npm run import:game:all` | Import characters + light cones + relics |
| `npm run import:game:publish` | Import characters visible on the site |

See `ATTRIBUTION.md` for the upstream data source.

---

## Game data import (coralie6626/hsr-databank)

The repo [coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank) has structured JSON for ~50+ characters, light cones, and relic sets — faction, path, story, skills, etc.

After `npm install`:

```bash
# Import one character to try (edit kafka.md, set draft: false)
npm run import:game -- --only kafka

# Import all characters as drafts (hidden until you publish)
npm run import:game

# Import everything
npm run import:game:all

# Make imported entries visible on category pages
npm run import:game:publish
```

Each imported file gets:

- Infobox fields from JSON (faction, path, rarity)
- `## Overview` from game story text
- Empty `## At the table` for your campaign
- `draft: true` until you flip it or use `--publish`

**For players:** only set `draft: false` on entries you've reviewed. Add table-specific notes under **At the table**.
