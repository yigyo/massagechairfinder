import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-sand mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-lg font-bold text-white hover:text-gold transition-colors">
              MassageChairFinder
            </Link>
            <p className="mt-3 text-sm text-warm-gray leading-relaxed">
              Independent guidance for one of the most considered purchases you'll make for your home and your body.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chairs" className="hover:text-gold transition-colors">All Chairs</Link></li>
              <li><Link href="/brands" className="hover:text-gold transition-colors">By Brand</Link></li>
              <li><Link href="/compare" className="hover:text-gold transition-colors">Compare Chairs</Link></li>
              <li><Link href="/best" className="hover:text-gold transition-colors">Best For...</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn/massage-chair-buying-guide" className="hover:text-gold transition-colors">Buying Guide</Link></li>
              <li><Link href="/learn/track-types" className="hover:text-gold transition-colors">Track Types Explained</Link></li>
              <li><Link href="/learn/zero-gravity" className="hover:text-gold transition-colors">Zero Gravity Explained</Link></li>
              <li><Link href="/finder" className="hover:text-gold transition-colors">Chair Finder Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gold transition-colors">How We Review</Link></li>
              <li><Link href="/disclosure" className="hover:text-gold transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-warm-gray">
          <p>
            MassageChairFinder participates in affiliate programs. When you click a link and make a purchase,
            we may earn a commission at no additional cost to you. This never influences our recommendations.{' '}
            <Link href="/disclosure" className="underline hover:text-gold">Full disclosure.</Link>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} MassageChairFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
