export const runtime = 'nodejs'

import { CHAIRS } from '@/lib/chairs'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

interface ChairResult {
  name: string
  price: string
  body: string
  url: string
  imageUrl?: string
}

const KLAVIYO_LIST_ID = 'WHPYgr'
const KLAVIYO_API = 'https://a.klaviyo.com/api'
const KLAVIYO_REVISION = '2024-02-15'

async function klaviyoPost(path: string, body: object) {
  const key = process.env.KLAVIYO_PRIVATE_KEY
  if (!key) throw new Error('KLAVIYO_PRIVATE_KEY not set')

  return fetch(`${KLAVIYO_API}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${key}`,
      'Content-Type': 'application/json',
      'revision': KLAVIYO_REVISION,
    },
    body: JSON.stringify(body),
  })
}

async function klaviyoPatch(path: string, body: object) {
  const key = process.env.KLAVIYO_PRIVATE_KEY
  if (!key) throw new Error('KLAVIYO_PRIVATE_KEY not set')

  return fetch(`${KLAVIYO_API}${path}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Klaviyo-API-Key ${key}`,
      'Content-Type': 'application/json',
      'revision': KLAVIYO_REVISION,
    },
    body: JSON.stringify(body),
  })
}

// Look up a chair in the catalog by AI-generated name.
// Tries exact name match first, then goodwinLookupKey substring match.
function lookupChairFeatures(chairName: string): Record<string, string> {
  const lowerName = chairName.toLowerCase()
  const found = CHAIRS.find(c =>
    c.active &&
    (c.name.toLowerCase() === lowerName ||
      (c.goodwinLookupKey && lowerName.includes(c.goodwinLookupKey.toLowerCase())))
  )
  if (!found) return {}

  const yn = (val: boolean | undefined) => val === true ? 'Yes' : val === false ? 'No' : 'Unknown'

  return {
    heat:        yn(found.heat),
    zero_gravity: yn(found.zeroGravity),
    stretching:  yn(found.stretch),
    foot_calf:   yn(found.foot && found.calf ? true : found.foot === false && found.calf === false ? false : undefined),
    lift_assist: yn(found.liftAssist),
    track:       found.track ?? 'Unknown',
    roller:      found.roller ?? 'Unknown',
  }
}

// (catalog price fallback removed: exact prices no longer sent to Klaviyo)

// Email clients can't resolve relative URLs. Turn '/images/chairs/foo.jpg' into a
// fully-qualified https URL so the Klaviyo template can render the <img>.
const IMAGE_HOST = 'https://www.massagechairfinder.com'
function absolutizeImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/')) return `${IMAGE_HOST}${url}`
  return `${IMAGE_HOST}/${url}`
}

// Apply per-chair feature properties with a given prefix (e.g. "mcf_top_chair")
function applyChairFeatures(
  properties: Record<string, string>,
  prefix: string,
  chair: ChairResult
) {
  const features = lookupChairFeatures(chair.name)
  if (features.heat)         properties[`${prefix}_heat`]         = features.heat
  if (features.zero_gravity) properties[`${prefix}_zero_gravity`] = features.zero_gravity
  if (features.stretching)   properties[`${prefix}_stretching`]   = features.stretching
  if (features.foot_calf)    properties[`${prefix}_foot_calf`]    = features.foot_calf
  if (features.lift_assist)  properties[`${prefix}_lift_assist`]  = features.lift_assist
  if (features.track)        properties[`${prefix}_track`]        = features.track
  if (features.roller)       properties[`${prefix}_roller`]       = features.roller
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      email: string
      chairs: ChairResult[]
      quizAnswers?: Record<string, string>
      quizFeatures?: string[]
      turnstileToken?: string
      website?: string
    }
    const { email, chairs, quizAnswers, quizFeatures, turnstileToken, website } = body

    // Honeypot: legitimate clients never fill this.
    if (website && website.length > 0) {
      return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 })
    }

    if (!email) {
      return Response.json({ ok: false, error: 'Email required' }, { status: 400 })
    }

    const ip = getClientIp(req)
    const rl = await checkRateLimit(ip, 'form')
    if (!rl.ok) {
      return Response.json(
        { ok: false, error: 'Too many submissions. Please try again later.', retryAfter: rl.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      )
    }

    const tv = await verifyTurnstile(turnstileToken, ip)
    if (!tv.ok) {
      return Response.json(
        { ok: false, error: 'Verification failed. Please reload the page and try again.' },
        { status: 403 },
      )
    }

    const [chair1, chair2, chair3] = chairs ?? []

    // Build profile properties. mcf_ prefix keeps these separate from Goodwin properties.
    const properties: Record<string, string> = {}
    if (chair1) {
      properties.mcf_top_chair       = chair1.name
      properties.mcf_top_chair_url   = chair1.url
      properties.mcf_top_chair_body  = chair1.body
      const img1 = absolutizeImageUrl(chair1.imageUrl)
      if (img1) properties.mcf_top_chair_image = img1
      applyChairFeatures(properties, 'mcf_top_chair', chair1)
    }
    if (chair2) {
      properties.mcf_second_chair       = chair2.name
      properties.mcf_second_chair_url   = chair2.url
      properties.mcf_second_chair_body  = chair2.body
      const img2 = absolutizeImageUrl(chair2.imageUrl)
      if (img2) properties.mcf_second_chair_image = img2
      applyChairFeatures(properties, 'mcf_second_chair', chair2)
    }
    if (chair3) {
      properties.mcf_third_chair       = chair3.name
      properties.mcf_third_chair_url   = chair3.url
      properties.mcf_third_chair_body  = chair3.body
      const img3 = absolutizeImageUrl(chair3.imageUrl)
      if (img3) properties.mcf_third_chair_image = img3
      applyChairFeatures(properties, 'mcf_third_chair', chair3)
    }

    // Quiz answer properties. Used for segmentation and future targeted emails.
    if (quizAnswers) {
      if (quizAnswers.pain)     properties.mcf_pain     = quizAnswers.pain
      if (quizAnswers.goal)     properties.mcf_goal     = quizAnswers.goal
      if (quizAnswers.height)   properties.mcf_height   = quizAnswers.height
      if (quizAnswers.weight)   properties.mcf_weight   = quizAnswers.weight
      if (quizAnswers.pressure) properties.mcf_pressure = quizAnswers.pressure
      if (quizAnswers.budget)   properties.mcf_budget   = quizAnswers.budget
      if (quizAnswers.room)     properties.mcf_room     = quizAnswers.room
      if (quizAnswers.timeline) properties.mcf_timeline = quizAnswers.timeline
    }
    if (quizFeatures && quizFeatures.length > 0) {
      properties.mcf_features = quizFeatures.join(', ')
    }

    // Step 1: Create profile (returns 409 if already exists)
    const createRes = await klaviyoPost('/profiles/', {
      data: {
        type: 'profile',
        attributes: { email, properties },
      },
    })

    let profileId: string | null = null

    if (createRes.status === 201) {
      const json = await createRes.json()
      profileId = json.data?.id ?? null
    } else if (createRes.status === 409) {
      // Profile exists. Extract duplicate ID from error, then patch properties.
      const json = await createRes.json()
      profileId = json.errors?.[0]?.meta?.duplicate_profile_id ?? null

      if (profileId) {
        await klaviyoPatch(`/profiles/${profileId}/`, {
          data: {
            type: 'profile',
            id: profileId,
            attributes: { properties },
          },
        })
      }
    } else {
      const text = await createRes.text()
      throw new Error(`Klaviyo profile error ${createRes.status}: ${text}`)
    }

    // Step 2: Add profile to massagechairfinder list
    if (profileId) {
      await klaviyoPost(`/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
        data: [{ type: 'profile', id: profileId }],
      })
    }

    console.log('[send-results] Klaviyo profile created/updated:', email)
    return Response.json({ ok: true })

  } catch (err) {
    console.error('[send-results] Error:', err)
    // Return success to user. Don't surface backend errors in the UI.
    return Response.json({ ok: true })
  }
}
