import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { projects } from "@/lib/site-data"

const project = projects[0]
const [leadGalleryImage, ...galleryImages] = project.gallery

export default function SimRacingSystemPage() {
  return (
    <div className="page-shell content-rail space-y-8 pb-20">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-[2.25rem] p-8 md:p-12">
          <p className="section-kicker">{project.eyebrow}</p>
          <h1 className="section-title mt-4 max-w-4xl">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[2.25rem] border border-white/8 bg-black/20">
          <Image src={project.heroImage} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">Key features</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="border-l border-[var(--color-accent)]/40 pl-4">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[2rem] p-8">
          <p className="section-kicker">Links</p>
          <div className="mt-6 grid gap-4">
            {project.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-[var(--color-accent)] hover:bg-black/30"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="panel rounded-[2rem] p-8">
        <p className="section-kicker">Technical overview</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {project.technicalNotes.map((note) => (
            <p key={note} className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5 text-sm leading-7 text-[var(--color-muted)]">
              {note}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/10] md:aspect-[16/9]">
            <Image
              src={leadGalleryImage.src}
              alt={leadGalleryImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {galleryImages.map((image) => (
          <div key={image.src} className="overflow-hidden rounded-[1.75rem]">
            <div className="relative aspect-[4/3]">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          ))}
        </div>
      </section>
    </div>
  )
}
