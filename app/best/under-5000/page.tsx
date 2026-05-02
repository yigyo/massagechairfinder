import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs Under $5,000 (2026)',
  description: 'Under $5,000 covers the strongest mid-tier SL-track chairs alongside the first 4D options just above that mark. Five chairs selected across every major use case in this range.',
}

const PICK_IDS = [
  'osaki-os-pro-admiral-ii',
  'kyota-genki-m380',
  'panasonic-maf1',
  'titan-pro-vigor-4d',
  'amamedics-hilux-4d',
  'sharper-image-relieve-3d',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-pro-admiral-ii': {
    label: 'Best overall under $3,000',
    why: "The Admiral II is the strongest chair in the under-$3,000 range on pure therapeutic specs. A 49-inch SL-track (longest in the tier), 3D rollers with adjustable depth, body scanning, 2-inch wall clearance, and confirmed 5'2\" to 6'1\", 270 lbs. It earns a spot on this page because it competes on specs with chairs at nearly double its price.",
  },
  'kyota-genki-m380': {
    label: 'Best for tall or heavier builds',
    why: "The Genki M380 is confirmed for buyers up to 6'5\" and 330 lbs, the highest capacity in this price range with a Plus Size Confirmed designation. L-track covers the glutes and thighs. A Wirecutter Top Pick for 2024. At $2,999, it is the most affordable chair in the catalog with a high-capacity verification. For buyers whose dimensions exceed what the Admiral II can confirm, this is the pick.",
  },
  'panasonic-maf1': {
    label: 'Best for neck and upper-back focus',
    why: "The Panasonic MAF1 is the S-track specialist in this range at $5,999, just above the $5,000 ceiling. S-track focuses the entire roller path on the neck and upper back. 4D rollers, infrared-heated massage heads, confirmed 4'8\" to 6'2\" and 264 lbs, space-saving recline. Note: no zero gravity. For buyers whose pain is strictly in the cervical and thoracic spine, an S-track at this price delivers more focused technique than an SL-track covering the full spine at similar cost.",
  },
  'titan-pro-vigor-4d': {
    label: 'Best SL-track 4D near this budget',
    why: "The Titan Pro-Vigor 4D is a 4D SL-track chair at $5,999, just above the $5,000 ceiling. It is the most affordable 4D SL-track option in the catalog. 4D rollers vary speed and depth within each stroke, a step beyond the fixed-depth 3D mechanisms in the mid-tier. Two-stage zero gravity, heated rollers, calf and foot massage, full-body stretch, body scanning, space-saving 3.9-inch wall clearance. Confirmed 5'0\" to 6'2\", 260 lbs.",
  },
  'amamedics-hilux-4d': {
    label: 'Best SL-track 4D, widest body fit',
    why: "The Hilux 4D has the widest confirmed height range at this price tier (4'11\" to 6'7\") and a 53-inch track, one of the longer SL-track systems in the catalog. The 4D roller varies speed and depth within each stroke. A distinctive feature: the rollers themselves are heated, meaning heat follows the roller path throughout the session rather than staying fixed at the lumbar. For buyers who need SL-track coverage with 4D quality and want confidence the chair fits their height, this is the pick.",
  },
  'sharper-image-relieve-3d': {
    label: 'L-track 3D at $4,499',
    why: "The Sharper Image Relieve 3D is an L-track chair with 3D rollers, zero gravity, heat, and foot massage at $4,499. L-track extends under the glutes and into the thighs, adding lower-body coverage that SL-track chairs in this tier do not reach as deeply. 3D rollers allow pressure depth adjustment. Sold through Massage Chair Warehouse. No confirmed height or weight capacity data from the retailer spec page.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestUnder5000Page() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $5,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The under-$5,000 range spans the mid-tier at its peak, including the strongest 3D SL-track chairs below $3,000 and the first 4D options just above. The five chairs below reflect the best picks across this full range by use case rather than price point alone. Note that two of the picks (Panasonic MAF1 and Titan Pro-Vigor 4D) are priced at $5,999, just above the ceiling, but they are included because no comparable options exist at exactly $5,000 in these use cases.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. For a focused view by price tier, see the{' '}
        <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">under-$3,000 page</Link>{' '}
        and the{' '}
        <Link href="/best/3000-to-5000" className="text-bronze hover:text-gold transition-colors">$3,000 to $5,000 page</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What you get across this range</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          At $1,299 to $2,999, the catalog offers strong 3D SL-track options with confirmed body fit data and body scanning at the top of the range. At $4,999, SL-track 3D with 1-inch wall clearance becomes available. At $5,999, 4D roller quality enters the picture for both SL-track full-coverage and S-track upper-body focus.
        </p>
        <p className="text-charcoal leading-relaxed">
          The most common question in this range is whether to spend $2,999 on the Admiral II or stretch to $5,999 for 4D. The answer depends on whether variable roller speed and depth makes a functional difference for your specific pain pattern. For buyers with chronic, deep muscle tension, 4D is a meaningful step up. For buyers who are new to massage chairs or have sensitive backs, 3D with adjustable depth at $2,999 is a sound starting point.
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
          If lower back pain is the primary concern, the Admiral II (SL-track, 3D, $2,999) or the Hilux 4D (SL-track, 4D, $4,999) are the two picks depending on whether roller sophistication justifies the additional spend for your situation. If neck and upper back is the primary concern, the MAF1&apos;s S-track 4D setup is the specialist pick.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For buyers with height above 6&apos;1&quot; or weight above 270 lbs, the Genki M380 (up to 6&apos;5&quot;, 330 lbs) or Hilux 4D (up to 6&apos;7&quot;) are the confirmed-fit options in this range.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">premium tier ($5,000+)</Link>{' '}
          adds more 4D options and wider body fit confirmations. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          narrows by pain pattern, body fit, and budget together.
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
