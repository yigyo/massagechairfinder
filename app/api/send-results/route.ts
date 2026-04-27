export const runtime = 'nodejs'

import { CHAIRS } from '@/lib/chairs'

interface ChairResult {
  name: string
  price: string
  body: string
  url: string
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
    const { email, chairs, quizAnswers, quizFeatures } = await req.json() as {
      email: string
      chairs: ChairResult[]
      quizAnswers?: Record<string, string>
      quizFeatures?: string[]
    }

    if (!email) {
      return Response.json({ ok: false, error: 'Email required' }, { status: 400 })
    }

    const [chair1, chair2, chair3] = chairs ?? []

    // Build profile properties — mcf_ prefix to keep separate from Goodwin properties
    const properties: Record<string, string> = {}
    if (chair1) {
      properties.mcf_top_chair       = chair1.name
      properties.mcf_top_chair_url   = chair1.url
      properties.mcf_top_chair_price = chair1.price
      properties.mcf_top_chair_body  = chair1.body
      applyChairFeatures(properties, 'mcf_top_chair', chair1)
    }
    if (chair2) {
      properties.mcf_second_chair       = chair2.name
      properties.mcf_second_chair_url   = chair2.url
      properties.mcf_second_chair_price = chair2.price
      properties.mcf_second_chair_body  = chair2.body
      applyChairFeatures(properties, 'mcf_second_chair', chair2)
    }
    if (chair3) {
      properties.mcf_third_chair       = chair3.name
      properties.mcf_third_chair_url   = chair3.url
      properties.mcf_third_chair_price = chair3.price
      properties.mcf_third_chair_body  = chair3.body
      applyChairFeatures(properties, 'mcf_third_chair', chair3)
    }

    // Quiz answer properties — used for segmentation and future targeted emails
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
      // Profile exists — extract duplicate ID from error, then patch properties
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
    // Return success to user — don't surface backend errors in the UI
    return Response.json({ ok: true })
  }
}
