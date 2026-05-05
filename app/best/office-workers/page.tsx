import { MCF_CHAIRS } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Office Workers and Desk Jobs (2026) | MassageChairFinder",
  description: "Desk workers need SL-track chairs that address neck and upper back tension specifically, with precise 4D roller control for the cervical and thoracic spine. Six picks from $1,899 to $8,999.",
}

const PICK_IDS = [
  "synca-wellness-circ-plus",
  "ogawa-og6400",
  "relaxonchair-yukon-4d",
  "rockertech-sensation-4d",
  "osaki-os-pro-maestro-le",
  "synca-wellness-kurodo",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "synca-wellness-circ-plus": {
    label: "Best entry-level pick for desk workers",
    why: "The Synca Wellness CirC+ is the strongest entry point for office workers who want a real massage chair without a $5,000 commitment. The SL-track covers neck through glutes, the 3D roller provides depth control for the cervical and upper thoracic regions where desk tension accumulates, and the space-saving design makes it practical for apartment bedrooms or home office setups. At $1,899, it is the starting point for buyers who want to test whether a massage chair will address their desk-related tension before investing more.",
  },
  "ogawa-og6400": {
    label: "Best mid-range for larger office workers",
    why: "The Ogawa Active XL Duo 3D is the strongest mid-range pick for office workers who are heavier or broader than average. At 320 lbs confirmed plus-size capacity with an 11-inch wall clearance and SL-track 3D coverage, it handles more body types than most chairs in its price tier. The dual roller system uses a primary 3D roller for the spine and a secondary roller for supplemental coverage, a design that produces thorough upper back and shoulder-area work. At $4,800, it occupies the mid-range with a feature set more typical of $6,000 chairs.",
  },
  "relaxonchair-yukon-4d": {
    label: "Best precision control for desk tension",
    why: "The Relax On Chair YUKON-4D is built around precision pressure control, which is exactly what desk workers need for neck and cervical spine tension. The ability to run very light intensity in the neck and upper trapezius while running deeper work in the lower back, independently, makes it more useful for office workers with uneven tension distribution than chairs with uniform pressure across all zones. SL-track 4D coverage, zero gravity, and lumbar heat are all included. At $6,499, it is the strongest value-focused pick for buyers whose primary complaint is upper body tension from desk work.",
  },
  "rockertech-sensation-4d": {
    label: "Best body-scanning pick for office workers",
    why: "Office workers have notoriously inconsistent posture. The roller needs to start in the right place relative to the cervical spine or it misses the primary tension area entirely. The RockerTech Sensation 4D's TrueFit body scanning system solves this by detecting shoulder height and mapping the roller path each session, so the neck and upper trapezius coverage is accurate regardless of how you sit down. Dual reflexology foot rollers add recovery for buyers who also stand for parts of their workday. At $6,999, the Sensation is the best-calibrated chair in the mid-tier for desk workers with variable posture.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-coverage pick for office workers",
    why: "Desk workers who carry tension in the neck, shoulders, mid-back, lower back, and hips simultaneously need a chair that can address the whole chain in a single session. The Osaki OS-Pro Maestro LE 2.0's SL-track 4D roller with full upper-body airbag coverage addresses this more thoroughly than any other chair in the $7,000 to $9,000 range. The airbag system compresses the shoulders and upper arms in patterns that relieve the tension that accumulates from typing and mousing, while the roller works the spine from neck to glutes. For the office worker with total-body tension, the Maestro is the single-chair solution.",
  },
  "synca-wellness-kurodo": {
    label: "Best premium pick for office workers",
    why: "The Synca Wellness Kurodo is a Japanese-informed SL-track 4D chair at $9,999 with a focus on therapeutic precision rather than feature accumulation. For desk workers who want the most refined neck and upper thoracic work in the catalog, the Kurodo's roller tuning targets the cervical and upper thoracic regions with the kind of precision that reflects its Japanese engineering heritage. Zero gravity, heat, and foot rollers are all included. For buyers willing to invest in a premium daily-use chair that excels specifically at the tension patterns desk work creates, the Kurodo is the strongest pick at this tier.",
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestOfficeWorkersPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Office Workers</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Desk work creates a specific tension pattern: tight neck and upper trapezius from screen posture, mid-back tension from slouching, and lower back compression from sitting for hours. The right massage chair for an office worker needs to address all three regions, with precise enough roller control to work the cervical spine without being too aggressive for a daily 20-minute session.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated May 2026. All six picks are SL-track chairs with confirmed neck and upper back coverage. Prices range from $1,899 to $9,999.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters for desk worker tension</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          SL-track is required for desk workers. An L-track roller starts at the upper back and misses the neck and cervical region entirely. SL-track covers from neck through glutes, addressing both the cervical tension that builds from screen posture and the lower back compression from long sitting.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          The roller also needs to start at the right height relative to your shoulders. Body scanning or manual shoulder position control ensures the roller addresses the neck rather than floating above it. For buyers with variable posture, body scanning is worth the upgrade.
        </p>
        <p className="text-charcoal leading-relaxed">
          Precision at low intensity matters as much as maximum depth. Daily 20-minute sessions at moderate pressure are more effective than occasional sessions at full intensity. 3D or 4D rollers with a genuine soft lower pressure limit are preferable for daily office use.
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
          Start with budget. At $1,899, the Synca CirC+ is the entry point for buyers who want SL-track coverage without overcommitting. At $4,800, the Ogawa Active XL Duo is the right call for larger-framed buyers who need a confirmed higher weight capacity. The $6,000 to $7,000 range is where precision control and body scanning become available.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If your tension is uneven across the spine, the Relax On Chair YUKON-4D ($6,499) allows independent zone pressure control. If your posture changes significantly depending on how tired you are, the RockerTech Sensation 4D ($6,999) adjusts the roller path per session. For full-chain tension from neck through hips, the Osaki Maestro LE ($8,999) is the single-chair solution.
        </p>
        <p className="text-charcoal leading-relaxed">
          The most effective use pattern for desk-related tension is a 20-minute session immediately after work, before the tension from the day has time to set. The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          narrows by pain location, pressure preference, and budget. See the{" "}
          <Link href="/learn/how-to-use-a-massage-chair" className="text-bronze hover:text-gold transition-colors">first-timer&apos;s guide</Link>{" "}
          for session length and intensity guidance.
        </p>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Not sure which tier makes sense for your situation?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
