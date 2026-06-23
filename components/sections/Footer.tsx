import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-1/40">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-ink-muted">{footer.blurb}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-ink transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-eyebrow font-medium uppercase text-ink-faint">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-faint">
            © {new Date().getFullYear()} {site.name}. {site.tagline}
          </p>
          <div className="flex gap-6">
            {footer.legal.map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm text-ink-faint transition-colors hover:text-ink"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
