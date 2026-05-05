import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs Under $10,000 (2026) | MassageChairFinder",
  description: "The $7,000 to $10,000 tier is where 4D roller quality peaks before diminishing returns set in. Six chairs verified for this price range, from L-track picks for lower back pain to SL-track options for full-spine coverage.",
}

const PICK_IDS = [
  "kyota-yugana-m780",
  "kahuna-dios-7300",
  "bodyfriend-phantom-ii",
  "osaki-os-pro-maestro-le",
  "positive-posture-brio-plus",
  "infinity-genesis-max",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "kyota-yugana-m780": {
    label: "Best space-saving L-track at this tier",
    why: "The Kyota Yugana M780 4D earns its position here on three factors that are rare in combination at $7,999: an L-track that extends into the glutes for lower back and hip coverage, a 4 feet 8 inch minimum height that makes it one of the most accessible chairs for petite buyers in this price range, and 2 inches of required wall clearance. For buyers who need glute and hip coverage, have a smaller room or a lower body height, and want a strong L-track without paying $10,000+, the Yugana is the clearest recommendation in this list. 300 lb capacity.",
  },
  "kahuna-dios-7300": {
    label: "Best SL-track with advanced roller at this tier",
    why: "The Kahuna Dios-7300 is the standout value for buyers who want more than standard 4D performance without crossing into the $10,000 tier. The 7D roller system adds lateral movement patterns to the standard 4D depth and rhythm, producing a massage that feels noticeably more varied and comprehensive than a conventional 4D chair. SL-track coverage from neck through glutes, combined with heat, zero gravity, body scanning, calf and foot work, puts it among the most fully-featured chairs at $7,999. For buyers who want maximum feature density at this price point, the Dios-7300 is the strongest option.",
  },
  "bodyfriend-phantom-ii": {
    label: "Best for heavier buyers at this tier",
    why: "At $8,499 with a 335 lb verified plus-size weight capacity, the Bodyfriend Phantom II is the right answer for buyers in this price tier who are above 265 lbs. Bodyfriend's Korean-manufactured SL-track 4D system is tuned toward a softer default pressure profile than many competitors at this price, which benefits buyers who have found other $8,000 chairs too aggressive. Heat and zero gravity are included. For buyers who need a high-end SL-track chair and confirmed plus-size fit, there is no better option in the $7,000 to $10,000 range.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-body SL-track at this tier",
    why: "The Osaki OS-Pro Maestro LE 2.0 is the best all-around SL-track chair at $8,999. The 4D roller system covers the full spine from cervical through lumbar and into the glutes, while the upper-body airbag system provides serious shoulder, arm, and hip coverage. The body scanning system runs per session and adjusts roller start position, which is particularly useful for buyers whose posture varies or who share the chair with people of different heights. For buyers whose pain extends into the upper back, neck, and shoulders as well as the lower back, the Maestro's full-spine coverage is the strongest single-chair solution in this tier.",
  },
  "positive-posture-brio-plus": {
    label: "Best focused L-track at this tier",
    why: "The Positive Posture Brio Plus is for the buyer who knows their pain is in the lower back, hips, and glutes and wants an L-track chair from a brand with a strong support reputation. At $7,999 with an L-track 4D roller, heat, and foot rollers, it delivers the core L-track experience without the extras that inflate the price of other chairs in this tier. Positive Posture has a smaller catalog than brands like Infinity or Osaki, which means their support resources are more concentrated. For buyers who value brand focus and clean feature implementation over the broadest feature list, the Brio Plus is worth consideration.",
  },
  "infinity-genesis-max": {
    label: "Best L-track value at this tier",
    why: "At $9,299 with L-track 4D coverage, stretch programs, heat, foot rollers, and 2 inches of wall clearance required, the Infinity Genesis Max is one of the strongest overall values in the under-$10,000 tier. The space-saving design opens the chair to buyers in tighter rooms. The stretch program delivers genuine spinal decompression. And the L-track covers the glutes and hips for buyers with lower back pain that radiates downward. The Genesis Max consistently appears in shortlists for buyers who want full-featured L-track coverage without crossing into the $11,000+ tier of the Infinity lineup.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestUnder10kPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $10,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The $7,000 to $10,000 tier is where 4D roller quality peaks before the law of diminishing returns sets in. At $10,000+, you are largely paying for brand prestige, Japanese manufacturing, and incremental refinements in feel. At $7,000 to $9,999, you can get genuine 4D performance, full L-track or SL-track coverage, multi-zone heat, and serious airbag compression at the best value-per-feature ratio in the entire category.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. Six picks covering L-track and SL-track options, from value-focused choices at $7,999 to full-featured SL-track at $8,999. Compare with{" "}
        <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">premium picks above $10,000</Link>{" "}
        or{" "}
        <Link href="/best/under-5000" className="text-bronze hover:text-gold transition-colors">chairs under $5,000</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What changes at $7,000+</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          At this tier, 4D rollers are well-implemented with genuine rhythm variation. The gap between a good $8,000 chair and a good $5,000 chair is most obvious in the feel of the roller's pace and dwelling behavior, where cheaper 4D systems feel repetitive and this tier does not.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Full-body airbag systems become the norm at $7,000+. Shoulder, arm, hip, calf, and foot airbag compression is typically included in a single session, rather than the partial coverage more common in lower tiers.
        </p>
        <p className="text-charcoal leading-relaxed">
          Chairs in this tier also generally use better upholstery materials and longer-lasting mechanical components than the $4,000 to $5,000 range. For buyers who plan to use the chair daily for years, the build quality difference is meaningful.
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
                      {chair.priceMax && chair.priceMax > chair.priceMin
                        ? `$${chair.priceMin.toLocaleString()} – $${chair.priceMax.toLocaleString()}`
                        : `$${chair.priceMin.toLocaleString()}`}
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
                    {chair.plusSizeConfirmed && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">Plus-Size Verified</span>
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
          Track type is the primary split. For lower back pain that radiates into the hips and glutes, choose an L-track: the Kyota Yugana M780 ($7,999), Positive Posture Brio Plus ($7,999), or Infinity Genesis Max ($9,299). For pain that spans the full back including neck and shoulders, choose SL-track: the Kahuna Dios-7300 ($7,999) or Osaki Maestro LE ($8,999).
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For buyers above 265 lbs, the Bodyfriend Phantom II is the confirmed 335-lb option in this tier. For buyers in tight rooms, the Kyota Yugana and Infinity Genesis Max both require only 2 inches of wall clearance.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          asks about your pain pattern, body fit, and room size to give you a direct match. See the{" "}
          <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">premium tier</Link>{" "}
          if you are considering chairs above $10,000 and want to understand what the additional spend actually adds.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure if you need to spend this much?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
