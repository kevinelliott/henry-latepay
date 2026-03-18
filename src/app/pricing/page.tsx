import Link from 'next/link'

export default function Pricing() {
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
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Honest Pricing</h1>
        <p className="text-lg text-gray-600 mb-12">One recovered invoice pays for a full year.</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              name: 'Starter', price: '$0', period: 'forever',
              desc: 'Try it before you commit',
              features: ['3 active invoices', 'All 50 state laws', 'Demand letter generator', 'Debtor portal links', 'Penalty calculator'],
              cta: 'Start Free', href: '/dashboard', highlight: false,
            },
            {
              name: 'Pro', price: '$19', period: '/month',
              desc: 'For freelancers & small businesses',
              features: ['Unlimited invoices', 'All 50 state laws', 'All 4 escalation levels', 'Debtor portal links', 'Invoice analytics', 'CSV export'],
              cta: 'Start Pro Trial', href: '/dashboard', highlight: true,
            },
            {
              name: 'Business', price: '$49', period: '/month',
              desc: 'For teams and agencies',
              features: ['Unlimited invoices', 'Team accounts (5 seats)', 'White-label demand letters', 'API access', 'Priority support', 'Custom escalation rules'],
              cta: 'Contact Sales', href: '/dashboard', highlight: false,
            },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-xl p-6 border shadow-sm ${plan.highlight ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200'}`}>
              {plan.highlight && <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">Most Popular</div>}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
              <Link href={plan.href} className={`block text-center font-semibold px-4 py-2 rounded-lg transition mb-6 ${plan.highlight ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                {plan.cta}
              </Link>
              <ul className="text-left space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-indigo-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-8">No contracts. Cancel anytime. All plans include the full 50-state law database.</p>
      </div>
    </div>
  )
}
