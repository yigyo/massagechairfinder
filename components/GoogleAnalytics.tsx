'use client'

// components/GoogleAnalytics.tsx
// Injects the GA4 script and fires a pageview on every SPA route change.
// Also attaches a sitewide outbound link listener -- every external click
// anywhere on the site fires an affiliate_click event in GA4.
// Renders nothing visible. Drop into RootLayout once; works sitewide.

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { GA4_ID, pageview, affiliateClick } from '@/lib/gtag'

function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA4_ID) return
    const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')
    pageview(url)
  }, [pathname, searchParams])

  return null
}

function OutboundTracker() {
  useEffect(() => {
    if (!GA4_ID) return

    function handleClick(e: MouseEvent) {
      const el = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!el) return

      const href = el.getAttribute('href') || ''
      const isExternal = (
        href.startsWith('http') &&
        !href.includes('massagechairfinder.com')
      )
      if (!isExternal) return

      // Extract the most useful label available
      const linkText = (el.innerText || el.textContent || '').trim()
      const ariaLabel = el.getAttribute('aria-label') || ''
      const label = linkText || ariaLabel || 'unknown'

      // Infer retailer from the destination hostname
      let retailer = 'unknown'
      try {
        retailer = new URL(href).hostname.replace('www.', '')
      } catch {}

      affiliateClick({
        chairSlug: '',       // not always knowable from a sitewide listener
        chairName: label,    // best available label -- usually chair name or CTA text
        brand: '',
        retailer,
        // price not available here -- per-component tracking in ChairCard still fires with full data
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
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
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
