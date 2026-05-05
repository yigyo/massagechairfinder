import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Ogawa Active XL Duo vs Titan Pro-Vigor 4D | MassageChairFinder',
  description: 'The Ogawa OG-6400 is $800 less with a 320 lb verified capacity and 11-inch wall clearance. The Titan Pro-Vigor 4D adds heated rollers and a 4D roller system. Here is how to choose.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Ogawa OG-6400 vs Titan Pro-Vigor 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Ogawa Active XL Duo 3D vs Titan Pro-Vigor 4D</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        The Ogawa OG-6400 costs $800 less than the Pro-Vigor 4D and handles significantly more weight: 320 lbs verified plus-size versus 260 lbs. The Pro-Vigor 4D adds heated rollers and a 4D roller system for more nuanced pressure control. The decision comes down to body fit versus roller technology.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/1509/5162/files/OgawaActiveXLDUO_0025_ogawa-active-xl-duo-black-and-champagne-angled-view.jpg"
              alt="Ogawa Active XL Duo 3D OG-6400 massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Ogawa Active XL Duo 3D</p>
          <p className="text-sm text-charcoal">$5,199</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/Vigor_Black_Perspective_1000x100_833e048a-3782-4c24-bda3-145b0593c8bd.jpg"
              alt="Titan Pro-Vigor 4D massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Titan Pro-Vigor 4D</p>
          <p className="text-sm text-charcoal">$5,999</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="mb-3">
          If you weigh over 250 lbs or want a confirmed plus-size fit at a lower price, the Ogawa OG-6400 is the clearer choice. Its 320 lb verified capacity and 11-inch wall clearance make it the stronger practical option for heavier buyers or rooms with limited rear space.
        </p>
        <p>
          If you weigh under 250 lbs and want heated rollers with 4D roller precision, the Titan Pro-Vigor 4D is worth the extra $800. The heated roller system is a significant improvement over a separate heat pad, and the 4D depth control provides session-by-session pressure adjustment that the OG-6400's 3D system does not match.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Ogawa OG-6400</th>
              <th className="text-left p-3">Titan Pro-Vigor 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$5,199', '$5,999'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '3D (dual system)', '4D'],
              ['Weight Capacity', '320 lbs', '260 lbs'],
              ['Plus-Size Verified', 'Yes', 'Not confirmed'],
              ['User Height Range', 'Not published', `5'0" to 6'2"`],
              ['Wall Clearance', '11 inches', '3.9 inches'],
              ['Heated Rollers', 'No (pad heat)', 'Yes'],
              ['Zero Gravity', 'Yes', 'Yes (2-stage)'],
              ['Foot Rollers', 'Yes', 'Yes'],
              ['Stretch Programs', 'Not specified', 'Yes'],
              ['Space-Saving', 'Yes', 'Yes'],
            ].map(([spec, a, b], i) => (
              <tr key={spec} className={i % 2 === 0 ? 'bg-linen' : 'bg-white'}>
                <td className="p-3 font-medium">{spec}</td>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Weight Capacity and Body Fit</h2>
      <p className="mb-4">
        The Ogawa OG-6400 supports 320 lbs with confirmed plus-size fit. This is the most meaningful differentiator between these two chairs for heavier or broader buyers. The Pro-Vigor 4D's 260 lb limit is not suitable for buyers above 240-250 lbs.
      </p>
      <p className="mb-8">
        The Pro-Vigor 4D confirms a height range of 5'0" to 6'2", which covers most of the U.S. adult population. The Ogawa does not publish a confirmed height range. If you are below 5'2" or above 6'0", confirm fit with the retailer before purchasing either chair.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Heated Rollers vs Pad Heat</h2>
      <p className="mb-4">
        The Titan Pro-Vigor 4D uses heated rollers that deliver warmth through direct contact as they move along the spine. This is meaningfully different from the Ogawa's separate heat pad. Heated rollers warm each spinal region as the roller passes through it, while a heat pad warms only the lumbar area and does not follow the roller path.
      </p>
      <p className="mb-8">
        For buyers with chronic lower back pain where heat is a primary therapeutic element, heated rollers are a genuine advantage. For buyers who use heat primarily for comfort rather than targeted therapy, the difference is smaller.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">3D vs 4D Roller</h2>
      <p className="mb-8">
        The Ogawa OG-6400 uses a dual 3D roller system with a primary roller and a secondary roller for additional coverage. The Pro-Vigor 4D uses a single 4D roller with variable speed and rhythm. For buyers who use auto programs primarily, both approaches produce a thorough massage. For buyers who want session-by-session fine-tuning of pressure depth and pace, the 4D system provides more control.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Ogawa OG-6400 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You weigh over 250 lbs or want verified plus-size fit</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>Budget is a consideration and 3D roller quality is sufficient</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>Your room has only 11 inches of wall clearance but not tight enough for the Vigor's 3.9"</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You want to save $800 and the roller type difference is not important</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/ogawa-og6400" className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the OG-6400</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the Titan Pro-Vigor 4D if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>You weigh under 250 lbs and are between 5'0" and 6'2"</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Heated rollers are a priority for your pain relief routine</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>4D roller depth control and stretch programs matter to you</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Your room is very tight. The 3.9-inch wall clearance is the main practical advantage</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/titan-pro-vigor-4d" className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Pro-Vigor 4D</a>
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
