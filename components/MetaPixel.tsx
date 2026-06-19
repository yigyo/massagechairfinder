"use client"

// components/MetaPixel.tsx
// Injects the Meta (Facebook) Pixel base code and fires PageView on every SPA
// route change. Renders nothing visible. Inert until NEXT_PUBLIC_META_PIXEL_ID
// is set. Mirrors components/GoogleAnalytics.tsx. Drop into RootLayout once.

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { META_PIXEL_ID, fbqPageView } from "@/lib/fbq"

function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!META_PIXEL_ID) return
    fbqPageView()
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel() {
  if (!META_PIXEL_ID) return null

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  )
}
