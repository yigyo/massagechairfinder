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
    priceMin: 1299,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-champ',
    goodwinLookupKey: 'osaki os-champ',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-champ-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '2D',
    heightMaxIn: 72, weightCapacityLbs: 260,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 9, heat: true, foot: true, calf: true,
    aiNotes: 'Heat confirmed (lumbar heating section on retailer page). Do not recommend to petite buyers (minimum height unknown).',
  },

  {
    id: 'osaki-os-pro-yamato',
    name: 'Osaki OS-Pro Yamato',
    brand: 'Osaki',
    active: true, goodwinActive: false, mcfActive: false,  // OOS confirmed 2026-05-01
    priceMin: 2999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairheaven.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairheaven.com/products/osaki-os-pro-yamato-massage-chair',
    goodwinLookupKey: 'osaki os-pro yamato',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-pro-yamato-massage-chair.jpg?v=1776902373',
    track: 'L', roller: '2D',
    heightMaxIn: 72, weightCapacityLbs: 220,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 4, heat: true, stretch: true, foot: true, calf: true, aiScanning: true,
    aiNotes: 'No firm pressure (2D roller). Not for plus-size buyers (220 lb max). Not for petite buyers.',
  },

  {
    id: 'osaki-os-pro-admiral-ii',
    name: 'Osaki OS-Pro Admiral II',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 2999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-pro-admiral-ii',
    goodwinLookupKey: 'osaki os-pro admiral ii',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-admiral-gray-massage-chair.webp?v=1776836197',
    track: 'SL', roller: '3D', trackLengthIn: 49,
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 270,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true, aiScanning: true,
    aiNotes: 'Primary avatar match. Not for petite buyers (min 62"). Not for tall buyers (max 73").',
  },

  {
    id: 'osaki-os-pro-maestro-le',
    name: 'Osaki OS-Pro Maestro LE 2.0',
    brand: 'Osaki',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 8999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/osaki-os-pro-maestro-le',
    goodwinLookupKey: 'osaki os-pro maestro',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-maestro-massage-chair.webp?v=1776836390',
    track: 'SL', roller: '4D',
    weightCapacityLbs: 260,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 5,
    heat: true, foot: true, calf: true, aiScanning: true,
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
    weightCapacityLbs: 330,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 5.5,
    heat: true, foot: true, calf: true, whiteGlove: true, aiScanning: true,
    plusSizeConfirmed: true,
    aiNotes: 'Dual 4D+3D roller mechanism (Duo Mech). SL Flex Track variant. Intelligent health detection (heart rate, blood oxygen, fatigue index). 330 lb weight capacity.',
  },

  // ── KAHUNA ─────────────────────────────────────────────────────────────────

  {
    id: 'kahuna-lm-6800s',
    name: 'Kahuna LM-6800S',
    brand: 'Kahuna',
    active: true, goodwinActive: false, mcfActive: false,  // OOS confirmed 2026-05-01
    priceMin: 2499,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/lm-6800s-2/',
    goodwinLookupKey: 'kahuna lm-6800s',  // MUST come before 'kahuna lm-6800' in lookup
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800S-massage-chair.jpg?v=1776902669',
    track: 'SL', roller: '2D', trackLengthIn: 45,
    heightMinIn: 60, heightMaxIn: 72, weightCapacityLbs: 200,
    zeroGravity: true, zeroGravityStages: 3, spaceSaving: true, wallClearanceIn: 3, heat: true,
    foot: true, calf: true, stretch: true, aiScanning: true,
    aiNotes: 'SL-Track. 2D roller. Verified from kahunachair.com April 2026.',
  },

  {
    id: 'kahuna-lm-6800',
    name: 'Kahuna LM-6800',
    brand: 'Kahuna',
    active: true, goodwinActive: false, mcfActive: false,  // OOS confirmed 2026-05-01
    priceMin: 3799,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/product/kahuna-massage-chair-basic-l-track-full-body-kahuna-massage-chair-lm-6800-black/',
    goodwinLookupKey: 'kahuna lm-6800',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800-massage-chair.jpg?v=1776836198',
    track: 'L', roller: '2D', trackLengthIn: 45,
    heightMinIn: 60, heightMaxIn: 72, weightCapacityLbs: 200,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 3,
    heat: true, foot: true, calf: true, stretch: true,
    aiNotes: 'Top-selling L-Track entry chair. 2D roller. Verified from kahunachair.com April 2026.',
  },

  // ── INFINITY ───────────────────────────────────────────────────────────────

  {
    id: 'infinity-dynasty-4d',
    name: 'Infinity Dynasty 4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 11999,
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
    priceMin: 7999,  // price confirmed 2026-04-27
    affiliateTier: null,  // MCW sold out; moved to emassagechair.com — affiliate program unconfirmed
    affiliateRetailer: 'emassagechair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://emassagechair.com/products/infinity-celebrity-3d-4d-massage-chair',
    goodwinLookupKey: 'infinity celebrity',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity_celebrity_3d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '3D',
    heightMinIn: 54, heightMaxIn: 76, weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'Formerly known as Riage X3. Affiliate program at emassagechair.com not yet confirmed. Verified specs April 2026.',
  },

  {
    id: 'infinity-evolution',
    name: 'Infinity Evo Max 4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 10999,  // verified 2026-04-27 (on sale from $12,999 MSRP)
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-evolution-max-4d/',
    goodwinLookupKey: 'infinity evolution',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-evo-max-4d-massage-chair.webp?v=1776902757',
    track: 'L', roller: '4D', trackLengthIn: 49,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true, stretch: true,
  },

  {
    id: 'infinity-genesis-max',
    name: 'Infinity Genesis Max 4D',
    brand: 'Infinity',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 9299,  // verified 2026-04-27 (on sale from $12,999 MSRP)
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairstore.com',
    affiliateCommission: '5-10% (Impact)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairstore.com/infinity-genesis-max/',
    goodwinLookupKey: 'infinity genesis',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-genesis-max-4d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '4D', trackLengthIn: 49,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true, stretch: true,
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
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2, heat: true,
    foot: true, calf: true, stretch: true, aiScanning: true,
    tallConfirmed: true, plusSizeConfirmed: true,
    aiNotes: 'Flex-Track (SL+L hybrid). Best tall+space-saving chair, confirmed to 6\'6". 5-year warranty. Verified from massagechairstore.com April 2026.',
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
    weightCapacityLbs: 285,
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
    priceMin: 11990,  // updated from 13490, confirmed 2026-05-01
    affiliateTier: null,
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair',
    goodwinLookupKey: 'luraco i9',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/luraco-i9_max-massage-chair.jpg?v=1776836198',
    track: 'L', roller: '3D',
    heightMinIn: 59, heightMaxIn: 82, weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true, calf: true, stretch: true, aiScanning: true,
    tallConfirmed: true, plusSizeConfirmed: true, madeInUSA: true,
    aiNotes: 'Tallest chair in catalog, confirmed to 6\'10". Only USA-manufactured massage chair. 10-year warranty. Split L-Track with 3D roller. Verified April 2026.',
  },

  // ── SYNCA ──────────────────────────────────────────────────────────────────

  {
    id: 'synca-jp970',
    name: 'Synca JP970',
    brand: 'Synca',
    active: true, goodwinActive: false, mcfActive: false,  // removed from syncamassagechair.com; no approved retailer URL 2026-05-01
    priceMin: 4999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp970',
    goodwinLookupKey: 'synca jp970',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp970-massage-chair.webp?v=1776836197',
    track: 'S', roller: '4D',
    heightMinIn: 60, heightMaxIn: 75, weightCapacityLbs: 285,
    heat: true, foot: true, calf: true, aiScanning: true,
    aiNotes: 'S-Track. 4D roller. Verified from syncamassagechair.com April 2026.',
  },

  {
    id: 'synca-jp1100',
    name: 'Synca JP1100',
    brand: 'Synca',
    active: false, goodwinActive: false, mcfActive: false,  // discontinued confirmed 2026-05-01
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp1100',
    goodwinLookupKey: 'synca jp1100',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp1100-massage-chair.webp?v=1776836198',
    track: 'S', roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: false, heat: true, foot: true, aiScanning: true,
    plusSizeConfirmed: true,
    aiNotes: 'S-Track. 4D roller. No zero gravity. 300 lb capacity. Verified from syncamassagechair.com April 2026.',
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
    heightMinIn: 56, heightMaxIn: 78, weightCapacityLbs: 300,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 3.25, heat: true,
    foot: true, calf: true, aiScanning: true,
    tallConfirmed: true, plusSizeConfirmed: true,
    aiNotes: 'Tall-accommodating, confirmed to 6\'6". 300 lb capacity. Verified from massagechairheaven.com April 2026.',
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
    track: 'L', roller: '2D',
    heightMaxIn: 77, weightCapacityLbs: 330,
    zeroGravity: true, heat: true, foot: true, calf: true,
    plusSizeConfirmed: true,
    aiNotes: 'Wirecutter Top Pick 2024. L-Track. 2D roller. 330 lb capacity. Verified from massagechairstore.com April 2026.',
  },

  // ── BODYFRIEND ─────────────────────────────────────────────────────────────

  {
    id: 'bodyfriend-phantom-medical',
    name: 'Bodyfriend Phantom Medical Care 4D SL',
    brand: 'Bodyfriend',
    active: true, goodwinActive: false, mcfActive: false,  // OOS 2026-05-01; recovathlete.com not on approved retailer list
    priceMin: 11000,
    affiliateTier: null,
    affiliateRetailer: 'recovathlete.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://recovathlete.com/products/bodyfriend-phantom-medical-care-massage-chair',
    goodwinLookupKey: 'bodyfriend phantom medical',  // MUST come before 'bodyfriend phantom'
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend_phantom_medical-massage-chair.webp?v=1776904169',
    track: 'SL', roller: '4D',
    zeroGravity: true, spaceSaving: true, heat: true, foot: true, calf: true,
    pemf: true,
    aiNotes: 'Includes PEMF (pulsed electromagnetic field) therapy. Mention only if buyer asks about advanced wellness tech.',
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
    track: 'SL', roller: '4D',
    weightCapacityLbs: 335,
    zeroGravity: true, heat: true, foot: true, calf: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-Track. 335 lb capacity. Verified from recovathlete.com April 2026.',
  },

  {
    id: 'bodyfriend-palace-ii',
    name: 'Bodyfriend Palace II',
    brand: 'Bodyfriend',
    active: true, goodwinActive: false, mcfActive: false,  // OOS 2026-05-01; recovathlete.com not on approved retailer list
    priceMin: 8099,
    affiliateTier: null,
    affiliateRetailer: 'recovathlete.com',
    affiliateCommission: '5%',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://recovathlete.com/products/bodyfriend-palace-2-massage-chair',
    goodwinLookupKey: 'bodyfriend palace',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-palace-ii-massage_chair.webp?v=1776904391',
    track: 'SL', roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true, calf: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-Track. 300 lb capacity. Verified from recovathlete.com April 2026.',
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
    track: 'SL', roller: '4D',
    weightCapacityLbs: 265,
    zeroGravity: true, heat: true, foot: true, calf: true, stretch: true,
    aiNotes: 'SL-Track. 4D roller. Verified from Amazon product listing April 2026.',
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
    track: 'SL', roller: '4D', trackLengthIn: 53,
    heightMinIn: 59, heightMaxIn: 79, weightCapacityLbs: 270,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 4.7, heat: true,
    foot: true, calf: true, stretch: true,
    tallConfirmed: true,
    aiNotes: 'Heated rollers (not just lumbar heat - rollers themselves are heated). SL-Track confirmed from osakimassagechair.com April 2026.',
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
    track: 'SL', roller: '3D',
    weightCapacityLbs: 250,
    zeroGravity: true, zeroGravityStages: 3, spaceSaving: true, wallClearanceIn: 4,
    heat: true, foot: true, calf: true, aiScanning: true,
    clearance: true,
    aiNotes: 'Clearance model. SL-track confirmed (retailer listing). Features verified from product page April 2026.',
  },

  // ── OGAWA ──────────────────────────────────────────────────────────────────

  {
    id: 'ogawa-master-drive-le',
    name: 'Ogawa Master Drive LE 4D',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: false,  // OOS everywhere; easymassagechair.com not approved
    priceMin: 9999,  // verified 2026-04-27
    affiliateTier: null,  // MCW sold out; easymassagechair.com program unconfirmed
    affiliateRetailer: 'easymassagechair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.easymassagechair.com/ogawa-master-drive-le-4d-sl-track-massage-chair-2-stage-zero-gravity-recline-on-demand-voice-control.html',
    goodwinLookupKey: 'ogawa master drive le',  // MUST come before 'ogawa master drive ai'
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Ogawa_Master_Drive_LE_4d-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '4D',  // track confirmed SL (was incorrectly L)
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 320,
    zeroGravity: true, zeroGravityStages: 2, heat: true,
    aiNotes: "SL-Track confirmed. Height 5'2\"-6'1\". Weight cap 320 lbs. URL moved from MCW (sold out) to easymassagechair.com.",
  },

  {
    id: 'ogawa-master-drive-ai',
    name: 'Ogawa Master Drive AI 2.0 4D',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: false,  // OOS everywhere; easymassagechair.com not approved
    priceMin: 12999,  // verified 2026-04-27
    affiliateTier: null,  // MCW sold out; easymassagechair.com program unconfirmed
    affiliateRetailer: 'easymassagechair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.easymassagechair.com/ogawa-master-drive-ai-4d-sl-track-massage-chair-m5-gen-microprocessors-zero-gravity-recline.html',
    goodwinLookupKey: 'ogawa master drive ai',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-master-drive-ai-2_0-4d-massage-chair.jpg?v=1776836198',
    track: 'SL', roller: '4D',  // track confirmed SL (was incorrectly L)
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 320,
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: "SL-Track confirmed. Height 5'2\"-6'1\". Weight cap 320 lbs. Alexa voice control. URL moved from MCW (sold out) to easymassagechair.com.",
  },

  {
    id: 'ogawa-active-xl',
    name: 'Ogawa Active XL 3D',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: false,  // OOS everywhere; easymassagechair.com not approved
    priceMin: 5899,  // verified 2026-04-27
    affiliateTier: null,  // MCW sold out; easymassagechair.com program unconfirmed
    affiliateRetailer: 'easymassagechair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.easymassagechair.com/ogawa-active-xl-3d-massage-chair-zero-gravity-air-compression-technology.html',
    goodwinLookupKey: 'ogawa active xl',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-active-xl-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    heightMinIn: 60, heightMaxIn: 76, weightCapacityLbs: 320,
    zeroGravity: true, zeroGravityStages: 2, heat: true, stretch: true,
    aiNotes: "Confirmed height 5'0\"-6'4\". Weight cap 320 lbs. Designed for larger frames. URL moved from MCW (sold out) to easymassagechair.com.",
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
    active: true, goodwinActive: false, mcfActive: false,  // OOS confirmed 2026-05-01
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
    active: true, goodwinActive: false, mcfActive: false,  // OOS confirmed 2026-05-01
    priceMin: 6999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/inada-dreamwave-massage-chair',
    goodwinLookupKey: 'inada dreamwave',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/inada-dreamwave-massage-chair.webp?v=1776836198',
    track: 'S', roller: '3D',
    heightMinIn: 60, heightMaxIn: 77, weightCapacityLbs: 300,
    heat: true, stretch: true, aiScanning: true,
    aiNotes: `30" S-Track. 3D Quad Style Roller (3 depth levels). Heat: lumbar and seat. Full-body stretch. 5'0"-6'5", 300 lbs.`,
  },

  // ── JPMEDICS ───────────────────────────────────────────────────────────────

  {
    id: 'jpmedics-kumo-4d',
    name: 'JPMedics Kumo 4D',
    brand: 'JPMedics',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 10999,  // updated from 8499, confirmed 2026-05-01
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/jpmedics-kumo-4d-massage-chair',
    goodwinLookupKey: 'jpmedics kumo',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kumo-4d-massage-chair.webp?v=1776836197',
    track: 'L', roller: '4D',
    heightMaxIn: 75, weightCapacityLbs: 320,
    zeroGravity: true, heat: true, foot: true, calf: true, stretch: true, aiScanning: true,
    plusSizeConfirmed: true,
    madeInUSA: false,  // Made in Japan
    aiNotes: 'Made in Japan. Highly regarded in the $8,000-$9,000 range. 320 lb capacity. Verified from massagechairwarehouse.com April 2026.',
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
    affiliateUrl: 'https://massagechairwarehouse.com/products/jpmedics-kumo',  // direct product page, confirmed in-stock 2026-05-01
    goodwinLookupKey: 'jpmedics kaze',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kaze-duo-massage-chair.webp?v=1776836198',
    track: 'L', roller: '4D',
    heightMinIn: 60, heightMaxIn: 75, weightCapacityLbs: 320,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 1, heat: true, foot: true, calf: true,
    plusSizeConfirmed: true,
    aiNotes: 'L-Track. Dual 4D roller mechanism. 320 lb capacity. Verified from massagechairwarehouse.com April 2026.',
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
    priceMin: 14499,  // verified 2026-04-27
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairs.com',
    affiliateCommission: '8%, 30-day cookie (ShareASale)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairs.com/products/panasonic-mak1-massage-chair',
    goodwinLookupKey: 'panasonic mak1',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/panasonic-mak1-massage-chair.webp?v=1776958938',
    track: 'S', roller: '4D',  // S-Track confirmed from massagechairs.com spec sheet
    heightMinIn: 56, heightMaxIn: 74, weightCapacityLbs: 264,
    zeroGravity: false,  // confirmed NO zero gravity
    heat: true, foot: true, calf: true, stretch: true, aiScanning: true,
    aiNotes: "S-TRACK ONLY — do not recommend for lower back/hip/glute pain. NO zero gravity. Weight cap 264 lbs (not 300). Height 4'8\"-6'2\". Infrared heated rollers.",
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
    heightMaxIn: 75, weightCapacityLbs: 260,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 1, heat: true,
    foot: true, calf: true, stretch: true,
    aiNotes: 'SL-Track. Space-saving (1" clearance). Verified from titanchair.com April 2026.',
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
