import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Bodyfriend Phantom II vs Bodyfriend Falcon XD | MassageChairFinder',
  description: 'Same brand, same price at $8,499, both SL-track 4D. The Phantom II has a 335 lb weight capacity for larger buyers. The Falcon XD adds stretch programs. Here is how to choose.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Phantom II vs Falcon XD</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Bodyfriend Phantom II vs Bodyfriend Falcon XD</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        Choosing between two chairs from the same brand at the same price is one of the more frustrating buying decisions. Both are SL-track 4D chairs from Bodyfriend at $8,499, both include heat and zero gravity, and both have strong build quality. The critical differences are weight capacity and stretch programs.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0422/3942/6712/files/Phantom-II_white_01.jpg"
            alt="Bodyfriend Phantom II"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Bodyfriend Phantom II</h2>
          <p className="text-2xl font-bold text-gold mt-1">$8,499</p>
          <p className="text-sm text-warm-gray mt-1">SL-track | 4D | 335 lbs | Plus-size confirmed</p>
        </div>
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-falcon-massage-chair.jpg?v=1776904610"
            alt="Bodyfriend Falcon XD 4D"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Bodyfriend Falcon XD 4D</h2>
          <p className="text-2xl font-bold text-gold mt-1">$8,499</p>
          <p className="text-sm text-warm-gray mt-1">SL-track | 4D | 265 lbs | Stretch programs</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="mb-3">
          For buyers who weigh more than 250 lbs, the Phantom II is the answer. Its 335 lb confirmed weight capacity is among the highest in its price tier, and plus-size fit has been verified. The Falcon XD's 265 lb limit is not suitable for heavier buyers.
        </p>
        <p>
          For buyers who weigh under 250 lbs and want stretch programs for spinal decompression or athletic recovery, the Falcon XD is the stronger choice. Both chairs deliver comparable massage quality at this price -- the decision is a body fit and feature priority question.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Bodyfriend Phantom II</th>
              <th className="text-left p-3">Bodyfriend Falcon XD</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$8,499', '$8,499'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '4D', '4D'],
              ['Weight Capacity', '335 lbs', '265 lbs'],
              ['Plus-Size Verified', 'Yes', 'Not confirmed'],
              ['Zero Gravity', 'Yes', 'Yes'],
              ['Heat', 'Yes', 'Yes'],
              ['Foot Rollers', 'Yes', 'Yes'],
              ['Calf Massage', 'Yes', 'Yes'],
              ['Stretch Programs', 'Not specified', 'Yes'],
            ].map(([spec, a, b]) => (
              <tr key={spec} className={i % 2 === 0 ? 'bg-linen' : 'bg-white'}>
                <td className="p-3 font-medium">{spec}</td>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Weight Capacity: The Primary Differentiator</h2>
      <p className="mb-4">
        The Phantom II supports 335 lbs with confirmed plus-size fit. This means the seat dimensions, roller track, and airbag placement have been verified as appropriate for heavier and broader builds, not just that the chair supports 335 lbs structurally.
      </p>
      <p className="mb-8">
        The Falcon XD has a 265 lb capacity. Buyers who weigh 250 lbs or above should choose the Phantom II. The structural limit is not the only concern -- airbag coverage and roller position are also calibrated to the weight range the chair was designed for.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Stretch Programs</h2>
      <p className="mb-8">
        The Bodyfriend Falcon XD includes stretch programs, which extend and traction the spine by cycling the chair between angled positions while rollers move along the lumbar and thoracic regions. Stretch programs are particularly effective for buyers with spinal compression from desk work, tight hip flexors, or post-workout recovery needs. The Phantom II does not confirm stretch programs in its specs.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Massage Quality at This Price Tier</h2>
      <p className="mb-8">
        Bodyfriend is a Korean brand with a reputation for precise 4D roller tuning and a softer default pressure profile relative to their roller power. This makes both chairs particularly well-suited for buyers who have found other chairs in this price range too intense. The SL-track on both models covers the full spine from neck through the lumbar and extends into the upper glutes, which is the right coverage for buyers with both upper and lower back tension.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Phantom II if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You weigh more than 250 lbs</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Plus-size fit verification matters to your decision</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Stretch programs are not a priority</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You want the higher capacity option as a long-term purchase</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/bodyfriend-phantom-ii" className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Phantom II</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the Falcon XD if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You weigh under 250 lbs</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>Stretch programs are a priority for recovery or decompression</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You have tight hip flexors or do strength training</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You are comparing against other SL-track 4D chairs in the $8,000-$9,000 tier</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/bodyfriend-falcon-xd" className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Falcon XD</a>
          </div>
        </div>
      </div>

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

</div>
  )
}
