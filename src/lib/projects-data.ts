import { projects as portfolioProjects } from "./site-data"

type ProjectMetric = {
  value: string
  label: string
}

export type ProjectEntry = {
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
  cta?: { label: string; href: string; description: string }
}

const simRacingProject = portfolioProjects[0]

export const projects: ProjectEntry[] = [
  {
    id: "goodevening",
    title: "GoodEvening.tv",
    subtitle: "Browser-based teleprompter",
    year: "2026",
    role: "Founder",
    tags: ["TypeScript", "Web Audio API", "REST API", "Offline-First"],
    description:
      "A browser-based teleprompter with voice-synced scrolling, phone remote control, and no install required. Built for creators who got tired of desktop apps crashing mid-take.",
    overview:
      "GoodEvening.tv is a teleprompter that runs entirely in the browser — no downloads, no GPU requirements, no \"Getting Ready\" spinners. Paste a script, hit start, and the prompter follows your voice. It works on any screen, stores scripts locally, and connects to a phone remote via QR code.",
    challenge: [
      "Existing teleprompter software is either overbuilt desktop apps that crash at the worst possible moment, or flimsy web tools with laggy scrolling and no real features. Creators recording video need something that just works — reliably, on any device, with zero setup friction.",
      "The other gap is control. Most prompters require a second person or a dedicated hardware remote. Content creators working solo need a way to control the prompter from their phone without installing another app or pairing a Bluetooth device."
    ],
    solution: [
      "The prompter runs entirely in the browser with an offline-first architecture — scripts are stored locally with no cloud dependency. The editor preserves formatting from Google Docs pastes, so creators can write where they're comfortable and prompt where they need to.",
      "Voice sync uses the Web Audio API to follow speaking pace in real time: the script scrolls when you talk and pauses when you pause. No calibration, no training step. Full-screen mode includes a focus line, smooth scrolling, and mirror mode for beam-splitter teleprompter hardware.",
      "Phone remote control works through a QR code — scan it from any smartphone browser and you have play/pause/speed controls with no app install. For studio setups, a REST API enables Stream Deck integration and programmatic control."
    ],
    outcome: [
      "Live and in use by content creators, educators, and corporate video producers. The 30-second setup time and zero-install requirement eliminate the friction that makes other tools unreliable in production environments.",
      "Pro tier adds cloud sync with real-time script synchronization across devices and version history, while the free tier includes the full editor, voice sync, and phone remote — no feature gating on the core experience."
    ],
    cta: {
      label: "goodevening.tv",
      href: "https://goodevening.tv",
      description: "Try it free — no account required."
    },
    bullets: [
      "Voice-synced scrolling — follows your speaking pace, pauses when you pause.",
      "Phone remote via QR code — no app install, works in any mobile browser.",
      "Offline-first — scripts stored locally, no cloud dependency.",
      "Mirror mode for beam-splitter teleprompter hardware.",
      "REST API and Stream Deck integration for studio automation.",
      "30-second setup, zero install, works on any screen."
    ]
  },
  // {
  //   id: "forge",
  //   title: "Forge",
  //   subtitle: "Indoor cycling race simulator",
  //   year: "2026",
  //   role: "Founder",
  //   tags: ["Rust", "Tauri", "Bluetooth LE", "TypeScript"],
  //   description:
  //     "Sim racing for cycling. An indoor race simulator with a broadcast telemetry UI, AI opponents with dynamic race strategy, and a one-time purchase model in a market built on subscriptions.",
  //   overview:
  //     "The last cycling app you'll ever buy. Forge is an indoor cycling race simulator that replaces the 3D virtual world with a broadcast-style race telemetry interface — lightweight, data-dense, and built for cyclists who care more about the competition than the scenery.",
  //   challenge: [
  //     "3D virtual worlds don't drive engagement — riders in every major cycling app watch Netflix on a second screen. The visuals aren't the hook. The competition is. But no app has fully committed to that premise: building a sim racing experience for cycling where the physics, the opponents, and the data are the product.",
  //     "The market is also broken by economics. Every serious tool charges $18–20 per month indefinitely — whether you race online or not, whether you use the social features or not, whether you even ride that month or not. The result is that cyclists either overpay for features they don't use, or churn off entirely. There was no product that charged you only for what you actually needed."
  //   ],
  //   solution: [
  //     "Forge's core is a physics-accurate race simulation engine written in Rust, running entirely locally with no server dependency. Races support 50–200 AI opponents, each with distinct personality profiles — attackers, climbers, wheel-suckers — that make strategic decisions in real time: surges, drafts, and late-race attacks.",
  //     "The interface is a broadcast-style race telemetry overlay, not a 3D world. Power, cadence, gap to front, sector splits, and live positional data are all surfaced in a high-contrast, low-latency UI built with Tauri. The app connects to any FTMS-enabled smart trainer over Bluetooth LE, reading power and cadence while broadcasting resistance targets in real time.",
  //     "Multiplayer supports up to 200 riders with proximity culling and group summarization to keep the simulation tractable. AI backfill ensures races always feel full — even at 3 AM or during early growth. Online infrastructure has real costs, so multiplayer and live AI matchmaking are gated behind Forge Pro, an optional subscription. If you never want to race online, you never pay monthly — full offline racing is yours with a single purchase, forever."
  //   ],
  //   outcome: [
  //     "Currently in active development. The simulation engine, BLE trainer integration, and telemetry UI are the current focus before expanding to multiplayer infrastructure.",
  //     "The model is built around paying for what you use. The core app is a one-time purchase — full offline racing, AI opponents, and all local features included. Forge Pro is an optional subscription that unlocks online multiplayer and live AI matchmaking, the only features that require running infrastructure. Unlike every competitor, if you don't want online racing, you don't pay monthly. Ever."
  //   ],
  //   cta: {
  //     label: "rideforge.app",
  //     href: "https://rideforge.app",
  //     description: "Currently in development — follow along."
  //   },
  //   bullets: [
  //     "AI opponents with dynamic race strategy — surges, attacks, drafting — not pace bots.",
  //     "Broadcast-style race telemetry UI: data-dense, GPU-free, visually striking.",
  //     "Full offline racing with one-time purchase — no subscription required.",
  //     "Forge Pro optional subscription for online multiplayer and live AI matchmaking only.",
  //     "Multiplayer with AI backfill so races always feel full.",
  //     "Pay for what you use — offline racing is one-time, online is opt-in."
  //   ]
  // },
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
]

export const sectionLinks = [
  { id: "overview", label: "01. Overview" },
  { id: "challenge", label: "02. The Challenge" },
  { id: "solution", label: "03. Solution" },
  { id: "outcome", label: "04. Outcome" }
]
