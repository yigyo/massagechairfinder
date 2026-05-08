/**
 * ALGOLIA PUSH (fetch-based — no npm deps required)
 * Uses Node built-in fetch to call Algolia REST API directly.
 * Run: npx tsx scripts/algolia-push-fetch.ts
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}
loadEnvLocal()

import { CHAIRS } from '../lib/chairs'
import { LOCAL_ARTICLES } from '../lib/local-articles'
import { LOCAL_BRANDS } from '../lib/local-brands'

const APP_ID    = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY!
const INDEX     = 'massagechairfinder'

if (!APP_ID || !ADMIN_KEY) {
  console.error('Missing NEXT_PUBLIC_ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY in .env.local')
  process.exit(1)
}

const BASE = `https://${APP_ID}.algolia.net/1/indexes/${INDEX}`
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Algolia-Application-Id': APP_ID,
  'X-Algolia-API-Key': ADMIN_KEY,
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

async function algolia(method: string, path: string, body?: object) {
  const res = await fetch(BASE + path, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Algolia ${method} ${path} -> ${res.status}: ${text}`)
  }
  return res.json()
}

// ── Build records ────────────────────────────────────────────────────────────
type R = {
  objectID: string; type: string; title: string
  subtitle?: string; href: string; typeRank: number
  brand?: string; price?: number; track?: string; excerpt?: string; body?: string
}

const records: R[] = []

// 1. Best-for pages
const BEST_PAGES = [
  { slug: 'sciatica',        title: 'Best Massage Chairs for Sciatica' },
  { slug: 'lower-back-pain', title: 'Best Massage Chairs for Lower Back Pain' },
  { slug: 'neck-shoulders',  title: 'Best Massage Chairs for Neck and Shoulders' },
  { slug: 'small-spaces',    title: 'Best Massage Chairs for Small Spaces' },
  { slug: 'under-2000',      title: 'Best Massage Chairs Under $2,000' },
  { slug: 'under-3000',      title: 'Best Massage Chairs Under $3,000' },
  { slug: 'under-5000',      title: 'Best Massage Chairs Under $5,000' },
  { slug: '3000-to-5000',    title: 'Best Massage Chairs $3,000 to $5,000' },
  { slug: 'tall-people',     title: 'Best Massage Chairs for Tall People' },
  { slug: 'heavy-duty',      title: 'Best Heavy-Duty Massage Chairs' },
  { slug: 'premium',         title: 'Best Premium Massage Chairs ($5,000+)' },
  { slug: 'seniors',         title: 'Best Massage Chairs for Seniors' },
  { slug: 'zero-gravity',    title: 'Best Zero Gravity Massage Chairs' },
  { slug: 'heat-therapy',    title: 'Best Massage Chairs with Heat Therapy' },
  { slug: 'full-body',       title: 'Best Full-Body Massage Chairs' },
]
for (const p of BEST_PAGES) {
  records.push({ objectID: 'best-' + p.slug, type: 'best', title: p.title,
    href: '/best/' + p.slug, typeRank: 1 })
}

// 2. Compare pages
const COMPARE_PAGES = [
  { slug: 'amamedics-hilux-4d-vs-titan-pro-vigor-4d',             title: 'AmaMedics Hilux 4D vs Titan Pro-Vigor 4D' },
  { slug: 'bodyfriend-phantom-ii-vs-bodyfriend-falcon-xd',        title: 'Bodyfriend Phantom II vs Bodyfriend Falcon XD' },
  { slug: 'daiwa-relax-2-zero-3d-vs-synca-jp3000',                title: 'Daiwa Relax 2 Zero 3D vs Synca JP-3000' },
  { slug: 'infinity-dynasty-4d-vs-infinity-genesis-max-4d',      title: 'Infinity Dynasty 4D vs Infinity Genesis Max 4D' },
  { slug: 'infinity-evo-max-vs-jpmedics-kumo-4d',                 title: 'Infinity Evo Max 4D vs JPMedics Kumo 4D' },
  { slug: 'kahuna-sm-7300s-vs-relaxonchair-yukon-4d',             title: 'Kahuna SM-7300S vs Relax On Chair YUKON-4D' },
  { slug: 'kyota-yugana-m780-vs-osaki-os-pro-maestro-le',        title: 'Kyota Yugana M780 vs Osaki OS-Pro Maestro LE 2.0' },
  { slug: 'luraco-i9-max-plus-vs-panasonic-mak1',                 title: 'Luraco i9 Max Plus vs Panasonic MAK1' },
  { slug: 'medical-breakthrough-6-vs-kahuna-hm-078',              title: 'Medical Breakthrough 6 vs Kahuna HM-078' },
  { slug: 'ogawa-og6400-vs-titan-pro-vigor-4d',                   title: 'Ogawa Active XL Duo vs Titan Pro-Vigor 4D' },
  { slug: 'osaki-os-pro-admiral-ii-vs-kahuna-lm-6800s',          title: 'Osaki OS-Pro Admiral II vs Kahuna LM-6800S' },
  { slug: 'relaxonchair-yukon-4d-vs-rockertech-sensation-4d',    title: 'Relax On Chair YUKON-4D vs RockerTech Sensation 4D' },
  { slug: 'rockertech-bliss-vs-medical-breakthrough-6-plus',     title: 'RockerTech Bliss vs Medical Breakthrough 6 Plus' },
  { slug: 'synca-jp970-vs-kahuna-lm-6800',                        title: 'Synca JP970 vs Kahuna LM-6800' },
]
for (const p of COMPARE_PAGES) {
  records.push({ objectID: 'compare-' + p.slug, type: 'compare', title: p.title,
    subtitle: 'Side-by-side comparison', href: '/compare/' + p.slug, typeRank: 5 })
}

// 3. Chairs
for (const c of CHAIRS) {
  if (!c.active || !c.mcfActive) continue
  const tags = [
    c.track ? c.track + '-track' : null,
    c.roller ? c.roller + ' rollers' : null,
    c.zeroGravity ? 'zero gravity' : null,
    c.heat ? 'heat therapy' : null,
    c.spaceSaving ? 'space-saving' : null,
    c.petiteConfirmed ? 'petite-friendly' : null,
    c.tallConfirmed ? 'tall-friendly' : null,
    c.plusSizeConfirmed ? 'plus-size-friendly' : null,
  ].filter(Boolean).join(', ')
  records.push({
    objectID: 'chair-' + c.id, type: 'chair', title: c.name,
    subtitle: c.brand + (c.priceMin ? ' · $' + c.priceMin.toLocaleString() : ''),
    href: '/chairs/' + c.id, typeRank: 2,
    brand: c.brand, price: c.priceMin ?? undefined,
    track: c.track ?? undefined,
    excerpt: tags || undefined,
  })
}

// 4. Articles
for (const a of LOCAL_ARTICLES) {
  records.push({
    objectID: 'article-' + a.slug, type: 'article', title: a.title,
    subtitle: a.excerpt, href: '/learn/' + a.slug, typeRank: 3,
    excerpt: a.excerpt,
    body: a.body ? stripHtml(a.body).slice(0, 3000) : undefined,
  })
}

// 5. Brands
for (const b of LOCAL_BRANDS) {
  records.push({
    objectID: 'brand-' + b.slug, type: 'brand', title: b.name,
    subtitle: b.tagline, href: '/brands/' + b.slug, typeRank: 4,
    excerpt: b.priceRange + ' · ' + b.bestFor,
  })
}

// ── Push in batches ──────────────────────────────────────────────────────────
async function pushBatch(batch: R[]) {
  const requests = batch.map(r => ({ action: 'updateObject', body: r }))
  return algolia('POST', '/batch', { requests })
}

// ── Configure index settings ─────────────────────────────────────────────────
async function configureIndex() {
  return algolia('PUT', '/settings', {
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
    attributesToSnippet: ['subtitle:20'],
    highlightPreTag: '<em>',
    highlightPostTag: '</em>',
    typoTolerance: 'min',
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    ignorePlurals: ['en'],
    queryLanguages: ['en'],
    hitsPerPage: 20,
  })
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const counts: Record<string, number> = {}
  for (const r of records) counts[r.type] = (counts[r.type] || 0) + 1

  console.log('')
  console.log('MCF Algolia Push (fetch-based)')
  console.log('App:   ' + APP_ID)
  console.log('Index: ' + INDEX)
  console.log('Records:')
  for (const [t, n] of Object.entries(counts)) console.log('  ' + t + ': ' + n)
  console.log('  TOTAL: ' + records.length)
  console.log('')

  console.log('Configuring index settings...')
  await configureIndex()
  console.log('Settings applied.')

  const SIZE = 500
  let pushed = 0
  for (let i = 0; i < records.length; i += SIZE) {
    await pushBatch(records.slice(i, i + SIZE))
    pushed += Math.min(SIZE, records.length - i)
    console.log('Pushed ' + pushed + '/' + records.length)
  }

  console.log('')
  console.log('Done! All ' + records.length + ' records are live.')
  console.log('Dashboard: https://dashboard.algolia.com')
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1) })
