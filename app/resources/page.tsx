import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/server";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free, members-only AI resources from Entrofi.",
  robots: { index: false, follow: false },
};

export default async function ResourcesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth — middleware already gates this, but never trust one layer.
  if (!user) redirect("/login?next=/resources");

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(60%_100%_at_50%_0%,var(--wash),transparent)]"
        aria-hidden
      />

      {/* top bar */}
      <header className="relative border-b border-line">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Entrofi home">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ink-muted sm:inline">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container relative py-16 sm:py-20">
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent/60" aria-hidden />
          {resources.eyebrow}
        </span>
        <h1 className="mt-4 text-h2 font-semibold text-ink">{resources.heading}</h1>
        <p className="mt-3 max-w-2xl text-lead text-ink-muted">{resources.sub}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.items.map((r) => (
            <Link
              key={r.slug}
              href={r.href}
              className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface-1 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-ink">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted">
                  {r.tag}
                </span>
              </div>
              <h2 className="mt-5 text-h3 font-semibold text-ink">{r.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{r.blurb}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs text-ink-faint">{r.meta}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
