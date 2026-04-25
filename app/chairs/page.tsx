import { getChairs } from '@/lib/strapi'
import ChairCard from '@/components/ChairCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Massage Chairs',
  description: 'Browse our complete catalog of massage chairs — compared by track type, price, and use case.',
}

const TRACK_FILTERS = ['All', 'SL-Track', 'L-Track', 'S-Track']
const PRICE_FILTERS = [
  { label: 'All prices', max: Infinity },
  { label: 'Under $2,000', max: 2000 },
  { label: '$2,000–$4,000', min: 2000, max: 4000 },
  { label: '$4,000–$7,000', min: 4000, max: 7000 },
  { label: '$7,000+', min: 7000 },
]

export default async function ChairsPage() {
  let chairs: any[] = []
  try {
    const res = await getChairs()
    chairs = res.data || []
  } catch {
    // Strapi not connected — empty state
  }

  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-2">All Massage Chairs</h1>
      <p className="text-warm-gray mb-8 max-w-2xl">
        {chairs.length > 0
          ? `${chairs.length} chairs researched, compared, and ranked by use case.`
          : 'Our full catalog is loading — check back shortly.'}
      </p>

      {chairs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chairs.map((chair: any) => (
            <ChairCard key={chair.id} chair={chair} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-16 text-warm-gray">
          Catalog coming soon.
        </div>
      )}
    </div>
  )
}
