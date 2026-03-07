import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ProjectsExperience } from "@/components/projects-experience"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "900"]
})

export const metadata: Metadata = {
  title: "Projects | Samuel Swedberg",
  description: "Selected engineering work across simulation, software, and product development."
}

export default function ProjectsPage() {
  return (
    <div className={inter.className}>
      <ProjectsExperience />
    </div>
  )
}
