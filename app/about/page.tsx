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
    title: "Automation Programmer",
    company: "Körber Pharma",
    location: "Fargo, North Dakota, United States · On-site",
    type: "Full-time",
    years: "Jun 2025 - Present",
    description:
      "Working on industrial automation systems in a pharmaceutical manufacturing environment with an emphasis on programmable logic controller programming, system integration, and reliable plant-floor execution."
  },
  {
    title: "Electrical Engineering Intern",
    company: "Körber Pharma",
    location: "Fargo, North Dakota, United States · On-site",
    type: "Internship",
    years: "May 2024 - May 2025",
    description:
      "Developed and maintained internal software tools while supporting automation and electrical engineering work across active manufacturing lines, gaining hands-on experience with production systems and plant-floor operations."
  },
  {
    title: "Service Shop Technician",
    company: "Scheels",
    location: "Moorhead, Minnesota, United States · On-site",
    type: "Part-time",
    years: "Jul 2021 - Apr 2025",
    description:
      "Performed expert-level maintenance, repair, and assembly across all major sporting goods categories — bicycles, skis, snowboards, hockey, baseball, golf, and racquet sports — while serving as a senior shop technician training and mentoring new hires on shop procedures and equipment standards."
  }
]

const education = {
  school: "North Dakota State University",
  degree: "Bachelor of Science in Computer Engineering",
  years: "Aug 2021 - May 2025",
  detail: "Grounded in embedded systems, low-level programming, electronics, digital signal processing, and full-stack engineering — with focused coursework in computer architecture, control systems, VLSI design, hardware for machine learning, and a 9-month capstone replicating a commercial sim racing system using STM32 microcontrollers, CAN bus, and custom PCB design."
}

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
          <span className={styles.wordMarkSubtitle}>Engineer. Creator. Builder.</span>
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
                src="/media/upscaledlinkedin.png"
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
              {experience.map((item, index) => (
                <div key={`${item.company}-${item.title}`} className={styles.timelineItem}>
                  <div
                    className={`${styles.gradientDot} ${index === 0 ? styles.featuredGradientDot : ""}`}
                    aria-hidden="true"
                  />
                  <div className={styles.timelineHeader}>
                    <div className={styles.timelineHeadingBlock}>
                      <h4 className={index === 0 ? styles.featuredTimelineTitle : ""}>{item.title}</h4>
                      <p className={styles.timelineCompany}>{item.company}</p>
                    </div>
                    <span>{item.years}</span>
                  </div>
                  <p className={styles.timelineMeta}>
                    {item.type} · {item.location}
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className={styles.focusAreaBlock}>
              <h3 className={styles.sectionLabel}>Education</h3>
              <div className={styles.educationCard}>
                <h4>{education.school}</h4>
                <p className={styles.educationDegree}>{education.degree}</p>
                <p className={styles.educationYears}>{education.years}</p>
                <p className={styles.educationDetail}>{education.detail}</p>
              </div>
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
