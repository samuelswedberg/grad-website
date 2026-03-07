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
}

const simRacingProject = portfolioProjects[0]

export const projects: ProjectEntry[] = [
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
  {
    id: "forge",
    title: "Forge",
    subtitle: "Indoor Cycling & Training App",
    year: "2026",
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
          <div className={styles.caseStudyBadge}>Case Study Visualization</div>
        </div>
      ) : (
        <div className={styles.caseStudyFrame}>
          <div className={styles.caseStudyGradient} />
          <div className={styles.caseStudyLineTop} />
          <div className={styles.caseStudyLineBottom} />
          <div className={styles.caseStudyCircle} />
          <div className={styles.caseStudyBadge}>Case Study Visualization</div>
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
