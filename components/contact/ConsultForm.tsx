"use client";

import { useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitConsultation } from "@/app/contact/actions";
import {
  budgetOptions,
  serviceOptions,
  spaceOptions,
  timelineOptions,
  type ConsultationInput,
} from "@/lib/consultation";
import { site } from "@/lib/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ArrowLongLeft } from "@/components/ui/icons";
import { cn, easeLux, easeSweep } from "@/lib/utils";

type FormState = {
  spaces: string[];
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  company: string;
};

const initial: FormState = {
  spaces: [], service: "", budget: "", timeline: "",
  name: "", email: "", phone: "", location: "", message: "", company: "",
};

const steps = ["I · The Residence", "II · The Commission", "III · Your Details"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full min-h-[52px] rounded-none border-0 border-b border-ivory/22 bg-transparent py-3 text-lg font-light text-ivory " +
  "placeholder:text-[#5f5a52] transition-colors duration-400 focus:border-gold focus:outline-none";

export function ConsultForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const root = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setError("");
    if (root.current && root.current.getBoundingClientRect().top < 0) {
      root.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSpace = (s: string) =>
    update("spaces", form.spaces.includes(s) ? form.spaces.filter((x) => x !== s) : [...form.spaces, s]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please add your name.");
    if (!emailRe.test(form.email.trim())) return setError("Please enter a valid email address.");
    startTransition(async () => {
      const res = await submitConsultation({ ...form, budget: form.budget || undefined } as unknown as ConsultationInput);
      if (res.ok) go(4);
      else setError(res.error);
    });
  };

  const fill = (n: number) => (step > n ? 1 : step === n ? 0.5 : 0);
  const firstName = form.name.trim().split(/\s+/)[0] || "friend";

  const pane = {
    initial: (d: number) => ({ opacity: 0, x: d * 48 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeLux } },
    exit: (d: number) => ({ opacity: 0, x: d * -48, transition: { duration: 0.3 } }),
  };

  return (
    <div ref={root} className="flex h-full scroll-mt-24 flex-col">
      {step < 4 && (
        <ol aria-label="Progress" className="mb-11 grid grid-cols-3 gap-3 sm:mb-16">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-col gap-3.5" aria-current={step === i + 1 ? "step" : undefined}>
              <div className="relative h-px overflow-hidden bg-ivory/14">
                <motion.div
                  className="absolute inset-0 origin-left bg-gold"
                  initial={false}
                  animate={{ scaleX: fill(i + 1) }}
                  transition={{ duration: 0.9, ease: easeSweep }}
                />
              </div>
              <span
                className={cn(
                  "text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-400 sm:text-[10px] sm:tracking-[0.32em]",
                  step >= i + 1 ? "text-ivory" : "text-ash",
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => update("company", e.target.value)} />
          </label>
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {step === 1 && (
            <motion.fieldset key="s1" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-11">
              <Heading title={<>Which spaces shall we <em className="gold-italic">compose?</em></>} hint="Select all that apply." />
              <div className="grid grid-cols-2 gap-3">
                {spaceOptions.map((s) => (
                  <Option key={s} pressed={form.spaces.includes(s)} onClick={() => toggleSpace(s)} tile>
                    {s}
                  </Option>
                ))}
              </div>
              <ErrorText message={error} />
              <div className="flex justify-end">
                <Button arrow className="w-full sm:w-auto" onClick={() => (form.spaces.length ? go(2) : setError("Please select at least one space."))}>
                  Continue
                </Button>
              </div>
            </motion.fieldset>
          )}

          {step === 2 && (
            <motion.fieldset key="s2" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-11">
              <Heading title={<>Tell us about the <em className="gold-italic">commission.</em></>} />
              <Group label="The engagement" options={serviceOptions} value={form.service} onChange={(v) => update("service", v)} />
              <Group label="Investment" options={budgetOptions} value={form.budget} onChange={(v) => update("budget", v)} />
              <Group label="Timing" options={timelineOptions} value={form.timeline} onChange={(v) => update("timeline", v)} />
              <ErrorText message={error} />
              <Actions onBack={() => go(1)}>
                <Button arrow onClick={() => (form.service && form.timeline ? go(3) : setError("Please choose an engagement and timing."))}>
                  Continue
                </Button>
              </Actions>
            </motion.fieldset>
          )}

          {step === 3 && (
            <motion.fieldset key="s3" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-11">
              <Heading title={<>How may we <em className="gold-italic">reach you?</em></>} hint="Your details are held in strict confidence." />
              <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                <Field id="name" label="Full name *">
                  <input id="name" type="text" autoComplete="name" required placeholder="Your name" className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
                </Field>
                <Field id="phone" label="Telephone">
                  <input id="phone" type="tel" autoComplete="tel" placeholder="Optional" className={fieldClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </Field>
                <Field id="email" label="Email *" className="sm:col-span-2">
                  <input id="email" type="email" autoComplete="email" required placeholder="you@domain.com" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
                </Field>
                <Field id="location" label="Residence location" className="sm:col-span-2">
                  <input id="location" type="text" placeholder="City or neighbourhood" className={fieldClass} value={form.location} onChange={(e) => update("location", e.target.value)} />
                </Field>
                <Field id="message" label="Anything you would like us to know" className="sm:col-span-2">
                  <textarea id="message" rows={4} placeholder="The residence, your aspirations, references you love…" className={cn(fieldClass, "min-h-[110px] resize-y")} value={form.message} onChange={(e) => update("message", e.target.value)} />
                </Field>
              </div>
              <ErrorText message={error} />
              <Actions onBack={() => go(2)} disabled={pending}>
                <Button type="submit" arrow={!pending} disabled={pending} aria-busy={pending}>
                  {pending ? "Sending…" : "Submit Enquiry"}
                </Button>
              </Actions>
            </motion.fieldset>
          )}

          {step === 4 && (
            <motion.div key="done" custom={1} variants={pane} initial="initial" animate="animate" role="status" className="flex flex-1 flex-col justify-center gap-11">
              <motion.span
                aria-hidden
                initial={{ opacity: 0, rotate: 45, scale: 0.4 }}
                animate={{ opacity: 1, rotate: 45, scale: 1 }}
                transition={{ duration: 1, ease: easeLux, delay: 0.1 }}
                className="flex size-[54px] items-center justify-center border border-gold"
              >
                <span className="size-2.5 bg-gold" />
              </motion.span>
              <h2 className="display-2 !text-[clamp(2.6rem,4.4vw,4.25rem)]">
                Thank you,<br /><em className="gold-italic">{firstName}.</em>
              </h2>
              <p className="prose-lux">
                Your enquiry has been received. Pendie will be in touch personally within {site.replyTime} to arrange
                your private consultation.
              </p>
              <dl className="border-t border-ivory/12">
                {[["Spaces", form.spaces.join(", ")], ["Engagement", form.service], ["Timing", form.timeline]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-ivory/12 py-4.5">
                    <dt className="label !text-ash">{k}</dt>
                    <dd className="text-right text-[15px] text-ivory">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-7">
                <ButtonLink href="/portfolio" variant="line" arrow>Explore the Portfolio</ButtonLink>
                <button
                  type="button"
                  onClick={() => { setForm(initial); go(1); }}
                  className="min-h-11 text-[11px] font-medium tracking-[0.3em] text-ash uppercase hover:text-ivory"
                >
                  New enquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

function Heading({ title, hint }: { title: ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-3.5">
      <legend className="display-3 !text-[clamp(2rem,3vw,2.75rem)]">{title}</legend>
      {hint && <p className="text-[15px] text-stone">{hint}</p>}
    </div>
  );
}

function Option({ pressed, onClick, tile, radio, children }: { pressed: boolean; onClick: () => void; tile?: boolean; radio?: boolean; children: ReactNode }) {
  const state = radio ? { role: "radio" as const, "aria-checked": pressed } : { "aria-pressed": pressed };
  return (
    <button
      type="button"
      {...state}
      onClick={onClick}
      className={cn(
        "relative border text-ivory-dim transition-[border-color,color,background-color] duration-400",
        tile
          ? "flex min-h-20 items-end px-5.5 py-5 text-left font-serif text-[19px] sm:min-h-24 sm:text-[22px]"
          : "min-h-[54px] px-5.5 text-sm tracking-[0.04em]",
        pressed ? "border-gold bg-gold/10 text-ivory" : "border-ivory/16 hover:border-gold/70 hover:text-ivory",
      )}
    >
      {pressed && <span aria-hidden className="absolute top-2 right-2 size-1.5 rotate-45 bg-gold" />}
      {children}
    </button>
  );
}

function Group({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col gap-4">
      <span className="text-[11px] font-medium tracking-[0.3em] text-gold uppercase">{label}</span>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <Option key={o} radio pressed={value === o} onClick={() => onChange(o)}>{o}</Option>
        ))}
      </div>
    </div>
  );
}

function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[10px] font-medium tracking-[0.32em] text-ash uppercase">{label}</label>
      {children}
    </div>
  );
}

function Actions({ onBack, disabled, children }: { onBack: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={onBack}
        disabled={disabled}
        className="inline-flex min-h-11 items-center justify-center gap-3.5 text-[11px] font-medium tracking-[0.3em] text-ash uppercase transition-colors hover:text-ivory disabled:opacity-50"
      >
        <ArrowLongLeft /> Back
      </button>
      {children}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13px] tracking-[0.06em] text-ember">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
