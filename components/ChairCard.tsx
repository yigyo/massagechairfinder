'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Chair } from '@/lib/types'
import { affiliateClick } from '@/lib/gtag'

interface Props {
  chair: any // Strapi response shape before normalization
}

function trackBadgeColor(track: string) {
  if (track === 'SL-Track') return 'bg-teal text-white'
  if (track === 'L-Track') return 'bg-gold text-white'
  return 'bg-sand text-charcoal'
}

export default function ChairCard({ chair }: Props) {
  const c = chair.attributes || chair
  const slug = c.slug
  const price = c.price ? `$${c.price.toLocaleString()}` : 'Call for price'
  const track = c.trackType || ''
  const imageUrl = c.imageUrl || null

  // Best primary retailer link
  const links: any[] = c.retailerLinks || []
  const primaryLink = links.find((l: any) => l.isAvailable) || links[0]

  function handleShopClick() {
    affiliateClick({
      chairSlug: slug || '',
      chairName: c.name || '',
      brand: c.brand || '',
      retailer: primaryLink?.retailerName || 'unknown',
      price: c.price,
    })
  }

  return (
    <div className="card hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-sand rounded-md overflow-hidden mb-4">
        {imageUrl ? (
          <Image src={imageUrl} alt={c.name} fill className="object-contain p-4" />
        ) : (
          <div className="flex items-center justify-center h-full text-warm-gray text-sm">
            Photo coming soon
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-2">
        {track && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trackBadgeColor(track)}`}>
            {track}
          </span>
        )}
        {c.zeroGravity && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-linen text-charcoal border border-sand">
            Zero-G
          </span>
        )}
      </div>

      {/* Name + brand */}
      <h3 className="font-serif text-lg font-semibold text-navy leading-tight mb-1">
        <Link href={`/chairs/${slug}`} className="hover:text-gold transition-colors">
          {c.name}
        </Link>
      </h3>
      <p className="text-warm-gray text-sm mb-1">{c.brand}</p>

      {/* Best for */}
      {c.bestFor && (
        <p className="text-sm text-charcoal mb-3 flex-1">
          Best for: <span className="text-warm-gray">{c.bestFor}</span>
        </p>
      )}

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand">
        <span className="font-semibold text-navy">{price}</span>
        <div className="flex gap-2">
          <Link href={`/chairs/${slug}`} className="text-sm text-bronze hover:text-gold font-medium transition-colors">
            Details {'->'}
          </Link>
          {primaryLink && (
            <a
              href={`/go/${slug}/${primaryLink.retailerName?.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm btn-primary py-1 px-3"
              onClick={handleShopClick}
            >
              Shop
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
