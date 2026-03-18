export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    api: 'LatePay API',
    version: '1.0.0',
    endpoints: [
      'GET /api/v1/states',
      'POST /api/v1/calculate',
      'POST /api/v1/demand-letter',
    ]
  })
}
