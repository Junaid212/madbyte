/**
 * Central site configuration. Every value marked PLACEHOLDER should be
 * replaced with real details before launch.
 */
export const site = {
  name: "MADBYTE",
  tagline: "A Little Mad. A Lot Brilliant.",
  positioning: "Creative Technology & Digital Transformation",
  description:
    "MADBYTE is an independent creative technology agency. We design, build and grow unconventional digital experiences: software, brands and campaigns that move businesses forward.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** PLACEHOLDER contact details */
  email: "madbyte.official@gmail.com",
  phone: "+00 000 000 0000",
  location: "Your City, Your Country",
  hours: "Mon–Sat, 9:00–18:00",
  /** PLACEHOLDER social profiles. Point these at the real accounts. */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    // { label: "LinkedIn", href: "https://www.linkedin.com/" },
    // { label: "Behance", href: "https://www.behance.net/" },
    // { label: "X", href: "https://x.com/" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;
