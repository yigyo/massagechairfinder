import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AmaMedics Hilux 4D vs Titan Pro-Vigor 4D: The $5,000 SL-Track Decision',
  description: 'Both are SL-track 4D chairs with heated rollers. The Hilux costs $1,000 less and fits buyers from 4\'11". The Vigor adds a space-saving design. Here is the full comparison.',
}

export default function HiluxVsVigorPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>AmaMedics Hilux 4D vs Titan Pro-Vigor 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        AmaMedics Hilux 4D vs Titan Pro-Vigor 4D: The $5,000 SL-Track Decision
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both chairs share the same core configuration: SL-track, 4D rollers, heated rollers
        (not just heated pads), two-stage zero gravity, and a weight capacity around 260 to
        270 lbs. The $1,000 price gap and a few specific feature differences are the whole
        decision. Here is what actually separates them.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0727/1609/1700/files/amamedic-hilux-4d-black-90.webp"
              alt="AmaMedics Hilux 4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">AmaMedics Hilux 4D</p>
          <p className="text-sm text-charcoal">$4,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/Vigor_Black_Perspective.jpg"
              alt="Titan Pro-Vigor 4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Titan Pro-Vigor 4D</p>
          <p className="text-sm text-charcoal">$5,999</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          The <strong>Hilux 4D</strong> is the stronger value for most buyers. It delivers
          the same core 4D SL-track experience for $1,000 less, has the wider height range
          (confirmed to 4&apos;11&quot;), and the higher weight capacity. The <strong>Titan
          Pro-Vigor 4D</strong> earns its premium for buyers with space constraints: the
          3.9-inch wall clearance is the tightest in the SL-track 4D tier and makes the
          difference in rooms where placement is tight.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs side by side</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">AmaMedics Hilux 4D</th>
              <th className="text-left p-3 font-medium">Titan Pro-Vigor 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$4,999', '$5,999'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '4D', '4D'],
              ['Heated rollers', 'Yes', 'Yes'],
              ['Zero gravity', '2-stage', '2-stage'],
              ['Wall clearance', 'Standard', '3.9 inches'],
              ['Weight capacity', '270 lbs', '260 lbs'],
              ['Min height', `4'11"`, `5'0"`],
            ].map(([spec, a, b], i) => (
              <tr key={spec} className={i % 2 === 0 ? 'bg-white' : 'bg-sand'}>
                <td className="p-3 font-medium text-navy">{spec}</td>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif mb-3">Heated rollers: both do it, but the Hilux has the wider confirmation</h2>
      <p className="text-charcoal mb-6">
        Both chairs heat the rollers themselves, not just a lumbar pad. The distinction
        matters because heat that travels through the roller contact point penetrates
        target tissue directly rather than radiating from a surface. For buyers with
        chronic joint inflammation or back pain that responds well to heat therapy, this
        is the feature that places both chairs above most mid-range competition. The
        Hilux&apos;s heated roller system is more extensively documented in independent
        reviews and has stronger buyer feedback specifically on this feature.
      </p>

      <h2 className="text-2xl font-serif mb-3">The space-saving case for the Vigor</h2>
      <p className="text-charcoal mb-6">
        A 3.9-inch wall clearance is unusually tight for an SL-track 4D chair. Most
        SL-track chairs at this price tier need 12 to 18 inches from the wall to fully
        recline. The Vigor&apos;s space-saving mechanism slides the seat forward during
        recline rather than the backrest tilting backward, which is what keeps the
        wall clearance minimal. For buyers who want this chair in a bedroom, office,
        or any room where pushing furniture is not an option, the Vigor&apos;s placement
        flexibility is the reason to pay the $1,000 premium.
      </p>

      <h2 className="text-2xl font-serif mb-3">Height range: why it matters for the Hilux</h2>
      <p className="text-charcoal mb-6">
        The Hilux is confirmed from 4 feet 11 inches to 6 feet 7 inches, one of the
        wider confirmed ranges in the SL-track 4D tier. The Vigor starts at 5 feet 0
        inches. For buyers under 5 feet, the Hilux is the answer between these two.
        For buyers above 6 feet 2 inches, both chairs require checking the specific
        upper height confirmation.
      </p>

      <h2 className="text-2xl font-serif mb-3">Who should buy which</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Hilux 4D if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>You want the best value in the SL-track 4D tier</li>
            <li>You are under 5&apos;0&quot; or weigh over 260 lbs</li>
            <li>Heated roller performance is a primary criterion</li>
            <li>Room placement is not tightly constrained</li>
          </ul>
        </div>
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Pro-Vigor 4D if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>The chair needs to fit within 4 inches of a wall</li>
            <li>You are placing the chair in a bedroom or tight space</li>
            <li>You are 5&apos;0&quot; or taller and under 260 lbs</li>
            <li>The space-saving design justifies the $1,000 premium for your room</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 p-6 bg-navy text-white rounded-xl">
        <h2 className="text-xl font-serif font-semibold mb-2">Want a broader comparison?</h2>
        <p className="text-sm text-gray-300 mb-4">
          The chair finder compares the full catalog by your pain profile, body measurements,
          room size, and budget in under two minutes.
        </p>
        <Link href="/finder" className="inline-block bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm">
          Find My Chair &rarr;
        </Link>
      </div>
    </div>
  )
}
