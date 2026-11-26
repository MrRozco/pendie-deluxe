import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Hero } from "@/components/home/Hero";
import { DrawLine, LineReveal, Reveal, Stagger, StaggerItem, Unveil } from "@/components/motion/Reveal";
import { CtaBlock, GoldItalic } from "@/components/sections/CtaBlock";
import { Marquee } from "@/components/sections/Marquee";
import { Label, TextLink } from "@/components/ui/Button";
import { ArrowLong } from "@/components/ui/icons";
import { getProject } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  { n: "I", title: "Full-Service Interior Design", text: "From the first sketch to the final cushion: spatial planning, materials, lighting, joinery and furnishings, orchestrated as one." },
  { n: "II", title: "Architectural Renovation", text: "Kitchens, baths and full reconfigurations, detailed to the millimetre and delivered alongside your architect and builder." },
  { n: "III", title: "Furnishing & Art Curation", text: "Bespoke and collectible pieces sourced from ateliers, galleries and trade-only showrooms around the world." },
  { n: "IV", title: "Installation & Styling", text: "A white-glove installation. Every object placed, every lamp lit, so you arrive to a home that is complete." },
];

const steps = [
  { n: "I", title: "Discovery", text: "A private conversation about how you live, what you collect and how you wish to feel at home." },
  { n: "II", title: "Concept", text: "A design narrative: plans, palettes, materials and mood, presented in person." },
  { n: "III", title: "Refinement", text: "Detailed drawings, bespoke specifications and a curated furniture and art programme." },
  { n: "IV", title: "Realisation", text: "Procurement, site oversight and a white-glove installation, down to the final flower." },
];

const works = [
  { id: "noir-kitchen", n: "01", meta: "Kitchen", className: "sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[380px] sm:h-[520px] lg:h-auto" },
  { id: "primary-suite", n: "02", meta: "Bedroom", className: "h-[380px] sm:h-[420px] lg:h-auto" },
  { id: "the-library", n: "03", meta: "Study", className: "h-[380px] sm:h-[420px] lg:h-auto" },
];

export default function HomePage() {
  const featured = getProject("penthouse-salon")!;

  return (
    <>
      <Hero />
      <Marquee />

      {/* Studio */}
      <section className="section">
        <div className="container-lux">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Reveal className="flex flex-col gap-4">
              <Label rule>The Studio</Label>
              <span className="font-serif text-sm text-ash italic">Est. {site.established}</span>
            </Reveal>
            <div className="flex flex-col gap-10">
              <Reveal>
                <p className="font-serif text-[clamp(1.9rem,3.3vw,3.1rem)] leading-[1.22] tracking-[-0.01em]">
                  Designs by Pendie creates residences of <GoldItalic>rare composure</GoldItalic>: rooms where every line
                  is considered, every material earns its place, and nothing competes for attention.
                </p>
              </Reveal>
              <Reveal delay={0.1}><TextLink href="/about">Meet Pendie</TextLink></Reveal>
            </div>
          </div>
          <Stagger className="mt-18 grid border-t border-ivory/12 sm:grid-cols-3">
            {["Residences completed", "Years of practice", "Cities"].map((label, i) => (
              <StaggerItem
                key={label}
                className={cn(
                  "flex flex-col gap-2.5 pt-8",
                  i > 0 && "mt-7 border-t border-ivory/12 sm:mt-0 sm:border-t-0 sm:border-l sm:pl-8",
                )}
              >
                <span className="font-serif text-[64px] leading-none">[X]</span>
                <span className="label !text-ash">{label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Transformation */}
      <section className="section border-y border-ivory/6 bg-noir-2">
        <div className="container-lux flex flex-col gap-16">
          <div className="flex flex-col items-center gap-7 text-center">
            <Reveal><Label>The Transformation</Label></Reveal>
            <LineReveal
              as="h2"
              inView
              className="display-2"
              lines={["From ordinary", <>to <GoldItalic>extraordinary.</GoldItalic></>]}
            />
          </div>
          <Reveal>
            <BeforeAfter before={featured.before} after={featured.after} label="Drag to compare the salon before and after" />
            <div className="flex flex-wrap justify-between gap-4 pt-6">
              <span className="flex items-baseline gap-4">
                <span className="font-serif text-[26px]">{featured.title}</span>
                <span className="label !text-ash">{featured.location}</span>
              </span>
              <span className="label !text-ash">Drag to reveal</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-lux flex flex-col gap-18">
          <Reveal className="flex flex-wrap items-end justify-between gap-7">
            <div className="flex flex-col gap-7">
              <Label rule>Services</Label>
              <h2 className="display-2">A complete <GoldItalic>atelier</GoldItalic><br />service.</h2>
            </div>
            <p className="prose-lux max-w-[400px]">One studio, one vision, from the bones of the architecture to the last object on the shelf.</p>
          </Reveal>
          <div className="border-b border-ivory/12">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <Link
                  href="/contact"
                  className="group relative grid grid-cols-[44px_1fr] items-center gap-x-5 gap-y-3 border-t border-ivory/12 py-8 transition-[padding] duration-600 ease-lux md:grid-cols-[60px_1fr_40px] lg:grid-cols-[90px_1.1fr_1fr_60px] lg:gap-10 lg:py-11 lg:hover:pl-5"
                >
                  <span className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-800 ease-sweep group-hover:scale-x-100" />
                  <span className="font-serif text-[22px] text-gold italic">{s.n}</span>
                  <span className="font-serif text-[clamp(1.75rem,2.8vw,2.6rem)] leading-[1.1] transition-colors duration-400 group-hover:text-gold-light">
                    {s.title}
                  </span>
                  <span className="col-start-2 text-[15px] leading-[1.8] text-stone lg:col-start-auto">{s.text}</span>
                  <ArrowLong className="hidden justify-self-end text-gold transition-transform duration-500 ease-lux group-hover:translate-x-2.5 md:block md:col-start-3 md:row-start-1 lg:col-start-auto" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected works */}
      <section className="section !pt-0">
        <div className="container-lux flex flex-col gap-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-7">
              <Label rule>Portfolio</Label>
              <h2 className="display-2">Selected <GoldItalic>works.</GoldItalic></h2>
            </div>
            <TextLink href="/portfolio">All projects</TextLink>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-[440px_440px]">
            {works.map((w, i) => {
              const p = getProject(w.id)!;
              return (
                <Reveal key={w.id} delay={i * 0.1} className={cn("flex min-h-0 flex-col", w.className)}>
                  <Link href="/portfolio" aria-label={p.title} className="group flex min-h-0 flex-1 flex-col">
                    <Unveil className="relative min-h-0 flex-1 overflow-hidden">
                      <Image
                        src={p.after.src}
                        alt={p.after.alt}
                        fill
                        sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1800ms] ease-lux group-hover:scale-106"
                      />
                    </Unveil>
                    <span className="flex items-baseline justify-between gap-4 pt-5">
                      <span className="flex items-baseline gap-4">
                        <span className="font-serif text-sm text-gold italic">{w.n}</span>
                        <span className="font-serif text-[26px]">{p.title}</span>
                      </span>
                      <span className="text-[11px] tracking-[0.28em] text-ash uppercase">{w.meta} · {p.location}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-ivory/6 bg-noir-2">
        <div className="container-lux flex flex-col gap-18">
          <Reveal className="flex max-w-[760px] flex-col gap-7">
            <Label rule>The Process</Label>
            <h2 className="display-2">Unhurried. Precise.<br /><GoldItalic>Entirely</GoldItalic> personal.</h2>
          </Reveal>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="flex flex-col gap-5">
                <DrawLine delay={i * 0.12} />
                <span className="font-serif text-[54px] leading-none text-gold italic">{s.n}</span>
                <h3 className="font-serif text-[30px] leading-tight">{s.title}</h3>
                <p className="text-[15px] leading-[1.85] text-stone">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press (placeholders) */}
      <section className="border-y border-ivory/6 py-20">
        <div className="container-lux flex flex-col items-center gap-10">
          <Label className="!text-ash">As featured in</Label>
          <Stagger className="grid w-full grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StaggerItem key={i} className="text-center font-serif text-[clamp(1.25rem,2vw,1.75rem)] text-ash italic">
                [Publication]
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonial (replace with a real client quote) */}
      <section className="relative overflow-hidden py-[clamp(7.5rem,14vw,12.5rem)]">
        <Image src="/images/dining-after.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-35" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,9,0.55)_0%,#0a0a09_85%)]" />
        <Reveal className="container-lux relative">
          <figure className="flex flex-col items-center gap-10 text-center">
            <span aria-hidden className="font-serif text-[120px] leading-[0.5] text-gold">“</span>
            <blockquote className="max-w-[980px] font-serif text-[clamp(1.75rem,3.4vw,3.1rem)] leading-[1.25] italic">
              [Client testimonial: a real quote about the experience of working with Pendie and living in the finished home.]
            </blockquote>
            <figcaption className="flex flex-col items-center gap-2">
              <span className="h-px w-10 bg-gold" />
              <span className="label !text-ivory">[Client name]</span>
              <span className="text-[13px] text-ash">[Residence, City]</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <CtaBlock
        title={<>Begin your <GoldItalic>commission.</GoldItalic></>}
        description="Tell us about your residence. Every engagement begins with a private, unhurried conversation."
      />
    </>
  );
}
