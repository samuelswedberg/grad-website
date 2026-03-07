import Link from "next/link"

import RevolutionHero from "@/components/ui/revolution-hero"

export default function HomePage() {
  return (
    <RevolutionHero
      eyebrow={["Minimizing the friction between a", "brilliant idea and its physical realization"]}
      navLinks={[
        { text: "PROJECTS", href: "/projects", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
        {
          text: "SIM SYSTEM",
          href: "/projects/sim-racing-system",
          gradient:
            "linear-gradient(135deg, #f7f3ea 0%, #f3e7cf 18%, #e9c98e 50%, #f1ddba 78%, #fbf7ef 100%)",
          shimmer: true,
        },
        { text: "ABOUT", href: "/about", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
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
            className="hero-nav-shimmer inline-block bg-[linear-gradient(90deg,_rgb(244_114_182)_0%,_rgb(34_211_238)_100%)] bg-[length:19ch_100%] bg-center bg-clip-text font-semibold text-transparent"
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
