import type { Metadata } from "next";
import { LineReveal, RiseIn } from "@/components/motion/Reveal";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { CtaBlock, GoldItalic } from "@/components/sections/CtaBlock";
import { Label } from "@/components/ui/Button";
import { pad, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected residences by Designs by Pendie, shown before and after: salons, kitchens, suites, libraries and baths.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-[clamp(4.5rem,9vw,8.75rem)] pb-36">
        <div className="container-lux flex flex-col gap-10">
          <RiseIn delay={0.1}><Label rule>Portfolio · {pad(projects.length)} Residences</Label></RiseIn>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <LineReveal className="display-1" lines={["Selected", <GoldItalic key="w">works.</GoldItalic>]} />
            <RiseIn delay={0.6}>
              <p className="prose-lux max-w-[420px]">
                Each residence begins as something ordinary. Draw the line across any image to reveal what it became.
              </p>
            </RiseIn>
          </div>
          <RiseIn delay={0.8}>
            <PortfolioExplorer />
          </RiseIn>
        </div>
      </section>

      <CtaBlock
        title={<>Imagine <GoldItalic>yours</GoldItalic> here.</>}
        description="Every residence on this page began with a single private conversation. Let us begin yours."
        cta="Commission the Studio"
        image="/images/kitchen-after.jpg"
      />
    </>
  );
}
