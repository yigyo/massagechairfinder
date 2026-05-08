import { NextRequest, NextResponse } from "next/server"

// Klaviyo subscription endpoint
// Required env vars (add to .env.local):
//   KLAVIYO_PRIVATE_KEY   -- your Klaviyo private API key
//   KLAVIYO_LIST_ID       -- the list ID for the Buyer's Guide subscribers

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_KEY
    const listId     = process.env.KLAVIYO_LIST_ID

    if (!privateKey || !listId) {
      // Klaviyo not yet configured; log and return success in dev
      console.warn("KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID not set in .env.local")
      return NextResponse.json({ success: true })
    }

    const response = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          "Authorization": "Klaviyo-API-Key " + privateKey,
          "Content-Type":  "application/json",
          "revision":      "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: { consent: "SUBSCRIBED" },
                        },
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: { type: "list", id: listId },
              },
            },
          },
        }),
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Klaviyo error:", response.status, errorBody)
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Subscribe route error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
