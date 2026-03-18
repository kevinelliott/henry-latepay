import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LatePay — Late Payment Enforcement Platform',
  description: 'Auto-calculate state-specific late fees, generate demand letters, and collect what you\'re owed. Stop chasing invoices.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
