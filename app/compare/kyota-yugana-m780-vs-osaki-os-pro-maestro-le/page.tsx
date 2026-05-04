import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kyota Yugana M780 vs Osaki OS-Pro Maestro LE 2.0: Premium 4D Comparison',
  description: 'The Yugana M780 is L-track at $7,999 with a 2-inch wall clearance. The Maestro LE is SL-track at $8,999 with broader upper-body airbag coverage. Here is how to choose between them.',
}

export default function YuganaVsMaestroPage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Kyota Yugana M780 vs Osaki Maestro LE</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Kyota Yugana M780 4D vs Osaki OS-Pro Maestro LE 2.0: Premium 4D Showdown
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        Both are premium 4D chairs in the $8,000 to $9,000 range, both appear frequently
        on recommended lists at this tier, and both have strong build quality. The core
        decision is L-track vs SL-track, a $1,000 price gap, and which specific features
        matter most for your body and your room.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Kyota_YuganaM780_1_1.jpg"
              alt="Kyota Yugana M780 4D massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Kyota Yugana M780 4D</p>
          <p className="text-sm text-charcoal">$7,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0727/1609/1700/files/OS_PRO_MaestroLE_Beige_1L.webp"
              alt="Osaki OS-Pro Maestro LE 2.0 massage chair"
              width={400} height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <p className="text-sm font-semibold text-navy">Osaki OS-Pro Maestro LE 2.0</p>
          <p className="text-sm text-charcoal">$8,999</p>
        </div>
      </div>

      <div className="card mb-10" style={{ borderLeft: '4px solid #D1803E' }}>
        <h2 className="text-lg font-serif font-semibold text-navy mb-2">Quick verdict</h2>
        <p className="text-charcoal">
          The <strong>Yugana M780</strong> is the better value and the right call for
          buyers with space constraints, petite buyers (confirmed to 4&apos;8&quot;), or
          anyone whose lower back pain extends into the glutes and wants maximum roller
          depth at a lower price. The <strong>Maestro LE 2.0</strong> earns its premium
          for buyers who need full SL-track coverage from neck to glutes, broader upper-body
          airbag work, and weigh 260 lbs or under.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Kyota Yugana M780 4D</th>
              <th className="text-left p-3 font-medium">Osaki Maestro LE 2.0</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$7,999', '$8,999'],
              ['Track', 'L-track', 'SL-track'],
              ['Roller', '4D', '4D'],
              ['Body scanning', 'TrueFit', 'Yes'],
              ['Zero gravity', '2-stage', '2-stage'],
              ['Wall clearance', '2 inches', 'Standard'],
              ['Weight capacity', '300 lbs', '260 lbs'],
              ['Min height confirmed', `4'8"`, 'Not published'],
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

      <h2 className="text-2xl font-serif mb-3">L-track vs SL-track: the most important difference</h2>
      <p className="text-charcoal mb-6">
        The Yugana uses an L-track, which extends under the seat to reach the glutes and
        upper hamstrings. The Maestro LE uses an SL-track, which does the same but also
        provides fuller coverage of the upper thoracic spine above the shoulder blades.
        If your pain is primarily in the lower back and hips, L-track is sufficient and
        the Yugana is the better-value chair. If you carry significant upper back and
        neck tension alongside lower back pain, the SL-track coverage in the Maestro
        provides more complete relief in a single session.
      </p>

      <h2 className="text-2xl font-serif mb-3">The Yugana&apos;s space-saving and petite advantages</h2>
      <p className="text-charcoal mb-6">
        The Yugana M780 needs only 2 inches of wall clearance, which is exceptional for
        a premium 4D chair. It is confirmed for buyers as short as 4 feet 8 inches, the
        lowest confirmed minimum in the premium 4D tier. At 300-lb capacity vs the
        Maestro&apos;s 260, it accommodates a wider range of body types. These three
        factors together make the Yugana the default recommendation for petite buyers,
        for rooms with placement constraints, and for buyers over 260 lbs at this tier.
      </p>

      <h2 className="text-2xl font-serif mb-3">The Maestro LE&apos;s upper-body advantage</h2>
      <p className="text-charcoal mb-6">
        The Maestro LE 2.0 combines SL-track coverage with a broader airbag system that
        covers the shoulders, upper arms, and hands more extensively than the Yugana.
        For buyers who carry significant desk-work tension in the upper back and shoulder
        complex alongside lower back pain, the combination of SL-track roller reach and
        full upper-body airbag compression is the more complete therapeutic package.
        The Osaki brand also has one of the stronger domestic service networks, which
        matters for long-term warranty support.
      </p>

      <h2 className="text-2xl font-serif mb-3">Who should buy which</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Yugana M780 if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>The chair must fit within 3 inches of a wall</li>
            <li>You are shorter than 5&apos;0&quot;</li>
            <li>You weigh over 260 lbs</li>
            <li>Your pain is primarily lower back and glutes rather than upper back</li>
            <li>The $1,000 savings matters to your budget</li>
          </ul>
        </div>
        <div className="bg-sand rounded-xl p-5">
          <p className="font-semibold text-navy mb-2">Choose the Maestro LE 2.0 if:</p>
          <ul className="text-sm text-charcoal space-y-1.5">
            <li>You have both upper and lower back pain and need full SL-track coverage</li>
            <li>Shoulder and upper arm airbag compression is a priority</li>
            <li>You weigh under 260 lbs</li>
            <li>Strong domestic service support is important for your purchase decision</li>
          </ul>
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
