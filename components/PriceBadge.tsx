import { Chair, priceBand } from '@/lib/chairs'

/**
 * PriceBadge: color-coded price-range chip.
 * Displays the chair's price BAND, never an exact figure, so the site never
 * shows an Amazon-sourced or stale exact price. Exact priceMin stays in the
 * data layer for filtering/sorting only. Single source of truth: priceBand().
 */
export default function PriceBadge({ chair, className = '' }: { chair: Chair; className?: string }) {
  const band = priceBand(chair)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold ${className}`}
      style={{ background: band.hex + '14', color: band.hex, border: `1px solid ${band.hex}40` }}
      title={`${band.label} price range`}
    >
      <span
        aria-hidden="true"
        style={{ width: 7, height: 7, borderRadius: '9999px', background: band.hex, display: 'inline-block' }}
      />
      {band.short}
    </span>
  )
}
