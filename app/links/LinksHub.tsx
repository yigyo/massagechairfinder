'use client'

// app/links/LinksHub.tsx
// The MCF "link in bio" hub. Renders 5 destination cards routing to internal
// pages (clean paths, NO UTMs per the project hard rule). The global site
// chrome (nav, footer, exit popup) is hidden on this route via ChromeGate.
//
// Tracking: every card click fires a `links_card_click` GA4 event with
// card_slug + destination. See lib/gtag.ts.

import Link from 'next/link'
import { linksCardClick } from '@/lib/gtag'

type Card = {
  slug: string
  href: string
  headline: string
  sub: string
  primary?: boolean
}

const CARDS: Card[] = [
  {
    slug: 'finder',
    href: '/finder',
    headline: 'Find your chair in 10 questions',
    sub: 'A guided chair finder. Get matched to chairs that fit your body, room, and budget.',
    primary: true,
  },
  {
    slug: 'buyers-guide',
    href: '/buyers-guide',
    headline: "Free Buyer’s Guide",
    sub: 'The MCF guide to picking a massage chair. PDF download, no fluff.',
  },
  {
    slug: 'learn',
    href: '/learn',
    headline: 'Massage chair articles',
    sub: 'In-depth explainers on track types, recovery, conditions, features, and buying decisions. 50+ articles in plain English.',
  },
  {
    slug: 'chairs',
    href: '/chairs',
    headline: 'Browse chair reviews',
    sub: 'Independent reviews of 100+ chairs across 30+ brands. Verified specs.',
  },
  {
    slug: 'best-lower-back-pain',
    href: '/best/lower-back-pain',
    headline: 'Best chairs for lower back pain',
    sub: 'Our top picks for chronic lower back relief, ranked.',
  },
]

export default function LinksHub() {
  return (
    <div style={{ background: '#F5F1EB', minHeight: '100vh', position: 'relative' }}>
      {/* Gold L corner accent (top-left) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderTop: '4px solid #D1803E',
          borderLeft: '4px solid #D1803E',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '56px 20px 48px',
        }}
      >
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link
            href="/"
            className="font-serif"
            style={{
              color: '#1C2331',
              textDecoration: 'none',
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              display: 'inline-block',
            }}
          >
            Massage Chair Finder
          </Link>
          <p
            style={{
              color: '#6B6B65',
              marginTop: '12px',
              fontSize: '15px',
              lineHeight: 1.55,
            }}
          >
            Independent massage chair research.
            <br />
            100+ chairs across 30+ brands.
          </p>
        </header>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CARDS.map((card) => (
            <CardLink key={card.slug} card={card} />
          ))}
        </div>

        {/* Mini footer */}
        <footer
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid #E8DFD3',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '18px',
            }}
          >
            <SocialIcon label="Instagram" href="https://www.instagram.com/massagechairfinder/">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook" href="https://www.facebook.com/massagechairfinder">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Pinterest" href="https://www.pinterest.com/massagechairfinder/">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M11 8c2.5 0 4 1.5 4 3.5S13.5 15 12 15c-1 0-1.5-.5-1.5-1.5" />
                <path d="M10 22l2-8" />
              </svg>
            </SocialIcon>
            <SocialIcon label="YouTube" href="https://www.youtube.com/channel/UC8uDtnqYXR7R0qrwa7H3v7Q">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="TikTok" href="https://www.tiktok.com/@massagechairfinder">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 16a4 4 0 1 0 4-4V4h2c.5 2.5 2 4 4.5 4" />
              </svg>
            </SocialIcon>
          </div>
          <div style={{ fontSize: '12px', color: '#6B6B65', lineHeight: 1.6 }}>
            <Link href="/about" style={{ color: '#6B6B65', textDecoration: 'underline' }}>About</Link>
            <span style={{ margin: '0 8px' }}>&middot;</span>
            <Link href="/disclosure" style={{ color: '#6B6B65', textDecoration: 'underline' }}>Affiliate Disclosure</Link>
            <span style={{ margin: '0 8px' }}>&middot;</span>
            <Link href="/privacy-policy" style={{ color: '#6B6B65', textDecoration: 'underline' }}>Privacy</Link>
            <div style={{ marginTop: '10px' }}>
              &copy; {new Date().getFullYear()} Massage Chair Finder
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function CardLink({ card }: { card: Card }) {
  const isPrimary = !!card.primary
  const bg = isPrimary ? '#1C2331' : '#FFFFFF'
  const headlineColor = isPrimary ? '#FFFFFF' : '#1C2331'
  const subColor = isPrimary ? 'rgba(255,255,255,0.78)' : '#6B6B65'
  const borderColor = isPrimary ? '#D1803E' : '#E8DFD3'
  const borderWidth = isPrimary ? '2px' : '1px'
  const markBg = isPrimary ? 'rgba(209,128,62,0.2)' : 'rgba(209,128,62,0.1)'

  return (
    <Link
      href={card.href}
      onClick={() => linksCardClick(card.slug, card.href)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: isPrimary ? '22px 18px' : '18px',
        background: bg,
        border: borderWidth + ' solid ' + borderColor,
        borderRadius: '12px',
        textDecoration: 'none',
        minHeight: '72px',
        boxShadow: isPrimary
          ? '0 6px 16px rgba(28,35,49,0.14)'
          : '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      {/* Gold mark */}
      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: '34px',
          height: '34px',
          borderRadius: '7px',
          background: markBg,
          color: '#D1803E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Mark slug={card.slug} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="font-serif"
          style={{
            color: headlineColor,
            fontSize: isPrimary ? '19px' : '17px',
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          {card.headline}
        </div>
        <div
          style={{
            color: subColor,
            fontSize: '13.5px',
            lineHeight: 1.45,
            marginTop: '4px',
          }}
        >
          {card.sub}
        </div>
      </div>

      {/* Arrow */}
      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          color: '#D1803E',
          fontSize: '22px',
          lineHeight: 1,
          marginLeft: '6px',
          fontWeight: 600,
        }}
      >
        &rarr;
      </div>
    </Link>
  )
}

function Mark({ slug }: { slug: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (slug) {
    case 'finder':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'buyers-guide':
      return (
        <svg {...common}>
          <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" />
          <path d="M8 8h7M8 12h7M8 16h5" />
        </svg>
      )
    case 'learn':
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      )
    case 'chairs':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <rect x="14" y="14" width="6" height="6" />
        </svg>
      )
    case 'best-lower-back-pain':
      return (
        <svg {...common}>
          <path d="M12 2.5l2.6 5.3 5.9.6-4.4 4.2 1.3 5.9L12 15.7l-5.4 2.8 1.3-5.9-4.4-4.2 5.9-.6L12 2.5z" />
        </svg>
      )
    default:
      return null
  }
}

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#6B6B65',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
      }}
    >
      {children}
    </a>
  )
}
