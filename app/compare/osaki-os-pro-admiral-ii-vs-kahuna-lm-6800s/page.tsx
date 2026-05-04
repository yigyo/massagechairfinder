import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Osaki OS-Pro Admiral II vs Kahuna LM-6800S: Which Under-$3,000 Chair Wins?',
  description: 'The Admiral II costs $500 more and adds a 3D roller with 270-lb capacity. The LM-6800S costs less and includes stretch programs. Here is which one is right for your situation.',
}

export default function AdmiralVsKahunaPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Admiral II vs LM-6800S</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Osaki OS-Pro Admiral II vs Kahuna LM-6800S: Which Under-$3,000 Chair Wins?
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both are SL-track chairs under $3,000, both are widely recommended at the entry
        price tier, and both cover the full spine from neck to glutes. The $500 gap comes
        down to roller quality, weight capacity, and whether you need stretch programs.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0727/1609/1700/files/osaki-os-pro-admiral-ii-black-front.webp"
              alt="Osaki OS-Pro Admiral II massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Osaki OS-Pro Admiral II</p>
          <p className="text-sm text-charcoal">$2,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
            <p className="text-warm-gray text-sm p-4">Kahuna LM-6800S</p>
          </div>
          <p className="text-sm font-semibold text-navy">Kahuna LM-6800S</p>
          <p className="text-sm text-charcoal">$2,499</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          For most buyers, the <strong>Admiral II</strong> is the better long-term investment.
          The 3D roller depth and 270-lb capacity justify the $500 premium for anyone planning
          daily use with chronic pain. The <strong>LM-6800S</strong> is the right call if budget
          is the hard constraint, you are under 200 lbs, or the stretch program is a specific priority.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs side by side</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Osaki OS-Pro Admiral II</th>
              <th className="text-left p-3 font-medium">Kahuna LM-6800S</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$2,999', '$2,499'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '3D', '2D'],
              ['Zero gravity', 'Yes', 'Yes'],
              ['Heat', 'Lumbar', 'Lumbar'],
              ['Stretch program', 'No', 'Yes'],
              ['Weight capacity', '270 lbs', '200 lbs'],
              ['Min height', '5'2"', '5'0"'],
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

      <h2 className="text-2xl font-serif mb-3">The roller difference: why 3D matters at this tier</h2>
      <p className="text-charcoal mb-6">
        A 2D roller moves up and down the track and side to side. That is adequate for
        general tension relief. A 3D roller adds depth: it can extend further into muscle
        tissue during a pass, which is what creates the kneading sensation that distinguishes
        a therapeutic massage from a back rub. For buyers with chronic lower back pain who
        plan to use the chair daily, the 3D roller in the Admiral II is the most meaningful
        difference between these two chairs. The LM-6800S delivers a consistent massage at
        a fixed depth. The Admiral II varies that depth.
      </p>

      <h2 className="text-2xl font-serif mb-3">Weight capacity: a real constraint for many buyers</h2>
      <p className="text-charcoal mb-6">
        The LM-6800S is rated to 200 lbs. The Admiral II is rated to 270 lbs. For buyers
        near or above 200 lbs, the LM-6800S is simply not appropriate. For buyers under
        180 lbs who are otherwise drawn to the LM-6800S features, the capacity is not a
        practical concern. This is often the deciding factor that removes one chair from
        consideration entirely.
      </p>

      <h2 className="text-2xl font-serif mb-3">The LM-6800S stretch program advantage</h2>
      <p className="text-charcoal mb-6">
        The Kahuna LM-6800S includes a stretch program that uses airbags and the recline
        mechanism to elongate the spine and hip flexors. The Admiral II does not include a
        stretch program at launch. For buyers whose primary need involves hip flexor
        tightness, chronic lumbar tension that responds well to traction, or a history of
        benefit from chiropractic stretching, the LM-6800S stretch program is a genuine
        differentiator that may outweigh the 3D roller upgrade.
      </p>

      <h2 className="text-2xl font-serif mb-3">Who should buy which</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Admiral II if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>You weigh over 200 lbs</li>
            <li>You have chronic lower back pain and want roller depth variation</li>
            <li>You plan daily use and want better long-term mechanical durability</li>
            <li>The $500 difference is within your budget</li>
          </ul>
        </div>
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the LM-6800S if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>Your budget is firm at $2,499</li>
            <li>You are under 180 lbs</li>
            <li>A stretch program is specifically important for hip flexor or lumbar traction</li>
            <li>You are under 5&apos;2&quot; (it accommodates 5&apos;0&quot; vs the Admiral&apos;s 5&apos;2&quot; minimum)</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 p-6 bg-navy text-white rounded-xl">
        <h2 className="text-xl font-serif font-semibold mb-2">Not sure which fits your situation?</h2>
        <p className="text-sm text-gray-300 mb-4">
          The chair finder filters by pain profile, body type, and budget to give you a
          personalized recommendation across the full catalog.
        </p>
        <Link href="/finder" className="inline-block bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm">
          Find My Chair &rarr;
        </Link>
      </div>
    </div>
  )
}
