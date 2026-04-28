import { getChairBySlug, getChairs } from '@/lib/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const res = await getChairs()
    return (res.data || []).map((c: any) => ({ slug: c.attributes?.slug || c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await getChairBySlug(params.slug)
    const c = res.data?.[0]?.attributes || res.data?.[0]
    if (!c) return {}
    return {
      title: `${c.name} Review`,
      description: `Is the ${c.name} right for you? Specs, who it fits, and where to buy it at the best price.`,
    }
  } catch {
    return {}
  }
}

export default async function ChairPage({ params }: { params: { slug: string } }) {
  let chair: any = null
  try {
    const res = await getChairBySlug(params.slug)
    chair = res.data?.[0]?.attributes || res.data?.[0]
  } catch {
    notFound()
  }
  if (!chair) notFound()

  const links: any[] = chair.retailerLinks || []
  const availableLinks = links.filter((l: any) => l.isAvailable !== false)

  return (
    <div className="section max-w-5xl">
      <div className="mb-4">
        <Link href="/chairs" className="text-bronze hover:text-gold text-sm">← All chairs</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative h-80 bg-sand rounded-lg overflow-hidden">
          {chair.imageUrl ? (
            <Image src={chair.imageUrl} alt={chair.name} fill className="object-contain p-6" />
          ) : (
            <div className="flex items-center justify-center h-full text-warm-gray">Photo coming soon</div>
          )}
        </div>

        {/* Summary */}
        <div>
          <p className="text-warm-gray text-sm mb-1">{chair.brand}</p>
          <h1 className="text-3xl font-serif font-bold text-navy mb-3">{chair.name}</h1>
          <p className="text-2xl font-semibold text-charcoal mb-4">
            {chair.price ? `$${chair.price.toLocaleString()}` : 'Call for price'}
          </p>

          {chair.bestFor && (
            <p className="text-charcoal mb-6">
              <span className="font-semibold">Best for:</span> {chair.bestFor}
            </p>
          )}

          {/* Buy buttons */}
          {availableLinks.length > 0 && (
            <div className="space-y-3">
              {availableLinks.map((link: any, i: number) => (
                <a
                  key={i}
                  href={`/go/${params.slug}/${link.retailerName?.toLowerCase().replace(/\s+/g, '-')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 px-6 rounded font-semibold transition-colors ${
                    i === 0 ? 'btn-primary' : 'border border-gold text-gold hover:bg-gold hover:text-white'
                  }`}
                >
                  Shop at {link.retailerName}
                  {link.price ? ` — $${link.price.toLocaleString()}` : ''}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Specs table */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif mb-4">Specifications</h2>
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Track Type', chair.trackType],
                ['Roller Dimension', chair.rollerDimension],
                ['Zero Gravity', chair.zeroGravity ? 'Yes' : 'No'],
                ['Heat Therapy', chair.heatTherapy ? 'Yes' : 'No'],
                ['Foot Rollers', chair.footRollers ? 'Yes' : 'No'],
                ['User Height Range', chair.minHeightIn && chair.maxHeightIn ? `${chair.minHeightIn}"–${chair.maxHeightIn}"` : null],
                ['Weight Capacity', chair.weightCapacityLbs ? `${chair.weightCapacityLbs} lbs` : null],
                ['Space Required', chair.spaceRequired],
              ]
                .filter(([, v]) => v)
                .map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? 'bg-linen' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium text-charcoal w-1/3">{label}</td>
                    <td className="py-3 px-4 text-warm-gray">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
