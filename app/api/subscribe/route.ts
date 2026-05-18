"use server"
import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import { verifyTurnstile } from "@/lib/turnstile"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string; source?: string; turnstileToken?: string; website?: string }
    const { email, turnstileToken, website } = body

    // Honeypot
    if (website && website.length > 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
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
      return NextResponse.json(
        { error: "Verification failed. Please reload the page and try again." },
        { status: 403 },
      )
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_KEY
    const listId     = process.env.KLAVIYO_LIST_ID

    if (!privateKey || !listId) {
      console.warn("KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID not set")
      return NextResponse.json({ success: true })
    }

    const headers = {
      "Authorization": "Klaviyo-API-Key " + privateKey,
      "Content-Type":  "application/json",
      "revision":      "2024-10-15",
    }

    // Step 1: Create or update the profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: { email },
        },
      }),
    })

    let profileId: string | null = null

    if (profileRes.status === 201) {
      const profileData = await profileRes.json()
      profileId = profileData?.data?.id ?? null
    } else if (profileRes.status === 409) {
      // Profile already exists -- extract id from conflict response
      const conflictData = await profileRes.json()
      profileId = conflictData?.errors?.[0]?.meta?.duplicate_profile_id ?? null
    } else {
      const errBody = await profileRes.text()
      console.error("Klaviyo create profile error:", profileRes.status, errBody)
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    if (!profileId) {
      console.error("Could not resolve Klaviyo profile ID")
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    // Step 2: Add profile to list
    const listRes = await fetch(
      "https://a.klaviyo.com/api/lists/" + listId + "/relationships/profiles/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [{ type: "profile", id: profileId }],
        }),
      }
    )

    // 204 = success, 200 = already a member -- both are fine
    if (listRes.status !== 204 && listRes.status !== 200) {
      const errBody = await listRes.text()
      console.error("Klaviyo add to list error:", listRes.status, errBody)
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Subscribe route error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
