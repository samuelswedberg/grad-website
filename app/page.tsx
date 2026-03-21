import Link from "next/link"

import RevolutionHero from "@/components/ui/revolution-hero"

export default function HomePage() {
  return (
    <RevolutionHero
      eyebrow={["Minimizing the friction between a", "brilliant idea and its physical realization"]}
      navLinks={[
        { text: "PROJECTS", href: "/projects", gradient: "linear-gradient(135deg, #ffeedd, #b89a78)" },
        {
          text: "SIM SYSTEM",
          href: "/projects/sim-racing-system",
          gradient:
            "linear-gradient(135deg, #ffe4b5 0%, #ffb347 18%, #ff8c00 50%, #ffb347 78%, #ffe4b5 100%)",
          shimmer: true,
        },
        { text: "ABOUT", href: "/about", gradient: "linear-gradient(135deg, #ffeedd, #b89a78)" },
      ]}
      quoteLines={[
        "Engineer. Creator. Builder.",
        "Jack of all trades, master of the ones that matter",
        "I go wherever curiosity and hard problems take me",
        <>
          Currently building{" "}
          <Link
            href="https://rideforge.app"
            target="_blank"
            rel="noreferrer"
            className="hero-nav-shimmer inline-block bg-[linear-gradient(90deg,_rgb(255_139_26)_0%,_rgb(255_179_71)_100%)] bg-[length:19ch_100%] bg-center bg-clip-text font-semibold text-transparent"
          >
            Forge
          </Link>
          , an indoor cycling app
        </>,
        "Projects, links, and case studies live in the nav.",
      ]}
      siteLabel="samuelswedberg.com"
    />
  )
}
