import { getArticles } from '@/lib/strapi'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Massage Chair Buying Guide',
  description: 'Everything you need to make a confident decision — track types, roller dimensions, zero gravity, body fit, and room fit.',
}

export default async function LearnPage() {
  let articles: any[] = []
  try {
    const res = await getArticles()
    articles = res.data || []
  } catch {}

  return (
    <div className="section max-w-4xl">
      <h1 className="text-4xl font-serif mb-2">The Buying Guide</h1>
      <p className="text-warm-gray mb-10 max-w-2xl">
        Written for people who are new to massage chairs — not for people who already know the specs.
        Each section answers one question a real buyer asks before committing.
      </p>
      {articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article: any) => {
            const a = article.attributes || article
            return (
              <Link key={article.id} href={`/learn/${a.slug}`} className="card hover:shadow-md transition-shadow group block">
                <h2 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                  {a.title}
                </h2>
                {a.excerpt && <p className="text-warm-gray">{a.excerpt}</p>}
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {[
            { title: 'S-Track vs L-Track vs SL-Track: The most important decision you\'ll make', slug: 'track-types' },
            { title: 'Roller dimensions explained: width, stroke, and why your height matters', slug: 'roller-dimensions' },
            { title: 'Zero gravity: what it actually does and when it\'s worth it', slug: 'zero-gravity' },
            { title: 'How to size a massage chair for your body', slug: 'body-fit' },
            { title: 'Room fit: how much space you actually need', slug: 'room-fit' },
          ].map((item) => (
            <div key={item.slug} className="card">
              <h2 className="text-xl font-serif font-semibold text-navy mb-1">{item.title}</h2>
              <p className="text-warm-gray text-sm">Coming soon</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
