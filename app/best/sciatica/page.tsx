import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Sciatica (2026)',
  description: 'The best massage chairs for sciatica are L-track and SL-track models that reach the glutes and sacral area directly. Five chairs selected for track coverage, roller quality, and verified body fit.',
}

const PICK_IDS = [
  'osaki-os-champ',
  'kahuna-lm-6800s',
  'osaki-os-pro-admiral-ii',
  'ogawa-active-xl',
  'jpmedics-kumo-4d',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-champ': {
    label: 'Best entry option',
    why: 'The OS-Champ is the lowest-priced SL-track chair in the catalog at $1,299. It covers the full spine and extends under the glutes, the essential requirement for sciatic relief, with 2D rollers and two-stage zero gravity. Space-saving recline (9-inch wall clearance) makes it workable in most rooms. For buyers who want SL-track coverage without crossing into the $2,000 range, this is the straightforward pick.',
  },
  'kahuna-lm-6800s': {
    label: 'Best at $2,500',
    why: "The LM-6800S uses a 45-inch SL-track with three-stage zero gravity, more decompression positions than most chairs at this price. Each zero gravity stage redistributes body weight forward, reducing lumbar and sacral compression. Confirmed for buyers 5'0\" to 6'0\" and up to 200 lbs. For buyers within that range who want more thorough spinal decompression alongside glute coverage, this outperforms the OS-Champ.",
  },
  'osaki-os-pro-admiral-ii': {
    label: 'Best at $3,000',
    why: "The Admiral II has the longest track in this price range at 49 inches, meaning the SL-track extension reaches further under the glutes than most comparably priced chairs. The 3D roller system allows adjustable pressure depth, important for sciatica buyers who need to start with lighter pressure and increase over time as sensitivity decreases. Body scanning positions the rollers to the individual's spine before each session. Confirmed 5'2\" to 6'1\", 270 lbs.",
  },
  'ogawa-active-xl': {
    label: 'Best for larger and taller frames',
    why: "The Active XL 3D is the right pick for buyers who are taller or heavier and need to confirm the SL-track roller will actually reach their glutes. Confirmed for 5'0\" to 6'4\" and up to 320 lbs, the widest confirmed range of any SL-track chair in this catalog. Taller buyers often find that standard SL-track chairs run out of track before the roller reaches the glute mass. The Active XL is engineered to avoid that problem.",
  },
  'jpmedics-kumo-4d': {
    label: 'Premium pick',
    why: 'The Kumo 4D uses an L-track rather than SL-track, but its under-seat extension reaches deeper into the thigh than most SL-track designs. For buyers whose sciatica pain extends into the hamstrings, that extra lower-body reach can matter more than upper-back coverage. The 4D roller mechanism varies speed and depth within each stroke, producing a more nuanced glute and lumbar massage than fixed-depth rollers. Made in Japan, 320 lb capacity.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestSciaticaPage() {
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
      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Sciatica</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Sciatica pain originates in the lumbar spine and radiates through the sciatic nerve into the glutes, back of the thighs, and sometimes the feet. A massage chair addresses sciatica when it can reach the glutes and sacral area directly. That requires an L-track or SL-track roller mechanism. Chairs with an S-track roller stop at the lower lumbar and cannot reach the area where sciatic compression typically originates.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. All five chairs below are L-track or SL-track, with verified height and weight compatibility ranges where available.
      </p>

      {/* Why track type matters */}
      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">
          Why track type is the primary filter for sciatica
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          The sciatic nerve exits the lumbar spine and runs beneath the piriformis muscle in the glutes. Tension in the piriformis, or inflammation at the sacral level, is a common trigger for sciatic pain. Massage chairs that reach the glutes apply direct, repeated pressure to the muscles involved. S-track chairs stop at the lumbar and cannot access this area at all.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Between L-track and SL-track, the difference is upper-back coverage. L-track chairs extend well under the glutes and into the thighs, but some L-track designs reduce upper-shoulder reach to accommodate the longer lower extension. SL-track chairs maintain full spine coverage from the neck through the lumbar and into the glutes. For buyers with pain across both the upper back and the lower body, SL-track is the better fit. For buyers whose primary concern is the glutes and lower back only, L-track chairs can be equally effective and sometimes more affordable at equivalent roller quality.
        </p>
        <p className="text-charcoal leading-relaxed">
          Zero gravity positioning amplifies the effect. When the chair reclines into zero gravity, body weight distributes forward, reducing compression on the lumbar discs and sacral joints. The roller reaches the decompressed spine more effectively than in an upright seated position. All five chairs below include zero gravity.
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
              {/* Pick label + name */}
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                  {i + 1}. {editorial?.label}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Image */}
                {chair.goodwinImageUrl && (
                  <div className="flex-shrink-0 w-full sm:w-36 h-36 bg-white border border-sand rounded-lg overflow-hidden">
                    <img
                      src={chair.goodwinImageUrl}
                      alt={chair.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-serif font-semibold text-navy mb-1">
                    <Link href={`/chairs/${chair.id}`} className="hover:text-gold transition-colors">
                      {chair.name}
                    </Link>
                  </h3>
                  <p className="text-charcoal font-semibold text-sm mb-3">{priceLabel}</p>

                  {/* Feature pills */}
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
                  </div>

                  {/* Editorial */}
                  <p className="text-charcoal text-base leading-relaxed mb-4">
                    {editorial?.why}
                  </p>

                  {/* Specs row */}
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

                  {/* CTAs */}
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
          The right chair depends on your height, weight, and where the pain actually concentrates. If your sciatica primarily involves the glutes and upper hamstrings with little upper-back involvement, the JPMedics Kumo 4D&apos;s L-track extension may outperform an SL-track chair for your specific situation. If you also have significant neck or upper-back tension, SL-track is the stronger choice.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Weight capacity matters more for sciatica buyers than many realize. A chair operating near its weight limit often delivers less effective massage because the roller mechanism cannot achieve full depth. If your weight is within 30 lbs of a chair&apos;s listed capacity, consider the next tier up.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">
            track types guide
          </Link>{' '}
          covers the S, L, and SL-track decision in detail. The{' '}
          <Link href="/learn/how-to-buy" className="text-bronze hover:text-gold transition-colors">
            full buying guide
          </Link>{' '}
          walks through every decision in sequence, including how to match roller pressure to your sensitivity level. The{' '}
          <Link href="/learn/sl-track" className="text-bronze hover:text-gold transition-colors">
            SL-track glossary entry
          </Link>{' '}
          explains exactly how the roller path works and when to choose SL over L. If you want a direct recommendation based on your situation, the{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">
            chair finder
          </Link>{' '}
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
