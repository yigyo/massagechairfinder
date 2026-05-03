import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Petite Buyers (2026)",
  description: "Most massage chairs are designed for buyers 5'2\" and taller. For buyers under 5'2\", confirmed height fit data matters more than a spec sheet maximum. Six picks with verified small-body accommodation.",
}

const PICK_IDS = [
  "luraco-theater-sofy",
  "amamedics-hilux-4d",
  "panasonic-maf1",
  "daiwa-majesty-2d",
  "kyota-yugana-m780",
  "daiwa-legacy-4",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "luraco-theater-sofy": {
    label: "Best budget entry for petite buyers",
    why: "The Theater Sofy is confirmed from 5 foot 0 inches to 6 foot 5 inches and built for commercial and home theater use, which means the seat geometry was designed to accommodate a wider range of body proportions than most residential chairs. L-track covers the glutes and upper thighs, 300-lb capacity, lumbar heat, zero gravity. At $3,490, it is the most accessible confirmed-petite chair in the catalog with L-track coverage. The 3D roller delivers meaningful depth without a premium price.",
  },
  "amamedics-hilux-4d": {
    label: "Best SL-track for petite buyers",
    why: "The Hilux 4D is confirmed from 4 foot 11 inches to 6 foot 7 inches, one of the widest verified height ranges in the catalog, and the only mid-range SL-track chair with a confirmed petite lower bound. SL-track means the roller covers the full spine from the neck to the glutes, which matters for petite buyers who are likely to have a shorter lumbar-to-shoulder distance. The 4D roller depth is adjustable. Heated rollers rather than a surface heat pad. Space-saving design. At $4,999, this is the SL-track pick for buyers under 5 foot 2 inches who want full spinal coverage.",
  },
  "panasonic-maf1": {
    label: "Best compact Japanese design",
    why: "The Panasonic MAF1 is confirmed from 4 foot 8 inches to 6 foot 2 inches and measures just 27 inches wide, the most compact full-featured chair in the catalog. S-track covers the neck through the lumbar. No zero gravity and no L or SL extension, which means it is not the right pick for buyers with lower back pain that radiates into the hips. But for petite buyers managing upper and mid-back tension who also have limited room width, the MAF1 is purpose-built. Panasonic manufacturing heritage, 264-lb capacity. At $5,999.",
  },
  "daiwa-majesty-2d": {
    label: "Best L-track confirmed to 4'8\"",
    why: "The Majesty 2D is confirmed from 4 foot 8 inches to 6 foot 6 inches, the shortest confirmed lower bound of any L-track chair in the catalog. Double reflexology foot rollers, 42 airbags, two-stage zero gravity, 265-lb capacity. The L-track covers the full spine and extends under the glutes, making this a legitimate option for petite buyers with lower back and hip pain rather than just upper back issues. At $6,000, the 2D roller is the tradeoff for the confirmed height range and Daiwa build quality.",
  },
  "kyota-yugana-m780": {
    label: "Best 4D roller for petite buyers",
    why: "The Yugana M780 is confirmed from 4 foot 8 inches to 6 foot 2 inches with a 4D roller, TrueFit body scanning, L-track, 300-lb capacity, heat, and 2-inch wall clearance. The body scan specifically matters for petite buyers: it reads the curvature and length of the spine before each session and repositions the roller start point accordingly. That means the roller is not starting at an average-body assumption but at your actual shoulder position. 4D depth adjustment gives you precise control over intensity. At $7,999, this is the most complete petite-fit verified chair in the mid-premium range.",
  },
  "daiwa-legacy-4": {
    label: "Best premium pick for petite buyers",
    why: "The Legacy 4 is confirmed from 4 foot 8 inches to 6 foot 6 inches with a 49-inch L-track, 3D rollers, body scanning, two-stage zero gravity, 300-lb capacity, and space-saving 3.25-inch wall clearance. The 49-inch track length is one of the longer L-track systems in the catalog, which combined with the confirmed 4 foot 8 inch lower bound means the system was designed to cover petite body proportions without the roller sitting too high. At $9,500, the Legacy 4 is the premium petite option for buyers who want confirmed fit data alongside Daiwa build quality.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestPetiteBuyersPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Petite Buyers</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Most massage chairs are engineered around a default body assumption of 5 foot 2 inches to 6 foot 2 inches. For buyers shorter than 5 foot 2 inches, the spec sheet maximum height is not enough. What matters is confirmed fit data: evidence that the chair was tested and verified at shorter heights, and that the roller actually reaches the correct spinal positions rather than sitting too high.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All six chairs below have verified height minimums at or below 5 foot 0 inches, sourced from retailer spec pages and manufacturer documentation.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">Why most chairs do not fit petite bodies well</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          A massage chair delivers its therapeutic benefit by placing rollers at specific spinal positions: the base of the cervical spine at the top, the lumbar vertebrae in the middle, and, on L-track and SL-track chairs, the sacrum at the base. Those positions are determined by the length of the roller track and where the roller begins its pass.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          On a chair designed for a 5 foot 8 inch average, the roller start position is typically set too high for a 5 foot 0 inch buyer. The result is a roller that contacts the mid-back rather than the cervical spine, and a lumbar roller that sits higher than the true lumbar vertebrae. This is why buyers under 5 foot 2 inches often report that a chair feels like it is missing their lower back, or that the neck rollers are not reaching the right area.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Chairs with body scanning address this automatically by mapping the spine before each session and adjusting the roller start position. Chairs without body scanning can sometimes be adjusted manually, but the range of adjustment is limited. Confirmed height data, where a retailer or manufacturer has tested and verified the chair for a specific minimum height, is the most reliable evidence.
        </p>
        <p className="text-charcoal leading-relaxed">
          Width is a secondary fit variable. A narrow seat can cause the airbag coverage to miss the outer hip and thigh on petite frames if the chair is sized for a wider body. Foot rollers are similarly calibrated to a typical foot length. These are not disqualifying issues, but worth noting when comparing specific models.
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
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Height Range</th>
                <th className="text-left py-3 font-semibold text-charcoal whitespace-nowrap">Weight Cap</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((chair, i) => {
                const heightRange = chair.heightMinIn && chair.heightMaxIn
                  ? `${fmtFt(chair.heightMinIn)} - ${fmtFt(chair.heightMaxIn)}`
                  : chair.heightMaxIn
                  ? `Up to ${fmtFt(chair.heightMaxIn)}`
                  : "Not confirmed"
                return (
                  <tr key={chair.id} className={i % 2 === 0 ? "bg-white" : "bg-sand/40"}>
                    <td className="py-3 pl-4 pr-5">
                      <Link href={`/chairs/${chair.id}`} className="text-navy hover:text-gold font-medium transition-colors">
                        {chair.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.priceMax && chair.priceMax > chair.priceMin
                        ? `$${chair.priceMin.toLocaleString()} - $${chair.priceMax.toLocaleString()}`
                        : `$${chair.priceMin.toLocaleString()}`}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">{chair.track}-Track</td>
                    <td className="py-3 pr-5 text-charcoal">{chair.roller}</td>
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
            ? `$${chair.priceMin.toLocaleString()} - $${chair.priceMax.toLocaleString()}`
            : `$${chair.priceMin.toLocaleString()}`
          const heightRange = chair.heightMinIn && chair.heightMaxIn
            ? `${fmtFt(chair.heightMinIn)} - ${fmtFt(chair.heightMaxIn)}`
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
                    {chair.track && (
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
                  {chair.reviewRating && (
                    <p className="text-sm text-warm-gray mb-3">
                      {chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " - " + chair.reviewCount.toLocaleString() + " reviews" : ""}
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
          If lower back and hip pain is the primary concern, the picks with L-track or SL-track coverage are the right tier: the Luraco Theater Sofy, the AmaMedics Hilux 4D, the Daiwa Majesty 2D, the Kyota Yugana M780, and the Daiwa Legacy 4 all cover below the lumbar. The Panasonic MAF1 covers the neck through the lumbar only and should be ruled out for pain that radiates into the glutes or hips.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If body scanning is a priority, the Kyota Yugana M780 is the standout. The TrueFit scan adjusts the roller start position to your actual shoulder height before each session, which is the most direct technical solution to the petite-fit problem. The Daiwa Legacy 4 also includes body scanning at its price tier.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          includes height as a required field and surfaces only chairs confirmed for your range. The{" "}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit guide</Link>{" "}
          covers how to evaluate chair dimensions in detail, including what to look for on retailer spec pages before purchasing.
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
