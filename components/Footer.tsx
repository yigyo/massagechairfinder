import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import BuyersGuideForm from '@/components/BuyersGuideForm'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sand mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Lead magnet opt-in */}
        <div
          className="rounded-xl px-6 py-7 mb-10 flex flex-col md:flex-row md:items-center gap-6"
          style={{ background: "#F5F1EB", border: "1px solid #E8DFD3" }}
        >
          <div className="md:flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#934713" }}
            >
              Free Download
            </p>
            <h3
              className="font-serif text-lg font-bold mb-1"
              style={{ color: "#1C2331" }}
            >
              Free Buyer&apos;s Guide
            </h3>
            <p className="text-sm" style={{ color: "#6B6B65" }}>
              The six decisions that matter, in one PDF.
            </p>
          </div>
          <div className="md:w-96">
            <BuyersGuideForm buttonLabel="Get the Guide" source="footer" />
          </div>
        </div>

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
                <li><Link href="/about" className="text-charcoal hover:text-gold transition-colors">How We Review</Link></li>
                <li><Link href="/disclosure" className="text-charcoal hover:text-gold transition-colors">Affiliate Disclosure</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-sand text-xs text-warm-gray">
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
