import { NextRequest, NextResponse } from 'next/server'
import { CHAIRS, resolveAffiliateUrl } from '@/lib/chairs'

export async function GET(
  req: NextRequest,
  { params }: { params: { chair: string } }
) {
  const chair = CHAIRS.find(c => c.id === params.chair && c.active)
  // Legacy redirect kept for old/bookmarked links. Rendered links are now direct
  // (resolveAffiliateUrl). Uses the same resolver so behavior stays in sync.
  const dest = chair ? resolveAffiliateUrl(chair) : undefined
  if (!dest) {
    return NextResponse.redirect(new URL('/chairs/' + params.chair, req.url))
  }
  // TODO: log click to analytics here (chair id, timestamp)
  return NextResponse.redirect(dest, { status: 302 })
}
