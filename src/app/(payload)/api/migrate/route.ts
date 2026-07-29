// Push Payload schema to database — POST /api/migrate
import { getPayload } from 'payload'
import config from '@payload-config'
import { pushDevSchema } from '@payloadcms/drizzle'

export async function POST() {
  try {
    const payload = await getPayload({ config })
    // @ts-expect-error — adapter types narrow differently at runtime
    await pushDevSchema(payload.db)
    return Response.json({ ok: true })
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  return POST()
}
