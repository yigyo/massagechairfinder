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
// Roller dimension type -- add new values here as industry marketing terms evolve.
// 6D = dual 3D roller systems; 8D = dual 4D roller systems; further values may emerge.
export type Roller       = '2D' | '3D' | '4D' | '5D' | '6D' | '8D' | null
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
  inStock?:        boolean  // undefined = in stock; false = currently OOS (chair may return)
  alternativeIds?: string[] // IDs of recommended alternatives shown on OOS/discontinued pages

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
  imageUrl?:         string  // Primary product image URL (affiliate retailer CDN)
  imageWhiteBg?:     boolean // false = lifestyle/room shot (no white container); omit = assume white bg
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

  // -- Social proof -------------------------------------------------------------
    reviewRating?:      number    // e.g. 4.8 -- aggregate star rating
    reviewCount?:       number    // e.g. 312 -- total review count at source
    reviewSource?:      string    // domain only, e.g. "amazon.com"
    awards?:            string[]  // e.g. ["Wirecutter Top Pick 2024"]
    buyerThemes?:       string[]  // 2-4 synthesized recurring themes (no verbatim quotes)
    expertEndorsement?: string    // attributed public expert quote if found
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/osaki-os-champ-brown-beige-381193.jpg',
    goodwinLookupKey: 'osaki os-champ',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-champ-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '2D',
    heightMaxIn: 72, weightCapacityLbs: 260,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 9, heat: true, foot: true, calf: true,
    aiNotes: 'Heat confirmed (lumbar heating section on retailer page). Do not recommend to petite buyers (minimum height unknown).',
    reviewRating:      4.7,
    reviewCount:       10,
    reviewSource:      "osakimassagechair.com",
    buyerThemes: [
      "Daily use relieves accumulated aches and pains over weeks and months",
      "Performs well above its price point, even for buyers used to pricier models",
      "Extendable footrest accommodates different leg lengths; air compression is a standout",
    ],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0111/0251/9396/products/osakimassage-chairosaki-os-pro-yamato-massage-chairfree-3-year-residential-warranty-214914.jpg',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/osaki-os-pro-admiral-ii-black-silver-806236.jpg',
    goodwinLookupKey: 'osaki os-pro admiral ii',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-admiral-gray-massage-chair.webp?v=1776836197',
    track: 'SL', roller: '3D', trackLengthIn: 49,
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 270,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true, aiScanning: true,
    aiNotes: 'Primary avatar match. Not for petite buyers (min 62"). Not for tall buyers (max 73").',
    reviewRating:      4.0,
    reviewCount:       13,
    reviewSource:      "osakimassagechair.com",
    buyerThemes: [
      "Zero gravity mode relieves lower back pressure for buyers who use it daily",
      "Full-body airbag compression covers the whole body in a single session",
      "Easy to operate out of the box; the whole household picks it up quickly",
      "Auto programs offer enough variety to stay interesting over time",
    ],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/OS_PRO_MaestroLE_Beige_1Large.jpg',
    goodwinLookupKey: 'osaki os-pro maestro',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-maestro-massage-chair.webp?v=1776836390',
    track: 'SL', roller: '4D',
    weightCapacityLbs: 260,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 5,
    heat: true, foot: true, calf: true, aiScanning: true,
    reviewRating:      4.7,
    reviewCount:       19,
    reviewSource:      "osakimassagechair.com",
    buyerThemes: [
      "4D rollers are genuinely strong; start at lower intensity until you find your setting",
      "Lower back massage combined with heat is the most-cited relief combination",
      "Foot massage quality is frequently called out as exceptional",
      "Controls have a brief learning curve but most buyers settle in within a few sessions",
    ],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/DuoMax_1500px_300dpi_thumbnail_brown.jpg',
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
    inStock: false,
    alternativeIds: ['osaki-os-pro-admiral-ii'],
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
    inStock: false,
    alternativeIds: ['kyota-genki-m380'],
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
    imageUrl: 'https://massagechairstore.com/wp-content/uploads/2020/04/Infinity-Dynasty-4D_Black_Hero_1000-x-720.jpg',
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
    active: true, goodwinActive: false, mcfActive: false,  // no retailer with affiliate program confirmed 2026-05-02
    priceMin: 7999,  // price confirmed 2026-04-27
    affiliateTier: null,
    affiliateRetailer: 'massagechairplanet.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.massagechairplanet.com/products/infinity-celebrity-elite-4d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0549/1562/9252/files/infinity-celebrity-3d-4d-massage-chair-black-45_202ad998-9d7b-4459-93f2-d7592e391ad5.jpg',
    goodwinLookupKey: 'infinity celebrity',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity_celebrity_3d-massage-chair.webp?v=1776836198',
    track: 'L', roller: '3D',
    heightMinIn: 54, heightMaxIn: 76, weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'Formerly known as Riage X3. No active affiliate retailer as of 2026-05-02. Verified specs April 2026.',
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
    imageUrl: 'https://massagechairstore.com/wp-content/uploads/2021/10/EvoMax_Black_HEro1000x7201000x720.jpg',
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
    imageUrl: 'https://massagechairstore.com/wp-content/uploads/2020/06/Infinity-Genesis-Max_Gray-Black_Hero_1000x720-1.jpg',
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
    imageUrl: 'https://massagechairstore.com/wp-content/uploads/2023/02/Infinity_Imperial_Hero_White_1000x720.jpg',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0672/3167/8641/files/laevo-zg-chair-with-lift-assist-8132899.jpg',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Black-2-with-US-FLAG_750x750_3269acf4-148a-42be-a87b-dfc0ba62644c.jpg',
    goodwinLookupKey: 'luraco i9',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/luraco-i9_max-massage-chair.jpg?v=1776836198',
    track: 'L', roller: '3D',
    heightMinIn: 59, heightMaxIn: 82, weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true, calf: true, stretch: true, aiScanning: true,
    tallConfirmed: true, plusSizeConfirmed: true, madeInUSA: true,
    aiNotes: 'Tallest chair in catalog, confirmed to 6\'10". Only USA-manufactured massage chair. 10-year warranty. Split L-Track with 3D roller. Verified April 2026.',
    reviewRating:      5.0,
    reviewCount:       4,
    reviewSource:      "massagechairwarehouse.com",
    buyerThemes: [
      "Body scanning correctly locates the neck rather than the shoulder blades, unlike other premium chairs tested",
      "Per-user settings saved by name, so each household member has their own profile",
      "Owners who tested multiple high-end chairs consistently rate this one highest for accuracy and feel",
    ],
  },

  // ── SYNCA ──────────────────────────────────────────────────────────────────

  {
    id: 'synca-jp970',
    name: 'Synca JP970',
    brand: 'Synca Wellness',
    active: false, goodwinActive: false, mcfActive: false,  // discontinued 2026-05-02; product page redirects to homepage
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
    brand: 'Synca Wellness',
    active: false, goodwinActive: false, mcfActive: false,  // discontinued confirmed 2026-05-01
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp1100',
    alternativeIds: ['panasonic-mak1', 'panasonic-maf1'],
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
    brand: 'Synca Wellness',
    active: false, goodwinActive: false, mcfActive: false,
    // DISCONTINUED
    priceMin: 0,
    affiliateTier: 'A', goodwinStatus: 'affiliate',
    track: null, roller: '4D',
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 0,
    alternativeIds: ['panasonic-maf1'],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0111/0251/9396/products/daiwamassage-chairdaiwa-legacy-4-massage-chairchocolatemassage-chair-heaven-706988.jpg',
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
    imageUrl: 'https://massagechairstore.com/wp-content/uploads/2024/10/Kyota-Genki-M380_Black_New-Badge_600x600.jpg',
    goodwinLookupKey: 'kyota genki',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Kyota-Genki-M380-massage-chair.jpg?v=1776836198',
    track: 'L', roller: '2D',
    heightMaxIn: 77, weightCapacityLbs: 330,
    zeroGravity: true, heat: true, foot: true, calf: true,
    plusSizeConfirmed: true,
    aiNotes: 'Wirecutter Top Pick 2024. L-Track. 2D roller. 330 lb capacity. Verified from massagechairstore.com April 2026.',
  },

  {
    id: 'kyota-yugana-m780',
    name: 'Kyota Yugana M780 4D',
    brand: 'Kyota',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 7999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: 'Affiliatly',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/kyota-yugana-m780-4d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Kyota_YuganaM780_1_1.jpg',
    goodwinLookupKey: 'kyota yugana',
    goodwinImageUrl: 'https://massagechairwarehouse.com/cdn/shop/files/Kyota_YuganaM780_1_1_700x700.jpg?v=1734725044',
    track: 'L', roller: '4D',
    trackLengthIn: 49,
    heightMinIn: 56, heightMaxIn: 74, weightCapacityLbs: 300,
    plusSizeConfirmed: true,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 2,
    heat: true, foot: true, calf: true,
    aiScanning: true,
    aiNotes: 'L-Track 49". 4D roller. 300 lb capacity. Space-saving 2" clearance. TrueFit body scanning. Verified from massagechairwarehouse.com 2026-05-01.',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0422/3942/6712/files/Bodyfriend_Phantom_Medical_Care_massage_chair_left_side_view_in_silver-Recovathlete.png',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0422/3942/6712/files/Phantom-II_white_01.jpg',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0422/3942/6712/files/Bodyfriend_Palace_II_massage_chair_in_Atlantic_Blue_front_view_-Recovathlete.png',
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/amamedic-hilux-4d-black-901174.jpg',
    goodwinLookupKey: 'amamedics hilux',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/amamedic-hilux-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '4D', trackLengthIn: 53,
    heightMinIn: 59, heightMaxIn: 79, weightCapacityLbs: 270,
    zeroGravity: true, zeroGravityStages: 2, spaceSaving: true, wallClearanceIn: 4.7, heat: true,
    foot: true, calf: true, stretch: true,
    tallConfirmed: true,
    aiNotes: 'Heated rollers (not just lumbar heat - rollers themselves are heated). SL-Track confirmed from osakimassagechair.com April 2026.',
    reviewRating:      4.8,
    reviewCount:       5,
    reviewSource:      "osakimassagechair.com",
    buyerThemes: [
      "Pressure adjustability stands out, from gentle recovery to firm deep tissue",
      "Delivers noticeable post-work stress relief, especially for desk-hour tension",
      "Massage strength and movement feel stronger than similarly priced chairs",
    ],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/amamedic-renew-brown-600236.jpg',
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
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 9399,  // wishrockrelaxation.com verified 2026-05-02
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-master-drive-duo-le-4d-3d-massage-chair-og-8901',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/900x900_0000s_0009_ogawa-master-drive-duo-le-black-champagne-angled-view.jpg',
    goodwinLookupKey: 'ogawa master drive le',  // MUST come before 'ogawa master drive ai'
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Ogawa_Master_Drive_LE_4d-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '4D',  // track confirmed SL (was incorrectly L)
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 320,
    zeroGravity: true, zeroGravityStages: 2, heat: true,
    aiNotes: "SL-Track confirmed. Height 5'2\"-6'1\". Weight cap 320 lbs. WishRock affiliate (A-tier). Dual-track: 4D upper + 3D glutes simultaneously.",
  },

  {
    id: 'ogawa-master-drive-ai',
    name: 'Ogawa Master Drive AI 2.0 4D',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12999,  // wishrockrelaxation.com verified 2026-05-02
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-master-drive-ai-2-0-4d-massage-chair-og-8801',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/OgawaMasterDriveAI2.04DMassageChair_OG-8801.jpg',
    goodwinLookupKey: 'ogawa master drive ai',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-master-drive-ai-2_0-4d-massage-chair.jpg?v=1776836198',
    track: 'SL', roller: '4D',  // track confirmed SL (was incorrectly L)
    heightMinIn: 62, heightMaxIn: 73, weightCapacityLbs: 320,
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: "SL-Track confirmed. Height 5'2\"-6'1\". Weight cap 320 lbs. WishRock affiliate (A-tier). Alexa voice control, AI body scan, 4D SL-track.",
  },

  {
    id: 'ogawa-active-xl',
    name: 'Ogawa Active XL 3D',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: false,  // no affiliate partner available
    priceMin: 5899,
    affiliateTier: null,
    affiliateRetailer: undefined,
    goodwinStatus: 'affiliate',
    affiliateUrl: undefined,
    inStock: false,
    alternativeIds: ['titan-3d-prestige'],
    goodwinLookupKey: 'ogawa active xl',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-active-xl-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    heightMinIn: 60, heightMaxIn: 76, weightCapacityLbs: 320,
    zeroGravity: true, zeroGravityStages: 2, heat: true, stretch: true,
    aiNotes: "Confirmed height 5'0\"-6'4\". Weight cap 320 lbs. No affiliate partner currently. Check wishrockrelaxation.com or osakimassagechair.com for availability.",
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
    alternativeIds: ['osaki-os-pro-admiral-ii'],
    aiNotes: 'DISCONTINUED — do not recommend.',
  },

  // ── INADA ──────────────────────────────────────────────────────────────────

  {
    id: 'inada-robo-4d',
    name: 'Inada Robo 4D',
    brand: 'Inada',
    active: false, goodwinActive: false, mcfActive: false,  // deactivated 2026-05-01 -- brand no longer has active US product line
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
    active: false, goodwinActive: false, mcfActive: false,  // deactivated 2026-05-01 -- brand no longer has active US product line
    priceMin: 6999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: '10%, 30-day cookie',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/inada-dreamwave-massage-chair',
    inStock: false,
    alternativeIds: ['panasonic-maf1'],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/jpmedics-kumo-4d-massage-chair-white-brown-1.jpg',
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
    affiliateUrl: 'https://massagechairwarehouse.com/products/jpmedics-kumo',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/jpmedic-kaze-massage-chair-black-black.jpg',  // direct product page, confirmed in-stock 2026-05-01
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
    active: false, goodwinActive: false, mcfActive: false,
    // Removed: no affiliate URL confirmed for MCF or Goodwin
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0539/1790/9187/files/MAK1-UPRIGHT-45_-BLACK_6b5cb854-7c21-4b82-bb44-b12b3520884b.png',
    imageWhiteBg: false,
    goodwinLookupKey: 'panasonic mak1',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/panasonic-mak1-massage-chair.webp?v=1776958938',
    track: 'S', roller: '4D',  // S-Track confirmed from massagechairs.com spec sheet
    heightMinIn: 56, heightMaxIn: 74, weightCapacityLbs: 264,
    zeroGravity: false,  // confirmed NO zero gravity
    heat: true, foot: true, calf: true, stretch: true, aiScanning: true,
    aiNotes: "S-TRACK ONLY — do not recommend for lower back/hip/glute pain. NO zero gravity. Weight cap 264 lbs (not 300). Height 4'8\"-6'2\". Infrared heated rollers.",
  },

  {
    id: 'panasonic-maf1',
    name: 'Panasonic MAF1',
    brand: 'Panasonic',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 5999,  // verified 2026-05-01 from primemassagechairs.com
    affiliateTier: 'A',
    affiliateRetailer: 'primemassagechairs.com',
    affiliateCommission: 'Prime Massage Chairs referral program',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.primemassagechairs.com/products/panasonic-maf1-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2444/6637/files/Panasonic-MAF1-Massage-Chair-in-Midnight-Black.jpg',
    goodwinLookupKey: 'panasonic maf1',
    goodwinImageUrl: 'https://www.primemassagechairs.com/cdn/shop/files/Panasonic-MAF1-Massage-Chair-in-Midnight-Black_700x700.jpg?v=1717195461',
    track: 'S', roller: '4D',
    heightMinIn: 56, heightMaxIn: 74, weightCapacityLbs: 264,
    zeroGravity: false,
    spaceSaving: true,
    heat: true, foot: true, calf: true, stretch: true,
    aiScanning: true,
    aiNotes: "S-TRACK ONLY — do not recommend for lower back/hip/glute pain. NO zero gravity. Compact 27\" wide. 4D roller. Heated massage heads. Zengineered Panasonic craftsmanship. Verified from primemassagechairs.com 2026-05-01.",
    reviewRating:      5.0,
    reviewCount:       5,
    reviewSource:      "primemassagechairs.com",
    buyerThemes: [
      "Frequently purchased as a thoughtful gift for a spouse or partner",
      "Wide range of program options suits different preferences and moods",
      "Zero-gravity stretch position consistently highlighted as a standout feature",
    ],
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
    alternativeIds: ['panasonic-maf1'],
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
    alternativeIds: ['panasonic-maf1'],
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
    imageUrl: 'https://cdn.shopify.com/s/files/1/0086/1297/0558/files/prestige_1600px_brown.webp',
    goodwinLookupKey: 'titan 3d prestige',
    goodwinImageUrl: 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/titan-3d-prestige-massage-chair.webp?v=1776836198',
    track: 'SL', roller: '3D',
    heightMaxIn: 75, weightCapacityLbs: 260,
    zeroGravity: true, spaceSaving: true, wallClearanceIn: 1, heat: true,
    foot: true, calf: true, stretch: true,
    aiNotes: 'SL-Track. Space-saving (1" clearance). Verified from titanchair.com April 2026.',
    reviewRating:      3.2,
    reviewCount:       5,
    reviewSource:      "titanchair.com",
    buyerThemes: [
      "Works as a first massage chair; basic auto functions operate as expected",
      "Assembly and delivery through standard doorways can be challenging",
      "Some buyers report durability concerns past the two to three year mark",
    ],
  },

  {
    id: 'titan-pro-vigor-4d',
    name: 'Titan Pro-Vigor 4D',
    brand: 'Titan',
    active: true, goodwinActive: true, mcfActive: true,
    priceMin: 5999,
    affiliateTier: 'A',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateCommission: 'Affiliatly',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://massagechairwarehouse.com/products/titan-pro-vigor-4d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/Vigor_Black_Perspective_1000x100_833e048a-3782-4c24-bda3-145b0593c8bd.jpg',
    goodwinLookupKey: 'titan pro vigor',
    goodwinImageUrl: 'https://massagechairwarehouse.com/cdn/shop/products/Vigor_Black_Perspective_1000x100_833e048a-3782-4c24-bda3-145b0593c8bd_700x700.jpg?v=1679594044',
    track: 'SL', roller: '4D',
    heightMinIn: 60, heightMaxIn: 74, weightCapacityLbs: 260,
    zeroGravity: true, zeroGravityStages: 2,
    spaceSaving: true, wallClearanceIn: 3.9,
    heat: true, foot: true, calf: true, stretch: true,
    aiScanning: true,
    aiNotes: 'SL-Track. 4D Quad Style roller. 2-stage zero gravity. Heated rollers. Space-saving 3.9" clearance. Verified from massagechairwarehouse.com 2026-05-01.',
    reviewRating:      4.74,
    reviewCount:       38,
    reviewSource:      "titanchair.com",
    buyerThemes: [
      "A daily use habit forms quickly; many buyers report routine evening sessions within the first week",
      "Sleep quality and accumulated aches both improve with consistent nightly use",
      "Lower back may need an adjustment period; 4D intensity control lets buyers dial in the right depth",
      "Experienced massage chair owners consistently describe it as a meaningful step up",
    ],
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
    alternativeIds: ['titan-pro-vigor-4d'],
    aiNotes: 'No dedicated product page confirmed — do not recommend.',
  },


  // ── SYNCA WELLNESS (entry and mid-range chairs from syncamassagechair.com) ──

  {
    id: 'synca-wellness-circ',
    name: 'Synca Wellness CirC',
    brand: 'Synca Wellness',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1299,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/circ',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/circ-beige-02.jpg',
    track: 'SL', roller: '3D', trackLengthIn: 34,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track 34". Entry-level chair. Compact track length -- best for average-height users with upper and mid-back focus.',
    reviewRating:      5.0,
    reviewCount:       5,
    reviewSource:      "syncamassagechair.com",
    buyerThemes: [
      "Used daily by multiple household members over years without mechanical issues",
      "Relieves back pain and improves sleep when used as a pre-bedtime routine",
      "Works well for recovery from physical training and active lifestyles",
    ],
  },

  {
    id: 'synca-wellness-circ-plus',
    name: 'Synca Wellness CirC+',
    brand: 'Synca Wellness',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1899,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/circ-plus',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/Circ_gray_6ce7ac5d-8f29-40d0-8558-0609d3d209af.jpg',
    track: 'SL', roller: '3D', trackLengthIn: 45,
    spaceSaving: true, wallClearanceIn: 6,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track 45.5". Space-saving 6" wall clearance. Good entry-to-mid option for smaller rooms.',
    reviewRating:      5.0,
    reviewCount:       8,
    reviewSource:      "syncamassagechair.com",
    buyerThemes: [
      "Compact and visually appealing without the bulk of larger full-feature chairs",
      "Multiple settings handle different session goals, from gentle relaxation to firm massage",
      "Zero gravity recline delivers noticeable pressure relief in a smaller footprint",
    ],
  },

  {
    id: 'synca-wellness-circ-3',
    name: 'Synca Wellness CirC 3',
    brand: 'Synca Wellness',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/circ3',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/black_38498ed3-f44a-43df-b96c-2a8eb95bbb16.png',
    track: 'SL', roller: '2D', trackLengthIn: 47,
    weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track 47". 2D roller. 300 lb capacity. Entry-level choice for plus-size buyers on a budget.',
  },

  {
    id: 'synca-wellness-kurodo',
    name: 'Synca Wellness Kurodo',
    brand: 'Synca Wellness',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/kurodo',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/Kurodo-black_8fd09903-ae19-4638-a20c-fdbbe99a48d1.jpg',
    track: 'SL', roller: '4D',
    zeroGravity: true, heat: true, foot: true, aiScanning: true,
    aiNotes: 'SL-track. 4D roller. Made in Japan. Premium Synca Wellness flagship.',
  },

  // ── INNER BALANCE ───────────────────────────────────────────────────────────

  {
    id: 'inner-balance-jin',
    name: 'Inner Balance Jin',
    brand: 'Inner Balance',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jin',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/jin-brown_a3d5f400-dc96-408d-9601-fe5f5fc30503.jpg',
    track: 'SL', roller: '2D',
    spaceSaving: true, wallClearanceIn: 2,
    weightCapacityLbs: 300,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. 2D roller. Space-saving 2" wall clearance. 300 lb capacity. Inner Balance brand distributed via Synca Wellness.',
    reviewRating:      5.0,
    reviewCount:       9,
    reviewSource:      "syncamassagechair.com",
    buyerThemes: [
      "Recommended for daily back pain management and whole-body relaxation",
      "Customer service is frequently cited alongside the product itself",
      "Works well as a pre-bedtime routine for winding down after demanding days",
    ],
  },

  {
    id: 'inner-balance-jin-2',
    name: 'Inner Balance Jin 2.0',
    brand: 'Inner Balance',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jin-2',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/jin2-black_bfd7b403-24e1-4c4e-be63-a7f88518e11d.jpg',
    track: 'SL', roller: '2D',
    spaceSaving: true, wallClearanceIn: 2,
    weightCapacityLbs: 300,
    zeroGravityStages: 3,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. 2D roller. 3-stage zero gravity. Space-saving 2" wall clearance. 300 lb capacity. Upgraded Jin with deeper recline stages.',
    reviewRating:      4.9,
    reviewCount:       8,
    reviewSource:      "syncamassagechair.com",
    buyerThemes: [
      "Couples and seniors with chronic back issues report 20 to 30 minute sessions deliver real relief",
      "Family members with mobility limitations find daily use accessible and beneficial",
      "Customer service is responsive and resolves issues effectively",
    ],
  },

  // ── FUJIIRYOKI ─────────────────────────────────────────────────────────────

  {
    id: 'fujiiryoki-jp3000',
    name: 'Fujiiryoki JP-3000',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 10999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/jp-3000',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/jp3000-brown_02ca2815-cce9-41b3-bfb5-f7b3f0fac5ae.jpg',
    track: 'S', roller: '5D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'S-Track ONLY. 5D roller. Made in Japan. DO NOT recommend for lower back, hip, or glute pain -- S-track stops at the lumbar.',
  },

  {
    id: 'fujiiryoki-cyber-relax-ai',
    name: 'Fujiiryoki Cyber Relax Ai',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 10999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/cyber-relax-ai',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/CyberRelaxAi_Onyx-001.jpg',
    track: 'S', roller: '5D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'S-Track ONLY. 5D roller. Made in Japan. DO NOT recommend for lower back, hip, or glute pain -- S-track stops at the lumbar.',
  },

  {
    id: 'fujiiryoki-cyber-relax-ai-executive',
    name: 'Fujiiryoki Cyber Relax Ai Executive',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/cyber-relax-ai-executive',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/jp4100_exe.jpg',
    track: 'S', roller: '5D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'S-Track ONLY. 5D roller. Made in Japan. Executive upgrade over standard Cyber Relax Ai. DO NOT recommend for lower back, hip, or glute pain -- S-track stops at the lumbar.',
  },

  {
    id: 'fujiiryoki-calm-plus',
    name: 'Fujiiryoki Calm Plus',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/calm-plus',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/CalmPlus_Charcoal_01.jpg',
    track: 'Flex', roller: '4D',
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'Flex-track. 4D roller. Mid-range Fujiiryoki with flexible track that adapts to body contour.',
  },

  {
    id: 'fujiiryoki-cyber-relax-elite',
    name: 'Fujiiryoki Cyber Relax Elite',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 9999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/cyber-relax-elite',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/cyber-relax-elite-sand.jpg',
    track: 'Flex', roller: '4D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Flex-track. 4D roller. Premium Fujiiryoki with flexible track. Strong option for buyers who want full-body coverage with advanced Japanese engineering.',
  },

  {
    id: 'fujiiryoki-cyber-relax-pro',
    name: 'Fujiiryoki Cyber Relax Pro',
    brand: 'Fujiiryoki',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 14999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/cyber-relax-pro',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/crp-Admiral-001_01b194e0-3119-44d4-b982-b233f9705143.jpg',
    track: 'Flex', roller: '8D',  // dual 4D+4D roller system
    spaceSaving: true, wallClearanceIn: 4,
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Flex-track. 8D dual roller system (two independent 4D roller units). Space-saving 4" wall clearance. Top-tier Fujiiryoki. Recommend for buyers who want Japanese engineering at the flagship level.',
  },

  // ── DCORE ──────────────────────────────────────────────────────────────────

  {
    id: 'dcore-d-core-2',
    name: 'DCORE D.Core 2',
    brand: 'DCORE',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 16999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/d-core-2',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/DCore2---Black-01.jpg',
    track: 'SL', roller: '3D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'SL-track. 3D roller. Made in Japan. DCORE flagship. Ultra-premium segment. Best for buyers who prioritize Japanese craftsmanship at the highest tier.',
  },

  {
    id: 'dcore-cirrus-jp',
    name: 'DCORE CIRRUS-JP',
    brand: 'DCORE',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12999,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/cirrus-jp',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/DCore_Cirrus_Black_01.jpg',
    track: 'L', roller: '3D',
    zeroGravity: true, heat: true,
    aiNotes: 'L-track. 3D roller. Made in Japan. Strong lower-back and hip coverage at the premium tier.',
  },

  {
    id: 'dcore-stratus-jp',
    name: 'DCORE STRATUS-JP',
    brand: 'DCORE',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 11499,
    affiliateTier: 'A',
    affiliateRetailer: 'syncamassagechair.com',
    affiliateCommission: '8%+, 30-day cookie (direct)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://syncamassagechair.com/products/stratus-jp',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0855/7959/6065/files/DCore_Stratus_Black_01.jpg',
    track: 'L', roller: '3D',
    zeroGravity: true, heat: true,
    aiNotes: 'L-track. 3D roller. Made in Japan. Entry point into the DCORE premium lineup. Good lower-back and hip coverage.',
  },

  // ── KAHUNA (Dios line additions) ────────────────────────────────────────────

  {
    id: 'kahuna-dios-6800',
    name: 'Kahuna Dios 6800',
    brand: 'Kahuna',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3799,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/products/dios-6800',
    imageUrl: 'https://kahunachair.com/wp-content/uploads/2025/01/dios_6800_1200x1200_01102025.jpg',
    track: 'SL', roller: '4D', trackLengthIn: 50,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track 50". 4D roller. Strong mid-range Kahuna. Good value SL option in the $3k-$4k range.',
  },

  {
    id: 'kahuna-dios-1288',
    name: 'Kahuna Dios 1288',
    brand: 'Kahuna',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 16999,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/products/dios-1288',
    inStock: false,
    track: 'SL', roller: '4D', trackLengthIn: 54,
    zeroGravity: true, heat: true, foot: true, aiScanning: true,
    aiNotes: 'SL-track 54". 4D roller. Currently pre-order. Kahuna flagship -- ultra-long track, strong option for tall buyers.',
  },

  {
    id: 'kahuna-dios-flexa',
    name: 'Kahuna Dios Flexa',
    brand: 'Kahuna',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 8499,
    priceMax: 11999,
    affiliateTier: 'A',
    affiliateRetailer: 'kahunachair.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://kahunachair.com/products/dios-flexa',
    inStock: false,
    track: 'SL', roller: '4D', trackLengthIn: 56,
    stretch: true,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track 56". 4D roller. Full-body stretch to 181 degrees. Currently pre-order. Among the longest SL tracks in the catalog -- excellent for tall buyers and full-body stretch.',
  },

  // ── ADOR ───────────────────────────────────────────────────────────────────

  {
    id: 'ador-3d-allure',
    name: 'Ador 3D Allure',
    brand: 'Ador',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 4999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/ador-3d-allure',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/2-1.Allure-thumbnail-1000x1000Large_3ba56d83-e398-456e-96d6-3f64fe013178.jpg',
    track: 'SL', roller: '3D',
    weightCapacityLbs: 260,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track. 3D roller. 260 lb weight capacity. Distributed by Osaki. Good mid-range SL option.',
  },

  // ── THERAMEDIC ─────────────────────────────────────────────────────────────

  {
    id: 'theramedic-flex',
    name: 'Theramedic Flex',
    brand: 'Theramedic',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3499,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/theramedic-flex',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/theramedic-flex-taupe-988549.jpg',
    track: 'Flex', roller: '2D',
    spaceSaving: true, wallClearanceIn: 4,
    weightCapacityLbs: 260,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'Flex-track. 2D roller. Space-saving 4" wall clearance. 260 lb capacity. Distributed by Osaki. Good option for buyers who want Flex-track at a mid-range price.',
  },

  // ── KANJI ──────────────────────────────────────────────────────────────────

  {
    id: 'kanji-4d-shogun-duo',
    name: 'Kanji 4D Shogun Duo',
    brand: 'Kanji',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 14999,
    affiliateTier: 'A',
    affiliateRetailer: 'osakimassagechair.com',
    affiliateCommission: '5% (Rakuten)',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://osakimassagechair.com/products/kanji-4d-shogun-duo',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0727/1609/1700/files/shogun_1500px_black.webp',
    track: 'Flex', roller: '8D',  // dual 4D+4D roller system ("Duo" = two independent 4D units)
    spaceSaving: true, wallClearanceIn: 6,
    weightCapacityLbs: 330,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'Flex-track. 8D dual roller system (two independent 4D roller units). Space-saving 5.5" wall clearance. 330 lb capacity -- one of the highest in the catalog. Distributed by Osaki. Strong premium option for plus-size buyers.',
  },

  // ── OGAWA (Wish Rock Relaxation) ───────────────────────────────────────────

  {
    id: 'ogawa-og6300',
    name: 'Ogawa OG-6300',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 5899,
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-active-xl-3d-massage-chair-og-6300',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/ogawa-active-xl-black-and-black-45.webp',
    track: 'SL', roller: '3D',
    weightCapacityLbs: 320,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. 3D roller. 320 lb capacity. Via Wish Rock Relaxation.',
  },

  {
    id: 'ogawa-og8901',
    name: 'Ogawa OG-8901',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 9499,
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-master-drive-duo-le-4d-3d-massage-chair-og-8901',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/900x900_0000s_0009_ogawa-master-drive-duo-le-black-champagne-angled-view.jpg',
    track: 'SL', roller: '4D', trackLengthIn: 53,
    spaceSaving: true, wallClearanceIn: 1,
    weightCapacityLbs: 320,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track 53". Dual roller system (4D primary). Near-zero wall clearance (1"). 320 lb capacity. Via Wish Rock Relaxation.',
  },

  {
    id: 'ogawa-og6400',
    name: 'Ogawa OG-6400',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 5199,
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-active-xl-duo-3d-massage-chair-og-6400',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/OgawaActiveXLDUO_0025_ogawa-active-xl-duo-black-and-champagne-angled-view.jpg',
    track: 'SL', roller: '3D',
    spaceSaving: true, wallClearanceIn: 11,
    weightCapacityLbs: 320,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. Dual roller system (3D primary). Space-saving 11" wall clearance. 320 lb capacity. Via Wish Rock Relaxation.',
  },

  {
    id: 'ogawa-og8801',
    name: 'Ogawa OG-8801',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12999,
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-master-drive-ai-2-0-4d-massage-chair-og-8801',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/ogawa-master-drive-2-black-black-3q.webp',
    track: 'SL', roller: '4D',
    spaceSaving: true, wallClearanceIn: 4,
    weightCapacityLbs: 320,
    zeroGravity: true, heat: true, aiScanning: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. 4D roller. Space-saving 4" wall clearance. 320 lb capacity. Via Wish Rock Relaxation.',
  },

  {
    id: 'ogawa-og8900',
    name: 'Ogawa OG-8900',
    brand: 'Ogawa',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 15999,
    affiliateTier: 'A',
    affiliateRetailer: 'wishrockrelaxation.com',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://www.wishrockrelaxation.com/products/ogawa-master-drive-duo-4d-3d-massage-chair-og-8900',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1509/5162/files/ogawa-master-drive-duo-black-and-burgundy-3q.webp',
    track: 'SL', roller: '4D',
    spaceSaving: true, wallClearanceIn: 1,
    weightCapacityLbs: 320,
    zeroGravity: true, heat: true, aiScanning: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track. Dual roller system (4D primary). Near-zero wall clearance (1"). 320 lb capacity. Via Wish Rock Relaxation.',
  },

  // ── RELAXE ─────────────────────────────────────────────────────────────────

  {
    id: 'relaxe-shiatsu',
    name: 'Relaxe Shiatsu',
    brand: 'Relaxe',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2899,
    priceMax: 2999,
    affiliateTier: 'A',
    affiliateRetailer: 'relaxe.co',
    goodwinStatus: 'affiliate',
    affiliateUrl: 'https://relaxe.co/collections/massage/products/shiatsu-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0166/6619/8070/files/CopyofCopyofCopyofCopyofThisChairSavedMyBack_10.png',
    track: 'SL', roller: '2D', trackLengthIn: 53,
    spaceSaving: true, wallClearanceIn: 2,
    weightCapacityLbs: 330,
    heightMinIn: 61, heightMaxIn: 76,
    zeroGravity: true, heat: true, foot: true,
    plusSizeConfirmed: true,
    aiNotes: 'SL-track 53". 2D roller. Space-saving 2" wall clearance. 330 lb capacity. Height range 61-76 inches. Affiliate program pending confirmation.',
    reviewRating:      4.8,
    reviewCount:       894,
    reviewSource:      "relaxe.co",
    buyerThemes: [
      "Post-surgery and chronic back pain relief reported after just a few weeks of regular use",
      "Multiple household members compete for daily time in the chair",
      "Buyers consistently note it replaces the cost of ongoing massage therapy appointments",
    ],
  },

  // ── REAL RELAX (Goodwin Tier C fallback only — never surface in MCF) ────────

  {
    id: 'real-relax-favor-06',
    name: 'Real Relax Favor-06 2026',
    brand: 'Real Relax',
    active: false, goodwinActive: false, mcfActive: false,
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
    active: false, goodwinActive: false, mcfActive: false,
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
    active: false, goodwinActive: false, mcfActive: false,
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
    active: false, goodwinActive: false, mcfActive: false,
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

  // ── OHCO ──────────────────────────────────────────────────────────────────

  {
    id: 'ohco-m8-neo-le',
    name: 'OHCO M.8 NEO LE',
    brand: 'OHCO',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 18000,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'johnsonfitness.com',
    affiliateUrl: 'https://www.johnsonfitness.com/OHCO-M8-NEO-LE-Massage-Chair-P39084.aspx',
    imageUrl: 'https://www.johnsonfitness.com/Content/product_images/M8LENEO-BODY-LEA-ROSONERO.png',
    imageWhiteBg: false,
    track: 'SL', roller: '4D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Flagship OHCO model at $18,000. SL-track 4D. Dual zero gravity. Full body scan. Premium leather. Sold exclusively through Johnson Fitness.',
  },

  // ── RELAX ON CHAIR ────────────────────────────────────────────────────────

  {
    id: 'relaxonchair-rio',
    name: 'Relax On Chair RIO',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/rio-massage-recliner-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/relaxonchair-rio-massage-recliner-chair-black-free-shipping-202204.jpg',
    track: 'SL', roller: null,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'Entry-level SL-track at $999. Zero gravity, heat, foot rollers. Good starting point for budget buyers who still want SL coverage.',
  },

  {
    id: 'relaxonchair-jasper',
    name: 'Relax On Chair Jasper',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1599,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/jasper-full-body-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/files/relaxonchair-jasper-full-body-massage-chair-main-202405.jpg',
    track: 'SL', roller: null,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'SL-track, zero gravity, heat, foot rollers. Mid-entry price with full-spine coverage.',
  },

  {
    id: 'relaxonchair-mk-ii-plus',
    name: 'Relax On Chair MK-II Plus',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/mk-ii-plus-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/mk-2-plus-full-body-massage-chair-chocolate-free-shipping-202304.jpg',
    track: 'L', roller: null,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'L-track extends under glutes. Zero gravity, heat, foot rollers. Good lower-back and hip option at $1,999.',
  },

  {
    id: 'relaxonchair-mk-classic',
    name: 'Relax On Chair MK-Classic',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2299,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/mk-classic-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/mk-classic-full-body-massage-chair-brown-free-shipping-202102.jpg',
    track: 'L', roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'L-track with zero gravity and heat. Classic model in the ROC lineup at $2,299.',
  },

  {
    id: 'relaxonchair-mk-iii',
    name: 'Relax On Chair MK-III',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2299,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/mk-iii-full-body-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/relaxonchair-mk-III-massage-chair-main-221208-2.jpg',
    track: 'SL', roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'SL-track with zero gravity and heat. Full-spine coverage in the $2,299 range.',
  },

  {
    id: 'relaxonchair-mk-v-plus',
    name: 'Relax On Chair MK-V Plus',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://relaxonchair.com/products/mk-v-plus-full-body-massage-chair-black',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/MK-V-Plus-full-body-massage-chair-black-202102.jpg',
    track: 'L', roller: null,
    spaceSaving: true, wallClearanceIn: 3.5,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'L-track space-saving design (3.5" wall clearance). Zero gravity, heat, foot rollers. Good for rooms with limited wall space.',
    reviewRating:      4.3,
    reviewCount:       6,
    reviewSource:      "relaxonchair.com",
    buyerThemes: [
      "Buyers report canceling ongoing therapy appointments after regular chair use",
      "Heating massage is the most praised feature for back pain relief",
      "Daily household use by multiple family members over several years",
    ],
  },

  {
    id: 'relaxonchair-ion-3d',
    name: 'Relax On Chair ION-3D',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3299,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/ion-3d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/ion-3d-full-body-massage-chair-201202.jpg',
    track: 'SL', roller: '3D', trackLengthIn: 50,
    zeroGravity: true, heat: true,
    aiNotes: '50" SL-track with 3D rollers. Extended coverage from neck to glutes. Zero gravity and heat.',
  },

  {
    id: 'relaxonchair-vita-3d',
    name: 'Relax On Chair VITA-3D',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/vita-3d-full-body-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/relaxonchair-vita-3d-massage-chair-main-221208.jpg',
    track: 'SL', roller: '3D',
    zeroGravity: true, heat: true,
    aiNotes: 'SL-track with 3D rollers, zero gravity, and heat. Mid-tier 3D option from Relax On Chair.',
  },

  {
    id: 'relaxonchair-yukon-4d',
    name: 'Relax On Chair YUKON-4D',
    brand: 'Relax On Chair',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 6499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'relaxonchair.com',
    affiliateUrl: 'https://www.relaxonchair.com/products/yukon-4d-full-body-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2261/7893/products/relaxonchair-yukon-4d-massage-chair-main-210319.jpg',
    track: 'SL', roller: '4D',
    zeroGravity: true, heat: true,
    aiNotes: 'Flagship 4D SL-track from Relax On Chair. Premium pressure control and full-spine coverage at $6,499.',
  },

  // ── CERAGEM ───────────────────────────────────────────────────────────────

  {
    id: 'ceragem-m10',
    name: 'Ceragem M10',
    brand: 'Ceragem',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/ceragem-m10-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Cergem_M10_7.jpg',
    track: null, roller: null,
    zeroGravity: false, heat: true, aiScanning: true,
    aiNotes: 'Uses proprietary thermal jade ball technology rather than traditional rollers -- not a standard roller-track chair. Thermal scanning positions heated jade balls for targeted therapy. Premium thermal therapy device at $12,999.',
  },

  // ── ERGOTEC ───────────────────────────────────────────────────────────────

  {
    id: 'ergotec-et-180-pluto',
    name: 'Ergotec ET-180 Pluto',
    brand: 'Ergotec',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/ergotec-et-180-pluto-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Ergotec_ET180_1.jpg',
    track: 'L', roller: '3D',
    weightCapacityLbs: 320,
    zeroGravity: false, heat: true, stretch: true, foot: true,
    aiNotes: 'L-track 3D at $1,999. 320 lb weight capacity. Heat, stretch, foot rollers. Strong value entry for buyers needing higher weight support.',
  },

  // ── KOYO ──────────────────────────────────────────────────────────────────

  {
    id: 'koyo-303ts',
    name: 'Koyo 303TS',
    brand: 'Koyo',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 7999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/koyo-303ts-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Koyo_303ts_1.jpg',
    track: null, roller: '4D',
    zeroGravity: false, heat: false,
    aiNotes: 'Japanese-made 4D massage chair at $7,999. Koyo is a niche Japanese brand emphasizing precision engineering. Track type not confirmed from available specs.',
  },

  // ── MEDICAL BREAKTHROUGH ──────────────────────────────────────────────────

  {
    id: 'medical-breakthrough-5',
    name: 'Medical Breakthrough 5',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2249,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-5-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough5_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: 'Entry model. 4D massage, zero gravity sleep system, full body scan, stretch. 300 lb capacity. Track type not specified in product data.',
  },

  {
    id: 'medical-breakthrough-6',
    name: 'Medical Breakthrough 6',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 4249,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-6',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/Med_Break_6_6.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity.',
  },

  {
    id: 'medical-breakthrough-6-plus',
    name: 'Medical Breakthrough 6 Plus',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 5499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-6-plus-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough6Plus_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity. Upgraded version of MB6.',
  },

  {
    id: 'medical-breakthrough-7',
    name: 'Medical Breakthrough 7',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 6249,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-7-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough7_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity.',
  },

  {
    id: 'medical-breakthrough-7-plus',
    name: 'Medical Breakthrough 7 Plus',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 8399,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-7-plus',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/8.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity. Premium version of MB7.',
  },

  {
    id: 'medical-breakthrough-8',
    name: 'Medical Breakthrough 8',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 8249,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-8-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough8_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity.',
  },

  {
    id: 'medical-breakthrough-8-plus',
    name: 'Medical Breakthrough 8 Plus',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 10899,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-8-plus-open-feet-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakThrough8Plus_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true, foot: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch, open-foot rollers. 300 lb capacity.',
  },

  {
    id: 'medical-breakthrough-9',
    name: 'Medical Breakthrough 9',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 10399,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-9-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough9_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity.',
  },

  {
    id: 'medical-breakthrough-9-plus',
    name: 'Medical Breakthrough 9 Plus',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 14649,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-9-plus-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/MedicalBreakthrough9Plus_1.jpg',
    track: null, roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: '4D massage, zero gravity, full body scan, stretch. 300 lb capacity. Top-tier MB model below the X.',
  },

  {
    id: 'medical-breakthrough-x',
    name: 'Medical Breakthrough X',
    brand: 'Medical Breakthrough',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 12499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/medical-breakthrough-x-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/break-x-02_1.jpg',
    track: 'L', roller: '4D',
    weightCapacityLbs: 300,
    zeroGravity: true, heat: false, stretch: true, aiScanning: true,
    aiNotes: 'L-track confirmed. 4D massage, zero gravity, full body scan, stretch. 300 lb capacity. Flagship Medical Breakthrough model.',
  },

  // ── POSITIVE POSTURE ──────────────────────────────────────────────────────

  {
    id: 'positive-posture-brio-plus',
    name: 'Positive Posture Brio Plus',
    brand: 'Positive Posture',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 7999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/positive-posture-brio-plus-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/positive-posture-brio-plus-2.jpg',
    track: 'L', roller: '4D',
    zeroGravity: false, heat: true, foot: true,
    aiNotes: 'L-track 4D with heat and foot rollers. Premium positioning at $7,999. Positive Posture focuses on ergonomic support and spinal alignment.',
    reviewRating:      5.0,
    reviewCount:       1,
    reviewSource:      "massagechairwarehouse.com",
    buyerThemes: [
      "Buyers with arthritis, back pain, and leg pain report daily use without missing a session",
    ],
  },

  {
    id: 'positive-posture-brio-sport',
    name: 'Positive Posture Brio Sport',
    brand: 'Positive Posture',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 8999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/positive-posture-brio-sport-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/positive-posture-brio-sport-3.jpg',
    track: 'L', roller: '4D', trackLengthIn: 47,
    heightMinIn: 60, heightMaxIn: 77, weightCapacityLbs: 265,
    zeroGravity: false, heat: true, foot: true,
    aiNotes: 'L-track 47" length. 4D roller, heat, foot rollers. Fits 5\'0" to 6\'5". 265 lb weight capacity. Sport-focused recovery positioning.',
    reviewRating:      5.0,
    reviewCount:       4,
    reviewSource:      "massagechairwarehouse.com",
    buyerThemes: [
      "Post-workout recovery is the primary use case, with deep tissue and hip airbags for stretching",
      "Programmed routines vary meaningfully, providing a different experience each session",
      "Quick sessions immediately after exercise are the standout use pattern",
    ],
  },

  {
    id: 'positive-posture-solara',
    name: 'Positive Posture Solara',
    brand: 'Positive Posture',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/positive-posture-solara-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Positive_Posture_Solara_1.jpg',
    track: null, roller: null,
    zeroGravity: false, heat: false,
    aiNotes: 'Entry-level Positive Posture model at $2,499. Track and roller type not confirmed from available specs.',
  },

  // ── SHARPER IMAGE ─────────────────────────────────────────────────────────

  {
    id: 'sharper-image-relieve-3d',
    name: 'Sharper Image Relieve 3D',
    brand: 'Sharper Image',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 4499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/sharper-image-relieve-3d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/sharper-image-relieve-3d-4.jpg',
    track: 'L', roller: '3D',
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'L-track 3D with zero gravity, heat, and foot rollers. Sharper Image brand sold through MCW at $4,499.',
  },

  {
    id: 'sharper-image-revival',
    name: 'Sharper Image Revival',
    brand: 'Sharper Image',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/sharper-image-revival-zero-gravity-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/sharper-image-revival-4.jpg',
    track: 'L', roller: null,
    zeroGravity: true, heat: true, foot: true,
    aiNotes: 'L-track with zero gravity, heat, and foot rollers. Roller dimension not specified. Entry point to the Sharper Image massage chair line at $3,999.',
  },

  // ── SVAGO ─────────────────────────────────────────────────────────────────

  {
    id: 'svago-lite-2',
    name: 'Svago Lite 2',
    brand: 'Svago',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/svago-lite-2-zero-gravity-recliner',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/files/Svago_Lite_2_G_1.jpg',
    track: null, roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'Zero gravity recliner with lumbar vibration and heat. Not a roller massage chair. Svago specializes in zero gravity recliners rather than traditional massage chairs.',
  },

  {
    id: 'svago-zgr',
    name: 'Svago ZGR',
    brand: 'Svago',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2199,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/svago-zgr-zero-gravity-recliner',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/svago-zgr-zero-gravity-recliner-1.jpg',
    track: null, roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'Zero gravity recliner with vibration massage and heat. Not a roller-track chair. Good for buyers who want zero gravity positioning and gentle vibration rather than deep tissue roller work.',
  },

  {
    id: 'svago-newton',
    name: 'Svago Newton',
    brand: 'Svago',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairwarehouse.com',
    affiliateUrl: 'https://www.massagechairwarehouse.com/products/svago-newton-zero-gravity-recliner',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0737/9625/6030/products/svago-newton-zero-gravity-recliner-26.jpg',
    track: null, roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'Premium zero gravity recliner with air-cell massage and heat. Not a roller-track chair. Svago flagship model with more sophisticated air-pressure massage than the ZGR.',
  },


  // ── ROCKERTECH ───────────────────────────────────────────────────────────────

  {
    id: 'rockertech-bliss',
    name: 'RockerTech Bliss',
    brand: 'RockerTech',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 5499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairheaven.com',
    affiliateUrl: 'https://www.massagechairheaven.com/collections/rockertech-massage-chairs',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0111/0251/9396/products/rockertechmassage-chairsrockertech-bliss-massage-chairbrownmassage-chair-heaven-479159.webp?v=1701056370',
    imageWhiteBg: false,
    track: 'L', roller: '4D',
    spaceSaving: true,
    zeroGravity: true, heat: true, foot: true, aiScanning: true,
    aiNotes: 'L-track 4D at $5,499. 2-level zero gravity. Lumbar heat. Reflexology foot rollers. TrueFit body scanning. Zero Wall Fit space-saving technology. 3-year warranty. Sold via Massage Chair Heaven.',
  },

  {
    id: 'rockertech-sensation-4d',
    name: 'RockerTech Sensation 4D',
    brand: 'RockerTech',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 6999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'massagechairheaven.com',
    affiliateUrl: 'https://www.massagechairheaven.com/products/rockertech-sensation-4d-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0111/0251/9396/products/rockertechhealth-beauty-massage-relaxation-massage-chairsrockertech-sensation-4d-massage-chairgray-blackmassage-chair-heaven-951831.jpg?v=1697640675',
    imageWhiteBg: false,
    track: 'SL', roller: '4D',
    spaceSaving: true,
    zeroGravity: true, heat: true, foot: true, aiScanning: true,
    aiNotes: 'SL-track 4D at $6,999. 2-level zero gravity. Lumbar heat. Dual reflexology foot rollers plus kneading calf rollers. TrueFit body scanning. Zero Wall Fit space-saving. 3-year warranty. Sold via Massage Chair Heaven.',
  },

  // ── OHCO (M8 Neo standard) ────────────────────────────────────────────────

  {
    id: 'ohco-m8-neo',
    name: 'OHCO M.8 NEO',
    brand: 'OHCO',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 14999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'johnsonfitness.com',
    affiliateUrl: 'https://www.johnsonfitness.com/OHCO-M8-NEO-Massage-Chair-P39080.aspx',
    imageUrl: 'https://www.johnsonfitness.com/Content/product_images/M8NEO-BODY-PU.png',
    imageWhiteBg: false,
    track: 'SL', roller: '4D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Standard M.8 NEO at $14,999. SL-track 4D. Zero gravity. Body scan. Step-down from the $18,000 LE. Sold exclusively through Johnson Fitness. Compare with LE before recommending.',
  },

  // ── NOUHAUS ───────────────────────────────────────────────────────────────

  {
    id: 'nouhaus-new-classic',
    name: 'Nouhaus New Classic',
    brand: 'Nouhaus',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 1499,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'nouhaus.com',
    affiliateUrl: 'https://www.nouhaus.com/products/new-classic-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0263/3426/5378/files/New_Classic_caramel_white_background_1.jpg?v=1774494724',
    track: 'SL', roller: null,
    weightCapacityLbs: 250,
    zeroGravity: false, heat: true,
    aiNotes: 'SL-track with heat at $1,499. 250 lb weight cap. 90-degree swivel. Red Dot Award winner (2020). No zero gravity. Good entry option for buyers who want SL-track without ZG features.',
  },

  {
    id: 'nouhaus-aurora',
    name: 'Nouhaus Aurora',
    brand: 'Nouhaus',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2299,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'nouhaus.com',
    affiliateUrl: 'https://www.nouhaus.com/products/nouhaus-aurora-zero-gravity-premium-full-body-electric-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0263/3426/5378/files/Aurorawhitebackground_14.jpg?v=1776396443',
    track: 'SL', roller: null,
    zeroGravity: true, heat: true,
    aiNotes: 'Compact SL-track with zero gravity (116-139 degrees) at $2,299. 6 auto programs. Heat. Small footprint (45.47" x 28.54"). Good for buyers who want zero gravity in a smaller chair.',
  },

  {
    id: 'nouhaus-noucampo',
    name: 'Nouhaus Nou Campo',
    brand: 'Nouhaus',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2299,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'nouhaus.com',
    affiliateUrl: 'https://www.nouhaus.com/products/nouhaus-noucampo-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0263/3426/5378/files/gemini_0_1635e2d0.jpg?v=1776760908',
    track: 'SL', roller: null,
    heightMaxIn: 75, weightCapacityLbs: 250,
    zeroGravity: false, heat: true, aiScanning: true,
    aiNotes: 'SL-track built for larger users: fits up to 6\'3" and 250 lbs. Auto shoulder recognition for body scan. Heat. No zero gravity. Good option for taller buyers in the $2,000-$2,500 range.',
  },

  {
    id: 'nouhaus-luna',
    name: 'Nouhaus Luna',
    brand: 'Nouhaus',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 2999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'nouhaus.com',
    affiliateUrl: 'https://www.nouhaus.com/products/nouhaus-luna-zero-gravity-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0263/3426/5378/files/luna_2.jpg?v=1775208539',
    track: 'SL', roller: '3D',
    zeroGravity: true, heat: true,
    aiNotes: 'SL-track 3D with zero gravity and ThermoMassage heat (3 levels: 35/40/45 C) at $2,999. Red Dot Award design. Bluetooth speakers. Strong mid-tier option from Nouhaus.',
  },

  {
    id: 'nouhaus-orbit',
    name: 'Nouhaus Orbit',
    brand: 'Nouhaus',
    active: true, goodwinActive: false, mcfActive: true,
    priceMin: 3999,
    affiliateTier: null,
    goodwinStatus: 'affiliate',
    affiliateRetailer: 'nouhaus.com',
    affiliateUrl: 'https://www.nouhaus.com/products/nouhaus-orbit-zero-gravity-massage-chair',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0263/3426/5378/files/7_2a0a8912-40ab-49c7-a036-2af65b91bdaf.jpg?v=1774577228',
    imageWhiteBg: false,
    track: null, roller: '3D',
    zeroGravity: true, heat: true, aiScanning: true,
    aiNotes: 'Premium 3D zero gravity chair at $3,999. Track type not confirmed. Body recognition technology. Top-grain natural leather. Zero gravity 120-145 degrees. Red Dot Award design. Highest-tier Nouhaus model.',
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
