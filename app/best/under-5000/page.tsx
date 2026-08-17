import { MCF_CHAIRS , priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs Under $5,000 (2026): 6 Picks by Use Case',
  description: 'The best massage chairs under $5,000, from entry-tier 3D SL-track value to the first 4D options. Six chairs compared by track, body fit, and use case.',
}

const PICK_IDS = [
  'relaxe-shiatsu',
  'panasonic-maf1',
  'titan-pro-vigor-4d',
  'amamedics-hilux-4d',
  'sharper-image-relieve-3d',
  'kahuna-hm-078',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'relaxe-shiatsu': {
    label: 'Best for tall or heavier builds',
    why: "The Relaxe Shiatsu is confirmed at 330 lbs with a confirmed height range of 61 to 76 inches, the highest weight capacity on this page. The 53-inch SL-track is one of the longer roller paths in the catalog, and the space-saving 2-inch wall clearance fits tight rooms. 2D rollers, zero gravity, heat. For buyers whose dimensions exceed what the Admiral II can confirm, this is the pick, at a price well under this page's ceiling.",
  },
  'panasonic-maf1': {
    label: 'Best for neck and upper-back focus',
    why: "The Panasonic MAF1 is the S-track specialist in this range, priced just above this page's ceiling. S-track focuses the entire roller path on the neck and upper back. 4D rollers, infrared-heated massage heads, confirmed 4'8\" to 6'2\" and 264 lbs, space-saving recline. Note: no zero gravity. For buyers whose pain is strictly in the cervical and thoracic spine, an S-track at this price delivers more focused technique than an SL-track covering the full spine at similar cost.",
  },
  'titan-pro-vigor-4d': {
    label: 'Best SL-track 4D near this budget',
    why: "The Titan Pro-Vigor 4D is a 4D SL-track chair priced just above this page's ceiling. It is the most affordable 4D SL-track option in the catalog. 4D rollers vary speed and depth within each stroke, a step beyond the fixed-depth 3D mechanisms in the mid-tier. Two-stage zero gravity, heated rollers, calf and foot massage, full-body stretch, body scanning, space-saving 3.9-inch wall clearance. Confirmed 5'0\" to 6'2\", 260 lbs.",
  },
  'amamedics-hilux-4d': {
    label: 'Best SL-track 4D, widest body fit',
    why: "The Hilux 4D has the widest confirmed height range at this price tier (4'11\" to 6'7\") and a 53-inch track, one of the longer SL-track systems in the catalog. The 4D roller varies speed and depth within each stroke. A distinctive feature: the rollers themselves are heated, meaning heat follows the roller path throughout the session rather than staying fixed at the lumbar. For buyers who need SL-track coverage with 4D quality and want confidence the chair fits their height, this is the pick.",
  },
  'sharper-image-relieve-3d': {
    label: 'L-track 3D in the mid-tier',
    why: "The Sharper Image Relieve 3D is an L-track chair with 3D rollers, zero gravity, heat, and foot massage in the $3,000-$4,999 band. L-track extends under the glutes and into the thighs, adding lower-body coverage that SL-track chairs in this tier do not reach as deeply. 3D rollers allow pressure depth adjustment. No confirmed height or weight capacity data from the retailer spec page.",
  },
  'kahuna-hm-078': {
    label: 'Best for larger buyers, SL-track 4D, space-saving',
    why: "The HM-078 Hubot earns a spot here specifically because it combines SL-track 4D roller quality with a 350 lb weight limit in a space-saving footprint under $5,000. Most SL-track chairs in this range top out at 265 or 300 lbs. Heat, zero gravity, foot rollers, AI body scanning. Confirmed up to 6 foot 2 inches. If you are over 280 lbs and need a full-spine SL-track chair, this is where to start.",
  },
}

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "What is the best massage chair under $5,000?",
    a: "It depends on what you are solving for. For full-spine SL-track coverage with 4D rollers and the widest confirmed body fit, the AmaMedics Hilux 4D is the strongest all-around pick in the $3,000-$4,999 band. For neck and upper-back focus, the Panasonic MAF1 S-track is the specialist choice. For buyers over 280 lbs, the Kahuna HM-078 confirms support up to 350 lbs. If value matters most, an entry-tier 3D SL-track chair delivers most of the benefit for far less.",
  },
  {
    q: "Is a 4D massage chair worth it under $5,000?",
    a: "4D rollers vary speed and depth within each stroke, where 3D rollers adjust depth only. For buyers with chronic, deep muscle tension who find 3D chairs feel repetitive, 4D is a meaningful upgrade, and the first 4D SL-track options arrive in the upper mid-tier. For buyers new to massage chairs or with sensitive backs, an entry-tier 3D chair with adjustable depth is a sound starting point.",
  },
  {
    q: "What track type should I choose under $5,000?",
    a: "Match the track to your pain. SL-track follows the full spine from neck to glutes and suits buyers with both upper and lower-back tension. S-track concentrates on the neck and upper back. L-track extends under the glutes and into the thighs for lower-back pain that radiates into the hips. At this budget you can get any of the three in good quality, so the right call is driven by where your pain sits, not by price.",
  },
  {
    q: "Do you have to spend $5,000 to get a good massage chair?",
    a: "No. The strongest value in the catalog sits in the entry tier, where SL-track 3D chairs offer confirmed body fit data, body scanning, heat, and zero gravity. Spending up to $5,000 buys 4D roller sophistication, specialist S-track designs, wider confirmed height ranges, or higher weight capacity. If none of those are your priority, you do not need to stretch the budget.",
  },
  {
    q: "Which massage chair under $5,000 is best for tall or heavier builds?",
    a: "The Relaxe Shiatsu confirms fit up to 6'4\" and 330 lbs, and the AmaMedics Hilux 4D confirms up to 6'7\". For weight capacity specifically, the Kahuna HM-078 supports up to 350 lbs while keeping SL-track 4D roller quality. Always check the confirmed height and weight range before buying, since fit determines whether the rollers track your spine correctly.",
  },
]

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestUnder5000Page() {
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
      { "@type": "ListItem", position: 3, name: "Best Massage Chairs Under $5,000", item: "https://massagechairfinder.com/best/under-5000" },
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs Under $5,000</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        The best massage chair under $5,000 for most buyers is the AmaMedics Hilux 4D (mid-tier), an SL-track 4D chair with the widest confirmed body fit in this tier. If your pain is concentrated in the neck and upper back, the Panasonic MAF1 S-track is the specialist pick. If value is the priority, an entry-tier 3D SL-track chair delivers most of the benefit for far less. The six chairs below are chosen by use case across the full range, not by price point alone.
      </p>
      <p className="text-charcoal max-w-2xl mb-3">
        The under-$5,000 range spans the mid-tier at its peak, including the strongest 3D{' '}
        <Link href="/learn/sl-track" className="text-bronze hover:text-gold transition-colors">SL-track</Link>{' '}
        chairs in the entry tier and the first{' '}
        <Link href="/learn/4d-vs-3d-massage-chair-rollers" className="text-bronze hover:text-gold transition-colors">4D roller</Link>{' '}
        options just above. Two of the picks (Panasonic MAF1 and Titan Pro-Vigor 4D) are priced just above this page's ceiling, but they are included because no comparable options exist right at the ceiling in these use cases.
      </p>
      <p className="text-warm-gray text-sm mb-2 max-w-2xl">
        Updated June 2026. For a focused view by price tier, see the{' '}
        <Link href="/best/under-3000" className="text-bronze hover:text-gold transition-colors">under-$3,000 page</Link>{' '}
        and the{' '}
        <Link href="/best/3000-to-5000" className="text-bronze hover:text-gold transition-colors">$3,000 to $5,000 page</Link>.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        How we pick: every chair here is drawn from the models we have researched and verified pricing and specifications for. Each spec cited below comes from the manufacturer or retailer spec sheet, not estimates. Picks are organized by buyer situation, not ranked one through six.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">What you get across this range</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          In the entry tier, the catalog offers strong 3D SL-track options with confirmed{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit data</Link>{' '}
          and body scanning at the top of the entry tier. In the mid-tier, SL-track 3D with 1-inch wall clearance becomes available. In the upper mid-tier, 4D roller quality enters the picture for both SL-track full-coverage and S-track upper-body focus.
        </p>
        <p className="text-charcoal leading-relaxed">
          The most common question in this range is whether to stay with the entry-tier Admiral II or stretch up to the upper mid-tier for 4D. The answer depends on whether variable roller speed and depth makes a functional difference for your specific pain pattern. For buyers with chronic, deep muscle tension, 4D is a meaningful step up. For buyers who are new to massage chairs or have sensitive backs, entry-tier 3D with adjustable depth is a sound starting point. The{' '}
          <Link href="/learn/massage-chair-price-tiers" className="text-bronze hover:text-gold transition-colors">price tier guide</Link>{' '}
          breaks down what each budget level actually buys.
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
          If lower back pain is the primary concern, the Admiral II (SL-track, 3D, entry tier) or the Hilux 4D (SL-track, 4D, mid-tier) are the two picks depending on whether roller sophistication justifies the additional spend for your situation. If neck and upper back is the primary concern, the MAF1&apos;s S-track 4D setup is the specialist pick.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          For buyers with height above 6&apos;1&quot; or weight above 270 lbs, the Relaxe Shiatsu (up to 6&apos;4&quot;, 330 lbs) or Hilux 4D (up to 6&apos;7&quot;) are the confirmed-fit options in this range. If you are unsure whether your measurements fall inside a chair&apos;s range, the{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit guide</Link>{' '}
          explains how height and weight limits are set and why they matter.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/best/premium" className="text-bronze hover:text-gold transition-colors">premium tier ($5,000+)</Link>{' '}
          adds more 4D options and wider body fit confirmations. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          narrows by pain pattern, body fit, and budget together.
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

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <p className="text-charcoal leading-relaxed">
          Still weighing whether to stretch your budget? The{' '}
          <Link href="/learn/are-massage-chairs-worth-it" className="text-bronze hover:text-gold transition-colors">are massage chairs worth it guide</Link>{' '}
          and the{' '}
          <Link href="/learn/zero-gravity" className="text-bronze hover:text-gold transition-colors">zero gravity guide</Link>{' '}
          cover the features that most change the experience in this price range.
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
