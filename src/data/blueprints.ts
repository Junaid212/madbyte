export type Division = "Build" | "Design" | "Create" | "Grow";

export interface Blueprint {
  id: string;
  /** 01-06, shown on the card. */
  index: string;
  division: Division;
  /** The kind of build, shown as the card kicker. */
  archetype: string;
  title: string;
  problem: string;
  architect: string;
  stack: string[];
}

export const blueprintFilters = ["All", "Build", "Design", "Create", "Grow"] as const;

/**
 * Capability blueprints: systems MADBYTE is set up to deliver. These are NOT
 * past client projects, so keep them framed as blueprints and never add
 * client names, logos or results until real work exists.
 */
export const blueprints: Blueprint[] = [
  {
    id: "operations-erp",
    index: "01",
    division: "Build",
    archetype: "Custom Operations & ERP Workspace",
    title: "Unified Inventory, Order & Billing Engine",
    problem:
      "Growing businesses lose hours every week syncing disconnected spreadsheets, manual invoices, and stock updates.",
    architect:
      "A role-based web dashboard with real-time stock tracking, automated GST/tax invoice generation, order pipelines, and instant reporting.",
    stack: ["React / Next.js", "Node.js", "PostgreSQL / Supabase", "Automated Workflows"],
  },
  {
    id: "saas-interface",
    index: "02",
    division: "Design",
    archetype: "Fintech & SaaS Product Interface",
    title: "Zero-Friction Onboarding & Analytics Dashboard",
    problem: "Powerful software fails when users feel overwhelmed in the first 60 seconds.",
    architect:
      "End-to-end UX flows, interactive Figma prototypes, dark/light component libraries, and intuitive data visualizations designed for daily clarity.",
    stack: ["UI/UX Architecture", "Interactive Prototyping", "Design Systems"],
  },
  {
    id: "brand-system",
    index: "03",
    division: "Create",
    archetype: "Complete Brand & Packaging System",
    title: "Distinctive Visual Identity & Campaign Kit",
    problem:
      "Blending into a crowded market with generic templates kills brand recall before a customer ever reads your pitch.",
    architect:
      "Custom logo marks, bold typography systems, color tokens, packaging mockups, and launch poster series built to command attention online and offline.",
    stack: ["Brand Strategy", "Logo & Identity", "Print & Digital Art Direction"],
  },
  {
    id: "booking-platform",
    index: "04",
    division: "Build",
    archetype: "High-Speed Web Platform & Booking Engine",
    title: "Conversion-First Web App with Integrated Scheduling",
    problem:
      "Slow brochure websites leak high-intent visitors who want to book, pay, or inquire immediately.",
    architect:
      "Sub-second responsive web experience with embedded appointment booking, automated WhatsApp/email confirmations, and technical SEO foundations.",
    stack: ["Next.js", "Custom API Integrations", "Performance & SEO"],
  },
  {
    id: "ecommerce-flow",
    index: "05",
    division: "Design",
    archetype: "Story-Driven E-Commerce Experience",
    title: "High-Converting Product Discovery & Checkout Flow",
    problem:
      "High cart abandonment caused by clunky mobile navigation and uninspiring product pages.",
    architect:
      "Mobile-first storefront UI, interactive product configurators, streamlined 2-step checkout UX, and modular merchandising blocks.",
    stack: ["E-Commerce UX", "Conversion Optimization", "Responsive UI"],
  },
  {
    id: "growth-engine",
    index: "06",
    division: "Grow",
    archetype: "Full-Funnel Meta Ads & Launch Engine",
    title: "Targeted Acquisition & Creative Testing System",
    problem:
      "Burning ad budget on boosted posts without tracking what actually turns clicks into paying customers.",
    architect:
      "Structured Meta Ads campaigns (awareness to retargeting), scroll-stopping creative variations, conversion-aligned landing pages, and clear ROAS reporting.",
    stack: ["Meta Ads", "Funnel Strategy", "Ad Creative", "Conversion Analytics"],
  },
];

export const blueprintPoints = [
  {
    title: "2+ Years of Shipped Craft",
    text: "Built by developers, designers, and strategists who have already shipped production systems—now unified under one roof.",
  },
  {
    title: "Zero Legacy Bloat",
    text: "You don't get passed to junior account managers. You work directly with the builders designing and coding your product.",
  },
  {
    title: "Founding Partner Advantage",
    text: "Early MADBYTE partners get direct senior attention, rapid iteration cycles, and priority execution.",
  },
] as const;
