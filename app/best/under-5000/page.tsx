import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs Under $5,000 (2026)',
  description: 'The best massage chairs under $5,000 span entry SL-track 3D chairs at $2,999 to 4D SL-track models with the widest confirmed body fit in the catalog. Five picks across distinct buyer profiles.',
}

const PICK_IDS = [
  'osaki-os-pro-admiral-ii',
  'kyota-genki-m380',
  'kahuna-lm-6800',
  'synca-jp970',
  'amamedics-hilux-4d',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-pro-admiral-ii': {
    label: 'Best value under $5,000',
    why: "The Admiral II is the strongest value pick in the full under-$5,000 range. At $2,999 it delivers SL-track coverage, a 49-inch track length (the longest SL-track at this price), 3D rollers with adjustable depth, body scanning, and space-saving recline at 2-inch wall clearance. Weight capacity is 270 lbs. Body fit is confirmed 5'2\" to 6'1\". For buyers in that range whose primary goal is SL-track coverage with genuine pressure control, no chair in this budget does more for the money.",
  },
  'kyota-genki-m380': {
    label: 'Best for buyers over 265 lbs or 6\'2\"',
    why: "Most chairs under $5,000 cap out at 265 to 270 lbs and 6'1\" to 6'2\". The Genki M380 is confirmed to 330 lbs and up to 6'5\", which makes it the right starting point for heavier-framed or taller buyers who can't confirm fit on standard chairs. L-track coverage extends under the glutes. The 2D roller system delivers a consistent stroke without depth control, which suits buyers who want firm, even pressure rather than variable intensity. Heat therapy and two-stage zero gravity are confirmed. At $2,999, it is the most affordable heavy-duty pick in the catalog.",
  },
  'kahuna-lm-6800': {
    label: 'Best L-track for sciatica at $3,799',
    why: "The LM-6800 is the original Kahuna L-track model. Its 45-inch track extends under the glutes and into the thighs, making it the right choice for buyers whose lower back pain radiates into the hips or legs rather than staying localized in the lumbar. Two-stage zero gravity and 3-inch space-saving wall clearance. Body fit is confirmed 5'0\" to 6'0\", weight limit 200 lbs. Buyers above either limit should look at the Kyota Genki above. The 2D rollers deliver a consistent stroke. For buyers who want L-track glute coverage at the lowest available price, this is the pick.",
  },
  'synca-jp970': {
    label: 'Best for neck and upper back focus',
    why: "The JP970 is the only S-track chair on this list, and the choice is deliberate. S-track channels the full roller path through the cervical and thoracic spine rather than extending it under the seat. For buyers whose primary pain is neck tension, shoulder tightness, or upper thoracic stiffness from desk work, that concentrated upper-body coverage outperforms an SL-track chair that divides attention across a longer path. 4D rollers add variable speed and rhythm, approximating a therapist's cadence. Body scanning confirms fit before each session. Confirmed 5'0\" to 6'3\", 285 lbs. If lower back pain is part of the picture alongside neck pain, the Hilux below is a better fit.",
  },
  'amamedics-hilux-4d': {
    label: 'Best overall under $5,000',
    why: "The Hilux 4D is the headline pick in this price range for most buyers. It has the widest confirmed body fit in the catalog at 4'11\" to 6'7\", which means buyers who cannot confirm fit on standard chairs can start here. The 53-inch SL-track is the longest in the catalog, extending further under the glutes and hamstrings than any other chair under $8,000. 4D rollers add variable speed and rhythm to adjustable depth pressure. A distinctive feature: the rollers themselves are heated, not just a separate lumbar pad, so heat follows the massage path throughout the session rather than applying only to the stationary lower back. For buyers who want the most complete chair available under $5,000, this is it.",
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

      {/* Breadcrumb */}
      <div className="mb-4">
        <Link href="/best" className="text-bronze hover:text-gold text-sm">
          &larr; Best chairs by use case
        </Link>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $5,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The $5,000 ceiling is one of the most competitive ranges in the massage chair category. It is where SL-track chairs first gain 4D rollers, where body fit ranges start extending to buyers outside the standard 5'2\" to 6'1\" window, and where the longest track lengths in the mid-tier appear. A buyer who spends $4,999 thoughtfully gets a chair that performs meaningfully above one chosen without guidance at the same price.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. Five picks across distinct buyer profiles: overall value, heavy-duty fit, sciatica, neck and shoulder focus, and best overall. Chairs on this list range from $2,999 to $4,999.
      </p>

      {/* Budget context box */}
      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">
          What actually changes as you move up the budget
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          The three meaningful inflection points in the under-$5,000 range are at $2,999, $3,799, and $4,999.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          At $2,999, the SL-track plus 3D roller combination first appears. Below this price point, SL-track chairs generally have 2D rollers — a fixed-depth stroke with no pressure adjustment. The Osaki Admiral II at $2,999 is where that changes.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          At $3,799, the L-track range offers good glute and hamstring coverage for buyers whose pain is specifically in the lower back and hips, without paying for the full SL-track premium. The Kahuna LM-6800 sits at this level.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          At $4,999, two significant upgrades appear: 4D rollers and the widest confirmed body fit ranges in the catalog. The AmaMedics Hilux 4D combines SL-track, 4D rollers, heated roller path, and a 4'11\" to 6'7\" fit range at the top of this budget. The Synca JP970 offers 4D in an S-track configuration for buyers focused on neck and upper back relief.
        </p>
        <p className="text-charcoal leading-relaxed">
          The jump to $6,000 and above adds features like voice control, extended warranties, and premium brand finishes. The therapeutic core — track coverage, roller type, zero gravity — is fully available under $5,000.
        </p>
      </div>

      {/* Comparison table */}
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
                    <td className="py-3 pr-5 text-charcoal">${chair.priceMin.toLocaleString()}</td>
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

      {/* Chair picks */}
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
                    <img
                      src={chair.goodwinImageUrl}
                      alt={chair.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-serif font-semibold text-navy mb-1">
                    <Link href={`/chairs/${chair.id}`} className="hover:text-gold transition-colors">
                      {chair.name}
                    </Link>
                  </h3>
                  <p className="text-charcoal font-semibold text-sm mb-3">{priceLabel}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">
                      {chair.track}-Track
                    </span>
                    <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                      {chair.roller}
                    </span>
                    {chair.zeroGravity && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        {chair.zeroGravityStages ? `ZG ${chair.zeroGravityStages}-stage` : 'Zero Gravity'}
                      </span>
                    )}
                    {chair.aiScanning && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        Body Scan
                      </span>
                    )}
                    {chair.heat && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        Heat
                      </span>
                    )}
                    {chair.spaceSaving && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        Space-Saving
                      </span>
                    )}
                  </div>

                  <p className="text-charcoal text-base leading-relaxed mb-4">
                    {editorial?.why}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    {heightRange && (
                      <span className="text-xs text-warm-gray">Height: {heightRange}</span>
                    )}
                    {chair.weightCapacityLbs && (
                      <span className="text-xs text-warm-gray">Capacity: {chair.weightCapacityLbs} lbs</span>
                    )}
                    {chair.trackLengthIn && (
                      <span className="text-xs text-warm-gray">Track: {chair.trackLengthIn}&#34;</span>
                    )}
                    {chair.wallClearanceIn && (
                      <span className="text-xs text-warm-gray">Wall clearance: {chair.wallClearanceIn}&#34;</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {chair.affiliateUrl && (
                      <a
                        href={chair.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="border border-gold text-gold hover:bg-gold hover:text-white text-sm font-semibold px-5 py-2 rounded transition-colors"
                      >
                        Shop this chair
                      </a>
                    )}
                    <Link
                      href={`/chairs/${chair.id}`}
                      className="text-sm text-bronze hover:text-gold transition-colors"
                    >
                      Full review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Editorial close */}
      <div className="bg-white border border-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How to narrow from here</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Track type is the first decision. If your pain is primarily in the neck, upper back, or shoulders, the Synca JP970 S-track is built for that. If your lower back pain radiates into the hips, glutes, or legs, you need L-track or SL-track coverage. The{' '}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">
            track types guide
          </Link>{' '}
          explains the difference in detail with pain-location recommendations.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Body fit is the second check. Confirm your height against the stated range before shortlisting. Buyers outside the standard 5'2\" to 6'1\" window should start with the AmaMedics Hilux 4D (4'11\" to 6'7\") or the Kyota Genki M380 (up to 6'5\", up to 330 lbs). The{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">
            body fit guide
          </Link>{' '}
          covers height ranges, weight limits, and petite and tall fit considerations for every chair type.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If budget is flexible and you want to see what additional spending adds above $5,000, the{' '}
          <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">
            premium picks page
          </Link>{' '}
          covers $6,000 and above. The therapeutic core is available at $5,000. The premium tier adds voice control, medical-grade engineering, and extended warranty coverage.
        </p>
        <p className="text-charcoal leading-relaxed">
          Still unsure which chair fits your pain profile and body dimensions?{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">
            The chair finder
          </Link>{' '}
          walks through track type, body fit, pressure preference, and room size and surfaces a recommendation in about three minutes.
        </p>
      </div>

      {/* Related */}
      <div className="border-t border-sand pt-8">
        <p className="text-sm text-warm-gray mb-3">Related collections</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/best/under-3000" className="text-sm text-bronze hover:text-gold transition-colors">Best under $3,000</Link>
          <span className="text-warm-gray text-sm">&middot;</span>
          <Link href="/best/3000-to-5000" className="text-sm text-bronze hover:text-gold transition-colors">Best $3,000 to $5,000</Link>
          <span className="text-warm-gray text-sm">&middot;</span>
          <Link href="/best/lower-back-pain" className="text-sm text-bronze hover:text-gold transition-colors">Best for lower back pain</Link>
          <span className="text-warm-gray text-sm">&middot;</span>
          <Link href="/best/sciatica" className="text-sm text-bronze hover:text-gold transition-colors">Best for sciatica</Link>
          <span className="text-warm-gray text-sm">&middot;</span>
          <Link href="/best/premium" className="text-sm text-bronze hover:text-gold transition-colors">Premium picks</Link>
        </div>
      </div>

    </div>
  )
}
