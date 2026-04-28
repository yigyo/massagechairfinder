import { LOCAL_BRANDS } from '@/lib/local-brands'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Massage Chair Brands Compared | MassageChairFinder',
  description: 'Who makes what — Osaki, Infinity, Luraco, Inada, Kahuna, and more. What each brand actually stands for at different price points.',
}

export default function BrandsPage() {
  const brands = LOCAL_BRANDS

  // Group into price tiers for scannability
  const under5k = brands.filter(b => {
    const max = parseInt(b.priceRange.replace(/[^0-9,]/g, '').split(',').pop() || '0')
    return parseInt(b.priceRange.replace(/[^0-9]/g, '').slice(0, 5)) < 5000
  })

  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <h1 className="text-4xl font-serif mb-3">Massage Chair Brands</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        There are roughly 15 active brands selling massage chairs in the US. Some share manufacturing
        facilities under different names. Others have decades of independent engineering behind them.
        Here is what each brand actually stands for.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {brands.map(brand => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="card hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors">
                {brand.name}
              </h2>
              <span className="text-bronze text-sm shrink-0 font-medium">{brand.priceRange}</span>
            </div>
            <p className="text-warm-gray text-sm">{brand.tagline}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-sand text-sm text-warm-gray">
        <p>
          For a deeper comparison of what each brand actually stands for, read the{' '}
          <Link href="/learn/brands-overview" className="text-bronze hover:text-gold">brands overview guide</Link>.
          Or use the <Link href="/finder" className="text-bronze hover:text-gold">chair finder quiz</Link> to
          narrow down by your pain profile, budget, and room constraints.
        </p>
      </div>
    </div>
  )
}
