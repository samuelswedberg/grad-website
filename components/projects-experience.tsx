"use client"

import { startTransition, useMemo, useState } from "react"
import Link from "next/link"

import { siteLinks } from "@/lib/site-data"
import { cn } from "@/lib/utils"

import styles from "@/app/projects/projects-page.module.css"

type ProjectMetric = {
  value: string
  label: string
}

type ProjectEntry = {
  id: string
  title: string
  subtitle: string
  year: string
  role: string
  tags: string[]
  description: string
  overview: string
  challenge: string[]
  solution: string[]
  outcome: string[]
  bullets?: string[]
  metrics?: ProjectMetric[]
}

const projects: ProjectEntry[] = [
  {
    id: "sim-system",
    title: "Sim System",
    subtitle: "WebGPU Fluid Dynamics Engine",
    year: "2023",
    role: "Lead Engineer & Design",
    tags: ["WebGL", "Rust", "WASM", "Physics"],
    description:
      "A browser-based simulation engine capable of rendering 2 million particles in real-time. Designed to test the limits of WebGPU in modern browsers.",
    overview:
      "The friction between a brilliant mathematical model and its visual representation often lies in compute power. Sim System bridges this gap.",
    challenge: [
      "Traditional fluid simulations usually live inside heavy desktop tools. The project goal was to bring that fidelity into the browser without turning load times or interactivity into a compromise.",
      "That meant balancing throughput, memory pressure, and visual quality while staying inside browser constraints that are far less forgiving than a native graphics stack."
    ],
    solution: [
      "By pairing Rust with WebAssembly and targeting the emerging WebGPU standard, Sim System pushes the expensive numerical work into a compact, low-overhead runtime while keeping rendering responsive.",
      "The architecture was intentionally sparse. Data pipelines were tuned for fast transfers, the rendering path stayed dependency-light, and the interface exposed only the controls needed to interrogate the simulation."
    ],
    outcome: [
      "The result is a near-native browser experience that demonstrates how far modern graphics APIs can be pushed for scientific and creative tooling.",
      "It also became a useful benchmark for practical WebGPU adoption, not just a visual demo."
    ],
    metrics: [
      { value: "2M+", label: "Particles" },
      { value: "60", label: "FPS Stable" },
      { value: "4MB", label: "Bundle Size" },
      { value: "0", label: "Dependencies" }
    ]
  },
  {
    id: "forge",
    title: "Forge",
    subtitle: "Indoor Cycling & Training App",
    year: "2024",
    role: "Lead Engineer & Design",
    tags: ["React Native", "Bluetooth LE", "Node.js", "Postgres"],
    description:
      "Currently building Forge. An application that connects to smart trainers via Bluetooth to control resistance based on virtual terrain gradients.",
    overview:
      "Cycling indoors should not feel like staring at a spreadsheet. Forge brings the road inside.",
    challenge: [
      "Most trainer software either overwhelms the rider with noisy metrics or strips the experience down so far that it loses the feel of real training.",
      "The core problem was making live resistance control, rider telemetry, and session structure feel immediate rather than clinical."
    ],
    solution: [
      "Forge connects directly to FTMS-enabled smart trainers over Bluetooth Low Energy, reading power and cadence while broadcasting target resistance values in real time.",
      "The interface stays deliberately restrained, surfacing only the metrics that matter for interval work and endurance pacing."
    ],
    outcome: [
      "The product direction is aimed at a cleaner indoor training loop with less friction between workout intent and physical feedback.",
      "It is designed to scale from solo rides to structured plans and comparative ghost-rider sessions."
    ],
    bullets: [
      "Real-time Bluetooth Low Energy communication.",
      "Adaptive training plans that adjust to user fatigue.",
      "Social leaderboards and ghost-rider functionality."
    ]
  },
  {
    id: "nebula",
    title: "Nebula",
    subtitle: "Enterprise Design System",
    year: "2022",
    role: "Lead Engineer & Design",
    tags: ["React", "Storybook", "Figma", "A11y"],
    description:
      "A comprehensive design language and component library built for scale, ensuring consistency across 12 different products.",
    overview:
      "Systemizing chaos into a coherent visual language.",
    challenge: [
      "Twelve products had drifted into twelve dialects. Components behaved differently, accessibility quality varied, and teams were paying the tax for every inconsistency.",
      "The challenge was to build something strict enough to create order without becoming a bottleneck for product teams shipping at different speeds."
    ],
    solution: [
      "Nebula became the single source of truth for engineering and design, combining shared components, tokens, documentation, and an interactive playground in one system.",
      "Visual regression testing and accessibility review were built into the workflow so quality checks happened as part of delivery rather than after it."
    ],
    outcome: [
      "The design system reduced repeated UI work and made cross-product consistency measurable instead of aspirational.",
      "More importantly, it gave teams a common language for discussing interface decisions."
    ]
  },
  {
    id: "echo",
    title: "Echo",
    subtitle: "Audio Visualization Library",
    year: "2021",
    role: "Lead Engineer & Design",
    tags: ["Canvas API", "Web Audio", "Math.js"],
    description:
      "Open source library for generating reactive audio visualizations with minimal configuration.",
    overview:
      "Seeing sound in real time.",
    challenge: [
      "The Web Audio API is powerful, but the gap between raw frequency data and a polished visualization can be intimidating for developers who just want expressive results quickly.",
      "Echo focused on making reactive visuals approachable without flattening the creative range."
    ],
    solution: [
      "The library wraps waveform and frequency analysis behind a simpler interface, then exposes clean hooks for driving canvas-based animation systems.",
      "Developers can move from audio input to a reactive scene without having to rebuild the plumbing every time."
    ],
    outcome: [
      "Echo lowered the setup cost for music-driven visual work and made experimentation faster for artists, hobbyists, and frontend teams.",
      "It was intentionally built as a small, composable tool rather than a monolithic visual editor."
    ]
  }
]

const sectionLinks = [
  { id: "overview", label: "01. Overview" },
  { id: "challenge", label: "02. The Challenge" },
  { id: "solution", label: "03. Solution" },
  { id: "outcome", label: "04. Outcome" }
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function ProjectsExperience() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  )

  const openProject = (projectId: string) => {
    scrollToTop()
    startTransition(() => {
      setSelectedProjectId(projectId)
    })
  }

  const showIndex = () => {
    scrollToTop()
    startTransition(() => {
      setSelectedProjectId(null)
    })
  }

  const showNextProject = () => {
    if (!selectedProject) {
      return
    }

    const currentIndex = projects.findIndex((project) => project.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    openProject(projects[nextIndex].id)
  }

  return (
    <div className={styles.page}>
      <div className={styles.noiseOverlay} aria-hidden="true" />

      <div className={styles.fluidBg} aria-hidden="true">
        <div className={cn(styles.fluidBlob, styles.blob1)} />
        <div className={cn(styles.fluidBlob, styles.blob2)} />
        <div className={cn(styles.fluidBlob, styles.blob3)} />
        <div className={cn(styles.fluidBlob, styles.blob4)} />
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.wordMark}>
          <span className={styles.navLabel}>Samuel Swedberg</span>
          <span className={styles.navSubLabel}>Engineer Creator</span>
        </Link>

        <div className={styles.navGroup}>
          <div className={styles.navRow}>
            <button
              type="button"
              onClick={showIndex}
              className={cn(styles.navLink, styles.navLinkActive)}
            >
              Projects
            </button>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            <Link
              href={siteLinks.linkedin}
              className={styles.navLink}
              target="_blank"
              rel="noreferrer"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {selectedProject ? (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onBack={showIndex}
            onNext={showNextProject}
          />
        ) : (
          <ProjectsIndex key="projects-index" onOpenProject={openProject} />
        )}
      </main>
    </div>
  )
}

function ProjectsIndex({ onOpenProject }: { onOpenProject: (projectId: string) => void }) {
  return (
    <div className={styles.revealText}>
      <header className={styles.hero}>
        <h1 className={cn(styles.fontDisplay, styles.heroTitle)}>
          Selected <br />
          <span className={styles.heroAccent}>Works</span>
        </h1>

        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <div className="md:w-1/2">
            <p className={styles.heroCopy}>
              Minimizing the friction between a brilliant idea and its physical realization. A
              collection of engineering challenges solved.
            </p>
          </div>
        </div>
      </header>

      <section className="flex flex-col">
        {projects.map((project, index) => (
          <article key={project.id} className={styles.projectCard}>
            <button
              type="button"
              onClick={() => onOpenProject(project.id)}
              className="group relative block w-full text-left"
            >
              <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-baseline">
                <div className="md:w-2/5">
                  <span className={styles.projectCardIndex}>
                    {String(index + 1).padStart(2, "0")} {project.subtitle}
                  </span>
                  <h2 className={cn(styles.fontDisplay, styles.projectTitle)}>{project.title}</h2>
                </div>

                <div className="md:w-2/5">
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-start text-right md:w-[10%] md:self-auto">
                  <span className={cn(styles.metaMono, "text-sm text-gray-500")}>{project.year}</span>
                </div>
              </div>
            </button>
          </article>
        ))}

        <div className={styles.listFooter}>
          <span>2024</span>
          <span>S. Swedberg</span>
        </div>
      </section>
    </div>
  )
}

function ProjectDetail({
  project,
  onBack,
  onNext
}: {
  project: ProjectEntry
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className={cn(styles.revealText, "pb-20")}>
      <button type="button" onClick={onBack} className={styles.detailBackButton}>
        <span className={styles.detailBackLine} aria-hidden="true" />
        Back to Index
      </button>

      <header className="mb-20 grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className={cn(styles.fontDisplay, styles.detailTitle)}>{project.title}</h1>
          <p className={styles.detailSubtitle}>{project.subtitle}</p>
        </div>

        <div className={cn(styles.detailMetaBlock, "flex h-full flex-col justify-end lg:col-span-4 lg:text-right")}>
          <div className="space-y-1">
            <span className={styles.detailMetaLabel}>Role</span>
            <span className={styles.detailMetaValue}>{project.role}</span>

            <span className={styles.detailMetaLabel}>Year</span>
            <span className={styles.detailMetaValue}>{project.year}</span>

            <span className={styles.detailMetaLabel}>Stack</span>
            <span className="block text-sm font-bold uppercase text-gray-300">
              {project.tags.join(", ")}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.caseStudyFrame}>
        <div className={styles.caseStudyGradient} />
        <div className={styles.caseStudyLineTop} />
        <div className={styles.caseStudyLineBottom} />
        <div className={styles.caseStudyCircle} />
        <div className={styles.caseStudyBadge}>Case Study Visualization</div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <h3 className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Case Study
            </h3>
            <ul className="space-y-3 text-sm">
              {sectionLinks.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(styles.tocLink, index === 0 && styles.activeTocLink)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className={cn(styles.article, "lg:col-span-8 lg:col-start-5")}>
          <section id="overview" className="scroll-mt-32">
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.leadParagraph}>{project.overview}</p>
          </section>

          <section id="challenge" className="scroll-mt-32">
            <h2 className={styles.sectionTitle}>The Challenge</h2>
            {project.challenge.map((paragraph) => (
              <p key={paragraph} className={styles.bodyParagraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section id="solution" className="scroll-mt-32">
            <h2 className={styles.sectionTitle}>Solution</h2>
            {project.solution.map((paragraph) => (
              <p key={paragraph} className={styles.bodyParagraph}>
                {paragraph}
              </p>
            ))}

            {project.metrics ? (
              <div className={styles.metricPanel}>
                <h4 className={styles.sectionTitle}>Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span className={cn(styles.fontDisplay, styles.metricValue)}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.bullets ? (
              <ul className={styles.bulletList}>
                {project.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>

          <section id="outcome" className="scroll-mt-32">
            <h2 className={styles.sectionTitle}>Outcome</h2>
            {project.outcome.map((paragraph) => (
              <p key={paragraph} className={styles.bodyParagraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <div className={styles.articleFooter}>
            <h3 className={cn(styles.fontDisplay, "m-0 text-3xl uppercase")}>Next Project</h3>
            <button type="button" onClick={onNext} className={styles.nextButton}>
              View
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
