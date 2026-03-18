export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  const stripe = getStripe()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const sb = createServiceClient()
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { user_id?: string }; customer?: string; subscription?: string }
    const userId = session.metadata?.user_id
    if (userId) {
      await sb.from('users').update({
        plan: 'pro',
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
      }).eq('id', userId)
    }
  }

  return NextResponse.json({ received: true })
}
