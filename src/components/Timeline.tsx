"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

type Item = { period: string; title: string; org: string; text: string };

export default function Timeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <ol ref={ref} className="relative mt-12 space-y-12 pl-8">
      <span className="absolute left-[7px] top-0 h-full w-px bg-line" />
      <motion.span
        style={{ scaleY }}
        className="absolute left-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent-2"
      />
      {items.map((it, i) => (
        <motion.li
          key={it.title}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span className="absolute -left-8 top-1.5 grid h-[15px] w-[15px] place-items-center">
            <span className="h-2 w-2 rounded-full bg-fg shadow-[0_0_0_4px_var(--bg)]" />
          </span>
          <p className="font-mono text-xs text-accent-2">{it.period}</p>
          <h3 className="font-display mt-2 text-2xl font-semibold">{it.title}</h3>
          <p className="text-sm text-muted">{it.org}</p>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{it.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
