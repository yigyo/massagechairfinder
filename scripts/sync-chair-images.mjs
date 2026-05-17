#!/usr/bin/env node
/**
 * sync-chair-images.mjs
 *
 * One-time data migration (idempotent): download every chair imageUrl referenced
 * in lib/chairs.ts to public/images/chairs/[slug].[ext], then rewrite chairs.ts
 * so each imageUrl points to the local /images/chairs/... path.
 *
 * After this runs, massagechairfinder.com hosts all chair images directly.
 * GMC's quiz JS references them at https://massagechairfinder.com/images/chairs/...
 *
 * Run from this repo's root:
 *   node scripts/sync-chair-images.mjs
 *
 * Re-runs are safe: existing files are skipped, only-new entries get pulled.
 * If a download fails, the chair's imageUrl stays as the original remote URL.
 */
import fs from 'node:fs/promises';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CHAIRS_FILE = path.join(REPO_ROOT, 'lib', 'chairs.ts');
const IMG_DIR = path.join(REPO_ROOT, 'public', 'images', 'chairs');
mkdirSync(IMG_DIR, { recursive: true });

function slugify(name) {
  let s = name.toLowerCase();
  s = s.replace(/\s*massage\s*chair\s*/g, ' ');
  s = s.replace(/[^a-z0-9]+/g, '-');
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return s;
}

function extForUrl(url, fallback = '.jpg') {
  const u = new URL(url);
  const lower = u.pathname.toLowerCase();
  if (lower.endsWith('.webp')) return '.webp';
  if (lower.endsWith('.png')) return '.png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return '.jpg';
  return fallback;
}

async function downloadOnce(url, dest, timeoutMs = 20000) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (mcf-chair-image-sync)' },
      signal: ac.signal,
      redirect: 'follow',
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const buf = Buffer.from(await resp.arrayBuffer());
    if (buf.length < 1000) throw new Error(`small (${buf.length} bytes)`);
    await fs.writeFile(dest, buf);
    return buf.length;
  } finally {
    clearTimeout(timer);
  }
}

async function downloadWithRetry(url, dest, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await downloadOnce(url, dest);
    } catch (e) {
      lastErr = e;
      if (i < attempts) await new Promise(r => setTimeout(r, 1500 * i));
    }
  }
  throw lastErr;
}

// Parse chair blocks. Each chair is the object literal pattern { name: '...', ..., imageUrl: '...' }
// Capture the FULL chair block including outer { and }, plus its name and imageUrl, so we can
// rewrite the imageUrl in-place at the end.
function parseChairs(src) {
  const chairs = [];
  const namePattern = /\{[^{}]*?name:\s*['"]([^'"]+)['"]([\s\S]*?)\}/g;
  let m;
  while ((m = namePattern.exec(src)) !== null) {
    const fullBlock = m[0];
    const name = m[1];
    const body = m[2];
    const imgMatch = body.match(/imageUrl:\s*['"]([^'"]+)['"]/);
    if (!imgMatch) continue;
    chairs.push({
      name,
      currentImageUrl: imgMatch[1],
      blockStart: m.index,
      blockEnd: m.index + fullBlock.length,
    });
  }
  return chairs;
}

async function main() {
  console.log(`Reading ${CHAIRS_FILE}...`);
  let src = await fs.readFile(CHAIRS_FILE, 'utf8');
  const chairs = parseChairs(src);
  console.log(`Found ${chairs.length} chairs with an imageUrl.`);

  const ok = [];
  const failed = [];
  const skipped = [];

  for (let i = 0; i < chairs.length; i++) {
    const c = chairs[i];
    const slug = slugify(c.name);
    let ext;
    try { ext = extForUrl(c.currentImageUrl); }
    catch { ext = '.jpg'; }
    const filename = `${slug}${ext}`;
    const dest = path.join(IMG_DIR, filename);
    const relPath = `/images/chairs/${filename}`;

    // Skip if already downloaded and the chairs.ts already points at local path
    const alreadyLocal = c.currentImageUrl.startsWith('/images/chairs/');
    if (alreadyLocal && existsSync(dest) && statSync(dest).size > 1000) {
      skipped.push({ name: c.name, reason: 'already local' });
      continue;
    }

    // Download if not already on disk
    if (!existsSync(dest) || statSync(dest).size < 1000) {
      process.stdout.write(`  [${i + 1}/${chairs.length}] ${c.name.padEnd(48).slice(0, 48)} ... `);
      try {
        const size = await downloadWithRetry(c.currentImageUrl, dest);
        console.log(`OK (${(size / 1024).toFixed(0)} KB)`);
      } catch (e) {
        console.log(`FAIL: ${String(e.message || e).slice(0, 60)}`);
        failed.push({ name: c.name, url: c.currentImageUrl, error: String(e.message || e) });
        continue;
      }
    }

    ok.push({ name: c.name, slug, relPath, blockStart: c.blockStart, blockEnd: c.blockEnd });
  }

  // Rewrite chairs.ts: replace each successful chair's imageUrl with the local path.
  // We do this by walking chair blocks in REVERSE order so byte indices stay valid.
  const replacements = ok.slice().sort((a, b) => b.blockStart - a.blockStart);
  for (const r of replacements) {
    const block = src.slice(r.blockStart, r.blockEnd);
    const updated = block.replace(
      /imageUrl:\s*['"][^'"]+['"]/,
      `imageUrl: '${r.relPath}'`,
    );
    if (updated !== block) {
      src = src.slice(0, r.blockStart) + updated + src.slice(r.blockEnd);
    }
  }

  // Write chairs.ts only if changed
  const orig = await fs.readFile(CHAIRS_FILE, 'utf8');
  if (orig !== src) {
    await fs.writeFile(CHAIRS_FILE, src, 'utf8');
    console.log(`\nUpdated ${CHAIRS_FILE}: ${ok.length} imageUrl entries rewritten to local paths.`);
  } else {
    console.log(`\n${CHAIRS_FILE}: no changes (all already local).`);
  }

  // Summary
  console.log(`\nSummary:`);
  console.log(`  Downloaded:    ${ok.filter(o => !skipped.find(s => s.name === o.name)).length}`);
  console.log(`  Already local: ${skipped.length}`);
  console.log(`  Failed:        ${failed.length}`);
  if (failed.length) {
    console.log(`\nFailed downloads (original remote URLs left in place):`);
    failed.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
    console.log(`\nThese chairs still point at their original imageUrl. Re-run the script to retry.`);
  }
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
