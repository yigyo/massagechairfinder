import { NextRequest, NextResponse } from 'next/server'
import { CHAIRS } from '@/lib/chairs'

export async function GET(
  req: NextRequest,
  { params }: { params: { chair: string } }
) {
  const chair = CHAIRS.find(c => c.id === params.chair && c.active)
  if (!chair?.affiliateUrl) {
    return NextResponse.redirect(new URL('/chairs/' + params.chair, req.url))
  }
  // TODO: log click to analytics here (chair id, timestamp)
  return NextResponse.redirect(chair.affiliateUrl, { status: 302 })
}
