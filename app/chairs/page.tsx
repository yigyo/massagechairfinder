import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Massage Chairs',
  description: 'Browse 33 massage chairs researched and compared by track type, price, and use case.',
}

function getTrackLabel(track: string | null | undefined): string {
  if (!track) return ''
  const map: Record<string, string> = { SL: 'SL-Track', L: 'L-Track', S: 'S-Track', Flex: 'Flex-Track' }
  return map[track] || ''
}

export default function ChairsPage() {
  const chairs = MCF_CHAIRS.filter(c => c.active !== false).sort((a, b) => a.priceMin - b.priceMin)

  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-2">All Massage Chairs</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        {chairs.length} chairs researched and compared. Sorted by price, low to high.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {chairs.map((chair) => {
          const trackLabel = getTrackLabel(chair.track)
          const priceLabel = chair.priceMax && chair.priceMax > chair.priceMin
            ? '$' + chair.priceMin.toLocaleString() + ' - $' + chair.priceMax.toLocaleString()
            : '$' + chair.priceMin.toLocaleString()

          return (
            <Link
              key={chair.id}
              href={'/chairs/' + chair.id}
              className="card hover:shadow-md transition-shadow group flex flex-col"
            >
              <p className="text-xs font-medium text-warm-gray uppercase tracking-wide mb-1">{chair.brand}</p>
              <h2 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-3 leading-snug">
                {chair.name}
              </h2>
              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex gap-2 flex-wrap">
                  {chair.vibrationOnly ? (
                    <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">Vibration</span>
                  ) : (
                    <>
                      {trackLabel && (
                        <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">{trackLabel}</span>
                      )}
                      {chair.roller && (
                        <span className="border border-terra text-terra text-xs font-medium px-3 py-1 rounded-full">{chair.roller}</span>
                      )}
                    </>
                  )}
                </div>
                <span className="text-sm font-semibold text-gold shrink-0">{priceLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 bg-sand rounded-xl p-6 text-center">
        <p className="text-charcoal font-medium mb-3">Not sure which chair fits your situation?</p>
        <Link href="/finder" className="btn-primary inline-block">
          Find My Chair
        </Link>
      </div>
    </div>
  )
}
