import type { Metadata } from "next"
import BuyersGuideForm from "@/components/BuyersGuideForm"
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/buyers-guide" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/buyers-guide"),
  title: "Free Massage Chair Buyer's Guide",
  description:
    "Six decisions that separate a massage chair you will use every day from one you will regret. Free PDF delivered to your inbox.",
}

const sections = [
  { heading: "Track type and your pain", body: "The most important decision you will make, and the one most buyers get wrong. We map S-track, L-track, SL-track, and flex track to specific pain profiles so you know exactly which one fits your body." },
  { heading: "Roller technology explained", body: "What 2D, 3D, and 4D actually mean in practice, why anything above 4D has no industry standard, and what level of roller technology your pain profile actually requires." },
  { heading: "Pressure and intensity fit", body: "The leading cause of massage chair returns is a massage that is too rough. We explain why pressure is a fit variable, not a preference, and what to look for before you buy." },
  { heading: "Zero gravity, body fit, and room fit", body: "What zero gravity actually does for your spine, how to check manufacturer specs against your own measurements, and the floor tape exercise that prevents delivery-day regret." },
  { heading: "What you actually get at each price tier", body: "A clear look at what changes as you move up, plus the cost-per-use math that puts the investment in context." },
  { heading: "Your pre-purchase checklist", body: "Six questions to answer before you commit to any chair, designed to be printed or screenshot and used while you shop." },
]

export default function BuyersGuidePage() {
  return (
    <div className="section" style={{ maxWidth: "680px" }}>

      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "#934713" }}
        >
          Free Download
        </p>
        <h1 className="font-serif text-4xl mb-4" style={{ color: "#1C2331" }}>
          The Massage Chair Buyer&apos;s Guide
        </h1>
        <p className="text-lg text-warm-gray leading-relaxed mb-2">
          Six decisions that separate a chair you will use every day from one you
          will regret.
        </p>
        <p className="text-base text-warm-gray leading-relaxed">
          This guide covers what actually matters when buying a massage chair at
          any price point. No inventory to push. No chairs to sell you. Just the
          information that makes the decision easier.
        </p>
      </div>

      {/* Opt-in form */}
      <div
        className="rounded-xl px-6 py-7 mb-12"
        style={{ background: "#F5F1EB", border: "1px solid #E8DFD3" }}
      >
        <h2
          className="font-serif text-xl mb-1"
          style={{ color: "#1C2331" }}
        >
          Get the Buyer&apos;s Guide
        </h2>
        <p className="text-sm text-warm-gray mb-4">
          Delivered to your inbox. No spam. Unsubscribe anytime.
        </p>
        <BuyersGuideForm buttonLabel="Send Me the Guide" source="landing-page" />
      </div>

      {/* What is inside */}
      <h2 className="font-serif text-2xl mb-6" style={{ color: "#1C2331" }}>
        What is inside
      </h2>
      <div className="space-y-6 mb-12">
        {sections.map((s, i) => (
          <div key={i} className="flex gap-4">
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
              style={{ background: "#D1803E" }}
            >
              {i + 1}
            </span>
            <div>
              <h3
                className="font-semibold mb-1"
                style={{ color: "#1C2331" }}
              >
                {s.heading}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
