import { Metadata } from 'next'
import Link from 'next/link'
import { runSearch } from '@/lib/search'
import type { SearchResult } from '@/lib/search'

interface Props {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = searchParams.q || ''
  return {
    title: q ? 'Search results for "' + q + '"' : 'Search',
    description: 'Search massage chairs, buying guides, and brands on Massage Chair Finder.',
    robots: { index: false },
  }
}

const TYPE_LABELS: Record<SearchResult['type'], string> = {
  collection: 'Best Picks',
  chair: 'Chair',
  article: 'Guide',
  brand: 'Brand',
}

const TYPE_BADGE_COLORS: Record<SearchResult['type'], string> = {
  collection: 'bg-terra-cotta text-white',
  chair: 'bg-navy text-white',
  article: 'bg-teal text-white',
  brand: 'bg-gold text-white',
}

function ResultCard({ result }: { result: SearchResult }) {
  return (
    <Link
      href={result.href}
      className="flex flex-col gap-1 p-4 rounded-lg bg-white border border-sand hover:border-gold hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-navy font-semibold text-sm leading-snug">{result.title}</span>
        <span className={'text-xs font-medium px-2 py-0.5 rounded shrink-0 ' + TYPE_BADGE_COLORS[result.type]}>
          {TYPE_LABELS[result.type]}
        </span>
      </div>
      {result.subtitle && (
        <p className="text-xs text-warm-gray leading-relaxed">{result.subtitle}</p>
      )}
    </Link>
  )
}

function ResultSection({ title, results }: { title: string; results: SearchResult[] }) {
  if (results.length === 0) return null
  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-navy uppercase tracking-wide mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((r, i) => (
          <ResultCard key={r.href + i} result={r} />
        ))}
      </div>
    </section>
  )
}

export default function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || '').trim()
  const { collections, chairs, articles, brands } = runSearch(q)
  const total = collections.length + chairs.length + articles.length + brands.length

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-navy mb-1">
          {q ? 'Results for "' + q + '"' : 'Search'}
        </h1>
        {q && (
          <p className="text-sm text-warm-gray">
            {total === 0
              ? 'No results found. Try a chair name, brand, or topic like "back pain" or "zero gravity".'
              : total + ' result' + (total === 1 ? '' : 's') + ' across chairs, guides, and brands.'}
          </p>
        )}
      </div>

      {!q && (
        <p className="text-charcoal text-sm">
          Enter a search term to find chairs, buying guide articles, or brand pages. Try searching for a
          brand like "Osaki", a condition like "sciatica" or "lower back pain", or a feature like "zero gravity".
        </p>
      )}

      {q && total === 0 && (
        <div className="bg-white border border-sand rounded-lg p-6 text-sm text-charcoal space-y-3">
          <p className="font-medium text-navy">Not sure where to start?</p>
          <p>
            Use the{' '}
            <Link href="/finder" className="text-gold hover:underline">Chair Finder</Link>{' '}
            to answer a few questions and get a personalized recommendation, or browse the{' '}
            <Link href="/learn" className="text-gold hover:underline">Buying Guide</Link>{' '}
            to learn what to look for.
          </p>
        </div>
      )}

      {total > 0 && (
        <>
          <ResultSection title="Best Picks" results={collections} />
          <ResultSection title="Chairs" results={chairs} />
          <ResultSection title="Buying Guides" results={articles} />
          <ResultSection title="Brands" results={brands} />
        </>
      )}
    </div>
  )
}
