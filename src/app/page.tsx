import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-gray-900">LatePay</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900">API</Link>
            <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          50-State Late Payment Laws Built In
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Stop Chasing Invoices.<br />
          <span className="text-indigo-600">Start Enforcing Payment.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          LatePay auto-calculates state-specific late fees, generates escalating demand letters citing actual statutes, 
          and shows debtors a <strong>live penalty page</strong> where fees tick up in real-time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition shadow-sm">
            Start Collecting → 
          </Link>
          <Link href="/features" className="border border-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg text-lg hover:bg-gray-50 transition">
            See How It Works
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">Free for your first 3 invoices. No credit card required.</p>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-indigo-600">50</div>
            <div className="text-sm text-gray-500 mt-1">State penalty laws + DC</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-indigo-600">4</div>
            <div className="text-sm text-gray-500 mt-1">Escalation levels</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-indigo-600">$0</div>
            <div className="text-sm text-gray-500 mt-1">To start collecting</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Enter Invoice', desc: 'Add the unpaid invoice details, due date, and debtor info.' },
              { step: '2', title: 'Auto-Calculate', desc: 'LatePay calculates exact penalties per your state\'s Prompt Payment Act.' },
              { step: '3', title: 'Generate Letter', desc: 'Professional demand letter citing specific statutes, ready to send.' },
              { step: '4', title: 'Debtor Sees Pressure', desc: 'Live penalty page where fees tick up every second. Pay now or pay more.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Every Day You Wait Costs You Money</h2>
        <p className="text-lg text-gray-600 mb-8">
          Late payment interest accrues daily. The demand letter you don&apos;t send is money you don&apos;t collect.
        </p>
        <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition shadow-sm">
          Create Your First Demand →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <span>© 2026 LatePay. Built by Henry 🗿</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-gray-900">API Docs</Link>
            <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
