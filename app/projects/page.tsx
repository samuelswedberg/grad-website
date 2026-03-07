import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Link from "next/link"

import styles from "./projects-page.module.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--projects-font-sans",
  weight: ["300", "400", "600", "800", "900"]
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--projects-font-mono",
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "Projects | Samuel Swedberg",
  description: "A selection of software, hardware, controls, and automation projects."
}

type ProjectShowcaseCard = {
  id: string
  number: string
  category: string
  title: string
  description: string
  stack: string[]
  href?: string
}

const projectCards: ProjectShowcaseCard[] = [
  {
    id: "forge",
    number: "01",
    category: "Desktop App",
    title: "Forge",
    description:
      "Indoor cycling training app with F1 broadcast-style telemetry UI and AI race mode. High-performance rendering engine.",
    stack: ["Rust", "Tauri", "React", "Vite", "PixiJS", "Bluetooth FTMS"]
  },
  {
    id: "line-management-system",
    number: "02",
    category: "Industrial Automation",
    title: "Line Management System",
    description:
      "PackML-compliant production line controller for pharma manufacturing. Handles state machine logic and safety protocols.",
    stack: ["B&R Automation Studio", "Structured Text", "OPC UA", "Python"]
  },
  {
    id: "fargo-audit",
    number: "03",
    category: "Desktop App",
    title: "FargoAudit",
    description:
      "Audit trail desktop app with automated PDF report generation for strict manufacturing compliance standards.",
    stack: ["Python", "SQL Server", "Tkinter", "ReportLab"]
  },
  {
    id: "fanuc-position-parser",
    number: "04",
    category: "Industrial Automation",
    title: "FANUC Position Parser",
    description:
      "Robot position data extraction tool. Uses HTTP scraping to pull coordinates and exports formatted Excel matrices.",
    stack: ["Python", "FANUC Robotics", "HTTP", "Excel"]
  },
  {
    id: "sim-racing-capstone",
    number: "05",
    category: "Embedded Systems",
    title: "Sim Racing Capstone",
    description:
      "Full Logitech sim racing system replica with 3 custom PCBs and CAN bus communication architecture.",
    stack: ["STM32", "CAN Bus", "PCB Design", "Embedded C"],
    href: "/projects/sim-racing-system"
  },
  {
    id: "my-dyson-sphere",
    number: "06",
    category: "Game Dev",
    title: "My Dyson Sphere",
    description:
      "Roblox tycoon and simulator with complex rebirth mechanics, orbital events, and custom UI frameworks.",
    stack: ["Lua", "Roblox Studio", "Rojo", "UI Design"]
  }
]

export default function ProjectsPage() {
  return (
    <div className={`${styles.page} ${inter.variable} ${jetBrainsMono.variable}`}>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span>PROJECTS</span>
          </h1>
          <p className={styles.subtitle}>
            A selection of things I&apos;ve built across software, hardware, and automation.
          </p>
        </header>

        <main className={styles.projectGrid}>
          {projectCards.map((project) => {
            const cta = project.href ? (
              <Link href={project.href} className={styles.viewLink}>
                View Project
              </Link>
            ) : (
              <span className={`${styles.viewLink} ${styles.viewLinkMuted}`} aria-disabled="true">
                View Project
              </span>
            )

            return (
              <article
                key={project.id}
                className={styles.card}
                data-active={project.href ? "true" : "false"}
              >
                <div className={styles.laserLine} aria-hidden="true" />
                <div className={styles.bgNumber} aria-hidden="true">
                  {project.number}
                </div>

                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.cardDescription}>{project.description}</p>
                </div>

                <div className={styles.techStack}>
                  {project.stack.map((item) => (
                    <span key={item} className={styles.pill}>
                      {item}
                    </span>
                  ))}
                </div>

                {cta}
              </article>
            )
          })}
        </main>
      </div>
    </div>
  )
}
