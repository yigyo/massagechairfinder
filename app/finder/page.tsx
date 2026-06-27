import type { Metadata } from 'next'
import ChairFinder from './ChairFinder'

export const metadata: Metadata = {
  title: 'Massage Chair Finder: Find Your Match',
  description:
    'Answer a few questions about your pain, your space, and your budget, and get matched with the chairs most likely to be a genuine fit. No pressure, no sales pitch.',
}

export default function FinderPage() {
  return <ChairFinder />
}
