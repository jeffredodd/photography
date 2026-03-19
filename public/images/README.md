# Gallery images

These images were downloaded from the Squarespace CDN (mossygiraffe.com) to bootstrap the portfolio. They match the current site’s gallery collections: Spain, Paris, Animals, San Francisco, Pacific Northwest.

**Replacing with originals:** When you have the original high‑quality files, replace the files in each collection folder (`spain/`, `paris/`, etc.) keeping the same filenames so `content/gallery.json` stays valid. If you use different filenames, update the `src` values in `content/gallery.json` to match.

To re-run the CDN download (e.g. after adding new images on Squarespace):

```bash
node scripts/download-gallery-images.js
```

This overwrites existing files and regenerates `content/gallery.json`.
