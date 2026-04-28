import { getArticleBySlug } from '@/lib/strapi'
import { getLocalArticle } from '@/lib/local-articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: { title: string; excerpt?: string; body: string } | null = null

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

  return (
    <div className="section max-w-xl">
      <div className="mb-6">
        <Link href="/learn" className="text-bronze hover:text-gold text-sm">
          &larr; Buying Guide
        </Link>
      </div>
      <h1 className="text-4xl font-serif mb-4">{article.title}</h1>
      {article.excerpt && (
        <p className="text-xl text-warm-gray mb-8 leading-relaxed">{article.excerpt}</p>
      )}
      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bronze hover:prose-a:text-gold"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </div>
  )
}
