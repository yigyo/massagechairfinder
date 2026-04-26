export const runtime = 'nodejs'

interface ChairResult {
  name: string
  price: string
  url: string
}

export async function POST(req: Request) {
  try {
    const { email, chairs } = await req.json() as { email: string; chairs: ChairResult[] }

    if (!email) {
      return Response.json({ ok: false, error: 'Email required' }, { status: 400 })
    }

    // Log to Vercel logs — wire up a real email service (Resend, Klaviyo, etc.) here
    console.log('[send-results] Email capture:', email)
    console.log('[send-results] Chairs:', chairs?.map((c) => c.name).join(', '))

    // TODO: replace with real email send, e.g.:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: 'Emily <emily@massagechairfinder.com>', to: email, subject: 'Your massage chair matches', html: buildEmailHtml(chairs) })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[send-results] Error:', err)
    return Response.json({ ok: false }, { status: 500 })
  }
}
