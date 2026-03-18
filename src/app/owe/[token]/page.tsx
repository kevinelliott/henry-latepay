'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { STATE_RULES, getEscalationLevel, getEscalationConfig } from '@/lib/penalties'

// Compute a date N days ago as ISO string
function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

// Demo data for the /owe/demo-token-* pages
const DEMO_DATA: Record<string, {
  invoice_number: string
  debtor_name: string
  creditor_name: string
  amount: number
  description: string
  invoice_date: string
  due_date: string
  state: string
}> = {
  // /owe/demo — canonical demo used by /demo redirect
  demo: {
    invoice_number: 'INV-2024-001',
    debtor_name: 'Slow Payer Corp',
    creditor_name: 'Acme Consulting LLC',
    amount: 5000,
    description: 'Professional consulting services — Q3 2024',
    invoice_date: daysAgo(120),
    due_date: daysAgo(90),
    state: 'CA',
  },
  'demo-token-1': {
    invoice_number: 'INV-1042',
    debtor_name: 'Apex Roofing LLC',
    creditor_name: 'Your Business',
    amount: 8500,
    description: 'Commercial HVAC installation — Phase 2',
    invoice_date: '2026-01-10',
    due_date: '2026-02-09',
    state: 'CA',
  },
  'demo-token-2': {
    invoice_number: 'INV-1039',
    debtor_name: 'Sunrise Marketing Group',
    creditor_name: 'Your Business',
    amount: 3200,
    description: 'Brand identity design + website mockups',
    invoice_date: '2025-12-01',
    due_date: '2025-12-31',
    state: 'TX',
  },
}

function formatUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

function calculateLive(amount: number, dueDateStr: string, state: string, nowMs: number) {
  const rules = STATE_RULES[state.toUpperCase()]
  const defaultAnnualRate = 0.10
  if (!rules) return {
    totalOwed: amount, interest: 0, daysLate: 0, dailyRate: 0,
    effectiveDays: 0, dailyAccrual: amount * defaultAnnualRate / 365,
    statute: 'applicable state law', stateName: state, graceDays: 30,
    annualRate: defaultAnnualRate,
  }

  const due = new Date(dueDateStr)
  const now = new Date(nowMs)
  const diffMs = now.getTime() - due.getTime()
  const secondsLate = Math.max(0, Math.floor(diffMs / 1000))
  const daysLate = Math.floor(secondsLate / 86400)
  const effectiveDays = Math.max(0, daysLate - rules.graceDays)
  const effectiveSeconds = Math.max(0, secondsLate - rules.graceDays * 86400)

  const annualRate = rules.annualRate
  const interest = amount * annualRate * (effectiveSeconds / (365 * 86400))
  const totalOwed = amount + interest
  const dailyAccrual = amount * annualRate / 365

  return {
    totalOwed: Math.round(totalOwed * 100) / 100,
    interest: Math.round(interest * 100) / 100,
    daysLate,
    effectiveDays,
    dailyRate: annualRate,
    dailyAccrual,
    statute: rules.statute,
    stateName: rules.stateName,
    graceDays: rules.graceDays,
    annualRate,
  }
}

export default function DebtorPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const invoice = DEMO_DATA[token]
  const [nowMs, setNowMs] = useState(Date.now())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [])

  if (!invoice) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoice Not Found</h1>
          <p className="text-gray-600">This payment link may have expired or already been resolved.</p>
        </div>
      </div>
    )
  }

  const calc = calculateLive(invoice.amount, invoice.due_date, invoice.state, nowMs)
  const level = getEscalationLevel(calc.daysLate)
  const config = getEscalationConfig(level)

  // Seconds-level live counter
  const secondsSinceDue = Math.max(0, Math.floor((nowMs - new Date(invoice.due_date).getTime()) / 1000))
  const effectiveSeconds = Math.max(0, secondsSinceDue - (calc.graceDays ?? 30) * 86400)
  const perSecond = invoice.amount * (calc.annualRate ?? 0.10) / (365 * 86400)

  return (
    <div className="min-h-screen bg-white">
      {/* Escalation Banner */}
      <div className={`${config.bg} border-b ${config.border} py-3 px-6 text-center`}>
        <span className={`text-sm font-semibold ${config.color}`}>
          {config.icon} {config.label} — {config.tone}
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Outstanding Invoice</h1>
          <p className="text-gray-500">From <strong>{invoice.creditor_name}</strong> · Invoice #{invoice.invoice_number}</p>
        </div>

        {/* Live Counter */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-8">
          <div className="text-gray-400 text-sm mb-2">Total Due Right Now</div>
          <div className="text-5xl font-bold text-white font-mono tabular-nums mb-2">
            {formatUSD(calc.totalOwed)}
          </div>
          {calc.daysLate > (calc.graceDays ?? 30) && (
            <div className="text-red-400 text-sm">
              Interest is accruing at {formatUSD(perSecond)}/second
            </div>
          )}
          {calc.daysLate <= (calc.graceDays ?? 30) && (
            <div className="text-yellow-400 text-sm">
              {(calc.graceDays ?? 30) - calc.daysLate} grace days remaining before interest begins
            </div>
          )}
        </div>

        {/* Invoice Breakdown */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 text-sm">Invoice Details</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              ['Invoice #', invoice.invoice_number],
              ['Description', invoice.description],
              ['Invoice Date', new Date(invoice.invoice_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
              ['Due Date', new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
              ['Days Past Due', `${calc.daysLate} days`],
              ['Original Amount', formatUSD(invoice.amount)],
              ['Accrued Interest', formatUSD(calc.interest)],
            ].map(([label, value]) => (
              <div key={label} className="px-5 py-3 flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-medium ${label === 'Accrued Interest' && calc.interest > 0 ? 'text-red-600' : 'text-gray-900'}`}>{value}</span>
              </div>
            ))}
            <div className="px-5 py-3 flex justify-between text-sm bg-gray-50">
              <span className="font-semibold text-gray-900">Total Due Now</span>
              <span className="font-bold text-gray-900">{formatUSD(calc.totalOwed)}</span>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className={`border ${config.border} ${config.bg} rounded-xl p-4 mb-6`}>
          <p className={`text-sm ${config.color}`}>
            <strong>Legal Notice:</strong> Interest accrues at {(calc.annualRate * 100).toFixed(1)}% per annum 
            per <strong>{calc.statute}</strong> — {calc.stateName} late payment law. 
            The balance above increases by {formatUSD(calc.dailyAccrual)}/day until paid in full.
          </p>
        </div>

        {/* Payment CTA */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-center text-white mb-6">
          <h3 className="font-bold text-xl mb-2">Stop the Clock. Pay Now.</h3>
          <p className="text-indigo-200 text-sm mb-4">
            Every day you wait adds {formatUSD(calc.dailyAccrual)} to your balance.
          </p>
          <a href={`mailto:${invoice.creditor_name}?subject=Payment for Invoice ${invoice.invoice_number}`}
            className="block bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition text-lg">
            Contact to Arrange Payment →
          </a>
        </div>

        {/* Dispute */}
        <p className="text-center text-xs text-gray-400">
          Believe this is an error? Contact <strong>{invoice.creditor_name}</strong> directly to dispute.
          This notice was generated by LatePay (henry-latepay.vercel.app).
        </p>
      </div>
    </div>
  )
}
