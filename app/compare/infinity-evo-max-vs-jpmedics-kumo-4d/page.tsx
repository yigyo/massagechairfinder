import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Infinity Evo Max 4D vs JPMedics Kumo 4D | MassageChairFinder',
  description: 'Both L-track 4D chairs at $10,999. The Infinity Evo Max needs 2 inches of wall clearance. The JPMedics Kumo 4D confirms plus-size fit at 320 lbs and supports buyers up to 6 foot 3.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Evo Max vs Kumo 4D</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Infinity Evo Max 4D vs JPMedics Kumo 4D</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        At the same price of $10,999, both chairs use an L-track 4D roller with heat, stretch, and calf massage. The Infinity Evo Max is the choice for rooms with tight space behind the chair. The JPMedics Kumo 4D is the choice for heavier and taller buyers, and for those who want Japanese engineering with a strong verified review record.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://massagechairstore.com/wp-content/uploads/2021/10/EvoMax_Black_HEro1000x7201000x720.jpg"
              alt="Infinity Evo Max 4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Infinity Evo Max 4D</p>
          <p className="text-sm text-charcoal">$10,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/jpmedics-kumo-4d-massage-chair-white-brown-1.jpg"
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
        <p className="mb-3">
          For buyers in rooms where the chair can be close to the wall, the Infinity Evo Max 4D is one of the few chairs at this price that requires only 2 inches of clearance. If a standard recline is not possible in your room, this is the practical answer.
        </p>
        <p>
          For most other buyers, the JPMedics Kumo 4D is the stronger overall chair. It confirms plus-size fit at 320 lbs, supports buyers up to 6'3", is manufactured in Japan, and has a 5.0 review rating from verified buyers. For the buyer who wants a long-term investment in a chair they will use daily for years, the Kumo has a stronger quality and fit track record.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Infinity Evo Max 4D</th>
              <th className="text-left p-3">JPMedics Kumo 4D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$10,999', '$10,999'],
              ['Track', 'L-track', 'L-track'],
              ['Roller', '4D', '4D'],
              ['Track Length', '49 inches', 'Not published'],
              ['Weight Capacity', 'Not published', '320 lbs'],
              ['Max User Height', 'Not published', `6'3" (75 in)`],
              ['Wall Clearance', '2 inches', 'Standard recline'],
              ['Zero Gravity', 'Yes', 'Yes'],
              ['Heat', 'Yes', 'Yes'],
              ['Foot Rollers', 'Yes', 'Yes'],
              ['Calf Massage', 'Yes', 'Yes'],
              ['Stretch Programs', 'Yes', 'Yes'],
              ['Body Scanning', 'Not specified', 'Yes'],
              ['Plus-Size Verified', 'Not confirmed', 'Yes'],
              ['Manufacturing', 'China', 'Japan'],
              ['Review Rating', 'Not available', '5.0 (9 reviews)'],
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

      <h2 className="text-2xl font-serif font-semibold mb-4">Wall Clearance: The Evo Max Advantage</h2>
      <p className="mb-4">
        The Infinity Evo Max 4D requires 2 inches of clearance behind the chair to recline fully. Most massage chairs need 18-24 inches of rear space to recline. If your room has the chair placed within a few inches of the wall, the Evo Max is one of the few L-track 4D chairs at this price that can actually work in that space.
      </p>
      <p className="mb-8">
        The JPMedics Kumo 4D uses a standard recline mechanism and needs more rear clearance. If you have 18+ inches behind the chair, this is a non-issue. If space is genuinely tight, the Evo Max has a meaningful functional advantage.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Body Fit: The Kumo Advantage</h2>
      <p className="mb-4">
        The Kumo 4D has published a 320 lb weight capacity and confirmed plus-size fit. This means the roller tracking, seat dimensions, and airbag placement have all been verified for heavier buyers, not just the structural load limit. It also supports buyers up to 6'3", which covers the vast majority of the U.S. adult population.
      </p>
      <p className="mb-8">
        The Infinity Evo Max 4D does not publish weight capacity or maximum height, which makes it harder to confirm fit without additional research. For buyers who are above average height or weight, the Kumo's confirmed specs provide more certainty.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Japanese Manufacturing and Review Record</h2>
      <p className="mb-8">
        The JPMedics Kumo 4D is manufactured in Japan. Japanese-made chairs in this category are associated with tighter quality control, longer component lifespans, and more refined roller feel. The Kumo has a 5.0 rating from 9 verified buyer reviews, with buyers consistently describing daily use patterns and lasting relief from chronic pain. The Infinity Evo Max does not have a comparable review record available.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Infinity Evo Max 4D if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Your room has very limited rear clearance (under 6 inches)</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You are an average-sized buyer without confirmed fit concerns</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>You are already familiar with the Infinity brand and its dealer network</span></li>
            <li className="flex items-start gap-2"><span className="text-navy mt-1">›</span><span>Space-saving recline is the primary decision variable</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/infinity-evolution" className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Evo Max 4D</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the JPMedics Kumo 4D if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You weigh over 250 lbs or stand above 6'0"</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>Japanese manufacturing and quality longevity matter to you</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>You want a chair with a strong verified review track record</span></li>
            <li className="flex items-start gap-2"><span className="text-teal mt-1">›</span><span>Room space behind the chair is not a constraint</span></li>
          </ul>
          <div className="mt-4">
            <a href="/go/jpmedics-kumo-4d" className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Kumo 4D</a>
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
