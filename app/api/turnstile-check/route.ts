import { NextRequest, NextResponse } from "next/server"
import { verifyTurnstile } from "@/lib/turnstile"
import { getClientIp } from "@/lib/rate-limit"

// TEMPORARY diagnostic endpoint. Runs only the Turnstile verification on a
// posted token and reports the result. No email, no rate limiting, no data
// stored. Used to confirm whether the production TURNSTILE_SECRET_KEY verifies
// a real client token. Remove after diagnosis.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { turnstileToken?: string }
  const ip = getClientIp(req)
  const tv = await verifyTurnstile(body.turnstileToken, ip)
  return NextResponse.json({
    ok: tv.ok,
    error: tv.error ?? null,
    tokenLen: body.turnstileToken ? body.turnstileToken.length : 0,
  })
}
