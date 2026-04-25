import { getBrandBySlug } from '@/lib/strapi'
import ChairCard from '@/components/ChairCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await getBrandBySlug(params.slug)
    const b = res.data?.[0]?.attributes || res.data?.[0]
    if (!b) return {}
    return { title: `${b.name} Massage Chairs`, description: b.description || '' }
  } catch { return {} }
}

export default async function BrandPage({ params }: { params: { slug: string } }) {
  let brand: any = null
  try {
    const res = await getBrandBySlug(params.slug)
    brand = res.data?.[0]?.attributes || res.data?.[0]
  } catch { notFound() }
  if (!brand) notFound()

  const chairs = brand.chairs?.data || brand.chairs || []

  return (
    <div className="section">
      <div className="mb-4"><Link href="/brands" className="text-bronze hover:text-gold text-sm">← All brands</Link></div>
      <h1 className="text-4xl font-serif mb-2">{brand.name}</h1>
      {brand.description && <p className="text-warm-gray mb-8 max-w-2xl">{brand.description}</p>}
      {chairs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chairs.map((chair: any) => <ChairCard key={chair.id} chair={chair} />)}
        </div>
      )}
    </div>
  )
}
