import type { Metadata } from 'next'
import Link from 'next/link'
import { CHAIRS } from '@/lib/chairs'
import ChairCard from '@/components/ChairCard'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com" },
  openGraph: {
    ...pageOpenGraph('https://www.massagechairfinder.com'),
    title: 'Massage Chair Finder',
    description:
      'Find the massage chair that fits your body, your space, and your budget.',
  },
}

export default function HomePage() {
  // Top-rated mcfActive chairs for the featured section
  const featuredChairs = CHAIRS
    .filter(c => c.mcfActive && c.active && c.reviewRating)
    .sort((a, b) => (b.reviewRating ?? 0) - (a.reviewRating ?? 0))
    .slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '680px' }}>
        <img
          src="/hero.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%]"
        />
        <div className="absolute inset-0 hidden md:block" style={{
          background: 'linear-gradient(to left, rgba(28,35,49,0.88) 28%, rgba(28,35,49,0.75) 44%, rgba(28,35,49,0.08) 68%, transparent 84%)'
        }} />
        <div className="absolute inset-0 md:hidden" style={{
          background: 'linear-gradient(to top, rgba(28,35,49,0.93) 0%, rgba(28,35,49,0.80) 38%, rgba(28,35,49,0.45) 62%, rgba(28,35,49,0.15) 100%)'
        }} />
        <div className="relative z-10 flex items-center justify-end min-h-[680px] px-6 md:px-16">
          <div className="w-full max-w-md text-left text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}>
              Find the massage chair that fits your body, your space, and your budget.
            </h1>
            <p className="text-lg mb-8" style={{ color: '#E8DFD3', textShadow: '0 1px 4px rgba(0,0,0,0.80)' }}>
              Clear comparisons and expert guidance. No showrooms, no pressure, no guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/finder" className="btn-primary text-center whitespace-nowrap">
                Find My Chair
              </Link>
              <Link
                href="/learn"
                className="border border-sand text-sand px-6 py-3 rounded font-semibold hover:bg-white hover:text-navy transition-colors text-center"
              >
                Explore the Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by need */}
      <section className="section">
        <h2 className="text-3xl font-serif mb-2">What brings you here?</h2>
        <p className="text-warm-gray mb-8">
          Most people come to us with a specific problem. Start where it makes sense for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Lower back pain', href: '/best/lower-back-pain', desc: 'SL-track chairs that reach the lumbar and hips' },
            { label: 'Under $3,000', href: '/best/under-3000', desc: 'Strong performers without the flagship price tag' },
            { label: 'Neck and shoulders', href: '/best/neck-shoulders', desc: 'Chairs with serious upper-body coverage' },
            { label: 'Small spaces', href: '/best/small-spaces', desc: 'Space-saving models that fit tighter rooms' },
            { label: 'Sciatica relief', href: '/best/sciatica', desc: 'L-track and SL-track chairs for hip and glute tension' },
            { label: 'Premium ($5,000+)', href: '/best/premium', desc: 'Full-featured flagship chairs worth the investment' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="card hover:shadow-md transition-shadow group">
              <h3 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-1">
                {item.label}
              </h3>
              <p className="text-warm-gray text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured chairs */}
      {featuredChairs.length > 0 && (
        <section className="bg-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif mb-2">Editor picks</h2>
            <p className="text-warm-gray mb-8">
              Chairs we recommend most often, across different budgets and use cases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredChairs.map((chair) => (
                <ChairCard key={chair.id} chair={chair} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/chairs" className="btn-secondary">
                Browse all chairs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Chair Finder CTA */}
      <section className="bg-teal text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4 text-white">Not sure where to start?</h2>
          <p className="text-lg mb-8 opacity-90">
            Answer 10 quick questions about your body, space, and budget. We will narrow it down to
            the chairs most likely to work for you.
          </p>
          <Link href="/finder" className="bg-white text-teal px-8 py-4 rounded font-semibold hover:bg-sand transition-colors inline-block">
            Find My Chair (free, takes 3 minutes)
          </Link>
        </div>
      </section>

      {/* Buying guide preview */}
      <section className="section">
        <h2 className="text-3xl font-serif mb-2">Learn</h2>
        <p className="text-warm-gray mb-8">
          Guides, explainers, and researched answers across 46 articles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'S-Track vs L-Track vs SL-Track', href: '/learn/track-types', desc: 'The single most important decision in buying a massage chair.' },
            { title: 'How to choose roller dimensions', href: '/learn/roller-dimensions', desc: 'Width, stroke length, and why they matter for back pain.' },
            { title: 'Zero gravity explained', href: '/learn/zero-gravity', desc: 'What it actually does and when it matters.' },
            { title: 'How to size a chair for your body', href: '/learn/body-fit', desc: 'Height, weight, and shoulder width considerations.' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="card hover:shadow-md transition-shadow group">
              <h3 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-warm-gray text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/learn" className="text-bronze font-semibold hover:text-gold">
            Browse all articles &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
