"use server"
// app/api/capi/route.ts
// Meta Conversions API (server-side) endpoint. Receives a copy of browser pixel
// events and forwards them to Meta server-to-server, deduplicated against the
// browser pixel via a shared event_id. Inert until META_CAPI_TOKEN is set.
//
// Secret: META_CAPI_TOKEN is a SERVER-ONLY env var (never NEXT_PUBLIC). The
// pixel id is reused from NEXT_PUBLIC_META_PIXEL_ID.

import { NextRequest, NextResponse } from "next/server"
import { getClientIp } from "@/lib/rate-limit"
import crypto from "crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
const CAPI_TOKEN = process.env.META_CAPI_TOKEN || ""
const GRAPH = "https://graph.facebook.com/v21.0"

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex")
}

export async function POST(req: NextRequest) {
  // Inert when not configured: never error the client.
  if (!PIXEL_ID || !CAPI_TOKEN) {
    return new NextResponse(null, { status: 204 })
  }

  let body: {
    event_name?: string
    event_id?: string
    event_source_url?: string
    custom_data?: Record<string, unknown>
    email?: string
    fbp?: string
    fbc?: string
    test_event_code?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 })
  }

  if (!body.event_name || !body.event_id) {
    return NextResponse.json({ ok: false, error: "missing event_name or event_id" }, { status: 400 })
  }

  const ip = getClientIp(req)
  const ua = req.headers.get("user-agent") || undefined

  const userData: Record<string, unknown> = {}
  if (body.email) userData.em = [sha256(body.email.trim().toLowerCase())]
  if (body.fbp) userData.fbp = body.fbp
  if (body.fbc) userData.fbc = body.fbc
  if (ip && ip !== "unknown") userData.client_ip_address = ip
  if (ua) userData.client_user_agent = ua

  const event: Record<string, unknown> = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    action_source: "website",
    user_data: userData,
  }
  if (body.event_source_url) event.event_source_url = body.event_source_url
  if (body.custom_data && Object.keys(body.custom_data).length > 0) {
    event.custom_data = body.custom_data
  }

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: CAPI_TOKEN,
  }
  if (body.test_event_code) payload.test_event_code = body.test_event_code

  try {
    const res = await fetch(`${GRAPH}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: json }, { status: 200 })
    }
    return NextResponse.json({ ok: true, received: json.events_received, fbtrace_id: json.fbtrace_id }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "fetch failed" }, { status: 200 })
  }
}
