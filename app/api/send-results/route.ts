export const runtime = 'nodejs'

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

export async function POST(req: Request) {
  try {
    const { email, chairs } = await req.json() as { email: string; chairs: ChairResult[] }

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
    }
    if (chair2) {
      properties.mcf_second_chair       = chair2.name
      properties.mcf_second_chair_url   = chair2.url
      properties.mcf_second_chair_price = chair2.price
      properties.mcf_second_chair_body  = chair2.body
    }
    if (chair3) {
      properties.mcf_third_chair       = chair3.name
      properties.mcf_third_chair_url   = chair3.url
      properties.mcf_third_chair_price = chair3.price
      properties.mcf_third_chair_body  = chair3.body
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
