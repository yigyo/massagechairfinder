import type { Metadata } from 'next'
import ChairFinder from './ChairFinder'

export const metadata: Metadata = {
  title: 'Massage Chair Finder — Find Your Match',
  description:
    'Answer a few questions about your pain, your space, and your budget. Emily will match you with the chairs most likely to be a genuine fit — no pressure, no sales pitch.',
}

export default function FinderPage() {
  return <ChairFinder />
}
