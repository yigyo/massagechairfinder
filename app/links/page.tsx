import type { Metadata } from 'next'
import LinksHub from './LinksHub'

export const metadata: Metadata = {
  title: {
    absolute: 'Massage Chair Finder | Find Your Chair, Read Our Research',
  },
  description:
    'Independent massage chair research. Find your chair in 10 questions, read our articles, get the free Buyer\u2019s Guide.',
  alternates: { canonical: 'https://massagechairfinder.com/links' },
  robots: { index: true, follow: true },
}

export default function LinksPage() {
  return <LinksHub />
}
