import Link from "next/link";
import { site, projects } from "@/data/site";
import MagneticButton from "@/components/MagneticButton";
import Reveal, { SplitText } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Marquee from "@/components/Marquee";
import HeroClient from "@/components/HeroClient";

export default function Home() {
  return (
    <>
      <HeroClient />

      <Marquee />

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">About</p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                I turn messy requirements into{" "}
                <span className="text-gradient">products people enjoy using</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Full-stack web engineer with 4+ years of experience building React, Next.js and
                TypeScript products for US companies, including two-plus years at Beast
                Industries. I own features from database queries to production deployment, care
                about the details that make an interface feel alive, and use AI coding tools
                daily to ship faster.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <MagneticButton href="/about" variant="ghost">
                More about me
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-10 flex items-end justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Selected work</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Featured projects
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden sm:block">
            <Link href="/work" className="group font-mono text-sm text-muted hover:text-fg">
              View all <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{site.location}</p>
          </Reveal>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-tight sm:text-7xl">
            <SplitText text="Let's build something" delay={0.1} />
            <br />
            <SplitText text="worth remembering." className="text-gradient" delay={0.3} />
          </h2>
          <Reveal delay={0.4} className="mt-10">
            <MagneticButton href={`mailto:${site.email}`}>{site.email}</MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
