import { z } from "zod";

export const spaceOptions = [
  "Entire residence",
  "Living & entertaining",
  "Kitchen",
  "Primary suite",
  "Bath & spa",
  "Study / library",
] as const;
export const serviceOptions = ["Full-service design", "Architectural renovation", "Furnishing & art", "Advisory"] as const;
/** Positioning decision: adjust to Pendie's real minimums. */
export const budgetOptions = ["Under $100k", "$100k–$250k", "$250k–$500k", "$500k+"] as const;
export const timelineOptions = ["Within 3 months", "3–6 months", "6–12 months", "Exploring"] as const;

/** Shared by the client form (step checks) and the server action (source of truth). */
export const consultationSchema = z.object({
  spaces: z.array(z.enum(spaceOptions)).min(1, "Please select at least one space."),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose an engagement." }) }),
  budget: z.enum(budgetOptions).optional(),
  timeline: z.enum(timelineOptions, { errorMap: () => ({ message: "Please choose a timing." }) }),
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  /** Honeypot: real visitors never see or fill this. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ConsultationResult = { ok: true } | { ok: false; error: string };
