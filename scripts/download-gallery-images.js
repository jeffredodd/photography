#!/usr/bin/env node
/**
 * Downloads gallery images from Squarespace CDN into public/images/<collection>/
 * Run from repo root: node scripts/download-gallery-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const COLLECTIONS = [
  'spain',
  'paris',
  'animals',
  'san-francisco',
  'pacific-northwest',
];

const BASE = 'https://www.mossygiraffe.com';
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'MossyGiraffe-Migration/1' } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractImageUrls(html) {
  const re = /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/6794895c5a944f59c05d0c16\/[^"?]+\.jpg/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const url = m[0];
    if (!seen.has(url)) {
      seen.add(url);
      out.push(url);
    }
  }
  return out;
}

function basenameFromUrl(url) {
  const name = path.basename(url);
  return name.replace(/\?.*$/, '') || 'image.jpg';
}

function uniqueFilename(dir, base) {
  const ext = path.extname(base);
  const stem = path.basename(base, ext);
  let p = path.join(dir, base);
  let n = 0;
  while (fs.existsSync(p)) {
    n++;
    p = path.join(dir, `${stem}-${n}${ext}`);
  }
  return path.basename(p);
}

async function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'MossyGiraffe-Migration/1' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`${url} => ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  const gallery = { collections: [] };
  const urlToLocal = new Map();

  for (const slug of COLLECTIONS) {
    const collectionDir = path.join(IMAGE_DIR, slug);
    if (!fs.existsSync(collectionDir)) {
      fs.mkdirSync(collectionDir, { recursive: true });
    }

    const pageUrl = `${BASE}/gallery/${slug}`;
    console.log(`Fetching ${pageUrl} ...`);
    const html = (await fetch(pageUrl)).toString();
    const urls = extractImageUrls(html);
    console.log(`  ${urls.length} images`);

    const images = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      let localPath = urlToLocal.get(url);
      if (!localPath) {
        const base = basenameFromUrl(url);
        const filename = uniqueFilename(collectionDir, base);
        const filepath = path.join(collectionDir, filename);
        process.stdout.write(`  Downloading ${filename} ... `);
        try {
          await download(url, filepath);
          localPath = `images/${slug}/${filename}`;
          urlToLocal.set(url, localPath);
          console.log('ok');
        } catch (e) {
          console.log('FAIL:', e.message);
          continue;
        }
      }
      images.push({ src: localPath, alt: basenameFromUrl(url).replace(/\.(jpg|jpeg)$/i, '') });
    }

    gallery.collections.push({
      slug,
      title: slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      images,
    });
  }

  const contentDir = path.join(__dirname, '..', 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(contentDir, 'gallery.json'),
    JSON.stringify(gallery, null, 2),
    'utf8'
  );
  console.log('\nWrote content/gallery.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
