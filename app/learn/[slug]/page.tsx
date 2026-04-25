import { getArticleBySlug } from '@/lib/strapi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await getArticleBySlug(params.slug)
    const a = res.data?.[0]?.attributes || res.data?.[0]
    if (!a) return {}
    return { title: a.title, description: a.excerpt || '' }
  } catch { return {} }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: any = null
  try {
    const res = await getArticleBySlug(params.slug)
    article = res.data?.[0]?.attributes || res.data?.[0]
  } catch { notFound() }
  if (!article) notFound()

  return (
    <div className="section max-w-3xl">
      <div className="mb-6"><Link href="/learn" className="text-bronze hover:text-gold text-sm">← Buying Guide</Link></div>
      <h1 className="text-4xl font-serif mb-4">{article.title}</h1>
      {article.excerpt && <p className="text-xl text-warm-gray mb-8 leading-relaxed">{article.excerpt}</p>}
      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-bronze hover:prose-a:text-gold"
        dangerouslySetInnerHTML={{ __html: article.body || '' }}
      />
    </div>
  )
}
