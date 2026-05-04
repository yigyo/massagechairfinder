import { getLocalBrand, getBrandSlugs } from '@/lib/local-brands'
import { CHAIRS } from '@/lib/chairs'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { autolink } from '@/lib/autolink'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getBrandSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = getLocalBrand(params.slug)
  if (!brand) return {}
  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
  }
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getLocalBrand(params.slug)
  if (!brand) notFound()

  // All chairs for this brand -- active in stock first (by price), OOS last (by price)
  const brandName = brand.name
  const allBrandChairs = CHAIRS.filter(
    c => c.active && c.brand === brandName
  ).sort((a, b) => {
    const aOos = a.mcfActive === false
    const bOos = b.mcfActive === false
    if (aOos !== bOos) return aOos ? 1 : -1
    return a.priceMin - b.priceMin
  })

  // Compute price range dynamically from active in-stock chairs
  // Falls back to the static value only if no chairs are in the catalog
  const inStockChairs = allBrandChairs.filter(c => c.mcfActive !== false)
  const allPrices = inStockChairs.flatMap(c =>
    [c.priceMin, c.priceMax ?? c.priceMin].filter(n => n > 0)
  )
  const computedPriceRange = allPrices.length === 0
    ? brand.priceRange
    : allPrices.length === 1 || Math.min(...allPrices) === Math.max(...allPrices)
    ? `$${Math.min(...allPrices).toLocaleString()}`
    : `$${Math.min(...allPrices).toLocaleString()} to $${Math.max(...allPrices).toLocaleString()}`

  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <div className="mb-6">
        <Link href="/brands" className="text-bronze hover:text-gold text-sm">
          &larr; All Brands
        </Link>
      </div>

      <h1 className="text-4xl font-serif mb-3">{brand.name} Massage Chairs</h1>
      <p className="text-warm-gray text-lg mb-6">{brand.tagline}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-sand rounded-xl px-5 py-4">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wide mb-1">Price Range</p>
          <p className="text-charcoal font-medium text-sm">{computedPriceRange}</p>
        </div>
        <div className="bg-white border border-sand rounded-xl px-5 py-4">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wide mb-1">Origin</p>
          <p className="text-charcoal font-medium text-sm">{brand.origin}</p>
        </div>
        <div className="bg-white border border-sand rounded-xl px-5 py-4">
          <p className="text-xs font-semibold text-warm-gray uppercase tracking-wide mb-1">Warranty</p>
          <p className="text-charcoal font-medium text-sm">{brand.warrantyNote}</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none prose-headings:font-serif mb-10">
        {brand.description.map((para, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: autolink(para, brand.slug) }} />
        ))}
      </div>

      <div className="bg-sand/40 rounded-lg p-4 mb-10">
        <strong className="text-navy">Best for:</strong>{' '}
        <span className="text-charcoal">{brand.bestFor}</span>
      </div>

      {allBrandChairs.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6">{brand.name} Chairs We Have Reviewed</h2>
          <div className="space-y-4">
            {allBrandChairs.map(chair => {
              const isOos = chair.mcfActive === false
              return (
                <Link
                  key={chair.id}
                  href={`/chairs/${chair.id}`}
                  className={`card hover:shadow-md transition-shadow group block${isOos ? ' opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors">
                          {chair.name}
                        </h3>
                        {isOos && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-terra/40 text-terra bg-white shrink-0">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      {chair.track && (
                        <p className="text-warm-gray text-sm">{chair.track} track &middot; {chair.roller || '3D'} rollers</p>
                      )}
                      {chair.reviewRating && (
                        <p className="text-xs text-warm-gray mt-1">
                          <span className="text-gold">{"★".repeat(Math.round(chair.reviewRating))}</span>
                          {" "}{chair.reviewRating.toFixed(1)}
                          {chair.reviewCount ? " · " + chair.reviewCount.toLocaleString() + " reviews" : ""}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-gold font-semibold">
                        ${chair.priceMin.toLocaleString()}
                        {chair.priceMax && chair.priceMax > chair.priceMin ? ` - $${chair.priceMax.toLocaleString()}` : ''}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <div className="mt-10 pt-8 border-t border-sand flex flex-col sm:flex-row gap-4 text-sm">
        <Link href="/finder" className="text-bronze hover:text-gold font-medium">
          Not sure {brand.name} is right for you? Use the Chair Finder &rarr;
        </Link>
        <Link href="/learn/brands-overview" className="text-bronze hover:text-gold font-medium">
          Compare all brands &rarr;
        </Link>
      </div>
    </div>
  )
}
