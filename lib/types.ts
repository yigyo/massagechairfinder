export interface RetailerLink {
  id: number
  retailerName: string
  url: string
  commissionPct: number
  network: string
  isAvailable: boolean
  price: number | null
  isGoodwinCatalog: boolean
  lastVerified: string | null
}

export interface Chair {
  id: number
  documentId: string
  name: string
  slug: string
  brand: string
  price: number
  tier: string
  trackType: 'S-Track' | 'L-Track' | 'SL-Track'
  rollerDimension: string
  zeroGravity: boolean
  spaceRequired: string
  heatTherapy: boolean
  footRollers: boolean
  minHeightIn: number
  maxHeightIn: number
  weightCapacityLbs: number
  bestFor: string
  retailerLinks: RetailerLink[]
  imageUrl: string | null
  imageAlt: string | null
  launchPriority: 'Launch' | 'Fast-Follow' | 'Hold'
  contentStatus: 'Ready' | 'Needs Image' | 'Needs Data'
  notes: string | null
}

export interface Brand {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  chairs: Chair[]
}

export interface Article {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  body: string
  publishedAt: string
  category: 'buying-guide' | 'comparison' | 'best-of' | 'review'
}
