````markdown
# Trailblaze Data Bank

A player-facing campaign wiki inspired by **Honkai: Star Rail's Data Bank**.

This project is built with **Astro** and can be hosted for free using **GitHub Pages** or **Cloudflare Pages**.

---

# Welcome

Whether you're a player, GM, or developer, this guide will walk you through everything you need to know—from opening the website for the first time to publishing it online.

If you're new, start with **Getting the Website Running** below.

---

# Getting the Website Running

## 1. Install Node.js (One Time Only)

Download and install **Node.js 20 or newer** from:

https://nodejs.org

After installation, restart your terminal.

---

## 2. Open the Project

Open a terminal inside the project folder.

Example:

```bash
cd hsr-data-bank
```

---

## 3. Install the Project

Run:

```bash
npm install
```

This only needs to be done the first time (or whenever project dependencies change).

---

## 4. Start the Website

Run:

```bash
npm run dev
```

After a few seconds you'll see something similar to:

```text
Local: http://localhost:4321/
```

---

## 5. Open the Website

Open your preferred web browser:

- Chrome
- Firefox
- Edge
- Safari
- etc.

Then visit:

```
http://localhost:4321
```

The Trailblaze Data Bank will now be running locally on your computer.

Keep the terminal open while you're using the website.

---

## 6. Making Changes

Edit any Markdown file, page, or stylesheet.

When you save the file, the website automatically refreshes in your browser.

No rebuilding is necessary while developing.

---

## 7. Closing the Website

When you're finished, return to the terminal and press:

```
Ctrl + C
```

This stops the local development server.

Whenever you want to continue working, simply run:

```bash
npm run dev
```

and visit:

```
http://localhost:4321
```

again.

---

# Everyday Tasks

## Add a Character

Create a file inside:

```
src/content/characters/
```

Example:

```
src/content/characters/himeko.md
```

Add frontmatter:

```yaml
---
title: Himeko
description: One-line summary.
faction: Astral Express
path: Erudition
world: —
status: Alive
draft: false
---
```

Write the article below the frontmatter.

Save the file.

The page automatically appears at:

```
/characters/himeko/
```

---

## Draft Entries

To hide an entry until it's ready, use:

```yaml
draft: true
```

Draft entries won't appear in category pages until changed to:

```yaml
draft: false
```

---

## Edit Site Information

Open:

```
site.config.ts
```

Here you can change:

- Website title
- Tagline
- URL
- Base path

---

## Change the Theme

Open:

```
src/styles/databank.css
```

All colors, typography, spacing, and styling are located here.

---

# Project Structure

```
hsr-data-bank/
├── site.config.ts
├── package.json
├── src/
│   ├── content/
│   │   ├── characters/
│   │   ├── factions/
│   │   ├── locations/
│   │   └── terminology/
│   └── styles/
│       └── databank.css
└── .github/
    └── workflows/
```

---

# Commands

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the local website |
| `npm run build` | Builds the production version |
| `npm run preview` | Preview the production build |
| `npm run import:game` | Import game data as drafts |
| `npm run import:game:all` | Import all available game data |
| `npm run import:game:publish` | Publish imported entries |

---

# Importing Game Data

The project can import structured data from:

https://github.com/coralie6626/hsr-databank

## Import One Character

```bash
npm run import:game -- --only kafka
```

## Import All Characters

```bash
npm run import:game
```

## Import Everything

```bash
npm run import:game:all
```

## Publish Imported Entries

```bash
npm run import:game:publish
```

Imported entries include:

- Character information
- Faction
- Path
- Rarity
- Story overview
- Empty **At the Table** section
- `draft: true` by default

Review imported content before changing entries to:

```yaml
draft: false
```

See `ATTRIBUTION.md` for information about the original data source.

---

# Deploying the Website

Once you're happy with your changes, you can publish the website online.

## GitHub Pages

### 1. Create a Repository

Create a new GitHub repository.

Example:

```
hsr-data-bank
```

Do **not** initialize it with a README.

---

### 2. Push the Project

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hsr-data-bank.git
git push -u origin main
```

---

### 3. Enable GitHub Pages

Open your repository.

Go to:

```
Settings
→ Pages
```

Under **Source**, choose:

```
GitHub Actions
```

Wait for the deployment workflow to finish.

Your site will be available at:

```
https://YOUR-USERNAME.github.io/hsr-data-bank/
```

---

### 4. Update site.config.ts

```ts
export const site = {
  title: "Data Bank",
  tagline: "Trailblaze Campaign Archive",
  url: "https://YOUR-USERNAME.github.io",
  base: "/hsr-data-bank",
};
```

Commit and push your changes.

GitHub Actions will automatically rebuild and publish the website.

---

# Cloudflare Pages

If you'd rather use Cloudflare Pages:

1. Push the repository to GitHub.

2. Open the Cloudflare Dashboard.

3. Go to:

```
Workers & Pages
```

4. Create a new Pages project.

5. Connect your GitHub repository.

6. Choose the Astro preset.

Use:

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

If using Cloudflare Pages, update:

```ts
base: "/"
```

inside `site.config.ts`.

---

# Advanced Information

These sections are mostly useful if you're modifying the project itself.

## Folder Overview

- `src/content/` — Markdown lore entries
- `src/styles/` — Site styling
- `site.config.ts` — Site configuration
- `.github/workflows/` — Automatic GitHub deployment

## Build Process

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Credits

Game data imports are based on:

https://github.com/coralie6626/hsr-databank

See `ATTRIBUTION.md` for licensing and attribution information.
````
