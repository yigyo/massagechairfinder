import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Heavy-Duty Massage Chairs (2026)',
  description: 'Heavy-duty massage chairs are verified for 300 lbs or above with confirmed effective performance, not just structural clearance. Five chairs selected from $2,999 to $13,490.',
}

const PICK_IDS = [
  'kyota-genki-m380',
  'ogawa-active-xl',
  'bodyfriend-phantom-ii',
  'jpmedics-kumo-4d',
  'luraco-i9-max-plus',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'kyota-genki-m380': {
    label: 'Best entry heavy-duty',
    why: 'The Genki M380 is confirmed at 330 lbs with a Plus Size Confirmed designation and is a Wirecutter Top Pick for 2024. L-track covers the glutes and thighs. At $2,999, it is the most affordable chair in the catalog with a verified high-capacity rating. Zero gravity, heat, foot and calf massage, 2D rollers.',
  },
  'ogawa-active-xl': {
    label: 'Best SL-track for larger frames',
    why: 'The Active XL 3D is confirmed for 5\'0" to 6\'4" and 320 lbs, combining high weight capacity with a wide height range. SL-track covers the full spine and glutes, which matters for heavier buyers because lower-back load often concentrates at the sacrum and glutes. 3D rollers, two-stage zero gravity, heat.',
  },
  'bodyfriend-phantom-ii': {
    label: 'Highest weight capacity in the catalog',
    why: 'The Phantom II has the highest confirmed weight capacity in the catalog at 335 lbs, with a Plus Size Confirmed designation from the retailer. SL-track, 4D rollers, heat. Height compatibility data is not confirmed from the retailer spec page. Buyers who need both high weight capacity and confirmed height fit should verify directly with the retailer before purchasing.',
  },
  'jpmedics-kumo-4d': {
    label: 'Best premium L-track for heavy-duty',
    why: 'The Kumo 4D is confirmed at 320 lbs with a deep L-track extension. For heavier buyers whose primary pain is in the lower back, glutes, and hamstrings, L-track with 4D roller depth delivers targeted coverage at the right zone. Made in Japan, which at this price tier typically means tighter manufacturing tolerances and longer service intervals. Up to 6\'3".',
  },
  'luraco-i9-max-plus': {
    label: 'Wide body fit, made in USA',
    why: 'The Luraco is confirmed at 300 lbs and 6\'10", the widest body fit range in the catalog. Relevant for heavier buyers who are also tall. The only USA-manufactured massage chair in the catalog, with a 10-year warranty. L-track, 3D rollers, body scanning, heat, zero gravity, full-body stretch.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestHeavyDutyPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Heavy-Duty Massage Chairs</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Weight capacity in massage chairs is often underreported. A chair rated at 300 lbs is not necessarily engineered to deliver full massage effectiveness at that weight. The roller mechanism may not achieve full depth under higher loads, and the frame may be at the edge of its design tolerance. The chairs below are verified at 300 lbs or above with Plus Size Confirmed validation from retailer spec pages.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. All five chairs below are confirmed at 300 lbs or above. Height data is noted where available from verified sources.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">Weight capacity vs effective capacity</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          A chair&apos;s listed weight capacity describes the structural maximum, the point above which the frame risks damage. It does not describe the point at which massage becomes less effective. In practice, roller pressure decreases as load increases, because the spring tension in the roller mechanism is calibrated for average weight ranges.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Chairs with 320-lb or higher capacity are generally engineered with more mechanical headroom. A 250-lb buyer in a 320-lb-capacity chair will often experience stronger, more consistent roller pressure than in a 300-lb-max chair at the same settings, because the mechanism is not working near its upper limit.
        </p>
        <p className="text-charcoal leading-relaxed">
          The Plus Size Confirmed designation used in this catalog means the retailer has specifically verified effective performance at or near the maximum weight rating, not just structural safety.
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
          For buyers at or below 330 lbs who want the most affordable confirmed option, the Kyota Genki M380 at $2,999 is the pick. For buyers who also need SL-track full-spine coverage, the Ogawa Active XL at $5,899 covers both requirements.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          The Phantom II has the highest capacity (335 lbs) but lacks confirmed height data. If weight is the primary concern and height fit is secondary, it is the pick. If you need both confirmed, the Ogawa Active XL (5'0&quot; to 6'4&quot;, 320 lbs) or Luraco (4'11&quot; to 6'10&quot;, 300 lbs) are better-documented options.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes weight capacity as a filter. The{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit guide</Link>{' '}
          explains how weight capacity is measured and what to ask retailers about effective performance ranges.
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
