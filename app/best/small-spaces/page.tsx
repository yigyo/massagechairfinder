import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Small Spaces (2026)',
  description: 'Space-saving massage chairs require as little as 1 inch of wall clearance by sliding forward as they recline. Five chairs selected for wall clearance, therapeutic specs, and verified body fit.',
}

const PICK_IDS = [
  'amamedics-renew-3d',
  'osaki-os-pro-admiral-ii',
  'titan-3d-prestige',
  'infinity-imperial-syner-d',
  'jpmedics-kaze-duo',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'amamedics-renew-3d': {
    label: 'Most affordable space-saving pick',
    why: 'The Renew 3D is the most affordable space-saving chair in the catalog at $1,299. Four-inch wall clearance, SL-track, 3D rollers with adjustable pressure depth, three-stage zero gravity, body scanning, and lumbar heat. Currently a clearance model. For buyers whose primary constraint is budget and who need a chair that can sit near a wall, this is the entry point. 250-lb weight capacity.',
  },
  'osaki-os-pro-admiral-ii': {
    label: 'Best value',
    why: "The Admiral II has 2-inch wall clearance, the tightest in the under-$4,000 range. SL-track, 3D rollers, 49-inch track, body scanning. The combination of strong therapeutic specs with minimal footprint requirements makes this the best value in the space-saving category. Confirmed 5'2\" to 6'1\", 270 lbs.",
  },
  'titan-3d-prestige': {
    label: 'Smallest footprint in SL-track',
    why: "The Titan 3D Prestige requires 1 inch of wall clearance, the tightest in the SL-track category. At $4,999, it represents the price point where SL-track, 3D rollers, space-saving recline, and zero gravity all converge. Heat and full-body stretch confirmed. Confirmed up to 6'3\", 260 lbs.",
  },
  'infinity-imperial-syner-d': {
    label: 'Premium with widest confirmed height range',
    why: "The Syner-D uses a Flex-track mechanism, a hybrid between SL and L-track that adjusts its coverage range between programs. It requires 2 inches of wall clearance and is confirmed for 5'2\" to 6'6\", one of the widest height ranges among space-saving chairs. 4D rollers, 300 lbs, 5-year warranty, body scanning. Price varies by retailer; the confirmed range is $8,000 to $12,000.",
  },
  'jpmedics-kaze-duo': {
    label: 'Premium 1-inch clearance',
    why: "The KaZe Duo combines 1-inch wall clearance with a dual 4D roller mechanism and a 320-lb weight capacity. For buyers who want the tightest possible wall clearance at the premium tier with high weight capacity, this is the pick. L-track provides strong glute and thigh coverage. Confirmed 5'0\" to 6'3\".",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestSmallSpacesPage() {
  const picks = PICK_IDS
    .map(id => MCF_CHAIRS.find(c => c.id === id))
    .filter(Boolean) as typeof MCF_CHAIRS

  return (
    <div className="section">

      <div className="mb-4">
        <Link href="/best" className="text-bronze hover:text-gold text-sm">
          &larr; Best chairs by use case
        </Link>
      </div>

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Small Spaces</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Most massage chairs require 12 to 18 inches of clearance behind them to recline. Space-saving models use a wall-hugging mechanism that slides the chair base forward as it reclines, reducing the required wall clearance to as little as 1 inch. For buyers fitting a chair into a smaller room, alcove, or dedicated corner, this specification matters more than almost any other.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All five chairs below have confirmed wall clearance of 4 inches or less. Wall clearance measurements reflect the gap needed when the chair is at maximum recline.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How space-saving recline works</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Standard massage chairs extend backward when reclining, requiring 12 to 18 inches between the backrest and the wall. Space-saving chairs use a mechanism that slides the base forward as the backrest reclines, so the chair occupies the same floor position it started in, just reclined. A 1-inch wall clearance chair can sit almost flush against a wall.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Wall clearance and floor footprint are two different measurements. A chair with 1-inch wall clearance still has a physical length and width when placed in a room. Always check the chair dimensions (length x width) in addition to wall clearance when planning room placement.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/room-fit" className="text-bronze hover:text-gold transition-colors">room fit guide</Link>{' '}
          covers how to measure your space and position a chair before purchasing, including a floor-tape exercise to test fit before the chair arrives.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-5">Quick comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-sand">
                <th className="text-left py-3 pl-4 pr-5 font-semibold text-charcoal whitespace-nowrap">Chair</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Price</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Track</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Roller</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Zero Gravity</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Height Range</th>
                <th className="text-left py-3 font-semibold text-charcoal whitespace-nowrap">Weight Cap</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((chair, i) => {
                const heightRange = chair.heightMinIn && chair.heightMaxIn
                  ? `${fmtFt(chair.heightMinIn)} – ${fmtFt(chair.heightMaxIn)}`
                  : chair.heightMaxIn
                  ? `Up to ${fmtFt(chair.heightMaxIn)}`
                  : 'Not confirmed'
                const zgLabel = chair.zeroGravityStages
                  ? `${chair.zeroGravityStages}-stage`
                  : chair.zeroGravity
                  ? 'Yes'
                  : 'No'
                return (
                  <tr key={chair.id} className={i % 2 === 0 ? 'bg-white' : 'bg-sand/40'}>
                    <td className="py-3 pl-4 pr-5">
                      <Link href={`/chairs/${chair.id}`} className="text-navy hover:text-gold font-medium transition-colors">
                        {chair.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.priceMax && chair.priceMax > chair.priceMin
                        ? `$${chair.priceMin.toLocaleString()} – $${chair.priceMax.toLocaleString()}`
                        : `$${chair.priceMin.toLocaleString()}`}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">{chair.track}-Track</td>
                    <td className="py-3 pr-5 text-charcoal">{chair.roller}</td>
                    <td className="py-3 pr-5 text-charcoal">{zgLabel}</td>
                    <td className="py-3 pr-5 text-charcoal">{heightRange}</td>
                    <td className="py-3 text-charcoal">
                      {chair.weightCapacityLbs ? `${chair.weightCapacityLbs} lbs` : 'Not confirmed'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-semibold text-navy mb-8">The picks</h2>
      <div className="space-y-8 mb-14">
        {picks.map((chair, i) => {
          const editorial = EDITORIAL[chair.id]
          const priceLabel = chair.priceMax && chair.priceMax > chair.priceMin
            ? `$${chair.priceMin.toLocaleString()} – $${chair.priceMax.toLocaleString()}`
            : `$${chair.priceMin.toLocaleString()}`
          const heightRange = chair.heightMinIn && chair.heightMaxIn
            ? `${fmtFt(chair.heightMinIn)} – ${fmtFt(chair.heightMaxIn)}`
            : chair.heightMaxIn
            ? `Up to ${fmtFt(chair.heightMaxIn)}`
            : null
          return (
            <div key={chair.id} className="card">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                  {i + 1}. {editorial?.label}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                {chair.goodwinImageUrl && (
                  <div className="flex-shrink-0 w-full sm:w-36 h-36 bg-white border border-sand rounded-lg overflow-hidden">
                    <img src={chair.goodwinImageUrl} alt={chair.name} className="w-full h-full object-contain p-2" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-serif font-semibold text-navy mb-1">
                    <Link href={`/chairs/${chair.id}`} className="hover:text-gold transition-colors">{chair.name}</Link>
                  </h3>
                  <p className="text-charcoal font-semibold text-sm mb-3">{priceLabel}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {chair.track && chair.track !== 'vibration' && (
                      <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">{chair.track}-Track</span>
                    )}
                    {chair.roller && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">{chair.roller}</span>
                    )}
                    {chair.zeroGravity && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        {chair.zeroGravityStages ? `ZG ${chair.zeroGravityStages}-stage` : 'Zero Gravity'}
                      </span>
                    )}
                    {chair.aiScanning && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Body Scan</span>
                    )}
                    {chair.heat && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Heat</span>
                    )}
                    {chair.spaceSaving && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Space-Saving</span>
                    )}
                  </div>
                  <p className="text-charcoal text-base leading-relaxed mb-4">{editorial?.why}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {heightRange && <span className="text-xs text-warm-gray">Height: {heightRange}</span>}
                    {chair.weightCapacityLbs ? <span className="text-xs text-warm-gray">Capacity: {chair.weightCapacityLbs} lbs</span> : null}
                    {chair.trackLengthIn ? <span className="text-xs text-warm-gray">Track: {chair.trackLengthIn}&quot;</span> : null}
                    {chair.wallClearanceIn ? <span className="text-xs text-warm-gray">Wall clearance: {chair.wallClearanceIn}&quot;</span> : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {chair.affiliateUrl && (
                      <a href={chair.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                         className="border border-gold text-gold hover:bg-gold hover:text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
                        Shop this chair
                      </a>
                    )}
                    <Link href={`/chairs/${chair.id}`} className="text-sm text-bronze hover:text-gold transition-colors">Full review</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white border border-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How to narrow from here</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          If your budget is under $1,500, the AmaMedics Renew 3D at $1,299 with 4-inch clearance is the entry pick. If budget allows $2,999, the Admiral II at 2-inch clearance is the stronger therapeutic option with a longer track and higher weight capacity.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For taller buyers (above 6&apos;1&quot;) who also need a small-space chair, the Syner-D is confirmed to 6&apos;6&quot; and the KaZe Duo to 6&apos;3&quot;. Both require 1 to 2 inches of wall clearance.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes a space constraint question that surfaces only space-saving chairs when selected. The{' '}
          <Link href="/learn/room-fit" className="text-bronze hover:text-gold transition-colors">room fit guide</Link>{' '}
          covers placement, clearance, and how to verify a chair will work in your specific room before it arrives.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
