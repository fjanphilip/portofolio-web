import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jan Philip Faith Portofolio',
  description: 'Created with Philippp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
