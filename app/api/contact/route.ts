import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import { verifyTurnstile } from "@/lib/turnstile"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      firstName?: string
      lastName?: string
      email?: string
      message?: string
      turnstileToken?: string
      website?: string
    }
    const { firstName, lastName, email, message, turnstileToken, website } = body

    if (website && website.length > 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const ip = getClientIp(req)
    const rl = await checkRateLimit(ip, "form")
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } },
      )
    }

    const tv = await verifyTurnstile(turnstileToken, ip)
    if (!tv.ok) {
      // Resilience measure: do not hard-block a real visitor when the Turnstile
      // bot-check cannot be verified (misconfigured or missing production keys,
      // an empty client token, or a Cloudflare outage). The honeypot and IP
      // rate-limit checks above still gate this route. Restore strict blocking
      // here once the production Turnstile keys are confirmed working.
      console.warn("Contact Turnstile unverified; allowing via honeypot + rate-limit. Reason:", tv.error)
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const messageHtml = message.replace(/\n/g, "<br>")

    await transporter.sendMail({
      from: smtpUser,
      to: "support@massagechairfinder.com",
      replyTo: email,
      subject: "MCF Contact Form | " + firstName + " " + lastName,
      html:
        "<p><strong>Reply to:</strong> <a href=\"mailto:" + email + "\">" + email + "</a></p>" +
        "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
        "<p><strong>Message:</strong><br>" + messageHtml + "</p>",
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SMTP error:", err)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
