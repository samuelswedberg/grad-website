import type { Metadata } from "next"

import "./globals.css"

import { MainShell } from "@/components/main-shell"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Samuel Swedberg | Embedded Systems Portfolio",
  description:
    "Computer engineering portfolio featuring embedded systems, hardware prototypes, firmware, and product-focused engineering work."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-canvas)] text-white">
        <div className="crt-screen">
          <div className="crt-scanlines" aria-hidden="true" />
          <div className="crt-noise" aria-hidden="true" />
          <SiteHeader />
          <MainShell>{children}</MainShell>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
