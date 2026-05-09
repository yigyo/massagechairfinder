import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json()

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
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

    const messageHtml = message.replace(/
/g, "<br>")

    await transporter.sendMail({
      from: smtpUser,
      to: "support@massagechairfinder.com",
      replyTo: email,
      subject: "MCF Contact Form | " + firstName + " " + lastName,
      html:
        "<p><strong>Reply to:</strong> <a href="mailto:" + email + "">" + email + "</a></p>" +
        "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
        "<p><strong>Message:</strong><br>" + messageHtml + "</p>",
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SMTP error:", err)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
