import type { Metadata } from "next";
import Image from "next/image";
import { ConsultForm } from "@/components/contact/ConsultForm";
import { Faq } from "@/components/contact/Faq";
import { LineReveal, Reveal, RiseIn } from "@/components/motion/Reveal";
import { GoldItalic } from "@/components/sections/CtaBlock";
import { Label } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Consultation",
  description: "Begin your commission. Share a few details about your residence to arrange a private consultation with Pendie.",
};

const details = [
  { k: "Email", v: site.email, href: site.emailHref },
  { k: "Telephone", v: site.phone, href: site.phoneHref },
  { k: "Studio", v: site.address },
  { k: "Hours", v: "By appointment" },
];

const faqs = [
  {
    q: "What happens at the first consultation?",
    a: "A private, unhurried meeting at your residence or our studio. We discuss how you live, the spaces in question, your timeline and investment, and share first impressions. There is no obligation.",
  },
  {
    q: "How are fees structured?",
    a: "[Describe Pendie’s fee structure: design fee, hourly or percentage of project, and what each phase includes.]",
  },
  {
    q: "Do you work with existing architects and builders?",
    a: "Frequently. We collaborate closely with your architect and contractor, or introduce trusted partners from our own network.",
  },
  {
    q: `Do you take projects outside ${site.city}?`,
    a: "Yes. We accept a select number of commissions further afield each year, including second homes and pied-à-terres.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="grid border-b border-ivory/8 lg:min-h-[1060px] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Image panel */}
        <div className="relative flex min-h-[600px] items-end overflow-hidden sm:min-h-[640px]">
          <RiseIn className="absolute inset-0" delay={0}>
            <Image src="/images/dining-after.jpg" alt="A candlelit dining room with a linear brass chandelier" fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </RiseIn>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,#0a0a09_10%,rgba(10,10,9,0.7)_50%,rgba(10,10,9,0.35)_100%)]" />
          <div className="relative flex w-full flex-col gap-9 px-[22px] py-12 sm:px-14 lg:px-16 lg:py-18">
            <RiseIn delay={0.1}><Label rule>Private Consultation</Label></RiseIn>
            <LineReveal className="display-1 !text-[clamp(3.25rem,6.4vw,6.5rem)]" lines={["Begin your", <GoldItalic key="c">commission.</GoldItalic>]} />
            <RiseIn delay={0.6}>
              <p className="prose-lux max-w-[480px] !text-ivory-dim">
                Share a few details about your residence. Pendie personally reviews every enquiry and will respond
                within {site.replyTime} to arrange a private meeting.
              </p>
            </RiseIn>
            <RiseIn delay={0.8}>
              <dl className="grid border-t border-ivory/16 sm:grid-cols-2">
                {details.map((d) => (
                  <div key={d.k} className="flex flex-col gap-2 border-b border-ivory/16 py-5.5 sm:odd:pr-5">
                    <dt className="label !text-ash">{d.k}</dt>
                    <dd className="text-[15px] text-ivory">
                      {d.href ? <a href={d.href} className="transition-colors hover:text-gold">{d.v}</a> : d.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </RiseIn>
          </div>
        </div>

        {/* Form panel */}
        <div className="bg-noir-2 px-[22px] py-14 sm:px-14 sm:py-18 lg:px-20 lg:py-24">
          <RiseIn delay={0.4} className="h-full">
            <ConsultForm />
          </RiseIn>
        </div>
      </section>

      <section className="section">
        <div className="container-lux grid items-start gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal className="flex flex-col gap-7">
            <Label rule>Enquiries</Label>
            <h2 className="display-2">Questions,<br /><GoldItalic>answered.</GoldItalic></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
