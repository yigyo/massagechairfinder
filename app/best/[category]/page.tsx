import { getChairs } from '@/lib/strapi'
import ChairCard from '@/components/ChairCard'
import Link from 'next/link'

export default async function BestCategoryPage({ params }: { params: { category: string } }) {
  let chairs: any[] = []
  try {
    const res = await getChairs()
    chairs = res.data || []
  } catch {}

  const label = params.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="section">
      <div className="mb-4"><Link href="/best" className="text-bronze hover:text-gold text-sm">← All categories</Link></div>
      <h1 className="text-4xl font-serif mb-2">Best Massage Chairs for {label}</h1>
      <p className="text-warm-gray mb-8">Our top picks — chosen for how well they solve this specific problem.</p>
      {chairs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chairs.map((chair: any) => <ChairCard key={chair.id} chair={chair} />)}
        </div>
      ) : (
        <div className="card text-center py-16 text-warm-gray">Picks for this category coming soon.</div>
      )}
    </div>
  )
}
