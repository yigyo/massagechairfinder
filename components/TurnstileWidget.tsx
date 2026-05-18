"use client"
// Renders an invisible Cloudflare Turnstile widget and calls onToken when a fresh
// token is available. Tokens are single-use, so call reset() after each submission
// to obtain a new one for the next attempt.

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
      execute: (widgetId: string) => void
    }
  }
}

interface Props {
  onToken: (token: string) => void
  action?: string
}

export interface TurnstileHandle {
  reset: () => void
  execute: () => void
}

const TurnstileWidget = forwardRef<TurnstileHandle, Props>(function TurnstileWidget(
  { onToken, action },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
    },
    execute() {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.execute(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
    },
  }))

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return

    let cancelled = false

    const mount = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        size: "invisible",
        action: action || "submit",
        callback: (token: string) => onTokenRef.current(token),
        "error-callback": () => {
          // Silent retry; the script will retry internally too.
        },
      })
    }

    if (window.turnstile) {
      mount()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          mount()
        }
      }, 100)
      return () => {
        cancelled = true
        clearInterval(interval)
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current)
          } catch {
            // ignore
          }
          widgetIdRef.current = null
        }
      }
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // ignore
        }
        widgetIdRef.current = null
      }
    }
  }, [action])

  return <div ref={containerRef} />
})

export default TurnstileWidget
