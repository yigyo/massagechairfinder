'use client'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'All Chairs', href: '/chairs' },
  { label: 'Compare', href: '/compare' },
  { label: 'Best For...', href: '/best' },
  { label: 'By Brand', href: '/brands' },
  { label: 'Buying Guide', href: '/learn' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b border-sand sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-navy hover:text-gold transition-colors">
            <img
              src="/GMC-logo-icon-1024x1024.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 flex-shrink-0"
            />
            Massage Chair Finder
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/finder" className="hidden md:inline-block btn-primary text-sm py-2 px-4">
            Find My Chair
          </Link>
          <button
            className="md:hidden text-charcoal"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-sand px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-charcoal hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/finder"
            onClick={() => setOpen(false)}
            className="block mt-3 btn-primary text-center py-2 px-4 text-sm"
          >
            Find My Chair
          </Link>
        </div>
      )}
    </header>
  )
}
