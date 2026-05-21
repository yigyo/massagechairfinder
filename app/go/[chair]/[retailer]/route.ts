import { NextRequest, NextResponse } from 'next/server'

// Legacy route: retailer-specific links no longer used.
// Redirect to the primary affiliate URL via the simple /go/[chair] route.
export async function GET(
  req: NextRequest,
  { params }: { params: { chair: string; retailer: string } }
) {
  return NextResponse.redirect(new URL(`/go/${params.chair}`, req.url), { status: 302 })
}
