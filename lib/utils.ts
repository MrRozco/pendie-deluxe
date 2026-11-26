export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Matches --ease-lux / --ease-sweep in globals.css. */
export const easeLux = [0.2, 0.8, 0.2, 1] as const;
export const easeSweep = [0.7, 0, 0.2, 1] as const;
