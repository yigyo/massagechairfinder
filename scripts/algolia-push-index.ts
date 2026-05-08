/**
 * ALGOLIA INDEX BUILDER
 * Pushes all MCF content (chairs, articles, brands, best pages, compare pages)
 * to the Algolia index and configures ranking.
 *
 * HOW TO RUN (from the massagechairfinder/ directory):
 *   npx tsx scripts/algolia-push-index.ts
 *
 * REQUIRED ENV VARS in .env.local:
 *   ALGOLIA_ADMIN_KEY=...          (from Algolia > Settings > API Keys > Admin)
 *   NEXT_PUBLIC_ALGOLIA_APP_ID=... (from Algolia > Settings > API Keys)
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) {
    console.warn('No .env.local found — relying on process.env')
    return
  }
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}
loadEnvLocal()

import { algoliasearch } from 'algoliasearch'
import { CHAIRS } from '../lib/chairs'
import { LOCAL_ARTICLES } from '../lib/local-articles'
import { LOCAL_BRANDS } from '../lib/local-brands'
import type { MCFHit, RecordType } from '../lib/algolia'

// ── Config ───────────────────────────────────────────────────────────────────
const APP_ID     = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const ADMIN_KEY  = process.env.ALGOLIA_ADMIN_KEY
const INDEX_NAME = 'massagechairfinder'

if (!APP_ID || !ADMIN_KEY) {
  console.error('')
  console.error('ERROR: Missing Algolia credentials in .env.local')
  console.error('  NEXT_PUBLIC_ALGOLIA_APP_ID  — required')
  console.error('  ALGOLIA_ADMIN_KEY           — required')
  console.error('')
  process.exit(1)
}

const client = algoliasearch(APP_ID, ADMIN_KEY)

// ── Helpers ──────────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function typeRank(type: RecordType): number {
  return { best: 1, chair: 2, article: 3, brand: 4, compare: 5 }[type]
}

// ── Build records ────────────────────────────────────────────────────────────
const records: MCFHit[] = []

// 1. Best-for pages (highest priority in results)
const BEST_PAGES = [
  { slug: 'sciatica',        title: 'Best Massage Chairs for Sciatica',             keywords: ['sciatica', 'sciatic nerve', 'hip pain', 'glute', 'piriformis', 'radiating leg pain'] },
  { slug: 'lower-back-pain', title: 'Best Massage Chairs for Lower Back Pain',      keywords: ['lower back pain', 'lower back', 'lumbar', 'back pain', 'lumbar pain', 'sacrum'] },
  { slug: 'neck-shoulders',  title: 'Best Massage Chairs for Neck and Shoulders',   keywords: ['neck', 'shoulder', 'neck pain', 'neck and shoulder', 'upper back', 'trapezius'] },
  { slug: 'small-spaces',    title: 'Best Massage Chairs for Small Spaces',         keywords: ['small space', 'space saving', 'apartment', 'wall clearance', 'compact', 'wall hugger'] },
  { slug: 'under-2000',      title: 'Best Massage Chairs Under $2,000',             keywords: ['under 2000', 'budget', 'affordable', 'entry level'] },
  { slug: 'under-3000',      title: 'Best Massage Chairs Under $3,000',             keywords: ['under 3000', 'mid range'] },
  { slug: 'under-5000',      title: 'Best Massage Chairs Under $5,000',             keywords: ['under 5000', '4000 5000'] },
  { slug: '3000-to-5000',    title: 'Best Massage Chairs $3,000 to $5,000',         keywords: ['3000 to 5000', 'mid range', '3500 to 5000'] },
  { slug: 'tall-people',     title: 'Best Massage Chairs for Tall People',          keywords: ['tall', 'tall people', 'tall person', 'height', '6 foot', 'long torso'] },
  { slug: 'heavy-duty',      title: 'Best Heavy-Duty Massage Chairs',               keywords: ['heavy duty', 'plus size', 'weight capacity', '300 lbs', 'large person'] },
  { slug: 'premium',         title: 'Best Premium Massage Chairs ($5,000+)',        keywords: ['premium', 'luxury', 'high end', 'best chair', 'top of the line'] },
  { slug: 'seniors',         title: 'Best Massage Chairs for Seniors',              keywords: ['seniors', 'elderly', 'older adults', 'retired', 'arthritis', 'senior'] },
  { slug: 'zero-gravity',    title: 'Best Zero Gravity Massage Chairs',             keywords: ['zero gravity', 'zero-gravity', 'weightless', 'recline'] },
  { slug: 'heat-therapy',    title: 'Best Massage Chairs with Heat Therapy',        keywords: ['heat', 'heated', 'heat therapy', 'warming', 'lumbar heat'] },
  { slug: 'full-body',       title: 'Best Full-Body Massage Chairs',                keywords: ['full body', 'sl track', 'complete coverage', 'neck to glutes'] },
]

for (const page of BEST_PAGES) {
  records.push({
    objectID:  'best-' + page.slug,
    type:      'best',
    title:     page.title,
    subtitle:  page.keywords.slice(0, 4).join(', '),
    href:      '/best/' + page.slug,
    typeRank:  typeRank('best'),
  })
}

// 2. Compare pages
const COMPARE_PAGES = [
  { slug: 'amamedics-hilux-4d-vs-titan-pro-vigor-4d',                   title: 'AmaMedics Hilux 4D vs Titan Pro-Vigor 4D' },
  { slug: 'bodyfriend-phantom-ii-vs-bodyfriend-falcon-xd',              title: 'Bodyfriend Phantom II vs Bodyfriend Falcon XD' },
  { slug: 'daiwa-relax-2-zero-3d-vs-synca-jp3000',                      title: 'Daiwa Relax 2 Zero 3D vs Synca JP-3000' },
  { slug: 'infinity-dynasty-4d-vs-infinity-genesis-max-4d',            title: 'Infinity Dynasty 4D vs Infinity Genesis Max 4D' },
  { slug: 'infinity-evo-max-vs-jpmedics-kumo-4d',                       title: 'Infinity Evo Max 4D vs JPMedics Kumo 4D' },
  { slug: 'kahuna-sm-7300s-vs-relaxonchair-yukon-4d',                   title: 'Kahuna SM-7300S vs Relax On Chair YUKON-4D' },
  { slug: 'kyota-yugana-m780-vs-osaki-os-pro-maestro-le',              title: 'Kyota Yugana M780 vs Osaki OS-Pro Maestro LE 2.0' },
  { slug: 'luraco-i9-max-plus-vs-panasonic-mak1',                       title: 'Luraco i9 Max Plus vs Panasonic MAK1' },
  { slug: 'medical-breakthrough-6-vs-kahuna-hm-078',                    title: 'Medical Breakthrough 6 vs Kahuna HM-078' },
  { slug: 'ogawa-og6400-vs-titan-pro-vigor-4d',                         title: 'Ogawa Active XL Duo vs Titan Pro-Vigor 4D' },
  { slug: 'osaki-os-pro-admiral-ii-vs-kahuna-lm-6800s',                title: 'Osaki OS-Pro Admiral II vs Kahuna LM-6800S' },
  { slug: 'relaxonchair-yukon-4d-vs-rockertech-sensation-4d',          title: 'Relax On Chair YUKON-4D vs RockerTech Sensation 4D' },
  { slug: 'rockertech-bliss-vs-medical-breakthrough-6-plus',           title: 'RockerTech Bliss vs Medical Breakthrough 6 Plus' },
  { slug: 'synca-jp970-vs-kahuna-lm-6800',                              title: 'Synca JP970 vs Kahuna LM-6800' },
]

for (const page of COMPARE_PAGES) {
  const [a, b] = page.title.split(' vs ')
  records.push({
    objectID:  'compare-' + page.slug,
    type:      'compare',
    title:     page.title,
    subtitle:  'Side-by-side comparison',
    href:      '/compare/' + page.slug,
    typeRank:  typeRank('compare'),
  })
}

// 3. Chairs
for (const chair of CHAIRS) {
  if (!chair.active || !chair.mcfActive) continue
  records.push({
    objectID:  'chair-' + chair.id,
    type:      'chair',
    title:     chair.name,
    subtitle:  chair.brand + (chair.priceMin ? ' · $' + chair.priceMin.toLocaleString() : ''),
    href:      '/chairs/' + chair.id,
    typeRank:  typeRank('chair'),
    brand:     chair.brand,
    price:     chair.priceMin,
    track:     chair.track ?? undefined,
    excerpt:   [
      chair.track ? chair.track + '-track' : null,
      chair.roller ? chair.roller + ' rollers' : null,
      chair.zeroGravity ? 'zero gravity' : null,
      chair.heat ? 'heat therapy' : null,
      chair.spaceSaving ? 'space-saving' : null,
      chair.petiteConfirmed ? 'petite-friendly' : null,
      chair.tallConfirmed ? 'tall-friendly' : null,
      chair.plusSizeConfirmed ? 'plus-size-friendly' : null,
    ].filter(Boolean).join(', ') || undefined,
  })
}

// 4. Articles
for (const article of LOCAL_ARTICLES) {
  records.push({
    objectID:  'article-' + article.slug,
    type:      'article',
    title:     article.title,
    subtitle:  article.excerpt,
    href:      '/learn/' + article.slug,
    typeRank:  typeRank('article'),
    excerpt:   article.excerpt,
    // Index first 3000 chars of body text for full-text search
    ...(article.body ? { body: stripHtml(article.body).slice(0, 3000) } as any : {}),
  })
}

// 5. Brands
for (const brand of LOCAL_BRANDS) {
  records.push({
    objectID:  'brand-' + brand.slug,
    type:      'brand',
    title:     brand.name,
    subtitle:  brand.tagline,
    href:      '/brands/' + brand.slug,
    typeRank:  typeRank('brand'),
    excerpt:   brand.priceRange + ' · ' + brand.bestFor,
  })
}

// ── Configure index settings ─────────────────────────────────────────────────
async function configureIndex() {
  console.log('Configuring index settings...')
  await client.setSettings({
    indexName: INDEX_NAME,
    indexSettings: {
      searchableAttributes: [
        'title',
        'brand',
        'unordered(subtitle)',
        'unordered(excerpt)',
        'unordered(body)',
      ],
      attributesForFaceting: ['type'],
      customRanking: ['asc(typeRank)', 'desc(price)'],
      attributesToHighlight: ['title', 'subtitle', 'brand'],
      attributesToSnippet: ['subtitle:20', 'excerpt:25'],
      highlightPreTag: '<em>',
      highlightPostTag: '</em>',
      typoTolerance: 'min',
      minWordSizefor1Typo: 4,
      minWordSizefor2Typos: 8,
      ignorePlurals: ['en'],
      queryLanguages: ['en'],
      distinct: false,
      hitsPerPage: 20,
    },
  })
  console.log('Index settings configured.')
}

// ── Push records ─────────────────────────────────────────────────────────────
async function pushRecords() {
  const BATCH = 500
  let pushed = 0
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH)
    await client.saveObjects({ indexName: INDEX_NAME, objects: batch as any })
    pushed += batch.length
    console.log('  Pushed ' + pushed + '/' + records.length + ' records...')
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('')
  console.log('MCF Algolia Index Builder')
  console.log('Index: ' + INDEX_NAME)
  console.log('App:   ' + APP_ID)
  console.log('Records to push:')
  const counts = records.reduce((acc, r) => { acc[r.type] = (acc[r.type] || 0) + 1; return acc }, {} as Record<string, number>)
  for (const [type, count] of Object.entries(counts)) {
    console.log('  ' + type + ': ' + count)
  }
  console.log('  TOTAL: ' + records.length)
  console.log('')

  try {
    await configureIndex()
    await pushRecords()
    console.log('')
    console.log('Done. All ' + records.length + ' records are live in Algolia.')
    console.log('Open your Algolia dashboard to verify: https://dashboard.algolia.com')
    console.log('')
  } catch (err: any) {
    console.error('')
    console.error('Push failed:', err?.message || err)
    process.exit(1)
  }
}

main()
