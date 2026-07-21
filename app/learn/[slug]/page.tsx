import { getLocalArticle, PUBLISHED_ARTICLES } from '@/lib/local-articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { autolink } from '@/lib/autolink'
import type { Metadata } from 'next'
import BuyersGuideCallout from '@/components/BuyersGuideCallout'
import YouTubeShort from '@/components/YouTubeShort'

// Slug -> published YouTube Short. Only PUBLIC videos belong here (a private
// video renders "unavailable"). Add a matched Short to its single best-fit
// article; the facade below the article body loads on click only.
const SHORT_BY_SLUG: Record<string, { id: string; title: string }> = {
  "track-types": { id: "cIsTyL6uT2c", title: "S-track vs L-track vs SL-track, in 30 seconds" },
  "massage-and-sleep": { id: "QqX0TtEFMGw", title: "Why a massage chair before bed helps you fall asleep" },
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
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

// Strips HTML to plain text for use in structured data.
function stripTags(input: string): string {
  return input
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Reads the FAQ that already exists at the bottom of an article body and returns
// its question/answer pairs for FAQPage structured data. This adds no visible
// markup and changes no layout; it only mirrors the existing on-page FAQ into
// JSON-LD so search and AI engines can parse it. Handles the three FAQ markup
// styles used across the library and never throws.
function extractFaqs(html: string): { question: string; answer: string }[] {
  try {
    if (!html) return []
    const heading = html.match(/<h2[^>]*>\s*(?:frequently asked questions|faq)\s*<\/h2>/i)
    if (!heading) return []
    let section = html.slice((heading.index ?? 0) + heading[0].length)
    const nextH2 = section.search(/<h2[^>]*>/i)
    if (nextH2 !== -1) section = section.slice(0, nextH2)

    const pairs: { question: string; answer: string }[] = []
    let m: RegExpExecArray | null

    // Style 1: <details><summary><strong>Q</strong></summary><p>A</p></details>
    const details = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi
    m = details.exec(section)
    while (m !== null) {
      const q = stripTags(m[1])
      const a = stripTags(m[2])
      if (q && a) pairs.push({ question: q, answer: a })
      m = details.exec(section)
    }

    // Style 2: <h3>Q</h3><p>A</p>
    if (pairs.length === 0) {
      const h3 = /<h3[^>]*>([\s\S]*?)<\/h3>\s*((?:<p[^>]*>[\s\S]*?<\/p>\s*)+)/gi
      m = h3.exec(section)
      while (m !== null) {
        const q = stripTags(m[1])
        const a = stripTags(m[2])
        if (q && a) pairs.push({ question: q, answer: a })
        m = h3.exec(section)
      }
    }

    // Style 3: <p><strong>Q</strong> A</p>
    if (pairs.length === 0) {
      const strongP = /<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/gi
      m = strongP.exec(section)
      while (m !== null) {
        const q = stripTags(m[1])
        const a = stripTags(m[2])
        if (q && a && a.length > 15) pairs.push({ question: q, answer: a })
        m = strongP.exec(section)
      }
    }

    return pairs
  } catch {
    return []
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  let article: {
    title: string
    excerpt?: string
    body: string
    slug?: string
    publishedAt?: string
    heroImage?: string
  } | null = null

  const local = getLocalArticle(params.slug)
  if (local) article = local

  if (!article) notFound()
  if (article.body === '<p>Coming soon.</p>') notFound()

  // Prev / next navigation
  const currentIndex = PUBLISHED_ARTICLES.findIndex(a => a.slug === params.slug)
  const prev = currentIndex > 0 ? PUBLISHED_ARTICLES[currentIndex - 1] : null
  const next = currentIndex < PUBLISHED_ARTICLES.length - 1 ? PUBLISHED_ARTICLES[currentIndex + 1] : null

  // Schema markup: Article + BreadcrumbList (+ FAQPage when the article has an FAQ)
  const pageUrl = `https://massagechairfinder.com/learn/${params.slug}`
  const graph: Record<string, unknown>[] = [
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
      ...(article.heroImage ? { image: [`https://massagechairfinder.com${article.heroImage}`] } : {}),
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
  ]

  // Mirror the existing on-page FAQ into FAQPage structured data (no visible change).
  const faqs = extractFaqs(article.body)
  if (faqs.length >= 2) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    })
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
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
        {article.heroImage && (
          <img
            src={article.heroImage}
            alt={article.title}
            width={1600}
            height={914}
            className="w-full h-auto rounded-lg mb-8"
          />
        )}
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

        {SHORT_BY_SLUG[params.slug] && (
          <YouTubeShort id={SHORT_BY_SLUG[params.slug].id} title={SHORT_BY_SLUG[params.slug].title} />
        )}

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
