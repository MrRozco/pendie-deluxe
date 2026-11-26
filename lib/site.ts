/**
 * Studio details. Replace every [BRACKETED] value before launch.
 */
export const site = {
  name: "Designs by Pendie",
  tagline: "Bespoke residential interiors. Considered, composed and made to last.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://designsbypendie.com",
  city: "[City]",
  established: "[Year]",
  email: "[EMAIL ADDRESS]",
  emailHref: "mailto:studio@example.com",
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:+10000000000",
  address: "[STUDIO ADDRESS]",
  replyTime: "[one business day]",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;
