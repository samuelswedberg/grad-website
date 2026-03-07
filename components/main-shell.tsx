"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isImmersivePage = pathname === "/" || pathname === "/projects" || pathname === "/about"

  return <main className={cn("relative z-10", isImmersivePage ? "pt-0" : "pt-24")}>{children}</main>
}
