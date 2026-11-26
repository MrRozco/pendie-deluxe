import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", "aria-hidden": true, focusable: false } as const;

/** Long, hairline arrow used in buttons and links. */
export const ArrowLong = (p: P) => (
  <svg width="34" height="10" viewBox="0 0 34 10" {...base} {...p}>
    <path d="M0 5h32M28 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const ArrowLongLeft = (p: P) => (
  <svg width="34" height="10" viewBox="0 0 34 10" {...base} {...p}>
    <path d="M34 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const Chevrons = (p: P) => (
  <svg width="22" height="10" viewBox="0 0 22 10" {...base} {...p}>
    <path d="M5 1L1 5l4 4M17 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Burger = (p: P) => (
  <svg width="28" height="12" viewBox="0 0 28 12" {...base} {...p}>
    <path d="M0 1h28M8 11h20" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Close = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...base} {...p}>
    <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Plus = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 18 18" {...base} {...p}>
    <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1" />
  </svg>
);
