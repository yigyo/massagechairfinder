import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How MassageChairFinder makes money and how that affects our recommendations.',
}

export default function DisclosurePage() {
  return (
    <div className="section max-w-3xl">
      <h1 className="text-4xl font-serif mb-6">Affiliate Disclosure</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          MassageChairFinder participates in affiliate marketing programs. This means that when you click
          a link to a retailer on this site and make a purchase, we may earn a commission — at no additional
          cost to you.
        </p>
        <p>
          We only link to retailers that sell the chairs we've researched. Commission rates vary by retailer
          and do not influence our editorial recommendations. A chair we recommend will not change position
          because one retailer pays a higher commission than another.
        </p>
        <p>
          Our recommendations are based on published specifications, user fit criteria (track type, roller
          dimensions, weight capacity, height range), price positioning, and brand reputation for warranty
          support. We disclose when we have not personally tested a chair.
        </p>
        <p>
          If you have questions about our methodology or want to suggest a chair we haven't covered,
          please <a href="mailto:hello@massagechairfinder.com">contact us</a>.
        </p>
      </div>
    </div>
  )
}
