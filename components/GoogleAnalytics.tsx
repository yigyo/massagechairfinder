'use client'

// components/GoogleAnalytics.tsx
// Injects the GA4 script and fires a pageview on every SPA route change.
// Also attaches a sitewide outbound link listener for affiliate links that
// are not already tracked by their own component.
// Renders nothing visible. Drop into RootLayout once; works sitewide.

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, Suspense } from 'react'
import { GA4_ID, pageview, affiliateClick } from '@/lib/gtag'

function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // The initial page_view is sent by the inline gtag("config") call below, which
  // runs before hydration. This effect must therefore skip its first run or every
  // landing would be counted twice.
  const skippedInitial = useRef(false)

  useEffect(() => {
    if (!GA4_ID) return
    if (!skippedInitial.current) {
      skippedInitial.current = true
      return
    }
    const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')
    pageview(url)
  }, [pathname, searchParams])

  return null
}

// Pull the chair identity from the DOM around the clicked link.
// Server-rendered buy buttons cannot attach an onClick, so they carry
// data-chair-slug / data-chair-name / data-brand instead.
function chairContext(el: HTMLElement) {
  const holder = el.closest('[data-chair-slug]') as HTMLElement | null
  if (holder && holder.dataset.chairSlug) {
    return {
      slug: holder.dataset.chairSlug,
      name: holder.dataset.chairName || holder.dataset.chairSlug,
      brand: holder.dataset.brand || '',
    }
  }
  // Fallback: a chair detail page identifies the chair by its own URL.
  if (typeof window !== 'undefined') {
    const m = window.location.pathname.match(/^\/chairs\/([^/?#]+)/)
    if (m) return { slug: m[1], name: m[1], brand: '' }
  }
  return { slug: '', name: '', brand: '' }
}

function OutboundTracker() {
  useEffect(() => {
    if (!GA4_ID) return

    function handleClick(e: MouseEvent) {
      const el = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!el) return

      // Components that fire affiliateClick themselves mark their anchor with
      // data-aff-tracked. Without this guard every ChairCard click was recorded
      // twice: once with real chair data, once with the button label.
      if (el.closest('[data-aff-tracked]')) return

      const href = el.getAttribute('href') || ''
      const isExternal = (
        href.startsWith('http') &&
        !href.includes('massagechairfinder.com')
      )
      if (!isExternal) return

      const linkText = (el.innerText || el.textContent || '').trim()
      const ariaLabel = el.getAttribute('aria-label') || ''

      // Infer retailer from the destination hostname
      let retailer = 'unknown'
      try {
        retailer = new URL(href).hostname.replace('www.', '')
      } catch {}

      const chair = chairContext(el)

      affiliateClick({
        chairSlug: chair.slug,
        // Never fall back to the button label here. "Shop This Chair" as a
        // chair_name made the By chair report useless.
        chairName: chair.name,
        brand: chair.brand,
        retailer,
        linkText: linkText || ariaLabel || '',
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

export default function GoogleAnalytics() {
  if (!GA4_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      {/*
        beforeInteractive so window.gtag and the js/config commands are queued
        before React hydrates.

        send_page_view is true on purpose. It used to be false, with the only
        page_view coming from PageviewTracker's effect. PageviewTracker sits
        behind a Suspense boundary because it calls useSearchParams, which on a
        statically rendered page defers the whole subtree until after hydration.
        Any session that ended before hydration finished therefore recorded a
        session_start with no page_view at all, which GA4 reports as a blank
        landing page and an unassigned traffic source. Letting config send the
        first page_view fixes both, and PageviewTracker skips its first run so
        SPA route changes are still the only thing it reports.
      */}
      <Script
        id="google-analytics"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              send_page_view: true
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      <OutboundTracker />
    </>
  )
}
