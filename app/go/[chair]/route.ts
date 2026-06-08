import { NextRequest, NextResponse } from 'next/server'
import { CHAIRS } from '@/lib/chairs'

export async function GET(
  req: NextRequest,
  { params }: { params: { chair: string } }
) {
  const chair = CHAIRS.find(c => c.id === params.chair && c.active)
  const dest = chair?.amazonUrl || chair?.affiliateUrl
  if (!dest) {
    return NextResponse.redirect(new URL('/chairs/' + params.chair, req.url))
  }
  // TODO: log click to analytics here (chair id, timestamp)
  return NextResponse.redirect(dest, { status: 302 })
}
