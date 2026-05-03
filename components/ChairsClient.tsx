'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Chair } from '@/lib/chairs'
import { chairScore } from '@/lib/scoring'

interface Props {
  activeChairs: Chair[]
  oosChairs: Chair[]
}

const PAGE_SIZE = 21

const TRACK_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'SL-Track', value: 'SL' },
  { label: 'L-Track', value: 'L' },
  { label: 'S-Track', value: 'S' },
  { label: 'Flex', value: 'Flex' },
]

const ROLLER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: '2D', value: '2D' },
  { label: '3D', value: '3D' },
  { label: '4D', value: '4D' },
]

const PRICE_OPTIONS = [
  { label: 'All prices', value: 0 },
  { label: 'Under $3,000', value: 3000 },
  { label: 'Under $5,000', value: 5000 },
  { label: 'Under $8,000', value: 8000 },
  { label: 'Under $12,000', value: 12000 },
]

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'score' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

function getTrackLabel(track: string | null | undefined): string {
  if (!track || track === 'vibration') return ''
  const map: Record<string, string> = { SL: 'SL-Track', L: 'L-Track', S: 'S-Track', Flex: 'Flex-Track' }
  return map[track] || ''
}

function formatPriceLabel(chair: Chair): string {
  return chair.priceMax && chair.priceMax > chair.priceMin
    ? '$' + chair.priceMin.toLocaleString() + ' - $' + chair.priceMax.toLocaleString()
    : '$' + chair.priceMin.toLocaleString()
}

function ChairRow({ chair, oos = false }: { chair: Chair; oos?: boolean }) {
  const trackLabel = getTrackLabel(chair.track)
  return (
    <Link
      href={'/chairs/' + chair.id}
      className={
        'card hover:shadow-md transition-shadow group flex flex-col' +
        (oos ? ' opacity-60' : '')
      }
    >
      <div className="flex items-start justify-between mb-1">
        <p className="text-xs font-medium text-warm-gray uppercase tracking-wide">{chair.brand}</p>
        {oos && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-terra/40 text-terra bg-white shrink-0">
            Out of Stock
          </span>
        )}
      </div>
      <h2 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-3 leading-snug">
        {chair.name}
      </h2>
      {chair.reviewRating && (
        <p className="text-xs text-warm-gray mb-3">
          <span className="text-gold">{"★".repeat(Math.round(chair.reviewRating))}</span>
          {" "}{chair.reviewRating.toFixed(1)}
          {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          {chair.vibrationOnly ? (
            <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">
              Vibration
            </span>
          ) : (
            <>
              {trackLabel && (
                <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">
                  {trackLabel}
                </span>
              )}
              {chair.roller && (
                <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">
                  {chair.roller}
                </span>
              )}
            </>
          )}
        </div>
        <span className="text-sm font-semibold text-charcoal shrink-0">
          {formatPriceLabel(chair)}
        </span>
      </div>
    </Link>
  )
}

export default function ChairsClient({ activeChairs, oosChairs }: Props) {
  const [track, setTrack]       = useState('all')
  const [roller, setRoller]     = useState('all')
  const [brand, setBrand]       = useState('all')
  const [maxPrice, setMaxPrice] = useState(0)
  const [sortBy, setSortBy]     = useState<'score' | 'price-asc' | 'price-desc'>('score')
  const [showAll, setShowAll]   = useState(false)

  const brands = useMemo(
    () => Array.from(new Set(activeChairs.map(c => c.brand))).sort(),
    [activeChairs]
  )

  const anyFilterActive = track !== 'all' || roller !== 'all' || brand !== 'all' || maxPrice !== 0

  // Filter then sort
  const sorted = useMemo(() => {
    const filtered = activeChairs.filter(c => {
      if (track !== 'all' && c.track !== track) return false
      if (roller !== 'all' && c.roller !== roller) return false
      if (brand !== 'all' && c.brand !== brand) return false
      if (maxPrice > 0 && c.priceMin >= maxPrice) return false
      return true
    })
    if (sortBy === 'price-asc')  return [...filtered].sort((a, b) => a.priceMin - b.priceMin)
    if (sortBy === 'price-desc') return [...filtered].sort((a, b) => b.priceMin - a.priceMin)
    return [...filtered].sort((a, b) => chairScore(b) - chairScore(a))
  }, [activeChairs, track, roller, brand, maxPrice, sortBy])

  // Reset showAll whenever filters or sort change
  function handleFilterChange(fn: () => void) {
    fn()
    setShowAll(false)
  }

  function clearFilters() {
    setTrack('all')
    setRoller('all')
    setBrand('all')
    setMaxPrice(0)
    setShowAll(false)
  }

  const visible   = showAll ? sorted : sorted.slice(0, PAGE_SIZE)
  const hiddenCount = sorted.length - PAGE_SIZE

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-white rounded-lg border border-sand p-4 mb-6">
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-end">

          {/* Track */}
          <div>
            <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-2">Track</p>
            <div className="flex flex-wrap gap-1.5">
              {TRACK_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleFilterChange(() => setTrack(opt.value))}
                  className={
                    track === opt.value
                      ? 'text-xs font-semibold px-3 py-1.5 rounded-full bg-navy text-white'
                      : 'text-xs font-medium px-3 py-1.5 rounded-full border border-sand text-charcoal hover:border-navy transition-colors'
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Roller */}
          <div>
            <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-2">Roller</p>
            <div className="flex flex-wrap gap-1.5">
              {ROLLER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleFilterChange(() => setRoller(opt.value))}
                  className={
                    roller === opt.value
                      ? 'text-xs font-semibold px-3 py-1.5 rounded-full bg-navy text-white'
                      : 'text-xs font-medium px-3 py-1.5 rounded-full border border-sand text-charcoal hover:border-navy transition-colors'
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-2">Brand</p>
            <select
              value={brand}
              onChange={e => handleFilterChange(() => setBrand(e.target.value))}
              className="text-sm border border-sand rounded px-3 py-1.5 text-charcoal bg-white focus:outline-none focus:border-navy"
            >
              <option value="all">All brands</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-2">Price</p>
            <select
              value={maxPrice}
              onChange={e => handleFilterChange(() => setMaxPrice(Number(e.target.value)))}
              className="text-sm border border-sand rounded px-3 py-1.5 text-charcoal bg-white focus:outline-none focus:border-navy"
            >
              {PRICE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-2">Sort</p>
            <select
              value={sortBy}
              onChange={e => handleFilterChange(() => setSortBy(e.target.value as typeof sortBy))}
              className="text-sm border border-sand rounded px-3 py-1.5 text-charcoal bg-white focus:outline-none focus:border-navy"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {anyFilterActive && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-warm-gray hover:text-navy underline self-end pb-1.5 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-warm-gray mb-5">
        {sorted.length === 0
          ? '0 chairs'
          : showAll || sorted.length <= PAGE_SIZE
            ? sorted.length + (sorted.length !== activeChairs.length ? ' of ' + activeChairs.length + ' chairs' : ' chairs')
            : 'Showing ' + PAGE_SIZE + ' of ' + sorted.length + (sorted.length !== activeChairs.length ? ' filtered' : '') + ' chairs'}
      </p>

      {/* Grid */}
      {sorted.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(chair => (
              <ChairRow key={chair.id} chair={chair} />
            ))}
          </div>

          {/* Load more */}
          {!showAll && hiddenCount > 0 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal border border-sand rounded-lg px-6 py-3 hover:border-navy hover:text-navy transition-colors bg-white"
              >
                Show all {sorted.length} chairs
                <span className="text-warm-gray text-xs">(+{hiddenCount} more)</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-warm-gray">
          <p className="mb-3">No chairs match those filters.</p>
          <button
            onClick={clearFilters}
            className="text-sm text-gold hover:text-bronze font-medium underline transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 bg-sand rounded-xl p-6 text-center">
        <p className="text-charcoal font-medium mb-3">Not sure which chair fits your situation?</p>
        <Link href="/finder" className="btn-primary inline-block">
          Find My Chair
        </Link>
      </div>

      {/* Out of stock */}
      {oosChairs.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-serif font-semibold text-charcoal mb-1">Out of Stock</h2>
          <p className="text-sm text-warm-gray mb-6">
            These chairs are temporarily unavailable. Each page includes alternatives to consider in the meantime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {oosChairs.map(chair => (
              <ChairRow key={chair.id} chair={chair} oos />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
