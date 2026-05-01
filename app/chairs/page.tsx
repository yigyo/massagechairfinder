import { CHAIRS } from '@/lib/chairs'
import ChairsClient from '@/components/ChairsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Massage Chairs',
  description: 'Browse massage chairs researched and compared by track type, price, and use case.',
}

export default function ChairsPage() {
  const activeChairs = CHAIRS
    .filter(c => c.active && c.inStock !== false)
    .sort((a, b) => a.priceMin - b.priceMin)

  const oosChairs = CHAIRS
    .filter(c => c.active && c.inStock === false)
    .sort((a, b) => a.priceMin - b.priceMin)

  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-2">All Massage Chairs</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        {activeChairs.length} chairs researched and compared. Filter by track, roller, brand, or price.
      </p>

      <ChairsClient activeChairs={activeChairs} oosChairs={oosChairs} />
    </div>
  )
}
