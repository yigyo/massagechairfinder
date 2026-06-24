import {MCF_CHAIRS, priceBand, resolveAffiliateUrl } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Arthritis (2026) | MassageChairFinder",
  description: "The best massage chairs for arthritis combine 4D roller pressure control, multi-zone heat, and two-stage zero gravity. Six picks verified for arthritic buyers across price tiers from mid to premium.",
}

const PICK_IDS = [
  "medical-breakthrough-6",
  "kahuna-hm-078",
  "rockertech-bliss",
  "kyota-yugana-m780",
  "ogawa-og8901",
  "osaki-os-pro-maestro-le",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "medical-breakthrough-6": {
    label: "Best value pick for arthritis",
    why: "The Medical Breakthrough 6 is the strongest entry point for arthritic buyers in the $3,000-$4,999 band. L-track coverage extends under the seat to address hip and sacroiliac joint arthritis, the most common complaint among buyers over 60. The 4D roller provides the depth control needed to keep pressure gentle on days when joint sensitivity is higher. Heat, zero gravity, and body scanning are all included. The 300 lb weight capacity and published spec set make it a lower-risk purchase. For buyers whose primary arthritis location is the lower back and hips, this is the starting recommendation.",
  },
  "kahuna-hm-078": {
    label: "Best space-saving option for arthritis",
    why: "The Kahuna HM-078 brings SL-track 4D coverage to buyers with room constraints and a higher weight requirement. At 350 lbs capacity with space-saving recline, it handles more body types than most chairs in its price tier. The heat coverage extends to the lumbar and leg areas, which is relevant for buyers with lower-limb arthritis and circulation concerns. The SL-track covers neck through glutes in one pass, which is useful for buyers with cervical arthritis who need upper and lower coverage from a single session. Voice control reduces the interaction complexity for buyers who find remote controls difficult to manage.",
  },
  "rockertech-bliss": {
    label: "Best for arthritis with circulation concerns",
    why: "The RockerTech Bliss is the strongest mid-range choice for arthritic buyers whose joint pain is accompanied by poor circulation or lower-limb swelling. The combination of L-track 4D coverage, reflexology foot rollers, calf airbag compression, and lumbar heat addresses multiple arthritis-related symptoms in one session. The space-saving Zero Wall Fit design makes it practical for bedrooms where the chair needs to sit close to the wall. Two-stage zero gravity reduces spinal compression during sessions, which benefits buyers with spinal osteoarthritis. Three-year warranty in the $5,000-$7,999 band is strong for this tier.",
  },
  "kyota-yugana-m780": {
    label: "Best mid-to-high pick for petite and older buyers",
    why: "The Kyota Yugana M780 4D is the most accommodating L-track chair at its price point for the body types most common among older arthritic buyers. It fits buyers from 4 feet 8 inches, unusually low for an L-track 4D chair, and requires only 2 inches of wall clearance. At 300 lbs capacity with a wider-than-average seat, it comfortably accommodates a broad range of body types. The L-track covers the hips and glutes, where osteoarthritis is most prevalent in this demographic. In the $5,000-$7,999 band, it is a long-term investment in daily relief that is well-suited for consistent use over years.",
  },
  "ogawa-og8901": {
    label: "Best for heavier arthritic buyers",
    why: "The Ogawa Master Drive DUO LE is the strongest choice for arthritic buyers who also need a higher weight capacity. At 320 lbs with a confirmed plus-size fit, it accommodates larger buyers without giving up the full-featured SL-track 4D experience. The 53-inch SL-track covers the neck through the glutes in one pass, which helps buyers whose arthritis spans both the cervical spine and the hips. The 4D roller lets pressure depth be dialed back on days when joint sensitivity is higher, and lumbar heat with zero gravity reduces the load on inflamed joints during a session. Near-zero wall clearance at 1 inch keeps it practical for smaller rooms. For arthritic buyers above 265 lbs who want a high-end SL-track option, this is the strongest fit.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-body arthritis coverage",
    why: "The Maestro LE 2.0 is the right choice for arthritic buyers whose symptoms extend beyond the lower back into the upper back, neck, and shoulders. The SL-track 4D roller covers the full spine from neck through glutes, and the shoulder and upper body airbag system provides compression therapy across the areas where cervical and upper thoracic arthritis is felt. The body scanning system adjusts per session, which is useful for buyers whose shoulder and spine position varies with daily pain levels. In the $8,000-$11,999 band, with broad feature coverage and a strong brand support network, this is the most comprehensive arthritis option in the catalog.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestArthritisPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Arthritis</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Arthritis buyers need a different approach to massage chair selection. Fine-grained pressure control matters more than raw power. Heat is not optional. And the roller needs to reach the joints where the pain actually is, not just the mid-back. These six chairs meet the requirements across price tiers from mid to premium.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All picks have 3D or 4D rollers for precise pressure control, confirmed heat features, and zero gravity positioning. For specific guidance on arthritis types and session intensity, see the{" "}
        <Link href="/learn/massage-chairs-for-arthritis" className="text-bronze hover:text-gold transition-colors">arthritis guide</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters most for arthritis</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Pressure control is the first filter. Arthritic joints require the ability to run very light sessions on high-pain days and increase intensity as tolerance improves. That means 3D or 4D rollers with a genuine soft lower limit, not just a dial that barely changes the feel.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Heat is not optional for most arthritic buyers. Lumbar heat at minimum, calf and foot heat for buyers with lower-limb involvement. Heat reduces joint stiffness and makes the massage more comfortable at lower pressure settings.
        </p>
        <p className="text-charcoal leading-relaxed">
          Track type determines which joints get reached. L-track or SL-track for buyers with hip and sacroiliac joint arthritis. S-track stops at the lumbar and misses the hip region entirely. Two-stage zero gravity reduces spinal compression during sessions, which benefits buyers with spinal osteoarthritis specifically.
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
                  : "Not confirmed"
                const zgLabel = chair.zeroGravityStages
                  ? `${chair.zeroGravityStages}-stage`
                  : chair.zeroGravity
                  ? "Yes"
                  : "No"
                return (
                  <tr key={chair.id} className={i % 2 === 0 ? "bg-white" : "bg-sand/40"}>
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
                      {chair.weightCapacityLbs ? `${chair.weightCapacityLbs} lbs` : "Not confirmed"}
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
                    {chair.track && chair.track !== "vibration" && (
                      <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">{chair.track}-Track</span>
                    )}
                    {chair.roller && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">{chair.roller}</span>
                    )}
                    {chair.zeroGravity && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        {chair.zeroGravityStages ? `ZG ${chair.zeroGravityStages}-stage` : "Zero Gravity"}
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
          Start with where your arthritis is located. Hip and sacroiliac joint pain requires L-track or SL-track coverage. The Medical Breakthrough 6 ($3,000-$4,999) is the entry L-track pick; the Kyota Yugana M780 ($5,000-$7,999) is the premium L-track for petite and older buyers. For full-spine plus glute coverage, any SL-track pick on this list works.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If weight capacity matters, the Kahuna HM-078 (350 lbs) and Ogawa Master Drive DUO LE (320 lbs) cover the highest range. If room size is a constraint, the Kahuna HM-078 and RockerTech Bliss both offer space-saving recline.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          asks about pain location, pressure sensitivity, and budget to give you a direct match. The{" "}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">track types guide</Link>{" "}
          explains the coverage difference between L-track and SL-track in plain terms.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">A note on rheumatoid arthritis</h2>
        <p className="text-charcoal leading-relaxed">
          All picks above are appropriate for osteoarthritis. Buyers with rheumatoid arthritis should avoid high-intensity sessions during active flares and confirm with their rheumatologist whether heat features are appropriate. Start at minimum pressure settings and increase only when pain levels are stable.
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
