import { MetadataRoute } from 'next'
import { CHAIRS } from '@/lib/chairs'
import { LOCAL_BRANDS } from '@/lib/local-brands'
import { PUBLISHED_ARTICLES } from '@/lib/local-articles'
import { getBestNavPages, getCompareNavPages } from '@/lib/nav-scanner'

const BASE = 'https://www.massagechairfinder.com'
const NOW  = new Date()

// To add a new /best/* or /compare/* page to the sitemap AND the nav dropdown,
// just create the page directory. No changes needed here — the scanner picks it up.

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static core pages ────────────────────────────────────────────────────
  const core: MetadataRoute.Sitemap = [
    { url: BASE,              priority: 1.0,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/finder',  priority: 0.95, changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/chairs',  priority: 0.9,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/best',    priority: 0.9,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/brands',  priority: 0.9,  changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/compare', priority: 0.85, changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/learn',   priority: 0.85, changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/about',   priority: 0.4,  changeFrequency: 'yearly',  lastModified: NOW },
    { url: BASE + '/disclosure', priority: 0.3, changeFrequency: 'yearly', lastModified: NOW },
  ]

  // ── /best/* curated picks (auto-detected from filesystem) ───────────────
  const bestPages: MetadataRoute.Sitemap = getBestNavPages().map(p => ({
    url: BASE + '/best/' + p.slug,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: NOW,
  }))

  // ── /compare/* head-to-head pages (auto-detected, redirects excluded) ───
  const comparePages: MetadataRoute.Sitemap = getCompareNavPages().map(p => ({
    url: BASE + '/compare/' + p.slug,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
    lastModified: NOW,
  }))

  // ── /learn/* buying guide articles ───────────────────────────────────────
  const articles: MetadataRoute.Sitemap = PUBLISHED_ARTICLES.map(a => ({
    url: BASE + '/learn/' + a.slug,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: NOW,
  }))

  // ── /chairs/[id] individual chair pages ──────────────────────────────────
  const chairs: MetadataRoute.Sitemap = CHAIRS
    .filter(c => c.active)
    .map(c => ({
      url: BASE + '/chairs/' + c.id,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: NOW,
    }))

  // ── /brands/[slug] brand pages ───────────────────────────────────────────
  const brands: MetadataRoute.Sitemap = LOCAL_BRANDS.map(b => ({
    url: BASE + '/brands/' + b.slug,
    priority: 0.65,
    changeFrequency: 'monthly' as const,
    lastModified: NOW,
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
