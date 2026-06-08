import { NextRequest, NextResponse } from 'next/server'
import { CHAIRS } from '@/lib/chairs'

export async function GET(
  req: NextRequest,
  { params }: { params: { chair: string } }
) {
  const chair = CHAIRS.find(c => c.id === params.chair && c.active)
  // Direct-retailer programs we are approved with pay more than Amazon (~3%),
  // so their affiliateUrl wins. Add a retailer domain here as each is approved.
  const APPROVED_DIRECT = new Set(['relaxonchair.com'])
  const directLive = chair && APPROVED_DIRECT.has(chair.affiliateRetailer || '') ? chair.affiliateUrl : undefined
  const dest = directLive || chair?.amazonUrl || chair?.affiliateUrl
  if (!dest) {
    return NextResponse.redirect(new URL('/chairs/' + params.chair, req.url))
  }
  // TODO: log click to analytics here (chair id, timestamp)
  return NextResponse.redirect(dest, { status: 302 })
}
