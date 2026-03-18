'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { calculatePenalty, getEscalationLevel, getEscalationConfig, generateDemandLetter, US_STATES } from '@/lib/penalties'

interface Invoice {
  id: string
  invoice_number: string
  debtor_name: string
  debtor_email: string
  debtor_address: string
  creditor_name: string
  creditor_address: string
  amount: number
  description: string
  invoice_date: string
  due_date: string
  state: string
  token: string
  status: string
  created_at: string
}

const DEMO_INVOICES: Invoice[] = [
  {
    id: 'demo-1',
    invoice_number: 'INV-1042',
    debtor_name: 'Apex Roofing LLC',
    debtor_email: 'billing@apexroofing.com',
    debtor_address: '1234 Industrial Way, Los Angeles, CA 90001',
    creditor_name: 'Your Business',
    creditor_address: '456 Main St, San Francisco, CA 94105',
    amount: 8500,
    description: 'Commercial HVAC installation — Phase 2',
    invoice_date: '2026-01-10',
    due_date: '2026-02-09',
    state: 'CA',
    token: 'demo-token-1',
    status: 'unpaid',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    invoice_number: 'INV-1039',
    debtor_name: 'Sunrise Marketing Group',
    debtor_email: 'accounts@sunrisemktg.com',
    debtor_address: '789 Commerce Blvd, Austin, TX 78701',
    creditor_name: 'Your Business',
    creditor_address: '456 Main St, San Francisco, CA 94105',
    amount: 3200,
    description: 'Brand identity design + website mockups',
    invoice_date: '2025-12-01',
    due_date: '2025-12-31',
    state: 'TX',
    token: 'demo-token-2',
    status: 'unpaid',
    created_at: new Date().toISOString(),
  },
]

function formatUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>(DEMO_INVOICES)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [letterInvoice, setLetterInvoice] = useState<Invoice | null>(null)
  const [form, setForm] = useState({
    invoice_number: '', debtor_name: '', debtor_email: '', debtor_address: '',
    creditor_name: '', creditor_address: '', amount: '', description: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '', state: 'CA',
  })

  function addInvoice() {
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      ...form,
      amount: parseFloat(form.amount),
      token: Math.random().toString(36).slice(2),
      status: 'unpaid',
      created_at: new Date().toISOString(),
    }
    setInvoices(prev => [newInv, ...prev])
    setShowAdd(false)
    setForm({
      invoice_number: '', debtor_name: '', debtor_email: '', debtor_address: '',
      creditor_name: '', creditor_address: '', amount: '', description: '',
      invoice_date: new Date().toISOString().split('T')[0], due_date: '', state: 'CA',
    })
  }

  function markPaid(id: string) {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv))
  }

  const totalOutstanding = invoices
    .filter(i => i.status === 'unpaid')
    .reduce((sum, inv) => {
      try {
        const c = calculatePenalty(inv.amount, inv.due_date, inv.state)
        return sum + c.totalOwed
      } catch { return sum + inv.amount }
    }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-gray-900">LatePay</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Upgrade to Pro</Link>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition" onClick={() => setShowAdd(true)}>
              + New Invoice
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total Outstanding</div>
            <div className="text-2xl font-bold text-indigo-600">{formatUSD(totalOutstanding)}</div>
            <div className="text-xs text-gray-400 mt-1">incl. accrued interest</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Unpaid Invoices</div>
            <div className="text-2xl font-bold text-gray-900">{invoices.filter(i => i.status === 'unpaid').length}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Collected</div>
            <div className="text-2xl font-bold text-green-600">{formatUSD(invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0))}</div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Invoices</h2>
            <button onClick={() => setShowAdd(true)} className="text-sm text-indigo-600 hover:underline">+ Add Invoice</button>
          </div>
          <div className="divide-y divide-gray-100">
            {invoices.map(inv => {
              let calc = null
              let level = 'friendly' as ReturnType<typeof getEscalationLevel>
              let config = getEscalationConfig('friendly')
              try {
                calc = calculatePenalty(inv.amount, inv.due_date, inv.state)
                level = getEscalationLevel(calc.daysLate)
                config = getEscalationConfig(level)
              } catch { /* ignore */ }

              return (
                <div key={inv.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-gray-900">{inv.debtor_name}</span>
                      <span className="text-xs text-gray-400">#{inv.invoice_number}</span>
                      {inv.status === 'paid' && <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Paid</span>}
                      {inv.status === 'unpaid' && calc && (
                        <span className={`${config.bg} ${config.color} text-xs px-2 py-0.5 rounded-full border ${config.border}`}>
                          {config.icon} {config.label}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{inv.description}</div>
                    {calc && inv.status === 'unpaid' && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        Due {new Date(inv.due_date).toLocaleDateString()} · {calc.daysLate}d late · +{formatUSD(calc.dailyAccrual)}/day · {inv.state}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-gray-900">{calc ? formatUSD(calc.totalOwed) : formatUSD(inv.amount)}</div>
                    {calc && calc.accruedInterest > 0 && (
                      <div className="text-xs text-red-500">+{formatUSD(calc.accruedInterest)} interest</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/owe/${inv.token}`} target="_blank" className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100 transition">Debtor Link</Link>
                    <button onClick={() => setLetterInvoice(inv)} className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition">Letter</button>
                    {inv.status === 'unpaid' && (
                      <button onClick={() => markPaid(inv.id)} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition">Mark Paid</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">New Invoice</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Invoice #</label>
                  <input value={form.invoice_number} onChange={e => setForm(f => ({...f, invoice_number: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="INV-1001" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Amount ($)</label>
                  <input type="number" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="5000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Debtor Name / Company</label>
                <input value={form.debtor_name} onChange={e => setForm(f => ({...f, debtor_name: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Debtor Email</label>
                <input value={form.debtor_email} onChange={e => setForm(f => ({...f, debtor_email: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="billing@acme.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Debtor Address</label>
                <input value={form.debtor_address} onChange={e => setForm(f => ({...f, debtor_address: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="123 Main St, City, ST 00000" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Your Name / Company</label>
                <input value={form.creditor_name} onChange={e => setForm(f => ({...f, creditor_name: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Your Business" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Your Address</label>
                <input value={form.creditor_address} onChange={e => setForm(f => ({...f, creditor_address: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="456 Oak Ave, City, ST 00000" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Description</label>
                <input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Web design services - Q1 2026" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Invoice Date</label>
                  <input type="date" value={form.invoice_date} onChange={e => setForm(f => ({...f, invoice_date: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Due Date</label>
                  <input type="date" value={form.due_date} onChange={e => setForm(f => ({...f, due_date: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">State</label>
                  <select value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {US_STATES.map(s => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-700 rounded-lg py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={addInvoice} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm font-medium">Add Invoice</button>
            </div>
          </div>
        </div>
      )}

      {/* Demand Letter Modal */}
      {letterInvoice && (
        <DemandLetterModal invoice={letterInvoice} onClose={() => setLetterInvoice(null)} />
      )}
    </div>
  )
}

function DemandLetterModal({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const letter = generateDemandLetter(
    invoice.creditor_name || 'Your Business',
    invoice.creditor_address || '',
    invoice.debtor_name,
    invoice.debtor_address || '',
    invoice.invoice_number,
    invoice.invoice_date,
    invoice.due_date,
    invoice.amount,
    invoice.state,
    invoice.description,
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Demand Letter — {invoice.debtor_name}</h3>
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(letter)} className="text-sm text-indigo-600 hover:underline">Copy</button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>
        </div>
        <div className="p-6">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-x-auto">{letter}</pre>
        </div>
      </div>
    </div>
  )
}
