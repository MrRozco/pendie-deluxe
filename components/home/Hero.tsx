"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal, RiseIn } from "@/components/motion/Reveal";
import { ButtonLink, Label, TextLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { easeLux, easeSweep } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[720px] items-end overflow-hidden sm:h-[780px] lg:h-[min(900px,calc(100svh-92px))] lg:min-h-[720px]">
      {/* Curtain reveal, then a slow settle + scroll parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.8, ease: easeSweep }}
      >
        <motion.div
          className="absolute inset-[-8%_0]"
          style={{ y }}
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: easeLux }}
        >
          <Image
            src="/images/salon-after.jpg"
            alt="A dark, composed salon with an arched window at dusk, a low ivory sofa and a brass halo pendant"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[40%_center]"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,0.88)_0%,rgba(10,10,9,0.45)_45%,rgba(10,10,9,0.1)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,#0a0a09_0%,rgba(10,10,9,0)_45%)]" />

      <motion.div style={{ opacity: fade }} className="container-lux relative pb-10 sm:pb-[72px]">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex max-w-[860px] flex-col items-start gap-8">
            <RiseIn delay={0.15}><Label rule>Interior Architecture &amp; Design</Label></RiseIn>
            <LineReveal
              className="display-1"
              delay={0.3}
              lines={["Interiors of", <><em className="gold-italic">quiet</em> distinction.</>]}
            />
            <RiseIn delay={0.65}>
              <p className="prose-lux max-w-[500px] !text-ivory-dim">
                Bespoke residences for those who value restraint, craftsmanship and an uncompromising eye.
              </p>
            </RiseIn>
            <RiseIn delay={0.85} className="flex w-full flex-col gap-7 sm:w-auto sm:flex-row sm:items-center">
              <ButtonLink href="/contact" arrow>Request a Private Consultation</ButtonLink>
              <TextLink href="/portfolio">View the Portfolio</TextLink>
            </RiseIn>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1 }}
            className="hidden flex-col items-center gap-4 text-[10px] tracking-[0.4em] text-stone uppercase [writing-mode:vertical-rl] lg:flex"
          >
            Scroll <i className="block h-[72px] w-px animate-cue bg-gold" />
          </motion.div>
        </div>

        <RiseIn
          delay={1.05}
          className="mt-9 flex flex-wrap justify-between gap-6 border-t border-ivory/14 pt-7 text-[10px] tracking-[0.3em] text-stone uppercase sm:mt-14 sm:text-[11px]"
        >
          <span>Residential · Penthouse · Estate</span>
          <span>{site.city} — By appointment</span>
        </RiseIn>
      </motion.div>
    </section>
  );
}
