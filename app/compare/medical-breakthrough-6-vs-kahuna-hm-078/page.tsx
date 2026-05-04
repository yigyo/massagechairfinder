import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Medical Breakthrough 6 vs Kahuna HM-078 | MassageChairFinder',
  description: 'Both are 4D chairs under $4,500. The Medical Breakthrough 6 is L-track for glute and hip coverage. The Kahuna HM-078 is SL-track with space-saving design and 350 lb capacity.',
}

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>MB6 vs HM-078</span>
      </nav>

      <h1 className="text-4xl font-serif mb-3">Medical Breakthrough 6 vs Kahuna HM-078</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        Both are 4D chairs priced within $150 of each other. The real difference is track type: the MB6 is L-track for buyers with lower back pain that extends into the hips, and the HM-078 is SL-track with space-saving design and a 350 lb weight capacity. The decision comes down to which pain profile and room constraint matter more.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0737/9625/6030/products/Med_Break_6_6.jpg"
            alt="Medical Breakthrough 6"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Medical Breakthrough 6</h2>
          <p className="text-2xl font-bold text-gold mt-1">$4,249</p>
          <p className="text-sm text-warm-gray mt-1">L-track | 4D | 300 lbs</p>
        </div>
        <div className="card text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/1509/5162/files/1_abc8530f-f118-4faa-9e79-60ef80fbab95.jpg?v=1728486141"
            alt="Kahuna HM-078 Hubot 4D"
            width={300} height={300}
            className="mx-auto mb-3 object-contain"
          />
          <h2 className="text-xl font-serif font-semibold text-navy">Kahuna HM-078 Hubot 4D</h2>
          <p className="text-2xl font-bold text-gold mt-1">$4,399</p>
          <p className="text-sm text-warm-gray mt-1">SL-track | 4D | 350 lbs | Space-saving</p>
        </div>
      </div>

      <div className="card bg-navy text-white mb-10">
        <h2 className="text-xl font-serif font-semibold mb-3">Quick Verdict</h2>
        <p className="mb-3">
          For lower back pain that extends into the glutes and hips, the Medical Breakthrough 6 is the right call. L-track coverage reaches further down the spine and under the seat than the HM-078's SL-track.
        </p>
        <p>
          For buyers who need space-saving recline, weigh more than 265 lbs, or want full SL coverage from neck to glutes with voice control, the Kahuna HM-078 is the stronger fit. Its 350 lb capacity and space-saving design also make it the better choice for tighter rooms and heavier buyers.
        </p>
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3">Specification</th>
              <th className="text-left p-3">Medical Breakthrough 6</th>
              <th className="text-left p-3">Kahuna HM-078</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', '$4,249', '$4,399'],
              ['Track', 'L-track', 'SL-track'],
              ['Roller', '4D', '4D'],
              ['Weight Capacity', '300 lbs', '350 lbs'],
              ['Max User Height', 'Not specified', '6'2" (74 in)'],
              ['Zero Gravity', 'Yes', 'Yes'],
              ['Heat', 'Yes', 'Yes'],
              ['Stretch Programs', 'Yes', 'Not specified'],
              ['Foot Rollers', 'Not specified', 'Yes'],
              ['Body Scanning', 'Yes', 'Yes'],
              ['Space-Saving', 'No', 'Yes'],
              ['Voice Control', 'No', 'Yes'],
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

      <h2 className="text-2xl font-serif font-semibold mb-4">Track Type: The Core Decision</h2>
      <p className="mb-4">
        L-track rollers follow the spine from the neck, through the lumbar, and continue under the seat into the glutes and upper thighs. SL-track rollers follow a similar path but the extension under the seat is typically shorter than a pure L-track. For buyers whose primary complaint is lower back pain that radiates into the hips, sciatic nerve discomfort, or tight glutes, L-track coverage is more relevant.
      </p>
      <p className="mb-8">
        SL-track provides full spinal coverage from the cervical region through the lumbar, which is often better for buyers with both upper and lower back tension. If your pain is primarily mid-back and neck rather than glute and hip, the HM-078's SL-track is a better match.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Weight Capacity and Body Fit</h2>
      <p className="mb-4">
        The Kahuna HM-078 carries a 350 lb weight capacity, which is meaningfully higher than the Medical Breakthrough 6's 300 lbs. For buyers at or above 265 lbs, the HM-078 is the safer choice. Its confirmed maximum height of 6'2" also makes it a good fit for taller buyers in this price tier.
      </p>
      <p className="mb-8">
        The Medical Breakthrough 6 does not publish a confirmed height range. If you are above 6'0" or below 5'2", confirm fit with the retailer before purchasing.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Space-Saving Design</h2>
      <p className="mb-8">
        The Kahuna HM-078 uses a space-saving recline mechanism that allows it to operate with minimal clearance behind the chair. If your room does not have 18-24 inches of rear clearance for a standard recline, the HM-078 is the practical choice. The Medical Breakthrough 6 uses a standard recline mechanism and requires more space.
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-4">Who Should Buy Each Chair</h2>
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="card border-l-4 border-gold">
          <h3 className="font-semibold text-navy mb-3">Buy the Medical Breakthrough 6 if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>Your pain is primarily lower back radiating into the hips or glutes</li>
            <li>You have sciatica or sacral discomfort</li>
            <li>You want stretch programs confirmed</li>
            <li>You weigh under 265 lbs and room space is not a constraint</li>
          </ul>
        </div>
        <div className="card border-l-4 border-teal">
          <h3 className="font-semibold text-navy mb-3">Buy the Kahuna HM-078 if:</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>You want full SL coverage from neck to glutes</li>
            <li>You weigh over 265 lbs or want more capacity headroom</li>
            <li>Your room has limited space behind the chair</li>
            <li>You want foot reflexology rollers included</li>
          </ul>
        </div>
      </div>

      <div className="card bg-navy text-white text-center mt-8">
        <p className="text-lg font-serif mb-2">Not sure which track type matches your pain profile?</p>
        <p className="text-sm text-sand mb-4">The chair finder quiz asks about your specific pain location and gives a direct recommendation.</p>
        <Link href="/finder" className="inline-block bg-gold text-white font-semibold px-8 py-3 rounded hover:bg-amber-600 transition-colors">
          Take the Chair Finder Quiz
        </Link>
      </div>
    </div>
  )
}
