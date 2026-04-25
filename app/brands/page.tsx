import { getBrands } from '@/lib/strapi'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Massage Chair Brands',
  description: 'Browse massage chairs by brand — Osaki, Infinity, Kahuna, Human Touch, and more.',
}

export default async function BrandsPage() {
  let brands: any[] = []
  try {
    const res = await getBrands()
    brands = res.data || []
  } catch {}

  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-2">Massage Chair Brands</h1>
      <p className="text-warm-gray mb-8">
        Who makes what — and what to expect from each brand at different price points.
      </p>
      {brands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand: any) => {
            const b = brand.attributes || brand
            return (
              <Link key={brand.id} href={`/brands/${b.slug}`} className="card hover:shadow-md transition-shadow group">
                <h2 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                  {b.name}
                </h2>
                {b.description && <p className="text-warm-gray text-sm">{b.description}</p>}
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="card text-center py-16 text-warm-gray">Brand profiles coming soon.</div>
      )}
    </div>
  )
}
