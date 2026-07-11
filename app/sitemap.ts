import { MetadataRoute } from 'next'
import { CHAIRS } from '@/lib/chairs'
import { LOCAL_BRANDS } from '@/lib/local-brands'
import { PUBLISHED_ARTICLES } from '@/lib/local-articles'
import { getBestNavPages, getCompareNavPages } from '@/lib/nav-scanner'

const BASE = 'https://www.massagechairfinder.com'

// lastmod policy
// --------------
// Google ignores (and can distrust) a sitemap where every URL carries the build
// timestamp, because it tells the crawler nothing about what actually changed.
// So: articles report their own publishedAt, and everything else reports a
// stable CONTENT_REVISION date that we bump by hand only when that section of
// the site genuinely changes. Never use new Date() here.
const CONTENT_REVISION = new Date('2026-07-11')

// To add a new /best/* or /compare/* page to the sitemap AND the nav dropdown,
// just create the page directory. No changes needed here - the scanner picks it up.

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core pages
  const core: MetadataRoute.Sitemap = [
    { url: BASE,                  priority: 1.0,  changeFrequency: 'weekly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/finder',      priority: 0.95, changeFrequency: 'monthly', lastModified: CONTENT_REVISION },
    { url: BASE + '/buyers-guide', priority: 0.9, changeFrequency: 'monthly', lastModified: CONTENT_REVISION },
    { url: BASE + '/chairs',      priority: 0.9,  changeFrequency: 'weekly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/best',        priority: 0.9,  changeFrequency: 'weekly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/brands',      priority: 0.9,  changeFrequency: 'monthly', lastModified: CONTENT_REVISION },
    { url: BASE + '/compare',     priority: 0.85, changeFrequency: 'monthly', lastModified: CONTENT_REVISION },
    { url: BASE + '/learn',       priority: 0.85, changeFrequency: 'weekly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/how-we-review', priority: 0.6, changeFrequency: 'yearly', lastModified: CONTENT_REVISION },
    { url: BASE + '/news',        priority: 0.6,  changeFrequency: 'weekly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/about',       priority: 0.4,  changeFrequency: 'yearly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/contact',     priority: 0.4,  changeFrequency: 'yearly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/disclosure',  priority: 0.3,  changeFrequency: 'yearly',  lastModified: CONTENT_REVISION },
    { url: BASE + '/privacy-policy', priority: 0.3, changeFrequency: 'yearly', lastModified: CONTENT_REVISION },
    { url: BASE + '/terms',       priority: 0.3,  changeFrequency: 'yearly',  lastModified: CONTENT_REVISION },
  ]

  // /best/* curated picks (auto-detected from filesystem)
  const bestPages: MetadataRoute.Sitemap = getBestNavPages().map(p => ({
    url: BASE + '/best/' + p.slug,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: CONTENT_REVISION,
  }))

  // /compare/* head-to-head pages (auto-detected, redirects excluded)
  const comparePages: MetadataRoute.Sitemap = getCompareNavPages().map(p => ({
    url: BASE + '/compare/' + p.slug,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
    lastModified: CONTENT_REVISION,
  }))

  // /learn/* buying guide articles - each reports its own publish date
  const articles: MetadataRoute.Sitemap = PUBLISHED_ARTICLES.map(a => ({
    url: BASE + '/learn/' + a.slug,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : CONTENT_REVISION,
  }))

  // /chairs/[id] individual chair pages
  const chairs: MetadataRoute.Sitemap = CHAIRS
    .filter(c => c.active)
    .map(c => ({
      url: BASE + '/chairs/' + c.id,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: CONTENT_REVISION,
    }))

  // /brands/[slug] brand pages
  const brands: MetadataRoute.Sitemap = LOCAL_BRANDS.map(b => ({
    url: BASE + '/brands/' + b.slug,
    priority: 0.65,
    changeFrequency: 'monthly' as const,
    lastModified: CONTENT_REVISION,
  }))

  return [
    ...core,
    ...bestPages,
    ...comparePages,
    ...articles,
    ...chairs,
    ...brands,
  ]
}
