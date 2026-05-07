import Link from 'next/link'
import { getFeaturedChairs } from '@/lib/strapi'
import ChairCard from '@/components/ChairCard'

export default async function HomePage() {
  let featuredChairs = []
  try {
    const res = await getFeaturedChairs()
    featuredChairs = res.data || []
  } catch {
    // Strapi not connected yet -- show static shell
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 md:px-16 py-20 md:py-28"
        style={{ background: '#0B1829' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.03) 40px,rgba(255,255,255,0.03) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.03) 40px,rgba(255,255,255,0.03) 41px)'
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div
            className="inline-block text-xs font-medium uppercase tracking-widest mb-6 px-3 py-1.5 rounded"
            style={{ background: 'rgba(14,165,233,0.15)', color: '#0EA5E9', border: '1px solid rgba(14,165,233,0.3)' }}
          >
            Independent Research
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-white mb-5 max-w-2xl">
            Find the chair that actually fits your back.
          </h1>
          <p className="text-lg mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            50+ chairs researched across track type, roller geometry, and pressure range.
            No brand deals. Just the right answer for your body.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/finder"
              className="text-center text-sm font-medium text-white px-7 py-3 rounded-md transition-colors"
              style={{ background: '#0369A1' }}
            >
              Open Chair Finder
            </Link>
            <Link
              href="/learn"
              className="text-center text-sm font-medium px-7 py-3 rounded-md transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'transparent' }}
            >
              Read the Buying Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by need */}
      <section className="section">
        <div className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#0EA5E9' }}>
          Browse by situation
        </div>
        <h2 className="text-2xl font-serif mb-2" style={{ color: '#0B1829' }}>What brings you here?</h2>
        <p className="text-muted mb-8 text-sm">
          Most people come to us with a specific problem. Start where it makes sense for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Lower back pain', href: '/best/lower-back-pain', desc: 'SL-track chairs that reach the lumbar and hips' },
            { label: 'Under $3,000', href: '/best/under-3000', desc: 'Strong performers without the flagship price tag' },
            { label: 'Neck and shoulders', href: '/best/neck-shoulders', desc: 'Chairs with serious upper-body coverage' },
            { label: 'Small spaces', href: '/best/small-spaces', desc: 'Space-saving models that fit tighter rooms' },
            { label: 'Sciatica relief', href: '/best/sciatica', desc: 'L-track and SL-track chairs for hip and glute tension' },
            { label: 'Premium ($5,000+)', href: '/best/premium', desc: 'Full-featured flagship chairs worth the investment' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block bg-white rounded-lg p-5 transition-shadow hover:shadow-sm group"
              style={{ border: '1px solid #D4DDE9' }}
            >
              <h3 className="text-base font-serif font-semibold mb-1 transition-colors group-hover:text-accent-interactive" style={{ color: '#0B1829' }}>
                {item.label}
              </h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured chairs */}
      {featuredChairs.length > 0 && (
        <section className="py-16 px-4" style={{ background: '#F2F6FB' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#0EA5E9' }}>
              Staff picks
            </div>
            <h2 className="text-2xl font-serif mb-2" style={{ color: '#0B1829' }}>Best chairs for 2025</h2>
            <p className="text-muted text-sm mb-8">
              Chairs we recommend most often, across different budgets and use cases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredChairs.map((chair: any) => (
                <ChairCard key={chair.id} chair={chair} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/chairs"
                className="text-sm font-medium text-white px-6 py-3 rounded-md transition-colors inline-block"
                style={{ background: '#0B1829' }}
              >
                Browse all chairs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Chair Finder CTA */}
      <section className="py-16 px-4" style={{ background: '#0B1829' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#0EA5E9' }}>
            Chair Finder
          </div>
          <h2 className="text-2xl font-serif font-bold mb-4 text-white">Not sure where to start?</h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Answer 10 questions about your body, space, and budget. We narrow it down to
            the chairs most likely to work for your specific situation.
          </p>
          <Link
            href="/finder"
            className="text-sm font-medium px-8 py-3.5 rounded-md transition-colors inline-block"
            style={{ background: '#0369A1', color: '#ffffff' }}
          >
            Find My Chair (free, takes 3 minutes)
          </Link>
        </div>
      </section>

      {/* Buying guide preview */}
      <section className="section">
        <div className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#0EA5E9' }}>
          Buying Guide
        </div>
        <h2 className="text-2xl font-serif mb-2" style={{ color: '#0B1829' }}>Everything you need to decide with confidence.</h2>
        <p className="text-muted text-sm mb-8">
          Start with track types. Everything else follows from there.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'S-Track vs L-Track vs SL-Track', href: '/learn/track-types', desc: 'The single most important decision in buying a massage chair.' },
            { title: 'How to choose roller dimensions', href: '/learn/roller-dimensions', desc: 'Width, stroke length, and why they matter for back pain.' },
            { title: 'Zero gravity explained', href: '/learn/zero-gravity', desc: 'What it actually does and when it matters.' },
            { title: 'How to size a chair for your body', href: '/learn/body-fit', desc: 'Height, weight, and shoulder width considerations.' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block bg-white rounded-lg p-5 transition-shadow hover:shadow-sm group"
              style={{ border: '1px solid #D4DDE9' }}
            >
              <h3 className="text-base font-serif font-semibold mb-1 transition-colors group-hover:text-accent-interactive" style={{ color: '#0B1829' }}>
                {item.title}
              </h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/learn" className="text-sm font-medium hover:underline" style={{ color: '#0369A1' }}>
            Read the full buying guide &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
