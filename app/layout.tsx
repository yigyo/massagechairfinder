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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-linen text-charcoal min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
