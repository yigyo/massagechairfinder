import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compare Massage Chairs Side by Side | MassageChairFinder',
  description: 'Head-to-head comparisons of the most cross-shopped massage chairs. Same price tier, same use case -- find out which one is right for you.',
}

const COMPARISONS = [
  {
    slug: 'osaki-os-pro-maestro-le-vs-ogawa-og8901',
    chairA: 'Osaki OS-Pro Maestro LE 2.0',
    chairB: 'Ogawa Master Drive DUO LE (OG-8901)',
    tier: '$8,000-$11,999',
    summary: 'Two premium SL-track 4D chairs around $9,000. The Maestro LE adds AI body scanning; the OG-8901 adds a 320 lb rating, a dual roller system, and near-zero wall clearance.',
  },
  {
    slug: 'titan-3d-prestige-vs-ogawa-og6400',
    chairA: 'Titan 3D Prestige',
    chairB: 'Ogawa Active XL Duo (OG-6400)',
    tier: '$3,000-$4,999',
    summary: 'Two mid-tier SL-track 3D chairs priced within $200. The Titan reclines within an inch of the wall; the OG-6400 carries a 320 lb rating and a dual roller system.',
  },
  {
    slug: 'infinity-dynasty-4d-vs-infinity-genesis-max-4d',
    chairA: 'Infinity Dynasty 4D',
    chairB: 'Infinity Genesis Max 4D',
    tier: 'Upper-mid to premium tier',
    summary: 'Same brand, same L-track 4D specs, now a tier apart. The Dynasty is the lower-priced pick with confirmed petite and plus-size fit. The Genesis Max costs more but adds confirmed stretch programs.',
  },
  {
    slug: 'luraco-i9-max-plus-vs-panasonic-mak1',
    chairA: 'Luraco i9 Max Plus',
    chairB: 'Panasonic MAK1',
    tier: '$12,000 and up',
    summary: 'The i9 Max Plus is Made in USA, has L-track and zero gravity, and is the lower-priced of the two. The MAK1 has no zero gravity and an S-track. A clear case for most buyers.',
  },
  {
    slug: 'amamedics-hilux-4d-vs-titan-pro-vigor-4d',
    chairA: 'AmaMedics Hilux 4D',
    chairB: 'Titan Pro-Vigor 4D',
    tier: 'Mid to upper-mid tier',
    summary: 'Both SL-track 4D with heated rollers. The Hilux is a tier lower in price and fits buyers from 4\'11". The Vigor has a 3.9-inch wall clearance for tight rooms.',
  },
  {
    slug: 'kyota-yugana-m780-vs-osaki-os-pro-maestro-le',
    chairA: 'Kyota Yugana M780 4D',
    chairB: 'Osaki OS-Pro Maestro LE 2.0',
    tier: 'Upper-mid to premium tier',
    summary: 'An upper-mid-tier L-track vs a premium-tier SL-track. The Yugana fits petite buyers to 4\'8" and needs 2 inches of wall clearance. The Maestro adds full SL coverage.',
  },
  {
    slug: 'relaxonchair-yukon-4d-vs-rockertech-sensation-4d',
    chairA: 'Relax On Chair YUKON-4D',
    chairB: 'RockerTech Sensation 4D',
    tier: '$5,000-$7,999',
    summary: 'Both SL-track 4D, closely priced. The Sensation adds TrueFit body scanning and dual reflexology foot rollers. The YUKON prioritizes precision pressure control.',
  },
  {
    slug: 'medical-breakthrough-6-vs-kahuna-hm-078',
    chairA: 'Medical Breakthrough 6',
    chairB: 'Kahuna HM-078 Hubot 4D',
    tier: '$3,000-$4,999',
    summary: 'An L-track 4D vs an SL-track 4D, closely priced in the $3,000-$4,999 band. The MB6 covers glutes and hips. The HM-078 adds space-saving recline, foot rollers, and a 350 lb weight capacity.',
  },
  {
    slug: 'rockertech-bliss-vs-medical-breakthrough-6-plus',
    chairA: 'RockerTech Bliss',
    chairB: 'Medical Breakthrough 6 Plus',
    tier: '$5,000-$7,999',
    summary: 'Same price, same L-track 4D. The Bliss adds Zero Wall Fit space-saving and reflexology foot rollers. The MB6 Plus adds stretch programs and a confirmed 300 lb capacity.',
  },
  {
    slug: 'ogawa-og6400-vs-titan-pro-vigor-4d',
    chairA: 'Ogawa Active XL Duo 3D',
    chairB: 'Titan Pro-Vigor 4D',
    tier: 'Mid to upper-mid tier',
    summary: 'The Ogawa is a tier lower in price, with 320 lb plus-size fit and 11-inch wall clearance. The Pro-Vigor 4D adds heated rollers and 4D precision for buyers under 260 lbs.',
  },
  {
    slug: 'kahuna-sm-7300s-vs-relaxonchair-yukon-4d',
    chairA: 'Kahuna SM-7300S',
    chairB: 'Relax On Chair YUKON-4D',
    tier: '$5,000-$7,999',
    summary: 'Closely priced. The SM-7300S adds 3-stage zero gravity and heat to lumbar, calves, and feet. The YUKON-4D delivers 4D roller precision at the lower price.',
  },
  {
    slug: 'daiwa-relax-2-zero-3d-vs-synca-jp3000',
    chairA: 'Daiwa Relax 2 Zero 3D',
    chairB: 'Synca JP-3000',
    tier: '$8,000-$11,999',
    summary: 'Both S-track for upper and mid-back. The Daiwa is the lower-priced of the two, with confirmed 4\'8" to 6\'6" fit. The JP-3000 has a 5D roller and Japanese manufacturing.',
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
          <Link href="/finder" className="text-bronze hover:text-gold">chair finder</Link> to
          narrow your options by pain profile, budget, and body fit first.
        </p>
      </div>
    </div>
  )
}
