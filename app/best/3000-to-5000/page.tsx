import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs $3,000 to $5,000 (2026)',
  description: 'The $3,000 to $5,000 range offers 4D rollers, S-track specialist options, and the widest confirmed body fit ranges in the mid-tier. Four chairs selected across distinct use cases.',
}

const PICK_IDS = [
  'kyota-genki-m380',
  'panasonic-maf1',
  'amamedics-hilux-4d',
  'titan-3d-prestige',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'kyota-genki-m380': {
    label: 'Best L-track entry for this tier',
    why: "The Genki M380 is technically a $2,999 chair, sitting just under this range, but it earns its spot here for buyers who are primarily choosing on capacity and L-track coverage rather than roller sophistication. Confirmed 6'5\" and 330 lbs with a Plus Size Confirmed designation, a Wirecutter Top Pick for 2024. L-track reaches under the glutes and into the thighs. 2D rollers. For buyers who want confirmed high-capacity L-track coverage and a reliable retailer at or near this price tier, this is the starting pick.",
  },
  'panasonic-maf1': {
    label: 'Best S-track for neck and upper-back focus',
    why: "The Panasonic MAF1 is the S-track specialist recommendation in this range at $5,999. S-track focuses the entire roller path on the cervical spine and thoracic vertebrae, which is the right design when pain is concentrated in the neck and upper back with no lower-back involvement. 4D rollers, infrared-heated massage heads, confirmed 4'8\" to 6'2\" and 264 lbs, space-saving recline. Note: no zero gravity. Panasonic's engineering prioritizes roller precision over recline positions. This replaces the Synca JP970 as the S-track specialist recommendation at this tier.",
  },
  'amamedics-hilux-4d': {
    label: 'Best SL-track 4D, widest body fit',
    why: "The Hilux 4D has the widest confirmed height range at this price tier (4'11\" to 6'7\") and a 53-inch track, one of the longer SL-track systems in the catalog. The 4D roller varies speed and depth within each stroke. A distinctive feature: the rollers themselves are heated, meaning heat follows the roller path throughout the session rather than staying fixed at the lumbar. For buyers who need SL-track coverage with 4D quality and want confidence the chair fits their height, this is the pick.",
  },
  'titan-3d-prestige': {
    label: 'Best for small spaces',
    why: "The Titan 3D Prestige has 1-inch wall clearance, the tightest in the SL-track category at this price. For buyers in this range whose primary constraint is room size, the Prestige is the only SL-track 3D chair at $4,999 that can sit flush against a wall. Full-body stretch and heat confirmed. Up to 6'3\", 260 lbs.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function Best3000To5000Page() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs: $3,000 to $5,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The $3,000 to $5,000 range is where the catalog diverges by use case. For L-track coverage at high body capacity, the Kyota Genki M380 sits at the entry of this tier. At $4,999 and $5,999 you have two distinct options: a 4D SL-track chair with the widest confirmed height range in this tier, an S-track specialist for neck and upper-back focus, and a 3D SL-track with 1-inch wall clearance. The right pick depends entirely on your pain pattern and room constraints.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. Note: the Osaki OS-Pro Admiral II at $2,999 remains one of the most competitive chairs in the full catalog. If your budget is flexible downward, it is worth considering alongside these picks. See the{' '}
        <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">under-$3,000 page</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What this tier adds over the under-$3,000 range</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          The $3,000 to $5,000 range introduces 4D rollers, which add variable speed and rhythm to each stroke rather than fixed-speed 3D motion. For buyers with chronic tension who have found lower-tier chairs feel repetitive or mechanical, 4D is a meaningful upgrade. It is also the tier where specialist options appear: a dedicated S-track chair optimized for neck and upper-back work, and chairs with the widest confirmed height ranges in the mid-tier catalog.
        </p>
        <p className="text-charcoal leading-relaxed">
          The trade-off compared to the Admiral II at $2,999 is primarily value density. The Admiral II has strong confirmed body fit data and a 49-inch track at a lower price. The chairs above justify the additional spend through roller sophistication, specialist track types, or extreme space-saving. If none of those features are your priority, the Admiral II remains the better value.
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
          If your pain is neck and shoulders only, the Panasonic MAF1 is the S-track specialist in this tier. If your pain spans the full back or is concentrated in the lower back, the Hilux 4D covers more ground with better roller quality. If room size is the constraint, the Titan Prestige is the only 1-inch wall clearance option in the SL-track category at this price.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For buyers above 6&apos;3&quot; or above 270 lbs, the Hilux 4D accommodates the widest range. Note that the Panasonic MAF1 does not include zero gravity, which is a trade-off worth confirming before purchasing.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">premium tier ($5,000+)</Link>{' '}
          is where additional roller sophistication and longer confirmed body fit ranges become available. The{' '}
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
