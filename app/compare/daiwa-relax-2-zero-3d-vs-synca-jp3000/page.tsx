import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Daiwa Relax 2 Zero 3D vs Synca JP-3000 | MassageChairFinder',
  description: 'Both S-track chairs for upper and mid-back therapeutic massage. The Daiwa costs $2,000 less and fits buyers from 4 feet 8 to 6 feet 6. The JP-3000 has a 5D roller and Japanese manufacturing.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Daiwa Relax 2 Zero vs Synca JP-3000</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Daiwa Relax 2 Zero 3D vs Synca JP-3000</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        A critical note before comparing these two chairs: both use S-track roller systems. S-track follows the spine from the neck to the lumbar and stops there. Neither chair reaches the glutes, sacrum, or hips. If your primary pain is in the lower back that radiates into the hips or glutes, neither chair is the right choice. For buyers whose pain is in the upper back, mid-back, neck, or thoracic spine, both are excellent options.
      </p>

      <div className="card border-l-4 border-terra mb-8">
        <p className="text-sm font-medium text-charcoal">
          <strong>Important:</strong> S-track chairs stop at the lumbar. For sciatica, sacroiliac pain, glute tension, or hip arthritis, choose an L-track or SL-track chair instead. Use the <Link href="/finder" className="text-bronze hover:text-gold">Chair Finder</Link> to find the right track type for your pain location.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card text-center">
          <Image
            src="https://www.massagechairheaven.com/cdn/shop/products/daiwamassage-chairdaiwa-relax-2-zero-3d-massage-chairblackmassage-chair-heaven-203256_1200x1200.jpg?v=1675244406"
            alt="Daiwa Relax 2 Zero 3D"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Daiwa Relax 2 Zero 3D</h2>
          <p className="text-2xl font-bold text-gold mt-1">$9,000</p>
          <p className="text-sm text-warm-gray mt-1">S-track | 3D | 300 lbs | 4'8" to 6'6"</p>
        </div>
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0855/7959/6065/files/jp3000-brown_02ca2815-cce9-41b3-bfb5-f7b3f0fac5ae.jpg"
            alt="Synca JP-3000"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Synca JP-3000</h2>
          <p className="text-2xl font-bold text-gold mt-1">$10,999</p>
          <p className="text-sm text-warm-gray mt-1">S-track | 5D | Made in Japan</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="mb-3">
          For buyers with upper and mid-back pain who also need confirmed fit at the extremes -- from 4'8" to 6'6", at up to 300 lbs -- the Daiwa Relax 2 Zero 3D is the more practical and $2,000 less expensive choice. The inversion stretch program is a standout feature for spinal decompression not found in the JP-3000.
        </p>
        <p>
          For buyers who want Japanese manufacturing quality and a 5D roller system with advanced rhythm and pattern variation, the Synca JP-3000 justifies the premium. Made in Japan with an 8% affiliate program and a strong support network via Synca Wellness, it is the choice when manufacturing precision and roller sophistication matter more than price.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Daiwa Relax 2 Zero 3D</th>
              <th className="text-left p-3">Synca JP-3000</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$9,000', '$10,999'],
              ['Track', 'S-track', 'S-track'],
              ['Roller', '3D', '5D'],
              ['Weight Capacity', '300 lbs', 'Not published'],
              ['Height Range', `4'8" to 6'6"`, 'Not published'],
              ['Plus-Size Verified', 'Yes', 'Not confirmed'],
              ['Tall Confirmed', `Yes (6'6")`, 'Not confirmed'],
              ['Zero Gravity', 'Yes', 'Yes'],
              ['Heat', 'Yes', 'Yes'],
              ['Stretch (Inversion)', 'Yes (power inversion)', 'Not specified'],
              ['Body Scanning', 'Not specified', 'Yes'],
              ['Manufacturing', 'Not Japan', 'Made in Japan'],
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

      <h2 className="text-2xl font-serif font-semibold mb-4">Who These Chairs Are For</h2>
      <p className="mb-4">
        S-track chairs are the right choice for buyers whose pain is in the upper and mid-back: thoracic tension, cervical stiffness, shoulder blade tightness, and postural pain from desk work or driving. The S-track follows the natural cervical and thoracic curve precisely, delivering roller contact that an SL-track or L-track sometimes approximates less accurately in the upper back.
      </p>
      <p className="mb-8">
        Both the Daiwa and the JP-3000 reflect a therapeutic philosophy focused on spinal precision rather than full-body coverage. Buyers who have used S-track chairs from Panasonic or Fujiiryoki and found that the upper back focus is exactly what they need will find both chairs to be strong options in this tradition.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Body Fit: Daiwa's Confirmed Range</h2>
      <p className="mb-8">
        The Daiwa Relax 2 Zero 3D confirms fit for buyers from 4'8" to 6'6" at up to 300 lbs, with both tall and plus-size fit verified. The JP-3000 does not publish confirmed height or weight limits. For buyers at the extremes of the size range -- particularly tall buyers or buyers over 250 lbs -- the Daiwa's published specifications provide more purchase certainty.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Inversion Stretch</h2>
      <p className="mb-8">
        The Daiwa Relax 2 Zero 3D includes a power inversion stretch program that tilts the chair to decompress the spine through a combination of recline angle and footrest elevation. For buyers with spinal compression or disc-related upper back pain, inversion stretch is a meaningful therapeutic addition. The JP-3000 does not confirm stretch programs in its published feature set.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Daiwa Relax 2 Zero 3D if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You want S-track upper back coverage at a $2,000 lower price</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You need confirmed fit at taller or heavier ranges</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Inversion stretch for spinal decompression is a priority</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Manufacturing origin is less important than confirmed body fit</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/daiwa-relax-2-zero-3d" className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Relax 2 Zero 3D</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the Synca JP-3000 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>Japanese manufacturing quality is important to your long-term investment</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>5D roller sophistication and rhythm variation are priorities</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You are comparing against other Japanese S-track chairs (Panasonic, Fujiiryoki)</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>Body scanning is important for accurate cervical positioning</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/synca-wellness-jp3000" className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Synca JP-3000</a>
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
