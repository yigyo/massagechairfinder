'use client'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'All Chairs', href: '/chairs' },
  { label: 'Compare', href: '/compare' },
  { label: 'Best For...', href: '/best' },
  { label: 'By Brand', href: '/brands' },
  { label: 'Buying Guide', href: '/learn' },
  { label: 'Chair Finder', href: '/finder' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl font-bold text-white hover:text-gold transition-colors">
            MassageChairFinder
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-sand hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/finder" className="hidden md:inline-block btn-primary text-sm py-2 px-4">
            Find My Chair
          </Link>
          <button
            className="md:hidden text-white"
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
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sand hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
