// lib/gtag.ts
// Typed GA4 utility. All event tracking in this project flows through here.
// Set NEXT_PUBLIC_GA4_ID in .env.local (e.g. G-XXXXXXXXXX).

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''

// ── Pageview ────────────────────────────────────────────────────────────────
export function pageview(url: string): void {
  if (!GA4_ID || typeof window === 'undefined') return
  window.gtag('config', GA4_ID, { page_path: url })
}

// ── Generic event ────────────────────────────────────────────────────────────
type GtagEventParams = Record<string, string | number | boolean | undefined>

export function event(action: string, params?: GtagEventParams): void {
  if (!GA4_ID || typeof window === 'undefined') return
  window.gtag('event', action, params)
}

// ── Scroll depth ─────────────────────────────────────────────────────────────
// Fired by ScrollTracker.tsx at 25 / 50 / 75 / 90 percent thresholds.
export function scrollDepth(percent: number, pagePath?: string): void {
  event('scroll_depth', {
    scroll_percent: percent,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : undefined),
  })
}

// ── Affiliate link click ─────────────────────────────────────────────────────
export function affiliateClick(params: {
  chairSlug: string
  chairName: string
  brand: string
  retailer: string
  price?: number
}): void {
  event('affiliate_click', {
    chair_slug: params.chairSlug,
    chair_name: params.chairName,
    brand: params.brand,
    retailer: params.retailer,
    ...(params.price ? { price: params.price } : {}),
  })
}

// ── Finder events ─────────────────────────────────────────────────────────────
export function finderStart(): void {
  event('finder_start')
}

export function finderEmailSubmit(chairCount: number): void {
  event('finder_email_submit', { chair_count: chairCount })
}

export function finderComplete(chairCount: number): void {
  event('finder_complete', { chair_count: chairCount })
}

// ── Lead magnet / email opt-in ────────────────────────────────────────────────
export function emailOptIn(source: string): void {
  event('email_opt_in', { source })
}

// ── Guide engagement ──────────────────────────────────────────────────────────
export function guideSection(sectionTitle: string): void {
  event('guide_section_view', { section: sectionTitle })
}

// ── TypeScript global declaration for gtag ────────────────────────────────────
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void
  }
}
