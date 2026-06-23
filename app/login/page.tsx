import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access Entrofi's free, members-only AI resources.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      {/* soft light wash, consistent with the rest of the site */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_100%_at_50%_0%,var(--wash),transparent)]"
        aria-hidden
      />

      <div className="relative w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to entrofi.io
        </Link>

        <div className="rounded-2xl border border-line bg-surface-1 p-7 shadow-card sm:p-8">
          <div className="mb-6">
            <Logo />
            <h1 className="mt-5 text-h3 font-semibold text-ink">
              Sign in to your resources
            </h1>
            <p className="mt-1.5 text-sm text-ink-muted">
              Free, members-only guides and tools from the Entrofi team.
            </p>
          </div>

          <Suspense
            fallback={<div className="h-72 animate-pulse rounded-xl bg-surface-2" />}
          >
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          By continuing you agree to Entrofi&rsquo;s Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
