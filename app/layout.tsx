import type React from "react"
// ... existing code ...
import { Geist, Geist_Mono } from "next/font/google"
// <CHANGE> Updated metadata and added theme support
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Game Toán - Quy Luật Dãy Số",
  description: "Trò chơi toán học thú vị cho học sinh lớp 4",
  generator: "v0.app",
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
