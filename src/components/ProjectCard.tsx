"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { MouseEvent } from "react";
import type { Project } from "@/data/site";

export default function ProjectCard({
  p,
  index,
}: {
  p: Project;
  index: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, ${p.accent}26, transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const Wrapper = p.href ? "a" : "div";
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, backgroundImage: spotlight }}
        className="card-tilt group relative h-full overflow-hidden rounded-3xl border border-line bg-bg-elev transition-colors hover:border-white/20"
        data-cursor
      >
        <Wrapper
          {...(p.href
            ? { href: p.href, target: "_blank", rel: "noreferrer" }
            : {})}
          className="relative flex h-full flex-col justify-between p-7"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: p.accent }}
          />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted">
              <span>
                {String(index + 1).padStart(2, "0")} / {p.category}
              </span>
              <span>{p.year}</span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {p.summary}
            </p>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-white/20 group-hover:text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:bg-fg group-hover:text-bg">
              {p.href ? "↗" : "·"}
            </span>
          </div>
        </Wrapper>
      </motion.div>
    </motion.article>
  );
}
