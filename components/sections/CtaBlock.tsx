import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Label } from "@/components/ui/Button";

interface CtaBlockProps {
  title: ReactNode;
  description: string;
  cta?: string;
  image?: string;
}

/** Closing call to action used at the foot of every page. */
export function CtaBlock({ title, description, cta = "Request a Private Consultation", image }: CtaBlockProps) {
  return (
    <section className="relative overflow-hidden border-t border-ivory/8 py-[clamp(7.5rem,14vw,12.5rem)]">
      {image && (
        <>
          <Image src={image} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a09_0%,rgba(10,10,9,0.55)_40%,#0a0a09_100%)]" />
        </>
      )}
      <div className="container-lux relative flex flex-col items-center gap-9 text-center">
        <Reveal><Label>Begin</Label></Reveal>
        <Reveal delay={0.08}>
          <h2 className="display-1 max-w-[1000px] !text-[clamp(3rem,7vw,7rem)]">{title}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="prose-lux max-w-[560px]">{description}</p>
        </Reveal>
        <Reveal delay={0.24} className="flex w-full flex-col items-center gap-5 sm:w-auto">
          <ButtonLink href="/contact" arrow className="w-full sm:w-auto">{cta}</ButtonLink>
          <span className="text-xs tracking-[0.14em] text-ash">
            Initial consultations are complimentary and strictly confidential.
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export const GoldItalic = ({ children }: { children: ReactNode }) => <em className="gold-italic">{children}</em>;
