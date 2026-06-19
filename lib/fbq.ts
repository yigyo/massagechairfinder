// lib/fbq.ts
// Typed Meta (Facebook) Pixel utility. Mirrors lib/gtag.ts.
// Set NEXT_PUBLIC_META_PIXEL_ID in env (Vercel + .env.local). Inert until set:
// every helper no-ops when the id is missing or fbq has not loaded, so this is
// safe to ship before the pixel id exists.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

type FbqParams = Record<string, string | number | boolean | undefined>

function ready(): boolean {
  return Boolean(META_PIXEL_ID) && typeof window !== "undefined" && typeof window.fbq === "function"
}

// Standard Meta events (Lead, ViewContent, etc.) use track.
export function fbqTrack(eventName: string, params?: FbqParams): void {
  if (!ready()) return
  window.fbq!("track", eventName, params)
}

// Non-standard events (FinderStart, FinderComplete) use trackCustom.
export function fbqTrackCustom(eventName: string, params?: FbqParams): void {
  if (!ready()) return
  window.fbq!("trackCustom", eventName, params)
}

export function fbqPageView(): void {
  if (!ready()) return
  window.fbq!("track", "PageView")
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}
