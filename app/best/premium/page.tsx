import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Premium Massage Chairs Over $5,000 (2026)',
  description: 'Above $5,000, massage chairs differentiate by roller sophistication, confirmed body fit range, and warranty coverage. Five chairs selected from $5,999 to $13,490 across distinct use cases.',
}

const PICK_IDS = [
  'titan-pro-vigor-4d',
  'infinity-imperial-syner-d',
  'jpmedics-kumo-4d',
  'daiwa-legacy-4',
  'osaki-os-pro-maestro-le',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'titan-pro-vigor-4d': {
    label: 'Best entry premium, SL-track 4D',
    why: "The Titan Pro-Vigor 4D is the entry point for SL-track 4D roller quality in the premium tier at $5,999. 4D rollers vary speed and depth within each stroke, a step beyond the fixed-depth 3D mechanisms in the mid-tier. Two-stage zero gravity, heated rollers, calf and foot massage, full-body stretch, space-saving 3.9-inch wall clearance, body scanning. Confirmed 5'0\" to 6'2\", 260 lbs. For buyers who want 4D roller quality and full-spine coverage without crossing into the $7,000 range, this is where the premium catalog starts.",
  },
  'infinity-imperial-syner-d': {
    label: 'Best Flex-track, widest height range',
    why: "The Syner-D uses a Flex-track mechanism, a hybrid between SL and L-track that adjusts its coverage range between programs. Confirmed for 5'2\" to 6'6\", one of the widest height ranges in this catalog. 4D rollers, space-saving 2-inch wall clearance, 5-year warranty, body scanning, 300 lbs. Price varies by retailer; confirmed range is $8,000 to $12,000.",
  },
  'jpmedics-kumo-4d': {
    label: 'Best for lower body focus, made in Japan',
    why: "The Kumo 4D is an L-track chair with 4D rollers, made in Japan, confirmed at 320 lbs. For buyers whose primary pain is in the lower back, glutes, and hamstrings, an L-track with 4D roller depth delivers more focused coverage of that zone than a longer SL-track at the same price. Made in Japan typically correlates with stricter manufacturing tolerances at this tier. Up to 6'3\".",
  },
  'daiwa-legacy-4': {
    label: 'Best for tall buyers who need L-track',
    why: "The Legacy 4 has a 49-inch L-track confirmed from 4'8\" to 6'6\", space-saving 3.25-inch wall clearance, two-stage zero gravity, and body scanning. For buyers taller than 6'3\" who need a well-confirmed body fit, this is the chair in this price range. 3D rollers, 300 lbs.",
  },
  'osaki-os-pro-maestro-le': {
    label: 'Best premium SL-track with body scanning',
    why: "The Maestro LE delivers SL-track, 4D rollers, and body scanning at $8,999. Space-saving 5-inch wall clearance. Body scanning positions the roller precisely at the cervical vertebrae before each session, which matters more at 4D speeds where roller placement errors are amplified. For buyers who want 4D coverage accuracy across the full spine, this is the pick. 260 lb capacity, confirmed 5'2\" to 6'1\".",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestPremiumPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Premium Massage Chairs ($5,000 and above)</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Above $5,000, the massage chair category differentiates primarily by roller sophistication, body fit confirmation, and build longevity rather than track coverage. Most premium chairs are SL-track, L-track, or Flex-track, and all include zero gravity. The meaningful questions at this tier are which roller mechanism, how well-confirmed is the body fit, and what the warranty actually covers.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. For the highest-tier chairs above $10,000, see the full{' '}
        <Link href="/chairs" className="text-bronze hover:text-gold transition-colors">chair catalog</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How to evaluate premium chairs</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          At this price tier, three things are worth checking before committing. First, confirmed body fit: is the height and weight range from the retailer&apos;s own specification sheet, or just a general claim? Chairs confirmed from retailer data are noted below. Second, roller dimension: 3D rollers adjust depth; 4D rollers add variable speed and rhythm. Beyond 4D, claims of &quot;5D&quot; or &quot;AI-driven&quot; rollers are mostly marketing. Third, warranty: most premium chairs carry 3 to 5 years on parts and labor. Anything shorter at this price is worth asking about.
        </p>
        <p className="text-charcoal leading-relaxed">
          One distinction buyers often miss: L-track and SL-track chairs perform differently for lower-body coverage at equivalent price points. An L-track chair at $8,499 with 4D rollers often delivers more nuanced glute and hamstring massage than an SL-track chair at the same price, because the L-track mechanism can focus more of its design budget on the lower body zone. If your primary pain is lower back and glutes with minimal upper-back involvement, L-track is worth considering even in the premium tier.
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
          If full-spine coverage matters (neck through glutes), the Titan Pro-Vigor 4D at $5,999 is the entry point, and the Maestro LE at $8,999 adds body scanning accuracy at the higher end. If lower back and glute focus is the priority, the Kumo 4D&apos;s L-track 4D combination is more targeted.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If you are above 6&apos;3&quot; and in the premium tier, the Daiwa Legacy 4 is confirmed to 6&apos;6&quot; and the Syner-D to 6&apos;6&quot; as well. Both are the right options for tall buyers at this tier.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/how-to-buy" className="text-bronze hover:text-gold transition-colors">full buying guide</Link>{' '}
          covers how to assess warranty quality and what to look for in retailer service policies. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          surfaces premium options when budget allows and filters by pain pattern and body fit.
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
