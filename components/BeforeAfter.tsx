"use client";

import Image from "next/image";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import type { ProjectImage } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Chevrons } from "@/components/ui/icons";

export interface BeforeAfterHandle {
  /** Animate the divider (0 = all "after", 100 = all "before"). */
  snapTo: (value: number) => void;
}

interface BeforeAfterProps {
  before: ProjectImage;
  after: ProjectImage;
  intro?: boolean;
  onPositionChange?: (value: number) => void;
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Drag / tap / keyboard comparison slider. The divider lives in a MotionValue,
 * so dragging never re-renders React; only the rounded aria value is mirrored to state.
 */
export const BeforeAfter = forwardRef<BeforeAfterHandle, BeforeAfterProps>(function BeforeAfter(
  {
    before,
    after,
    intro = true,
    onPositionChange,
    label = "Drag to compare before and after",
    priority,
    sizes = "(min-width: 1320px) 1208px, 100vw",
    className,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(rootRef, { once: true, amount: 0.55 });

  const pos = useMotionValue(50);
  const [aria, setAria] = useState(50);
  const inset = useTransform(pos, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${inset}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;

  useMotionValueEvent(pos, "change", (v) => {
    const r = Math.round(v);
    setAria((p) => (p === r ? p : r));
  });
  useEffect(() => onPositionChange?.(aria), [aria, onPositionChange]);

  const stop = useCallback(() => {
    controls.current?.stop();
    controls.current = null;
  }, []);

  const snapTo = useCallback(
    (value: number) => {
      stop();
      controls.current = animate(pos, clamp(value), reduce ? { duration: 0 } : { duration: 0.9, ease: [0.7, 0, 0.2, 1] });
    },
    [pos, reduce, stop],
  );
  useImperativeHandle(ref, () => ({ snapTo }), [snapTo]);

  // One slow sweep the first time it is seen, to signal it can be dragged.
  useEffect(() => {
    if (!intro || !inView || reduce) return;
    controls.current = animate(pos, [50, 22, 78, 50], {
      duration: 3.2,
      ease: "easeInOut",
      times: [0, 0.34, 0.72, 1],
      delay: 0.5,
    });
    return stop;
  }, [intro, inView, reduce, pos, stop]);

  const setFromX = (clientX: number) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (r) pos.set(clamp(((clientX - r.left) / r.width) * 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stop();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && setFromX(e.clientX);
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const v = pos.get();
    const map: Record<string, number> = {
      ArrowLeft: v - step, ArrowDown: v - step, ArrowRight: v + step, ArrowUp: v + step, Home: 0, End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      snapTo(map[e.key]);
    }
  };

  const tag = "pointer-events-none absolute bottom-4 z-10 text-[11px] font-medium tracking-[0.34em] text-ivory uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:bottom-6";

  return (
    <div
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn("group relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden bg-noir-2 select-none sm:aspect-video", className)}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} priority={priority} draggable={false} className="pointer-events-none object-cover" />
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} priority={priority} draggable={false} className="pointer-events-none object-cover" />
      </motion.div>

      <span className={cn(tag, "left-4 sm:left-7")}>Before</span>
      <span className={cn(tag, "right-4 sm:right-7")}>After</span>

      <motion.div
        className="absolute inset-y-0 z-20 -ml-px w-px bg-gold shadow-[0_0_18px_rgba(201,169,110,0.45)]"
        style={{ left }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={aria}
          aria-valuetext={`${aria}% before`}
          onKeyDown={onKeyDown}
          onFocus={stop}
          className="absolute top-1/2 left-1/2 flex size-[46px] -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border border-gold bg-noir/70 text-gold backdrop-blur-sm transition-[width,height] duration-400 group-hover:size-[54px] focus-visible:outline-offset-[6px]"
        >
          <Chevrons className="-rotate-45" />
        </div>
      </motion.div>
    </div>
  );
});
