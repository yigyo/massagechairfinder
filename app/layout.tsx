import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Massage Chair Finder — Find the Right Chair for Your Body',
    template: '%s | Massage Chair Finder',
  },
  description:
    'Independent guidance and honest comparisons to help you find the massage chair that fits your body, your space, and your budget.',
  metadataBase: new URL('https://massagechairfinder.com'),
}

const siteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://massagechairfinder.com/#website',
      url: 'https://massagechairfinder.com',
      name: 'Massage Chair Finder',
      description:
        'Independent guidance and honest comparisons to help you find the massage chair that fits your body, your space, and your budget.',
    },
    {
      '@type': 'Organization',
      '@id': 'https://massagechairfinder.com/#organization',
      name: 'Massage Chair Finder',
      url: 'https://massagechairfinder.com',
    },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-linen text-charcoal min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteSchema }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
