import type { Metadata } from 'next'
import Link from 'next/link'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/about" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/about"),
  title: 'About Massage Chair Finder',
  description: 'Massage Chair Finder helps you find the right massage chair for your body, your space, and your budget.',
}

export default function AboutPage() {
  return (
    <div className="section max-w-2xl">
      <h1 className="text-4xl font-serif mb-6">About Massage Chair Finder</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Massage Chair Finder exists because buying a massage chair is harder than it should be. The category
          is full of spec sheets, marketing language, and reviews written by people with commercial reasons
          to push you in a particular direction. We built this site to be something different: a genuinely
          useful resource that helps you make a confident decision, wherever you end up buying.
        </p>

        <h2>Who we are</h2>
        <p>
          We are a small, focused team that has spent considerable time researching the massage chair market:
          verifying specs against manufacturer documentation, mapping how chair features correspond to specific
          physical needs, and building tools like the{' '}
          <Link href="/finder" className="text-bronze hover:text-gold transition-colors">Chair Finder</Link>{' '}
          that match buyers to the right chair based on their pain profile, body type, budget, and room.
        </p>
        <p>
          Massage Chair Finder earns revenue through affiliate commissions
          when readers click through and make a purchase, and we disclose those relationships in full on our{' '}
          <Link href="/disclosure" className="text-bronze hover:text-gold transition-colors">disclosure page</Link>.
          Those commercial relationships do not influence which chairs we recommend or how we evaluate them.
        </p>

        <h2>What we cover</h2>
        <p>
          Our catalog spans a wide range of chairs across the major brands available in the U.S. market.
          Every chair in the catalog has been researched against manufacturer documentation and confirmed
          spec sources. Where a spec cannot be independently verified, we say so rather than guess.
        </p>
        <p>
          Beyond individual chair reviews, we publish{' '}
          <Link href="/learn" className="text-bronze hover:text-gold transition-colors">buying guide articles</Link>{' '}
          that cover every major decision a buyer faces: track types, roller dimensions, zero-gravity positioning,
          body fit, space requirements, and more. The buying guide is designed to be useful regardless of
          where you ultimately purchase.
        </p>

        <h2>Our editorial standard</h2>
        <p>
          We take positions. When one chair is meaningfully better for a specific type of buyer, we say so.
          When a category claim is overstated by the industry, we note it. Our{' '}
          <Link href="/how-we-review" className="text-bronze hover:text-gold transition-colors">review methodology</Link>{' '}
          is documented in full, including how we verify specifications and how we handle corrections.
        </p>

        <h2>Get in touch</h2>
        <p>
          If you have a question about a chair, a correction to report, or a suggestion for content we
          should cover, we want to hear from you.
        </p>
        <p>
          <Link href="/contact" className="text-bronze hover:text-gold transition-colors">Send us a message</Link>{' '}
          or email us directly at{' '}
          <a href="mailto:support@massagechairfinder.com" className="text-bronze hover:text-gold transition-colors">
            support@massagechairfinder.com
          </a>.
        </p>
      </div>
    </div>
  )
}
