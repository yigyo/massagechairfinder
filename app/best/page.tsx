import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Massage Chairs by Use Case',
  description: 'The best massage chairs for lower back pain, sciatica, small spaces, and every budget.',
}

const categories = [
  { label: 'Lower Back Pain', slug: 'lower-back-pain', desc: 'SL-track chairs that reach the lumbar and hips — the right call for 80% of buyers.' },
  { label: 'Sciatica', slug: 'sciatica', desc: 'L-track and SL-track models that work under the glutes and into the thighs.' },
  { label: 'Neck and Shoulders', slug: 'neck-shoulders', desc: 'Chairs with serious upper-body airbag coverage and deep neck rollers.' },
  { label: 'Small Spaces', slug: 'small-spaces', desc: 'Space-saving models — some need as little as 2 inches from the wall.' },
  { label: 'Under $2,000', slug: 'under-2000', desc: 'Entry-level chairs that still deliver meaningful relief.' },
  { label: 'Under $3,000', slug: 'under-3000', desc: 'The sweet spot for most buyers — strong features without flagship pricing.' },
  { label: 'Under $5,000', slug: 'under-5000', desc: 'Where SL-track gains 4D rollers and body fit ranges widen. The five best uses of this budget.' },
  { label: '$3,000–$5,000', slug: '3000-to-5000', desc: 'Mid-range flagships with SL-track, 4D rollers, and serious build quality.' },
  { label: 'Premium ($5,000+)', slug: 'premium', desc: 'Top-of-market chairs for buyers who want the best and want it to last.' },
  { label: 'Tall People', slug: 'tall-people', desc: 'Chairs with extended roller stroke and generous height accommodation.' },
  { label: 'Heavy-Duty', slug: 'heavy-duty', desc: 'High weight-capacity models with reinforced frames.' },
  { label: 'Seniors', slug: 'seniors', desc: 'Zero gravity, gentle pressure, and heat. Chairs verified for ease of use and long-term daily relief.' },
  { label: 'Petite Buyers', slug: 'petite-buyers', desc: 'Chairs confirmed for buyers under 5\'2\" — verified height data, not just a spec sheet maximum.' },
,
  { label: 'Athlete Recovery', slug: 'athlete-recovery', desc: 'SL-track and L-track 4D chairs for post-training recovery. Verified glute and leg coverage.' },
    { label: 'Arthritis', slug: 'arthritis', desc: 'Chairs with 4D pressure control, multi-zone heat, and zero gravity for arthritic buyers across price tiers.' },
    { label: 'Under $10,000', slug: 'under-10000', desc: 'The best $7,000 to $10,000 chairs. Where 4D quality peaks before diminishing returns.' },
    { label: 'Office Workers', slug: 'office-workers', desc: 'SL-track chairs for neck, upper back, and posture relief from desk work. Entry-level to premium.' },
]

export default function BestPage() {
  return (
    <div className="section">
      <h1 className="text-4xl font-serif mb-2">Best Chairs by Use Case</h1>
      <p className="text-warm-gray mb-8">
        The right chair depends on your body and your budget, not just specs. Start with what matters most to you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/best/${cat.slug}`} className="card hover:shadow-md transition-shadow group">
            <h2 className="text-lg font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-2">
              {cat.label}
            </h2>
            <p className="text-warm-gray text-sm">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
