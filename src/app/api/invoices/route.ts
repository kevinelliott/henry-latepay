export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user_id')
  if (!userId) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('invoices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ invoices: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const sb = createServiceClient()

  const { data, error } = await sb.from('invoices').insert([{
    user_id: body.user_id,
    invoice_number: body.invoice_number,
    debtor_name: body.debtor_name,
    debtor_email: body.debtor_email,
    debtor_address: body.debtor_address,
    creditor_name: body.creditor_name,
    creditor_address: body.creditor_address,
    amount: body.amount,
    description: body.description,
    invoice_date: body.invoice_date,
    due_date: body.due_date,
    state: body.state,
    token: crypto.randomUUID(),
    status: 'unpaid',
  }]).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ invoice: data })
}
