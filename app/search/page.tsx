import { Metadata } from 'next'
import { Suspense } from 'react'
import SearchContent from '@/components/SearchContent'

interface Props {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = searchParams.q || ''
  return {
    title: q ? 'Search results for "' + q + '"' : "Search",
    description: 'Search massage chairs, buying guides, and brand profiles on Massage Chair Finder.',
    robots: { index: false },
  }
}

export default function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || '').trim()
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-12 bg-sand rounded-xl animate-pulse mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-sand rounded-xl animate-pulse opacity-60" style={{ animationDelay: i * 80 + 'ms' }} />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent initialQuery={q} />
    </Suspense>
  )
}
