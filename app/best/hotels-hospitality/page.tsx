import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from "@/lib/chairs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Massage Chairs for Hotels and Hospitality (2026)",
  description: "The best massage chairs for hotels, resorts, and spas prioritize simple one-touch operation for guests, durable build, a clean look, and a small footprint. Six guest-facing picks compared, from in-room value to a resort-spa flagship.",
}

const PICK_IDS = [
  "culanta-sl-track",
  "osaki-os-champ",
  "healthrelife-4d-15-mode",
  "synca-wellness-circ-plus",
  "relx-20-mode",
  "luraco-i9-max-plus",
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  "culanta-sl-track": {
    label: "Best budget pick for guest rooms or multiple units",
    why: "The Culanta SL-Track Shiatsu is the entry point for a property outfitting several rooms or a pay-per-use corner without a large capital outlay. SL-track shiatsu coverage runs the full spine, and a 4.4 rating across 371 reviews is one of the deepest review bases in the catalog, which matters when the chair will be used by guests who never read a manual. In the Under $3,000 band it is affordable enough to place in volume.",
  },
  "osaki-os-champ": {
    label: "Best compact chair for a lobby or lounge",
    why: "The OS-Champ is the simplest chair to drop into a lobby, lounge, or fitness corner. Its 2D roller runs clear one-touch auto programs a guest can start without instruction, and a space-saving recline plus a confirmed 260 lb capacity make it practical against a wall in a shared space. AI body scanning, heat, and calf and foot coverage are unusual in the Under $3,000 band and give guests a complete session in a small footprint.",
  },
  "healthrelife-4d-15-mode": {
    label: "Best 4D value for a guest amenity",
    why: "The HealthRelife 4D 15-Mode brings 4D roller movement and a wide menu of preset programs to a price most properties can place in more than one location. The 15 modes give guests variety without configuration, and a 4.6 rating across 136 reviews signals it holds up to frequent, varied use. SL-track coverage and a 55-inch track make the session feel premium relative to the price.",
  },
  "synca-wellness-circ-plus": {
    label: "Best design-forward chair for a visible space",
    why: "The CirC+ is the pick when the chair sits where guests see it. Synca builds for a cleaner, more furniture-like look than most massage chairs, and the CirC+ keeps a space-saving 6-inch wall clearance, a confirmed 300 lb capacity, SL-track 3D rollers, AI body scanning, heat, and calf and foot coverage. A 5.0 rating, across a smaller review set, reflects a chair that reads as an amenity rather than equipment.",
  },
  "relx-20-mode": {
    label: "Best proven pick for high-traffic placement",
    why: "The RELX Full Body 20-Mode has the largest review base on this list, a 4.5 rating across 457 reviews, the kind of track record that matters when a chair will be used by hundreds of different guests. Twenty preset modes and zero gravity recline give variety with one-touch operation, and SL-track coverage runs the full spine. For a high-traffic lobby or a pay-per-use installation, proven reliability across many users is the deciding factor.",
  },
  "luraco-i9-max-plus": {
    label: "Best luxury flagship for a resort spa",
    why: "The i9 Max Plus is the flagship for a luxury resort or destination spa where the chair is part of the experience. Luraco is built in the United States, and the i9 Max Plus is the tallest-fit chair in the catalog, confirmed up to 6'10\", with L-track coverage, 3D rollers, AI body scanning, heat, and a 300 lb capacity. In the $12,000 and up band it is a considered amenity investment for a property marketing wellness at the high end.",
  },
}

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "What should a hotel look for in a massage chair?",
    a: "Guest-facing placement changes the priorities. Simple one-touch operation matters most, since guests use the chair once and will not learn a menu, and a clean, furniture-like look matters because the chair is part of the room's impression. Durability under stranger use, a small footprint for lobbies and lounges, and a deep review history that signals reliability round out the list. Weight capacity is worth confirming with the retailer for any guest-facing chair, since you cannot predict who sits in it.",
  },
  {
    q: "Can hotels charge guests to use a massage chair?",
    a: "Yes. Pay-per-use and coin or app-operated models let a property generate revenue from a chair placed in a lobby, lounge, or guest room rather than offering it as a free amenity. The economics depend on foot traffic, placement, and the per-session price. The massage chair vending business guide covers how the pay-per-use model works and what drives its return.",
  },
  {
    q: "Do massage chair warranties cover hotel or commercial use?",
    a: "Usually not by default. Most residential massage chair warranties exclude commercial and hospitality settings, so a chair in a hotel can fall outside standard coverage. Before buying, confirm in writing whether the warranty applies to commercial placement and whether a commercial service plan is available. For a chair used by many guests a day, that coverage often matters more to total cost than the purchase price.",
  },
  {
    q: "What is the best budget massage chair for a hotel?",
    a: "Confirmed picks suitable for guest use start in the Under $3,000 band. For in-room placement or a multi-unit rollout, an affordable, simple chair with a deep review history is the practical choice, since reliability across many guests matters more than advanced features. For a resort spa or a marquee wellness suite, a luxury flagship makes sense where the chair anchors the experience. Budget by the role of the room and the volume of guests, not by features alone.",
  },
]

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestHotelsHospitalityPage() {
  const picks = PICK_IDS
    .map(id => MCF_CHAIRS.find(c => c.id === id))
    .filter(Boolean) as typeof MCF_CHAIRS

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://massagechairfinder.com/" },
      { "@type": "ListItem", position: 2, name: "Best chairs by use case", item: "https://massagechairfinder.com/best" },
      { "@type": "ListItem", position: 3, name: "Best Massage Chairs for Hotels and Hospitality", item: "https://massagechairfinder.com/best/hotels-hospitality" },
    ],
  }

  return (
    <div className="section">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mb-4">
        <Link href="/best" className="text-bronze hover:text-gold text-sm">
          &larr; Best chairs by use case
        </Link>
      </div>

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Hotels and Hospitality</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The best massage chairs for hotels, resorts, and spas prioritize simple one-touch operation, a clean look, durability under stranger use, and a footprint that fits a lobby or guest room. A hospitality chair serves a guest who will use it once and never read the manual, so the chair has to be obvious to start and reliable across hundreds of different users. The six picks below are chosen for guest-facing placement, from an entry-tier in-room value chair to a resort-spa flagship.
      </p>
      <p className="text-charcoal max-w-2xl mb-3">
        Two practical notes before you choose. First, most residential massage chair warranties exclude commercial and hospitality settings, so confirm coverage in writing for any guest-facing chair. Second, a chair placed in a lobby or guest room can be offered as a free amenity or run as a pay-per-use installation that generates revenue. Every chair here is drawn from the models we have researched and verified pricing and specifications for, and each spec cited comes from the manufacturer or retailer spec sheet, not estimates.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated June 2026. This page is part of the commercial cluster alongside{" "}
        <Link href="/best/senior-living-facilities" className="text-bronze hover:text-gold transition-colors">senior living facilities</Link>{" "}
        and{" "}
        <Link href="/best/gyms-wellness-centers" className="text-bronze hover:text-gold transition-colors">gyms and wellness centers</Link>. To run a chair as a revenue source, see the{" "}
        <Link href="/learn/massage-chair-vending-business" className="text-bronze hover:text-gold transition-colors">massage chair vending business guide</Link>.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What matters for a guest-facing chair</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Simplicity comes first.</strong> A guest uses the chair once. One-touch auto programs and a short list of clear modes beat deep customization, because a chair that needs explaining goes unused. The picks here all start a full session from a single button.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Look and footprint matter because guests see it.</strong> A hospitality chair is part of the room's impression, so a cleaner, more furniture-like design and a space-saving recline that fits a lobby or guest room carry real weight. A bulky chair that dominates a small space works against the room.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          <strong>Reliability across many users is the real test.</strong> A guest chair runs more sessions, by more different people, than any home unit. A deep review history is the best available signal that a chair holds up, which is why several picks here are chosen for review depth rather than spec sheets alone. The{" "}
          <Link href="/learn/how-long-do-massage-chairs-last" className="text-bronze hover:text-gold transition-colors">longevity guide</Link>{" "}
          covers what drives lifespan under heavy use.
        </p>
        <p className="text-charcoal leading-relaxed">
          <strong>Decide amenity or revenue early.</strong> A free amenity and a pay-per-use installation lead to different placements and different chairs. If the goal is revenue, the{" "}
          <Link href="/learn/massage-chair-vending-business" className="text-bronze hover:text-gold transition-colors">vending business guide</Link>{" "}
          covers the pay-per-use model in depth.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-5">Quick comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-sand">
                <th className="text-left py-3 pl-4 pr-5 font-semibold text-charcoal whitespace-nowrap">Chair</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Price band</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Track</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Roller</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Zero Gravity</th>
                <th className="text-left py-3 pr-5 font-semibold text-charcoal whitespace-nowrap">Reviews</th>
                <th className="text-left py-3 font-semibold text-charcoal whitespace-nowrap">Weight Cap</th>
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
                      {priceBand(chair).range}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.track === "vibration" ? "Airbag/Vibration" : `${chair.track}-Track`}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.track === "vibration" ? "Airbag" : (chair.roller || "n/a")}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">{zgLabel}</td>
                    <td className="py-3 pr-5 text-charcoal">
                      {chair.reviewCount ? chair.reviewCount.toLocaleString() : "n/a"}
                    </td>
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
          const priceLabel = priceBand(chair).range
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
                      <span className="text-gold">{"★".repeat(Math.round(chair.reviewRating))}</span>
                      {" "}{chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
                      {chair.reviewSource ? " at " + chair.reviewSource : ""}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {heightRange && <span className="text-xs text-warm-gray">Height: {heightRange}</span>}
                    {chair.weightCapacityLbs ? <span className="text-xs text-warm-gray">Capacity: {chair.weightCapacityLbs} lbs</span> : null}
                    {chair.wallClearanceIn ? <span className="text-xs text-warm-gray">Wall clearance: {chair.wallClearanceIn}&quot;</span> : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {resolveAffiliateUrl(chair) && (
                      <a href={resolveAffiliateUrl(chair)} target="_blank" rel="sponsored noopener"
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
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How to choose for your property</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          For in-room placement or a multi-unit rollout, the Culanta SL-Track Shiatsu (Under $3,000) and RELX Full Body 20-Mode (Under $3,000) are the value picks, both chosen for deep review histories that signal reliability across many guests. For a lobby or lounge where footprint matters, the Osaki OS-Champ (Under $3,000) is the most compact, simplest option.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For a space where the chair is on display, the Synca Wellness CirC+ (Under $3,000) reads as furniture rather than equipment, and the HealthRelife 4D 15-Mode (Under $3,000) adds 4D movement and a wide preset menu at a price that scales to several rooms.
        </p>
        <p className="text-charcoal leading-relaxed">
          For a luxury resort or destination spa, the Luraco i9 Max Plus ($12,000 and up) is the flagship, built in the United States with the tallest confirmed fit in the catalog. The{" "}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{" "}
          narrows by feature priority, footprint, and budget if you are matching a chair to a specific space.
        </p>
      </div>

      <div className="mb-12 max-w-2xl">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-5">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="bg-white border border-sand rounded-lg p-5">
              <summary className="font-serif font-semibold text-navy cursor-pointer">{faq.q}</summary>
              <p className="text-charcoal leading-relaxed mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-sand rounded-xl p-6 text-center max-w-lg">
        <p className="text-charcoal font-medium mb-1">Matching a chair to your space?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about footprint, feature priority, and budget. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
