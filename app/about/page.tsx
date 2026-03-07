import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { focusAreas, siteLinks, tools } from "@/lib/site-data"

import styles from "./about-page.module.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "900"]
})

export const metadata: Metadata = {
  title: "About | Samuel Swedberg",
  description: "Background, focus areas, and engineering interests."
}

const experience = [
  {
    title: "Independent Product Builder",
    years: "CURRENT",
    description:
      "Building product concepts like Forge while focusing on interfaces, telemetry, and systems that make physical hardware feel immediate and alive."
  },
  {
    title: "Industrial Automation",
    years: "RECENT WORK",
    description:
      "Developed manufacturing software, audit tooling, robotics utilities, and controls-oriented systems where reliability matters more than presentation alone."
  },
  {
    title: "Computer Engineering",
    years: "FOUNDATION",
    description:
      "Graduated from North Dakota State University with a focus on embedded systems, rapid prototyping, PCB design, and full-stack problem solving across hardware and software."
  }
]

const tickerTools = [...tools, "React", "Rust", ...tools, "React", "Rust"]

export default function AboutPage() {
  return (
    <div className={`${inter.className} ${styles.page}`}>
      <div className={styles.noiseOverlay} aria-hidden="true" />
      <div className={styles.fluidBg} aria-hidden="true">
        <div className={`${styles.fluidBlob} ${styles.blob1}`} />
        <div className={`${styles.fluidBlob} ${styles.blob2}`} />
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.wordMark}>
          <h1 className={styles.wordMarkTitle}>Samuel Swedberg</h1>
          <span className={styles.wordMarkSubtitle}>Engineer Creator</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>
          <Link href="/about" className={`${styles.navLink} ${styles.activeNavLink}`}>
            About
          </Link>
          <Link href={siteLinks.linkedin} className={styles.navLink} target="_blank" rel="noreferrer">
            Contact
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={`${styles.heroSection} ${styles.reveal}`}>
          <div className={styles.portraitColumn}>
            <div className={styles.portraitFrame}>
              <Image
                src="/media/linkedin.jpg"
                alt="Samuel Swedberg portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={100}
                unoptimized
                className={styles.portraitImage}
                priority
              />
            </div>
          </div>

          <div className={styles.copyColumn}>
            <h2 className={styles.heroTitle}>
              Engineer.
              <br />
              Creator.
              <br />
              <span>Builder.</span>
            </h2>

            <div className={styles.heroCopy}>
              <p>
                I specialize in the gray area between design and deep engineering. Most of my work
                lives where embedded systems, software, and product thinking have to cooperate to
                produce something usable in the real world.
              </p>
              <p className={styles.heroQuote}>
                "Engineering is the art of organizing and directing people and controlling the
                forces and materials of nature for the benefit of humanity."
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.experienceSection} ${styles.revealDelayed}`}>
          <div className={styles.experienceLabelColumn}>
            <h3 className={styles.sectionLabel}>Experience</h3>
          </div>

          <div className={styles.experienceContentColumn}>
            <div className={styles.timeline}>
              {experience.map((item) => (
                <div key={item.title} className={styles.timelineItem}>
                  <div className={styles.gradientDot} aria-hidden="true" />
                  <div className={styles.timelineHeader}>
                    <h4>{item.title}</h4>
                    <span>{item.years}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className={styles.focusAreaBlock}>
              <h3 className={styles.sectionLabel}>Focus Areas</h3>
              <ul className={styles.focusAreaList}>
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.tickerSection}>
          <div className={styles.tickerWrapper}>
            <div className={styles.tickerTrack}>
              {tickerTools.map((tool, index) => (
                <span key={`${tool}-${index}`} className={styles.tickerItem}>
                  {tool}
                </span>
              ))}
            </div>

            <div className={styles.tickerTrack} aria-hidden="true">
              {tickerTools.map((tool, index) => (
                <span key={`${tool}-clone-${index}`} className={styles.tickerItem}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>2024 Samuel Swedberg</span>
          <div className={styles.footerLinks}>
            <Link href={siteLinks.github} target="_blank" rel="noreferrer">
              GitHub
            </Link>
            <Link href={siteLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </Link>
            <Link href="/projects">Projects</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
