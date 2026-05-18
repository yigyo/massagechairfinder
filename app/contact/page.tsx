"use client"
import { useRef, useState } from "react"
import TurnstileWidget, { TurnstileHandle } from "@/components/TurnstileWidget"
import type { Metadata } from "next"
import Link from "next/link"

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const turnstileTokenRef = useRef<string>("")
  const turnstileWidgetRef = useRef<TurnstileHandle>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: turnstileTokenRef.current, website: "" }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong. Please try again.")
        setStatus("error")
        turnstileWidgetRef.current?.reset()
      } else {
        setStatus("success")
        setForm({ firstName: "", lastName: "", email: "", message: "" })
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="section max-w-xl">
      <h1 className="text-4xl font-serif mb-3">Contact Us</h1>
      <p className="text-warm-gray mb-8 text-base leading-relaxed">
        Have a question about a specific chair, a correction to suggest, or a brand you think we
        should cover? Send us a note and we will get back to you within one business day.
      </p>

      {status === "success" ? (
        <div className="bg-sand rounded-xl p-8 text-center">
          <p className="text-navy font-serif text-xl mb-2">Message sent.</p>
          <p className="text-charcoal text-sm">
            We will be in touch at {form.email || "your email"} within one business day.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-bronze hover:text-gold transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-1">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm text-charcoal bg-white focus:outline-none focus:border-gold transition-colors"
                placeholder="Margaret"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-1">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm text-charcoal bg-white focus:outline-none focus:border-gold transition-colors"
                placeholder="Chen"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm text-charcoal bg-white focus:outline-none focus:border-gold transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full border border-sand rounded-lg px-4 py-2.5 text-sm text-charcoal bg-white focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="What can we help you with?"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
              <TurnstileWidget
        ref={turnstileWidgetRef}
        action="contact-form"
        onToken={(t) => { turnstileTokenRef.current = t }}
      />
      </form>
      )}

      <p className="mt-8 text-xs text-warm-gray">
        You can also reach us directly at{" "}
        <a href="mailto:support@massagechairfinder.com" className="text-bronze hover:text-gold transition-colors">
          support@massagechairfinder.com
        </a>
        . For questions about our affiliate relationships, see our{" "}
        <Link href="/disclosure" className="text-bronze hover:text-gold transition-colors">
          disclosure policy
        </Link>
        .
      </p>
    </div>
  )
}
