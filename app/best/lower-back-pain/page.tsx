import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Lower Back Pain (2026)',
  description: 'The best massage chairs for lower back pain use SL-track rollers that cover the lumbar spine, sacrum, and glutes in one continuous path. Five chairs selected across every budget from $1,299 to $8,999.',
}

const PICK_IDS = [
  'amamedics-renew-3d',
  'osaki-os-pro-admiral-ii',
  'amamedics-hilux-4d',
  'titan-pro-vigor-4d',
  'osaki-os-pro-maestro-le',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'amamedics-renew-3d': {
    label: 'Best entry option',
    why: 'Most chairs at $1,299 pair SL-track coverage with 2D rollers, which cannot vary their pressure depth. The Renew 3D is one of the few entry chairs with genuine 3D roller capability, meaning adjustable pressure depth. For lower back buyers whose pain responds better to firmer pressure, that adjustment matters. Three-stage zero gravity, space-saving recline (4-inch wall clearance), body scanning, and lumbar heat are all confirmed from the retailer page. Currently available as a clearance model.',
  },

  'osaki-os-pro-admiral-ii': {
    label: 'Best at $3,000',
    why: "The Admiral II has a 49-inch track, the longest SL-track in its price range. The additional length means the roller extends further under the glutes than shorter designs. For lower back pain cases with any sacral or glute involvement, that extra coverage matters. Body scanning positions the rollers to the individual's spinal curve before each session. The 3D roller system allows pressure adjustment from light to firm. Confirmed 5'2\" to 6'1\", 270 lbs.",
  },

  'amamedics-hilux-4d': {
    label: 'Best for wide body fit, 4D at mid-range',
    why: "The Hilux 4D has the widest confirmed height range in the catalog at 4'11\" to 6'7\", which matters for lower back buyers who need to confirm the 53-inch roller track will reach their specific lumbar anatomy. The 4D roller adds variable speed and rhythm to each stroke, producing a more nuanced feel than fixed-speed 3D rollers. A distinctive feature: the rollers themselves are heated on this chair, not just a separate lumbar pad, which allows heat to follow the roller path throughout the session.",
  },

  'titan-pro-vigor-4d': {
    label: 'Best at $6,000, 4D roller',
    why: 'The Pro-Vigor 4D is the most affordable 4D SL-track chair in the catalog at $5,999. The 4D roller mechanism varies speed and depth within each stroke, a step up from the fixed-depth 3D rollers common at this price tier. Two-stage zero gravity, space-saving 3.9-inch wall clearance. Heat, calf, foot, and stretch programs are all confirmed. For lower back buyers who want 4D roller quality without crossing into the $8,000 range, this is the pick.',
  },

  'osaki-os-pro-maestro-le': {
    label: 'Best premium SL-track',
    why: 'The Maestro LE is a 4D SL-track chair with body scanning, lumbar heat, and space-saving 5-inch wall clearance at $8,999. The 4D roller system varies both depth and speed across the full spine-to-glute SL-track path. For lower back buyers who want the complete combination of premium roller quality and confirmed full-coverage SL-track without crossing into the $10,000 range, this is the pick. 260 lb capacity.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestLowerBackPainPage() {
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
      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Lower Back Pain</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Chronic lower back pain is the primary reason most massage chair buyers start researching. It typically involves the lumbar vertebrae, the sacroiliac joint, and the surrounding musculature. All three respond to the kind of sustained, repeated pressure a quality massage chair delivers across multiple daily sessions. SL-track is the right starting point for most lower back pain cases because the lumbar region connects directly to the sacrum, and sacral tension is often part of the picture even when buyers describe the pain as strictly lower back.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. If your lower back pain radiates into the glutes, thighs, or feet, see the{' '}
        <Link href="/best/sciatica" className="text-bronze hover:text-gold transition-colors">
          best chairs for sciatica
        </Link>{'  '}
        instead. All five chairs below are SL-track with zero gravity.
      </p>

      {/* Why SL-track and zero gravity */}
      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">
          What actually helps lower back pain in a massage chair
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Two things matter most for lower back relief: track coverage and zero gravity positioning.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Track coverage determines where the rollers can reach. S-track chairs follow the spine from the neck to the lumbar, then stop. For upper-back and neck tension, that is sufficient. For lower back pain, the lumbar-sacral junction and the glutes are usually involved, and an S-track roller cannot reach them. SL-track chairs extend the roller path under the seat and into the glutes, covering the full problem zone in one continuous pass.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Zero gravity reclines the chair so the knees rise to roughly heart level. This distributes body weight across the backrest instead of concentrating it at the base of the spine. The lumbar discs decompress. The roller reaches a spine that is under less load, which allows deeper tissue contact with less discomfort. For buyers with significant disc involvement in their lower back pain, zero gravity is not optional.
        </p>
        <p className="text-charcoal leading-relaxed">
          A note on pressure: most massage chair returns happen because the massage is too rough, not too light. Lower back pain can make the lumbar area sensitive. All five chairs below have adjustable pressure, and most buyers start at the lightest setting and increase over weeks rather than sessions.
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
                  ? `${fmtFt(chair.heightMinIn)} -- ${fmtFt(chair.heightMaxIn)}`
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
            ? `$${chair.priceMin.toLocaleString()} -- $${chair.priceMax.toLocaleString()}`
            : `$${chair.priceMin.toLocaleString()}`
          const heightRange = chair.heightMinIn && chair.heightMaxIn
            ? `${fmtFt(chair.heightMinIn)} -- ${fmtFt(chair.heightMaxIn)}`
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
                    <img
                      src={chair.goodwinImageUrl || chair.imageUrl}
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
                      <span className="text-xs text-warm-gray">Track: {chair.trackLengthIn}&quot;</span>
                    )}
                    {chair.wallClearanceIn && (
                      <span className="text-xs text-warm-gray">Wall clearance: {chair.wallClearanceIn}&quot;</span>
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
          If your lower back pain also radiates into the glutes, back of the thighs, or legs, that is sciatic involvement and you should read the{'  '}
          <Link href="/best/sciatica" className="text-bronze hover:text-gold transition-colors">
            best chairs for sciatica
          </Link>{'  '}
          instead. That page uses the same SL-track requirement but pays more attention to under-seat extension depth and thigh reach.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If your lower back is sensitive and you are unsure whether you want firm or gentle pressure, start at entry level and adjust upward. The 3D and 4D roller picks above all have pressure controls. Most buyers with chronic lower back pain find they need a lighter setting than they expect for the first few weeks, then increase once the area has adapted.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{'  '}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">
            track types guide
          </Link>{'  '}
          explains the S, L, and SL-track decision with body diagrams. The{'  '}
          <Link href="/learn/zero-gravity" className="text-bronze hover:text-gold transition-colors">
            zero gravity guide
          </Link>{'  '}
          covers how decompression positioning works and what to look for across different recline stages. To see all available chairs filtered by price and specs, the{'  '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">
            chair finder
          </Link>{'  '}
          takes about three minutes.
        </p>
      </div>

      {/* CTA block */}
      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">
          Answer a few questions about your pain, body, and space. The finder narrows to the right chair.
        </p>
        <Link href="/finder" className="btn-primary inline-block">
          Find My Chair
        </Link>
      </div>

    </div>
  )
}
