import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowLong } from "./icons";

type Variant = "gold" | "line";

const arrow = (
  <ArrowLong className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5" />
);

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "gold", arrow: withArrow, className, children, ...props }: LinkProps) {
  return (
    <Link className={cn("btn group", variant === "gold" ? "btn-gold" : "btn-line", className)} {...props}>
      {children}
      {withArrow && arrow}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "gold", arrow: withArrow, className, children, type = "button", ...props }: BtnProps) {
  return (
    <button
      type={type}
      className={cn("btn group disabled:pointer-events-none disabled:opacity-50", variant === "gold" ? "btn-gold" : "btn-line", className)}
      {...props}
    >
      {children}
      {withArrow && arrow}
    </button>
  );
}

export function TextLink({ className, children, ...props }: Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode }) {
  return (
    <Link className={cn("text-link group", className)} {...props}>
      {children}
      <ArrowLong className="text-gold transition-transform duration-500 ease-lux group-hover:translate-x-2" />
    </Link>
  );
}

/** Small-caps label with optional leading gold rule. */
export function Label({ rule, className, children }: { rule?: boolean; className?: string; children: ReactNode }) {
  return <span className={cn("label", rule && "label-rule", className)}>{children}</span>;
}
