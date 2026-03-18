import Link from 'next/link'

export default function Features() {
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Built for Getting Paid</h1>
        <p className="text-lg text-gray-600 mb-12">Every feature exists to help you collect what you&apos;re owed — faster and with less friction.</p>
        <div className="grid gap-8">
          {[
            { icon: '🏛️', title: '50-State Penalty Database', desc: 'Every state\'s Prompt Payment Act and commercial late payment statute, updated and cited. Your demand letters reference real law: "Per Cal. Civ. Code § 3289, interest accrues at 10% per annum..."' },
            { icon: '⏱️', title: 'Live Penalty Counter', desc: 'The debtor sees a page where their balance ticks up in real-time. Every second of non-payment is visible. Psychological pressure without you lifting a finger.' },
            { icon: '📄', title: 'Escalating Demand Letters', desc: 'Four levels: Friendly Reminder → Formal Demand → Final Notice → Pre-Collections. Each letter is professionally written, cites the applicable statute, and shows exactly how much they owe.' },
            { icon: '📈', title: 'Penalty Calculator', desc: 'Input invoice amount, due date, and state. Get the exact daily accrual rate, total accumulated penalty, and projected balance 30/60/90 days out.' },
            { icon: '🔗', title: 'Debtor Portal Link', desc: 'Share a unique link with the debtor. They see their real-time balance, the demand letter, and the payment button. No login required — just pressure.' },
            { icon: '📊', title: 'Invoice Dashboard', desc: 'Track all your unpaid invoices in one place. Filter by escalation level, see total outstanding, and manage the collection lifecycle.' },
          ].map((f) => (
            <div key={f.title} className="border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
              <div className="text-3xl">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition shadow-sm">
            Start Your Free Trial →
          </Link>
        </div>
      </div>
    </div>
  )
}
