"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn, easeLux, easeSweep } from "@/lib/utils";

const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Fade + rise once in view. */
export function Reveal({ delay = 0, y = 40, children, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease: easeLux, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Same as Reveal but plays on mount, for above-the-fold content. */
export function RiseIn({ delay = 0, children, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: easeLux, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line-by-line headline reveal. Pass each line as an array item.
 * Renders a real heading for SEO/a11y.
 */
export function LineReveal({
  lines,
  as: Tag = "h1",
  delay = 0.15,
  stagger = 0.15,
  className,
  inView = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2";
  delay?: number;
  stagger?: number;
  className?: string;
  inView?: boolean;
}) {
  const trigger = inView ? { whileInView: "show", viewport } : { animate: "show" };
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="inline-block"
            initial="hidden"
            {...trigger}
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 1.3, ease: easeLux, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Wipes an image (or anything) in from left to right on scroll. */
export function Unveil({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={viewport}
      transition={{ duration: 1.4, ease: easeSweep, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself in gold when scrolled into view. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={cn("relative h-px bg-ivory/12", className)}>
      <motion.div
        className="absolute inset-0 origin-left bg-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: easeSweep, delay }}
      />
    </div>
  );
}

const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeLux } },
};

export function Stagger({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={viewport} {...props}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerChild} {...props}>
      {children}
    </motion.div>
  );
}
