import type { Metadata } from 'next'

/** Site-wide Open Graph share image (1200x630, /public/og/default.png). */
export const OG_IMAGE = {
  url: 'https://www.massagechairfinder.com/og/default.png',
  width: 1200,
  height: 630,
  alt: 'Massage Chair Finder',
}

/**
 * Shared Open Graph fields for a single page.
 *
 * Next.js merges metadata across segments, but once a route defines its own
 * `openGraph` object, individual fields are NOT inherited from the parent
 * layout. So any page that sets og:url must re-declare type/siteName/images
 * here or it would lose them. og:title and og:description are intentionally
 * left out so each page keeps deriving them from its own title/description.
 */
export function pageOpenGraph(url: string): NonNullable<Metadata['openGraph']> {
  return {
    type: 'website',
    siteName: 'Massage Chair Finder',
    url,
    images: [OG_IMAGE],
  }
}
