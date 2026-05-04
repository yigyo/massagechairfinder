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
  {
    slug: 'infinity-dynasty-4d-vs-infinity-genesis-max-4d',
    chairA: 'Infinity Dynasty 4D',
    chairB: 'Infinity Genesis Max 4D',
    tier: '$9,000 to $12,000',
    summary: 'Same brand, same L-track 4D specs, $2,700 apart. The Dynasty confirms petite and plus-size fit. The Genesis Max is the stronger value for typical buyers.',
  },
  {
    slug: 'luraco-i9-max-plus-vs-panasonic-mak1',
    chairA: 'Luraco i9 Max Plus',
    chairB: 'Panasonic MAK1',
    tier: '$13,000 and above',
    summary: 'The i9 Max Plus is Made in USA, has L-track and zero gravity, and costs $1,000 less. The MAK1 has no zero gravity and an S-track. A clear case for most buyers.',
  },
  {
    slug: 'inada-dreamwave-vs-jpmedics-kumo-4d',
    chairA: 'Inada DreamWave',
    chairB: 'JPMedics Kumo 4D',
    tier: '$7,000 to $11,000',
    summary: 'Japanese S-track therapeutic precision vs L-track 4D full-body coverage. Different philosophies for different pain locations.',
  },
  {
    slug: 'amamedics-hilux-4d-vs-titan-pro-vigor-4d',
    chairA: 'AmaMedics Hilux 4D',
    chairB: 'Titan Pro-Vigor 4D',
    tier: '$5,000 to $6,000',
    summary: 'Both SL-track 4D with heated rollers. The Hilux costs $1,000 less and fits buyers from 4'11". The Vigor has a 3.9-inch wall clearance for tight rooms.',
  },
  {
    slug: 'kyota-yugana-m780-vs-osaki-os-pro-maestro-le',
    chairA: 'Kyota Yugana M780 4D',
    chairB: 'Osaki OS-Pro Maestro LE 2.0',
    tier: '$8,000 to $9,000',
    summary: 'L-track at $7,999 vs SL-track at $8,999. The Yugana fits petite buyers to 4'8" and needs 2 inches of wall clearance. The Maestro adds full SL coverage.',
  },
  {
    slug: 'relaxonchair-yukon-4d-vs-rockertech-sensation-4d',
    chairA: 'Relax On Chair YUKON-4D',
    chairB: 'RockerTech Sensation 4D',
    tier: '$6,500 to $7,000',
    summary: 'Both SL-track 4D, $500 apart. The Sensation adds TrueFit body scanning and dual reflexology foot rollers. The YUKON prioritizes precision pressure control.',
  },
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

      <div className="grid grid-cols-1 gap-4">
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
