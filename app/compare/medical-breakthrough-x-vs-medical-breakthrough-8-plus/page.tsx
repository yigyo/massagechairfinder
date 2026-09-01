import type { Metadata } from 'next'
import { affiliateUrlById } from '@/lib/chairs'
import Image from 'next/image'
import Link from 'next/link'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/compare/medical-breakthrough-x-vs-medical-breakthrough-8-plus" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/compare/medical-breakthrough-x-vs-medical-breakthrough-8-plus"),
  title: 'Medical Breakthrough X vs 8 Plus',
  description: 'Two L-track 4D Medical Breakthrough chairs with the same core spec and a price tier between them. The 8 Plus adds an open-foot design. Here is what actually separates them.',
}

export default function MbxVsMb8PlusPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Medical Breakthrough X vs 8 Plus</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Medical Breakthrough X vs Medical Breakthrough 8 Plus
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        These two are closer than the price gap suggests. Both are L-track 4D chairs rated to
        300 lbs, both include heat, zero gravity, stretch, and full body scanning, and both come
        from the same maker. One sits in the premium band and one in the ultra-premium band. For
        most buyers the cheaper of the two is the better buy, and the reason is a foot design
        rather than anything in the massage engine.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/chairs/medical-breakthrough-x.jpg" alt="Medical Breakthrough X massage chair" width={400} height={300} className="w-full h-full object-contain p-4" />
          </div>
          <p className="text-sm font-semibold text-navy">Medical Breakthrough X</p>
          <p className="text-sm text-charcoal">$12,000 and up</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/chairs/medical-breakthrough-8-plus.jpg" alt="Medical Breakthrough 8 Plus massage chair" width={400} height={300} className="w-full h-full object-contain p-4" />
          </div>
          <p className="text-sm font-semibold text-navy">Medical Breakthrough 8 Plus</p>
          <p className="text-sm text-charcoal">$8,000-$11,999</p>
        </div>
      </div>

      <div className="mb-10 rounded-lg p-5" style={{ background: 'rgba(209,128,62,0.06)', border: '1px solid rgba(209,128,62,0.25)' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#D1803E' }}>Quick verdict</p>
        <p className="text-charcoal text-base leading-relaxed">
          Buy the <strong>8 Plus</strong> unless you have a specific reason not to. It matches the
          X on every spec that governs how the massage feels, adds an open-foot design that suits
          larger feet and anyone who dislikes an enclosed footwell, and sits a full price band
          lower. The <strong>X</strong> is the flagship and is the right call only if you want the
          top of the line for its own sake or you prefer an enclosed footwell.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Medical Breakthrough X</th>
              <th className="text-left p-3 font-medium">Medical Breakthrough 8 Plus</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price band', '$12,000 and up', '$8,000-$11,999'],
              ['Track', 'L-track', 'L-track'],
              ['Roller', '4D', '4D'],
              ['Weight capacity', '300 lbs', '300 lbs'],
              ['Zero gravity', 'Yes', 'Yes'],
              ['Heat', 'Yes', 'Yes'],
              ['Stretch program', 'Yes', 'Yes'],
              ['Full body scan', 'Yes', 'Yes'],
              ['Foot design', 'Enclosed footwell', 'Open foot with foot rollers'],
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

      <h2 className="text-2xl font-serif mb-3">The massage engine is the same on both</h2>
      <p className="text-charcoal mb-6">
        This is the part buyers get wrong when a price gap this size is on the table. Track shape
        and roller dimension are the two specs that decide what a massage chair actually feels
        like against your back, and these two chairs are identical on both: an L-track that carries
        the rollers from the neck down under the glutes, driven by a 4D mechanism that varies speed
        and rhythm rather than only depth. Zero gravity, heat, the stretch program, and full body
        scanning are present on both as well. If you sat in each with your eyes closed, the
        difference would not be in the massage. For why those two specs dominate the decision, see
        the guides on <Link href="/learn/track-types" className="text-teal hover:underline">S-track vs L-track vs SL-track</Link> and
        {' '}<Link href="/learn/4d-vs-3d-massage-chair-rollers" className="text-teal hover:underline">3D vs 4D rollers</Link>.
      </p>

      <h2 className="text-2xl font-serif mb-3">The open foot is the real difference</h2>
      <p className="text-charcoal mb-6">
        The 8 Plus uses an open-foot design with foot rollers rather than an enclosed footwell.
        This matters more than it sounds. An enclosed footwell has a fixed internal length, and
        buyers with larger feet report their heels bottoming out or their calves sitting at the
        wrong depth, which throws off the calf airbags as well. An open design removes that
        constraint. It also suits anyone who finds an enclosed well claustrophobic, and it makes
        getting in and out easier for buyers with limited hip or knee mobility, which is worth
        weighing if that describes you. The trade is that an enclosed well wraps the foot more
        completely. Neither is universally better, but only one of them is cheaper.
        See <Link href="/learn/body-fit" className="text-teal hover:underline">body fit</Link> for
        how to check footwell length against your own measurements before you commit.
      </p>

      <h2 className="text-2xl font-serif mb-3">What a price band buys you here</h2>
      <p className="text-charcoal mb-6">
        Moving from the premium band to the ultra-premium band on this pair does not buy a longer
        track, a higher weight rating, or a more capable roller. It buys flagship positioning
        within one brand&apos;s lineup. That is a legitimate thing to want, and some buyers do
        want the top model on principle. It is not the same thing as buying more chair. Before
        deciding, it is worth reading what separates the price tiers generally in
        {' '}<Link href="/learn/massage-chair-price-tiers" className="text-teal hover:underline">what you get at each price tier</Link>,
        and putting the difference against the
        {' '}<Link href="/learn/massage-chair-warranty-guide" className="text-teal hover:underline">warranty terms</Link>,
        which govern far more of the long-run ownership cost than the badge does.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Medical Breakthrough X if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You prefer an enclosed footwell that wraps the foot</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You want the flagship model in the lineup and the badge matters to you</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>Your feet sit comfortably inside a standard enclosed well</span></li>
          </ul>
          <div className="mt-4">
            <a href={affiliateUrlById('medical-breakthrough-x')} className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Medical Breakthrough X</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the Medical Breakthrough 8 Plus if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>You want the same L-track 4D massage for a full price band less</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>You have larger feet or dislike an enclosed footwell</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Getting in and out easily matters for mobility reasons</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>You would rather put the difference toward delivery or a service plan</span></li>
          </ul>
          <div className="mt-4">
            <a href={affiliateUrlById('medical-breakthrough-8-plus')} className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Medical Breakthrough 8 Plus</a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-serif mb-4">Frequently asked questions</h2>

      <details className="mb-3">
        <summary><strong>Is the Medical Breakthrough X worth the extra money over the 8 Plus?</strong></summary>
        <p className="text-charcoal mt-2">For the massage itself, no. Both are L-track 4D chairs rated to 300 lbs with heat, zero gravity, stretch, and body scanning. The X is the flagship and carries flagship pricing, but the specs that decide how a massage chair feels are the same on both. The 8 Plus is the better value unless you specifically prefer an enclosed footwell.</p>
      </details>

      <details className="mb-3">
        <summary><strong>What is the difference between the Medical Breakthrough X and the 8 Plus?</strong></summary>
        <p className="text-charcoal mt-2">Price band and foot design. The 8 Plus uses an open-foot layout with foot rollers and sits in the $8,000-$11,999 band; the X uses an enclosed footwell and sits at $12,000 and up. Track type, roller dimension, weight capacity, heat, zero gravity, stretch, and body scanning are the same on both.</p>
      </details>

      <details className="mb-3">
        <summary><strong>Which one is better for larger feet?</strong></summary>
        <p className="text-charcoal mt-2">The 8 Plus. Its open-foot design removes the fixed internal length of an enclosed footwell, which is the constraint buyers with larger feet run into. An enclosed well can leave the heel bottoming out and the calves sitting at the wrong depth, which also affects how the calf airbags make contact.</p>
      </details>

      <details className="mb-6">
        <summary><strong>Are both chairs L-track?</strong></summary>
        <p className="text-charcoal mt-2">Yes. Both use an L-track, carrying the rollers from the neck down and under the glutes. That makes both a reasonable fit for lower back and hip coverage, and a weaker fit than an SL-track for buyers whose main complaint is upper back and shoulder tension.</p>
      </details>

      <div className="rounded-lg p-6 mb-10" style={{ background: '#F5F1EB', border: '1px solid #E8DFD3' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#2E7D6F' }}>Chair Finder</p>
        <h2 className="text-xl font-serif text-navy mb-2">Not sure which is right for you?</h2>
        <p className="text-charcoal text-sm mb-4">
          Answer a few questions about your body, pain profile, and budget. The Chair Finder
          surfaces the chairs most likely to work for your specific situation.
        </p>
        <Link href="/finder" className="inline-block text-white text-sm font-medium px-5 py-2.5 rounded transition-colors" style={{ background: '#D1803E' }}>
          Open the Chair Finder
        </Link>
      </div>


      <div className="border-t border-sand pt-8">
        <h3 className="text-lg font-serif mb-3 text-navy">Learn more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/chairs/medical-breakthrough-x" className="text-bronze hover:text-gold">Medical Breakthrough X full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/chairs/medical-breakthrough-8-plus" className="text-bronze hover:text-gold">Medical Breakthrough 8 Plus full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/medical-breakthrough" className="text-bronze hover:text-gold">About Medical Breakthrough</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/track-types" className="text-bronze hover:text-gold">Track types explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/compare" className="text-bronze hover:text-gold">All comparisons</Link>
        </div>
      </div>

</div>
  )
}
