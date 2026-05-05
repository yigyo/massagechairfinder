import type { Metadata } from 'next'
import './globals.css'
import NavigationWrapper from '@/components/NavigationWrapper'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ScrollTracker from '@/components/ScrollTracker'
import Script from 'next/script'

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
        <GoogleAnalytics />
        <ScrollTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteSchema }}
        />
        <NavigationWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Koda AI Chair Advisor */}
        <Script id="koda-chat-config" strategy="beforeInteractive">
          {`window.MCFChatConfig = { backendUrl: 'https://emily-chat-backend.vercel.app' };`}
        </Script>
        <Script
          src="https://emily-chat-backend.vercel.app/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
