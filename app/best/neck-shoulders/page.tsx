import { MCF_CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs for Neck and Shoulder Pain (2026)',
  description: 'The best massage chairs for neck and shoulder pain depend on whether pain is isolated to the upper body or also involves the lower back. Five chairs selected across S-track and SL-track for every budget.',
}

const PICK_IDS = [
  'osaki-os-pro-admiral-ii',
  'synca-jp970',
  'inada-dreamwave',
  'osaki-os-pro-maestro-le',
  'panasonic-mak1',
]

interface Editorial {
  label: string
  why: string
}

const EDITORIAL: Record<string, Editorial> = {
  'osaki-os-pro-admiral-ii': {
    label: 'Best for neck and lower back together',
    why: 'The Admiral II is the right starting point for buyers whose neck and shoulder pain accompanies desk-work lower back tension. SL-track covers both zones in one pass. Body scanning adjusts the roller starting position to the individual\'s neck and shoulder anatomy before each session, which matters for cervical coverage accuracy. 3D rollers allow pressure depth adjustment. Confirmed 5\'2" to 6\'1", 270 lbs.',
  },
  'synca-jp970': {
    label: 'Best S-track mid-range',
    why: 'The JP970 is an S-track chair with 4D rollers. For buyers whose pain is exclusively in the neck and upper back, an S-track chair at this price point delivers more focused upper-body technique than an SL-track that splits its roller path across the full spine. Body scanning adjusts the roller start position to shoulder height. Confirmed 5\'0" to 6\'3", 285 lbs.',
  },
  'inada-dreamwave': {
    label: 'Best S-track specialist',
    why: 'Inada is a Japanese brand with a long reputation for neck and shoulder massage technique. The DreamWave uses a proprietary 3D roller design and a dedicated S-track that prioritizes thoracic and cervical coverage. It does not extend below the lumbar. For buyers with neck, shoulder, and upper-back tension as the primary concern and who want a chair with proven upper-body technique, this is the pick. Confirmed 5\'0" to 6\'5", 300 lbs.',
  },
  'osaki-os-pro-maestro-le': {
    label: 'Premium full-coverage',
    why: 'The Maestro LE covers both the upper body and lower back in one continuous SL-track pass with 4D rollers. For buyers who want neck coverage and lower back coverage without choosing between them, this is the upper-mid-range pick. Space-saving recline (5-inch wall clearance). Body scanning confirmed. 260 lb capacity.',
  },
  'panasonic-mak1': {
    label: 'Premium S-track',
    why: 'The MAK1 is a Japanese-engineered chair with S-track and 4D rollers, confirmed 4\'8" to 6\'2" and 264 lbs. A distinguishing feature: the rollers themselves are infrared-heated, meaning heat travels with the roller path rather than from a fixed lumbar pad. Panasonic positions this as a medical-grade device. Note: there is no zero gravity on this chair. Panasonic\'s engineering prioritizes roller precision and upper-body technique over recline positions. For buyers focused entirely on neck and shoulder work, that is a reasonable trade.',
  },
}

function fmtFt(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inPart = inches % 12
  return inPart === 0 ? `${ft}'0"` : `${ft}'${inPart}"`
}

export default function BestNeckShouldersPage() {
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

      <h1 className="text-4xl font-serif mb-4">Best Massage Chairs for Neck and Shoulder Pain</h1>
      <p className="text-lg text-charcoal max-w-2xl mb-3">
        Neck and shoulder tension is the second most common pain location for massage chair buyers. Massage chairs address it through two mechanisms: roller-based kneading along the cervical spine and thoracic vertebrae, and airbag compression around the shoulders. Both depend on the chair fitting the buyer accurately and on the roller track covering the upper body correctly.
      </p>
      <p className="text-warm-gray text-sm mb-10 max-w-2xl">
        Updated April 2026. If your neck pain also involves lower back tension, SL-track chairs are the better fit. If your pain is exclusively upper body, a dedicated S-track chair often delivers stronger technique at equivalent price points.
      </p>

      <div className="bg-sand rounded-xl p-6 mb-10 max-w-2xl">
        <h2 className="text-xl font-serif font-semibold text-navy mb-3">S-track or SL-track for neck pain: how to decide</h2>
        <p className="text-charcoal leading-relaxed mb-3">
          S-track chairs follow the spine from the base of the skull through the cervical vertebrae, across the thoracic spine, and down to the lumbar. They stop at the lower back. For buyers with neck and shoulder pain as the sole concern, that coverage is sufficient and the mechanism can focus its full roller path on the relevant area. Several of the most refined neck-massage chairs in the category are S-track.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          SL-track chairs extend the roller path under the glutes. For buyers with neck pain that also involves desk-work lower back tension, a common combination, SL-track covers both zones in one chair. For buyers whose pain is strictly upper body, the added lower-body coverage adds cost without practical benefit.
        </p>
        <p className="text-charcoal leading-relaxed">
          On shoulder coverage specifically: the rollers handle the spine, but shoulder and rotator cuff tension responds primarily to airbag compression. When comparing chairs for shoulder pain, look for chairs that specifically include shoulder airbags, not just arm and calf airbags.
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
          If your neck pain is the result of extended desk work and you also carry tension in the lower back or hips, the{' '}
          <Link href="/best/lower-back-pain" className="text-bronze hover:text-gold transition-colors">best chairs for lower back pain</Link>{' '}
          may be a better reference. Most of those picks use SL-track, which covers both zones.
        </p>
        <p className="text-charcoal leading-relaxed mb-3">
          If pressure sensitivity is a concern, note that the neck and upper cervical area is the zone most likely to feel rough on a first session. All chairs above have adjustable pressure. Start at the lowest setting for neck work and increase gradually over multiple sessions.
        </p>
        <p className="text-charcoal leading-relaxed">
          The{' '}
          <Link href="/learn/track-types" className="text-bronze hover:text-gold transition-colors">track types guide</Link>{' '}
          explains the S, L, and SL-track decision with coverage diagrams. The{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">chair finder</Link>{' '}
          uses pain location as a primary filter and will surface the appropriate track type based on your answers.
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
