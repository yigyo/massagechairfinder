import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Seniors (2026)",
  description: "The best massage chairs for seniors prioritize zero gravity positioning, gentle pressure options, and reliable heat therapy. Six picks verified for ease of use, comfort, and long-term durability.",
}

const PICK_IDS = [
  "kyota-genki-m380",
  "inner-balance-jin-2",
  "medical-breakthrough-6",
  "amamedics-hilux-4d",
  "human-touch-laevo-zg",
  "kyota-yugana-m780",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "kyota-genki-m380": {
    label: "Best entry pick for seniors",
    why: "The Genki M380 is the Wirecutter Top Pick for 2024 and the most forgiving chair in the catalog at this price. L-track covers the lower back, glutes, and upper thighs, which is where most chronic pain accumulates in older buyers. The 330-lb weight capacity is the highest in the under-$3,500 range, and the zero gravity position takes pressure off the lumbar during the session. At $2,999, it delivers the fundamentals without requiring buyers to navigate complex programs or settings.",
  },
  "inner-balance-jin-2": {
    label: "Best space-saving option",
    why: "The Jin 2.0 fits within 2 inches of the wall, which matters for seniors who are working with smaller rooms or placing the chair in a bedroom rather than a dedicated space. SL-track coverage, three-stage zero gravity, 300-lb capacity. The upgrade from the original Jin adds deeper recline and a more refined program set. Straightforward controls without unnecessary complexity. At $3,999, it is the most practical SL-track chair in the catalog for buyers prioritizing ease of placement.",
  },
  "medical-breakthrough-6": {
    label: "Best 4D roller at the mid-range",
    why: "Medical Breakthrough chairs are built around the premise that therapeutic quality should not require an ultra-premium budget. The MB6 delivers 4D roller depth, heat, stretch, full body scanning, and a 300-lb capacity at $4,249. L-track coverage includes the lower back and glutes. The four-dimensional roller movement allows slower, more deliberate passes, which is preferable for buyers with sensitive joints or chronic pain conditions where the intensity of a 2D roller is too jarring. Strong warranty terms back the purchase.",
  },
  "amamedics-hilux-4d": {
    label: "Best for persistent joint and back pain",
    why: "The Hilux 4D is the one chair in the mid-range with heated rollers rather than just heated pads. The distinction matters for seniors with chronic joint pain: the heat penetrates directly through the roller contact point rather than radiating from a surface pad. SL-track confirmed from 4 foot 11 inches to 6 foot 7 inches, one of the wider confirmed height ranges in the catalog. 270-lb capacity. At $4,999, it is the most feature-complete chair for buyers managing chronic inflammation, arthritis discomfort, or persistent lower back tightness.",
  },
  "human-touch-laevo-zg": {
    label: "Best for pressure-sensitive buyers",
    why: "The Laevo ZG is not a roller chair. It delivers massage through airbag compression and gentle vibration rather than a mechanical roller track. That distinction matters: seniors with osteoporosis, significant spinal stenosis, recent surgery, or extreme pressure sensitivity may find roller-based massage too intense regardless of intensity settings. The Laevo ZG provides the zero gravity positioning benefit and full-body air compression without any roller contact. Always consult a physician before using any massage chair if you have recent surgical hardware, significant bone density concerns, or active spinal compression.",
  },
  "kyota-yugana-m780": {
    label: "Best premium pick for seniors",
    why: "The Yugana M780 combines L-track coverage with a 4D roller, TrueFit body scanning, 300-lb capacity, heat, and a 2-inch wall clearance in a space-saving frame. The body scan reads the curvature and length of the spine before each session and adjusts the roller start position accordingly, which matters for seniors whose posture and spinal alignment have shifted over time. 4D roller depth allows the chair to match the pressure profile to the session rather than running a fixed intensity. At $7,999, this is the chair for seniors who want a long-term health investment rather than a temporary solution.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestSeniorsPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Seniors</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Seniors shopping for a massage chair are solving a different problem than younger buyers: the priority is consistent daily relief, not performance. Zero gravity positioning, gentle heat, and adjustable pressure intensity matter more than advanced features. The chairs below are picked for reliability, ease of use, and therapeutic effectiveness for buyers managing chronic pain, joint stiffness, or limited mobility.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. One chair on this list (the Human Touch Laevo ZG) uses airbag compression rather than rollers and is included specifically for buyers who cannot tolerate roller pressure. Consult your physician before using any massage chair if you have spinal hardware, recent surgery, or significant bone density concerns.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters most for senior buyers</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Zero gravity recline</strong> is the single most important feature for older buyers. Elevating the knees above the heart removes gravitational stress from the lumbar spine during the session, which makes a meaningful difference for buyers with chronic compression or disc issues. Most chairs in the $2,500+ range include it.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Pressure sensitivity</strong> is the most overlooked consideration. Most massage chair returns happen because the massage is too rough, not because the chair did not work. If you bruise easily, have fibromyalgia, or are new to mechanical massage, look for chairs with wide intensity ranges and gentle program modes. The Human Touch Laevo ZG is on this list specifically for buyers who need a non-roller option.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Track type</strong> still matters. Lower back pain is the dominant complaint in this age group. An S-track chair covers the neck through the lumbar but stops there. An L-track or SL-track chair extends under the glutes and upper thighs, which is where sciatic and hip pain lives. If the pain radiates below the waist, SL-track is the better call.
        </p>
        <p className="text-charcoal leading-relaxed">
          <strong>Ease of getting in and out</strong> depends more on the chair frame and armrest position than on any spec sheet metric. Zero gravity positioning helps with both entry and exit. Chairs with lower seat heights and wider seat widths are generally easier to use for buyers with hip or knee issues.
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
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Weight Cap</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((chair, i) => {
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
                        ? `$${chair.priceMin.toLocaleString()} - $${chair.priceMax.toLocaleString()}`
                        : `$${chair.priceMin.toLocaleString()}`}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.track === "vibration" ? "Airbag/Vibration" : `${chair.track}-Track`}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">{chair.roller}</td>
                    <td className="py-3 pr-5 text-charcoal">{zgLabel}</td>
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
                    {chair.track && chair.track !== "vibration" && (
                      <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">{chair.track}-Track</span>
                    )}
                    {chair.track === "vibration" && (
                      <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">Airbag + Vibration</span>
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
                      <span className="text-gold">{"&#9733;".repeat(Math.round(chair.reviewRating))}</span>
                      {" "}{chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " - " + chair.reviewCount.toLocaleString() + " reviews" : ""}
                      {chair.reviewSource ? " at " + chair.reviewSource : ""}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {heightRange && <span className="text-xs text-warm-gray">Height: {heightRange}</span>}
                    {chair.weightCapacityLbs ? <span className="text-xs text-warm-gray">Capacity: {chair.weightCapacityLbs} lbs</span> : null}
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
          If the main concern is chronic lower back or hip pain, the Genki M380 (entry), Medical Breakthrough 6 (mid-range), or Kyota Yugana M780 (premium) are all L-track chairs that cover the glutes. Any of the SL-track picks also cover that range. If the pain is primarily upper back and neck, any chair on this list works.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If pressure sensitivity is the concern, start at the lowest intensity setting on any roller chair before building up over multiple sessions. If roller pressure is not tolerable regardless of intensity, the Human Touch Laevo ZG is the right category. It is not a compromise; it is a different tool for a different need.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          walks through pressure preference, pain location, and budget to surface the right match. The{" "}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">track types guide</Link>{" "}
          explains S, L, and SL coverage in plain terms if the distinction is still unclear.
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
