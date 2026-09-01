import type { Metadata } from 'next'
import LinksHub from './LinksHub'
import { pageOpenGraph } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: 'Massage Chair Finder | Find Your Chair, Read Our Research',
  },
  description:
    'Find the massage chair that fits your body, your space, and your budget. Match your fit in 10 questions, read our articles, get the free Buyer\u2019s Guide.',
  alternates: { canonical: 'https://www.massagechairfinder.com/links' },
  openGraph: pageOpenGraph('https://www.massagechairfinder.com/links'),
  robots: { index: true, follow: true },
}

export default function LinksPage() {
  return <LinksHub />
}
