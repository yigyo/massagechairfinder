import { getArticleBySlug } from '@/lib/strapi'
import { getLocalArticle } from '@/lib/local-articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Try Strapi first, fall back to local
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

  // Try Strapi first
  try {
    const res = await getArticleBySlug(params.slug)
    const a = res.data?.[0]?.attributes || res.data?.[0]
    if (a?.title) article = { title: a.title, excerpt: a.excerpt, body: a.body || '' }
  } catch {}

  // Fall back to local articles
  if (!article) {
    const local = getLocalArticle(params.slug)
    if (local) article = local
  }

  if (!article) notFound()

  // Don't render stub pages
  if (article.body === '<p>Coming soon.</p>') not