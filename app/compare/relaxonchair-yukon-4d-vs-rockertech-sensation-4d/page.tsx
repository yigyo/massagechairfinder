import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Relax On Chair YUKON-4D vs RockerTech Sensation 4D: $500 Apart, Same Tier',
  description: 'Both SL-track 4D chairs between $6,500 and $7,000. The Sensation 4D adds TrueFit body scanning and dual foot rollers. The YUKON-4D prioritizes pressure control precision. Here is the full breakdown.',
}

export default function YukonVsSensationPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>YUKON-4D vs Sensation 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Relax On Chair YUKON-4D vs RockerTech Sensation 4D: $500 Apart, Same Tier
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both are SL-track 4D chairs with two-stage zero gravity, lumbar heat, full airbag
        coverage, and body scanning, priced $500 apart at $6,499 and $6,999 respectively.
        The decision comes down to two specific differences: the Sensation&apos;s dual
        reflexology foot rollers and TrueFit body scanning vs the YUKON&apos;s premium
        pressure control architecture.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/2261/7893/products/relaxonchair-yukon-4d-massage-chair-black-front.jpg"
              alt="Relax On Chair YUKON-4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Relax On Chair YUKON-4D</p>
          <p className="text-sm text-charcoal">$6,499</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
            <p className="text-warm-gray text-sm p-4">RockerTech Sensation 4D</p>
          </div>
          <p className="text-sm font-semibold text-navy">RockerTech Sensation 4D</p>
          <p className="text-sm text-charcoal">$6,999</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          For buyers who are on their feet a lot, run, or have plantar fasciitis: the
          <strong> Sensation 4D</strong>, specifically for its dual reflexology foot rollers.
          For buyers whose primary concern is precision pressure control and full-spine
          coverage without paying for features they will not use: the <strong>YUKON-4D</strong>
          at $500 less is the tighter, cleaner pick at this tier.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs side by side</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Relax On Chair YUKON-4D</th>
              <th className="text-left p-3 font-medium">RockerTech Sensation 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$6,499', '$6,999'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '4D', '4D'],
              ['Body scanning', 'Yes', 'TrueFit'],
              ['Zero gravity', '2-level', '2-level'],
              ['Foot rollers', 'Standard', 'Dual reflexology'],
              ['Heat', 'Lumbar', 'Lumbar'],
              ['Key differentiator', 'Pressure control precision', 'Foot roller + body scan depth'],
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

      <h2 className="text-2xl font-serif mb-3">Foot rollers: when dual reflexology matters</h2>
      <p className="text-charcoal mb-6">
        The RockerTech Sensation 4D includes dual reflexology foot rollers that apply
        direct pressure to the plantar fascia and arch from two contact points simultaneously.
        Standard foot coverage uses airbag compression around the foot rather than direct
        roller contact on the sole. For buyers who stand for long periods, run, hike, or
        have plantar fasciitis or heel pain, the direct foot roller contact is a meaningful
        functional difference. For buyers whose primary pain is back and shoulder-focused,
        the foot roller upgrade is nice-to-have rather than a decision driver.
      </p>

      <h2 className="text-2xl font-serif mb-3">TrueFit body scanning vs standard body scanning</h2>
      <p className="text-charcoal mb-6">
        TrueFit is RockerTech&apos;s branded body scanning system that reads shoulder
        position and spine curvature to adjust roller start position per session. The
        YUKON-4D includes body scanning, but the system is less extensively documented
        than TrueFit. For buyers on either end of the height range, the more advanced
        body scan calibration in the Sensation translates to better roller positioning
        on every session. For buyers in the middle of the height range (5&apos;3&quot; to
        5&apos;11&quot;), the practical difference in session outcome is smaller.
      </p>

      <h2 className="text-2xl font-serif mb-3">YUKON-4D pressure control</h2>
      <p className="text-charcoal mb-6">
        The YUKON-4D is the flagship model from Relax On Chair and is built specifically
        around premium pressure control: the ability to precisely dial intensity by zone
        and session. For buyers who are sensitive to pressure, who share the chair with
        someone who needs different intensity settings, or who want fine-grained day-to-day
        adjustment without the complexity of advanced programming features, the YUKON
        delivers that control at a $500 lower price point than the Sensation.
      </p>

      <h2 className="text-2xl font-serif mb-3">Who should buy which</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the YUKON-4D if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>Your primary focus is back and hip pain, not foot relief</li>
            <li>Precision pressure control is the most important feature for your use case</li>
            <li>The $500 savings is relevant to your budget</li>
            <li>You are in the middle of the height range and body scanning precision matters less</li>
          </ul>
        </div>
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Sensation 4D if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>You run, stand for long hours, or have plantar fasciitis</li>
            <li>You are shorter than 5&apos;3&quot; or taller than 6&apos;0&quot; and want precise body scan calibration</li>
            <li>Dual foot roller coverage is a feature you will use regularly</li>
            <li>Advanced body scanning is a priority for your household</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 p-6 bg-navy text-white rounded-xl">
        <h2 className="text-xl font-serif font-semibold mb-2">Still narrowing it down?</h2>
        <p className="text-sm text-gray-300 mb-4">
          The chair finder filters by pain profile, body type, and budget across the full catalog.
        </p>
        <Link href="/finder" className="inline-block bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm">
          Find My Chair &rarr;
        </Link>
      </div>
    </div>
  )
}
