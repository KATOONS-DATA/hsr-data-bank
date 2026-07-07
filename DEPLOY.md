# GitHub Pages — fix the 404

A **404 "There isn't a GitHub Pages site here"** means GitHub has nothing published yet. Work through this list in order.

---

## 1. Check the URL

| Repo name on GitHub | Your live URL |
| ------------------- | ------------- |
| `hsr-data-bank` | `https://YOUR-USERNAME.github.io/hsr-data-bank/` |
| `hsr-databank` | `https://YOUR-USERNAME.github.io/hsr-databank/` |
| `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io/` |

`https://YOUR-USERNAME.github.io/` alone **only works** if the repo is literally named `YOUR-USERNAME.github.io`.

Trailing slash matters less, but use the full path including the repo name for project sites.

---

## 2. Edit `site.config.ts`

`base` **must match your GitHub repo name** exactly:

```ts
export const site = {
  title: 'Data Bank',
  tagline: 'Trailblaze Campaign Archive',
  url: 'https://YOUR-USERNAME.github.io',   // no trailing slash
  base: '/hsr-data-bank',                    // same as repo name, with slashes
};
```

If your repo is `hsr-databank`, use `base: '/hsr-databank'`.

Commit and push after changing this.

---

## 3. Push the project to GitHub

The folder must be its **own** git repo (not only inside the Obsidian vault).

```bash
cd hsr-data-bank
git init
git add .
git commit -m "Initial Data Bank site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

Repo must be **public** (free GitHub Pages on public repos).

---

## 4. Enable GitHub Pages (most common miss)

1. Open the repo on GitHub
2. **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not "Deploy from a branch")
4. Save

Without this step you always get a 404.

---

## 5. Run the deploy workflow

1. Go to **Actions** tab
2. Open **Deploy Data Bank to GitHub Pages**
3. If it failed, open the failed run and read the red step

**First time:** click **Run workflow** → **Run workflow** (workflow_dispatch).

Wait until the green checkmark appears on `main`.

---

## 6. Confirm deployment

1. **Settings** → **Pages** — should show:  
   `Your site is live at https://...`
2. Or **Actions** → latest run → **deploy** job → environment URL

Give it 1–2 minutes after the workflow finishes.

---

## Common failures

| Symptom | Fix |
| ------- | --- |
| 404 on `username.github.io` | Use `username.github.io/REPO-NAME/` for project repos |
| Actions tab empty | Push `.github/workflows/deploy.yml` on `main` |
| Workflow red on `npm ci` | Fixed — workflow now uses `npm install` |
| `base` wrong | Styles/links broken; fix `site.config.ts` and redeploy |
| Private repo | Make public, or use GitHub Pro for private Pages |

---

## Quick test locally (before pushing)

Install [Node.js](https://nodejs.org/), then:

```bash
cd hsr-data-bank
npm install
npm run dev
```

If that works, the site builds; any remaining issue is GitHub setup only.
