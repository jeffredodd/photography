# Mossy Giraffe — Photography Portfolio

A static Next.js portfolio for [mossygiraffe.com](https://www.mossygiraffe.com), built to replace the Squarespace site with a bespoke React app. Gallery collections, lightbox, and static export for GitHub Pages.

## Run locally

**With Node (no Docker):**

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**With Docker:**

```bash
docker compose up
```

Then open [http://localhost:3000](http://localhost:3000). The app directory is mounted so edits hot-reload. To install new dependencies, run them inside the container (e.g. `docker compose run web npm install <pkg>`) or add to `package.json` and rebuild the image.

## Build static export

```bash
npm run build
```

Output is in `out/`. Serve that folder with any static host.

## Deploy to GitHub Pages

1. **Enable GitHub Pages from Actions**  
   In the repo: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.

2. **Push to trigger deploy**  
   Pushing to `main` runs the workflow (or run it manually from the **Actions** tab). The workflow runs `npm ci`, `npm run build`, and deploys the contents of `out/` to GitHub Pages.

3. **Custom domain (mossygiraffe.com)**  
   - In **Settings → Pages**, under "Custom domain", enter `mossygiraffe.com` (and optionally `www.mossygiraffe.com`).  
   - At your DNS provider, add a CNAME record for `mossygiraffe.com` (and/or `www`) pointing to `username.github.io` (or the URL GitHub shows in the Pages settings).  
   - Enforce HTTPS in the Pages settings once DNS has propagated.

4. **Project site (e.g. username.github.io/photography-portfolio)**  
   If you use a project-site URL with a path prefix, set `basePath` and `assetPrefix` in `next.config.ts` to that path (e.g. `'/photography-portfolio'`) before building, then deploy as above.

## Project layout

- `app/` — Next.js App Router (home, gallery index, gallery collection pages)
- `components/` — Header, Footer, Lightbox, ImageGridWithLightbox
- `content/gallery.json` — Gallery collections and image list (edit or regenerate with `scripts/download-gallery-images.js`)
- `lib/gallery.ts` — Helpers to read gallery data
- `public/images/` — Gallery images by collection (see `public/images/README.md` for replacing with originals)

## Scripts

- `node scripts/download-gallery-images.js` — Re-download gallery images from Squarespace CDN and regenerate `content/gallery.json`.
