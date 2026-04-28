import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Review',
  description: 'How MassageChairFinder selects and evaluates massage chairs.',
}

export default function AboutPage() {
  return (
    <div className="section max-w-2xl">
      <h1 className="text-4xl font-serif mb-6">How We Review</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          MassageChairFinder is an independent site. We are not owned by a brand, a retailer, or a manufacturer.
          Our job is to help you make a confident decision — wherever you end up buying.
        </p>
        <h2>What we evaluate</h2>
        <p>
          Every chair in our catalog is evaluated on the same criteria: track type and roller coverage,
          roller dimensions relative to body type, zero-gravity positioning, heat and foot roller quality,
          weight and height accommodation, space requirements, warranty terms, and price relative to alternatives.
        </p>
        <h2>What we don't do</h2>
        <p>
          We don't rank chairs by which retailer pays the highest commission. We don't accept payment to
          feature or promote specific products. We don't manufacture affiliate links disguised as editorial
          recommendations.
        </p>
        <h2>Our methodology</h2>
        <p>
          We research published specifications and cross-reference them across manufacturer documentation,
          retailer listings, and owner reviews. Where specs conflict between sources, we note it. We disclose
          when we have not personally tested a chair.
        </p>
      </div>
    </div>
  )
}
