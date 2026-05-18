// Cloudflare Turnstile server-side verification.
// Call from any POST route that requires bot/spam protection on a form submit.
// Fails closed in production if TURNSTILE_SECRET_KEY is missing; fails open in dev.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export interface TurnstileResult {
  ok: boolean
  error?: string
}

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "turnstile-not-configured" }
    }
    return { ok: true }
  }

  if (!token) return { ok: false, error: "missing-token" }

  try {
    const form = new URLSearchParams()
    form.append("secret", secret)
    form.append("response", token)
    if (ip) form.append("remoteip", ip)

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: form,
    })
    const data = (await res.json()) as {
      success: boolean
      "error-codes"?: string[]
    }
    if (data.success) return { ok: true }
    return {
      ok: false,
      error: (data["error-codes"] || []).join(",") || "verification-failed",
    }
  } catch {
    return { ok: false, error: "verification-network-error" }
  }
}
