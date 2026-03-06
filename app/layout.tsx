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
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(33,212,253,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(255,119,48,0.12),_transparent_24%),linear-gradient(180deg,_#07111d_0%,_#030711_52%,_#07101a_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />
          <SiteHeader />
          <MainShell>{children}</MainShell>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
