import { NextRequest, NextResponse } from 'next/server'
import { runSearch } from '@/lib/search'

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') || '').trim()
  const { chairs, articles, brands } = runSearch(q)
  return NextResponse.json({ results: [...chairs, ...articles, ...brands], query: q })
}
