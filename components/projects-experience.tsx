"use client"

import Image from "next/image"
import Link from "next/link"

import { projects as portfolioProjects, siteLinks } from "@/lib/site-data"
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
  gallery?: { src: string; alt: string }[]
  heroImage?: string
  links?: { label: string; href: string }[]
  cta?: { label: string; href: string; description: string }
}

const simRacingProject = portfolioProjects[0]

export const projects: ProjectEntry[] = [
  {
    id: "forge",
    title: "Forge",
    subtitle: "Indoor cycling race simulator",
    year: "2026",
    role: "Founder",
    tags: ["Rust", "Tauri", "Bluetooth LE", "TypeScript"],
    description:
      "Sim racing for cycling. An indoor race simulator with a broadcast telemetry UI, AI opponents with dynamic race strategy, and a one-time purchase model in a market built on subscriptions.",
    overview:
      "The last cycling app you'll ever buy. Forge is an indoor cycling race simulator that replaces the 3D virtual world with a broadcast-style race telemetry interface — lightweight, data-dense, and built for cyclists who care more about the competition than the scenery.",
    challenge: [
      "3D virtual worlds don't drive engagement — riders in every major cycling app watch Netflix on a second screen. The visuals aren't the hook. The competition is. But no app has fully committed to that premise: building a sim racing experience for cycling where the physics, the opponents, and the data are the product.",
      "The market is also broken by economics. Every serious tool charges $18–20 per month indefinitely — whether you race online or not, whether you use the social features or not, whether you even ride that month or not. The result is that cyclists either overpay for features they don't use, or churn off entirely. There was no product that charged you only for what you actually needed."
    ],
    solution: [
      "Forge's core is a physics-accurate race simulation engine written in Rust, running entirely locally with no server dependency. Races support 50–200 AI opponents, each with distinct personality profiles — attackers, climbers, wheel-suckers — that make strategic decisions in real time: surges, drafts, and late-race attacks.",
      "The interface is a broadcast-style race telemetry overlay, not a 3D world. Power, cadence, gap to front, sector splits, and live positional data are all surfaced in a high-contrast, low-latency UI built with Tauri. The app connects to any FTMS-enabled smart trainer over Bluetooth LE, reading power and cadence while broadcasting resistance targets in real time.",
      "Multiplayer supports up to 200 riders with proximity culling and group summarization to keep the simulation tractable. AI backfill ensures races always feel full — even at 3 AM or during early growth. Online infrastructure has real costs, so multiplayer and live AI matchmaking are gated behind Forge Pro, an optional subscription. If you never want to race online, you never pay monthly — full offline racing is yours with a single purchase, forever."
    ],
    outcome: [
      "Currently in active development. The simulation engine, BLE trainer integration, and telemetry UI are the current focus before expanding to multiplayer infrastructure.",
      "The model is built around paying for what you use. The core app is a one-time purchase — full offline racing, AI opponents, and all local features included. Forge Pro is an optional subscription that unlocks online multiplayer and live AI matchmaking, the only features that require running infrastructure. Unlike every competitor, if you don't want online racing, you don't pay monthly. Ever."
    ],
    cta: {
      label: "rideforge.app",
      href: "https://rideforge.app",
      description: "Currently in development — follow along."
    },
    bullets: [
      "AI opponents with dynamic race strategy — surges, attacks, drafting — not pace bots.",
      "Broadcast-style race telemetry UI: data-dense, GPU-free, visually striking.",
      "Full offline racing with one-time purchase — no subscription required.",
      "Forge Pro optional subscription for online multiplayer and live AI matchmaking only.",
      "Multiplayer with AI backfill so races always feel full.",
      "Pay for what you use — offline racing is one-time, online is opt-in."
    ]
  },
  {
    id: simRacingProject.slug,
    title: simRacingProject.title,
    subtitle: simRacingProject.eyebrow,
    year: "2024–2025",
    role: simRacingProject.status,
    tags: simRacingProject.stack,
    description: simRacingProject.summary,
    heroImage: simRacingProject.heroImage,
    gallery: simRacingProject.gallery,
    links: simRacingProject.links,
    overview:
      "Designed and built as a year-long senior capstone at NDSU, this project spans three custom PCBs, two microcontroller platforms, a real-time operating system, and a PC-side telemetry bridge — all integrated into a working force feedback sim racing system.",
    challenge: [
      "The goal was to build something that behaves like a finished product, not a prototype: responsive under load, modular across devices, and durable enough to actually race with.",
      "Force feedback steering wheels exist commercially, but building one from scratch means solving every layer at once: motor dynamics, embedded communication, USB HID enumeration, live telemetry, and PCB layout — all as one integrated product rather than a collection of disconnected prototypes.",
      "The hardest constraint was keeping the full signal chain tight. From steering wheel input to USB HID report, from Assetto Corsa telemetry data to RPM lighting on the wheel — every link in the system had to be fast and reliable enough to feel immediate in real racing conditions."
    ],
    solution: [
      "The wheelbase runs an STM32F446 with FreeRTOS managing concurrent tasks: a closed-loop motor control loop driving a belt-driven DC motor through a BTS7960B H-bridge, a CAN bus handler relaying live telemetry to the steering wheel, and a USB composite driver presenting the full system as a game controller to the PC.",
      "The steering wheel runs a separate STM32F103, receiving telemetry frames from the wheelbase over CAN and rendering gear, speed, and RPM data onto a Nextion display. All user inputs — buttons, encoders, rotary switches, and paddle shifters —  are routed back to the wheelbase.",
      "The pedals report throttle, brake, and clutch positions via analog angle sensors to the wheelbase, which bundles everything into a single USB HID report. A Python application on the PC reads Assetto Corsa shared memory and forwards live telemetry over USB OTG — faster and lower-overhead than UDP."
    ],
    outcome: [
      "The final system earned top marks and strong feedback from faculty and industry judges at the NDSU Senior Design Expo. It successfully enumerates as a USB game controller, delivers real-time force feedback, and streams live telemetry to the wheel display — all simultaneously and without conflicts.",
      "Beyond the technical result, this project proved out a complete embedded product workflow from scratch: schematic capture and PCB layout in Fusion 360 Electronics, mechanical enclosures designed in Fusion 360, 3D-printed in PA6-CF and ABS, and firmware debugged with a logic analyzer and oscilloscope across two full semesters."
    ],
    metrics: [
      { value: "3", label: "Custom PCBs" },
      { value: "Fusion 360", label: "Modeled & 3D Printed" },
      { value: "FreeRTOS", label: "Real-Time OS" },
      { value: "USB HID", label: "PC Interface" }
    ],
    bullets: simRacingProject.highlights
  },
]

const sectionLinks = [
  { id: "overview", label: "01. Overview" },
  { id: "challenge", label: "02. The Challenge" },
  { id: "solution", label: "03. Solution" },
  { id: "outcome", label: "04. Outcome" }
]

export function ProjectsExperience() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.wordMark}>
          <span className={styles.navLabel}>Samuel Swedberg</span>
          <span className={styles.navSubLabel}>Engineer. Creator. Builder.</span>
        </Link>

        <div className={styles.navGroup}>
          <div className={styles.navRow}>
            <Link href="/projects" className={cn(styles.navLink, styles.navLinkActive)}>
              Projects
            </Link>
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
        <ProjectsIndex />
      </main>
    </div>
  )
}

function ProjectsIndex() {
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
            <Link
              href={`/projects/${project.id}`}
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
            </Link>
          </article>
        ))}

        <div className={styles.listFooter}>
          <span>2026</span>
          <span>S. Swedberg</span>
        </div>
      </section>
    </div>
  )
}

export function ProjectDetail({
  project,
  onBack,
  onNext
}: {
  project: ProjectEntry
  onBack: () => void
  onNext: () => void
}) {
  const activeSectionLinks = [
    ...sectionLinks,
    ...(project.gallery?.length ? [{ id: "gallery", label: "05. Gallery" }] : [])
  ]

  return (
    <div className={cn(styles.revealText, "pb-20")}>
      <button type="button" onClick={onBack} className={styles.detailBackButton}>
        <span className={styles.detailBackLine} aria-hidden="true" />
        Back to Index
      </button>

      <header className="mb-8 grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
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

      {project.heroImage ? (
        <div className={styles.heroImageFrame}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className={styles.heroImageFill}
            priority
          />
          <div className={styles.heroImageOverlay} />
          {/* <div className={styles.caseStudyBadge}>Case Study Visualization</div> */}
        </div>
      ) : project.cta ? (
        <a
          href={project.cta.href}
          target="_blank"
          rel="noreferrer"
          className={styles.ctaFrame}
        >
          <div className={styles.caseStudyGradient} />
          <div className={styles.ctaContent}>
            <span className={styles.ctaDescription}>{project.cta.description}</span>
            <span className={styles.ctaLabel}>{project.cta.label} ↗</span>
          </div>
        </a>
      ) : (
        <div className={styles.caseStudyFrame}>
          <div className={styles.caseStudyGradient} />
          <div className={styles.caseStudyLineTop} />
          <div className={styles.caseStudyLineBottom} />
          <div className={styles.caseStudyCircle} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <h3 className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Case Study
            </h3>
            <ul className="space-y-3 text-sm">
              {activeSectionLinks.map((section, index) => (
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

            {project.links?.length ? (
              <div className={styles.tocLinks}>
                <h3 className="mb-4 mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Links
                </h3>
                <ul className="space-y-2 text-sm">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.tocExternalLink}
                      >
                        {link.label}
                        <span className={styles.tocLinkArrow} aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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
                <h4 className={styles.sectionTitle}>By the Build</h4>
                <div className="flex flex-wrap justify-between gap-y-6">
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

          {project.gallery?.length ? (
            <section id="gallery" className="scroll-mt-32">
              <h2 className={styles.sectionTitle}>Gallery</h2>
              <div className={styles.galleryGrid}>
                {project.gallery.map((image) => (
                  <div key={image.src} className={styles.galleryItem}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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
