import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
  display: 'swap',
})

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
    <html