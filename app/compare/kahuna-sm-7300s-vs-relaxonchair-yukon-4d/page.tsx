import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Kahuna SM-7300S vs Relax On Chair YUKON-4D | MassageChairFinder',
  description: 'The Kahuna SM-7300S uses a 6-roller 2D system with three-stage zero gravity and full heat coverage at $6,999. The YUKON-4D delivers 4D precision at $500 less. Here is the honest comparison.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>SM-7300S vs YUKON-4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Kahuna SM-7300S vs Relax On Chair YUKON-4D</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        These chairs sit $500 apart at $6,999 and $6,499. The Kahuna SM-7300S is built around a 6-roller system, three-stage zero gravity, and heat that extends to the lumbar, calves, and feet. The YUKON-4D is built around a 4D roller with precision pressure control. The choice is fundamentally about whether roller technology or heat and decompression coverage matters more.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/1509/5162/products/Black-min_5.jpg?v=1721661626"
            alt="Kahuna SM-7300S"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Kahuna SM-7300S</h2>
          <p className="text-2xl font-bold text-gold mt-1">$6,999</p>
          <p className="text-sm text-warm-gray mt-1">SL-track | 2D | 6-roller system | 3-stage zero gravity</p>
        </div>
        <div className="card text-center">
          <div className="h-[300px] flex items-center justify-center bg-sand rounded-lg mb-3">
            <span className="text-warm-gray text-sm">YUKON-4D</span>
          </div>
          <h2 className="text-xl font-serif font-semibold text-navy">Relax On Chair YUKON-4D</h2>
          <p className="text-2xl font-bold text-gold mt-1">$6,499</p>
          <p className="text-sm text-warm-gray mt-1">SL-track | 4D | Precision pressure control</p>
        </div>
      </div>

      <div className="card bg-navy text-white mb-10">
        <h2 className="text-xl font-serif font-semibold mb-3">Quick Verdict</h2>
        <p className="mb-3">
          For buyers who want the deepest zero gravity decompression, the most heat coverage (lumbar, calf, and feet), and a thorough multi-roller massage at a familiar price from a well-known brand, the Kahuna SM-7300S is the right call. It is a more traditional approach to massage chair design executed at a high level.
        </p>
        <p>
          For buyers who want 4D roller precision and the ability to fine-tune pressure by zone and session, the YUKON-4D delivers that at $500 less. Its 4D system provides session-by-session depth control that the SM-7300S cannot match with its 2D roller.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Kahuna SM-7300S</th>
              <th className="text-left p-3">YUKON-4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$6,999', '$6,499'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '2D (6-roller system)', '4D'],
              ['Zero Gravity', '3 stages', 'Yes'],
              ['Heat Coverage', 'Lumbar + calf + feet', 'Lumbar'],
              ['Stretch Programs', 'Yes', 'Not specified'],
              ['Body Scanning', 'Yes', 'Not specified'],
              ['Foot Rollers', 'Yes', 'Not specified'],
              ['Roller Depth Control', 'Fixed (2D)', 'Variable (4D)'],
            ].map(([spec, a, b]) => (
              <tr key={spec} className="border-b border-sand">
                <td className="p-3 font-medium">{spec}</td>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">The 6-Roller System vs 4D Single Roller</h2>
      <p className="mb-4">
        The Kahuna SM-7300S uses a 6-roller system that adds supplemental rollers to the primary pair, increasing contact area across the back. This approach produces a broader coverage pattern and a massage that feels more encompassing across the full back width. The tradeoff is that 2D rollers do not control protrusion depth, so the pressure is more uniform across sessions.
      </p>
      <p className="mb-8">
        The YUKON-4D uses a single 4D roller mechanism that controls depth, speed, and rhythm independently. This produces less coverage width but more precision. For buyers whose pain is concentrated in a specific spinal region, the 4D precision allows them to work that area more thoroughly. For buyers who want full-back coverage in a single pass, the SM-7300S is more natural.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Three-Stage Zero Gravity and Full Heat</h2>
      <p className="mb-8">
        The SM-7300S includes three-stage zero gravity, which allows a deeper recline than the standard two-stage system. At maximum recline, spinal decompression is more complete. Combined with heat that extends to the calves and feet, the SM-7300S provides more thorough circulatory support during a session. For buyers with poor lower-limb circulation or who want maximum spinal decompression, these two features are meaningful advantages over the YUKON-4D.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Who Should Buy Each Chair</h2>
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card border-l-4 border-gold">
          <h3 className="font-semibold text-navy mb-3">Buy the Kahuna SM-7300S if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>Heat in the calves and feet matters for your circulation or arthritis</li>
            <li>Three-stage zero gravity decompression is a priority</li>
            <li>You prefer broad back coverage over precision pressure tuning</li>
            <li>Stretch programs and body scanning are important to you</li>
          </ul>
        </div>
        <div className="card border-l-4 border-teal">
          <h3 className="font-semibold text-navy mb-3">Buy the YUKON-4D if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>4D roller precision and session-by-session depth control matter</li>
            <li>You want the lower price while staying in the SL-track tier</li>
            <li>Your pain is concentrated in a specific spinal region</li>
            <li>Lumbar heat is sufficient and calf/foot heat is not a priority</li>
          </ul>
        </div>
      </div>

      <div className="card bg-navy text-white text-center mt-8">
        <p className="text-lg font-serif mb-2">Not sure which approach fits your pain pattern?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz asks about your specific pain location, heat preferences, and pressure sensitivity.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
