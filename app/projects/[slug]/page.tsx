"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { siteLinks } from "@/lib/site-data"
import { projects, ProjectDetail } from "@/components/projects-experience"
import styles from "@/app/projects/projects-page.module.css"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const projectIndex = projects.findIndex((p) => p.id === slug)
  const project = projects[projectIndex]

  if (!project) return null

  const nextProject = projects[(projectIndex + 1) % projects.length]

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
        <ProjectDetail
          project={project}
          onBack={() => router.push("/projects")}
          onNext={() => router.push(`/projects/${nextProject.id}`)}
        />
      </main>
    </div>
  )
}
