import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/best/tall-people" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/best/tall-people"),
  title: 'Best Massage Chairs for Tall People, Including Big and Tall (2026)',
  description: "Nine massage chairs confirmed by their listings for tall buyers from 6'5\" to 6'10\", including big and tall picks rated to 300 lbs or more. Fit data, track length and capacity compared.",
}

const PICK_IDS = [
  'kyota-genki-m380',
  'amamedics-hilux-4d',
  'daiwa-majesty-2d',
  'daiwa-legacy-4',
  'luraco-i9-max-plus',
  'positive-posture-brio-sport',
  'daiwa-black-panther-supreme-hybrid',
  'kyota-yutaka-m898',
  'luraco-model-3-hybrid-sl-medical',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'kyota-genki-m380': {
    label: 'Best entry for tall buyers',
    why: 'The Genki M380 is confirmed for buyers up to 6\'5" and 330 lbs. L-track covers the glutes and upper thighs. 2D rollers. Its price has moved between the entry and upper-mid bands with retailer promotions through 2026, so check the current band badge; the case for it is the documented 6\'5" fit at any of those prices.',
  },
  'amamedics-hilux-4d': {
    label: 'Best SL-track for tall buyers',
    why: 'The Hilux 4D is confirmed for 4\'11" to 6\'7", the tallest confirmed maximum of any SL-track chair on this page. The 53-inch track is one of the longer SL-track systems available, which helps ensure the roller reaches the lumbar on taller bodies. 4D rollers, heated roller element, space-saving. The 270-lb weight limit is the constraint: tall buyers who also need higher capacity should see the Daiwa Legacy 4 or Luraco below.',
  },
  'daiwa-majesty-2d': {
    label: 'Widest confirmed range in the $5,000-$7,999 band',
    why: 'The Majesty 2D is confirmed for 4\'8" to 6\'6", a tall-buyer designation from the retailer, with a 265 lb capacity. Its L-track reaches under the glutes, which is where most tall buyers find shorter tracks stop early. Zero gravity, heat, and double reflexology foot rollers are confirmed; there is no stretch program. The 2D roller keeps the massage steady rather than deep, so it suits tall buyers who want reach and fit over intensity.',
  },
  'daiwa-legacy-4': {
    label: 'Best L-track range for tall buyers',
    why: 'The Legacy 4 is confirmed from 4\'8" to 6\'6" with a 49-inch L-track, body scanning, two-stage zero gravity, and 300-lb capacity. Space-saving 3.25-inch wall clearance. For tall buyers specifically focused on lower back and glute coverage rather than full spine, this is the pick in the $8,000-$11,999 band. 3D rollers.',
  },
  'luraco-i9-max-plus': {
    label: 'Confirmed to 6\'10" at 300 lbs',
    why: 'The Luraco i9 Max Plus is confirmed for buyers from 4\'11" to 6\'10" at 300 lbs, tied with the Luraco Model 3 below for the highest verified maximum height in this catalog. Made in the United States. L-track with 3D rollers, zero gravity, body scanning, heat, stretch, and calf and foot massage. For buyers above 6\'6" who also carry a broader frame, it is one of two chairs here that confirm both numbers at the top of the range.',
  },
  'positive-posture-brio-sport': {
    label: 'Wide confirmed height fit, L-track 4D',
    why: "The Positive Posture Brio Sport is confirmed for buyers from 5'0\" to 6'5\" with a 47-inch L-track, 4D rollers, heat, and foot massage in the $8,000-$11,999 band. The 47-inch track length combined with the confirmed height range means the roller path is designed to reach the true lumbar on taller bodies. 265-lb weight capacity. No zero gravity on this model. For tall buyers who want confirmed height fit with 4D roller depth at the premium tier, this is the documented-fit option.",
  },
  'daiwa-black-panther-supreme-hybrid': {
    label: 'Wide confirmed height range: 4\'8" to 6\'6"',
    why: "The Black Panther Supreme Hybrid is confirmed for 4 foot 8 inches to 6 foot 6 inches at 300 lbs, one of the broadest verified height ranges in this catalog. The HybriFlex track extends further under the glutes than a standard SL-track, which matters more for taller buyers because the distance from the neck to the tailbone is longer and most chairs do not reach the full length. Heat, stretch, zero gravity, 3D rollers, foot rollers. In the $12,000 and up band, this is the premium pick for tall buyers who cannot find a chair that actually fits.",
  },
  'kyota-yutaka-m898': {
    label: 'Lowest-priced pick confirmed past 6\'6"',
    why: "The Yutaka M898 is confirmed from 5'4\" to 6'7\" at 300 lbs, which makes it the lowest-priced chair on this page that clears 6'6\" and the value pick for big and tall buyers. The 49-inch L-track reaches under the glutes, the rollers are 4D, and zero gravity, body scan, heat, and calf and foot massage are all listed. It needs only 2 inches of wall clearance. The 5'4\" minimum is the trade-off: it is a poor match for a household that shares one chair with a much shorter partner.",
  },
  'luraco-model-3-hybrid-sl-medical': {
    label: 'Longest track for tall buyers',
    why: "The Model 3 Hybrid SL Medical is confirmed from 4'7\" to 6'10\" at 300 lbs, and its retailer lists it as a big and tall chair. Its 60-inch split L-track is the longest on this page, and track length is the spec that decides whether the rollers still reach the lower back and glutes on a long torso. 3D rollers, full-body stretch, zero gravity, body scan, and heat to the lower back and feet. Made in the United States. Its 4'7\" minimum is also the lowest on this page, so a much shorter partner can share it.",
  },
}

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "What is the best big and tall massage chair?",
    a: "Pick a chair whose listing confirms your height and your weight together. In this catalog the Luraco Model 3 Hybrid SL Medical and the Luraco i9 Max Plus both confirm 6 foot 10 inches and 300 lbs. The Kyota Yutaka M898 confirms 6 foot 7 inches and 300 lbs at a lower price, and the Kyota Genki M380 confirms 6 foot 5 inches and 330 lbs at the entry end. Buyers who need more than 300 lbs should start from the heavy-duty list, where capacity is the first filter and height is the second.",
  },
  {
    q: "What is the best massage chair for someone over 6 foot 3 inches?",
    a: "The Luraco i9 Max Plus and the Luraco Model 3 Hybrid SL Medical share the highest confirmed maximum in the catalog at 6 foot 10 inches. For buyers who also need higher weight capacity, the Daiwa Black Panther Supreme Hybrid is confirmed to 6 foot 6 inches at 300 lbs with a HybriFlex track that extends further under the glutes. The Kyota Genki M380 is the entry point, confirmed to 6 foot 5 inches.",
  },
  {
    q: "Why does a chair's maximum rated height not guarantee a good fit?",
    a: "The rated maximum usually reflects the tallest buyer whose head clears the headrest, not whether the roller track reaches the full spine at that height. A tall buyer in a chair rated for their height can still find the lumbar roller landing mid-back rather than at the true lumbar vertebrae, which is why confirmed retailer fit data matters more than the spec sheet number alone.",
  },
  {
    q: "Does track length matter more for tall buyers?",
    a: "Yes. The distance from the neck to the tailbone is longer on a tall body, so a short track simply cannot reach the full spine. The AmaMedics Hilux 4D's 53-inch track and the Daiwa Black Panther's HybriFlex track were both picked for this page specifically because they extend further than standard-length tracks.",
  },
  {
    q: "What weight capacity should a tall buyer look for?",
    a: "Height and weight capacity are separate specs, and a tall buyer is not automatically a heavy one, but the two often need checking together. The Luraco i9 Max Plus and the Daiwa Legacy 4 both confirm 300 lbs alongside their tall-buyer height data, which covers most tall-and-broader frames in this catalog.",
  },
]

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestTallPeoplePage() {
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.massagechairfinder.com/" },
      { "@type": "ListItem", position: 2, name: "Best chairs by use case", item: "https://www.massagechairfinder.com/best" },
      { "@type": "ListItem", position: 3, name: "Best Massage Chairs for Tall People", item: "https://www.massagechairfinder.com/best/tall-people" },
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Tall People</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The best massage chair for a tall person is one whose listing confirms your height and whose roller track is long enough to reach your lower back. In this catalog the Luraco Model 3 Hybrid SL Medical and the Luraco i9 Max Plus confirm the tallest fit, to 6'10&quot;, at 300 lbs, which also makes them the big and tall picks. Below them, the Kyota Yutaka M898 confirms 6'7&quot; at 300 lbs and the Kyota Genki M380 confirms 6'5&quot; at 330 lbs, both at lower price bands.
      </p>
      <p className="text-charcoal max-w-2xl mb-3">
        Massage chairs list maximum height accommodations, but the spec sheet number does not always mean the chair delivers effective coverage at that height. A buyer at 6'3&quot; in a chair rated to 6'3&quot; may find the lumbar roller lands mid-back rather than at the true lumbar vertebrae. This page covers chairs with confirmed tall-buyer fit data, sourced from retailer pages rather than manufacturer marketing sheets.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated November 2026. All nine chairs below are confirmed by their retailer listings for buyers at 6'5&quot; or taller.
      </p>

      <div className="mb-10 max-w-2xl flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg px-5 py-4" style={{ background: '#F5F1EB', border: '1px solid #E8DFD3' }}>
        <p className="text-sm text-charcoal flex-1">
          Want a shortlist for your body, room, and budget? The Chair Finder takes about 3 minutes.
        </p>
        <Link href="/finder?src=best-top" className="btn-primary text-sm text-center whitespace-nowrap">
          Find My Chair
        </Link>
      </div>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">Why confirmed height data matters more than rated height</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          A chair&apos;s maximum rated height typically reflects the tallest buyer who can sit in the chair without their head exceeding the headrest height. It does not always mean the roller track covers the full spine at that height.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For a tall buyer, the key question is whether the roller can position itself at the top of the cervical spine and extend to the lumbar at their proportions. Chairs with body scanning address this by adjusting the roller start position before each session. Confirmed tall-buyer fit data, meaning the retailer has tested and verified the fit for users at or above 6'3&quot;, is stronger evidence than a spec sheet maximum alone.
        </p>
        <p className="text-charcoal leading-relaxed">
          Track length is the other factor. A longer roller track means more distance covered, which matters for taller buyers whose spine length requires more range. For SL-track and L-track chairs, a longer track also means the under-seat extension reaches further for taller frames.
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
                  : 'Not confirmed'
                const zgLabel = chair.zeroGravityStages
                  ? `${chair.zeroGravityStages}-stage`
                  : chair.zeroGravity
                  ? 'Yes'
                  : 'No'
                return (
                  <tr key={chair.id} className={i % 2 === 0 ? 'bg-white' : 'bg-sand/40'}>
                    <td className="py-3 pl-4 pr-5">
                      <Link href={`/chairs/${chair.id}`} className="text-navy hover:text-gold font-medium transition-colors">
                        {chair.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-5 text-charcoal">
                      {priceBand(chair).range}
                    </td>
                    <td className="py-3 pr-5 text-charcoal">{chair.track}-Track</td>
                    <td className="py-3 pr-5 text-charcoal">{chair.roller}</td>
                    <td className="py-3 pr-5 text-charcoal">{zgLabel}</td>
                    <td className="py-3 pr-5 text-charcoal">{heightRange}</td>
                    <td className="py-3 text-charcoal">
                      {chair.weightCapacityLbs ? `${chair.weightCapacityLbs} lbs` : 'Not confirmed'}
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
                    {chair.track && chair.track !== 'vibration' && (
                      <span className="border border-navy text-navy text-xs font-medium px-3 py-1 rounded-full">{chair.track}-Track</span>
                    )}
                    {chair.roller && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">{chair.roller}</span>
                    )}
                    {chair.zeroGravity && (
                      <span className="border border-teal text-teal text-xs font-medium px-3 py-1 rounded-full">
                        {chair.zeroGravityStages ? `ZG ${chair.zeroGravityStages}-stage` : 'Zero Gravity'}
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
                      <span className="text-gold">{"\u2605".repeat(Math.round(chair.reviewRating))}</span>
                      {" "}{chair.reviewRating.toFixed(1)}
                      {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
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
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">How to narrow from here</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          If your height is between 6'3&quot; and 6'6&quot;, every chair above is confirmed for you, so narrow by track and price. The Hilux 4D is the SL-track pick; the Legacy 4 and Majesty 2D are L-track picks at two different price bands; the Genki M380 carries the highest weight capacity on the page at 330 lbs.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If you are above 6'6&quot;, four chairs confirm past that line: the Kyota Yutaka M898 and AmaMedics Hilux 4D to 6'7&quot;, and the Luraco i9 Max Plus and Model 3 Hybrid SL Medical to 6'10&quot;. If you are also broad or heavy, the two Luracos and the Yutaka pair that height with 300 lbs, while the Hilux stops at 270. For capacity above 300 lbs, start from the{' '}
          <Link href="/best/heavy-duty" className="text-bronze hover:text-gold transition-colors">heavy-duty massage chairs</Link>{' '}
          list instead.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes height as a required field and only surfaces chairs confirmed for your range. The{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit guide</Link>{' '}
          explains how to evaluate chair dimensions against your proportions before purchasing.
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
        <p className="text-charcoal font-medium mb-1">Not sure which of these fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">Answer a few questions about your pain, body, and space. The finder narrows to the right chair.</p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>

    </div>
  )
}
