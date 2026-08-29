import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/disclosure" },
  title: 'Affiliate Disclosure',
  description: 'How Massage Chair Finder makes money and how that affects our recommendations.',
}

export default function DisclosurePage() {
  return (
    <div className="section max-w-2xl">
      <h1 className="text-4xl font-serif mb-6">Affiliate Disclosure</h1>

      <h2 className="text-2xl font-serif mb-3 mt-8">Amazon Associates</h2>
      <p className="mb-4 text-charcoal leading-relaxed">
        Massage Chair Finder is a participant in the Amazon Services LLC Associates Program, an
        affiliate advertising program designed to provide a means for sites to earn advertising
        fees by advertising and linking to Amazon.com. As an Amazon Associate we earn from
        qualifying purchases. Prices and availability shown on Amazon are accurate as of the time
        of your visit to Amazon and are subject to change.
      </p>
      <div className="prose prose-lg max-w-none">
        <p>
          Massage Chair Finder participates in affiliate marketing programs. This means that when you click
          a link to a retailer on this site and make a purchase, we may earn a commission -- at no additional
          cost to you.
        </p>
        <p>
          We only link to retailers that sell the chairs we have researched. Commission rates vary by retailer
          and do not influence our editorial recommendations. A chair we recommend will not change position
          because one retailer pays a higher commission than another.
        </p>
        <p>
          Our recommendations are based on published specifications, user fit criteria (track type, roller
          dimensions, weight capacity, height range), price positioning, and brand reputation for warranty
          support.
        </p>
        <p>
          If you have questions about our methodology or want to suggest a chair we have not covered,
          please <Link href="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  )
}
