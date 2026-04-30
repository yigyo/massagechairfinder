import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Synca JP970 vs Kahuna LM-6800: Which Is Right for You? | MassageChairFinder',
  description: 'The Synca JP970 costs $1,200 more than the Kahuna LM-6800 but uses an S-track that stops at the lumbar. The LM-6800 uses an L-track that reaches the hips. Here is which one to choose.',
}

export default function JP970VsLM6800Page() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>

      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>JP970 vs LM-6800</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Synca JP970 vs Kahuna LM-6800: Which Is Right for You?
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        The JP970 costs $1,200 more. It has a 4D roller, Japanese engineering, and a reputation
        built on upper-body massage quality. The LM-6800 costs less, uses an L-track that reaches
        the hips and glutes, and includes zero gravity and stretch programs. These are not
        interchangeable chairs. The right one depends almost entirely on where your pain lives.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp970-massage-chair.webp?v=1776836197"
              alt="Synca JP970 massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Synca JP970</p>
          <p className="text-sm text-charcoal">$4,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800-massage-chair.jpg?v=1776836198"
              alt="Kahuna LM-6800 massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Kahuna LM-6800</p>
          <p className="text-sm text-charcoal">$3,799</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          For buyers with lower back pain, sciatica, or hip tightness: choose the <strong>LM-6800</strong>.
          Its L-track reaches the glutes where the JP970 stops short, and it costs $1,200 less.
          For buyers whose pain is primarily in the upper back, neck, or shoulders and who want
          genuine deep-tissue intensity: choose the <strong>JP970</strong>. The 4D roller is a
          meaningful upgrade for that specific use case.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs side by side</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Synca JP970</th>
              <th className="text-left p-3 font-medium">Kahuna LM-6800</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$4,999', '$3,799'],
              ['Track type', 'S-track', 'L-track'],
              ['Track coverage', 'Neck to lumbar', 'Neck to upper thighs'],
              ['Roller type', '4D', '2D'],
              ['Height range', '60 to 75 inches', '60 to 72 inches'],
              ['Weight capacity', '285 lbs', '200 lbs'],
              ['Zero gravity', 'No', 'Yes (2 positions)'],
              ['Space saving', 'Not confirmed', 'Yes (3" from wall)'],
              ['Heat therapy', 'Yes', 'Yes'],
              ['Foot and calf', 'Yes', 'Yes'],
              ['Stretch programs', 'Not confirmed', 'Yes'],
              ['Body scanning', 'Yes', 'Not confirmed'],
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

      <h3 className="text-xl font-serif mb-2 text-navy">Track type: the decision that overrides everything else</h3>
      <p className="text-charcoal mb-4">
        The JP970 uses an S-track. It follows the natural curve of the spine from the neck
        down to the lumbar vertebrae, then stops. The LM-6800 uses an L-track, which extends
        the massage path under the seat into the glutes and upper thighs. If your pain is in
        the lower back, sacrum, hips, or radiates down the leg, the JP970 physically cannot
        reach the tissue that needs work. The LM-6800 can.
      </p>
      <p className="text-charcoal mb-6">
        This is the most important difference between these two chairs and it should drive
        the decision for most buyers. If you have lower back pain, the track type alone makes
        the LM-6800 the correct choice regardless of the price difference.
        For a full breakdown of how these track types compare,
        see the <Link href="/learn/track-types" className="text-bronze hover:text-gold">track types guide</Link>.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Roller type: 4D vs 2D</h3>
      <p className="text-charcoal mb-6">
        The JP970 earns back significant ground with its 4D roller. Where a 2D roller covers
        the surface of the muscle at fixed intensity, a 4D roller projects forward and back
        in a fourth dimension of motion, allowing it to replicate the pulsing, kneading
        rhythm of a trained therapist. For buyers with neck tension, tight traps, or shoulder
        blade knots, that depth variation is the difference between a massage that relieves
        and one that just covers the area. The LM-6800 uses a 2D roller, which is competent
        but cannot match the tissue engagement of the JP970 in the areas it reaches.
        See the <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">roller dimensions guide</Link> for a
        full comparison of 2D, 3D, and 4D rollers.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Zero gravity and stretch</h3>
      <p className="text-charcoal mb-6">
        The LM-6800 includes two zero-gravity positions, which decompress the lumbar spine by
        elevating the knees above the heart and distributing body weight across the seat. It
        also includes stretch programs that extend the legs against resistance, lengthening
        the hip flexors and lower spine. The JP970 does not confirm either feature. For buyers
        with compression-related lower back pain or tight hip flexors, this is an additional
        reason to favor the LM-6800.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Price and weight capacity</h3>
      <p className="text-charcoal mb-6">
        The JP970 costs $4,999 and supports up to 285 lbs. The LM-6800 costs $3,799 and
        supports up to 200 lbs. The $1,200 savings on the LM-6800 is real, but the weight
        capacity gap matters for buyers in the 200 to 285 lb range. If you are over 200 lbs,
        the LM-6800 is not the right chair regardless of the other factors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the JP970 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>Your pain is in the upper back, neck, or shoulders. S-track is well suited here and the 4D roller delivers genuine depth.</span></li>
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>You weigh between 200 and 285 lbs. The LM-6800 is not rated for this range.</span></li>
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>Deep tissue intensity is your priority. The 4D roller is the JP970's defining strength.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://syncamassagechair.com/products/jp970" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the JP970
            </a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the LM-6800 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>You have lower back pain, sciatica, or hip tightness. L-track is the only track that reaches those areas.</span></li>
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>Budget matters. At $3,799 it is $1,200 less than the JP970 with better coverage for most pain profiles.</span></li>
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>You want zero gravity and stretch. Both are confirmed on the LM-6800 and not confirmed on the JP970.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://kahunachair.com/product/kahuna-massage-chair-basic-l-track-full-body-kahuna-massage-chair-lm-6800-black/" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the LM-6800
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-serif mb-3">Bottom line</h2>
      <p className="text-charcoal mb-4">
        The JP970 is a better massage instrument for the upper body. The LM-6800 covers more
        of the body, costs less, and includes features the JP970 does not confirm. For the
        majority of buyers, who come to this category with lower back pain or full-body tension,
        the LM-6800 is the correct recommendation. The JP970 earns its price for a specific
        buyer profile: upper body focus, higher weight, and a willingness to pay for roller quality.
      </p>
      <p className="text-charcoal mb-8">
        Not sure which track type addresses your pain pattern? Use the{' '}
        <Link href="/finder" className="text-bronze hover:text-gold">chair finder quiz</Link> to
        match your symptoms to the right chair in about two minutes.
      </p>

      <div className="border-t border-sand pt-8">
        <h3 className="text-lg font-serif mb-3 text-navy">Learn more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/chairs/synca-jp970" className="text-bronze hover:text-gold">JP970 full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/chairs/kahuna-lm-6800" className="text-bronze hover:text-gold">LM-6800 full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/kahuna" className="text-bronze hover:text-gold">About Kahuna</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/track-types" className="text-bronze hover:text-gold">S-track vs L-track explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">4D vs 2D rollers</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/best/lower-back-pain" className="text-bronze hover:text-gold">Best chairs for lower back pain</Link>
        </div>
      </div>

    </div>
  )
}
