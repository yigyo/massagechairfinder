import { LOCAL_BRANDS } from '@/lib/local-brands'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Massage Chair Brands Compared | MassageChairFinder',
  description: 'Osaki, Infinity, Luraco, Kahuna, and more -- who manufactures their own chairs, who imports, and what that means for price and warranty.',
}

export default function BrandsPage() {
  const brands = [...LOCAL_BRANDS].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )

  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <h1 className="text-4xl font-serif mb-3">Massage Chair Brands</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        Massage chair brands vary more than most buyers expect. Some are importers sourcing from
        shared manufacturing facilities. Others are independent engineering companies that have
        spent decades developing their own roller mechanisms and body-scan technology. The
        distinction matters when you are comparing price tags and warranty terms.
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
              <span className="shrink-0 bg-navy text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">{brand.priceRange}</span>
            </div>
            <p className="text-warm-gray text-sm">{brand.tagline}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-sand text-sm text-warm-gray">
        <p>
          For a closer look at how these brands compare at different price points, read the{' '}
          <Link href="/learn/brands-overview" className="text-bronze hover:text-gold">brands overview guide</Link>.
          Or use the <Link href="/finder" className="text-bronze hover:text-gold">chair finder</Link> to
          narrow down by your pain profile, budget, and room constraints.
        </p>
      </div>
    </div>
  )
}
