"use client"
import { useState } from "react"

// Marks this email as captured in localStorage so the exit popup knows.
function markSubscribed() {
  try { localStorage.setItem("mcf_subscribed", "1") } catch (_) {}
}

interface Props {
  buttonLabel?: string
  inputPlaceholder?: string
  source?: string  // e.g. "footer", "callout", "exit-popup", "landing"
}

export default function BuyersGuideForm({
  buttonLabel       = "Send Me the Guide",
  inputPlaceholder  = "Your email address",
  source            = "unknown",
}: Props) {
  const [email, setEmail]   = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        markSubscribed()
      } else {
        setStatus("error")
        setErrorMsg("Something went wrong. Please try again.")
      }
    } catch (_) {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-2">
        <p className="font-semibold text-navy mb-1">Check your inbox.</p>
        <p className="text-sm text-warm-gray">
          The Buyer&apos;s Guide is on its way. Check your spam folder if it
          does not arrive within a few minutes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={inputPlaceholder}
          aria-label="Email address"
          className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-sand bg-white text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 btn-primary text-sm py-2.5 px-5 disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : buttonLabel}
        </button>
      </div>
      {errorMsg && (
        <p className="mt-2 text-sm text-terra">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-warm-gray">No spam. Unsubscribe anytime.</p>
    </form>
  )
}
