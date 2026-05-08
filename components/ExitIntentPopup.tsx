"use client"
import { useEffect, useState, useCallback } from "react"
import BuyersGuideForm from "@/components/BuyersGuideForm"

// Fires when the user moves the cursor above the viewport (exit intent).
// Conditions to show:
//   - User has NOT already subscribed (localStorage "mcf_subscribed")
//   - User has NOT clicked an affiliate /go/ link (localStorage "mcf_affiliate_click")
//   - User has NOT dismissed this popup in the last 7 days
//     (localStorage "mcf_popup_dismissed_at")
//
// Affiliate click tracking: any click on an <a> with href containing "/go/"
// sets "mcf_affiliate_click" automatically via document-level listener below.

const DISMISS_COOLDOWN_DAYS = 7

function isEligible(): boolean {
  try {
    if (localStorage.getItem("mcf_subscribed") === "1")          return false
    if (localStorage.getItem("mcf_affiliate_click") === "1")     return false
    const dismissedAt = localStorage.getItem("mcf_popup_dismissed_at")
    if (dismissedAt) {
      const daysSince = (Date.now() - parseInt(dismissedAt, 10)) / 86_400_000
      if (daysSince < DISMISS_COOLDOWN_DAYS)                      return false
    }
    return true
  } catch (_) {
    return false
  }
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [fired,   setFired]   = useState(false)

  // Track affiliate link clicks sitewide
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a")
      if (target && target.getAttribute("href")?.includes("/go/")) {
        try { localStorage.setItem("mcf_affiliate_click", "1") } catch (_) {}
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  // Exit intent listener
  useEffect(() => {
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return          // only trigger on top-edge exit
      if (fired)          return
      if (!isEligible())  return
      setFired(true)
      setVisible(true)
    }

    // Slight delay before arming so it does not fire immediately on load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [fired])

  const dismiss = useCallback(() => {
    setVisible(false)
    try { localStorage.setItem("mcf_popup_dismissed_at", String(Date.now())) } catch (_) {}
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(28,35,49,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
      role="dialog"
      aria-modal="true"
      aria-label="Get the free Buyer's Guide"
    >
      <div
        className="relative w-full max-w-md rounded-2xl px-8 py-9 shadow-2xl"
        style={{ background: "#F5F1EB" }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-warm-gray hover:text-charcoal transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "#934713" }}
        >
          Free Download
        </p>
        <h2
          className="font-serif text-2xl mb-2 leading-snug"
          style={{ color: "#1C2331" }}
        >
          Before you go
        </h2>
        <p className="text-sm text-warm-gray mb-5 leading-relaxed">
          Get our free Buyer&apos;s Guide: the six decisions that matter before
          you commit to any massage chair.
        </p>
        <BuyersGuideForm
          buttonLabel="Send Me the Guide"
          source="exit-popup"
        />
      </div>
    </div>
  )
}
