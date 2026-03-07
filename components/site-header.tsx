"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isProjectsPage = pathname === "/projects"
  const isAboutPage = pathname === "/about"

  if (isHomePage || isProjectsPage || isAboutPage) {
    return null
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/10 bg-[rgba(5,11,20,0.72)] px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-6">
        <Link href="/" className="group flex min-w-0 flex-col leading-none">
          <span className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.18em] text-white">
            Samuel Swedberg
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)] transition group-hover:text-[var(--color-accent)]">
            Embedded systems and product engineering
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1 text-sm font-semibold text-[var(--color-muted)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  isActive
                    ? "bg-[var(--color-accent)] text-[var(--color-canvas)]"
                    : "hover:bg-white/8 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
