"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteLinks } from "@/lib/site-data"

export function SiteFooter() {
  const pathname = usePathname()

  if (pathname === "/" || pathname.startsWith("/projects") || pathname === "/about") {
    return null
  }

  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-[var(--color-muted)] md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.18em] text-white">
            Samuel Swedberg
          </p>
          <p>Computer engineering portfolio focused on hardware, firmware, and systems design.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href={siteLinks.github} className="hover:text-white">
            GitHub
          </Link>
          <Link href={siteLinks.linkedin} className="hover:text-white">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}
