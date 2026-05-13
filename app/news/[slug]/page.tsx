import { getPublishedNews, getNewsArticle, formatNewsDate } from "@/lib/local-news"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getPublishedNews().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getNewsArticle(params.slug)
  if (!article) return {}
  return {
    title:       article.title,
    description: article.metaDescription,
  }
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = getNewsArticle(params.slug)
  if (!article) notFound()

  const pageUrl = "https://massagechairfinder.com/news/" + params.slug
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":             "NewsArticle",
        "@id":               pageUrl,
        headline:            article.title,
        description:         article.metaDescription,
        url:                 pageUrl,
        datePublished:       article.date,
        dateModified:        article.lastModified || article.date,
        author: {
          "@type": "Organization",
          name:    "Massage Chair Finder",
          url:     "https://massagechairfinder.com",
        },
        publisher: {
          "@type": "Organization",
          name:    "Massage Chair Finder",
          url:     "https://massagechairfinder.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":   pageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://massagechairfinder.com" },
          { "@type": "ListItem", position: 2, name: "News", item: "https://massagechairfinder.com/news" },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
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
      <div className="section" style={{ maxWidth: "700px" }}>
        <div className="mb-6">
          <Link href="/news" className="text-bronze hover:text-gold text-sm">
            &larr; All news
          </Link>
        </div>
        <h1 className="text-4xl font-serif mb-3">{article.title}</h1>
        <time className="text-warm-gray text-sm block mb-8" dateTime={article.date}>
          {formatNewsDate(article.date)}
        </time>
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bronze hover:prose-a:text-gold"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      </div>
    </>
  )
}
