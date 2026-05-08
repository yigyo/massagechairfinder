"use server"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json()

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const messageHtml = message.replace(/\n/g, "<br>")

    const { error } = await resend.emails.send({
      from: "Massage Chair Finder <noreply@massagechairfinder.com>",
      to: ["support@massagechairfinder.com"],
      replyTo: email,
      subject: "New contact form message from " + firstName + " " + lastName,
      html:
        "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
        "<p><strong>Email:</strong> " + email + "</p>" +
        "<p><strong>Message:</strong></p>" +
        "<p>" + messageHtml + "</p>",
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
