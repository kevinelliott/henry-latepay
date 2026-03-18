export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { customer_id } = await req.json()
    const stripe = getStripe()
    const host = req.headers.get('origin') || 'https://henry-latepay.vercel.app'
    const session = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: `${host}/dashboard`,
    })
    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
