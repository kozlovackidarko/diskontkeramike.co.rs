import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-montserrat',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://diskontkeramike.co.rs'

export const metadata: Metadata = {
  title: 'Diskont Keramike',
  description: 'A Next.js website for the Gile Promet d.o.o. company.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Diskont Keramike',
    description: 'A Next.js website for the Gile Promet d.o.o. company.',
    url: siteUrl,
    siteName: 'Diskont Keramike',
    images: [
      {
        url: '/icons/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Diskont Keramike',
      },
    ],
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Diskont Keramike',
    description: 'A Next.js website for the Gile Promet d.o.o. company.',
    images: ['/icons/icon-192.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} font-inter`}>
        {children}
      </body>
    </html>
  )
}
