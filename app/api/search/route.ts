import { NextRequest, NextResponse } from 'next/server'
import { runSearch } from '@/lib/search'

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') || '').trim()
  const { collections, chairs, articles, brands } = runSearch(q)
  return NextResponse.json({ results: [...collections, ...chairs, ...articles, ...brands], query: q })
}
