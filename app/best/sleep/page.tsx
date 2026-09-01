import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/best/sleep" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/best/sleep"),
  title: 'Best Massage Chairs for Sleep (2026)',
  description: 'A massage chair does not sedate you. It removes the physical barriers to falling asleep. Five chairs selected for zero gravity, heat, foot and calf coverage, and the room fit that makes a nightly session realistic.',
}

const PICK_IDS = [
  'osaki-os-pro-yamato',
  'titan-pro-vigor-4d',
  'infinity-dynasty-4d',
  'kyota-konbi-m728-dualpro-4d',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-pro-yamato': {
    label: 'Best for a bedroom',
    why: 'At 4 inches of wall clearance and with the gentlest roller set in this group, the Yamato is built for the room the session should actually happen in. 2D rollers mean it cannot go deep, which for a pre-bed session is the correct trade: firm work raises arousal at exactly the moment you want it falling. Two-stage zero gravity, heat, stretch, body scanning, and full foot and calf coverage. Two limits to check before buying, both from the spec sheet: 220 lb capacity, the lowest here, and no confirmed fit for petite buyers.',
  },
  'titan-pro-vigor-4d': {
    label: 'Best all-rounder',
    why: 'This is the chair whose own buyer feedback makes the case: owners report that a daily habit forms within the first week, and that sleep quality and accumulated aches both improve with consistent nightly use. That is the exact pattern the sleep research describes, where the benefit comes from repetition rather than any single session. The spec set backs it up with SL-track, 4D rollers with real intensity control, two-stage zero gravity, heated rollers, stretch, and a 3.9 inch wall clearance. Confirmed from 5 feet to 6 foot 2. Buyers do note the lower back needs an adjustment period, so start gentle.',
  },
  'infinity-dynasty-4d': {
    label: 'Best body-fit range',
    why: 'The Dynasty 4D is the only chair in the catalog with a confirmed minimum height of 5 feet, and it is confirmed to 300 lbs at the other end, so it accommodates a wider range of bodies than anything else on this page. That matters for a chair two people will share on alternating evenings. A 49 inch L-track covers the spine down through the glutes, with 4D rollers, heat, and full foot and calf coverage for the restless-legs pattern that keeps people awake. It folds to 2 inches from the wall, the tightest clearance here.',
  },
  'kyota-konbi-m728-dualpro-4d': {
    label: 'Premium pick',
    why: 'Two independent 4D back mechanisms rather than one, which produces a more varied and less mechanical-feeling session, and variety matters more than it sounds for something you sit in every single night. L-track, heat, stretch, full foot and calf coverage, TrueFit body scanning, and twelve auto programs including a full-body stretch. Zero Wall Fit space-saving design. The Bluetooth speakers are the detail worth noting for this use case, since pairing a session with slow audio is one of the more reliable ways to make a wind-down routine stick.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestSleepPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Sleep</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        A massage chair does not make you sleep. It removes the physical barriers to the sleep your nervous system is already trying to produce: muscular tension, elevated arousal, and the restless legs that keep you shifting position. That distinction decides which specs are worth paying for and which are not.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated July 2026. Every chair below has zero gravity, heat, and full foot and calf coverage, and each folds close enough to a wall to live in the room where you actually wind down.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">
          Timing matters more than any feature on the spec sheet
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          The most useful thing to know before buying is when to use the chair. The evidence points to a session roughly 90 to 120 minutes before bed rather than immediately beforehand. The session lowers arousal and muscle tone, and the body needs a window to carry that state into sleep onset. A randomized trial of an automatic massage chair recorded about a 22 percent drop in heart rate and a 12 percent drop in muscle tone during sessions, which is the mechanism doing the work.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          This is why room fit is a sleep feature, not a convenience. A chair in the garage gets used on weekends. A chair in the bedroom or the room you wind down in gets used nightly, and the sleep benefit is a cumulative effect rather than a single-session one. Every chair on this page folds to within a few inches of a wall for that reason.
        </p>
        <p className="text-charcoal leading-relaxed">
          Keep pressure moderate. Deep, firm work raises arousal at precisely the point in the evening you want it dropping, so a gentle 2D or a dialed-down 4D both beat a chair run at maximum intensity. Foot and calf coverage deserves more weight than buyers usually give it: the strongest evidence linking massage to sleep quality runs through sustained pressure on the foot, and calf coverage is what addresses the restless-legs pattern specifically.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-5">Quick comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-sand">
                <th className="text-left py-3 pl-4 pr-5 font-semibold text-charcoal whitespace-nowrap">Chair</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Price band</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Track</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Roller</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Zero Gravity</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Wall Clearance</th>
                <th className="text-left py-3 font-semibold text-charcoal whitespace-nowrap">Height Range</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((chair, i) => {
                const heightRange = chair.heightMinIn && chair.heightMaxIn
                  ? `${fmtFt(chair.heightMinIn)} to ${fmtFt(chair.heightMaxIn)}`
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
                    <td className="py-3 pr-5 text-charcoal">{priceBand(chair).range}</td>
                    <td className="py-3 pr-5 text-charcoal">{chair.track}-Track</td>
                    <td className="py-3 pr-5 text-charcoal">{chair.roller}</td>
                    <td className="py-3 pr-5 text-charcoal">{zgLabel}</td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.wallClearanceIn ? `${chair.wallClearanceIn}"` : 'Not confirmed'}
                    </td>
                    <td className="py-3 text-charcoal">{heightRange}</td>
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
          const priceLabel = priceBand(chair).range
          const heightRange = chair.heightMinIn && chair.heightMaxIn
            ? `${fmtFt(chair.heightMinIn)} to ${fmtFt(chair.heightMaxIn)}`
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
                    {chair.heat && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Heat</span>
                    )}
                    {chair.calf && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Foot and Calf</span>
                    )}
                    {chair.spaceSaving && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Space-Saving</span>
                    )}
                  </div>
                  <p className="text-charcoal text-base leading-relaxed mb-4">{editorial?.why}</p>
                  {chair.reviewRating && (
                    <p className="text-sm text-warm-gray mb-3">
                      <span className="text-gold">{"★".repeat(Math.round(chair.reviewRating))}</span>
                      {" "}{chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
                      {chair.reviewSource ? " at " + chair.reviewSource : ""}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {heightRange && <span className="text-xs text-warm-gray">Height: {heightRange}</span>}
                    {chair.weightCapacityLbs ? <span className="text-xs text-warm-gray">Capacity: {chair.weightCapacityLbs} lbs</span> : null}
                    {chair.wallClearanceIn ? <span className="text-xs text-warm-gray">Wall clearance: {chair.wallClearanceIn}&quot;</span> : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {resolveAffiliateUrl(chair) && (
                      <a href={resolveAffiliateUrl(chair)} target="_blank" rel="sponsored noopener"
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
          Decide the room first. If the chair is going in a bedroom, wall clearance and noise matter more than roller count, and the Yamato or the Dynasty 4D are the natural starting points. If it is going in a living room where it will also serve as a general-purpose chair, the Pro-Vigor 4D gives you the range to run gentle at night and firmer on a weekend afternoon.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Check body fit before anything else if you are at either end of the range. The Yamato tops out at 220 lbs. The Dynasty 4D is the only chair in the catalog confirmed down to 5 feet, which makes it the default recommendation for petite buyers regardless of the rest of the spec sheet.
        </p>
        <p className="text-charcoal leading-relaxed">
          For the research, see our guides to{' '}
          <Link href="/learn/massage-and-sleep" className="text-bronze hover:text-gold transition-colors">massage and sleep</Link>,{' '}
          <Link href="/learn/massage-and-falling-asleep" className="text-bronze hover:text-gold transition-colors">falling asleep faster</Link>,{' '}
          <Link href="/learn/massage-and-deep-sleep" className="text-bronze hover:text-gold transition-colors">deep sleep</Link>, and{' '}
          <Link href="/learn/massage-and-bedtime-routine" className="text-bronze hover:text-gold transition-colors">building a bedtime routine</Link>. On whether to sleep in the chair itself, see{' '}
          <Link href="/learn/massage-chair-sleep" className="text-bronze hover:text-gold transition-colors">sleeping in a massage chair</Link>. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          takes about three minutes.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">
          Answer a few questions about your room, your body, and how you sleep. The finder narrows it down.
        </p>
        <Link href="/finder" className="btn-primary inline-block">
          Find My Chair
        </Link>
      </div>

    </div>
  )
}
