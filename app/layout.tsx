import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/components/marketplace/CartProvider'
import { SiteHeader } from '@/components/marketplace/SiteHeader'
import { SiteFooter } from '@/components/marketplace/SiteFooter'
import { ensureSeeded } from '@/lib/seed'

export const metadata: Metadata = {
  title: 'BUP Nest — Campus Marketplace',
  description:
    'Multi-vendor marketplace for Bangladesh University of Professionals: buy and sell merch, textbooks, food, and more.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await ensureSeeded()

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF5E9]">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
