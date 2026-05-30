import type { Metadata } from 'next'
import { Noto_Serif, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/NavigationWrapper'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ScrollTracker from '@/components/ScrollTracker'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import ChromeGate from '@/components/ChromeGate'
import Script from 'next/script'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Massage Chair Finder — Find the Right Chair for Your Body',
    template: '%s | Massage Chair Finder',
  },
  description:
    'Find the massage chair that fits your body, your space, and your budget.',
  metadataBase: new URL('https://massagechairfinder.com'),
  openGraph: {
    siteName: 'Massage Chair Finder',
  },
  other: {
    'p:domain_verify': '73bf3c39201c0d9252eb77e95e611435',
  },
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
        'Find the massage chair that fits your body, your space, and your budget.',
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
    <html lang="en" className={`${notoSerif.variable} ${ibmPlexSans.variable}`}>
      <body className="bg-background text-charcoal min-h-screen flex flex-col">
        <GoogleAnalytics />
        <ScrollTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteSchema }}
        />
        <ChromeGate>
          <NavigationWrapper />
        </ChromeGate>
        <main className="flex-1">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <ChromeGate>
          <ExitIntentPopup />
        </ChromeGate>
        {/* Cloudflare Turnstile (invisible bot protection on forms) */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          async
          defer
        />
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
