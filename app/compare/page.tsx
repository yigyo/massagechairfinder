import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Massage Chairs',
  description: 'Side-by-side comparison of massage chairs — specs, prices, and who each one fits best.',
}

export default function ComparePage() {
  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-3">Compare Chairs</h1>
      <p className="text-warm-gray mb-8">
        Select two or three chairs to compare side by side — specs, pricing, and who each one fits.
      </p>
      <div className="card text-center py-16 text-warm-gray">
        Chair comparison tool coming soon.
      </div>
    </div>
  )
}
