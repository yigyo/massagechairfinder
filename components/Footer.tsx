import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sand mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 shrink-0">
            <Link href="/" className="font-serif text-lg font-bold text-navy hover:text-gold transition-colors">
              Massage Chair Finder
            </Link>
            <p className="mt-3 text-sm text-warm-gray leading-relaxed">
              Find the chair that fits your body, your space, and your budget.
            </p>
            <SearchBar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:flex-1">
            <div>
              <h4 className="text-navy font-semibold mb-3 text-sm uppercase tracking-wide">Browse</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chairs" className="text-charcoal hover:text-gold transition-colors">All Chairs</Link></li>
                <li><Link href="/brands" className="text-charcoal hover:text-gold transition-colors">By Brand</Link></li>
                <li><Link href="/compare" className="text-charcoal hover:text-gold transition-colors">Compare Chairs</Link></li>
                <li><Link href="/best" className="text-charcoal hover:text-gold transition-colors">Best For...</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy font-semibold mb-3 text-sm uppercase tracking-wide">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/learn" className="text-charcoal hover:text-gold transition-colors">Buying Guide</Link></li>
                <li><Link href="/learn/track-types" className="text-charcoal hover:text-gold transition-colors">Track Types Explained</Link></li>
                <li><Link href="/learn/zero-gravity" className="text-charcoal hover:text-gold transition-colors">Zero Gravity Explained</Link></li>
                <li><Link href="/finder" className="text-charcoal hover:text-gold transition-colors">Chair Finder</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy font-semibold mb-3 text-sm uppercase tracking-wide">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-charcoal hover:text-gold transition-colors">About Us</Link></li>
                <li><Link href="/how-we-review" className="text-charcoal hover:text-gold transition-colors">How We Review</Link></li>
                <li><Link href="/contact" className="text-charcoal hover:text-gold transition-colors">Contact</Link></li>
                <li><Link href="/disclosure" className="text-charcoal hover:text-gold transition-colors">Affiliate Disclosure</Link></li>
                <li><Link href="/privacy-policy" className="text-charcoal hover:text-gold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-sand flex justify-center gap-5">
          <a
            href="https://www.instagram.com/massagechairfinder/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/massagechairfinder"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.pinterest.com/massagechairfinder/"
            aria-label="Pinterest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M11 8c2.5 0 4 1.5 4 3.5S13.5 15 12 15c-1 0-1.5-.5-1.5-1.5" />
              <path d="M10 22l2-8" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/channel/UC8uDtnqYXR7R0qrwa7H3v7Q"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" rx="3" />
              <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@massagechairfinder"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 16a4 4 0 1 0 4-4V4h2c.5 2.5 2 4 4.5 4" />
            </svg>
          </a>
        </div>
        <div className="mt-10 pt-6 border-t border-teal text-xs text-warm-gray">
          <p>
            Massage Chair Finder participates in affiliate programs. When you click a link and make a purchase,
            we may earn a commission at no additional cost to you. This never influences our recommendations.{' '}
            <Link href="/disclosure" className="underline hover:text-gold">Full disclosure.</Link>
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Massage Chair Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
