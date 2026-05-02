import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs Under $2,000 (2026)',
  description: 'Three chairs under $2,000, all with SL-track and zero gravity. Here is what you get at this price point, where the limits are, and when it is worth spending more.',
}

const PICK_IDS = [
  'osaki-os-champ',
  'synca-wellness-circ',
  'amamedics-renew-3d',
  'relaxonchair-rio',
  'relaxonchair-jasper',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-champ': {
    label: 'Entry SL-track, higher weight capacity',
    why: 'The OS-Champ is an SL-track chair with two-stage zero gravity, lumbar heat, foot and calf massage, and a 260-lb weight capacity at $1,299. The 9-inch wall clearance is larger than the Renew 3D and requires more room planning. For buyers who prioritize weight capacity or are between the two and want the more established model, this is the pick.',
  },
  'synca-wellness-circ': {
    label: 'Entry with 3D rollers and SL-track',
    why: 'The CirC is priced at $1,299 and uses a 3D roller mechanism on a 34-inch SL-track with zero gravity and lumbar heat. The 34-inch track is shorter than most SL-track chairs and suits average-height users best. 3D rollers allow pressure depth adjustment that 2D chairs at this price do not offer. For buyers who want roller control at the entry price point, this is the pick. Sold via syncamassagechair.com.',
  },
  'amamedics-renew-3d': {
    label: 'Entry with 3D rollers and tighter wall clearance',
    why: 'The Renew 3D costs the same as the OS-Champ but includes a 3D roller mechanism, meaning adjustable pressure depth. For buyers who expect their lower back to be sensitive and want more control over massage intensity, 3D rollers provide a wider adjustment range than 2D. Space-saving recline (4-inch wall clearance), three-stage zero gravity, body scanning, and lumbar heat are confirmed. Currently a clearance model. 250-lb weight capacity.',
  },
  'relaxonchair-rio': {
    label: 'Lowest-priced SL-track in the catalog',
    why: "The Relax On Chair RIO is an SL-track chair at $999 with zero gravity, lumbar heat, and foot rollers. At $999, it is the most affordable SL-track option in the catalog. Full-spine coverage from neck to glutes, zero gravity recline, heat, and foot massage are all confirmed at this price. 2D rollers are standard at this tier. No confirmed height or weight capacity data from the retailer spec page. For buyers who want SL-track coverage at the lowest available price, this is the starting point.",
  },
  'relaxonchair-jasper': {
    label: 'SL-track step-up at $1,599',
    why: "The Relax On Chair Jasper is an SL-track chair at $1,599 with zero gravity, lumbar heat, and foot rollers. The core specs match the RIO, with the Jasper positioned as a step up in build within the Relax On Chair line rather than a change in roller architecture. 2D rollers. No confirmed height or weight capacity data from the retailer spec page. For buyers whose budget lands between the $999 entry tier and the $1,999 range, this fills the mid-tier slot.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestUnder2000Page() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $2,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        There are two SL-track massage chairs in the catalog under $2,000, and both are priced at $1,299. At this price point, buyers can expect SL-track coverage, zero gravity, and basic airbag massage. What you are not paying for yet: adjustable roller depth (2D rollers are standard here), extended warranties, or body fit confirmation data.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. If your budget can stretch to $2,499, see the{' '}
        <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">under-$3,000 page</Link>{' '}
        for chairs with confirmed body fit data and stronger specs.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What $1,299 gets you, and where the limits are</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          At $1,299, you are paying for the roller mechanism, the SL-track system, and the zero gravity recline. Two things are typically absent at this tier: adjustable roller depth (2D rollers move in two axes but cannot vary how far they press into the back) and confirmed height and weight compatibility data from the retailer.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Massage intensity will be adjustable within a narrower range than mid-tier chairs. The pressure you experience on the first session may be stronger than expected. Most entry chair returns happen because the massage is too rough, not too light. Start at the lowest setting and adjust upward.
        </p>
        <p className="text-charcoal leading-relaxed">
          The 30-day in-home trial that most dealers offer matters more at this price than at any other tier. Confirm the return policy before purchasing.
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
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">The case for spending more</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Both chairs above are legitimate starting points. The gap between $1,299 and $2,499 is meaningful. The Kahuna LM-6800S at $2,499 adds confirmed body fit data (5'0&quot; to 6'0&quot;), three-stage zero gravity, a verified 45-inch track length, and a retailer with a stronger service record.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          At $2,999, the Osaki OS-Pro Admiral II adds 3D rollers, a 49-inch track, body scanning, and a 270-lb weight capacity. These are not marginal upgrades at the $1,299 starting point.
        </p>
        <p className="text-charcoal leading-relaxed">
          If the $1,299 price point is a hard limit, both chairs above are sound choices. If budget is the primary constraint but not absolute, the{' '}
          <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">under-$3,000 page</Link>{' '}
          shows what the additional spend makes possible. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes budget as a primary filter.
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
