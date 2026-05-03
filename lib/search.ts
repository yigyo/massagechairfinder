import { CHAIRS, Chair } from './chairs'
import { LOCAL_ARTICLES } from './local-articles'
import { LOCAL_BRANDS } from './local-brands'

export interface SearchResult {
  type: 'chair' | 'article' | 'brand'
  title: string
  subtitle?: string
  href: string
}

// ── Text utilities ──────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function toWords(s: string): string[] {
  return normalize(s).split(' ').filter(w => w.length > 0)
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const row = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = row[j]
      row[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, row[j], row[j - 1])
      prev = tmp
    }
  }
  return row[n]
}

function wordInHaystack(qw: string, haystack: string): boolean {
  const norm = normalize(haystack)
  if (norm.includes(qw)) return true
  if (qw.length > 4) {
    for (const hw of toWords(haystack)) {
      if (Math.abs(hw.length - qw.length) <= 2 && levenshtein(qw, hw) <= 1) return true
    }
  }
  return false
}

function fuzzyMatches(haystack: string, query: string): boolean {
  const qWords = toWords(query)
  if (qWords.length === 0) return false
  return qWords.every(qw => wordInHaystack(qw, haystack))
}

// ── Article scoring ─────────────────────────────────────────────────────────────
// Score reflects how directly the article matches the query.
// Only articles scoring >= MIN_TEXT_SCORE appear via text search.
// Condition-expanded articles bypass this threshold.

const MIN_TEXT_SCORE = 3

function scoreArticle(title: string, excerpt: string, body: string, q: string): number {
  const titleNorm = normalize(title)
  const qNorm = normalize(q)
  if (titleNorm.includes(qNorm)) return 20          // exact phrase in title
  if (fuzzyMatches(title, q)) return 10             // all query words in title
  if (toWords(q).some(qw => wordInHaystack(qw, title))) return 5  // partial title match
  if (fuzzyMatches(excerpt, q)) return 3            // excerpt match
  if (fuzzyMatches(stripHtml(body), q)) return 1   // body-only (below threshold)
  return 0
}

// ── Condition → chair spec mappings ────────────────────────────────────────────
// sparse: true  = rare feature (<40% of chairs) → show condition-matched chairs
// sparse: false = common feature (>60% of chairs) → show articles only, not chairs

const CONDITION_CHAIR_FILTERS: Array<{
  keywords: string[]
  filter: (c: Chair) => boolean
  sparse: boolean
}> = [
  {
    keywords: ['sciatica', 'hip', 'glute', 'sacrum', 'hip pain', 'buttock', 'piriformis'],
    filter: c => c.track === 'L' || c.track === 'SL',
    sparse: true,
  },
  {
    keywords: ['neck', 'shoulder', 'upper back', 'cervical', 'trapezius', 'traps', 'thoracic'],
    filter: c => c.track === 'S' || c.track === 'SL',
    sparse: true,
  },
  {
    keywords: ['lower back', 'lumbar', 'back pain', 'lower back pain', 'lumbago'],
    filter: c => c.track === 'SL' || c.track === 'L' || c.track === 'S',
    sparse: true,
  },
  {
    keywords: ['zero gravity', 'zero-gravity', 'weightless', 'anti gravity', 'anti-gravity'],
    filter: c => c.zeroGravity === true,
    sparse: false,  // most chairs have zero gravity
  },
  {
    keywords: ['space saving', 'small space', 'wall hugger', 'tight space', 'small room', 'apartment'],
    filter: c => c.spaceSaving === true,
    sparse: true,
  },
  {
    keywords: ['heat', 'heated', 'heat therapy', 'warming', 'warmth'],
    filter: c => c.heat === true,
    sparse: false,  // most chairs have heat
  },
  {
    keywords: ['tall', 'tall person', 'tall people', '6 foot', '6 feet', 'big and tall'],
    filter: c => (c.heightMaxIn ?? 0) >= 76,
    sparse: true,
  },
]

// Condition → article slugs (always surfaced, bypass text score threshold)
const CONDITION_ARTICLE_MAP: Array<{ keywords: string[], slugs: string[] }> = [
  {
    keywords: ['sciatica', 'hip', 'glute', 'lower back', 'back pain', 'lumbar', 'sacrum', 'sl track', 'l track', 's track', 'track type'],
    slugs: ['track-types', 'sl-track'],
  },
  {
    keywords: ['zero gravity', 'weightless', 'recline', 'anti gravity', 'zero-gravity'],
    slugs: ['zero-gravity'],
  },
  {
    keywords: ['heat', 'heated', 'warmth', 'heat therapy'],
    slugs: ['heat-therapy'],
  },
  {
    keywords: ['height', 'weight', 'body', 'tall', 'shoulder width', 'petite', 'large frame'],
    slugs: ['body-fit'],
  },
  {
    keywords: ['room', 'space', 'dimensions', 'wall clearance', 'apartment', 'small space'],
    slugs: ['room-fit'],
  },
  {
    keywords: ['roller', '4d', '3d', '2d', '5d', 'intensity', 'pressure', 'deep tissue'],
    slugs: ['roller-dimensions', '4d-rollers'],
  },
  {
    keywords: ['brand', 'manufacturer', 'maker'],
    slugs: ['brands-overview'],
  },
  {
    keywords: ['buy', 'buying', 'how to choose', 'decision', 'tips', 'guide'],
    slugs: ['how-to-buy'],
  },
]

// ── Chair result helper ─────────────────────────────────────────────────────────

function chairToResult(chair: Chair): SearchResult {
  const priceLabel = chair.priceMin
    ? '$' + chair.priceMin.toLocaleString() + (chair.priceMax ? ' to $' + chair.priceMax.toLocaleString() : '')
    : ''
  return {
    type: 'chair',
    title: chair.name,
    subtitle: [chair.brand, priceLabel].filter(Boolean).join(' · '),
    href: '/chairs/' + chair.id,
  }
}

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2 }
function tierScore(c: Chair): number {
  return c.affiliateTier ? (TIER_ORDER[c.affiliateTier] ?? 3) : 4
}

// ── Main search function ────────────────────────────────────────────────────────

export function runSearch(query: string): {
  chairs: SearchResult[]
  articles: SearchResult[]
  brands: SearchResult[]
} {
  const q = query.trim()
  if (!q || q.length < 2) return { chairs: [], articles: [], brands: [] }

  const seenChairIds = new Set<string>()
  const seenArticleSlugs = new Set<string>()

  // ── Step 1: Chairs — direct name/brand text match ─────────────────────────
  const nameMatchChairs: SearchResult[] = []
  for (const chair of CHAIRS) {
    if (!chair.active || !chair.mcfActive) continue
    if (fuzzyMatches(chair.name + ' ' + chair.brand, q)) {
      seenChairIds.add(chair.id)
      nameMatchChairs.push(chairToResult(chair))
    }
  }

  // ── Step 2: Chairs — condition keyword expansion (sparse conditions only) ──
  const conditionChairs: SearchResult[] = []
  for (const { keywords, filter, sparse } of CONDITION_CHAIR_FILTERS) {
    if (!sparse) continue  // skip common features like heat/zero gravity
    if (!keywords.some(kw => fuzzyMatches(kw, q))) continue
    const pool = CHAIRS
      .filter(c => c.active && c.mcfActive && !seenChairIds.has(c.id) && filter(c))
      .sort((a, b) => tierScore(a) - tierScore(b))
      .slice(0, 6)
    for (const chair of pool) {
      seenChairIds.add(chair.id)
      conditionChairs.push(chairToResult(chair))
    }
    break
  }

  // ── Step 3: Articles — score-ranked text match ────────────────────────────
  const scoredArticles: Array<{ slug: string; result: SearchResult; score: number }> = []
  for (const article of LOCAL_ARTICLES) {
    const score = scoreArticle(article.title, article.excerpt, article.body, q)
    if (score >= MIN_TEXT_SCORE) {
      seenArticleSlugs.add(article.slug)
      scoredArticles.push({
        slug: article.slug,
        score,
        result: {
          type: 'article',
          title: article.title,
          subtitle: article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? '...' : ''),
          href: '/learn/' + article.slug,
        },
      })
    }
  }
  scoredArticles.sort((a, b) => b.score - a.score)
  const articles: SearchResult[] = scoredArticles.map(s => s.result)

  // ── Step 4: Articles — condition keyword expansion (fills gaps) ───────────
  for (const { keywords, slugs } of CONDITION_ARTICLE_MAP) {
    if (!keywords.some(kw => fuzzyMatches(kw, q))) continue
    for (const slug of slugs) {
      if (seenArticleSlugs.has(slug)) continue
      const article = LOCAL_ARTICLES.find(a => a.slug === slug)
      if (article) {
        seenArticleSlugs.add(slug)
        articles.push({
          type: 'article',
          title: article.title,
          subtitle: article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? '...' : ''),
          href: '/learn/' + article.slug,
        })
      }
    }
  }

  // ── Step 5: Brands — name match only (not tagline/description) ────────────
  const brands: SearchResult[] = []
  for (const brand of LOCAL_BRANDS) {
    const brandName = normalize(brand.name)
    const brandSlug = normalize(brand.slug.replace(/-/g, ' '))
    if (fuzzyMatches(brandName, q) || fuzzyMatches(brandSlug, q)) {
      brands.push({ type: 'brand', title: brand.name, subtitle: brand.priceRange, href: '/brands/' + brand.slug })
    }
  }

  const allChairs = [...nameMatchChairs, ...conditionChairs.slice(0, Math.max(0, 12 - nameMatchChairs.length))]

  return { chairs: allChairs, articles, brands }
}
