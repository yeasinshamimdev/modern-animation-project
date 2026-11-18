"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import MagneticButton from "./MagneticButton";
import { SplitText } from "./Reveal";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-accent/30 blur-3xl" />
    </div>
  ),
});

export default function HeroClient() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Hero3D />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_90%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
          </span>
          Available for new opportunities
        </motion.div>

        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          <SplitText text={site.role} delay={0.3} />
          <br />
          <SplitText text="who ships with" className="text-muted" delay={0.5} />{" "}
          <SplitText text="motion." className="text-gradient" delay={0.7} />
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex gap-3"
          >
            <MagneticButton href="/work">See my work</MagneticButton>
            <MagneticButton href="/about" variant="ghost">
              About
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
        >
          scroll
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-6 w-[1px] bg-muted"
          />
        </motion.div>
      </div>
    </section>
  );
}
