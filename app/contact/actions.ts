"use server";

import { headers } from "next/headers";
import { consultationSchema, type ConsultationResult } from "@/lib/consultation";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Naive in-memory rate limit (per server instance). Use Upstash/Redis in production
// if you run multiple instances or see abuse.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export async function submitConsultation(input: unknown): Promise<ConsultationResult> {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const data = parsed.data;

  // Bots that fill the honeypot get a fake success.
  if (data.company) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { ok: false, error: "Too many requests. Please try again in a few minutes." };
  }

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Location", data.location || "—"],
    ["Spaces", data.spaces.join(", ")],
    ["Service", data.service],
    ["Budget", data.budget ?? "—"],
    ["Timeline", data.timeline],
    ["Message", data.message || "—"],
  ];

  const { RESEND_API_KEY, CONSULT_TO_EMAIL, CONSULT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONSULT_TO_EMAIL) {
    // Dev / unconfigured: log so nothing is silently lost.
    console.info("[consultation] New request (email not configured):", Object.fromEntries(rows));
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONSULT_FROM_EMAIL ?? "Designs by Pendie <onboarding@resend.dev>",
        to: [CONSULT_TO_EMAIL],
        reply_to: data.email,
        subject: `New private consultation enquiry: ${data.name}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<h2>New private consultation enquiry</h2><table cellpadding="6">${rows
          .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
          .join("")}</table>`,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[consultation] Resend error", res.status, await res.text());
      return { ok: false, error: "We could not send your enquiry just now. Please email or telephone the studio." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[consultation] Network error", err);
    return { ok: false, error: "We could not send your enquiry just now. Please email or telephone the studio." };
  }
}
