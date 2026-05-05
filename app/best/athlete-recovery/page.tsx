import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Athletes and Sports Recovery (2026)",
  description: "The best massage chairs for sports recovery combine SL-track or L-track roller coverage with serious leg compression, 4D roller depth control, and stretch programs. Six picks verified for post-training use across price ranges.",
}

const PICK_IDS = [
  "amamedics-hilux-4d",
  "titan-pro-vigor-4d",
  "relaxonchair-yukon-4d",
  "positive-posture-brio-sport",
  "osaki-os-pro-maestro-le",
  "infinity-genesis-max",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "amamedics-hilux-4d": {
    label: "Best value pick for recovery",
    why: "The Hilux 4D is the only chair in the mid-range with heated rollers rather than just heated lumbar pads. For post-training use, heat that travels with the roller through each pass warms the target tissue directly, which matters for tight glutes and lower back muscles that resist cold-start pressure. SL-track confirmed to 6 feet 7 inches. 270-lb capacity. At $4,999, it delivers the core recovery features without requiring a premium budget: 4D roller depth, SL-track glute coverage, full airbag compression on the legs, and heat that actually reaches the tissue being worked.",
  },
  "titan-pro-vigor-4d": {
    label: "Best mid-range all-rounder",
    why: "The Pro-Vigor 4D delivers heated rollers, SL-track coverage, two-stage zero gravity, and a 260-lb capacity in a space-saving frame that needs less than 4 inches of wall clearance. The 4D roller allows day-to-day intensity variation that is essential for training recovery: lighter depth on day one post-session, deeper work on day two. The space-saving design makes it practical for home gym setups where room is tight. At $5,999, it is the strongest recovery-specific value in the SL-track 4D tier.",
  },
  "relaxonchair-yukon-4d": {
    label: "Best for full-spine and glute coverage",
    why: "The YUKON-4D is the flagship 4D SL-track offering from Relax On Chair, built around precise pressure control and full-spine coverage at $6,499. The SL-track extension ensures the roller reaches the glutes and proximal hamstrings where lower body training creates the most significant muscle damage. The premium pressure control system allows fine-grained intensity adjustment per zone, which matters for athletes whose recovery needs shift by muscle group and training day. Strong airbag coverage on the calves and feet rounds out the lower body compression benefit.",
  },
  "positive-posture-brio-sport": {
    label: "Best for athletes who train legs hard",
    why: "The Brio Sport is designed with athletic recovery as an explicit use case. The L-track extends under the seat to cover the glutes and hamstrings, which is the most important feature for any buyer whose primary training load is in the lower body. The 4D roller system provides variable depth and rhythm. The stretch program delivers a genuine hip flexor elongation that runners, cyclists, and lifters with tight hip flexors will notice after the first few sessions. At $8,999, it is the most purpose-built recovery chair in the catalog. 265-lb capacity.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-body recovery at this tier",
    why: "The Maestro LE 2.0 combines SL-track 4D roller coverage with serious upper-body airbag work and a refined body scanning system that adjusts per session. For athletes who train upper body as well as lower body, the shoulder, arm, and upper back airbag coverage provides compression therapy across the full training zone. 260-lb capacity. The 4D roller depth range on the Maestro is among the widest in the SL-track category, making it effective for both light recovery sessions and deeper tissue work. At $8,999, it is the strongest full-body coverage option at this price point.",
  },
  "infinity-genesis-max": {
    label: "Best premium L-track recovery chair",
    why: "The Genesis Max 4D is the established premium L-track pick for buyers who prioritize glute and hip coverage above full-spine reach. L-track geometry on the Genesis Max delivers extended under-seat coverage that works well for training-related lower back and hip tightness. The 4D roller system with deep pressure capability and broad program library makes it versatile across different training intensities and recovery phases. At $9,299, it occupies the upper-mid tier with a strong reputation among buyers using it for regular athletic maintenance.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestAthleteRecoveryPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Sports Recovery</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Massage chairs built for sports recovery work differently than general-use chairs. The roller needs to reach the glutes and hamstrings, not just the lumbar. The airbag system needs to provide real compression on the calves and feet. The roller depth needs to be adjustable day by day, because post-training muscle tissue is in a different state on day one than day three. These six chairs deliver on all three requirements.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All six chairs have 4D rollers and L-track or SL-track coverage confirmed to reach the glutes. Prices are current MAP pricing. Use the timing guidance below: deeper roller work is best reserved for 30 to 90 minutes post-training, not immediately after a hard session.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters most for recovery</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Track type is the first filter. L-track or SL-track is required. The roller must reach the glutes and upper hamstrings, where the most significant lower-body muscle damage from training accumulates. An S-track stops at the lumbar and misses this zone entirely.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          Variable intensity by session is essential. Lighter passes on day one when inflammation is highest, deeper work on day two as the tissue recovers. All six chairs below have genuine 4D depth control, which is the only roller type that supports this kind of session-to-session adjustment.
        </p>
        <p className="text-charcoal leading-relaxed">
          Rhythmic calf and foot compression mimics compression recovery boots and is as important as the roller work for lower-body athletes. Use the 30 to 90 minute post-training window. Avoid deep roller work immediately after a hard session when acute inflammation is at its peak.
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
          If your training is primarily lower body, prioritize L-track coverage. The Positive Posture Brio Sport ($8,999) is the most purpose-built lower-body recovery chair in the catalog. The Infinity Genesis Max ($9,299) is the L-track value option for glute and hip coverage without the explicit athletic positioning.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If you train upper and lower body and want full-spine recovery per session, the SL-track picks cover more ground. The Amamedics Hilux 4D ($4,999) is the value entry with heated rollers. The Osaki Maestro LE ($8,999) is the most complete full-body option at the top of the range.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          asks about your training type, body measurements, and room size to narrow further. The{" "}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">track types guide</Link>{" "}
          explains the coverage difference between L-track and SL-track for lower-body athletes.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">Recovery timing guide</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Immediately post-training (0 to 30 minutes), use light airbag compression only at low intensity. Avoid deep roller work while acute inflammation is highest. The 30 to 90 minute window is the optimal time for medium intensity roller work on the back and glutes, full calf and foot compression, and sessions of 20 to 25 minutes.
        </p>
        <p className="text-charcoal leading-relaxed">
          On day two and rest days, full-depth 4D roller work is appropriate. Morning sessions decompress the spine and loosen overnight stiffness, and stretch programs are well-suited for this window. Before training, short light sessions of 10 to 15 minutes at low intensity can increase circulation without fatiguing tissue before high-intensity work.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which chair fits your training?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
