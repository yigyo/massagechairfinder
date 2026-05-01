'use client'

// components/ScrollTracker.tsx
// Fires GA4 scroll_depth events at 25%, 50%, 75%, and 90% scroll thresholds.
// Uses IntersectionObserver via invisible sentinel divs placed at each threshold.
// Each threshold fires once per page load (tracked in a ref, not state, to avoid re-renders).
// Drop into RootLayout; works on every page automatically.

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { scrollDepth } from '@/lib/gtag'

const THRESHOLDS = [25, 50, 75, 90]

export default function ScrollTracker() {
  const pathname = usePathname()
  const firedRef = useRef<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Reset fired set on route change
    firedRef.current = new Set()

    // Clean up any previous sentinels and observer
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    sentinelsRef.current.forEach(el => el.remove())
    sentinelsRef.current = []

    // Small delay to let the new page render and establish scrollHeight
    const timer = setTimeout(() => {
      const docHeight = document.documentElement.scrollHeight
      const viewHeight = window.innerHeight

      if (docHeight <= viewHeight) {
        // Page fits without scrolling -- fire all thresholds immediately
        THRESHOLDS.forEach(t => {
          if (!firedRef.current.has(t)) {
            firedRef.current.add(t)
            scrollDepth(t, pathname)
          }
        })
        return
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            const percent = parseInt(entry.target.getAttribute('data-scroll-pct') || '0', 10)
            if (!firedRef.current.has(percent)) {
              firedRef.current.add(percent)
              scrollDepth(percent, pathname)
            }
          })
        },
        { threshold: 0 }
      )

      THRESHOLDS.forEach(pct => {
        const top = ((docHeight - viewHeight) * pct) / 100
        const sentinel = document.createElement('div')
        sentinel.setAttribute('data-scroll-pct', String(pct))
        sentinel.setAttribute('aria-hidden', 'true')
        sentinel.style.cssText = `
          position: absolute;
          top: ${top + window.scrollY}px;
          left: 0;
          width: 1px;
          height: 1px;
          pointer-events: none;
          visibility: hidden;
        `
        document.body.appendChild(sentinel)
        sentinelsRef.current.push(sentinel)
        observerRef.current!.observe(sentinel)
      })
    }, 300)

    return () => {
      clearTimeout(timer)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      sentinelsRef.current.forEach(el => el.remove())
      sentinelsRef.current = []
    }
  }, [pathname])

  return null
}
