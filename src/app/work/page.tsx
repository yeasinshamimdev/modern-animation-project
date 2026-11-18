import type { Metadata } from "next";
import { projects, site } from "@/data/site";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { SplitText } from "@/components/Reveal";
import SkillsChart from "@/components/SkillsChart";
import ActivityChart from "@/components/ActivityChart";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description: "Selected projects, skills and activity.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Work</p>
        <h1 className="font-display mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
          <SplitText text="Things I've" delay={0.1} />{" "}
          <SplitText text="built." className="text-gradient" delay={0.3} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            SaaS platforms, internal analytics tools and side projects, built for US teams over
            the last four years. Each card tilts with your cursor, because why not.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Skills · D3</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Where I spend my time
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted">
                A radial bar chart rendered with D3 scales and arcs. Hover a bar to read the
                value. The animation on load is a D3 transition, not CSS.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <MagneticButton href="/about" variant="ghost">
                How I work
              </MagneticButton>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex justify-center">
            <SkillsChart />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Activity · D3</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              A year of shipping
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="glass mt-10 rounded-3xl p-4 sm:p-8">
            <ActivityChart />
          </Reveal>
        </div>
      </section>
    </>
  );
}
