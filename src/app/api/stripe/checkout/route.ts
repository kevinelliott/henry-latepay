export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

const PRICES: Record<string, string> = {
  pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro',
  business: process.env.STRIPE_BUSINESS_PRICE_ID || 'price_business',
}

export async function POST(req: NextRequest) {
  try {
    const { plan, user_email, user_id } = await req.json()
    const stripe = getStripe()
    const host = req.headers.get('origin') || 'https://henry-latepay.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: user_email,
      line_items: [{ price: PRICES[plan] || PRICES.pro, quantity: 1 }],
      success_url: `${host}/dashboard?checkout=success`,
      cancel_url: `${host}/pricing`,
      metadata: { user_id, plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
