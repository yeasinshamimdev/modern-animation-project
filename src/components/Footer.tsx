import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} · Built with Next.js, Three.js, D3 &amp; Framer Motion
          </p>
        </div>
        <ul className="flex gap-6 text-sm">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-fg">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
