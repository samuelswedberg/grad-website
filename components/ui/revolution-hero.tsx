"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export type HeroNavLink = {
  text: string
  href: string
  gradient: string
  shimmer?: boolean
}

export interface RevolutionHeroProps {
  eyebrow?: string[]
  navLinks?: HeroNavLink[]
  quoteLines?: React.ReactNode[]
  siteLabel?: string
}

interface NavLinkProps {
  children: React.ReactNode
  href: string
  gradient: string
  shimmer?: boolean
}

function NavLink({ children, href, gradient, shimmer = false }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isExternal = href.startsWith("http")

  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(link, {
        scale: 1.05,
        rotationX: -2,
        z: 20,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 5px 20px rgba(255,179,71,0.3)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(link, {
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 0 0px rgba(255,179,71,0)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    link.addEventListener("mouseenter", handleMouseEnter)
    link.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter)
      link.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <a
      ref={linkRef}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`crt-text block mb-5 cursor-pointer text-[2.7rem] font-black leading-[0.92] tracking-[0.02em] transition-all duration-300 transform-gpu md:mb-6 md:text-[4.35rem] lg:text-[6.8rem] ${
        shimmer ? "hero-nav-shimmer" : ""
      } ${
        isHovered ? "z-10" : ""
      }`}
      style={{
        fontFamily: '"Segoe UI"',
        background: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        backgroundSize: shimmer ? "180% 180%" : undefined,
        backgroundPosition: shimmer ? "50% 50%" : undefined,
        textShadow: isHovered
          ? shimmer
            ? "0 0 16px rgba(255,160,50,0.22), 0.7px 0 0 rgba(255,100,0,0.3), -0.7px 0 0 rgba(255,200,50,0.3)"
            : "0 0 18px rgba(255,179,71,0.15), 0.7px 0 0 rgba(255,100,0,0.3), -0.7px 0 0 rgba(255,200,50,0.3)"
          : "0.7px 0 0 rgba(255,100,0,0.3), -0.7px 0 0 rgba(255,200,50,0.3)",
      }}
    >
      {children}
    </a>
  )
}

export default function RevolutionHero({
  eyebrow = ["Break the boundaries,", "Unleash your potential"],
  navLinks,
  quoteLines = [
    "The future belongs to those",
    "who dare to dream bigger",
    "Every revolution starts with a single spark",
    "Your moment is now.",
    "Your power is limitless.",
    "Your impact will be legendary.",
  ],
  siteLabel = "www.revolution.com",
}: RevolutionHeroProps) {
  const defaultNavLinks: HeroNavLink[] = [
    { text: "IGNITE", href: "/ignite", gradient: "linear-gradient(135deg, #ffeedd, #cccccc)" },
    { text: "TRANSFORM", href: "/transform", gradient: "linear-gradient(135deg, #ffeedd, #cccccc)" },
    { text: "DOMINATE", href: "/dominate", gradient: "linear-gradient(135deg, #ffeedd, #cccccc)" },
    { text: "EVOLVE", href: "/evolve", gradient: "linear-gradient(135deg, #ffeedd, #cccccc)" },
  ]

  const resolvedNavLinks = navLinks ?? defaultNavLinks
  const primaryQuoteLines = quoteLines.slice(0, 1)
  const secondaryQuoteLines = quoteLines.slice(1, -2)
  const closingQuoteLines = quoteLines.slice(-2)

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ animation: "vhs-tracking 25s linear infinite" }}
    >
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
        <div className="text-left">
          {eyebrow.map((line) => (
            <p
              key={line}
              className="text-sm font-bold uppercase tracking-wider text-[var(--color-muted)] md:text-base"
              style={{ fontFamily: '"Segoe UI"' }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col justify-between items-end md:flex-row">
          <nav className="mb-8 text-left md:mb-0">
            {resolvedNavLinks.map((link) => (
              <NavLink key={link.text} href={link.href} gradient={link.gradient} shimmer={link.shimmer}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          <div className="max-w-xs text-right text-xs text-[var(--color-muted)] md:text-sm" style={{ fontFamily: '"Segoe UI"' }}>
            {primaryQuoteLines.map((line, index) => (
              <p key={index} className="mb-2 font-semibold text-[var(--color-ink)]">
                {line}
              </p>
            ))}
            {secondaryQuoteLines.map((line, index) => (
              <p key={index} className="mb-2 text-[var(--color-muted)]">
                {line}
              </p>
            ))}
            <div className="mt-4">
              {closingQuoteLines.map((line, index) => (
                <p key={index} className="mb-2 text-[var(--color-muted)]">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-6 bg-gradient-to-r from-[var(--color-warm)] to-[var(--color-accent)] bg-clip-text font-bold text-transparent">
              {siteLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
