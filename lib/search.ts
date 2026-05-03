import { CHAIRS, Chair } from './chairs'
import { LOCAL_ARTICLES } from './local-articles'
import { LOCAL_BRANDS } from './local-brands'

export interface SearchResult {
  type: 'chair' | 'article' | 'brand' | 'collection'
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

// ── Best-for collection pages ──────────────────────────────────────────────────
// These are the /best/[slug] curated pick pages. They surface at the top of
// search results when the query matches a condition or category.

interface BestPage {
  slug: string
  title: string
  description: string
  keywords: string[]
}

const BEST_PAGES: BestPage[] = [
  {
    slug: 'sciatica',
    title: 'Best Massage Chairs for Sciatica',
    description: 'L-track and SL-track models that extend under the glutes and into the thighs — the anatomy sciatica requires.',
    keywords: ['sciatica', 'sciatic', 'sciatic nerve', 'hip pain', 'glute', 'piriformis', 'radiating leg pain'],
  },
  {
    slug: 'lower-back-pain',
    title: 'Best Massage Chairs for Lower Back Pain',
    description: 'SL-track chairs that reach the lumbar and hips — the right call for 80% of buyers.',
    keywords: ['lower back pain', 'lower back', 'lumbar', 'back pain', 'lumbar pain', 'sacrum'],
  },
  {
    slug: 'neck-shoulders',
    title: 'Best Massage Chairs for Neck and Shoulders',
    description: 'Chairs with serious upper-body airbag coverage and deep neck rollers.',
    keywords: ['neck', 'shoulder', 'neck pain', 'neck and shoulder', 'upper back', 'trapezius'],
  },
  {
    slug: 'small-spaces',
    title: 'Best Massage Chairs for Small Spaces',
    description: 'Space-saving models — some need as little as 2 inches from the wall.',
    keywords: ['small space', 'space saving', 'apartment', 'wall clearance', 'compact', 'wall hugger', 'tight space'],
  },
  {
    slug: 'under-2000',
    title: 'Best Massage Chairs Under $2,000',
    description: 'Entry-level chairs that still deliver meaningful relief.',
    keywords: ['under 2000', 'budget', 'affordable', 'cheap', 'entry level', '1000', '1500', '2000'],
  },
  {
    slug: 'under-3000',
    title: 'Best Massage Chairs Under $3,000',
    description: 'The sweet spot for most buyers — strong features without flagship pricing.',
    keywords: ['under 3000', '3000', '2500'],
  },
  {
    slug: 'under-5000',
    title: 'Best Massage Chairs Under $5,000',
    description: 'Where SL-track gains 4D rollers and body fit ranges widen.',
    keywords: ['under 5000', '5000', '4000'],
  },
  {
    slug: '3000-to-5000',
    title: 'Best Massage Chairs $3,000 to $5,000',
    description: 'Mid-range flagships with SL-track, 4D rollers, and serious build quality.',
    keywords: ['3000 to 5000', '3000 5000', 'mid range', '3500', '4000', '4500'],
  },
  {
    slug: 'tall-people',
    title: 'Best Massage Chairs for Tall People',
    description: 'Chairs with extended roller stroke and generous height accommodation.',
    keywords: ['tall', 'tall people', 'tall person', 'height', '6 foot', '6 feet', 'long torso'],
  },
  {
    slug: 'heavy-duty',
    title: 'Best Heavy-Duty Massage Chairs',
    description: 'High weight-capacity models with reinforced frames.',
    keywords: ['heavy duty', 'plus size', 'weight capacity', 'heavy', '300 lbs', 'large person', 'bariatric'],
  },
  {
    slug: 'premium',
    title: 'Best Premium Massage Chairs ($5,000+)',
    description: 'Top-of-market chairs for buyers who want the best and want it to last.',
    keywords: ['premium', 'luxury', 'high end', 'best chair', 'top of the line', '6000', '7000', '8000', '10000'],
  },
]

// ── Condition → chair spec mappings ────────────────────────────────────────────
// sparse: true  = rare feature (<40% of chairs) -> show condition-matched chairs
// sparse: false = common feature (>60% of chairs) -> show articles only, not chairs

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
    keywords: ['space saving', 'space-saving', 'small space', 'compact', 'apartment', 'wall hugger'],
    filter: c => c.spaceSaving === true,
    sparse: true,
  },
  {
    keywords: ['tall', 'tall person', 'tall people', 'height', '6 foot', '6 feet'],
    filter: c => (c.heightMaxIn ?? 0) >= 76,
    sparse: true,
  },
  {
    keywords: ['heavy', 'heavy duty', 'plus size', 'weight capacity', '300 lbs', 'large person'],
    filter: c => (c.weightCapacityLbs ?? 0) >= 280,
    sparse: true,
  },
  {
    keywords: ['zero gravity', 'zero-gravity', 'weightless', 'zero g'],
    filter: c => c.zeroGravity === true,
    sparse: false,
  },
  {
    keywords: ['heat', 'heated', 'heat therapy', 'warming', 'lumbar heat'],
    filter: c => c.heat === true,
    sparse: false,
  },
  {
    keywords: ['4d', '4d rollers', '4d massage'],
    filter: c => c.rollerDimension === '4D',
    sparse: true,
  },
  {
    keywords: ['sl track', 'sl-track', 'full body', 'full coverage'],
    filter: c => c.track === 'SL',
    sparse: true,
  },
  {
    keywords: ['l track', 'l-track'],
    filter: c => c.track === 'L',
    sparse: true,
  },
  {
    keywords: ['lower back', 'lower back pain', 'lumbar', 'back pain'],
    filter: c => c.track === 'SL' || c.track === 'L',
    sparse: true,
  },
]

const CONDITION_ARTICLE_MAP: Array<{ keywords: string[], slugs: string[] }> = [
  {
    keywords: ['sciatica', 'hip', 'glute', 'lower back', 'back pain', 'lumbar', 'sacrum', 'sl track', 'l track', 's track', 'track type'],
    slugs: ['track-types', 'sl-track'],
  },
  {
    keywords: ['zero gravity', 'zero-gravity', 'weightless'],
    slugs: ['zero-gravity'],
  },
  {
    keywords: ['heat', 'heated', 'heat therapy'],
    slugs: ['heat-therapy', 'zero-gravity'],
  },
  {
    keywords: ['4d', '4d rollers', 'roller', 'roller dimension', 'roller depth'],
    slugs: ['roller-dimensions', '4d-rollers'],
  },
  {
    keywords: ['body fit', 'body size', 'height', 'weight', 'tall', 'shoulder width'],
    slugs: ['body-fit'],
  },
  {
    keywords: ['room', 'space', 'size', 'dimensions', 'floor space', 'room size'],
    slugs: ['room-fit'],
  },
  {
    keywords: ['sl track', 'sl-track', 'full body'],
    slugs: ['sl-track', 'track-types'],
  },
  {
    keywords: ['lower back', 'lower back pain', 'lumbar', 'back pain'],
    slugs: ['track-types'],
  },
]

function tierScore(c: Chair): number {
  const p = c.priceRetail ?? 0
  if (p >= 5000) return 1
  if (p >= 3000) return 2
  if (p >= 2000) return 3
  return 4
}

function chairToResult(c: Chair): SearchResult {
  return {
    type: 'chair',
    title: c.name,
    subtitle: c.brand + ' · $' + (c.priceRetail?.toLocaleString() ?? 'N/A'),
    href: '/chairs/' + c.slug,
  }
}

// ── Main search function ────────────────────────────────────────────────────────

export function runSearch(rawQuery: string): {
  collections: SearchResult[]
  chairs: SearchResult[]
  articles: SearchResult[]
  brands: SearchResult[]
} {
  const q = normalize(rawQuery)
  if (!q) return { collections: [], chairs: [], articles: [], brands: [] }

  const seenChairIds = new Set<string>()
  const seenArticleSlugs = new Set<string>()

  // ── Step 0: Best-for collection pages (always shown first) ────────────────
  const collections: SearchResult[] = []
  for (const page of BEST_PAGES) {
    const matches = page.keywords.some(kw => fuzzyMatches(kw, q))
    if (matches) {
      collections.push({
        type: 'collection',
        title: page.title,
        subtitle: page.description,
        href: '/best/' + page.slug,
      })
    }
  }

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

  return { collections, chairs: allChairs, articles, brands }
}
