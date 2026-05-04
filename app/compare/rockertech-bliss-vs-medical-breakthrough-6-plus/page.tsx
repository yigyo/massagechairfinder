import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'RockerTech Bliss vs Medical Breakthrough 6 Plus | MassageChairFinder',
  description: 'Same price, same L-track 4D category at $5,499. The Bliss adds space-saving recline and reflexology foot rollers. The MB6 Plus includes stretch programs and a 300 lb confirmed capacity.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Bliss vs MB6 Plus</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">RockerTech Bliss vs Medical Breakthrough 6 Plus</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        Both chairs are priced at exactly $5,499, both use an L-track 4D roller, and both include heat, zero gravity, and body scanning. The Bliss is the choice for buyers with space constraints and who want reflexology foot rollers. The Medical Breakthrough 6 Plus is the choice for buyers who prioritize stretch programs and a confirmed 300 lb weight capacity.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0111/0251/9396/products/rockertechmassage-chairsrockertech-bliss-massage-chairbrownmassage-chair-heaven-479159.webp?v=1701056370"
            alt="RockerTech Bliss"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">RockerTech Bliss</h2>
          <p className="text-2xl font-bold text-gold mt-1">$5,499</p>
          <p className="text-sm text-warm-gray mt-1">L-track | 4D | Space-saving | 3-yr warranty</p>
        </div>
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough6Plus_1.jpg"
            alt="Medical Breakthrough 6 Plus"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Medical Breakthrough 6 Plus</h2>
          <p className="text-2xl font-bold text-gold mt-1">$5,499</p>
          <p className="text-sm text-warm-gray mt-1">L-track | 4D | 300 lbs | Stretch programs</p>
        </div>
      </div>

      <div className="card bg-navy text-white mb-10">
        <h2 className="text-xl font-serif font-semibold mb-3">Quick Verdict</h2>
        <p className="mb-3">
          If your room is tight or you want reflexology foot rollers, the RockerTech Bliss is the stronger choice. Its Zero Wall Fit space-saving design requires minimal rear clearance, and the foot rollers add therapeutic value for buyers with plantar fasciitis or circulation concerns.
        </p>
        <p>
          If stretch programs are a priority for spinal decompression or athletic recovery, the Medical Breakthrough 6 Plus has a confirmed stretch feature and a published 300 lb weight capacity. For buyers who weigh more than 265 lbs, it is also the safer choice.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">RockerTech Bliss</th>
              <th className="text-left p-3">Medical Breakthrough 6 Plus</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$5,499', '$5,499'],
              ['Track', 'L-track', 'L-track'],
              ['Roller', '4D', '4D'],
              ['Zero Gravity', '2-level', 'Yes'],
              ['Heat', 'Lumbar', 'Lumbar'],
              ['Foot Rollers', 'Yes (reflexology)', 'Not specified'],
              ['Body Scanning', 'TrueFit', 'Yes'],
              ['Stretch Programs', 'Not specified', 'Yes'],
              ['Space-Saving', 'Yes (Zero Wall Fit)', 'No'],
              ['Weight Capacity', 'Not published', '300 lbs'],
              ['Warranty', '3 years', 'Not specified'],
            ].map(([spec, a, b]) => (
              <tr key={spec} className="border-b border-sand">
                <td className="p-3 font-medium">{spec}</td>
                <td className="p-3">{a}</td>
                <td className="p-3">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Space-Saving Design</h2>
      <p className="mb-4">
        The RockerTech Bliss uses Zero Wall Fit technology, which allows the chair to recline fully while moving forward rather than backward. This means it can operate with very little clearance behind it -- a few inches rather than the 18-24 inches a standard recline mechanism requires.
      </p>
      <p className="mb-8">
        The Medical Breakthrough 6 Plus uses a standard recline mechanism. If your room does not have rear clearance, the Bliss is the practical answer. If space is not an issue, the mechanism type is irrelevant to the massage quality.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Foot Rollers</h2>
      <p className="mb-8">
        The RockerTech Bliss includes reflexology foot rollers in the footrest. Foot rollers press along the plantar fascia and the reflex points on the sole of the foot. For buyers with plantar fasciitis, foot fatigue from standing jobs, or poor leg circulation, this is a meaningful addition. The Medical Breakthrough 6 Plus does not include confirmed foot rollers.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Stretch Programs</h2>
      <p className="mb-8">
        The Medical Breakthrough 6 Plus includes stretch programs that extend and decompress the spine by varying the chair angle and footrest position while the rollers work down the back. Stretch programs are particularly useful for buyers with tight hip flexors, spinal compression from desk work, or athletic recovery needs. The Bliss does not confirm stretch programs in its published specs.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Who Should Buy Each Chair</h2>
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card border-l-4 border-gold">
          <h3 className="font-semibold text-navy mb-3">Buy the RockerTech Bliss if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>Your room has limited rear clearance</li>
            <li>You want reflexology foot rollers for plantar fasciitis or circulation</li>
            <li>A 3-year warranty is important to you</li>
            <li>You weigh under 265 lbs and stretch programs are not a priority</li>
          </ul>
        </div>
        <div className="card border-l-4 border-teal">
          <h3 className="font-semibold text-navy mb-3">Buy the MB6 Plus if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>Stretch programs are a priority for your recovery or spinal health</li>
            <li>You weigh over 265 lbs and want a confirmed 300 lb capacity</li>
            <li>Room space behind the chair is not a constraint</li>
            <li>You are comparing against other Medical Breakthrough models</li>
          </ul>
        </div>
      </div>

      <div className="card bg-navy text-white text-center mt-8">
        <p className="text-lg font-serif mb-2">Not sure which features matter for your pain?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz matches you to chairs based on your pain profile, body type, and room constraints.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
