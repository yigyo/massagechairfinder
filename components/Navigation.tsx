'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const navLinks = [
  { label: 'All Chairs', href: '/chairs' },
  { label: 'Compare', href: '/compare' },
  { label: 'Best For...', href: '/best' },
  { label: 'By Brand', href: '/brands' },
  { label: 'Buying Guide', href: '/learn' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const router = useRouter()

  // Close search on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setSearchOpen(false)
    setQuery('')
    router.push('/search?q=' + encodeURIComponent(trimmed))
  }

  function handleSearchKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header ref={headerRef} className="bg-white border-b border-sand sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-navy hover:text-gold transition-colors">
            <img src="/GMC-logo-icon-1024x1024.png" alt="" width={32} height={32} className="h-8 w-8 flex-shrink-0" />
            Massage Chair Finder
          </Link>

          {/* Desktop nav + CTA + search icon */}
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
            <Link href="/finder" className="btn-primary text-sm py-2 px-4">
              Find My Chair
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(v => !v)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              className="flex items-center justify-center p-2 text-charcoal hover:text-gold transition-colors"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop search -- centered floating card, 100px below header */}
      {searchOpen && (
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[540px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-sand p-5 z-50"
          style={{ top: 'calc(100% + 100px)' }}
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none">
                <SearchIcon />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search ..."
                aria-label="Search the site"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-sand bg-linen text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 text-sm py-2.5 px-5 rounded-lg border border-gold text-gold bg-transparent hover:bg-gold hover:text-white transition-colors"
            >
              Search
            </button>
          </form>
          <p className="mt-2 text-xs text-warm-gray">
            Try: "Osaki", "sciatica", "zero gravity", "space saving", or a chair name
          </p>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-sand px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-charcoal hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile search */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-3 flex items-center gap-2"
          >
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search ..."
              className="flex-1 text-sm px-3 py-2 rounded border border-sand bg-linen text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button type="submit" aria-label="Search" className="p-2 rounded border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
              <SearchIcon />
            </button>
          </form>
          <Link
            href="/finder"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 btn-primary text-center py-2 px-4 text-sm"
          >
            Find My Chair
          </Link>
        </div>
      )}
    </header>
  )
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
