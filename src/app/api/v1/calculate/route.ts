export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { calculatePenalty } from '@/lib/penalties'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, due_date, state, as_of_date } = body
    if (!amount || !due_date || !state) {
      return NextResponse.json({ error: 'amount, due_date, and state are required' }, { status: 400 })
    }
    const result = calculatePenalty(Number(amount), due_date, state, as_of_date)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 })
  }
}
