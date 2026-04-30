import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Osaki OS-Pro Admiral II vs Kahuna LM-6800S: Which Is Right for You? | MassageChairFinder',
  description: 'Detailed comparison of the Osaki OS-Pro Admiral II and Kahuna LM-6800S. Both SL-track, both under $3,000. The key differences are roller depth, weight capacity, and stretch programs.',
}

export default function AdmiralVsLM6800SPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>

      {/* Breadcrumb */}
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Admiral II vs LM-6800S</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Osaki OS-Pro Admiral II vs Kahuna LM-6800S: Which Is Right for You?
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Two SL-track chairs, both under $3,000, both with body scanning and space-saving recline.
        At first glance they look nearly identical. The differences that matter are roller type,
        weight capacity, and what each chair does in zero gravity.
      </p>

      {/* Chair image comparison */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-admiral-gray-massage-chair.webp?v=1776836197"
              alt="Osaki OS-Pro Admiral II massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Osaki OS-Pro Admiral II</p>
          <p className="text-sm text-charcoal">$2,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800S-massage-chair.jpg?v=1776902669"
              alt="Kahuna LM-6800S massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Kahuna LM-6800S</p>
          <p className="text-sm text-charcoal">$2,499</p>
        </div>
      </div>

      {/* Quick Verdict */}
      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          The <strong>Admiral II</strong> is the better chair for most buyers. The 3D roller delivers
          real depth control the LM-6800S cannot match, and the 70-lb higher weight capacity makes it
          the safer long-term investment. Choose the <strong>LM-6800S</strong> if you want stretch
          programs, three zero-gravity positions instead of one, or you are buying for someone under 5'2"
          who falls outside the Admiral II's height floor.
        </p>
      </div>

      {/* Spec Comparison Table */}
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
              ['Track type', 'SL-track', 'SL-track'],
              ['Track length', '49 inches', '45 inches'],
              ['Roller type', '3D', '2D'],
              ['Height range', "5'2\" to 6'1\"", "5'0\" to 6'0\""],
              ['Weight capacity', '270 lbs', '200 lbs'],
              ['Zero gravity', 'Yes', 'Yes (3 positions)'],
              ['Space saving', 'Yes (2" from wall)', 'Yes (3" from wall)'],
              ['Body scanning', 'Yes', 'Yes'],
              ['Heat therapy', 'Yes', 'Yes'],
              ['Foot and calf massage', 'Yes', 'Yes'],
              ['Stretch programs', 'Not confirmed', 'Yes'],
              ['Warranty', '3 years', '1 year'],
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

      {/* Key differences */}
      <h2 className="text-2xl font-serif mb-4">Where these chairs actually differ</h2>

      <h3 className="text-xl font-serif mb-2 text-navy">Roller depth: 3D vs 2D</h3>
      <p className="text-charcoal mb-4">
        This is the most important difference and the main reason the Admiral II costs $500 more.
        A 2D roller moves in two directions: up and down the spine, and side to side. A 3D roller
        adds a third axis, projecting further into the muscle to vary pressure intensity. In practice,
        that means you can dial the Admiral II from a gentle surface-level knead to a deep-tissue
        compression that genuinely reaches the paraspinal muscles along the lumbar. The LM-6800S
        cannot do this. Its massage is competent but fixed in intensity. For buyers with chronic
        lower back tension or tight shoulder muscles, the depth control on a 3D roller is not a
        premium feature. It is the feature.
      </p>
      <p className="text-charcoal mb-6">
        For a full explanation of how roller dimensions affect massage quality, see the{' '}
        <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">roller dimensions guide</Link>.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Track length and coverage</h3>
      <p className="text-charcoal mb-6">
        Both chairs use SL-track, which follows the spine from the neck down through the lumbar
        and under the seat into the glutes. The Admiral II runs 49 inches; the LM-6800S runs 45.
        In real terms, this difference matters most for taller buyers. At 6'0", the LM-6800S
        reaches the upper glutes. The Admiral II continues a few inches further. Neither chair
        is the right answer for buyers above 6'1", but the Admiral II fits a slightly wider
        height band. For a deeper look at how SL-track compares to S and L-track,
        see the <Link href="/learn/track-types" className="text-bronze hover:text-gold">track types guide</Link>.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Weight capacity</h3>
      <p className="text-charcoal mb-6">
        The Admiral II supports up to 270 lbs. The LM-6800S caps at 200 lbs. This is a binary
        filter for buyers in the 200 to 270 lb range. The LM-6800S is simply not the right chair
        for them. For buyers under 200 lbs, weight capacity is a non-issue and this difference
        does not change the calculus.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Zero gravity and stretch</h3>
      <p className="text-charcoal mb-6">
        The LM-6800S offers three zero-gravity positions, which is unusual at this price point.
        Most chairs in this range offer one. The clinical value of having three positions is debated,
        but buyers who use their chair daily often appreciate being able to shift between a lighter
        recline and a deeper decompression angle depending on how they feel. The LM-6800S also
        includes stretch programs, which extend the legs against resistance to lengthen the hip
        flexors and lower spine. Stretch is genuinely useful for buyers with sciatica or tight hip
        flexors. The Admiral II does not confirm stretch programs in its spec sheet.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Warranty</h3>
      <p className="text-charcoal mb-6">
        The Admiral II carries a 3-year warranty. The LM-6800S carries a 1-year warranty.
        On a $2,500 purchase, warranty coverage is a meaningful differentiator. Massage chair
        motors and control boards occasionally fail in years two and three. The Admiral II
        warranty covers that window. The LM-6800S does not.
      </p>

      {/* Who should choose each */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">
            Choose the Admiral II if:
          </h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>You want adjustable massage depth. The 3D roller is the defining upgrade over the LM-6800S.</span></li>
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>You weigh between 200 and 270 lbs. The LM-6800S cannot accommodate this range.</span></li>
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>Warranty coverage matters to you. Three years versus one is a real difference at this price point.</span></li>
            <li className="flex gap-2"><span className="text-teal font-bold mt-0.5">+</span><span>You are between 5'2" and 6'1". The Admiral II is sized for the core of that range.</span></li>
          </ul>
          <div className="mt-4">
            <a
              href="https://osakimassagechair.com/products/osaki-os-pro-admiral-ii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Shop the Admiral II
            </a>
          </div>
        </div>

        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">
            Choose the LM-6800S if:
          </h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>Budget is the primary factor. The $500 savings is real and the 2D massage is still capable.</span></li>
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>You are buying for someone under 5'2". The LM-6800S fits from 5'0" where the Admiral II does not.</span></li>
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>Stretch programs matter. Sciatica and hip flexor tightness benefit from the stretch function.</span></li>
            <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">+</span><span>You want three zero-gravity positions. Useful if you plan to use the chair at varying recline angles daily.</span></li>
          </ul>
          <div className="mt-4">
            <a
              href="https://kahunachair.com/lm-6800s-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Shop the LM-6800S
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <h2 className="text-2xl font-serif mb-3">Bottom line</h2>
      <p className="text-charcoal mb-4">
        The Admiral II is the stronger chair. At $2,999 it is priced $500 above the LM-6800S,
        and that gap buys a 3D roller with genuine depth control, a 70-lb higher weight limit,
        and a warranty that covers the full early-ownership period when components are most likely
        to need service. For buyers who plan to use the chair daily for back pain or chronic
        muscle tension, the 3D roller is not optional. The 2D roller on the LM-6800S will feel
        adequate at first and limiting within a few months of regular use.
      </p>
      <p className="text-charcoal mb-4">
        The LM-6800S earns its place for buyers with a firm $2,500 ceiling, for shorter buyers
        the Admiral II does not accommodate, or for anyone who specifically needs stretch programs
        and does not want to spend more to get them. It is a well-built chair at a good price.
        It is simply not as capable a massage instrument as the Admiral II.
      </p>
      <p className="text-charcoal mb-8">
        Not sure which track type is right for your pain profile? The{' '}
        <Link href="/finder" className="text-bronze hover:text-gold">chair finder quiz</Link> walks
        through your symptoms, budget, and body fit in about two minutes and surfaces the chairs
        most likely to work for your specific situation.
      </p>

      {/* Related links */}
      <div className="border-t border-sand pt-8">
        <h3 className="text-lg font-serif mb-3 text-navy">Learn more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/chairs/osaki-os-pro-admiral-ii" className="text-bronze hover:text-gold">Admiral II full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/chairs/kahuna-lm-6800s" className="text-bronze hover:text-gold">LM-6800S full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/osaki" className="text-bronze hover:text-gold">About Osaki</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/kahuna" className="text-bronze hover:text-gold">About Kahuna</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/track-types" className="text-bronze hover:text-gold">SL-track explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">3D vs 2D rollers</Link>
        </div>
      </div>

    </div>
  )
}
