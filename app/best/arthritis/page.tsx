import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Arthritis (2026) | MassageChairFinder",
  description: "The best massage chairs for arthritis combine 4D roller pressure control, multi-zone heat, and two-stage zero gravity. Six picks verified for arthritic buyers across price ranges from $4,249 to $8,999.",
}

const PICK_IDS = [
  "medical-breakthrough-6",
  "kahuna-hm-078",
  "rockertech-bliss",
  "kyota-yugana-m780",
  "bodyfriend-phantom-ii",
  "osaki-os-pro-maestro-le",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "medical-breakthrough-6": {
    label: "Best value pick for arthritis",
    why: "The Medical Breakthrough 6 is the strongest entry point for arthritic buyers at $4,249. L-track coverage extends under the seat to address hip and sacroiliac joint arthritis -- the most common complaint among buyers over 60. The 4D roller provides the depth control needed to keep pressure gentle on days when joint sensitivity is higher. Heat, zero gravity, and body scanning are all included. The 300 lb weight capacity and published spec set make it a lower-risk purchase. For buyers whose primary arthritis location is the lower back and hips, this is the starting recommendation.",
  },
  "kahuna-hm-078": {
    label: "Best space-saving option for arthritis",
    why: "The Kahuna HM-078 brings SL-track 4D coverage to buyers with room constraints and a higher weight requirement. At 350 lbs capacity with space-saving recline, it handles more body types than most chairs in its price tier. The heat coverage extends to the lumbar and leg areas, which is relevant for buyers with lower-limb arthritis and circulation concerns. The SL-track covers neck through glutes in one pass, which is useful for buyers with cervical arthritis who need upper and lower coverage from a single session. Voice control reduces the interaction complexity for buyers who find remote controls difficult to manage.",
  },
  "rockertech-bliss": {
    label: "Best for arthritis with circulation concerns",
    why: "The RockerTech Bliss is the strongest mid-range choice for arthritic buyers whose joint pain is accompanied by poor circulation or lower-limb swelling. The combination of L-track 4D coverage, reflexology foot rollers, calf airbag compression, and lumbar heat addresses multiple arthritis-related symptoms in one session. The space-saving Zero Wall Fit design makes it practical for bedrooms where the chair needs to sit close to the wall. Two-stage zero gravity reduces spinal compression during sessions, which benefits buyers with spinal osteoarthritis. Three-year warranty at $5,499 is strong for this tier.",
  },
  "kyota-yugana-m780": {
    label: "Best mid-to-high pick for petite and older buyers",
    why: "The Kyota Yugana M780 4D is the most accommodating L-track chair at its price point for the body types most common among older arthritic buyers. It fits buyers from 4'8\" -- unusually low for an L-track 4D chair -- and requires only 2 inches of wall clearance. At 300 lbs capacity with a wider-than-average seat, it comfortably accommodates a broad range of body types. The L-track covers the hips and glutes, where osteoarthritis is most prevalent in this demographic. At $7,999, it is a long-term investment in daily relief that is well-suited for consistent use over years.",
  },
  "bodyfriend-phantom-ii": {
    label: "Best for heavier arthritic buyers",
    why: "The Bodyfriend Phantom II is the strongest choice for arthritic buyers who also need a higher weight capacity. At 335 lbs with verified plus-size fit, it handles larger buyers with the same full-featured SL-track 4D experience as narrower chairs in its class. Bodyfriend's roller tuning tends toward a softer default pressure profile at this tier -- meaningful for buyers whose joint sensitivity makes them uncomfortable in chairs with a harsher default feel. Heat and zero gravity are both included. For buyers above 265 lbs who want a high-end SL-track option without sacrificing features, the Phantom II is the strongest fit.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-body arthritis coverage",
    why: "The Maestro LE 2.0 is the right choice for arthritic buyers whose symptoms extend beyond the lower back into the upper back, neck, and shoulders. The SL-track 4D roller covers the full spine from neck through glutes, and the shoulder and upper body airbag system provides compression therapy across the areas where cervical and upper thoracic arthritis is felt. The body scanning system adjusts per session, which is useful for buyers whose shoulder and spine position varies with daily pain levels. At $8,999 with broad feature coverage and a strong brand support network, this is the most comprehensive arthritis option in the catalog.",
  },
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
        Arthritis buyers need a different approach to massage chair selection. Fine-grained pressure control matters more than raw power. Heat is not optional. And the roller needs to reach the joints where the pain actually is, not just the mid-back. These six chairs meet the requirements across price tiers from $4,249 to $8,999.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All picks have 3D or 4D rollers for precise pressure control, confirmed heat features, and zero gravity positioning. For specific guidance on arthritis types and session intensity, see the <Link href="/learn/massage-chairs-for-arthritis" className="text-bronze hover:text-gold">arthritis guide</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters most for arthritis</h2>
        <div className="space-y-3 text-sm text-charcoal">
          <div>
            <span className="font-semibold">Pressure control:</span> 3D or 4D rollers with a genuine soft lower limit. Arthritic joints require the ability to run very light sessions on high-pain days and increase intensity as tolerance improves.
          </div>
          <div>
            <span className="font-semibold">Heat:</span> Lumbar heat minimum, calf and foot heat for buyers with lower-limb arthritis. Heat reduces joint stiffness and makes the massage more comfortable at lower pressure settings.
          </div>
          <div>
            <span className="font-semibold">Zero gravity:</span> Reduces spinal compression during sessions. Two-stage zero gravity provides more complete decompression for spinal osteoarthritis.
          </div>
          <div>
            <span className="font-semibold">Track type:</span> L-track or SL-track for buyers with hip and sacroiliac joint arthritis. S-track stops at the lumbar and misses the hip region entirely.
          </div>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        {picks.map(chair => {
          const ed = EDITORIAL[chair.id]
          return (
            <div key={chair.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-semibold text-teal uppercase tracking-wide">{ed.label}</span>
                  <h3 className="text-xl font-serif font-semibold text-navy mt-1">
                    <Link href={`/chairs/${chair.id}`} className="hover:text-gold">{chair.name}</Link>
                  </h3>
                </div>
                <span className="shrink-0 text-2xl font-bold text-gold">${chair.priceMin?.toLocaleString()}</span>
              </div>
              <p className="text-sm text-warm-gray mb-4 leading-relaxed">{ed.why}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-sand px-2 py-1 rounded">{chair.track}-track</span>
                <span className="bg-sand px-2 py-1 rounded">{chair.roller} roller</span>
                {chair.heat && <span className="bg-sand px-2 py-1 rounded">Heat</span>}
                {chair.zeroGravity && <span className="bg-sand px-2 py-1 rounded">Zero gravity</span>}
                {chair.foot && <span className="bg-sand px-2 py-1 rounded">Foot rollers</span>}
                {chair.spaceSaving && <span className="bg-sand px-2 py-1 rounded">Space-saving</span>}
              </div>
              <div className="mt-4">
                <Link href={`/chairs/${chair.id}`} className="text-bronze hover:text-gold text-sm font-medium">
                  Full review &rarr;
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">A note on rheumatoid arthritis</h2>
        <p className="text-sm text-charcoal">
          All picks above are appropriate for osteoarthritis. Buyers with rheumatoid arthritis should avoid high-intensity sessions during active flares and confirm with their rheumatologist whether heat features are appropriate. Start at minimum pressure settings and increase only when pain levels are stable.
        </p>
      </div>

      <div className="card bg-navy text-white text-center">
        <p className="text-lg font-serif mb-2">Want a recommendation based on your specific arthritis location?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz asks about your pain location, pressure sensitivity, and body fit to give you a direct recommendation.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
