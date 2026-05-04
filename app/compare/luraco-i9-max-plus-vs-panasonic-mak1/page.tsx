import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Luraco i9 Max Plus vs Panasonic MAK1: Which Is Right for You? | MassageChairFinder',
  description: 'The Luraco i9 Max Plus costs $1,000 less than the Panasonic MAK1, uses an L-track with zero gravity, and carries a 10-year warranty. The MAK1 has no zero gravity and uses an S-track. Here is the full comparison.',
}

export default function LuracoVsMAK1Page() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>

      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Luraco i9 Max Plus vs Panasonic MAK1</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Luraco i9 Max Plus vs Panasonic MAK1: Which Is Right for You?
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both chairs sit above $13,000 and represent the engineering-forward end of the category.
        The Luraco i9 Max Plus is assembled in Irving, Texas and carries a 10-year warranty.
        The Panasonic MAK1 comes from one of Japan's most established electronics manufacturers.
        Despite similar price points, these chairs make very different choices on the features
        that matter most to buyers with chronic pain.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/luraco-i9_max-massage-chair.jpg?v=1776836198"
              alt="Luraco i9 Max Plus massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Luraco i9 Max Plus</p>
          <p className="text-sm text-charcoal">$13,490</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0661/9758/5995/files/panasonic-mak1-massage-chair.webp?v=1776958938"
              alt="Panasonic MAK1 massage chair"
              width={400}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Panasonic MAK1</p>
          <p className="text-sm text-charcoal">$14,499</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          The <strong>Luraco i9 Max Plus</strong> is the stronger all-around chair for most buyers.
          It costs $1,000 less, covers a wider body size range, includes zero gravity and L-track
          coverage, and carries a 10-year warranty. The <strong>MAK1</strong> is the right choice
          for buyers who specifically want Panasonic brand engineering, the 4D roller depth, or
          an S-track designed around upper back and neck focus. Buyers with lower back pain should
          note: the MAK1 has no zero gravity and uses an S-track that does not reach the hips.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Luraco i9 Max Plus</th>
              <th className="text-left p-3 font-medium">Panasonic MAK1</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$13,490', '$14,499'],
              ['Track type', 'L-track (split)', 'S-track'],
              ['Roller type', '3D', '4D'],
              ['Height range', '59 to 82 inches', '56 to 74 inches'],
              ['Weight capacity', '300 lbs', '264 lbs'],
              ['Zero gravity', 'Yes', 'No (confirmed absent)'],
              ['Heat therapy', 'Yes', 'Yes (infrared rollers)'],
              ['Foot and calf', 'Yes', 'Yes'],
              ['Stretch programs', 'Yes', 'Yes'],
              ['Body scanning', 'Yes', 'Yes'],
              ["Tall confirmed", "Yes (to 6'10\")", "No"],
              ['Country of origin', 'USA (Irving, Texas)', 'Japan'],
              ['Warranty', '10 years', 'Standard'],
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

      <h3 className="text-xl font-serif mb-2 text-navy">Zero gravity: present vs confirmed absent</h3>
      <p className="text-charcoal mb-6">
        The Panasonic MAK1 does not include zero gravity recline. This is confirmed from
        the MAK1 spec sheet and is one of the most significant spec decisions for a chair
        at this price. Zero gravity elevates the knees above the heart during the massage,
        distributing body weight away from the lumbar spine. For buyers with chronic lower
        back compression or herniated discs, this positioning meaningfully changes the
        effectiveness of the massage. The i9 Max Plus includes zero gravity. At $1,000 less
        than the MAK1, the absence of zero gravity on the more expensive chair is a notable gap.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Track type and body coverage</h3>
      <p className="text-charcoal mb-6">
        The i9 Max Plus uses a split L-track. Luraco designed it to cover the full spine
        from the neck to the lumbar and extend under the seat into the glutes. The MAK1
        uses an S-track, which follows the spine from the cervical region to the lumbar
        and stops. Buyers with lower back pain that radiates into the hip or glute, or
        any presentation of sciatica, should not purchase the MAK1 expecting it to address
        those areas. The i9 Max Plus covers them. For upper back, neck, and shoulder tension,
        both chairs reach those areas.
        See the <Link href="/learn/track-types" className="text-bronze hover:text-gold">track types guide</Link> for
        more detail on how these paths differ.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Height range: i9 Max Plus is exceptional</h3>
      <p className="text-charcoal mb-6">
        The i9 Max Plus is confirmed to fit buyers from 4 feet 11 inches to 6 feet 10 inches,
        the widest height range in the catalog. The MAK1 is confirmed to 6 feet 2 inches.
        For tall buyers, this is a binary filter. The i9 Max Plus is the only chair at this
        price point that accommodates buyers at or above 6 feet 4 inches with full verified
        coverage. It is also confirmed for buyers up to 300 lbs. The MAK1 caps at 264 lbs.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Roller type and the Panasonic advantage</h3>
      <p className="text-charcoal mb-6">
        The MAK1 uses a 4D roller with infrared heat built into the roller mechanism itself,
        warming the tissue from the point of contact rather than from a separate heat element.
        This is a genuine engineering distinction and one of the MAK1's strongest features.
        The i9 Max Plus uses a 3D roller with separate heat, which is capable but not equivalent
        in this specific dimension. For buyers with chronic muscle tightness who have found
        heat-assisted massage particularly effective, this is the one area where the MAK1 earns
        a clear advantage.
        See the <Link href="/learn/roller-dimensions" className="text-bronze hover:text-gold">roller dimensions guide</Link> for
        more on how 3D and 4D rollers compare.
      </p>

      <h3 className="text-xl font-serif mb-2 text-navy">Made in USA and the 10-year warranty</h3>
      <p className="text-charcoal mb-6">
        Luraco is the only massage chair manufacturer with a MADE IN USA certification,
        assembling the i9 Max Plus in Irving, Texas. The 10-year warranty that comes with
        the i9 Max Plus is the strongest in the category by a significant margin. At a
        $13,000+ price point, warranty coverage is not a minor consideration. The MAK1
        carries a standard manufacturer warranty. Owning a $14,000 chair without a
        decade of coverage is a meaningful risk that the i9 Max Plus eliminates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the i9 Max Plus if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You have lower back pain, hip pain, or sciatica. L-track and zero gravity are the right tools for this profile.</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You are over 6 feet 2 inches. The i9 Max Plus is confirmed to 6 feet 10 inches. The MAK1 is not.</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>Long-term ownership confidence matters. The 10-year warranty and Made in USA certification are the strongest in the category.</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">›</span><span>You want to spend less. At $13,490 it is $1,000 less than the MAK1.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the i9 Max Plus
            </a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the MAK1 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Your pain is focused on the upper back, neck, or shoulders and you want Panasonic's precision S-track engineering.</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Infrared heated rollers are important to you. It is the MAK1's most distinctive and capable feature.</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">›</span><span>Panasonic brand trust and Japanese engineering heritage matters in your decision.</span></li>
          </ul>
          <div className="mt-4">
            <a href="https://www.massagechairs.com/products/panasonic-mak1-massage-chair" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Shop the MAK1
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-serif mb-3">Bottom line</h2>
      <p className="text-charcoal mb-8">
        The i9 Max Plus is the stronger recommendation for most buyers comparing these two
        chairs. It is less expensive, covers more of the body, includes zero gravity, fits
        a wider range of body types, and carries a 10-year warranty. The MAK1 is a thoughtfully
        engineered chair that earns its consideration for upper-back focused buyers who want
        infrared roller heat and Panasonic's engineering pedigree. But for buyers with lower
        back pain or any compression-related issue, the absence of zero gravity and L-track
        on a $14,499 chair is a hard position to justify.
      </p>

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

      <div className="border-t border-sand pt-8">
        <h3 className="text-lg font-serif mb-3 text-navy">Learn more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/chairs/luraco-i9-max-plus" className="text-bronze hover:text-gold">i9 Max Plus full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/chairs/panasonic-mak1" className="text-bronze hover:text-gold">MAK1 full review</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/luraco" className="text-bronze hover:text-gold">About Luraco</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/brands/panasonic" className="text-bronze hover:text-gold">About Panasonic</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/learn/track-types" className="text-bronze hover:text-gold">Track types explained</Link>
          <span className="text-warm-gray">|</span>
          <Link href="/best/premium" className="text-bronze hover:text-gold">Best premium chairs</Link>
        </div>
      </div>

    </div>
  )
}
