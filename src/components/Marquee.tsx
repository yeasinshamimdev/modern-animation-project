const items = ["Next.js", "React", "TypeScript", "Three.js", "D3.js", "Framer Motion", "Node", "PostgreSQL", "Tailwind", "WebGL"];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="marquee flex w-max gap-10">
        {row.map((it, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-2xl font-semibold tracking-tight text-muted/70">
            {it}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
