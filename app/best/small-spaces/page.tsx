import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/best/small-spaces" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/best/small-spaces"),
  title: 'Best Small and Compact Massage Chairs for Tight Spaces (2026)',
  description: 'Small, compact massage chairs that recline in place with as little as 1 inch of wall clearance. Seven space-saving picks compared on wall clearance, track, and verified body fit.',
}

const PICK_IDS = [
  'synca-wellness-circ-plus',
  'inner-balance-jin',
  'relaxe-shiatsu',
  'daiwa-legacy-4',
  'jpmedics-kaze-duo',
  'relaxonchair-mk-v-plus',
  'kahuna-hm-5000',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'synca-wellness-circ-plus': {
    label: 'Most affordable space-saving pick',
    why: 'The CirC+ is the lowest-priced chair on this page and the only pick in the Under $3,000 band with 3D rollers. Six-inch wall clearance, a 45-inch SL-track, zero gravity, heat, and foot massage. SL-track extends under the glutes, which matters for buyers dealing with lower back and hip tightness. It needs more wall gap than the 2-inch picks below, so measure before you choose it for a very tight spot.',
  },
  'inner-balance-jin': {
    label: "Best space-saving in the Under $3,000 band",
    why: 'The Inner Balance Jin requires only 2 inches of wall clearance and is confirmed at 300 lbs, making it one of the few chairs in the Under $3,000 band that combine near-zero wall clearance with plus-size capacity. L-track, 2D rollers, zero gravity, heat. For buyers whose weight exceeds 250 lbs and who need tight wall clearance, this fills a gap the entry-level chairs cannot.',
  },
  'relaxe-shiatsu': {
    label: 'Best budget SL-track for tight rooms',
    why: "The Relaxe Shiatsu pairs a 53-inch SL-track with a space-saving 2-inch wall clearance at an entry-tier price. Confirmed from 5'1\" to 6'4\" and up to 330 lbs, with zero gravity and heat. For buyers fitting a full SL-track chair into a small room without moving past the Under $3,000 band, this is the pick.",
  },
  'daiwa-legacy-4': {
    label: 'Premium with widest confirmed height range',
    why: "The Legacy 4 needs about 3 inches of wall clearance and is confirmed for 4'8\" to 6'6\", one of the widest height ranges among space-saving chairs. 49-inch L-track, 3D rollers, two-stage zero gravity, heat, calf and foot coverage, AI body scanning, and a 300 lb capacity. It sits in the $8,000-$11,999 band, so it is the step up for a household that needs one compact chair to fit everyone.",
  },
  'jpmedics-kaze-duo': {
    label: 'Ultra-premium 1-inch clearance',
    why: "The KaZe Duo combines 1-inch wall clearance with a dual 4D roller mechanism and a 320-lb weight capacity. For buyers who want the tightest wall clearance on this page at the top of the market, with high weight capacity, this is the pick. L-track provides strong glute and thigh coverage. Confirmed 5'0\" to 6'3\".",
  },
  'relaxonchair-mk-v-plus': {
    label: "L-track with 3.5-inch wall clearance in the Under $3,000 band",
    why: "The MK-V Plus is an L-track chair with zero gravity, heat, and foot massage in the Under $3,000 band, with a 3.5-inch wall clearance. L-track extends under the glutes and thighs, adding lower-body coverage beyond what SL-track chairs at this price typically deliver. For buyers in the mid-price range who need L-track glute coverage in a smaller room, this fills a gap between the SL-track space-saving options below and the 3D-roller chairs above.",
  },
  'kahuna-hm-5000': {
    label: 'Best entry-price SL-track in a compact footprint',
    why: "The HM-5000 is an SL-track chair in a space-saving footprint in the Under $3,000 band. It delivers full-spine SL-track coverage, zero gravity, foot and calf massage, and hip airbags in a compact design that reclines in place. Confirmed up to 6 foot 2 inches at 290 lbs. For buyers who want SL-track coverage with a tight budget and limited floor space, this is the entry point.",
  },
}

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "What is the best massage chair for a small room or apartment?",
    a: "The JPMedics KaZe Duo needs only 1 inch of wall clearance, the tightest of any chair on this page, with a dual 4D roller and 320-lb capacity. For a tighter budget, the Synca Wellness CirC Plus needs 6 inches of clearance and sits in the Under $3,000 band. The Inner Balance Jin needs 2 inches and is one of the few space-saving chairs at that price confirmed to 300 lbs.",
  },
  {
    q: "How does a space-saving massage chair recline without 12 to 18 inches of wall clearance?",
    a: "A space-saving mechanism slides the chair base forward as the backrest reclines, so the chair stays roughly in the same floor position instead of swinging backward into the wall. A 1-inch wall clearance chair can sit almost flush against a wall and still fully recline.",
  },
  {
    q: "Does a space-saving design trade off massage quality?",
    a: "Not based on the chairs on this page. The Daiwa Legacy 4 and the Kahuna HM-5000 both pair space-saving clearance with full L-track or SL-track coverage and zero gravity, with body scanning on the Legacy 4, the same specs found on non-space-saving chairs at the same price tiers.",
  },
  {
    q: "What wall clearance number should I actually measure for?",
    a: "Measure the clearance behind where the chair will sit at maximum recline, not just its footprint when upright. The wall clearance figures on this page reflect the gap needed at full recline, which is the number that determines whether the chair fits your room.",
  },
  {
    q: "What is the smallest massage chair you can buy?",
    a: "Full-body massage chairs do not get much smaller in floor footprint, so the practical answer is the one that needs the least room to recline. A space-saving chair with 1 to 2 inches of wall clearance, such as the JPMedics KaZe Duo, the Inner Balance Jin, or the Relaxe Shiatsu, can sit almost against a wall. Compare length and width on the retailer listing as well, since clearance and footprint are separate measurements.",
  },
  {
    q: "Is a small massage chair the same as a massage chair for petite people?",
    a: "No. A small or compact massage chair saves room space, while a chair for petite buyers is about whether the rollers and footrest fit a shorter body. A space-saving chair can still be sized for an average or tall frame. If your height is the concern, check each chair's confirmed minimum height, or use the petite buyers page and the chair finder instead.",
  },
]

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestSmallSpacesPage() {
  const picks = PICK_IDS
    .map(id => MCF_CHAIRS.find(c => c.id === id))
    .filter(Boolean) as typeof MCF_CHAIRS

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.massagechairfinder.com/" },
      { "@type": "ListItem", position: 2, name: "Best chairs by use case", item: "https://www.massagechairfinder.com/best" },
      { "@type": "ListItem", position: 3, name: "Best Small and Compact Massage Chairs", item: "https://www.massagechairfinder.com/best/small-spaces" },
    ],
  }

  return (
    <div className="section">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mb-4">
        <Link href="/best" className="text-bronze hover:text-gold text-sm">
          &larr; Best chairs by use case
        </Link>
      </div>

      <h1 className="text-4xl font-serif mb-4">Best Small and Compact Massage Chairs</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        A compact massage chair is usually a full-size chair with a space-saving recline: the base slides forward as the backrest drops, so it needs as little as 1 inch of wall clearance instead of the 12 to 18 inches a standard chair needs. For a small room, apartment, or alcove, wall clearance is the spec to check first, then the floor footprint. The seven picks below run from 1 to 6 inches of clearance and span the Under $3,000 band to $12,000 and up.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated November 2026. Wall clearance figures reflect the gap needed at maximum recline. The Kahuna HM-5000 is listed as space-saving, but its exact clearance is not published, so confirm it with the retailer before ordering. Looking for a small chair because you are petite rather than because your room is? Start with{' '}
        <Link href="/best/petite-buyers" className="text-bronze hover:text-gold transition-colors">massage chairs for petite buyers</Link>{' '}
        instead.
      </p>

      <div className="mb-10 max-w-2xl flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg px-5 py-4" style={{ background: '#F5F1EB', border: '1px solid #E8DFD3' }}>
        <p className="text-sm text-charcoal flex-1">
          Want a shortlist for your body, room, and budget? The Chair Finder takes about 3 minutes.
        </p>
        <Link href="/finder?src=best-top" className="btn-primary text-sm text-center whitespace-nowrap">
          Find My Chair
        </Link>
      </div>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How space-saving recline works</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Standard massage chairs extend backward when reclining, requiring 12 to 18 inches between the backrest and the wall. Space-saving chairs use a mechanism that slides the base forward as the backrest reclines, so the chair occupies the same floor position it started in, just reclined. A 1-inch wall clearance chair can sit almost flush against a wall.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Wall clearance and floor footprint are two different measurements. A chair with 1-inch wall clearance still has a physical length and width when placed in a room. Always check the chair dimensions (length x width) in addition to wall clearance when planning room placement.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/room-fit" className="text-bronze hover:text-gold transition-colors">room fit guide</Link>{' '}
          covers how to measure your space and position a chair before purchasing, including a floor-tape exercise to test fit before the chair arrives.
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
                      {priceBand(chair).range}
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
          const priceLabel = priceBand(chair).range
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
          In the{' '}
          <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">Under $3,000 band</Link>, the Synca Wellness CirC+ is the lowest-priced pick and the only one with 3D rollers, but it needs 6 inches. If your wall gap is tighter, the Inner Balance Jin and the Relaxe Shiatsu both need 2 inches, and the Relaxe adds a 53-inch SL-track with a confirmed fit from 5&apos;1&quot; to 6&apos;4&quot;.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For taller buyers (above 6&apos;1&quot;) who also need a small-space chair, the Legacy 4 is confirmed to 6&apos;6&quot; and the KaZe Duo to 6&apos;3&quot;. They need about 3 inches and 1 inch of wall clearance respectively.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes a space constraint question that surfaces only space-saving chairs when selected. The{' '}
          <Link href="/learn/room-fit" className="text-bronze hover:text-gold transition-colors">room fit guide</Link>{' '}
          covers placement, clearance, and how to verify a chair will work in your specific room before it arrives, and the{' '}
          <Link href="/learn/will-a-massage-chair-ruin-your-living-room" className="text-bronze hover:text-gold transition-colors">will a massage chair ruin your living room</Link>{' '}
          guide handles the aesthetics and whether a compact chair gives up massage quality.
        </p>
      </div>

      <div className="mb-12 max-w-2xl">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-5">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="bg-white border border-sand rounded-lg p-5">
              <summary className="font-serif font-semibold text-navy cursor-pointer">{faq.q}</summary>
              <p className="text-charcoal leading-relaxed mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
