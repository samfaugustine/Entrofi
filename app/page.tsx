import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { SystemPreview } from "@/components/sections/SystemPreview";
import { Process } from "@/components/sections/Process";
import { Deliverables } from "@/components/sections/Deliverables";
import { UseCases } from "@/components/sections/UseCases";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <System />
        <SystemPreview />
        <Process />
        <Deliverables />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
