import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inada DreamWave vs JPMedics Kumo 4D: Two Different Philosophies',
  description: 'The Inada DreamWave is a Japanese S-track icon at $6,999. The JPMedics Kumo 4D is an L-track 4D powerhouse at $10,999. They solve different problems. Here is which one is right for your pain and priorities.',
}

export default function InadaVsKumoPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Inada DreamWave vs JPMedics Kumo 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Inada DreamWave vs JPMedics Kumo 4D: Two Different Philosophies
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        These two chairs are compared frequently because both sit at a premium tier and both
        carry strong reputations. But they represent fundamentally different approaches to
        what a massage chair should do. The DreamWave is a Japanese therapeutic icon built
        around precision and technique. The Kumo 4D is a full-coverage performance chair
        built around reach and depth. The right choice depends almost entirely on where
        your pain lives.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
            <p className="text-warm-gray text-sm p-4">Inada DreamWave</p>
          </div>
          <p className="text-sm font-semibold text-navy">Inada DreamWave</p>
          <p className="text-sm text-charcoal">$6,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/jpmedics-kumo-4d-massage-chair-black-front.jpg"
              alt="JPMedics Kumo 4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">JPMedics Kumo 4D</p>
          <p className="text-sm text-charcoal">$10,999</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          For buyers with mid-back and upper back tension, or those who have had professional
          shiatsu and want to replicate it at home: the <strong>DreamWave</strong>. For buyers
          with lower back pain that extends into the hips, glutes, or hamstrings, or anyone
          who needs L-track coverage: the <strong>Kumo 4D</strong> is the only answer here.
          The $4,000 price gap is real; the track difference is the reason to pay it for lower
          body pain specifically.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs side by side</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Inada DreamWave</th>
              <th className="text-left p-3 font-medium">JPMedics Kumo 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$6,999', '$10,999'],
              ['Track', 'S-track', 'L-track'],
              ['Roller', '3D (figure-8 motion)', '4D'],
              ['Lower back / glute coverage', 'Lumbar only', 'Lumbar + glutes + hamstrings'],
              ['Zero gravity', 'Yes', 'Yes'],
              ['Heat', 'Full back', 'Lumbar + calves'],
              ['Weight capacity', '300 lbs', '320 lbs'],
              ['Manufacturing', 'Japan', 'South Korea'],
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

      <h2 className="text-2xl font-serif mb-3">The DreamWave: what the figure-8 roller does</h2>
      <p className="text-charcoal mb-6">
        The DreamWave uses a proprietary figure-8 roller motion rather than a standard
        linear track. This motion is designed to replicate the movement of a skilled shiatsu
        practitioner working both sides of the spine simultaneously: the roller traces an
        infinity-pattern path that addresses the paraspinal muscles on both sides of the
        vertebrae rather than rolling straight down the center. For buyers who have
        experienced traditional Japanese shiatsu massage and found it effective, the
        DreamWave is the closest mechanical approximation available in a home chair.
        The roller technique is genuinely differentiated. No other chair in the market
        replicates this motion.
      </p>
      <p className="text-charcoal mb-6">
        The limitation is coverage. The DreamWave is an S-track chair. It reaches from
        the neck to the lumbar and stops. It does not extend under the seat. For buyers
        whose back pain is concentrated in the mid and upper back, this is sufficient.
        For buyers whose pain extends into the sacrum, glutes, or radiates into the legs,
        the DreamWave will not reach the source of the problem.
      </p>

      <h2 className="text-2xl font-serif mb-3">The Kumo 4D: coverage and depth</h2>
      <p className="text-charcoal mb-6">
        The JPMedics Kumo 4D uses an L-track that extends under the seat to reach the
        glutes and upper hamstrings. Combined with 4D roller depth control and variable
        rhythm, it provides the most therapeutically complete lower back and hip coverage
        in its price tier. The roller can be adjusted for depth and intensity session by
        session, which matters for buyers whose pain level varies. The 320-lb weight
        capacity is among the highest in the premium category.
      </p>
      <p className="text-charcoal mb-6">
        The Kumo is a South Korean-manufactured chair, not Japanese. The manufacturing
        quality is high. But buyers who are specifically seeking Japanese manufacturing
        heritage and the therapeutic philosophy that comes with it will find the DreamWave
        more aligned with that priority, at a $4,000 lower price point.
      </p>

      <h2 className="text-2xl font-serif mb-3">Who should buy which</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the DreamWave if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>Your pain is in the mid and upper back, neck, or shoulders</li>
            <li>You have experience with traditional shiatsu and want to replicate it</li>
            <li>Japanese manufacturing and therapeutic philosophy matter to you</li>
            <li>The $4,000 savings is meaningful to your budget</li>
          </ul>
        </div>
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Kumo 4D if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>Your lower back pain extends into the hips, glutes, or radiates down</li>
            <li>You have sciatica or hip tightness from training or prolonged sitting</li>
            <li>You want 4D roller depth variation for session-by-session adjustment</li>
            <li>Weight capacity above 280 lbs is a requirement</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 p-6 bg-navy text-white rounded-xl">
        <h2 className="text-xl font-serif font-semibold mb-2">Still deciding?</h2>
        <p className="text-sm text-gray-300 mb-4">
          The chair finder filters by pain location, budget, and body type across the full catalog.
        </p>
        <Link href="/finder" className="inline-block bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm">
          Find My Chair &rarr;
        </Link>
      </div>
    </div>
  )
}
