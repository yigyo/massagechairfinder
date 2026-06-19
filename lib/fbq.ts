// lib/fbq.ts
// Typed Meta (Facebook) Pixel utility + Conversions API bridge. Mirrors lib/gtag.ts.
// Set NEXT_PUBLIC_META_PIXEL_ID (browser) and META_CAPI_TOKEN (server, in the
// /api/capi route) in env. Inert until the pixel id is set.
//
// Each tracked event gets a unique event_id. We fire the browser pixel WITH that
// event_id and POST a copy to /api/capi with the same event_id, so Meta
// deduplicates the browser and server copies of the same event.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

type FbqParams = Record<string, string | number | boolean | undefined>
type UserData = { email?: string }

function ready(): boolean {
  return Boolean(META_PIXEL_ID) && typeof window !== "undefined" && typeof window.fbq === "function"
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"))
  return match ? decodeURIComponent(match[1]) : undefined
}

// Send a deduplicated copy of the event to the server-side Conversions API route.
function sendToCapi(eventName: string, eventId: string, params?: FbqParams, userData?: UserData): void {
  if (typeof window === "undefined") return
  try {
    const body = JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: params || {},
      email: userData?.email,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    })
    // keepalive lets the request survive a page navigation
    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // never let analytics break the page
  }
}

// Standard Meta events (Lead, etc.). Sent to BOTH the browser pixel and CAPI.
export function fbqTrack(eventName: string, params?: FbqParams, userData?: UserData): void {
  if (!ready()) return
  const eventId = newEventId()
  window.fbq!("track", eventName, params, { eventID: eventId })
  sendToCapi(eventName, eventId, params, userData)
}

// Non-standard events (FinderStart, FinderComplete). Browser pixel only.
export function fbqTrackCustom(eventName: string, params?: FbqParams): void {
  if (!ready()) return
  const eventId = newEventId()
  window.fbq!("trackCustom", eventName, params, { eventID: eventId })
}

// PageView. Sent to BOTH the browser pixel and CAPI (deduplicated).
export function fbqPageView(): void {
  if (!ready()) return
  const eventId = newEventId()
  window.fbq!("track", "PageView", undefined, { eventID: eventId })
  sendToCapi("PageView", eventId)
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}
