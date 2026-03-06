import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { focusAreas, siteLinks } from "@/lib/site-data"

export default function AboutPage() {
  return (
    <div className="page-shell content-rail space-y-8 pb-20">
      <section className="panel rounded-[2.25rem] p-8 md:p-12">
        <p className="section-kicker">About</p>
        <h1 className="section-title mt-4 max-w-4xl">I like engineering problems that cross boundaries.</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-[var(--color-muted)]">
          <p>
            I build hardware and firmware from the ground up, from PCB layout and control logic to physical enclosures
            and interface details. The work that keeps me interested is the kind that forces software, electronics, and
            product thinking to cooperate.
          </p>
          <p>
            I graduated from North Dakota State University with a degree in computer engineering. My strongest interest
            areas are embedded systems, rapid prototyping, and building products that feel robust when someone actually
            puts their hands on them.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">What I care about</p>
          <ul className="mt-6 space-y-5">
            {focusAreas.map((item) => (
              <li key={item} className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-7 text-[var(--color-muted)]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">Find me</p>
          <div className="mt-6 space-y-4">
            <Link
              href={siteLinks.linkedin}
              className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-[var(--color-accent)] hover:bg-black/30"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={siteLinks.github}
              className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-[var(--color-warm)] hover:bg-black/30"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              If you are interested in embedded work, prototyping, or product-focused engineering, these are the best
              places to start.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
