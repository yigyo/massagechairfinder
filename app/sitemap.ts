import { MetadataRoute } from 'next'
import { CHAIRS } from '@/lib/chairs'
import { LOCAL_BRANDS } from '@/lib/local-brands'
import { PUBLISHED_ARTICLES } from '@/lib/local-articles'
import { getBestNavPages, getCompareNavPages } from '@/lib/nav-scanner'

import REVISIONS from '@/lib/content-revisions.json'

const BASE = 'https://www.massagechairfinder.com'

// lastmod policy
// --------------
// Google ignores (and can distrust) a sitemap where every URL carries the build
// timestamp, because it tells the crawler nothing about what actually changed.
// Never use new Date() here.
//
// Equally, a lastmod that never moves tells the crawler nothing either. The old
// hand-bumped CONTENT_REVISION constant sat at 2026-08-07 while articles were
// being expanded underneath it, and Search Console stopped re-reading the
// sitemap after 2026-07-16.
//
// So each section now reports a date derived from a content hash of its own
// source data, written to lib/content-revisions.json by
// scripts/build-content-revisions.py. The date advances only when that
// section's content actually changes, which is what lastmod is supposed to
// mean. Articles still report their own publishedAt, or updatedAt when set.
const rev = (section: keyof typeof REVISIONS) => new Date(REVISIONS[section].revised)

const CORE_REVISION     = rev('core')
const CHAIRS_REVISION   = rev('chairs')
const BRANDS_REVISION   = rev('brands')
const BEST_REVISION     = rev('best')
const COMPARE_REVISION  = rev('compare')
const ARTICLES_REVISION = rev('articles')

// To add a new /best/* or /compare/* page to the sitemap AND the nav dropdown,
// just create the page directory. No changes needed here - the scanner picks it up.

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core pages
  const core: MetadataRoute.Sitemap = [
    { url: BASE,                  priority: 1.0,  changeFrequency: 'weekly',  lastModified: CORE_REVISION },
    { url: BASE + '/finder',      priority: 0.95, changeFrequency: 'monthly', lastModified: CORE_REVISION },
    { url: BASE + '/buyers-guide', priority: 0.9, changeFrequency: 'monthly', lastModified: CORE_REVISION },
    { url: BASE + '/chairs',      priority: 0.9,  changeFrequency: 'weekly',  lastModified: CHAIRS_REVISION },
    { url: BASE + '/best',        priority: 0.9,  changeFrequency: 'weekly',  lastModified: BEST_REVISION },
    { url: BASE + '/brands',      priority: 0.9,  changeFrequency: 'monthly', lastModified: BRANDS_REVISION },
    { url: BASE + '/compare',     priority: 0.85, changeFrequency: 'monthly', lastModified: COMPARE_REVISION },
    { url: BASE + '/learn',       priority: 0.85, changeFrequency: 'weekly',  lastModified: ARTICLES_REVISION },
    { url: BASE + '/how-we-review', priority: 0.6, changeFrequency: 'yearly', lastModified: CORE_REVISION },
    { url: BASE + '/about',       priority: 0.4,  changeFrequency: 'yearly',  lastModified: CORE_REVISION },
    { url: BASE + '/contact',     priority: 0.4,  changeFrequency: 'yearly',  lastModified: CORE_REVISION },
    { url: BASE + '/disclosure',  priority: 0.3,  changeFrequency: 'yearly',  lastModified: CORE_REVISION },
    { url: BASE + '/privacy-policy', priority: 0.3, changeFrequency: 'yearly', lastModified: CORE_REVISION },
    { url: BASE + '/terms',       priority: 0.3,  changeFrequency: 'yearly',  lastModified: CORE_REVISION },
  ]

  // /best/* curated picks (auto-detected from filesystem)
  const bestPages: MetadataRoute.Sitemap = getBestNavPages().map(p => ({
    url: BASE + '/best/' + p.slug,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: BEST_REVISION,
  }))

  // /compare/* head-to-head pages (auto-detected, redirects excluded)
  const comparePages: MetadataRoute.Sitemap = getCompareNavPages().map(p => ({
    url: BASE + '/compare/' + p.slug,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
    lastModified: COMPARE_REVISION,
  }))

  // /learn/* buying guide articles - each reports its own publish date
  const articles: MetadataRoute.Sitemap = PUBLISHED_ARTICLES.map(a => ({
    url: BASE + '/learn/' + a.slug,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: a.updatedAt ? new Date(a.updatedAt)
      : a.publishedAt ? new Date(a.publishedAt)
      : ARTICLES_REVISION,
  }))

  // /chairs/[id] individual chair pages
  const chairs: MetadataRoute.Sitemap = CHAIRS
    .filter(c => c.active)
    .map(c => ({
      url: BASE + '/chairs/' + c.id,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: CHAIRS_REVISION,
    }))

  // /brands/[slug] brand pages
  const brands: MetadataRoute.Sitemap = LOCAL_BRANDS.map(b => ({
    url: BASE + '/brands/' + b.slug,
    priority: 0.65,
    changeFrequency: 'monthly' as const,
    lastModified: BRANDS_REVISION,
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
