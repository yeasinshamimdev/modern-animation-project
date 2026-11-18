"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href: string;
  small?: boolean;
  variant?: "solid" | "ghost";
};

export default function MagneticButton({ children, href, small, variant = "solid" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-medium transition-colors ${
    small ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
  } ${
    variant === "solid"
      ? "bg-fg text-bg"
      : "border border-line text-fg hover:border-fg/40"
  }`;

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          ↗
        </span>
      </span>
      {variant === "solid" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-out group-hover:translate-x-0" />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {external ? (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
