'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type NavPage = { label: string; slug: string }

type Props = {
  bestPages?:    NavPage[]
  comparePages?: NavPage[]
}

type NavChild = { label: string; href: string }
type NavLink  = {
  label:     string
  href:      string
  children?: NavChild[]
  viewAll?:  string
}

// Dropdown container class per nav section
function dropdownClass(label: string): string {
  if (label === 'By Brand')
    return 'grid grid-cols-2 gap-x-4 min-w-[360px] px-3'
  if (label === 'Compare')
    return 'grid grid-cols-2 gap-x-4 min-w-[640px] px-3'
  return 'flex flex-col min-w-[230px]'
}

function itemNoWrap(label: string): boolean {
  return label !== 'Compare'
}

function footerColSpan(label: string): string {
  return label === 'By Brand' || label === 'Compare' ? 'col-span-2' : ''
}

const BY_BRAND_CHILDREN: NavChild[] = [
  { label: 'Ador',               href: '/brands/ador' },
  { label: 'AmaMedics',          href: '/brands/amamedics' },
  { label: 'Bodyfriend',         href: '/brands/bodyfriend' },
  { label: 'Ceragem',            href: '/brands/ceragem' },
  { label: 'Daiwa',              href: '/brands/daiwa' },
  { label: 'DCORE',              href: '/brands/dcore' },
  { label: 'Ergotec',            href: '/brands/ergotec' },
  { label: 'Fujiiryoki',         href: '/brands/fujiiryoki' },
  { label: 'Human Touch',        href: '/brands/human-touch' },
  { label: 'Infinity',           href: '/brands/infinity' },
  { label: 'Inner Balance',      href: '/brands/inner-balance' },
  { label: 'JPMedics',           href: '/brands/jpmedics' },
  { label: 'Kahuna',             href: '/brands/kahuna' },
  { label: 'Kanji',              href: '/brands/kanji' },
  { label: 'Koyo',               href: '/brands/koyo' },
  { label: 'Kyota',              href: '/brands/kyota' },
  { label: 'Luraco',             href: '/brands/luraco' },
  { label: 'Medical Breakthrough', href: '/brands/medical-breakthrough' },
  { label: 'Nouhaus',            href: '/brands/nouhaus' },
  { label: 'OHCO',               href: '/brands/ohco' },
  { label: 'Ogawa',              href: '/brands/ogawa' },
  { label: 'Osaki',              href: '/brands/osaki' },
  { label: 'Panasonic',          href: '/brands/panasonic' },
  { label: 'Positive Posture',   href: '/brands/positive-posture' },
  { label: 'Relax On Chair',     href: '/brands/relax-on-chair' },
  { label: 'Relaxe',             href: '/brands/relaxe' },
  { label: 'RockerTech',         href: '/brands/rockertech' },
  { label: 'Sharper Image',      href: '/brands/sharper-image' },
  { label: 'Svago',              href: '/brands/svago' },
  { label: 'Synca Wellness',     href: '/brands/synca-wellness' },
  { label: 'Theramedic',         href: '/brands/theramedic' },
  { label: 'Titan',              href: '/brands/titan' },
]

export default function Navigation({ bestPages = [], comparePages = [] }: Props) {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const inputRef  = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const router    = useRouter()

  const navLinks: NavLink[] = [
    { label: 'All Chairs', href: '/chairs' },
    {
      label:    'Best For...',
      href:     '/best',
      viewAll:  'View all categories',
      children: bestPages.map(p => ({ label: p.label, href: '/best/' + p.slug })),
    },
    {
      label:    'By Brand',
      href:     '/brands',
      viewAll:  'View all brands',
      children: BY_BRAND_CHILDREN,
    },
    {
      label:    'Compare',
      href:     '/compare',
      viewAll:  'View all comparisons',
      children: comparePages.map(p => ({ label: p.label, href: '/compare/' + p.slug })),
    },
    { label: 'Buying Guide', href: '/learn' },
  ]

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

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
          <Link href="/" className="flex items-center gap-2.5 font-serif font-bold text-navy hover:text-gold transition-colors flex-shrink-0">
            <img src="/GMC-logo-icon-1024x1024.png" alt="" width={44} height={44} className="h-11 w-11 flex-shrink-0" />
            <span className="flex flex-col leading-tight text-lg">
              <span>Massage Chair</span>
              <span>Finder</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-charcoal hover:text-gold transition-colors"
                  >
                    {link.label}
                    <ChevronDown />
                  </Link>

                  {/* pt-2 bridges the gap so hover doesn't break */}
                  <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50">
                    <div className={"bg-white rounded-xl shadow-lg border border-sand py-2 " + dropdownClass(link.label)}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={
                            "text-sm text-charcoal hover:text-gold hover:bg-linen transition-colors rounded px-3 py-1.5 block " +
                            (itemNoWrap(link.label) ? "whitespace-nowrap" : "leading-snug")
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                      {link.viewAll && (
                        <Link
                          href={link.href}
                          className={
                            "mt-1 pt-2 border-t border-sand text-xs text-bronze hover:text-gold text-center px-3 py-1.5 transition-colors " +
                            footerColSpan(link.label)
                          }
                        >
                          {link.viewAll} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-charcoal hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link href="/finder" className="btn-primary text-sm py-2 px-4 ml-3">
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

      {/* Desktop search bar */}
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
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-charcoal hover:text-gold transition-colors font-medium"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-3 mb-1 grid grid-cols-2 gap-x-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 text-sm text-warm-gray hover:text-gold transition-colors leading-snug"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <form onSubmit={handleSearchSubmit} className="mt-3 flex items-center gap-2">
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

function ChevronDown() {
  return (
    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
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
