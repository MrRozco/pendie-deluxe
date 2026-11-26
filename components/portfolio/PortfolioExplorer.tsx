"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BeforeAfter, type BeforeAfterHandle } from "@/components/BeforeAfter";
import { Label } from "@/components/ui/Button";
import { ArrowLong, ArrowLongLeft } from "@/components/ui/icons";
import { categories, pad, projects, type Project } from "@/lib/projects";
import { cn, easeLux, easeSweep } from "@/lib/utils";

type Filter = (typeof categories)[number];
type View = "before" | "split" | "after";
const viewTargets: Record<View, number> = { before: 100, split: 50, after: 0 };
const roman = ["i", "ii", "iii", "iv", "v"];

export function PortfolioExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [view, setView] = useState<View>("split");
  const slider = useRef<BeforeAfterHandle>(null);
  const viewer = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => projects.filter((p) => filter === "All" || p.category === filter), [filter]);
  const current = projects.find((p) => p.id === selectedId) ?? projects[0];
  const nav = visible.length ? visible : projects;
  const navIndex = Math.max(0, nav.indexOf(current));

  const select = (p: Project, scroll = false) => {
    setSelectedId(p.id);
    setView("split");
    if (scroll) viewer.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const changeFilter = (f: Filter) => {
    setFilter(f);
    const list = projects.filter((p) => f === "All" || p.category === f);
    if (list.length && !list.includes(current)) select(list[0]);
  };
  const step = (d: 1 | -1) => select(nav[(navIndex + d + nav.length) % nav.length]);
  const onPositionChange = useCallback((v: number) => setView(v >= 99 ? "before" : v <= 1 ? "after" : "split"), []);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <>
      {/* Filter tabs */}
      <LayoutGroup id="filters">
        <div role="group" aria-label="Filter residences" className="flex flex-wrap gap-x-10 gap-y-1 border-b border-ivory/12">
          {categories.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => changeFilter(c)}
                className={cn(
                  "relative min-h-12 text-xs font-medium tracking-[0.26em] uppercase transition-colors duration-400",
                  active ? "text-ivory" : "text-ash hover:text-ivory",
                )}
              >
                {c}
                <sup className="ml-1.5 text-[9px] tracking-[0.1em] text-gold">{pad(count(c))}</sup>
                {active && (
                  <motion.span layoutId="tab-line" className="absolute inset-x-0 -bottom-px h-px bg-gold" transition={{ duration: 0.6, ease: easeSweep }} />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Viewer */}
      <div ref={viewer} className="scroll-mt-30 pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: easeSweep }}
          >
            <BeforeAfter
              ref={slider}
              before={current.before}
              after={current.after}
              onPositionChange={onPositionChange}
              label={`Drag to compare ${current.title} before and after`}
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="grid items-start gap-10 pt-11 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr_0.8fr] lg:gap-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: easeLux }}
              className="flex flex-col gap-4.5 md:col-span-2 lg:col-span-1"
              aria-live="polite"
            >
              <span className="font-serif text-[15px] text-gold italic">
                {pad(projects.indexOf(current) + 1)} — {pad(projects.length)}
              </span>
              <h2 className="display-2 !text-[clamp(2.25rem,3.8vw,3.6rem)]">{current.title}</h2>
              <Label className="!text-ash">{current.category} · {current.location}</Label>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="prose-lux"
              >
                {current.summary}
              </motion.p>
            </AnimatePresence>
            <LayoutGroup id="view">
              <div role="group" aria-label="Compare view" className="flex gap-7">
                {(Object.keys(viewTargets) as View[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => {
                      setView(v);
                      slider.current?.snapTo(viewTargets[v]);
                    }}
                    className={cn(
                      "relative min-h-11 text-[11px] font-medium tracking-[0.3em] uppercase transition-colors duration-400",
                      view === v ? "text-ivory" : "text-ash hover:text-ivory",
                    )}
                  >
                    {v}
                    {view === v && (
                      <motion.span layoutId="view-line" className="absolute inset-x-0 bottom-2 h-px bg-gold" transition={{ duration: 0.5, ease: easeSweep }} />
                    )}
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>

          <div className="flex flex-col gap-7">
            <ul className="border-b border-ivory/10">
              {current.scope.map((s, i) => (
                <li key={s} className="flex justify-between gap-4 border-t border-ivory/10 py-3.5 text-sm text-ivory-dim">
                  <span>{s}</span>
                  <span className="font-serif text-gold italic">{roman[i]}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2.5">
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => step(d)}
                  aria-label={d === -1 ? "Previous residence" : "Next residence"}
                  className="inline-flex size-[58px] items-center justify-center border border-ivory/20 text-ivory transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-noir"
                >
                  {d === -1 ? <ArrowLongLeft /> : <ArrowLong />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collection grid */}
      <section className="section -mx-[22px] mt-32 border-t border-ivory/6 bg-noir-2 px-[22px] sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14 lg:!pb-52">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-7">
            <Label rule>The Collection</Label>
            <h2 className="display-2">Every <em className="gold-italic">residence.</em></h2>
          </div>
          <Label className="!text-ash">
            <span aria-live="polite">Showing {pad(visible.length)}</span> · Hover to see the before
          </Label>
        </div>

        <motion.ul layout className="grid gap-x-14 gap-y-16 sm:grid-cols-2 sm:gap-y-24">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.8, ease: easeLux }}
                className={cn(i % 2 === 1 && "sm:mt-20 lg:mt-36")}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} active={p.id === current.id} onSelect={() => select(p, true)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </>
  );
}

function ProjectCard({ project, index, active, onSelect }: { project: Project; index: number; active: boolean; onSelect: () => void }) {
  const sizes = "(min-width: 640px) 50vw, 100vw";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View ${project.title}, before and after`}
      aria-current={active || undefined}
      className="group flex w-full flex-col text-left"
    >
      <span
        className={cn(
          "relative block aspect-[5/4] overflow-hidden outline outline-offset-[10px] transition-[outline-color] duration-500",
          active ? "outline-gold/60" : "outline-transparent",
        )}
      >
        <Image src={project.after.src} alt={project.after.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1800ms] ease-lux group-hover:scale-106" />
        <Image
          src={project.before.src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-[opacity,transform] duration-[900ms,1800ms] ease-lux group-hover:scale-106 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span className="absolute bottom-5 left-5.5 translate-y-2 text-[11px] font-medium tracking-[0.34em] text-ivory uppercase opacity-0 transition-all duration-600 ease-lux [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] group-hover:translate-y-0 group-hover:opacity-100">
          Before
        </span>
      </span>
      <span className="flex flex-col justify-between gap-2 pt-6 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="flex items-baseline gap-4">
          <span className="font-serif text-sm text-gold italic">{pad(index + 1)}</span>
          <span className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] text-ivory">{project.title}</span>
        </span>
        <span className="text-[11px] tracking-[0.28em] whitespace-nowrap text-ash uppercase">{project.category}</span>
      </span>
    </button>
  );
}
