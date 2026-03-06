import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/site-data"

export default function ProjectsPage() {
  return (
    <div className="page-shell content-rail space-y-10 pb-20">
      <section className="panel rounded-[2.25rem] p-8 md:p-12">
        <p className="section-kicker">Projects</p>
        <h1 className="section-title mt-4 max-w-4xl">Hardware, firmware, and systems design with tangible outcomes.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
          This portfolio is intentionally selective. I would rather show a smaller number of projects with real depth
          than pad the page with generic mock work.
        </p>
      </section>

      <section className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}

        <div className="rounded-[2rem] border border-dashed border-white/10 px-6 py-8 text-sm leading-7 text-[var(--color-muted)]">
          More work is in progress. Upcoming additions will likely include game development experiments and more embedded
          systems case studies once they are ready to show.
        </div>
      </section>
    </div>
  )
}
