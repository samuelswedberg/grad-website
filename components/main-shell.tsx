"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return <main className={cn("relative z-10", pathname === "/" ? "pt-0" : "pt-24")}>{children}</main>
}
