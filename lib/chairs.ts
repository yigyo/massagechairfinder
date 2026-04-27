/**
 * MASTER CHAIR CATALOG
 * Single source of truth for both MassageChairFinder.com and Goodwin Massage Chairs.
 *
 * HOW TO UPDATE:
 *   1. Edit this file (add/remove/change a chair or any field).
 *   2. MCF (massagechairfinder.com) picks up the change automatically on next deploy.
 *   3. For Goodwin: run `npm run generate-goodwin` from the massagechairfinder/ directory,
 *      then follow the instructions in the generated output file.
 *
 * FIELD CONVENTIONS:
 *   - undefined   = spec unknown (AI will omit it from filtering and copy)
 *   - null        = explicitly not applicable
 *   - active: false = discontinued — never recommend, kept for historical reference
 *   - mcfActive: false = exclude from MCF (e.g. no confirmed online affiliate)
 *   - goodwinActive: false = exclude from Goodwin (e.g. physical retail only)
 */

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type Track        = 'S' | 'L' | 'SL' | 'Flex' | 'vibration' | null
export type Roller       = '2D' | '3D' | '4D' | '5D' | null
export type PriceTier    = 'entry' | 'mid' | 'upper-mid' | 'premium'
export type AffiliateTier = 'A' | 'B' | 'C' | null
export type GoodwinStatus = 'supplier' | 'affiliate' | 'none'

export interface Chair {
  // ─ Identity ──────────────────────────────────────────────────────────────
  id:    string   // stable kebab-case key, never changes
  name:  string   // display name used in AI output: "Osaki OS-Pro Admiral II"
  brand: string   // brand family: "Osaki", "Infinity", etc.

  // ─ Catalog status ────────────────────────────────────────────────────────
  active:         boolean  // false = discontinued, exclude from all recommendations
  goodwinActive:  boolean  // false = exclude from Goodwin quiz
  mcfActive:      boolean  // false = exclude from MCF finder

  // ─ Pricing ───────────────────────────────────────────────────────────────
  priceMin:        number   // lowest listed/estimated price in USD
  priceMax?:       number   // upper end if a range; omit if single price
  priceEstimated?: boolean  // true = approximate — treat as "est." in AI output
  priceNote?:      string   // shown in Goodwin catalog text: "Exclude until price confirmed"

  // ─ Commercial ────────────────────────────────────────────────────────────
  affiliateTier:       AffiliateTier    // null = no confirmed affiliate program
  affiliateRetailer?:  string           // e.g. "osakimassagechair.com"
  affiliateCommission?: string          // e.g. "5%" or "10%, 30-day cookie"
  goodwinStatus:       GoodwinStatus    // 'supplier' = direct inventory (future)
  affiliateUrl?:       string           // primary buy URL for both sites

  // ─ Goodwin quiz display ──────────────────────────────────────────────────
  // goodwinLookupKey: lowercase partial-match key used in CHAIR_URLS / CHAIR_IMAGES.
  // Must be specific enough to not collide. Order matters: list "lm-6800s" before
  // "lm-6800", "phantom medical" before "phantom", "master drive le" before "master drive ai".
  goodwinLookupKey?: string
  goodwinImageUrl?:  string  // Shopify CDN image URL (upload to Shopify Files first)

  // ─ Physical specs ────────────────────────────────────────────────────────
  track:              Track
  roller:             Roller
  trackLengthIn?:     number   // track length in inches, e.g. 49
  heightMinIn?:       number   // minimum confirmed user height in inches, e.g. 60 = 5'0"
  heightMaxIn?:       number   // maximum confirmed user height in inches, e.g. 72 = 6'0"
  weightCapacityLbs?: number   // confirmed weight limit

  // ─ Features (undefined = unknown, false = confirmed absent) ──────────────
  zeroGravity?:       boolean
  zeroGravityStages?: number   // 1 or 2 (two-stage preferred by buyers)
  spaceSaving?:       boolean
  wallClearanceIn?:   number   // inches from wall required when space-saving
  heat?:              boolean
  stretch?:           boolean
  foot?:              boolean
  calf?:              boolean
  liftAssist?:        boolean
  aiScanning?:        boolean
  whiteGlove?:        boolean
  pemf?:              boolean
  vibrationOnly?:     boolean  // true = NOT a roller chair (Human Touch Laevo)

  // ─ Body fit tags ─────────────────────────────────────────────────────────
  petiteConfirmed?:   boolean  // confirmed to fit users at or below 5'0" (60")
  tallConfirmed?:     boolean  // confirmed to fit users above 6'2" (74")
  plusSizeConfirmed?: boolean  // confirmed 300+ lb weight capacity
  madeInUSA?:         boolean
  clearance?:         boolean  // clearance/last-run model

  // ─ AI notes ──────────────────────────────────────────────────────────────
  aiNotes?: string  // rules for the AI: "DO NOT recommend for lower back/hip pain — S-track only"
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

/** Derive the buyer-facing price tier from priceMin. */
export function priceTier(chair: Chair): PriceTier {
  if (chair.priceMin < 3000) return 'entry'
  if (chair.priceMin < 5000) return 'mid'
  if (chair.priceMin < 8000) return 'upper-mid'
  return 'premium'
}

/** Format a price as a display string, e.g. "$3,999" or "$4,000–$6,500 est." */
export function formatPrice(chair: Chair): string {
  const fmt = (n: number) => '$' + n.toLocaleString('en-US')
  const base = chair.priceMax
    ? `${fmt(chair.priceMin)}-${fmt(chair.priceMax)}`
    : fmt(chair.priceMin)
  return chair.priceEstimated ? `${base} est.` : base
}

// ─── CATALOG ───────────────────────────────────────────────────────────────────

export const CHAIRS: Chair[] = [

  // ── OSAKI ──────────────────────────────────────────────────────────────────

  {
    id: 'osaki-os-champ',
    name: 'Osaki OS-Champ',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 1249,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-champ',
    goodwinLookupKey: 'osaki os-champ',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-champ-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    heightMaxIn: 72, weightCapacityLbs: 300,
    zeroGravity: true, spaceSaving: true, foot: true,
    aiNotes: 'Do not recommend to petite buyers (minimum height unknown).',
  },

  {
    id: 'osaki-os-pro-yamato',
    name: 'Osaki OS-Pro Yamato',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 1499,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairheaven.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairheaven.com/products/osaki-os-pro-yamato-massage-chair',
    goodwinLookupKey: 'osaki os-pro yamato',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-pro-yamato-massage-chair.jpg?v=1776902373',
    track: 'L', roller: '2D',
    heightMaxIn: 72, weightCapacityLbs: 220,
    zeroGravity: true, spaceSaving: true, heat: true, stretch: true, foot: true, calf: true,
    aiNotes: 'No firm pressure (2D roller). Not for plus-size buyers (220 lb max). Not for petite buyers.',
  },

  {
    id: 'osaki-os-pro-admiral-ii',
    name: 'Osaki OS-Pro Admiral II',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 3999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-pro-admiral-ii',
    goodwinLookupKey: 'osaki os-pro admiral ii',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-admiral-gray-massage-chair.webp?v=1776836197',
    track: 'SL', roller: '3D', trackLengthIn: 49,
    heightMinIn: 62, heightMaxIn: 73,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true, aiScanning: true,
    aiNotes: 'Primary avatar match. Not for petite buyers (min 62"). Not for tall buyers (max 73").',
  },

  {
    id: 'osaki-os-pro-maestro-le',
    name: 'Osaki OS-Pro Maestro LE 2.0',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 5999, priceMax: 8999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-pro-maestro-le',
    goodwinLookupKey: 'osaki os-pro maestro',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-maestro-massage-chair.webp?v=1776836390',
    track: 'SL', roller: '4D',
    zeroGravity: true, spaceSaving: true, heat: true, foot: true,
  },

  {
    id: 'osaki-os-pro-4d-duomax',
    name: 'Osaki OS-Pro 4D DuoMax',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 12999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/os-pro-4d-duomax',
    goodwinLookupKey: 'osaki os-pro 4d duomax',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-4d-duomax-massage-chair.webp?v=1776836197',
    track: 'SL', roller: '4D',
    zeroGravity: true, spaceSaving: true, heat: true, foot: true, calf: true, whiteGlove: true,
    aiNotes: 'Dual 4D roller mechanism.',
  },

  // ── KAHUNA ─────────────────────────────────────────────────────────────────

  {
    id: 'kahuna-lm-6800s',
    name: 'Kahuna LM-6800S',
    brand: 'Kahuna',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 3799,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/lm-6800s-2/',
    goodwinLookupKey: 'kahuna lm-6800s',  // MUST come before 'kahuna lm-6800' in lookup
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800S-massage-chair.jpg?v=1776902669',
    track: 'SL', roller: null, trackLengthIn: 45,
    weightCapacityLbs: 300,
    zeroGravity: true, zeroGravityStages: 3, spaceSaving: true, wallClearanceIn: 3, heat: true,
    aiNotes: 'Roller type unconfirmed — do not filter on pressure preference.',
  },

  {
    id: 'kahuna-lm-6800',
    name: 'Kahuna LM-6800',
    brand: 'Kahuna',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 3799,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/product/kahuna-massage-chair-basic-l-track-full-body-kahuna-massage-chair-lm-6800-black/',
    goodwinLookupKey: 'kahuna lm-6800',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800-massage-chair.jpg?v=1776836198',
    track: 'L', roller: null, trackLengthIn: 45,
    heightMaxIn: 72,
    zeroGravity: true, zeroGravityStages: 3, spaceSaving: true, wallClearanceIn: 3,
    heat: true, stretch: true,
    aiNotes: 'Amazon #1 bestseller. Roller type unconfirmed — do not filter on pressure preference.',
  },

  // ── INFINITY ───────────────────────────────────────────────────────────────

  {
    id: 'infinity-dynasty-4d',
    name: 'Infinity Dynasty 4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4000, priceMax: 6500,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-dynasty-4d/',
    goodwinLookupKey: 'infinity dynasty',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-dynasty-4d-massage-chair.webp?v=1776836197',
    track: 'L', roller: '4D', trackLengthIn: 49,
    heightMinIn: 60, heightMaxIn: 72, weightCapacityLbs: 300,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true,
    petiteConfirmed: true, plusSizeConfirmed: true,
    aiNotes: 'ONLY confirmed petite chair in catalog — minimum height 5\'0" confirmed.',
  },

  {
    id: 'infinity-celebrity',
    name: 'Infinity Celebrity 3D/4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 3500, priceMax: 5500, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/infinity-riage-x3-massage-chair',
    goodwinLookupKey: 'infinity celebrity',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity_celebrity_3d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '3D',
    zeroGravity: true, foot: true,
  },

  {
    id: 'infinity-evolution',
    name: 'Infinity Evolution 3D/4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4000, priceMax: 6000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-evolution-max-4d/',
    goodwinLookupKey: 'infinity evolution',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-evo-max-4d-massage-chair.webp?v=1776902757',
    track: 'L', roller: '3D', trackLengthIn: 49,
    zeroGravity: true, heat: true,
  },

  {
    id: 'infinity-genesis-max',
    name: 'Infinity Genesis Max 4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 5000, priceMax: 7000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-genesis-max/',
    goodwinLookupKey: 'infinity genesis',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-genesis-max-4d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '4D',
    zeroGravity: true,
  },

  {
    id: 'infinity-imperial-syner-d',
    name: 'Infinity Imperial Syner-D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8000, priceMax: 12000,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-imperial-syner-d-massage-chair/',
    goodwinLookupKey: 'infinity imperial',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Infinity_Imperial_syner-d-massage-chair.jpg?v=1776836198',
    track: 'Flex', roller: '4D',  // Flex-Track: SL+L hybrid
    heightMinIn: 62, heightMaxIn: 78, weightCapacityLbs: 300,
    zeroGravity: true, spaceSaving: true,
    stretch: true, foot: true, calf: true,
    tallConfirmed: true, plusSizeConfirmed: true,
    aiNotes: 'Flex-Track (SL+L hybrid). Best tall+space-saving chair — confirmed to 6\'6". 5-year warranty.',
  },

  // ── HUMAN TOUCH ────────────────────────────────────────────────────────────

  {
    id: 'human-touch-laevo-zg',
    name: 'Human Touch Laevo ZG',
    brand: 'Human Touch',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 3999, priceMax: 4499,
    affiliateTier: null,
    affiliateRetailer: 'humantouch.com',
    affiliateCommission: 'Awin / direct',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.humantouch.com/products/laevo',
    goodwinLookupKey: 'human touch laevo',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/human-touch-laevo-zg-massage-chair.webp?v=1776836198',
    track: 'vibration', roller: null,
    zeroGravity: true, heat: true, liftAssist: true,
    vibrationOnly: true,
    aiNotes: 'VIBRATION ONLY — not a roller chair. Always disclose this. Only recommend to buyers who cannot tolerate roller pressure. Never recommend to buyers seeking deep tissue or firm massage.',
  },

  // ── LURACO ─────────────────────────────────────────────────────────────────

  {
    id: 'luraco-i9-max-plus',
    name: 'Luraco i9 Max Plus',
    brand: 'Luraco',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 13490,
    affiliateTier: null,
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair',
    goodwinLookupKey: 'luraco i9',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/luraco-i9_max-massage-chair.jpg?v=1776836198',
    track: 'L', roller: null,  // Split L-Track; roller type unconfirmed
    heightMinIn: 59, heightMaxIn: 82, weightCapacityLbs: 300,
    stretch: true,
    tallConfirmed: true, plusSizeConfirmed: true, madeInUSA: true,
    aiNotes: 'Tallest chair in catalog — confirmed to 6\'10". Only USA-manufactured massage chair. 10-year warranty. Roller type unconfirmed — do not filter on pressure preference.',
  },

  // ── SYNCA ──────────────────────────────────────────────────────────────────

  {
    id: 'synca-jp970',
    name: 'Synca JP970',
    brand: 'Synca',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp970',
    goodwinLookupKey: 'synca jp970',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp970-massage-chair.webp?v=1776836197',
    track: null, roller: '4D',
    aiNotes: 'Track type unknown — cannot filter on pain location (lower back/hip/glute). Do not recommend for lower back/hip/glute pain without confirming track.',
  },

  {
    id: 'synca-jp1100',
    name: 'Synca JP1100',
    brand: 'Synca',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp1100',
    goodwinLookupKey: 'synca jp1100',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp1100-massage-chair.webp?v=1776836198',
    track: null, roller: '4D',
    zeroGravity: true, heat: true,
    aiNotes: 'Track type unknown — cannot filter on pain location.',
  },

  {
    id: 'synca-kagra',
    name: 'Synca Kagra 4D',
    brand: 'Synca',
    active: false, goodwinActive: false, mcfActive: false,
    // DISCONTINUED
    priceMin: 0,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: null, roller: '4D',
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 0,
    aiNotes: 'DISCONTINUED — do not recommend.',
  },

  // ── DAIWA ──────────────────────────────────────────────────────────────────

  {
    id: 'daiwa-legacy-4',
    name: 'Daiwa Legacy 4',
    brand: 'Daiwa',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 9500,
    affiliateTier: null,
    affiliateRetailer: 'massagechairheaven.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairheaven.com/products/daiwa-legacy-4-massage-chair',
    goodwinLookupKey: 'daiwa legacy',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/daiwa-legacy-4-massage-chair.webp?v=1776836198',
    track: 'L', roller: '3D', trackLengthIn: 49,
    heightMaxIn: 78,
    zeroGravity: true, spaceSaving: true, heat: true,
    tallConfirmed: true,
    aiNotes: 'Tall-accommodating — confirmed to 6\'6".',
  },

  // ── KYOTA ──────────────────────────────────────────────────────────────────

  {
    id: 'kyota-genki-m380',
    name: 'Kyota Genki M380',
    brand: 'Kyota',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 2999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/kyota-genki-m380-massage-chair/',
    goodwinLookupKey: 'kyota genki',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Kyota-Genki-M380-massage-chair.jpg?v=1776836198',
    track: null, roller: null,
    aiNotes: 'Wirecutter Top Pick 2024. Track type unknown — cannot filter on pain location. ZG unconfirmed.',
  },

  // ── BODYFRIEND ─────────────────────────────────────────────────────────────

  {
    id: 'bodyfriend-phantom-medical',
    name: 'Bodyfriend Phantom Medical Care 4D SL',
    brand: 'Bodyfriend',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 11000,
    affiliateTier: null,
    affiliateRetailer: 'recovathlete.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://recovathlete.com/products/bodyfriend-phantom-medical-care-massage-chair',
    goodwinLookupKey: 'bodyfriend phantom medical',  // MUST come before 'bodyfriend phantom'
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend_phantom_medical-massage-chair.webp?v=1776904169',
    track: 'SL', roller: '4D',
    pemf: true,
    aiNotes: 'Includes PEMF (pulsed electromagnetic field) therapy — mention only if buyer asks about advanced wellness tech.',
  },

  {
    id: 'bodyfriend-phantom-ii',
    name: 'Bodyfriend Phantom II',
    brand: 'Bodyfriend',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8499,
    affiliateTier: null,
    affiliateRetailer: 'recovathlete.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://recovathlete.com/products/bodyfriend-phantom-ii-massage-chair',
    goodwinLookupKey: 'bodyfriend phantom',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-phantom-ii-massage-chair.jpg?v=1776903999',
    track: null, roller: '4D',
    zeroGravity: true,
    aiNotes: 'Track type unknown — cannot filter on pain location.',
  },

  {
    id: 'bodyfriend-palace-ii',
    name: 'Bodyfriend Palace II',
    brand: 'Bodyfriend',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8099,
    affiliateTier: null,
    affiliateRetailer: 'recovathlete.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://recovathlete.com/products/bodyfriend-palace-2-massage-chair',
    goodwinLookupKey: 'bodyfriend palace',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-palace-ii-massage_chair.webp?v=1776904391',
    track: 'SL', roller: '4D',
    zeroGravity: true,
  },

  {
    id: 'bodyfriend-falcon-xd',
    name: 'Bodyfriend Falcon XD 4D',
    brand: 'Bodyfriend',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8499,
    affiliateTier: null,
    affiliateRetailer: 'amazon.com',
    affiliateCommission: 'Amazon Associates',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.amazon.com/Bodyfriend-Recliner-Patented-Technology-Acupressure/dp/B0D97TGBYS',
    goodwinLookupKey: 'bodyfriend falcon',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-falcon-massage-chair.jpg?v=1776904610',
    track: null, roller: '4D',
    zeroGravity: true,
    aiNotes: 'Track type unknown — cannot filter on pain location.',
  },

  // ── AMAMEDICS ──────────────────────────────────────────────────────────────

  {
    id: 'amamedics-hilux-4d',
    name: 'AmaMedics Hilux 4D',
    brand: 'AmaMedics',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/amamedic-hilux-4d',
    goodwinLookupKey: 'amamedics hilux',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/amamedic-hilux-massage-chair.webp?v=1776836198',
    track: 'L', roller: '4D', trackLengthIn: 53,
    zeroGravity: true, zeroGravityStages: 2, heat: true, foot: true, calf: true,
    aiNotes: 'Heated rollers (not just lumbar heat — rollers themselves are heated).',
  },

  {
    id: 'amamedics-renew-3d',
    name: 'AmaMedics Renew 3D',
    brand: 'AmaMedics',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 1299,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/amamedic-renew',
    goodwinLookupKey: 'amamedics renew',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/amamedic-renew-massage-chair.webp?v=1776904815',
    track: null, roller: '3D',
    clearance: true,
    aiNotes: 'Clearance model. Track type unknown — cannot filter on pain location.',
  },

  // ── OGAWA ──────────────────────────────────────────────────────────────────

  {
    id: 'ogawa-master-drive-le',
    name: 'Ogawa Master Drive LE 4D',
    brand: 'Ogawa',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 6000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/ogawa-master-drive-le-massage-chair',
    goodwinLookupKey: 'ogawa master drive le',  // MUST come before 'ogawa master drive ai'
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Ogawa_Master_Drive_LE_4d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '4D', trackLengthIn: 54,
    zeroGravity: true, zeroGravityStages: 2,
  },

  {
    id: 'ogawa-master-drive-ai',
    name: 'Ogawa Master Drive AI 2.0 4D',
    brand: 'Ogawa',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 7000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/ogawa-master-drive-ai-2-0-massage-chair',
    goodwinLookupKey: 'ogawa master drive ai',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-master-drive-ai-2_0-4d-massage-chair.jpg?v=1776836198',
    track: 'L', roller: '4D', trackLengthIn: 54,
    zeroGravity: true, aiScanning: true,
  },

  {
    id: 'ogawa-active-xl',
    name: 'Ogawa Active XL 3D',
    brand: 'Ogawa',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/ogawa-active-xl-3d-massage-chair',
    goodwinLookupKey: 'ogawa active xl',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-active-xl-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    zeroGravity: true, zeroGravityStages: 2, stretch: true,
  },

  {
    id: 'ogawa-active-l',
    name: 'Ogawa Active L',
    brand: 'Ogawa',
    active: false, goodwinActive: false, mcfActive: false,
    // DISCONTINUED
    priceMin: 3500, priceEstimated: true,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: 'SL', roller: '2D',
    zeroGravity: true, heat: true,
    aiNotes: 'DISCONTINUED — do not recommend.',
  },

  // ── INADA ──────────────────────────────────────────────────────────────────

  {
    id: 'inada-robo-4d',
    name: 'Inada Robo 4D',
    brand: 'Inada',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/inada-robo-massage-chair',
    goodwinLookupKey: 'inada robo',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/inada-robo-4d-massage-chair.webp?v=1776836197',
    track: 'S', roller: '4D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'S-TRACK ONLY. DO NOT recommend for lower back, hip, or glute pain. Only recommend for neck, shoulder, or upper-back focused buyers.',
  },

  {
    id: 'inada-dreamwave',
    name: 'Inada DreamWave',
    brand: 'Inada',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 6999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/inada-dreamwave-massage-chair',
    goodwinLookupKey: 'inada dreamwave',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/inada-dreamwave-massage-chair.webp?v=1776836198',
    track: null, roller: null,
    aiScanning: true,
    aiNotes: 'Track and roller type unknown — cannot filter on pain location or pressure preference.',
  },

  // ── JPMEDICS ───────────────────────────────────────────────────────────────

  {
    id: 'jpmedics-kumo-4d',
    name: 'JPMedics Kumo 4D',
    brand: 'JPMedics',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8499,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/jpmedics-kumo-4d-massage-chair',
    goodwinLookupKey: 'jpmedics kumo',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kumo-4d-massage-chair.webp?v=1776836197',
    track: 'L', roller: '4D',
    madeInUSA: false,  // Made in Japan
    aiNotes: 'Made in Japan. Highly regarded in the $8,000–$9,000 range.',
  },

  {
    id: 'jpmedics-kaze-duo',
    name: 'JPMedics KaZe Duo',
    brand: 'JPMedics',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 12999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/collections/jpmedics',
    goodwinLookupKey: 'jpmedics kaze',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kaze-duo-massage-chair.webp?v=1776836198',
    track: null, roller: '4D',
    aiNotes: 'Track unknown. Dual 4D roller mechanism. URL is a collection page — update when dedicated product page is confirmed.',
  },

  {
    id: 'jpmedics-kozue-5d',
    name: 'JPMedics Kozue 5D',
    brand: 'JPMedics',
    active: true, goodwinActive: true, mcfActive: false,
    // Goodwin only — no confirmed online affiliate retailer found for MCF
    priceMin: 14999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateUrl: undefined,
    track: null, roller: '5D',
    aiNotes: 'Only 5D chair in catalog. No confirmed affiliate URL — omit from MCF. Update affiliateUrl when affiliate confirmed.',
  },

  // ── PANASONIC ──────────────────────────────────────────────────────────────

  {
    id: 'panasonic-mak1',
    name: 'Panasonic MAK1',
    brand: 'Panasonic',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8000, priceEstimated: true,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairs.com',
    affiliateCommission: '8%, 30-day cookie (ShareASale)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairs.com/products/panasonic-mak1-massage-chair',
    goodwinLookupKey: 'panasonic mak1',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/panasonic-mak1-massage-chair.webp?v=1776958938',
    track: null, roller: '4D',
    heat: true, foot: true, aiScanning: true,
    aiNotes: 'Track unknown — cannot filter on pain location.',
  },

  {
    id: 'panasonic-maj7',
    name: 'Panasonic MAJ7 Real Pro Ultra',
    brand: 'Panasonic',
    active: false, goodwinActive: false, mcfActive: false,
    // DISCONTINUED
    priceMin: 5000, priceMax: 7000, priceEstimated: true,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: null, roller: '3D', aiScanning: true,
    aiNotes: 'DISCONTINUED — do not recommend.',
  },

  {
    id: 'panasonic-ma73',
    name: 'Panasonic MA73 Real Pro 3D Prestige',
    brand: 'Panasonic',
    active: false, goodwinActive: false, mcfActive: false,
    // DISCONTINUED
    priceMin: 4000, priceMax: 6000, priceEstimated: true,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: null, roller: '3D',
    aiNotes: 'DISCONTINUED — do not recommend.',
  },

  // ── TITAN ──────────────────────────────────────────────────────────────────

  {
    id: 'titan-3d-prestige',
    name: 'Titan 3D Prestige',
    brand: 'Titan',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 4999,
    affiliateTier: 'A',
    affiliateRetailer: 'titanchair.com',
    affiliateCommission: 'VigLink / FlexOffers',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://titanchair.com/products/titan-3d-prestige',
    goodwinLookupKey: 'titan 3d prestige',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/titan-3d-prestige-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    zeroGravity: true, foot: true,
  },

  {
    id: 'titan-3d-premium',
    name: 'Titan 3D Premium',
    brand: 'Titan',
    active: false, goodwinActive: false, mcfActive: false,
    // No dedicated product page confirmed
    priceMin: 0,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: null, roller: '3D',
    zeroGravity: true, heat: true,
    aiNotes: 'No dedicated product page confirmed — do not recommend.',
  },

  // ── REAL RELAX (Goodwin Tier C fallback only — never surface in MCF) ────────

  {
    id: 'real-relax-favor-06',
    name: 'Real Relax Favor-06 2026',
    brand: 'Real Relax',
    active: true, goodwinActive: true, mcfActive: false,
    priceMin: 1500, priceMax: 2500, priceEstimated: true,
    affiliateTier: 'C',
    affiliateRetailer: 'amazon.com',
    affiliateCommission: 'Amazon Associates',
    goodwinStatus: 'affiliate',
    affiliateUrl: undefined,
    track: 'SL', roller: '3D',
    zeroGravity: true,
    aiNotes: 'Tier C. Surface in Goodwin ONLY when no Tier A or B match exists. Never recommend in MCF.',
  },

  {
    id: 'real-relax-ps6500',
    name: 'Real Relax PS6500 4D 2026',
    brand: 'Real Relax',
    active: true, goodwinActive: true, mcfActive: false,
    priceMin: 3000, priceMax: 4500, priceEstimated: true,
    affiliateTier: 'C',
    affiliateRetailer: 'amazon.com',
    affiliateCommission: 'Amazon Associates',
    goodwinStatus: 'affiliate',
    affiliateUrl: undefined,
    track: 'SL', roller: '4D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Tier C. Surface in Goodwin ONLY when no Tier A or B match exists. Never recommend in MCF.',
  },

  {
    id: 'real-relax-ps3100',
    name: 'Real Relax PS3100 Premium',
    brand: 'Real Relax',
    active: true, goodwinActive: true, mcfActive: false,
    priceMin: 2000, priceMax: 3000, priceEstimated: true,
    affiliateTier: 'C',
    affiliateRetailer: 'amazon.com',
    affiliateCommission: 'Amazon Associates',
    goodwinStatus: 'affiliate',
    affiliateUrl: undefined,
    track: 'SL', roller: '3D',
    zeroGravity: true, foot: true,
    aiNotes: 'Tier C. Surface in Goodwin ONLY when no Tier A or B match exists. Never recommend in MCF.',
  },

  // ── COZZIA (Physical retail only — no online purchase available) ───────────

  {
    id: 'cozzia-qi-xe-pro',
    name: 'Cozzia Qi XE Pro',
    brand: 'Cozzia',
    active: true, goodwinActive: false, mcfActive: false,
    // Physical retail only — no online affiliate purchase available
    priceMin: 9500, priceEstimated: true,
    affiliateTier: null, goodwinStatus: 'none',
    affiliateUrl: undefined,
    track: 'L', roller: '4D', trackLengthIn: 53,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 5,
    heat: true, foot: true, aiScanning: true,
    aiNotes: 'PHYSICAL RETAIL ONLY — no online purchase available. Do not recommend until an online affiliate is confirmed.',
  },

  {
    id: 'cozzia-qi-xe-pro-duo',
    name: 'Cozzia Qi XE Pro Duo',
    brand: 'Cozzia',
    active: false, goodwinActive: false, mcfActive: false,
    // Price unknown, physical retail
    priceMin: 0,
    affiliateTier: null, goodwinStatus: 'none',
    track: 'L', roller: '4D',
    zeroGravity: true, foot: true, aiScanning: true,
    aiNotes: 'Price unknown and physical retail only — do not recommend.',
  },

]

// ─── CONVENIENCE EXPORTS ───────────────────────────────────────────────────────

/** All chairs active in MCF, ordered by priceMin. */
export const MCF_CHAIRS = CHAIRS
  .filter(c => c.active && c.mcfActive !== false)
  .sort((a, b) => a.priceMin - b.priceMin)

/** All chairs active in Goodwin, ordered by priceMin. */
export const GOODWIN_CHAIRS = CHAIRS
  .filter(c => c.active && c.goodwinActive !== false)
  .sort((a, b) => a.priceMin - b.priceMin)
