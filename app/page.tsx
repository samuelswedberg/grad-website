import Link from "next/link"
import { ArrowRight, Github, Linkedin } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import RevolutionHero from "@/components/ui/revolution-hero"
import { focusAreas, projects, siteLinks, tools } from "@/lib/site-data"

export default function HomePage() {
  const featuredProject = projects[0]

  return (
    <div className="space-y-14 pb-20 md:space-y-20">
      <RevolutionHero
        eyebrow={["Minimizing the friction between a",  "brilliant idea and its physical realization"]}
        navLinks={[
          { text: "PROJECTS", href: "/projects", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
          {
            text: "SIM SYSTEM",
            href: "/projects/sim-racing-system",
            gradient:
              "linear-gradient(135deg, #f7f3ea 0%, #f3e7cf 18%, #e9c98e 50%, #f1ddba 78%, #fbf7ef 100%)",
            shimmer: true,
          },
          { text: "ABOUT", href: "/about", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
          { text: "GITHUB", href: siteLinks.github, gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
        ]}
        quoteLines={[
          "Samuel Swedberg",
          "Computer engineering portfolio",
          "Embedded systems, hardware, and firmware.",
          "North Dakota State University graduate.",
          "Building responsive products from CAD to code.",
          "Projects, links, and case studies below.",
        ]}
        siteLabel="samuelswedberg.com"
      />

      <section className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="panel rounded-[2rem] p-8">
            <p className="section-kicker">Profile</p>
            <div className="mt-4 space-y-5">
              <h1 className="section-title max-w-3xl">Engineering work that has to survive real input.</h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                I am a computer engineering graduate from North Dakota State University. My work lives where
                electronics, embedded software, mechanical design, and user interaction all meet. The goal is not just
                to make something functional. The goal is to make it feel right under load.
              </p>
            </div>
          </div>

          <div className="panel rounded-[2rem] p-8">
            <p className="section-kicker">Links</p>
            <div className="mt-5 space-y-4">
              <Link
                href={siteLinks.github}
                className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-[var(--color-accent)] hover:bg-black/30"
              >
                <span className="flex items-center gap-3">
                  <Github className="h-4 w-4" />
                  GitHub
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteLinks.linkedin}
                className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-[var(--color-warm)] hover:bg-black/30"
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="rounded-[1.25rem] border border-dashed border-white/12 px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
                Currently building my next game in Unity while continuing to sharpen embedded and product engineering
                work.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell content-rail space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Featured build</p>
            <h2 className="section-title mt-3">One system, multiple disciplines.</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white">
            See all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProjectCard project={featuredProject} />
      </section>

      <section className="page-shell content-rail grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">Focus areas</p>
          <ul className="mt-6 space-y-5">
            {focusAreas.map((item) => (
              <li key={item} className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-7 text-[var(--color-muted)]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">Tools in rotation</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
