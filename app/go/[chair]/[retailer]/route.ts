import { NextRequest, NextResponse } from 'next/server'
import { getChairBySlug } from '@/lib/strapi'

export async function GET(
  _req: NextRequest,
  { params }: { params: { chair: string; retailer: string } }
) {
  try {
    const res = await getChairBySlug(params.chair)
    const chair = res.data?.[0]?.attributes || res.data?.[0]
    if (!chair) return NextResponse.redirect(new URL('/chairs', _req.url))

    const links: any[] = chair.retailerLinks || []
    const match = links.find(
      (l: any) => l.retailerName?.toLowerCase().replace(/\s+/g, '-') === params.retailer
    )

    if (!match?.url) return NextResponse.redirect(new URL(`/chairs/${params.chair}`, _req.url))

    // TODO: log click to analytics DB here (chair, retailer, timestamp)

    return NextResponse.redirect(match.url, { status: 302 })
  } catch {
    return NextResponse.redirect(new URL('/chairs', _req.url))
  }
}
