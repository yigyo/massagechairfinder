import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chair Finder Quiz',
  description: 'Answer 10 questions about your body, space, and budget. We\'ll show you the chairs most likely to work for you.',
}

export default function FinderPage() {
  return (
    <div className="section max-w-3xl">
      <h1 className="text-4xl font-serif mb-3">Find Your Chair</h1>
      <p className="text-warm-gray mb-8 text-lg">
        Answer a few questions about your body, your space, and what you're hoping to feel. We'll point you
        toward the chairs most likely to fit your situation — no pressure, no sales pitch.
      </p>
      {/* Quiz embed — Typeform iframe, replaced with Florence when ready */}
      <div className="bg-sand rounded-lg p-8 text-center text-warm-gray">
        <p className="text-lg font-serif text-navy mb-2">Quiz loading…</p>
        <p className="text-sm">
          The Chair Finder quiz will appear here. If it doesn't load,{' '}
          <a href="mailto:hello@massagechairfinder.com" className="underline">contact us</a>.
        </p>
      </div>
    </div>
  )
}
