import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment confirmed",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[72vh] items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-grad text-white shadow-glow">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-h2 font-semibold text-ink">You&rsquo;re all set.</h1>
          <p className="mt-3 text-ink-muted">
            Payment confirmed and your receipt is on its way by email. Your
            Entrofi onboarding starts now — head to your members area for the
            next steps.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/resources">Go to your resources</Button>
            <Button href="/" variant="secondary">
              Back home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
