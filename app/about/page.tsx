import type { Metadata } from "next";
import Image from "next/image";
import { LineReveal, Reveal, RiseIn, Unveil } from "@/components/motion/Reveal";
import { CtaBlock, GoldItalic } from "@/components/sections/CtaBlock";
import { ButtonLink, Label, TextLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Pendie, the designer behind calm, assured and deeply personal residential interiors.",
};

const principles = [
  { n: "I", title: "Restraint", text: "Fewer, finer things. Every room is edited until what remains feels inevitable." },
  { n: "II", title: "Craftsmanship", text: "Natural stone, solid timber, hand-finished metal. Materials chosen to age with grace." },
  { n: "III", title: "Discretion", text: "Your home is private. Projects are handled with complete confidentiality, start to finish." },
];

const credentials = [
  { k: "Education", v: "[Degree or certification]" },
  { k: "Membership", v: "[Professional association]" },
  { k: "Recognition", v: "[Award or honour]" },
  { k: "Press", v: "[Publication features]" },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-[clamp(4.5rem,9vw,8.75rem)] pb-[clamp(6rem,11vw,10rem)]">
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start gap-9">
            <RiseIn delay={0.1}><Label rule>The Designer</Label></RiseIn>
            <LineReveal className="display-1" lines={["Meet", <GoldItalic key="p">Pendie.</GoldItalic>]} />
            <RiseIn delay={0.6}>
              <p className="prose-lux max-w-[500px]">
                For Pendie, a beautiful room is never loud. It is calm, assured and deeply personal, shaped around the
                people who live in it and the pieces they love.
              </p>
            </RiseIn>
            <RiseIn delay={0.8} className="flex w-full flex-col gap-7 sm:w-auto sm:flex-row sm:items-center">
              <ButtonLink href="/contact" arrow>Commission the Studio</ButtonLink>
              <TextLink href="/portfolio">View the Work</TextLink>
            </RiseIn>
          </div>

          <div className="relative aspect-[4/5] w-[calc(100%-28px)] max-w-[520px] lg:w-[calc(100%-28px)] lg:max-w-none">
            <RiseIn delay={0.9} className="absolute inset-0 translate-x-7 translate-y-7 border border-gold/50" aria-hidden />
            {/* Replace with: <Image src="/images/pendie.jpg" alt="Portrait of Pendie" fill className="object-cover" /> */}
            <Unveil className="absolute inset-0 flex items-end justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#2a2621,#111110_70%)]">
              <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" aria-hidden className="absolute inset-0 size-full">
                <circle cx="200" cy="205" r="66" fill="#1f1c19" />
                <path d="M80 500c0-88 54-158 120-158s120 70 120 158z" fill="#1f1c19" />
              </svg>
              <Label className="relative mb-9 !text-stone">[Portrait of Pendie]</Label>
            </Unveil>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section border-y border-ivory/6 bg-noir-2">
        <div className="container-lux flex flex-col gap-24">
          <Reveal className="flex flex-col items-center gap-9 text-center">
            <Label>Philosophy</Label>
            <p className="max-w-[1040px] font-serif text-[clamp(2.1rem,4.2vw,4rem)] leading-[1.12] tracking-[-0.015em]">
              Luxury is not excess. It is the <GoldItalic>absence</GoldItalic> of anything unnecessary.
            </p>
            <span className="h-20 w-px bg-gold" />
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="prose-lux">
                Every commission begins with listening: to how a family gathers, where the morning light falls, which
                objects carry memory. From there, Pendie composes spaces with an architect’s discipline and a
                collector’s eye, balancing proportion, texture and light until a room feels effortless.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="prose-lux">
                [Add Pendie’s story here: her training, the path that led her to interiors, the places and makers that
                shaped her eye, and the kind of clients she loves to work with.]
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container-lux flex flex-col gap-18">
          <Reveal className="flex flex-col gap-7">
            <Label rule>Principles</Label>
            <h2 className="display-2">Three things we<br /><GoldItalic>never</GoldItalic> compromise.</h2>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1} className="flex flex-col gap-5.5 border-t border-ivory/12 pt-9">
                <span className="font-serif text-lg text-gold italic">{p.n}</span>
                <h3 className="display-3">{p.title}</h3>
                <p className="prose-lux !text-base">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image band */}
      <section aria-label="The Library" className="relative h-[380px] overflow-hidden sm:h-[480px] lg:h-[640px]">
        <Unveil className="absolute inset-0">
          <Image src="/images/study-after.jpg" alt="A walnut library with backlit shelving, a leather chair and a brass desk lamp" fill sizes="100vw" className="object-cover" />
        </Unveil>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,9,0.85)_0%,rgba(10,10,9,0)_50%)]" />
        <div className="container-lux absolute inset-x-0 bottom-11 flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)]">The Library</span>
          <Label className="!text-ivory-dim">{site.city}</Label>
        </div>
      </section>

      {/* Credentials */}
      <section className="section">
        <div className="container-lux flex flex-col gap-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-7">
              <Label rule>Credentials</Label>
              <h2 className="display-2">A practice built<br />on <GoldItalic>trust.</GoldItalic></h2>
            </div>
            <p className="prose-lux max-w-[400px]">
              Insured, discreet and supported by a long-standing network of architects, artisans and trade showrooms.
            </p>
          </Reveal>
          <dl className="border-b border-ivory/12">
            {credentials.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06} className="grid items-baseline gap-2.5 border-t border-ivory/12 py-6.5 sm:grid-cols-[240px_1fr] sm:gap-10 sm:py-8.5">
                <dt className="label !text-ash">{c.k}</dt>
                <dd className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] italic">{c.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CtaBlock
        title={<>Let us compose <GoldItalic>your</GoldItalic> home.</>}
        description="Begin with a private consultation. We will listen, share first impressions and outline a considered path forward."
        image="/images/suite-after.jpg"
      />
    </>
  );
}
