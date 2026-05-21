import { CHAIRS } from '@/lib/chairs'
import ChairCard from '@/components/ChairCard'
import Link from 'next/link'

export default function BestCategoryPage({ params }: { params: { category: string } }) {
  const chairs = CHAIRS.filter(c => c.mcfActive && c.active)
  const label = params.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="section">
      <div className="mb-4"><Link href="/best" className="text-bronze hover:text-gold text-sm">&larr; All categories</Link></div>
      <h1 className="text-4xl font-serif mb-2">Best Massage Chairs for {label}</h1>
      <p className="text-warm-gray mb-8">Our top picks chosen for how well they solve this specific problem.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chairs.map((chair) => <ChairCard key={chair.id} chair={chair} />)}
      </div>
    </div>
  )
}
