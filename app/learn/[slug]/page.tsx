import { getArticleBySlug } from '@/lib/strapi'
import { getLocalArticle, PUBLISHED_ARTICLES } from '@/lib/local-articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { autolink } from '@/lib/autolink'
import type { Metadata } from 'next'
import BuyersGuideCallout from '@/components/BuyersGuideCallout'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await getArticleBySlug(params.slug)
    const a = res.data?.[0]?.attributes || res.data?.[0]
    if (a?.title) return { title: a.title, description: a.excerpt || '' }
  } catch {}
  const local = getLocalArticle(params.slug)
  if (!local) return {}
  return { title: local.title, description: local.excerpt }
}

// Splits article HTML roughly at the midpoint of block elements
// so we can inject the Buyer's Guide callout between the two halves.
function splitHtmlAtMidpoint(html: string): [string, string] {
  const matches = [...html.matchAll(/<\/(p|h[2-6]|ul|ol|blockquote)>/gi)]
  if (matches.length < 4) return [html, ""]
  // Split at ~55% to put callout slightly past halfway
  const midIdx = Math.floor(matches.length * 0.55)
  const match  = matches[midIdx]
  const splitPos = (match.index ?? 0) + match[0].length
  return [html.slice(0, splitPos), html.slice(splitPos)]
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: {
    title: string
    excerpt?: string
    body: string
    slug?: string
    publishedAt?: string
  } | null = null

  try {
    const res = await getArticleBySlug(params.slug)
    const a = res.data?.[0]?.attributes || res.data?.[0]
    if (a?.title) article = { title: a.title, excerpt: a.excerpt, body: a.body || '' }
  } catch {}

  if (!article) {
    const local = getLocalArticle(params.slug)
    if (local) article = local
  }

  if (!article) notFound()
  if (article.body === '<p>Coming soon.</p>') notFound()

  // Prev / next navigation
  const currentIndex = PUBLISHED_ARTICLES.findIndex(a => a.slug === params.slug)
  const prev = currentIndex > 0 ? PUBLISHED_ARTICLES[currentIndex - 1] : null
  const next = currentIndex < PUBLISHED_ARTICLES.length - 1 ? PUBLISHED_ARTICLES[currentIndex + 1] : null

  // Schema markup: Article + BreadcrumbList
  const pageUrl = `https://massagechairfinder.com/learn/${params.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': pageUrl,
        headline: article.title,
        description: article.excerpt ?? '',
        url: pageUrl,
        datePublished: article.publishedAt ?? '2026-04-27',
        dateModified: article.publishedAt ?? '2026-04-27',
        author: {
          '@type': 'Organization',
          name: 'Massage Chair Finder',
          url: 'https://massagechairfinder.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Massage Chair Finder',
          url: 'https://massagechairfinder.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://massagechairfinder.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Learn',
            item: 'https://massagechairfinder.com/learn',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="section" style={{maxWidth: '700px'}}>
        <div className="mb-6">
          <Link href="/learn" className="text-bronze hover:text-gold text-sm">
            &larr; Learn
          </Link>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#2E7D6F' }}>
          Learning Center
        </p>
        <h1 className="text-4xl font-serif mb-4">{article.title}</h1>
        {article.excerpt && (
          <div className="mb-8 rounded-lg px-5 py-4" style={{ background: 'rgba(209,128,62,0.06)', border: '1px solid rgba(209,128,62,0.25)' }}>
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-2">Summary</p>
            <p className="text-lg text-charcoal leading-relaxed">{article.excerpt}</p>
          </div>
        )}
        {(() => {
          const processedHtml = autolink(article.body, params.slug)
          const [firstHalf, secondHalf] = splitHtmlAtMidpoint(processedHtml)
          return (
            <>
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bronze hover:prose-a:text-gold"
                dangerouslySetInnerHTML={{ __html: firstHalf }}
              />
              {secondHalf && (
                <>
                  <BuyersGuideCallout />
                  <div
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bronze hover:prose-a:text-gold"
                    dangerouslySetInnerHTML={{ __html: secondHalf }}
                  />
                </>
              )}
            </>
          )
        })()}

        {/* Article pagination */}
        <nav className="mt-12 pt-8 border-t border-sand grid grid-cols-3 gap-4 text-sm">
          <div>
            {prev && (
              <Link href={`/learn/${prev.slug}`} className="text-bronze hover:text-gold group">
                <span className="block text-warm-gray text-xs mb-1">&larr; Previous</span>
                <span className="group-hover:underline">{prev.title.split(':')[0]}</span>
              </Link>
            )}
          </div>
          <div className="text-center">
            <Link href="/learn" className="text-bronze hover:text-gold">
              <span className="block text-warm-gray text-xs mb-1">Learn</span>
              <span>All sections</span>
            </Link>
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/learn/${next.slug}`} className="text-bronze hover:text-gold group">
                <span className="block text-warm-gray text-xs mb-1">Next &rarr;</span>
                <span className="group-hover:underline">{next.title.split(':')[0]}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
