import './globals.css'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import ProgressBarProvider from '@/contexts/ProgressBarProvider'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next ecommerce',
  description: 'Next ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  )
}
