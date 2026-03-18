export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { generateDemandLetter } from '@/lib/penalties'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      creditor_name, creditor_address, debtor_name, debtor_address,
      invoice_number, invoice_date, due_date, amount, state, description
    } = body
    const letter = generateDemandLetter(
      creditor_name, creditor_address, debtor_name, debtor_address,
      invoice_number, invoice_date, due_date, Number(amount), state, description
    )
    return NextResponse.json({ letter })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 })
  }
}
