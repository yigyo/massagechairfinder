'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Chair, formatPrice } from '@/lib/chairs'
import { affiliateClick } from '@/lib/gtag'

function trackBadgeColor(track: string) {
  if (track === 'SL' || track === 'Flex') return 'bg-teal text-white'
  if (track === 'L') return 'bg-gold text-white'
  return 'bg-sand text-charcoal'
}

function trackLabel(track: string) {
  const map: Record<string, string> = { SL: 'SL-Track', L: 'L-Track', S: 'S-Track', Flex: 'Flex-Track' }
  return map[track] || track
}

export default function ChairCard({ chair }: { chair: Chair }) {
  function handleShopClick() {
    affiliateClick({
      chairSlug: chair.id,
      chairName: chair.name,
      brand: chair.brand,
      retailer: chair.affiliateRetailer || 'unknown',
      price: chair.priceMin,
    })
  }

  return (
    <div className="card hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-sand rounded-md overflow-hidden mb-4">
        {chair.imageUrl ? (
          <Image src={chair.imageUrl} alt={chair.name} fill className="object-contain p-4" />
        ) : (
          <div className="flex items-center justify-center h-full text-warm-gray text-sm">
            Photo coming soon
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-2">
        {chair.vibrationOnly ? (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sand text-charcoal">Vibration</span>
        ) : chair.track ? (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trackBadgeColor(chair.track)}`}>
            {trackLabel(chair.track)}
          </span>
        ) : null}
        {chair.zeroGravity && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-linen text-charcoal border border-sand">
            Zero-G
          </span>
        )}
      </div>

      {/* Name + brand */}
      <h3 className="font-serif text-lg font-semibold text-navy leading-tight mb-1">
        <Link href={`/chairs/${chair.id}`} className="hover:text-gold transition-colors">
          {chair.name}
        </Link>
      </h3>
      <p className="text-warm-gray text-sm mb-3">{chair.brand}</p>

      {/* Rating */}
      {chair.reviewRating && (
        <p className="text-sm text-warm-gray mb-2">
          <span className="text-gold">{'\u2605'.repeat(Math.round(chair.reviewRating))}</span>
          {' '}{chair.reviewRating.toFixed(1)}
          {chair.reviewCount ? ` \u00b7 ${chair.reviewCount.toLocaleString()} reviews` : ''}
        </p>
      )}

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand">
        <span className="font-semibold text-navy">{formatPrice(chair)}</span>
        <div className="flex gap-2">
          <Link href={`/chairs/${chair.id}`} className="text-sm text-bronze hover:text-gold font-medium transition-colors">
            Details &rarr;
          </Link>
          {chair.affiliateUrl && (
            <a
              href={`/go/${chair.id}`}
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
