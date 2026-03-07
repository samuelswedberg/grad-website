export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  eyebrow: string
  coverImage: string
  heroImage: string
  status: string
  stack: string[]
  links: ProjectLink[]
  highlights: string[]
  gallery: { src: string; alt: string }[]
  technicalNotes: string[]
}

export const siteLinks = {
  github: "https://github.com/samuelswedberg",
  linkedin: "https://www.linkedin.com/in/samuelswedberg",
}

export const projects: Project[] = [
  {
    slug: "sim-racing-system",
    title: "Sim Racing System",
    summary:
      "A custom steering wheel, wheelbase, and pedal system built for racing simulators, with force feedback, telemetry, and embedded firmware designed from the ground up.",
    eyebrow: "Embedded systems / mechanical design / product engineering",
    coverImage: "/media/sim-wheel.png",
    heroImage: "/media/sdposter.jpg",
    status: "Lead Engineer",
    stack: ["STM32", "FreeRTOS", "CANBUS / USB", "CUSTOM PCB", "CAD", "3D Printing"],
    links: [
      { label: "GitHub", href: "https://github.com/samuelswedberg/sim-wheel" },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=K_I2sCAWH18" },
      { label: "Interview video", href: "https://www.youtube.com/watch?v=8aA3XMMHGLo" },
      {
        label: "Documentation",
        href: "https://github.com/samuelswedberg/sim-wheel/blob/main/docs/OneNote.md"
      }
    ],
    highlights: [
      "Custom-built Formula 1 style steering wheel with live telemetry display",
      "Belt-driven wheelbase tuned for force feedback and responsive control",
      "Distributed embedded system connected over CAN bus",
      "USB game controller support for use with Windows racing titles"
    ],
    gallery: [
      { src: "/media/poster.png", alt: "Senior design expo poster" },
      { src: "/media/sim-wheel.png", alt: "Sim racing system overview" },
      { src: "/media/inside.png", alt: "Sim racing system internal assembly" },
      { src: "/media/pcbwb.png", alt: "Wheelbase PCB" },
      { src: "/media/pcbsw.png", alt: "Steering wheel PCB" },
      { src: "/media/pcbpdl.png", alt: "Pedal PCB" },
      { src: "/media/cad.png", alt: "CAD render" }
    ],
    technicalNotes: [
      "The wheelbase acts as the central hub, handling force feedback, USB communication, and inter-device messaging.",
      "The steering wheel receives telemetry, renders RPM and gear data, and sends user input back over CAN.",
      "The pedals report throttle, brake, and clutch values to the wheelbase for inclusion in the HID report.",
      "A Python bridge on the PC reads Assetto Corsa telemetry from shared memory and forwards useful values to the hardware."
    ]
  }
]

export const focusAreas = [
  "Embedded systems that must feel immediate and reliable in the real world",
  "Hardware and firmware designed as one product, not two disconnected layers",
  "Rapid prototyping through CAD, PCB design, and 3D-printed iteration",
  "Interfaces that make physical systems easier to understand and control"
]

export const tools = [
  "STM32",
  "ESP32",
  "C / C++",
  "FreeRTOS",
  "Fusion 360",
  "KiCad",
  "3D Printing",
  "Embedded debugging"
]
