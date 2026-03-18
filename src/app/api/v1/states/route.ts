export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { STATE_RULES, US_STATES } from '@/lib/penalties'

export async function GET() {
  return NextResponse.json({ states: US_STATES, rules: STATE_RULES })
}
