"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { pad } from "@/lib/projects";
import { cn, easeLux } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Burger, Close } from "@/components/ui/icons";

export function Logo({ align = "center", className }: { align?: "center" | "start"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Designs by Pendie, home"
      className={cn("flex flex-col gap-1.5 text-ivory", align === "center" ? "items-center" : "items-start", className)}
    >
      <span className={cn("text-[9px] font-medium tracking-[0.55em] text-gold uppercase", align === "center" && "pl-[0.55em]")}>
        Designs by
      </span>
      <span
        className={cn(
          "font-serif text-[22px] leading-none tracking-[0.32em] uppercase sm:text-[28px]",
          align === "center" && "pl-[0.32em]",
        )}
      >
        Pendie
      </span>
    </Link>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-flex min-h-11 items-center px-3.5 text-[11px] font-medium tracking-[0.3em] uppercase transition-colors duration-400",
        active ? "text-ivory" : "text-stone hover:text-ivory",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-3.5 bottom-2.5 h-px bg-gold transition-transform duration-500 ease-lux",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll and support Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const [home, about, portfolio, contact] = navLinks;

  return (
    <header className="sticky top-0 z-60 border-b border-ivory/8 bg-noir/80 backdrop-blur-xl backdrop-saturate-125">
      <div className="container-lux grid h-[76px] grid-cols-[1fr_auto] items-center lg:h-[92px] lg:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {[home, about, portfolio].map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} active={isActive(l.href)} />
          ))}
        </nav>

        <Logo className="max-lg:items-start max-lg:[&>span]:pl-0" />

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <NavLink href={contact.href} label={contact.label} active={isActive(contact.href)} />
          <ButtonLink href="/contact" variant="line" className="!min-h-[46px] !px-[22px] !text-[11px]">
            Private Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="menu-overlay"
          className="inline-flex size-12 items-center justify-center justify-self-end text-ivory lg:hidden"
        >
          <Burger />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-70 flex flex-col bg-noir px-[22px] pt-6 pb-10 lg:hidden"
          >
            <div className="mb-12 flex items-center justify-between">
              <Logo align="start" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-12 items-center justify-center text-ivory">
                <Close />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeLux, delay: 0.25 + i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="flex min-h-16 items-baseline gap-4 border-b border-ivory/10 font-serif text-[44px] leading-tight text-ivory"
                  >
                    <span className="font-sans text-[11px] tracking-[0.3em] text-gold">{pad(i + 1)}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <ButtonLink href="/contact" arrow className="mt-auto w-full">
              Private Consultation
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
