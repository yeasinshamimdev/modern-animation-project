"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { site } from "@/data/site";
import MagneticButton from "./MagneticButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5 ${
            scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "border border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-fg text-bg">
              <span className="font-display text-sm font-800 transition-transform duration-500 group-hover:-translate-y-full">
                {site.name[0]}
              </span>
              <span className="absolute font-display text-sm font-800 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                ✦
              </span>
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              {site.name.split(" ")[0]}
              <span className="text-muted">.dev</span>
            </span>
          </Link>

          <ul className="relative hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${
                      active ? "text-bg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href={`mailto:${site.email}`} small>
              Let&apos;s talk
            </MagneticButton>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center rounded-full glass md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute h-[2px] w-5 bg-fg"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute h-[2px] w-5 bg-fg"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display block py-3 text-5xl font-bold tracking-tight"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={`mailto:${site.email}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-mono text-sm text-muted"
            >
              {site.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
