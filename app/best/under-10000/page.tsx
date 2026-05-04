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
    why: "The Kyota Yugana M780 4D earns its position here on three factors that are rare in combination at $7,999: an L-track that extends into the glutes for lower back and hip coverage, a 4'8" minimum height that makes it one of the most accessible chairs for petite buyers in this price range, and 2 inches of required wall clearance. For buyers who need glute and hip coverage, have a smaller room or a lower body height, and want a strong L-track without paying $10,000+, the Yugana is the clearest recommendation in this list. 300 lb capacity.",
  },
  "kahuna-dios-7300": {
    label: "Best SL-track with advanced roller at this tier",
    why: "The Kahuna Dios-7300 is the standout value for buyers who want more than standard 4D performance without crossing into the $10,000 tier. The 7D roller system adds lateral movement patterns to the standard 4D depth and rhythm, producing a massage that feels noticeably more varied and comprehensive than a conventional 4D chair. SL-track coverage from neck through glutes, combined with heat, zero gravity, body scanning, calf and foot work, puts it among the most fully-featured chairs at $7,999. For buyers who want maximum feature density at this price point, the Dios-7300 is the strongest option.",
  },
  "bodyfriend-phantom-ii": {
    label: "Best for heavier buyers at this tier",
    why: "At $8,499 with a 335 lb verified plus-size weight capacity, the Bodyfriend Phantom II is the right answer for buyers in this price tier who are above 265 lbs. Bodyfriend's Korean-manufactured SL-track 4D system is tuned toward a softer default pressure profile than many competitors at this price, which benefits buyers who have found other $8,000+ chairs too aggressive. Heat and zero gravity are included. For buyers who need a high-end SL-track chair and confirmed plus-size fit, there is no better option in the $7,000-$10,000 range.",
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
        Updated May 2026. Six picks covering L-track and SL-track options, from value-focused choices at $7,999 to full-featured SL-track at $8,999. Compare with <Link href="/best/premium" className="text-bronze hover:text-gold">premium picks above $10,000</Link> or <Link href="/best/under-5000" className="text-bronze hover:text-gold">chairs under $5,000</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What changes at $7,000+</h2>
        <div className="space-y-3 text-sm text-charcoal">
          <div>
            <span className="font-semibold">4D quality:</span> At this tier, 4D rollers are well-implemented with genuine rhythm variation. The gap between a good $8,000 chair and a good $5,000 chair is most obvious in the feel of the roller's pace and dwelling behavior.
          </div>
          <div>
            <span className="font-semibold">Airbag coverage:</span> Full-body airbag systems become the norm at $7,000+. Shoulder, arm, hip, calf, and foot airbag compression is typically included in a single session.
          </div>
          <div>
            <span className="font-semibold">Build quality:</span> Chairs in this tier generally use better upholstery materials and longer-lasting mechanical components than the $4,000-$5,000 range.
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
                {chair.plusSizeConfirmed && <span className="bg-sand px-2 py-1 rounded">Plus-size verified</span>}
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

      <div className="card bg-navy text-white text-center">
        <p className="text-lg font-serif mb-2">Not sure if you need to spend this much?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz gives you a recommendation based on your pain profile and budget -- you may get the same outcome for less.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
