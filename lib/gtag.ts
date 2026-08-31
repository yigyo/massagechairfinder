// lib/gtag.ts
// Typed GA4 utility. All event tracking in this project flows through here.
// Set NEXT_PUBLIC_GA4_ID in .env.local (e.g. G-XXXXXXXXXX).

import { fbqTrack, fbqTrackCustom } from './fbq'

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''

// ── dataLayer-safe bridge ────────────────────────────────────────────────────
// Every call in this file can run during hydration, before the gtag.js loader
// script has executed. Calling window.gtag directly in that window throws, the
// error is swallowed inside the effect, and the hit is lost. Seeding the queue
// ourselves means early calls buffer on dataLayer and gtag.js replays them in
// order once it loads.
function ready(): boolean {
  if (!GA4_ID || typeof window === 'undefined') return false
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtagQueue(...args: unknown[]): void {
      window.dataLayer.push(args)
    } as typeof window.gtag
  }
  return true
}

// ── Pageview ────────────────────────────────────────────────────────────────
// GA4 wants an explicit page_view event. A repeat gtag("config") call for an
// already-configured measurement ID is debounced by gtag.js and sends nothing,
// which is why SPA route changes were never recorded. page_location and
// page_referrer are sent explicitly so GA4 can attribute the traffic source
// instead of defaulting the session to Direct.
export function pageview(url: string): void {
  if (!ready()) return
  window.gtag('event', 'page_view', {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  })
}

// ── Generic event ────────────────────────────────────────────────────────────
type GtagEventParams = Record<string, string | number | boolean | undefined>

export function event(action: string, params?: GtagEventParams): void {
  if (!ready()) return
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
  linkText?: string
}): void {
  // source_path is always sent. Knowing which page a buy click came from is the
  // difference between "7 affiliate clicks" and knowing which page earned them.
  event('affiliate_click', {
    chair_slug: params.chairSlug || '(unattributed)',
    chair_name: params.chairName || '(unattributed)',
    brand: params.brand,
    retailer: params.retailer,
    source_path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...(params.linkText ? { link_text: params.linkText } : {}),
    ...(params.price ? { price: params.price } : {}),
  })
}

// ── Finder events ─────────────────────────────────────────────────────────────
export function finderStart(): void {
  event('finder_start')
  // Meta funnel: top of finder
  fbqTrackCustom('FinderStart')
}

export function finderEmailSubmit(chairCount: number): void {
  event('finder_email_submit', { chair_count: chairCount })
}

export function finderComplete(chairCount: number): void {
  event('finder_complete', { chair_count: chairCount })
  // Meta funnel: recommendations generated
  fbqTrackCustom('FinderComplete', { chair_count: chairCount })
}

// ── Lead magnet / email opt-in ────────────────────────────────────────────────
export function emailOptIn(source: string, email?: string): void {
  event('email_opt_in', { source })
  // Meta standard conversion event used for ad optimization (browser pixel + CAPI, deduped).
  // Email (when available) is forwarded to the server route, hashed there, for better matching.
  fbqTrack('Lead', { source }, email ? { email } : undefined)
}

// ── Guide engagement ──────────────────────────────────────────────────────────
export function guideSection(sectionTitle: string): void {
  event('guide_section_view', { section: sectionTitle })
}

// ── /links hub card click ─────────────────────────────────────────────────────
// Fired when a user taps a destination card on the /links "link in bio" hub.
// cardSlug identifies which card (finder, buyers-guide, learn, chairs, best-lower-back-pain).
// destination is the internal path the click is routing to.
export function linksCardClick(cardSlug: string, destination: string): void {
  event('links_card_click', { card_slug: cardSlug, destination })
}

// ── TypeScript global declaration for gtag ────────────────────────────────────
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
