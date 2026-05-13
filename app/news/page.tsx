import { getPublishedNews, formatNewsDate } from "@/lib/local-news"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title:       "Massage Chair News | Massage Chair Finder",
  description: "Weekly news from the massage chair category. New chair launches, brand announcements, third-party reviews, and the regulatory developments that matter to buyers.",
}

export default function NewsIndexPage() {
  const articles = getPublishedNews()
  return (
    <div className="section" style={{ maxWidth: "700px" }}>
      <h1 className="text-4xl font-serif mb-3">Massage Chair News</h1>
      <p className="text-warm-gray text-lg mb-10">
        Independent coverage of new chair launches, brand announcements, and third-party reviews. Updated weekly.
      </p>
      {articles.length === 0 ? (
        <p className="text-charcoal">No news articles yet. Check back soon.</p>
      ) : (
        <ul className="space-y-8">
          {articles.map(a => (
            <li key={a.slug} className="border-b border-sand pb-8 last:border-0">
              <Link href={"/news/" + a.slug} className="block group">
                <time className="text-warm-gray text-sm" dateTime={a.date}>
                  {formatNewsDate(a.date)}
                </time>
                <h2 className="font-serif text-2xl text-navy mt-1 group-hover:text-bronze transition-colors">
                  {a.title}
                </h2>
                {a.metaDescription ? (
                  <p className="text-charcoal mt-2 leading-relaxed">{a.metaDescription}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
