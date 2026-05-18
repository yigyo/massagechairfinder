// Upstash-backed rate limiter for MCF API routes.
// Two sliding windows per key: a 10-minute burst limit and a 24-hour cumulative cap.
// IP-keyed. Gracefully falls back to "allow" if Upstash is not configured
// (so local development without env vars still works).

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

type Bucket = "chat" | "form"

const hasUpstash = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

const redis = hasUpstash ? Redis.fromEnv() : null

// Conservative defaults. Real users almost never approach these.
// Chat: 30 messages / 10 min, 150 / day per IP.
// Forms: 10 submits / 10 min, 40 / day per IP.
function makeLimiters(bucket: Bucket) {
  if (!redis) return null
  if (bucket === "chat") {
    return {
      short: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "10 m"),
        prefix: "rl:chat:short",
        analytics: false,
      }),
      daily: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(150, "1 d"),
        prefix: "rl:chat:day",
        analytics: false,
      }),
    }
  }
  return {
    short: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 m"),
      prefix: "rl:form:short",
      analytics: false,
    }),
    daily: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(40, "1 d"),
      prefix: "rl:form:day",
      analytics: false,
    }),
  }
}

const chatLimiters = makeLimiters("chat")
const formLimiters = makeLimiters("form")

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  const real = req.headers.get("x-real-ip")
  if (real) return real
  return "0.0.0.0"
}

export interface RateLimitResult {
  ok: boolean
  reason?: "short-window" | "daily-window"
  retryAfter?: number
}

export async function checkRateLimit(
  ip: string,
  bucket: Bucket,
): Promise<RateLimitResult> {
  const limiters = bucket === "chat" ? chatLimiters : formLimiters
  if (!limiters) return { ok: true }

  const a = await limiters.short.limit(ip)
  if (!a.success) {
    return {
      ok: false,
      reason: "short-window",
      retryAfter: Math.max(1, Math.ceil((a.reset - Date.now()) / 1000)),
    }
  }
  const b = await limiters.daily.limit(ip)
  if (!b.success) {
    return {
      ok: false,
      reason: "daily-window",
      retryAfter: Math.max(1, Math.ceil((b.reset - Date.now()) / 1000)),
    }
  }
  return { ok: true }
}
