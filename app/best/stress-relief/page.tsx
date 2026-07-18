import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Stress Relief (2026)',
  description: 'The best massage chairs for stress relief are the ones you will actually use every day. Five chairs selected for zero gravity, heat, and full foot coverage across every price band.',
}

const PICK_IDS = [
  'osaki-os-champ',
  'relaxe-shiatsu',
  'inner-balance-jin-2',
  'amamedics-hilux-4d',
  'osaki-os-pro-maestro-le',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-champ': {
    label: 'Best for building a daily habit',
    why: 'If the research points anywhere, it points at frequency, and the chair you use every evening beats the better chair you use twice a week. The OS-Champ is the lowest-priced SL-track chair in the catalog and it still carries the three features that matter for the stress response: two-stage zero gravity, heat, and full foot and calf coverage. It folds to 9 inches from the wall, so it fits a living room without rearranging the room around it. Buyers consistently report that daily use relieves accumulated aches over weeks and months, which is exactly the pattern the dosing research describes. 2D rollers mean gentle rather than deep, and for stress work that is a feature.',
  },
  'relaxe-shiatsu': {
    label: 'Most buyer feedback in the catalog',
    why: 'With an aggregate rating near 4.8 across roughly 894 reviews at relaxe.co, this is by a wide margin the most-reviewed chair we track, and for a purchase people make once that volume is worth something on its own. The spec set fits the stress use case cleanly: SL-track with a 53 inch stroke, zero gravity, heat, foot massage, and a 2 inch wall clearance. Confirmed to 330 lbs and a 61 to 76 inch height range, so it fits a wider range of bodies than most chairs in its band. A recurring theme in the feedback is that multiple household members compete for time in it, which is a reasonable proxy for how pleasant a daily session actually is.',
  },
  'inner-balance-jin-2': {
    label: 'Best recline for the autonomic shift',
    why: 'Zero gravity is the position that does the most work here. Reclining until the knees sit above the heart takes load off the spine and supports the shift toward parasympathetic dominance that drives the stress response. The Jin 2.0 offers three zero gravity stages rather than the usual one or two, so you can find the recline that settles you rather than accepting a single fixed angle. Add heat, foot massage, a 300 lb capacity, and a 2 inch wall clearance. The 2D roller keeps pressure moderate, which is the right call: intensity is not what produces the effect, and going harder works against it.',
  },
  'amamedics-hilux-4d': {
    label: 'Best pressure control',
    why: 'The single most common way buyers ruin a stress chair is running it too hard, so the ability to dial pressure down matters more than peak power. The Hilux 4D gives you that range, and buyers specifically call out pressure adjustability from gentle recovery through firm work, along with noticeable post-work relief from desk-hour tension. The rollers themselves are heated rather than just a lumbar heat pad, which is a meaningful difference in how warmth reaches the tissue. SL-track with a 53 inch stroke, two-stage zero gravity, stretch, and a confirmed fit range from 59 to 79 inches, the widest height accommodation in this group.',
  },
  'osaki-os-pro-maestro-le': {
    label: 'Premium pick',
    why: 'The Maestro LE 2.0 is the premium-band choice for buyers who want the full feature set and intend to keep the chair a long time. 4D rollers, SL-track, body scanning, heat, and a foot module buyers repeatedly single out as exceptional, which matters more than it sounds: the strongest evidence for massage and mood runs through sustained pressure on the foot. Folds to 5 inches from the wall. One caveat worth taking seriously for this use case, straight from buyer feedback: the 4D rollers are genuinely strong, so start at low intensity and work up rather than down.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestStressReliefPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Stress Relief</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Buying a chair for stress is a different problem from buying one for pain. Pain buyers need a specific roller to reach a specific muscle. Stress buyers need a session they will actually sit down for at the end of a hard day, every day, for years. That changes which specs matter, and it changes them in a direction most buying guides get backwards.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated July 2026. Every chair below has zero gravity, heat, and foot coverage, the three features tied most directly to the relaxation response.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">
          Frequency beats intensity, and it is not close
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          The autonomic shift that people describe as feeling calmer is measurable, and it starts fast. Moderate-pressure massage moves the nervous system toward parasympathetic dominance within roughly ten minutes, and a randomized trial of an automatic massage chair recorded about a 22 percent drop in heart rate and a 12 percent drop in muscle tone during sessions. What the research does not show is a dose-response curve that rewards going harder. Session count does more work than session intensity.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          That has a direct buying consequence. A chair with moderate 2D rollers used nightly will do more for your stress than a 4D flagship used on weekends, and excessive intensity is the most common reason massage chairs get returned. For this use case, aggressive rollers are a risk rather than a selling point. If a chair is uncomfortable, you stop using it, and a chair you stop using has an effect of zero.
        </p>
        <p className="text-charcoal leading-relaxed">
          Three features carry real weight here. Zero gravity, because the recline itself supports the autonomic shift. Heat, because warmth adds to the relaxation response and makes the session something you look forward to. And a genuine foot module, because the strongest evidence connecting massage to mood and sleep runs through sustained pressure on the foot, which is the surface buyers most often undervalue.
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
                <th className="text-left py-3 font-semibold text-charcoal whitespace-nowrap">Weight Cap</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((chair, i) => {
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
                    {chair.foot && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Foot Massage</span>
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
          Start with where the chair will live, not with the spec sheet. A stress chair earns its price through daily use, and daily use depends on the chair sitting somewhere you pass on the way through the evening. If that spot is tight, wall clearance becomes the first filter rather than the last: several chairs here fold to within a few inches of the wall.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Then be realistic about pressure. If you are new to massage chairs, or if you tense up under deep work, the moderate 2D options will serve you better than a 4D flagship. If you want the option to go firmer on some days and gentle on others, the pressure range on the Hilux 4D is the reason it is on this list.
        </p>
        <p className="text-charcoal leading-relaxed">
          For the research behind all of this, see our guides to{' '}
          <Link href="/learn/massage-and-stress" className="text-bronze hover:text-gold transition-colors">massage and stress</Link>,{' '}
          <Link href="/learn/massage-and-anxiety" className="text-bronze hover:text-gold transition-colors">massage and anxiety</Link>, and{' '}
          <Link href="/learn/massage-and-parasympathetic-nervous-system" className="text-bronze hover:text-gold transition-colors">the parasympathetic response</Link>. The{' '}
          <Link href="/learn/massage-chairs-for-stress" className="text-bronze hover:text-gold transition-colors">stress buying guide</Link>{' '}
          covers features in more depth, and the{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          takes about three minutes.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">
          Answer a few questions about your space, budget, and how firm you like pressure. The finder narrows it down.
        </p>
        <Link href="/finder" className="btn-primary inline-block">
          Find My Chair
        </Link>
      </div>

    </div>
  )
}
