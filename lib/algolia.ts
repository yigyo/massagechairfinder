import { algoliasearch } from 'algoliasearch'

// Public search-only key, safe to expose in the browser.
// Set in .env.local (NEXT_PUBLIC_ prefix makes it available to the browser).
const APP_ID  = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID  || ''
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''

export const INDEX_NAME = 'massagechairfinder'

// Single shared client instance, created lazily once keys are available.
let _client: ReturnType<typeof algoliasearch> | null = null
export function getSearchClient() {
  if (!APP_ID || !API_KEY) return null
  if (!_client) _client = algoliasearch(APP_ID, API_KEY)
  return _client
}

// ── Record shape ─────────────────────────────────────────────────────────────
export type RecordType = 'best' | 'chair' | 'article' | 'brand' | 'compare'

export interface MCFHit {
  objectID: string
  type: RecordType
  title: string
  subtitle?: string
  href: string
  typeRank: number
  // chair fields
  brand?: string
  price?: number
  track?: string
  // article fields
  excerpt?: string
  // highlight result from Algolia
  _highlightResult?: {
    title?:    { value: string }
    subtitle?: { value: string }
    brand?:    { value: string }
  }
}

export const TYPE_CONFIG: Record<RecordType, { label: string; badge: string }> = {
  best:    { label: 'Best Picks', badge: 'bg-terra text-white' },
  chair:   { label: 'Chair',      badge: 'bg-navy text-white' },
  article: { label: 'Guide',      badge: 'bg-teal text-white' },
  brand:   { label: 'Brand',      badge: 'bg-gold text-white' },
  compare: { label: 'Compare',    badge: 'bg-charcoal text-white' },
}

// Render Algolia highlight markup safely: strip everything except <em>
export function renderHighlight(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback
  // Algolia wraps matches in <em>; we keep those and strip any other tags
  return raw.replace(/<(?!\/em>|em>)[^>]+>/g, '')
}
