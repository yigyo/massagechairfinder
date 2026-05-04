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
    why: "The Synca Wellness CirC+ is the strongest entry point for office workers who want a real massage chair without a $5,000 commitment. The SL-track covers neck through glutes, the 3D roller provides depth control for the cervical and upper thoracic regions where desk tension accumulates, and the space-saving design makes it practical for apartment bedrooms or office den setups. At $1,899, it is the starting point for buyers who want to test whether a massage chair will address their desk-related tension before investing more.",
  },
  "ogawa-og6400": {
    label: "Best mid-range for larger office workers",
    why: "The Ogawa Active XL Duo 3D is the strongest mid-range pick for office workers who are heavier or broader than average. At 320 lbs confirmed plus-size capacity with an 11-inch wall clearance and SL-track 3D coverage, it handles more body types than most chairs in its price tier. The dual roller system uses a primary 3D roller for the spine and a secondary roller for supplemental coverage -- a design that produces thorough upper back and shoulder-area work. At $4,800, it occupies the mid-range with a feature set more typical of $6,000+ chairs.",
  },
  "relaxonchair-yukon-4d": {
    label: "Best precision control for desk tension",
    why: "The Relax On Chair YUKON-4D is built around precision pressure control, which is exactly what desk workers need for neck and cervical spine tension. The ability to run very light intensity in the neck and upper trapezius while running deeper work in the lower back -- independently -- makes it more useful for office workers with uneven tension distribution than chairs with uniform pressure across all zones. SL-track 4D coverage, zero gravity, and lumbar heat are all included. At $6,499, it is the strongest value-focused pick for buyers whose primary complaint is upper body tension from desk work.",
  },
  "rockertech-sensation-4d": {
    label: "Best body-scanning pick for office workers",
    why: "Office workers have notoriously inconsistent posture -- the roller needs to start in the right place relative to the cervical spine or it misses the primary tension area entirely. The RockerTech Sensation 4D's TrueFit body scanning system solves this by detecting shoulder height and mapping the roller path each session, so the neck and upper trapezius coverage is accurate regardless of how you sit down. Dual reflexology foot rollers add recovery for buyers who also stand for parts of their workday. At $6,999, the Sensation is the best-calibrated chair in the mid-tier for desk workers with variable posture.",
  },
  "osaki-os-pro-maestro-le": {
    label: "Best full-coverage pick for office workers",
    why: "Desk workers who carry tension in the neck, shoulders, mid-back, lower back, and hips simultaneously need a chair that can address the whole chain in a single session. The Osaki OS-Pro Maestro LE 2.0's SL-track 4D roller with full upper-body airbag coverage addresses this more thoroughly than any other chair in the $7,000-$9,000 range. The airbag system compresses the shoulders and upper arms in patterns that relieve the tension that accumulates from typing and mousing, while the roller works the spine from neck to glutes. For the office worker with total-body tension, the Maestro is the single-chair solution.",
  },
  "synca-wellness-kurodo": {
    label: "Best premium pick for office workers",
    why: "The Synca Wellness Kurodo is a Japanese-informed SL-track 4D chair at $9,999 with a focus on therapeutic precision rather than feature accumulation. For desk workers who want the most refined neck and upper thoracic work in the catalog, the Kurodo's roller tuning targets the cervical and upper thoracic regions with the kind of precision that reflects its Japanese engineering heritage. Zero gravity, heat, and foot rollers are all included. For buyers willing to invest in a premium daily-use chair that excels specifically at the tension patterns desk work creates, the Kurodo is the strongest pick at this tier.",
  },
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
        <div className="space-y-3 text-sm text-charcoal">
          <div>
            <span className="font-semibold">SL-track is required:</span> Neck and cervical tension is where desk workers feel it most. An L-track roller starts at the upper back and misses the neck and shoulder region entirely. SL-track is the minimum for office worker use cases.
          </div>
          <div>
            <span className="font-semibold">Shoulder position adjustment:</span> The roller needs to start at the right height relative to your shoulder. Body scanning or manual shoulder position control ensures the roller works the neck rather than floating above it.
          </div>
          <div>
            <span className="font-semibold">Precision at low intensity:</span> Daily use at moderate pressure is more effective than occasional sessions at maximum intensity. 3D or 4D rollers with a soft lower pressure limit are preferable for daily 20-minute sessions.
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
                {chair.aiScanning && <span className="bg-sand px-2 py-1 rounded">Body scanning</span>}
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

      <div className="bg-sand rounded-xl p-6 mb-8 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-2">Using your chair at work</h2>
        <p className="text-sm text-charcoal">
          The most effective use pattern for desk-related tension is a 20-minute session immediately after work, before the tension from the day has had time to set into chronic tightness. SL-track chairs run top-to-bottom automatically in most auto programs, which means you can start a session and decompress without managing settings. See the <Link href="/learn/how-to-use-a-massage-chair" className="text-bronze hover:text-gold">first-timer's guide</Link> for session length and intensity guidance.
        </p>
      </div>

      <div className="card bg-navy text-white text-center">
        <p className="text-lg font-serif mb-2">Not sure which tier makes sense for your situation?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz asks about your pain location, pressure preference, and budget to give you a direct recommendation.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
