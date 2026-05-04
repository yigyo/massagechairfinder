import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Infinity Dynasty 4D vs Genesis Max 4D: Which Is Right for You? | MassageChairFinder',
  description: 'The Infinity Dynasty 4D costs $2,700 more than the Genesis Max 4D. Both use the same L-track and 4D roller. The key differences are petite fit confirmation, stretch programs, and value.',
}

export default function DynastyVsGenesisMaxPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>

      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Dynasty 4D vs Genesis Max 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Infinity Dynasty 4D vs Genesis Max 4D: Which Is Right for You?
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both chairs come from Infinity, both use a 49-inch L-track with a 4D roller, and both
        sit in the premium tier. On paper they look nearly identical. The Dynasty costs $2,700
        more. Understanding where that gap comes from, and whether it matters for your situation,
        is the whole question this page answers.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-dynasty-4d-massage-chair.webp?v=1776836197"
              alt="Infinity Dynasty 4D massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Infinity Dynasty 4D</p>
          <p className="text-sm text-charcoal">$11,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-genesis-max-4d-massage-chair.webp?v=1776836198"
              alt="Infinity Genesis Max 4D massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Infinity Genesis Max 4D</p>
          <p className="text-sm text-charcoal">$9,299</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          For most buyers, the <strong>Genesis Max</strong> is the right call. It delivers the
          same core Infinity L-track 4D experience for $2,700 less and adds confirmed stretch programs.
          The <strong>Dynasty</strong> earns its premium for two specific buyer profiles: those
          under 5 feet 2 inches who need verified petite fit, and those over 280 lbs who need
          the confirmed plus-size clearance.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Infinity Dynasty 4D</th>
              <th className="text-left p-3 font-medium">Infinity Genesis Max 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$11,999', '$9,299'],
              ['Track type', 'L-track', 'L-track'],
              ['Track length', '49 inches', '49 inches'],
              ['Roller type', '4D', '4D'],
              ['Height range', '60 to 72 inches', 'Not published'],
              ['Weight capacity', '300 lbs', 'Not published'],
              ['Zero gravity', 'Yes', 'Yes'],
              ['Space saving', 'Yes (2" from wall)', 'Yes (2" from wall)'],
              ['Heat therapy', 'Yes', 'Yes'],
              ['Foot and calf', 'Yes', 'Yes'],
              ['Stretch programs', 'Not confirmed', 'Yes'],
              ["Petite confirmed", "Yes (from 5'0\")", "Not confirmed"],
              ['Plus-size confirmed', 'Yes (to 300 lbs)', 'Not confirmed'],
            ].map(([spec, a, b], i) => (
              <tr key={spec} className={i % 2 === 0 ? 'bg-linen' : 'bg-white'}>
                <td className="p-3 text-charcoal font-medium">{spec}</td>
                <td className="p-3 text-charcoal">{a}</td>
                <td className="p-3 text-charcoal">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif mb-4">Where these chairs actually differ</h2>

      <h3 className="text-xl font-serif mb-2 text-navy">The $2,700 question</h3>
      <p className="text-charcoal mb-4">
        Infinity has not published a full spec sheet for the Genesis Max that independently
        confirms body fit ranges, so direct comparison is limited by available data. What
        is confirmed: both chairs use the same 49-inch L-track, the same 4D roller mechanism,
        the same 2-inch wall clearance, and the same core feature set of zero gravity, heat,
        foot massage, and calf massage. The Dynasty adds confirmed sizing data for petite
        buyers and buyers over 280 lbs.
      </p>
      <p className="text-charcoal mb-6">
        For a buyer in the 5 feet 4 inches to 6 feet range, at a typical weight, there is
        no spec-level justification for the $2,700 premium. The Genesis Max at $9,299
        delivers the same L-track 4D experience. The Dynasty earns its price for buyers
        whose body fit falls outside the typical range.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Petite and plus-size fit</h3>
      <p className="text-charcoal mb-6">
        The Dynasty is the only chair between these two with a confirmed minimum height.
        Infinity has verified it fits buyers from 5 feet 0 inches, which is rare at this
        price point. It is also confirmed for buyers up to 300 lbs. The Genesis Max does
        not have published height minimums or weight limits from Infinity, which means
        buyers with non-standard body dimensions are taking on uncertainty. If fit certainty
        matters to you, that alone is worth the premium.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Stretch programs</h3>
      <p className="text-charcoal mb-6">
        The Genesis Max confirms stretch programs. The Dynasty does not, which is a notable
        gap for a chair at nearly $12,000. Stretch programs extend the legs against resistance
        to lengthen the hip flexors and decompress the lumbar spine. Buyers with sciatica,
        tight hip flexors, or recurring lower back tension use stretch programs consistently.
        If stretch is part of how you plan to use the chair, verify the Dynasty includes it
        before purchasing.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Same core massage experience</h3>
      <p className="text-charcoal mb-6">
        On the things that most define the quality of a massage chair, these two chairs are
        equivalent. The 49-inch L-track from neck to glutes, the 4D roller with full depth
        variation, zero gravity, heat, and foot and calf massage are all shared. The difference
        is in the edge cases: body fit extremes and stretch programs. For a buyer squarely
        in the typical size range, the Genesis Max is the stronger value purchase.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Dynasty if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-navy mt-1">›</span><span>You are under 5 feet 2 inches and need verified petite fit. The Dynasty confirms from 5 feet 0 inches.</span></li>
            <li className="flex gap-2"><span className="text-navy mt-1">›</span><span>You are over 280 lbs and want confirmed weight clearance. The Dynasty is verified to 300 lbs.</span></li>
            <li className="flex gap-2"><span className="text-navy mt-1">›</span><span>Body fit certainty matters more than the $2,700 price difference.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://massagechairstore.com/infinity-dynasty-4d/" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the Dynasty 4D
            </a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the Genesis Max if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-teal mt-1">›</span><span>You are in the typical size range (roughly 5 feet 4 inches to 6 feet, under 280 lbs). The $2,700 savings buys nothing extra for you.</span></li>
            <li className="flex gap-2"><span className="text-teal mt-1">›</span><span>Stretch programs matter to you. The Genesis Max confirms them; the Dynasty does not.</span></li>
            <li className="flex gap-2"><span className="text-teal mt-1">›</span><span>You want the Infinity L-track 4D experience at the best available price point.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://massagechairstore.com/infinity-genesis-max/" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the Genesis Max 4D
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-serif mb-3">Bottom line</h2>
      <p className="text-charcoal mb-8">
        The Genesis Max is the right starting point for most buyers comparing these two chairs.
        It delivers the same core massage technology at $2,700 less. The Dynasty justifies
        its premium for buyers who need verified fit at the edges of the size range: petite
        buyers under 5 feet 2 inches and buyers close to or above 280 lbs. For everyone
        in between, the Genesis Max is the smarter purchase.
      </p>
      <div className="rounded-lg p-6 mb-10" style={{ background: '#F5F1EB', border: '1px solid #E8DFD3' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#6B6B65' }}>Chair Finder</p>
        <h2 className="text-xl font-serif text-navy mb-2">Not sure which is right for you?</h2>
        <p className="text-charcoal text-sm mb-4">
          Answer a few questions about your body, pain profile, and budget. The Chair Finder
          surfaces the chairs most likely to work for your specific situation.
        </p>
        <Link href="/finder" className="inline-block text-white text-sm font-medium px-5 py-2.5 rounded transition-colors" style={{ background: '#D1803E' }}>
          Open the Chair Finder
        </Link>
      </div>

      <div className="border-t border-sand pt-8">
        <h3 className="text-lg font-serif mb-3 text-navy">Learn more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/chairs/infinity-dynasty-4d" className="text-bronze hover:text-gold">Dynasty 4D full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/chairs/infinity-genesis-max" className="text-bronze hover:text-gold">Genesis Max 4D full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/infinity" className="text-bronze hover:text-gold">About Infinity</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/track-types" className="text-bronze hover:text-gold">L-track explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">4D rollers explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/best/premium" className="text-bronze hover:text-gold">Best premium chairs</Link>
        </div>
      </div>

    </div>
  )
}
