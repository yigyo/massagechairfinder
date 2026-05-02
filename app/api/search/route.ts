import { NextRequest, NextResponse } from 'next/server'
import { CHAIRS } from '@/lib/chairs'
import { LOCAL_ARTICLES } from '@/lib/local-articles'
import { LOCAL_BRANDS } from '@/lib/local-brands'

export interface SearchResult {
  type: 'chair' | 'article' | 'brand'
  title: string
  subtitle?: string
  href: string
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
}

function matches(haystack: string, needle: string) {
  return normalize(haystack).includes(normalize(needle))
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') || '').trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], query: q })
  }

  const results: SearchResult[] = []

  // ── Chairs ───────────────────────────────────────────────────────────────
  for (const chair of CHAIRS) {
    if (!chair.active || !chair.mcfActive) continue
    if (matches(chair.name, q) || matches(chair.brand, q)) {
      const priceLabel = chair.priceMin
        ? '$' + chair.priceMin.toLocaleString() + (chair.priceMax ? ' to $' + chair.priceMax.toLocaleString() : '')
        : ''
      results.push({
        type: 'chair',
        title: chair.name,
        subtitle: [chair.brand, priceLabel].filter(Boolean).join(' · '),
        href: '/chairs/' + chair.id,
      })
    }
    if (results.filter(r => r.type === 'chair').length >= 12) break
  }

  // ── Articles ─────────────────────────────────────────────────────────────
  for (const article of LOCAL_ARTICLES) {
    if (matches(article.title, q) || matches(article.excerpt, q)) {
      results.push({
        type: 'article',
        title: article.title,
        subtitle: article.excerpt.slice(0, 100) + (article.excerpt.length > 100 ? '...' : ''),
        href: '/learn/' + article.slug,
      })
    }
  }

  // ── Brands ───────────────────────────────────────────────────────────────
  for (const brand of LOCAL_BRANDS) {
    if (matches(brand.name, q) || matches(brand.tagline, q)) {
      results.push({
        type: 'brand',
        title: brand.name,
        subtitle: brand.priceRange,
        href: '/brands/' + brand.slug,
      })
    }
  }

  return NextResponse.json({ results, query: q })
}
