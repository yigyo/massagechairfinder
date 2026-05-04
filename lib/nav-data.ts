// nav-data.ts — single source of truth for navigable content pages
//
// HOW TO ADD A NEW PAGE:
//   Best For:  add one { label, slug } entry to BEST_NAV
//   Compare:   add one { label, slug } entry to COMPARE_NAV
//   Both the top-nav dropdown AND sitemap.xml update automatically on next deploy.
//
// Rules:
//   - Only add pages that have real content (not redirect stubs)
//   - Keep each array alphabetically sorted by label
//   - slug must match the folder name under app/best/ or app/compare/

export type NavPage = { label: string; slug: string }

// ── Best For pages ─────────────────────────────────────────────────────────
// Each entry maps to app/best/[slug]/page.tsx
export const BEST_NAV: NavPage[] = [
  { label: '$3,000–5,000',      slug: '3000-to-5000' },
  { label: 'Arthritis Relief',    slug: 'arthritis' },
  { label: 'Athlete Recovery',    slug: 'athlete-recovery' },
  { label: 'Heavy-Duty',          slug: 'heavy-duty' },
  { label: 'Lower Back Pain',     slug: 'lower-back-pain' },
  { label: 'Neck and Shoulders',  slug: 'neck-shoulders' },
  { label: 'Office Workers',      slug: 'office-workers' },
  { label: 'Petite Buyers',       slug: 'petite-buyers' },
  { label: 'Premium ($5,000+)',   slug: 'premium' },
  { label: 'Sciatica',            slug: 'sciatica' },
  { label: 'Seniors',             slug: 'seniors' },
  { label: 'Small Spaces',        slug: 'small-spaces' },
  { label: 'Tall People',         slug: 'tall-people' },
  { label: 'Under $10,000',       slug: 'under-10000' },
  { label: 'Under $2,000',        slug: 'under-2000' },
  { label: 'Under $3,000',        slug: 'under-3000' },
  { label: 'Under $5,000',        slug: 'under-5000' },
]

// ── Compare pages ──────────────────────────────────────────────────────────
// Each entry maps to app/compare/[slug]/page.tsx
// Excluded: synca-jp970-vs-kahuna-lm-6800 (redirect stub only)
export const COMPARE_NAV: NavPage[] = [
  { label: 'AmaMedics Hilux 4D vs Titan Pro Vigor 4D',            slug: 'amamedics-hilux-4d-vs-titan-pro-vigor-4d' },
  { label: 'Bodyfriend Phantom II vs Bodyfriend Falcon XD',        slug: 'bodyfriend-phantom-ii-vs-bodyfriend-falcon-xd' },
  { label: 'Daiwa Relax 2 Zero 3D vs Synca JP3000',               slug: 'daiwa-relax-2-zero-3d-vs-synca-jp3000' },
  { label: 'Inada DreamWave vs JPMedics Kumo 4D',                 slug: 'inada-dreamwave-vs-jpmedics-kumo-4d' },
  { label: 'Infinity Dynasty 4D vs Infinity Genesis Max 4D',      slug: 'infinity-dynasty-4d-vs-infinity-genesis-max-4d' },
  { label: 'Infinity Evo Max vs JPMedics Kumo 4D',                slug: 'infinity-evo-max-vs-jpmedics-kumo-4d' },
  { label: 'Kahuna SM-7300S vs Relax On Chair Yukon 4D',          slug: 'kahuna-sm-7300s-vs-relaxonchair-yukon-4d' },
  { label: 'Kyota Yugana M780 vs Osaki OS-Pro Maestro LE',        slug: 'kyota-yugana-m780-vs-osaki-os-pro-maestro-le' },
  { label: 'Luraco i9 Max Plus vs Panasonic MAK1',                slug: 'luraco-i9-max-plus-vs-panasonic-mak1' },
  { label: 'Medical Breakthrough 6 vs Kahuna HM-078',             slug: 'medical-breakthrough-6-vs-kahuna-hm-078' },
  { label: 'Ogawa OG6400 vs Titan Pro Vigor 4D',                  slug: 'ogawa-og6400-vs-titan-pro-vigor-4d' },
  { label: 'Osaki OS-Pro Admiral II vs Kahuna LM-6800S',          slug: 'osaki-os-pro-admiral-ii-vs-kahuna-lm-6800s' },
  { label: 'Relax On Chair Yukon 4D vs RockerTech Sensation 4D',  slug: 'relaxonchair-yukon-4d-vs-rockertech-sensation-4d' },
  { label: 'RockerTech Bliss vs Medical Breakthrough 6 Plus',     slug: 'rockertech-bliss-vs-medical-breakthrough-6-plus' },
]
