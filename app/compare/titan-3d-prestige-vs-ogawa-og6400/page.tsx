import type { Metadata } from 'next'
import { affiliateUrlById } from '@/lib/chairs'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Titan 3D Prestige vs Ogawa Active XL Duo (OG-6400): The Mid-Tier SL-Track 3D Decision',
  description: 'Two mid-tier SL-track 3D chairs priced within $200 of each other. The Titan reclines within an inch of the wall; the OG-6400 carries a 320 lb rating and a dual roller system. Here is the full comparison.',
}

export default function Titan3dPrestigeVsOg6400Page() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <nav className="text-sm text-warm-gray mb-6">
        <Link href="/compare" className="hover:text-gold">Compare</Link>
        <span className="mx-2">/</span>
        <span>Titan 3D Prestige vs Ogawa Active XL Duo (OG-6400)</span>
      </nav>

      <h1 className="text-4xl font-serif mb-4">
        Titan 3D Prestige vs Ogawa Active XL Duo (OG-6400): The Mid-Tier SL-Track 3D Decision
      </h1>

      <p className="text-warm-gray text-lg mb-8">
        These two land within about two hundred dollars of each other in the same mid tier, and both are SL-track 3D chairs with zero gravity and heat. The real split is physical: the Titan is one of the tightest space-savers in its class, while the OG-6400 trades wall clearance for a higher weight rating and a dual roller system. Here is what separates them.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/chairs/titan-3d-prestige.webp" alt="Titan 3D Prestige massage chair" width={400} height={300} className="w-full h-full object-contain p-4" />
          </div>
          <p className="text-sm font-semibold text-navy">Titan 3D Prestige</p>
          <p className="text-sm text-charcoal">$3,000-$4,999</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg overflow-hidden bg-white border border-sand mb-3" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/chairs/ogawa-active-xl-duo-3d-2d-og-6400.jpg" alt="Ogawa Active XL Duo OG-6400 massage chair" width={400} height={300} className="w-full h-full object-contain p-4" />
          </div>
          <p className="text-sm font-semibold text-navy">Ogawa Active XL Duo (OG-6400)</p>
          <p className="text-sm text-charcoal">$3,000-$4,999</p>
        </div>
      </div>

      <div className="mb-10 rounded-lg p-5" style={{ background: 'rgba(209,128,62,0.06)', border: '1px solid rgba(209,128,62,0.25)' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#D1803E' }}>Quick verdict</p>
        <p className="text-charcoal">
          Choose the <strong>Titan 3D Prestige</strong> if room placement is tight: it reclines within an inch of the wall and confirms fit up to about six feet three. Choose the <strong>OG-6400</strong> if a larger frame is using the chair: it carries a 320 lb rating and runs a dual roller system, at the cost of needing about eleven inches behind it. The price is close enough that fit and placement, not cost, should decide this one.
        </p>
      </div>

      <h2 className="text-2xl font-serif mb-4">Specs Compared</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-medium">Spec</th>
              <th className="text-left p-3 font-medium">Titan 3D Prestige</th>
              <th className="text-left p-3 font-medium">OG-6400</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Price band', '$3,000-$4,999', '$3,000-$4,999'],
              ['Track', 'SL-track', 'SL-track'],
              ['Roller', '3D', 'Dual 3D and 2D'],
              ['Heat', 'Yes', 'Yes'],
              ['Zero gravity', 'Yes', 'Yes'],
              ['Wall clearance', '1 inch', '11 inches'],
              ['Weight capacity', '260 lbs', '320 lbs'],
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

      <h2 className="text-2xl font-serif mb-3">Wall clearance: 1 inch vs 11 inches</h2>
      <p className="text-charcoal mb-6">
        This is the widest gap on the sheet and the clearest reason to pick one over the other. The Titan reclines within an inch of the wall; the OG-6400 needs about eleven. That is close to a foot of floor space, which decides whether the chair fits along a bedroom wall or has to sit out in the room. If placement is tight, the Titan wins outright. If you have an open corner or a dedicated room, the clearance stops mattering. Measure first, using the method in our <Link href="/learn/room-fit" className="text-bronze hover:text-gold">room fit guide</Link>.
      </p>

      <h2 className="text-2xl font-serif mb-3">Weight capacity: 260 vs 320 lbs</h2>
      <p className="text-charcoal mb-6">
        The OG-6400 is rated to 320 lbs against the Titan 260. For a larger-framed user that headroom matters, both for durability and for how well the rollers track the spine. The Titan confirms fit up to about six feet three, so height is covered on its side; the deciding factor is weight. If anyone using the chair is near 260 lbs, the OG-6400 is the more comfortable long-term fit. Our <Link href="/learn/body-fit" className="text-bronze hover:text-gold">body fit guide</Link> explains why capacity headroom is worth prioritizing.
      </p>

      <h2 className="text-2xl font-serif mb-3">Roller systems: 3D vs dual 3D and 2D</h2>
      <p className="text-charcoal mb-6">
        Both use 3D rollers, which extend toward the body to vary pressure depth. The OG-6400 pairs its 3D primary with a second 2D set, a dual arrangement built for broader coverage across the back. In practice both deliver the adjustable-depth massage that defines the 3D class; the OG-6400 simply has more roller hardware behind it. If you want to understand what the 3D label does and does not buy you at this tier, our <Link href="/learn/track-types" className="text-bronze hover:text-gold">track type guide</Link> and the price-tier breakdown cover it.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card" style={{ borderTop: '3px solid #1C2331' }}>
          <h2 className="text-xl font-serif font-semibold text-navy mb-3">Choose the Titan 3D Prestige if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-navy">&#8250;</span><span>The chair has to recline within an inch of the wall</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">&#8250;</span><span>You are placing it in a bedroom or a tight space</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">&#8250;</span><span>You are up to about six feet three and under 260 lbs</span></li>
            <li className="flex items-baseline gap-2"><span className="text-navy">&#8250;</span><span>Space-saving placement matters more than roller count</span></li>
          </ul>
          <div className="mt-4">
            <a href={affiliateUrlById('titan-3d-prestige')} className="inline-block bg-navy text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the Titan 3D Prestige</a>
          </div>
        </div>
        <div className="card" style={{ borderTop: '3px solid #2E7D6F' }}>
          <h2 className="text-xl font-serif font-semibold text-teal mb-3">Choose the OG-6400 if:</h2>
          <ul className="text-charcoal space-y-2 text-sm list-none p-0">
            <li className="flex items-baseline gap-2"><span className="text-teal">&#8250;</span><span>You need a 320 lb weight rating</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">&#8250;</span><span>You have about a foot of clearance behind the chair</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">&#8250;</span><span>You want the dual roller system for broader coverage</span></li>
            <li className="flex items-baseline gap-2"><span className="text-teal">&#8250;</span><span>Larger-frame fit matters more than tight placement</span></li>
          </ul>
          <div className="mt-4">
            <a href={affiliateUrlById('ogawa-og6400')} className="inline-block bg-teal text-white text-sm font-medium px-4 py-2 rounded transition-colors hover:opacity-90">Shop the OG-6400</a>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6 mb-10" style={{ background: '#F5F1EB', border: '1px solid #E8DFD3' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#2E7D6F' }}>Chair Finder</p>
        <h2 className="text-xl font-serif text-navy mb-2">Not sure which is right for you?</h2>
        <p className="text-charcoal text-sm mb-4">
          Answer a few questions about your body, pain profile, and budget. The <Link href="/finder" className="text-bronze hover:text-gold">Chair Finder</Link> surfaces the chairs most likely to work for your situation, or work through the free <Link href="/buyers-guide" className="text-bronze hover:text-gold">Buyer&apos;s Guide</Link> at your own pace.
        </p>
        <Link href="/finder" className="inline-block text-white text-sm font-medium px-5 py-2.5 rounded transition-colors" style={{ background: '#D1803E' }}>
          Open the Chair Finder
        </Link>
      </div>

    </div>
  )
}
