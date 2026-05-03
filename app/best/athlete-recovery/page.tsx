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
        <div className="space-y-3 text-sm text-charcoal">
          <div>
            <span className="font-semibold">Track type:</span> L-track or SL-track is required. The roller must reach the glutes and upper hamstrings. An S-track stops at the lumbar and misses the primary lower-body recovery zone entirely.
          </div>
          <div>
            <span className="font-semibold">4D roller depth:</span> Variable intensity by session is essential for training recovery. Lighter passes on day one when inflammation is highest, deeper work on day two. All six chairs below have genuine 4D depth control.
          </div>
          <div>
            <span className="font-semibold">Leg airbag coverage:</span> Rhythmic calf and foot compression mimics compression recovery boots. For lower body athletes especially, this is as important as the roller work.
          </div>
          <div>
            <span className="font-semibold">Timing:</span> 30 to 90 minutes post-training is the right window. Avoid deep roller work immediately after a hard session when acute inflammation is at its peak.
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-sm border-collapse max-w-3xl">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-semibold">Chair</th>
              <th className="text-left p-3 font-semibold">Track</th>
              <th className="text-left p-3 font-semibold">Roller</th>
              <th className="text-left p-3 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody>
            {picks.map((chair, i) => (
              <tr key={chair.id} className={i % 2 === 0 ? "bg-white" : "bg-sand"}>
                <td className="p-3">
                  <Link href={`/chairs/${chair.id}`} className="text-bronze hover:text-gold font-medium">
                    {chair.name}
                  </Link>
                </td>
                <td className="p-3 text-warm-gray">{chair.track}-track</td>
                <td className="p-3 text-warm-gray">{chair.roller}</td>
                <td className="p-3 font-medium">${chair.priceMin.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-8 max-w-2xl mb-16">
        {picks.map((chair) => {
          const ed = EDITORIAL[chair.id]
          if (!ed) return null
          return (
            <div key={chair.id} className="border-l-4 border-gold pl-5">
              <div className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
                {ed.label}
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy mb-2">
                <Link href={`/chairs/${chair.id}`} className="hover:text-gold transition-colors">
                  {chair.name}
                </Link>
              </h3>
              <div className="flex gap-4 text-sm text-warm-gray mb-3">
                <span>{chair.track}-track</span>
                <span>{chair.roller} rollers</span>
                <span className="font-semibold text-charcoal">${chair.priceMin.toLocaleString()}</span>
              </div>
              <p className="text-charcoal text-sm leading-relaxed">{ed.why}</p>
              {chair.affiliateUrl ? (
                <a
                  href={chair.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-block mt-3 text-sm font-semibold text-bronze border border-bronze rounded px-4 py-1.5 hover:bg-bronze hover:text-white transition-colors"
                >
                  Shop This Chair &rarr;
                </a>
              ) : (
                <Link
                  href={`/chairs/${chair.id}`}
                  className="inline-block mt-3 text-sm font-semibold text-bronze border border-bronze rounded px-4 py-1.5 hover:bg-bronze hover:text-white transition-colors"
                >
                  View Details &rarr;
                </Link>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-linen border border-sand rounded-xl p-6 max-w-2xl mb-10">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">Recovery timing guide</h2>
        <div className="space-y-3 text-sm text-charcoal">
          <div>
            <span className="font-semibold">Immediately post-training (0 to 30 min):</span> Light airbag compression only at low intensity. Avoid deep roller work while acute inflammation is highest.
          </div>
          <div>
            <span className="font-semibold">30 to 90 minutes post-training:</span> The optimal window. Medium intensity roller work on the back and glutes, full calf and foot compression. 20 to 25 minutes.
          </div>
          <div>
            <span className="font-semibold">Day 2 and rest days:</span> Full depth 4D roller work appropriate. Morning sessions on rest days decompress the spine and loosen overnight stiffness. Good window for stretch programs.
          </div>
          <div>
            <span className="font-semibold">Before training:</span> Light, short sessions (10 to 15 min) at low intensity can increase circulation and reduce pre-workout tightness. Avoid deep tissue work immediately before high-intensity sessions.
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          <details className="border border-sand rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">Do I need a chair specifically marketed for athletes?</summary>
            <p className="mt-3 text-sm text-charcoal">No. The features that make a chair effective for sports recovery are track type, roller quality, and leg airbag coverage, not the marketing category. Any SL-track or L-track chair with 4D rollers and serious calf compression works for athletic recovery. The Positive Posture Brio Sport is the only chair on this list with explicit athletic marketing; the others are included because their specs match the recovery use case, not their branding.</p>
          </details>
          <details className="border border-sand rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">Can I use a massage chair instead of a foam roller?</summary>
            <p className="mt-3 text-sm text-charcoal">For the back, glutes, and upper legs, yes, a massage chair delivers more thorough tissue work than a foam roller and requires no effort on your part. For the IT band, outer quads, and calves in detail, a foam roller or targeted percussion tool can reach angles the chair cannot. The best approach for high-volume athletes is the chair as the primary daily recovery tool, with a foam roller or gun for spot work on specific problem areas.</p>
          </details>
          <details className="border border-sand rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">What weight capacity do I need for athletic use?</summary>
            <p className="mt-3 text-sm text-charcoal">All six chairs above have weight capacities between 260 and 270 pounds. For buyers above 250 pounds, check the specific capacity before purchasing. Heavier-frame athletes should look at the heavy-duty category, which includes chairs with higher capacity ratings and reinforced frames built for more demanding structural loads.</p>
          </details>
        </div>
      </div>

      <div className="mt-12 p-6 bg-navy text-white rounded-xl max-w-2xl">
        <h2 className="text-xl font-serif font-semibold mb-2">Not sure which chair fits your training?</h2>
        <p className="text-sm text-gray-300 mb-4">
          The chair finder filters by training type, body type, budget, and room constraints to match you with the right chair in under two minutes.
        </p>
        <Link
          href="/finder"
          className="inline-block bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm"
        >
          Find My Chair &rarr;
        </Link>
      </div>

    </div>
  )
}
