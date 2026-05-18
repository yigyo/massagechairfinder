import { getArticles } from "@/lib/strapi"
import { PUBLISHED_ARTICLES, LocalArticle } from "@/lib/local-articles"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learning Center | Massage Chair Finder",
  description: "Independent research on every aspect of buying and owning a massage chair. Track types, health conditions, tech explained, and honest buying questions answered.",
}

const CATEGORIES: { label: string; description: string; slugs: string[] }[] = [
  {
    label: "Core Decisions",
    description: "The topics every buyer needs to understand before choosing a chair.",
    slugs: [
      "track-types",
      "how-to-buy",
      "body-fit",
      "room-fit",
      "roller-dimensions",
      "zero-gravity",
      "brands-overview",
    ],
  },
  {
    label: "Tech Explained",
    description: "Feature-by-feature breakdowns of the specs you will find on every product page.",
    slugs: [
      "sl-track",
      "4d-rollers",
      "4d-vs-3d-massage-chair-rollers",
      "five-d-massage-chairs",
      "body-scanning",
      "wall-hugger",
      "airbag-massage",
      "heat-therapy",
      "ai-massage-chairs",
    ],
  },
  {
    label: "Health & Conditions",
    description: "Condition-specific guidance on what features help and what to avoid.",
    slugs: [
      "massage-chairs-for-lower-back-pain",
      "massage-chairs-for-arthritis",
      "massage-chairs-for-fibromyalgia",
      "massage-chairs-and-blood-pressure",
      "massage-chairs-for-seniors",
      "lift-assist-massage-chairs",
      "massage-chairs-for-stress",
      "massage-chairs-for-sports-recovery",
      "massage-chairs-for-posture",
      "massage-chairs-during-pregnancy",
      "massage-chair-sleep",
    ],
  },
  {
    label: "Buying Questions",
    description: "Honest answers to the questions that come up before committing to a significant purchase.",
    slugs: [
      "are-massage-chairs-worth-it",
      "do-massage-chairs-work",
      "why-massage-chairs-are-expensive",
      "massage-chair-price-tiers",
      "how-long-do-massage-chairs-last",
      "hsa-fsa-massage-chairs",
      "massage-chairs-made-in-usa",
      "japanese-massage-chairs",
      "refurbished-massage-chairs",
      "massage-chair-delivery-types",
      "massage-chair-warranty-guide",
      "why-massage-chairs-get-returned",
      "massage-chair-trial-period",
      "office-massage-chairs",
      "massage-chair-vending-business",
    ],
  },
  {
    label: "Owning a Chair",
    description: "Getting the most from a chair you already have or are about to receive.",
    slugs: [
      "how-to-use-a-massage-chair",
      "massage-chair-stretch-program",
      "heated-massage-chairs",
      "massage-chair-reliability",
    ],
  },
  {
    label: "Massage Research",
    description: "What peer-reviewed studies show about how massage works. Research-grounded, citation-heavy, honest about evidence strength.",
    slugs: [
      "massage-and-pain",
      "massage-and-stress",
      "massage-and-sleep",
      "massage-modalities-explained",
      "physiology-of-massage",
    ],
  },
]

function slugifyLabel(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
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
          excerpt: attr.excerpt || "",
          body: attr.body || "",
          order: attr.order || 99,
          publishedAt: attr.publishedAt || "",
        }
      })
    }
  } catch {}

  if (articles.length === 0) {
    articles = PUBLISHED_ARTICLES
  }

  const published = articles.filter((a) => a.body !== "<p>Coming soon.</p>")

  const articleMap = new Map<string, LocalArticle>()
  for (const a of articles) {
    articleMap.set(a.slug, a)
  }

  return (
    <div className="section" style={{ maxWidth: "860px" }}>
      <h1 className="text-4xl font-serif mb-2">Learning Center</h1>
      <p className="text-warm-gray mb-8">
        Independent research on every aspect of buying and owning a massage chair.{" "}
        <span className="text-charcoal">{published.length} articles.</span>
      </p>

      {/* Jump nav */}
      <nav className="mb-12 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.label}
            href={"#" + slugifyLabel(cat.label)}
            className="text-sm px-3 py-1.5 rounded-full border border-sand text-charcoal hover:border-gold hover:text-gold transition-colors"
          >
            {cat.label}
          </a>
        ))}
      </nav>

      {CATEGORIES.map((cat) => {
        const catArticles = cat.slugs
          .map((slug) => articleMap.get(slug))
          .filter((a): a is LocalArticle => !!a)

        if (catArticles.length === 0) return null

        return (
          <section key={cat.label} id={slugifyLabel(cat.label)} className="mb-14 scroll-mt-20">
            <div className="mb-5 pb-3 border-b border-sand">
              <h2 className="text-xl font-serif font-semibold text-navy mb-1">
                {cat.label}
              </h2>
              <p className="text-warm-gray text-sm">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {catArticles.map((article) => {
                const isStub = article.body === "<p>Coming soon.</p>"
                return isStub ? (
                  <div key={article.slug} className="card opacity-50 cursor-default">
                    <h3 className="text-base font-serif font-semibold text-navy mb-1">
                      {article.title}
                    </h3>
                    <p className="text-warm-gray text-xs">Coming soon</p>
                  </div>
                ) : (
                  <Link
                    key={article.slug}
                    href={"/learn/" + article.slug}
                    className="card hover:shadow-md transition-shadow group block"
                  >
                    <h3 className="text-base font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-1">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-warm-gray text-sm leading-snug line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
