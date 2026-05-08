'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getSearchClient, INDEX_NAME, TYPE_CONFIG, renderHighlight } from '@/lib/algolia'
import type { MCFHit, RecordType } from '@/lib/algolia'

const DEBOUNCE_MS = 200

type FilterType = 'all' | RecordType

interface Tab { id: FilterType; label: string; count: number }

export default function SearchContent({ initialQuery }: { initialQuery: string }) {
  const router        = useRouter()
  const searchParams  = useSearchParams()
  const [query, setQuery]     = useState(initialQuery)
  const [hits, setHits]       = useState<MCFHit[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [filter, setFilter]   = useState<FilterType>('all')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const urlTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Search ─────────────────────────────────────────────────────────────────
  const runSearch = useCallback(async (q: string) => {
    const client = getSearchClient()
    if (!client || !q.trim()) {
      setHits([])
      setSearched(!!q)
      return
    }
    setLoading(true)
    try {
      const response = await client.searchSingleIndex({
        indexName: INDEX_NAME,
        searchParams: {
          query: q,
          hitsPerPage: 40,
          attributesToHighlight: ['title', 'subtitle', 'brand'],
          attributesToSnippet: ['subtitle:30'],
          highlightPreTag: '<em>',
          highlightPostTag: '</em>',
        },
      })
      setHits((response.hits || []) as MCFHit[])
      setSearched(true)
    } catch {
      setHits([])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Initial query from URL ─────────────────────────────────────────────────
  useEffect(() => {
    if (initialQuery) runSearch(initialQuery)
  }, [initialQuery, runSearch])

  // ── Debounced search on input change ──────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query.trim()) { setHits([]); setSearched(false); return }
    timerRef.current = setTimeout(() => runSearch(query), DEBOUNCE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query, runSearch])

  // ── Sync query to URL (debounced so URL doesn't flicker on every keystroke)
  useEffect(() => {
    if (urlTimer.current) clearTimeout(urlTimer.current)
    urlTimer.current = setTimeout(() => {
      const current = searchParams.get('q') || ''
      if (query.trim() !== current) {
        const url = query.trim() ? '/search?q=' + encodeURIComponent(query.trim()) : '/search'
        router.replace(url, { scroll: false })
      }
    }, 400)
    return () => { if (urlTimer.current) clearTimeout(urlTimer.current) }
  }, [query, router, searchParams])

  // ── Filtered hits ──────────────────────────────────────────────────────────
  const filtered = filter === 'all' ? hits : hits.filter(h => h.type === filter)

  // ── Tab counts ─────────────────────────────────────────────────────────────
  const typeCounts = hits.reduce((acc, h) => {
    acc[h.type] = (acc[h.type] || 0) + 1
    return acc
  }, {} as Record<RecordType, number>)

  const ORDER: RecordType[] = ['best', 'chair', 'article', 'brand', 'compare']
  const tabs: Tab[] = [
    { id: 'all', label: 'All', count: hits.length },
    ...ORDER
      .filter(t => typeCounts[t] > 0)
      .map(t => ({ id: t as FilterType, label: TYPE_CONFIG[t].label, count: typeCounts[t] })),
  ]

  // ── Group filtered hits by type ────────────────────────────────────────────
  const sections = ORDER.map(type => ({
    type,
    label: TYPE_CONFIG[type].label,
    badge: TYPE_CONFIG[type].badge,
    items: filtered.filter(h => h.type === type),
  })).filter(s => s.items.length > 0)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Search input ────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={e => { setQuery(e.target.value); setFilter('all') }}
            placeholder="Search chairs, guides, conditions, brands..."
            aria-label="Search"
            autoFocus={!initialQuery}
            className="w-full pl-11 pr-4 py-3.5 text-base rounded-xl border border-sand bg-white text-charcoal placeholder-warm-gray shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
          />
          {loading && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <LoadingSpinner />
            </span>
          )}
        </div>
        {query && searched && (
          <p className="mt-2 text-sm text-warm-gray">
            {hits.length === 0
              ? 'No results for "' + query + '"'
              : hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + query + '"'}
          </p>
        )}
      </div>

      {/* ── Type filter tabs ────────────────────────────────────────────── */}
      {hits.length > 0 && tabs.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={
                'text-sm px-4 py-1.5 rounded-full border transition-colors ' +
                (filter === tab.id
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-charcoal border-sand hover:border-gold hover:text-gold')
              }
            >
              {tab.label}
              <span className={'ml-1.5 text-xs ' + (filter === tab.id ? 'opacity-70' : 'text-warm-gray')}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── No results state ────────────────────────────────────────────── */}
      {searched && hits.length === 0 && query && (
        <div className="bg-white border border-sand rounded-xl p-6 text-sm text-charcoal space-y-3">
          <p className="font-semibold text-navy">Not sure where to start?</p>
          <p>
            Use the{' '}
            <Link href="/finder" className="text-gold hover:underline">Chair Finder</Link>{' '}
            to get a personalized recommendation, or browse the{' '}
            <Link href="/learn" className="text-gold hover:underline">Learning Center</Link>.
          </p>
          <p className="text-warm-gray">
            Try: "Osaki", "sciatica", "lower back pain", "space saving", "zero gravity"
          </p>
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {!query && !searched && (
        <div className="text-charcoal text-sm space-y-2">
          <p>Search for a chair, condition, brand, or topic.</p>
          <p className="text-warm-gray">
            Try: "Osaki", "sciatica", "lower back pain", "space saving", "under $3000", or a chair name.
          </p>
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {sections.map(section => (
        <section key={section.type} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={'text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded ' + section.badge}>
              {section.label}
            </span>
            <span className="text-xs text-warm-gray">{section.items.length} result{section.items.length === 1 ? '' : 's'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map(hit => (
              <ResultCard key={hit.objectID} hit={hit} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ResultCard({ hit }: { hit: MCFHit }) {
  const hlTitle = renderHighlight(hit._highlightResult?.title?.value, hit.title)
  const hlSub   = renderHighlight(hit._highlightResult?.subtitle?.value, hit.subtitle || '')
  return (
    <Link
      href={hit.href}
      className="flex flex-col gap-1 p-4 rounded-xl bg-white border border-sand hover:border-gold hover:shadow-sm transition-all group"
    >
      <span
        className="text-navy font-semibold text-sm leading-snug group-hover:text-gold transition-colors [&_em]:not-italic [&_em]:text-gold [&_em]:font-bold"
        dangerouslySetInnerHTML={{ __html: hlTitle }}
      />
      {hlSub && (
        <span
          className="text-xs text-warm-gray leading-relaxed [&_em]:not-italic [&_em]:text-charcoal [&_em]:font-medium"
          dangerouslySetInnerHTML={{ __html: hlSub }}
        />
      )}
    </Link>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  )
}

function LoadingSpinner() {
  return (
    <svg className="w-5 h-5 animate-spin text-gold" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}
