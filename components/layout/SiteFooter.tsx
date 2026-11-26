import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./SiteHeader";

const heading = "text-[11px] font-medium tracking-[0.32em] uppercase text-gold";
const link = "text-[15px] text-stone transition-colors duration-300 hover:text-ivory";

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/8 bg-noir-deep pt-28 pb-10">
      <div className="container-lux">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo align="start" />
            <p className="max-w-[320px] text-[15px] leading-[1.8] text-ash">{site.tagline}</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Navigate</span>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={link}>{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Studio</span>
            <a href={site.emailHref} className={link}>{site.email}</a>
            <a href={site.phoneHref} className={link}>{site.phone}</a>
            <span className="text-[15px] text-stone">{site.address}</span>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Follow</span>
            {site.social.map((s) => (
              <a key={s.label} href={s.href} className={link} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-24 overflow-hidden font-serif text-[clamp(4rem,15vw,14.5rem)] leading-[0.8] tracking-[0.12em] whitespace-nowrap text-ivory/5 uppercase select-none"
        >
          Pendie
        </div>

        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-ivory/8 pt-7 text-[11px] tracking-[0.24em] text-ash uppercase">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Interior Architecture &amp; Design</span>
        </div>
      </div>
    </footer>
  );
}
