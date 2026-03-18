import Link from 'next/link'

export default function Docs() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-gray-900">LatePay</span>
          </Link>
          <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">Dashboard</Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Docs</h1>
        <p className="text-gray-600 mb-8">Integrate LatePay&apos;s penalty calculator into your invoicing or accounting software.</p>
        <div className="space-y-8">
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">GET</span>
              <code className="text-sm font-mono text-gray-800">/api/v1/states</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Returns all 50 states + DC penalty rules including annual rate, statute citation, and daily accrual formula.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">POST</span>
              <code className="text-sm font-mono text-gray-800">/api/v1/calculate</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Calculate the late payment penalty for an invoice.</p>
            <pre className="bg-gray-50 rounded p-4 text-xs font-mono overflow-x-auto">{`{
  "amount": 5000.00,
  "due_date": "2026-01-15",
  "state": "CA",
  "as_of_date": "2026-03-18"  // optional, defaults to today
}`}</pre>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">POST</span>
              <code className="text-sm font-mono text-gray-800">/api/v1/demand-letter</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Generate a demand letter for an invoice. Returns formatted text with statute citations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
