import type { Metadata } from "next";
import { site, timeline } from "@/data/site";
import Reveal, { SplitText } from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: "Background, experience and how to get in touch.",
};

const principles = [
  { t: "Motion with intent", d: "Animation should explain, orient or delight. Never decorate for its own sake." },
  { t: "Data is a story", d: "A chart is an argument. I design visualizations the way I design copy." },
  { t: "Fast by default", d: "Performance budgets, lazy 3D, and measuring before optimising." },
  { t: "Own it end to end", d: "Schema to pixel to deploy. I like being accountable for the whole thing." },
  { t: "AI as a multiplier", d: "I use AI coding tools daily to move faster, and I review every line they produce." },
  { t: "Ship, then refine", d: "Production is the best feedback loop. Get it live, watch it, improve it." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">About</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl font-bold leading-[1] tracking-tight sm:text-7xl">
          <SplitText text="Hi, I'm" delay={0.1} />{" "}
          <SplitText text={site.name + "."} className="text-gradient" delay={0.25} />
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.3} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-muted">
              I&apos;m a {site.role.toLowerCase()} with 4+ years of experience building React,
              Next.js and TypeScript products for US companies, including two-plus years at
              Beast Industries building analytics dashboards and internal tools. Before that I
              co-led the front end of a print-on-demand platform at Everlab, shipping Shopify
              and Stripe integrations.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              I own features end to end, from PostgreSQL queries and REST APIs to polished,
              animated front ends deployed on Vercel. I work best with small, ambitious teams
              that care about craft. If that sounds like you, I&apos;d love to hear what
              you&apos;re building.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="md:col-span-5">
            <dl className="glass grid grid-cols-2 gap-6 rounded-3xl p-6 font-mono text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Based</dt>
                <dd className="mt-1">{site.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Role</dt>
                <dd className="mt-1">{site.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Focus</dt>
                <dd className="mt-1">React · Node · Postgres</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">Status</dt>
                <dd className="mt-1 text-accent-2">Open to work</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Principles</p>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.08} className="group bg-bg p-8 transition-colors hover:bg-bg-elev">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="font-display mt-3 text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Experience</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              The path so far
            </h2>
          </Reveal>
          <Timeline items={timeline} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-28 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Contact</p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Say hello.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              I reply to every message. Email is best, but the socials work too.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <MagneticButton href={`mailto:${site.email}`}>{site.email}</MagneticButton>
            <ul className="flex gap-5 font-mono text-sm text-muted">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
