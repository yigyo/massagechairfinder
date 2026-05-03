import { CHAIRS, Chair } from './chairs'
import { LOCAL_ARTICLES } from './local-articles'
import { LOCAL_BRANDS } from './local-brands'

export interface SearchResult {
  type: 'chair' | 'article' | 'brand'
  title: string
  subtitle?: string
  href: string
  matchReason?: 'name' | 'condition' | 'text'
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

// Does a single query word match anywhere in the haystack string?
function wordInHaystack(qw: string, haystack: string): boolean {
  const norm = normalize(haystack)
  if (norm.includes(qw)) return true
  // Fuzzy: allow 1 edit for words longer than 4 chars
  if (qw.length > 4) {
    for (const hw of toWords(haystack)) {
      if (Math.abs(hw.length - qw.length) <= 2 && levenshtein(qw, hw) <= 1) return true
    }
  }
  return false
}

// All query words must match somewhere in the haystack
function fuzzyMatches(haystack: string, query: string): boolean {
  const qWords = toWords(query)
  if (qWords.length === 0) return false
  return qWords.every(qw => wordInHaystack(qw, haystack))
}

// ── Condition → chair spec mappings ────────────────────────────────────────────

const CONDITION_CHAIR_FILTERS: Array<{
  keywords: string[]
  filter: (c: Chair) => boolean
}> = [
  {
    keywords: ['sciatica', 'hip', 'glute', 'sacrum', 'hip pain', 'buttock', 'piriformis'],
    filter: c => c.track === 'L' || c.track === 'SL',
  },
  {
    keywords: ['neck', 'shoulder', 'upper back', 'cervical', 'trapezius', 'traps', 'thoracic'],
    filter: c => c.track === 'S' || c.track === 'SL',
  },
  {
    keywords: ['lower back', 'lumbar', 'back pain', 'lower back pain', 'lumbago'],
    filter: c => c.track === 'SL' || c.track === 'L' || c.track === 'S',
  },
  {
    keywords: ['zero gravity', 'zero-gravity', 'weightless', 'anti gravity', 'anti-gravity'],
    filter: c => c.zeroGravity === true,
  },
  {
    keywords: ['space saving', 'small space', 'wall hugger', 'tight space', 'small room', 'apartment'],
    filter: c => c.spaceSaving === true,
  },
  {
    keywords: ['heat', 'heated', 'heat therapy', 'warming', 'warmth'],
    filter: c => c.heat === true,
  },
  {
    keywords: ['tall', 'tall person', 'tall people', '6 foot', '6 feet', 'big and tall'],
    filter: c => (c.heightMaxIn ?? 0) >= 76,
  },
]

// Condition → article slugs to surface
const CONDITION_ARTICLE_MAP: Array<{ keywords: string[], slugs: string[] }> = [
  {
    keywords: ['sciatica', 'hip', 'glute', 'lower back', 'back pain', 'lumbar', 'sacrum', 'sl track', 'l track', 's track', 'track type'],
    slugs: ['track-types', 'sl-track'],
  },
  {
    keywords: ['zero gravity', 'weightless', 'recline', 'anti gravity'],
    slugs: ['zero-gravity'],
  },
  {
    keywords: ['height', 'weight', 'body', 'tall', 'shoulder', 'size', 'fit', 'large', 'petite'],
    slugs: ['body-fit'],
  },
  {
    keywords: ['room', 'space', 'dimensions', 'wall', 'apartment', 'clearance', 'small room'],
    slugs: ['room-fit'],
  },
  {
    keywords: ['roller', '4d', '3d', '2d', '5d', 'intensity', 'pressure', 'deep tissue'],
    slugs: ['roller-dimensions', '4d-rollers'],
  },
  {
    keywords: ['heat', 'heated', 'warmth', 'heat therapy'],
    slugs: ['heat-therapy'],
  },
  {
    keywords: ['brand', 'osaki', 'infinity', 'kahuna', 'inada', 'panasonic', 'synca', 'ogawa', 'luraco'],
    slugs: ['brands-overview'],
  },
  {
    keywords: ['buy', 'buying', 'how to choose', 'guide', 'decision', 'research', 'tips'],
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

// Sort chairs by affiliate tier (A > B > C > null)
const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2 }
function chairTierScore(c: Chair): number {
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
  const chairs: SearchResult[] = []
  const conditionChairs: SearchResult[] = []
  const articles: SearchResult[] = []
  const brands: SearchResult[] = []

  // ── Chairs: exact name / brand text match ─────────────────────────────────
  for (const chair of CHAIRS) {
    if (!chair.active || !chair.mcfActive) continue
    if (fuzzyMatches(chair.name + ' ' + chair.brand, q)) {
      seenChairIds.add(chair.id)
      chairs.push(chairToResult(chair))
    }
  }

  // ── Chairs: condition keyword expansion (capped at 8, best tier first) ────
  for (const { keywords, filter } of CONDITION_CHAIR_FILTERS) {
    const matched = keywords.some(kw => fuzzyMatches(kw, q))
    if (!matched) continue
    const pool = CHAIRS
      .filter(c => c.active && c.mcfActive && !seenChairIds.has(c.id) && filter(c))
      .sort((a, b) => chairTierScore(a) - chairTierScore(b))
      .slice(0, 8)
    for (const chair of pool) {
      seenChairIds.add(chair.id)
      conditionChairs.push(chairToResult(chair))
    }
    break // only apply first matching condition group
  }

  // ── Articles: full text match (title + excerpt + body) ────────────────────
  for (const article of LOCAL_ARTICLES) {
    const fullText = article.title + ' ' + article.excerpt + ' ' + stripHtml(article.body)
    if (fuzzyMatches(fullText, q)) {
      seenArticleSlugs.add(article.slug)
      articles.push({
        type: 'article',
        title: article.title,
        subtitle: article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? '...' : ''),
        href: '/learn/' + article.slug,
      })
    }
  }

  // ── Articles: condition keyword expansion ─────────────────────────────────
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

  // ── Brands ────────────────────────────────────────────────────────────────
  for (const brand of LOCAL_BRANDS) {
    const brandText = brand.name + ' ' + brand.tagline + ' ' + brand.bestFor
    if (fuzzyMatches(brandText, q)) {
      brands.push({ type: 'brand', title: brand.name, subtitle: brand.priceRange, href: '/brands/' + brand.slug })
    }
  }

  // Merge: name matches first, then up to 8 condition matches
  const allChairs = [...chairs, ...conditionChairs.slice(0, Math.max(0, 12 - chairs.length))]

  return { chairs: allChairs, articles, brands }
}
