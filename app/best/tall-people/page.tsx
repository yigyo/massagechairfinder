import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Tall People (2026)',
  description: "Massage chairs for tall buyers must confirm effective coverage at heights of 6'3\" and above, not just structural clearance. Five chairs verified for buyers 6'3\" to 6'10\".",
}

const PICK_IDS = [
  'kyota-genki-m380',
  'amamedics-hilux-4d',
  'infinity-imperial-syner-d',
  'daiwa-legacy-4',
  'luraco-i9-max-plus',
  'positive-posture-brio-sport',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'kyota-genki-m380': {
    label: 'Best entry for tall buyers',
    why: 'The Genki M380 is confirmed for buyers up to 6\'5" and 330 lbs. L-track covers the glutes and upper thighs. A Wirecutter Top Pick for 2024. At $2,999, it is the most affordable chair in the catalog with a confirmed tall-buyer fit verification. 2D rollers. For buyers who need documented tall-buyer compatibility at an accessible price, this is the entry pick.',
  },
  'amamedics-hilux-4d': {
    label: 'Best SL-track for tall buyers',
    why: 'The Hilux 4D is confirmed for 4\'11" to 6\'7", the widest confirmed height range of any SL-track chair in the catalog. The 53-inch track is one of the longer SL-track systems available, which helps ensure the roller reaches the lumbar on taller bodies. 4D rollers, heated roller element, space-saving. The 270-lb weight limit is the constraint: tall buyers who also need higher capacity should see the Daiwa Legacy 4 or Luraco below.',
  },
  'infinity-imperial-syner-d': {
    label: 'Best Flex-track for tall buyers',
    why: 'The Syner-D is confirmed for 5\'2" to 6\'6" with a tallConfirmed designation from the retailer, 300 lbs, 2-inch wall clearance. The Flex-track adjusts between SL and L-track coverage depending on the program, giving tall buyers with both upper and lower back pain the option to vary coverage range by session. 4D rollers, body scanning, 5-year warranty.',
  },
  'daiwa-legacy-4': {
    label: 'Best L-track range for tall buyers',
    why: 'The Legacy 4 is confirmed from 4\'8" to 6\'6" with a 49-inch L-track, body scanning, two-stage zero gravity, and 300-lb capacity. Space-saving 3.25-inch wall clearance. For tall buyers specifically focused on lower back and glute coverage rather than full spine, this is the pick in the upper mid-range. 3D rollers.',
  },
  'luraco-i9-max-plus': {
    label: 'Tallest confirmed in the catalog',
    why: 'The Luraco i9 Max Plus is confirmed for buyers up to 6\'10", the highest verified maximum height in this catalog. It is the only massage chair in the catalog manufactured in the United States. L-track with 3D rollers, zero gravity, body scanning, heat, stretch, 10-year warranty, 300 lbs. For buyers above 6\'6" who need confirmed fit data, this is the only chair in the catalog that documents their height range.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestTallPeoplePage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Tall People</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Massage chairs list maximum height accommodations, but the spec sheet number does not always mean the chair delivers effective coverage at that height. A buyer at 6'3&quot; in a chair rated to 6'3&quot; may find the lumbar roller lands mid-back rather than at the true lumbar vertebrae. This page covers chairs with confirmed tall-buyer fit data, sourced from retailer pages rather than manufacturer marketing sheets.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. All five chairs below are confirmed for buyers at 6'3&quot; or above, with tallConfirmed validation from retailer spec pages where noted.
      </p>

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
                      {chair.priceMax && chair.priceMax > chair.priceMin
                        ? `$${chair.priceMin.toLocaleString()} – $${chair.priceMax.toLocaleString()}`
                        : `$${chair.priceMin.toLocaleString()}`}
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
                {chair.goodwinImageUrl && (
                  <div className="flex-shrink-0 w-full sm:w-36 h-36 bg-white border border-sand rounded-lg overflow-hidden">
                    <img src={chair.goodwinImageUrl} alt={chair.name} className="w-full h-full object-contain p-2" />
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
          If your height is between 6'3&quot; and 6'6&quot;, you have four confirmed options above across a range of prices and track types. The Hilux 4D is the SL-track pick; the Legacy 4 and Syner-D are the L-track and Flex-track picks; the Genki M380 is the entry option.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If you are above 6'6&quot;, the Luraco i9 Max Plus is the only chair in this catalog confirmed to that range (6'10&quot;). The Legacy 4 and Syner-D confirm to 6'6&quot; and may work depending on your proportions, but the Luraco has the explicit verification.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          includes height as a required field and only surfaces chairs confirmed for your range. The{' '}
          <Link href="/learn/body-fit" className="text-bronze hover:text-gold transition-colors">body fit guide</Link>{' '}
          explains how to evaluate chair dimensions against your proportions before purchasing.
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
