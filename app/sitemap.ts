import { MetadataRoute } from 'next'
import { CHAIRS } from '@/lib/chairs'
import { LOCAL_BRANDS } from '@/lib/local-brands'
import { PUBLISHED_ARTICLES } from '@/lib/local-articles'

const BASE = 'https://www.massagechairfinder.com'
const NOW  = new Date()

// Static /best/* pages — all have curated picks content
const BEST_SLUGS = [
  '3000-to-5000',
  'arthritis',
  'athlete-recovery',
  'heavy-duty',
  'lower-back-pain',
  'neck-shoulders',
  'office-workers',
  'petite-buyers',
  'premium',
  'sciatica',
  'seniors',
  'small-spaces',
  'tall-people',
  'under-10000',
  'under-2000',
  'under-3000',
  'under-5000',
]

// Static /compare/* pages — excludes redirect-only pages
const COMPARE_SLUGS = [
  'amamedics-hilux-4d-vs-titan-pro-vigor-4d',
  'bodyfriend-phantom-ii-vs-bodyfriend-falcon-xd',
  'daiwa-relax-2-zero-3d-vs-synca-jp3000',
  'inada-dreamwave-vs-jpmedics-kumo-4d',
  'infinity-dynasty-4d-vs-infinity-genesis-max-4d',
  'infinity-evo-max-vs-jpmedics-kumo-4d',
  'kahuna-sm-7300s-vs-relaxonchair-yukon-4d',
  'kyota-yugana-m780-vs-osaki-os-pro-maestro-le',
  'luraco-i9-max-plus-vs-panasonic-mak1',
  'medical-breakthrough-6-vs-kahuna-hm-078',
  'ogawa-og6400-vs-titan-pro-vigor-4d',
  'osaki-os-pro-admiral-ii-vs-kahuna-lm-6800s',
  'relaxonchair-yukon-4d-vs-rockertech-sensation-4d',
  'rockertech-bliss-vs-medical-breakthrough-6-plus',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static core pages ────────────────────────────────────────────────────
  const core: MetadataRoute.Sitemap = [
    { url: BASE,           priority: 1.0,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/finder',  priority: 0.95, changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/chairs',  priority: 0.9,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/best',    priority: 0.9,  changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/brands',  priority: 0.9,  changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/compare', priority: 0.85, changeFrequency: 'monthly', lastModified: NOW },
    { url: BASE + '/learn',   priority: 0.85, changeFrequency: 'weekly',  lastModified: NOW },
    { url: BASE + '/about',   priority: 0.4,  changeFrequency: 'yearly',  lastModified: NOW },
    { url: BASE + '/disclosure', priority: 0.3, changeFrequency: 'yearly', lastModified: NOW },
  ]

  // ── /best/* curated picks pages ──────────────────────────────────────────
  const bestPages: MetadataRoute.Sitemap = BEST_SLUGS.map(slug => ({
    url: BASE + '/best/' + slug,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: NOW,
  }))

  // ── /compare/* head-to-head pages ────────────────────────────────────────
  const comparePages: MetadataRoute.Sitemap = COMPARE_SLUGS.map(slug => ({
    url: BASE + '/compare/' + slug,
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
