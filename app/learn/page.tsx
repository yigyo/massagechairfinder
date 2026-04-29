import { getArticles } from '@/lib/strapi'
import { PUBLISHED_ARTICLES, LocalArticle } from '@/lib/local-articles'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Massage Chair Buying Guide',
  description: 'Covers the decisions that matter most: track type, body fit, room fit, pressure intensity, and budget.',
}

export default async function LearnPage() {
  let articles: LocalArticle[] = []
  try {
    const res = await getArticles()
    const strapiData = res.data || []
    if (strapiData.length > 0) {
      articles = strapiData.map((a: any) => {
        const attr = a.attributes || a
        return {
          slug: attr.slug,
          title: attr.title,
          excerpt: attr.excerpt || '',
          body: attr.body || '',
          order: attr.order || 99,
          publishedAt: attr.publishedAt || '',
        }
      })
    }
  } catch {}

  if (articles.length === 0) {
    articles = PUBLISHED_ARTICLES
  }

  return (
    <div className="section" style={{maxWidth: '700px'}}>
      <h1 className="text-4xl font-serif mb-2">Massage Chair Buying Guide</h1>
      <p className="text-warm-gray mb-10">
        Covers the decisions that matter most: track type, body fit, room fit, pressure intensity, and budget.
      </p>
      <div className="space-y-4">
        {articles.map((article) => {
          const isStub = article.body === '<p>Coming soon.</p>'
          return isStub ? (
            <div key={article.slug} className="card opacity-50 cursor-default">
              <h2 className="text-xl font-serif font-semibold text-navy mb-1">{article.title}</h2>
              <p className="text-warm-gray text-sm">Coming soon</p>
            </div>
          ) : (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="card hover:shadow-md transition-shadow group block"
            >
              <h2 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                {article.title}
              </h2>
              {article.excerpt && <p className="text-warm-gray">{article.excerpt}</p>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
