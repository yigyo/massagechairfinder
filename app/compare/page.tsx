import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compare Massage Chairs Side by Side | MassageChairFinder',
  description: 'Head-to-head comparisons of the most cross-shopped massage chairs. Same price tier, same use case -- find out which one is right for you.',
}

const COMPARISONS = [
  {
    slug: 'osaki-os-pro-admiral-ii-vs-kahuna-lm-6800s',
    chairA: 'Osaki OS-Pro Admiral II',
    chairB: 'Kahuna LM-6800S',
    tier: 'Under $3,000',
    summary: 'Both SL-track entry chairs. The Admiral II has a 3D roller and higher weight capacity. The LM-6800S costs $500 less and adds stretch programs.',
  },
]

const COMING_SOON = [
  { chairA: 'Synca JP970', chairB: 'Kahuna LM-6800', tier: '$3,000 to $4,000' },
  { chairA: 'Infinity Dynasty 4D', chairB: 'Infinity Genesis Max 4D', tier: '$10,000 and above' },
  { chairA: 'Inada DreamWave', chairB: 'JPMedics Kumo 4D', tier: '$8,000 to $12,000' },
  { chairA: 'Luraco i9 Max Plus', chairB: 'Panasonic MAK1', tier: '$8,000 and above' },
]

export default function ComparePage() {
  return (
    <div className="section" style={{ maxWidth: '860px' }}>
      <h1 className="text-4xl font-serif mb-3">Compare Massage Chairs</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        Buyers in the same price tier often narrow down to two or three chairs and get stuck.
        These comparisons are built for that moment. Each one covers the specs that actually
        matter for the decision, who each chair fits, and a direct recommendation.
      </p>

      <h2 className="text-xl font-serif font-semibold text-navy mb-4">Available comparisons</h2>
      <div className="grid grid-cols-1 gap-4 mb-12">
        {COMPARISONS.map(c => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="card hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors">
                {c.chairA} <span className="text-gold">vs</span> {c.chairB}
              </h3>
              <span className="shrink-0 bg-navy text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                {c.tier}
              </span>
            </div>
            <p className="text-warm-gray text-sm">{c.summary}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-serif font-semibold text-navy mb-4">Coming soon</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {COMING_SOON.map(c => (
          <div key={c.chairA} className="card opacity-60">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-base font-serif font-semibold text-navy">
                {c.chairA} <span className="text-gold">vs</span> {c.chairB}
              </span>
              <span className="shrink-0 bg-navy text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                {c.tier}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-sand text-sm text-warm-gray">
        <p>
          Not sure which chair tier to be comparing? Use the{" "}
          <Link href="/finder" className="text-bronze hover:text-gold">chair finder quiz</Link> to
          narrow your options by pain profile, budget, and body fit first.
        </p>
      </div>
    </div>
  )
}
