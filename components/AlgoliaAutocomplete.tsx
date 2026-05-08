'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSearchClient, INDEX_NAME, TYPE_CONFIG, renderHighlight } from '@/lib/algolia'
import type { MCFHit } from '@/lib/algolia'

interface Props {
  variant?: 'desktop' | 'mobile'
  onNavigate?: () => void
}

const DEBOUNCE_MS = 180

export default function AlgoliaAutocomplete({ variant = 'desktop', onNavigate }: Props) {
  const [query, setQuery]       = useState('')
  const [hits, setHits]         = useState<MCFHit[]>([])
  const [open, setOpen]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef  = useRef<HTMLInputElement>(null)
  const panelRef  = useRef<HTMLDivElement>(null)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router    = useRouter()

  // ── Search ─────────────────────────────────────────────────────────────────
  const search = useCallback(async (q: string) => {
    const client = getSearchClient()
    if (!client || !q.trim()) { setHits([]); setOpen(false); return }
    setLoading(true)
    try {
      const response = await client.searchSingleIndex({
        indexName: INDEX_NAME,
        searchParams: {
          query: q,
          hitsPerPage: 8,
          attributesToHighlight: ['title', 'subtitle', 'brand'],
          attributesToSnippet: ['subtitle:18'],
          highlightPreTag: '<em>',
          highlightPostTag: '</em>',
        },
      })
      const raw = (response.hits || []) as MCFHit[]
      setHits(raw)
      setOpen(raw.length > 0 || q.trim().length >= 2)
      setActiveIdx(-1)
    } catch {
      setHits([])
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Debounce ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query.trim()) { setHits([]); setOpen(false); return }
    timerRef.current = setTimeout(() => search(query), DEBOUNCE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query, search])

  // ── Outside click close ────────────────────────────────────────────────────
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // ── Keyboard navigation ────────────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1); return }
    if (!open || hits.length === 0) {
      if (e.key === 'Enter') goToSearch()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, hits.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0 && hits[activeIdx]) {
        navigateTo(hits[activeIdx].href)
      } else {
        goToSearch()
      }
    }
  }

  function navigateTo(href: string) {
    setOpen(false)
    setQuery('')
    setHits([])
    onNavigate?.()
    router.push(href)
  }

  function goToSearch() {
    if (!query.trim()) return
    const q = query.trim()
    setOpen(false)
    setQuery('')
    setHits([])
    onNavigate?.()
    router.push('/search?q=' + encodeURIComponent(q))
  }

  // ── Group hits by type for display ─────────────────────────────────────────
  const ORDER: MCFHit['type'][] = ['best', 'chair', 'article', 'brand', 'compare']
  const grouped = ORDER.map(type => ({
    type,
    label: TYPE_CONFIG[type].label,
    badge: TYPE_CONFIG[type].badge,
    items: hits.filter(h => h.type === type),
  })).filter(g => g.items.length > 0)

  // ── Flatten hits for keyboard index ───────────────────────────────────────
  const flat = ORDER.flatMap(type => hits.filter(h => h.type === type))

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (variant === 'mobile') {
    return (
      <div ref={panelRef} className="relative mt-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (hits.length > 0) setOpen(true) }}
              placeholder="Search chairs, guides, brands..."
              aria-label="Search the site"
              className="w-full text-sm px-3 py-2 rounded border border-sand bg-linen text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
            />
          </div>
          <button
            onClick={goToSearch}
            aria-label="Search"
            className="p-2 rounded border border-navy text-navy bg-transparent hover:bg-navy hover:text-white transition-colors"
          >
            <SearchIcon />
          </button>
        </div>
        {open && (
          <DropdownPanel
            grouped={grouped}
            flat={flat}
            activeIdx={activeIdx}
            query={query}
            onNavigate={navigateTo}
            onViewAll={goToSearch}
          />
        )}
      </div>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div ref={panelRef} className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (hits.length > 0) setOpen(true) }}
            placeholder='Try "Osaki", "sciatica", "zero gravity"...'
            aria-label="Search the site"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-sand bg-linen text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
          />
          {loading && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <LoadingSpinner />
            </span>
          )}
        </div>
        <button
          onClick={goToSearch}
          className="shrink-0 text-sm py-2.5 px-5 rounded-lg border border-gold text-gold bg-transparent hover:bg-gold hover:text-white transition-colors"
        >
          Search
        </button>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-[100]">
          <DropdownPanel
            grouped={grouped}
            flat={flat}
            activeIdx={activeIdx}
            query={query}
            onNavigate={navigateTo}
            onViewAll={goToSearch}
          />
        </div>
      )}
    </div>
  )
}

// ── Dropdown panel ─────────────────────────────────────────────────────────
interface PanelProps {
  grouped: { type: MCFHit['type']; label: string; badge: string; items: MCFHit[] }[]
  flat: MCFHit[]
  activeIdx: number
  query: string
  onNavigate: (href: string) => void
  onViewAll: () => void
}

function DropdownPanel({ grouped, flat, activeIdx, query, onNavigate, onViewAll }: PanelProps) {
  if (grouped.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-2xl border border-sand p-5 text-sm text-warm-gray">
        No results for <strong className="text-charcoal">"{query}"</strong>.{' '}
        <button onClick={onViewAll} className="text-gold hover:underline font-medium">
          Try the full search
        </button>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-sand overflow-hidden" role="listbox">
      {grouped.map(group => (
        <div key={group.type}>
          <div className="px-4 pt-3 pb-1">
            <span className={'text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ' + group.badge}>
              {group.label}
            </span>
          </div>
          {group.items.map(hit => {
            const flatIdx = flat.indexOf(hit)
            const isActive = flatIdx === activeIdx
            const hlTitle = renderHighlight(hit._highlightResult?.title?.value, hit.title)
            const hlSub   = renderHighlight(hit._highlightResult?.subtitle?.value, hit.subtitle || '')
            return (
              <button
                key={hit.objectID}
                role="option"
                aria-selected={isActive}
                onClick={() => onNavigate(hit.href)}
                className={
                  'w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors ' +
                  (isActive ? 'bg-linen' : 'hover:bg-linen/70')
                }
              >
                <span
                  className="text-sm font-medium text-navy leading-snug [&_em]:not-italic [&_em]:text-gold [&_em]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: hlTitle }}
                />
                {hlSub && (
                  <span
                    className="text-xs text-warm-gray leading-snug [&_em]:not-italic [&_em]:text-charcoal [&_em]:font-medium"
                    dangerouslySetInnerHTML={{ __html: hlSub }}
                  />
                )}
              </button>
            )
          })}
        </div>
      ))}
      <div className="border-t border-sand px-4 py-3">
        <button
          onClick={onViewAll}
          className="text-sm text-gold hover:underline font-medium flex items-center gap-1.5"
        >
          <SearchIcon />
          View all results for "{query}"
        </button>
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  )
}

function LoadingSpinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-gold" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}
