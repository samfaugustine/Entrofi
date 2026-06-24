import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Entrofi pricing — from a single installed AI workflow to per-seat systems for your whole team, plus a high-ticket website revamp and custom enterprise scope.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
