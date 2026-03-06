import Image from "next/image"
import Link from "next/link"

import type { Project } from "@/lib/site-data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-6 rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:bg-white/[0.05] md:grid-cols-[220px_1fr]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col justify-between gap-5">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">{project.eyebrow}</p>
          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-display)] text-4xl uppercase tracking-[0.08em] text-white">
              {project.title}
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{project.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
