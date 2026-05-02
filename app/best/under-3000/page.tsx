import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs Under $3,000 (2026)',
  description: 'From $1,299 to $2,999, the best massage chairs offer SL-track coverage, zero gravity, and improving roller quality. Six chairs selected across the full under-$3,000 range.',
}

const PICK_IDS = [
  'osaki-os-champ',
  'synca-wellness-circ-plus',
  'amamedics-renew-3d',
  'relaxe-shiatsu',
  'kyota-genki-m380',
  'osaki-os-pro-admiral-ii',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-champ': {
    label: 'Entry at $1,299',
    why: 'The OS-Champ offers SL-track coverage, two-stage zero gravity, lumbar heat, and a 260-lb weight capacity at the lowest price in the catalog. For buyers whose budget tops out at $1,300, this is the pick. 2D rollers, 9-inch wall clearance.',
  },
  'synca-wellness-circ-plus': {
    label: 'Best space-saving under $2,000',
    why: 'The CirC+ at $1,899 is a 3D SL-track chair with space-saving 6-inch wall clearance, zero gravity, and heat. The 45.5-inch track is longer than the base CirC and more appropriate for taller buyers. For buyers who need a chair that can sit near a wall at under $2,000, this is the pick. Sold via syncamassagechair.com.',
  },
  'amamedics-renew-3d': {
    label: 'Entry with 3D rollers',
    why: 'At the same $1,299 price as the OS-Champ, the Renew 3D includes a 3D roller mechanism with adjustable pressure depth, three-stage zero gravity, and 4-inch wall clearance. For buyers who expect to need precise pressure control, 3D at entry price is a meaningful differentiator. Currently a clearance model. 250-lb capacity.',
  },
  'relaxe-shiatsu': {
    label: 'Best for larger buyers under $3,000',
    why: 'The Relaxe Shiatsu is confirmed at 330 lbs with a 53-inch SL-track and space-saving 2-inch wall clearance, priced at $2,899 to $2,999. The weight capacity is the highest in the under-$3,000 range, making it the strongest option for buyers who exceed 260 or 270 lbs. Confirmed height range of 61 to 76 inches. 2D rollers, zero gravity, heat. Sold via relaxe.co.',
  },
  'kyota-genki-m380': {
    label: 'Best for tall or heavier buyers',
    why: "The Genki M380 is confirmed for buyers up to 6'5\" and 330 lbs, a notably high weight capacity for this price tier. L-track (covers glutes and thighs, less upper-back reach than SL). A Wirecutter Top Pick for 2024. For buyers who exceed the 200-lb limit of entry chairs or need a taller accommodation, this is the pick at $2,999.",
  },
  'osaki-os-pro-admiral-ii': {
    label: 'Best overall under $3,000',
    why: "The Admiral II is the strongest chair in this tier on pure therapeutic specs. A 49-inch SL-track (longest in the under-$3,000 range), 3D rollers with adjustable depth, body scanning, 2-inch wall clearance, and confirmed 5'2\" to 6'1\", 270 lbs. For buyers in that height and weight range who want the most capable chair available without crossing $3,000, this is the pick.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestUnder3000Page() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $3,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The under-$3,000 range is where the massage chair category starts to reward research. At $1,299 you get SL-track coverage and zero gravity. By $2,999 you get L-track with a high weight capacity confirmation, and the strongest overall therapeutic spec in the tier. The four chairs below cover the full range from entry to the top of this tier.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All four chairs below are SL-track or L-track. For chairs above $3,000, see the{' '}
        <Link href="/best/3000-to-5000" className="text-bronze hover:text-gold transition-colors">$3,000 to $5,000 page</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What changes as you spend more in this tier</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          From $1,299 to $2,999, three things change meaningfully. First, roller quality: entry chairs use 2D rollers that move in two axes. Mid-tier chairs often include 3D rollers with adjustable depth. Second, track length: longer tracks extend further under the glutes, which matters for lower back and sacral coverage. Third, body fit confirmation: verified height and weight specs from the retailer become available at $2,999, meaning you have evidence that the chair fits your dimensions before buying.
        </p>
        <p className="text-charcoal leading-relaxed">
          Body scanning, which maps the roller start position to your shoulder height before each session, appears at $2,999. It is not a luxury feature at this price point. It is a meaningful difference in how well the chair covers your specific spine geometry on a daily basis.
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
                {(chair.goodwinImageUrl || chair.imageUrl) && (
                  <div className="flex-shrink-0 w-full sm:w-36 h-36 bg-white border border-sand rounded-lg overflow-hidden">
                    <img src={chair.goodwinImageUrl || chair.imageUrl} alt={chair.name} className="w-full h-full object-contain p-2" />
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
                  {chair.reviewRating && (
                    <p className="text-sm text-warm-gray mb-3">
                      <span className="text-gold">{"\u2605".repeat(Math.round(chair.reviewRating))}</span>
                      {" "}{chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
                      {chair.reviewSource ? " at " + chair.reviewSource : ""}
                    </p>
                  )}
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
          For most buyers in this tier, the decision comes down to body fit. If you are 5&apos;2&quot; to 6&apos;1&quot; and under 270 lbs, the Admiral II is the pick. If you are taller than 6&apos;1&quot; or heavier than 270 lbs, the Kyota Genki M380 accommodates a wider range at the same price.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If budget is strictly under $2,000 and that cannot change, both entry picks above are sound. The gap between $1,299 and $2,999 is real, but not everyone needs the upgrade.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">track types guide</Link>{' '}
          explains the SL vs L decision. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          uses budget as a primary filter and narrows by body fit from there.
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
