# Designs by Pendie

Luxury marketing site and enquiry funnel for an interior design studio. Noir and champagne-gold palette, sharp
edges, editorial typography and restrained motion.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zod.
Fonts: Bodoni Moda (display) + Jost (text) via `next/font`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see "Enquiry emails"
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for production, `npm run typecheck` for TypeScript.

## Structure

```
app/
  layout.tsx              Fonts, header, footer, MotionConfig (reduced-motion aware)
  globals.css             Design tokens (@theme) + .btn / .text-link / .label / .display-* classes
  page.tsx                Home
  about/page.tsx          About
  portfolio/page.tsx      Portfolio
  contact/page.tsx        Private consultation + FAQ
  contact/actions.ts      Server action: Zod validation, honeypot, rate limit, Resend email
  sitemap.ts · robots.ts · not-found.tsx
components/
  BeforeAfter.tsx         Drag / tap / keyboard comparison slider with diamond handle
  home/Hero.tsx           Curtain reveal, settle + parallax, masked headline
  portfolio/              PortfolioExplorer: filter tabs, viewer, staggered collection grid
  contact/                ConsultForm (3-step funnel), Faq accordion
  layout/                 SiteHeader (centered logo, full-screen mobile menu), SiteFooter
  motion/Reveal.tsx       Reveal, RiseIn, LineReveal, Unveil, DrawLine, Stagger
  sections/               CtaBlock, Marquee
  ui/                     Button / ButtonLink / TextLink / Label, icons
lib/
  site.ts                 Studio details and navigation  ← edit first
  projects.ts             Portfolio content               ← swap in real photography
  consultation.ts         Form options + shared Zod schema
public/images/            Illustrated before/after stand-ins (1600×1067 JPG)
```

## Before launch

1. **Placeholders.** Search for `[` to find every bracketed value: stats, press, testimonial, credentials, fee FAQ,
   and the studio details in `lib/site.ts`.
2. **Photography.** For a luxury brand this matters most. Replace `public/images/*` with professional shots and
   update `lib/projects.ts`. Shoot each before/after pair from the same position; 16:9 suits the slider. Add a
   portrait on the About page (a comment marks the spot).
3. **Positioning.** Confirm the budget tiers in `lib/consultation.ts`, the "complimentary consultation" line in
   `components/sections/CtaBlock.tsx`, and the reply time in `lib/site.ts`.
4. **Enquiry emails.** Set `RESEND_API_KEY`, `CONSULT_TO_EMAIL` and `CONSULT_FROM_EMAIL` (a domain verified in
   Resend). Without them, enquiries are logged to the server console only.
5. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, Open Graph and the sitemap.

## Notes

- **Motion:** headline lines slide up from a mask, images wipe in with `clip-path`, gold hairlines draw on scroll,
  buttons fill with a sweep. Everything respects `prefers-reduced-motion` through `MotionConfig`.
- **Accessibility:** the slider handle is a focusable `role="slider"` (arrows, Shift for larger steps, Home/End);
  option groups use radio semantics; the mobile menu is a modal dialog with Escape to close and scroll lock.
- **Analytics:** track step changes in `ConsultForm` (`go()`) and successful submissions as GA4/PostHog events to
  measure funnel drop-off.
- **Spam:** honeypot field plus an in-memory rate limit. On multi-instance hosting use Upstash Redis instead.
