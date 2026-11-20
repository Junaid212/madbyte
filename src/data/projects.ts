export type Category = "Development" | "UI/UX" | "Branding" | "Marketing";
export type ArtKind =
  | "grid"
  | "arcs"
  | "bars"
  | "orbit"
  | "stripes"
  | "blocks"
  | "waves"
  | "poster";
export type ArtTheme = "navy" | "navy2" | "ivory" | "champagne" | "mist";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  /** Always true until real client work is supplied. */
  concept: boolean;
  tagline: string;
  summary: string;
  services: string[];
  year: string;
  art: { kind: ArtKind; theme: ArtTheme };
  overview: string;
  challenge: string;
  approach: string[];
  solution: string;
  /** Concept goals. Replace with measured results once real work exists. */
  outcomes: { label: string; text: string }[];
}

export const categories = ["All", "Development", "UI/UX", "Branding", "Marketing"] as const;

export const projects: Project[] = [
  {
    slug: "ledgerline-erp",
    title: "Ledgerline",
    category: "Development",
    concept: true,
    tagline: "An ERP for distributors that doesn't feel like one.",
    summary: "Inventory, orders and invoicing in one calm, fast workspace.",
    services: ["MADBYTE BUILD", "MADBYTE DESIGN"],
    year: "Concept 2025",
    art: { kind: "grid", theme: "navy" },
    overview:
      "Ledgerline is a concept ERP for mid-sized wholesale distributors who currently juggle spreadsheets, a legacy accounting tool and a lot of email. The brief we set ourselves: make a system a warehouse manager would choose to open.",
    challenge:
      "Distribution businesses run on dozens of small decisions: what to reorder, who owes what, which order ships first. Existing ERPs bury those decisions under menus built for accountants.",
    approach: [
      "Mapped the order-to-cash journey and marked every moment someone leaves the system to use a spreadsheet.",
      "Designed around the daily questions, not the database tables: What's late? What's low? Who hasn't paid?",
      "Built a modular architecture so inventory, purchasing and invoicing can ship independently.",
    ],
    solution:
      "A single workspace with a command bar, live stock levels, one-click purchase orders and an invoicing flow that fills itself from the order. Role-based views keep each person looking at only what they need.",
    outcomes: [
      { label: "Goal", text: "Cut order entry to a handful of clicks" },
      { label: "Goal", text: "Surface low stock before it becomes a lost sale" },
      { label: "Goal", text: "Give finance a daily close in minutes, not hours" },
    ],
  },
  {
    slug: "tidepool-banking-app",
    title: "Tidepool",
    category: "UI/UX",
    concept: true,
    tagline: "Money management for people who find banking apps stressful.",
    summary: "A mobile banking concept built around calm and clarity.",
    services: ["MADBYTE DESIGN"],
    year: "Concept 2025",
    art: { kind: "waves", theme: "champagne" },
    overview:
      "Tidepool is a mobile banking interface concept that treats financial anxiety as a design problem. Fewer numbers shouting, more context and gentle guidance.",
    challenge:
      "Most banking apps open on a wall of figures. For many people that triggers avoidance, which is the opposite of what a money tool should do.",
    approach: [
      "Studied how people check their balance: quickly, often with a little dread.",
      "Reframed the home screen as 'what's safe to spend today'.",
      "Prototyped in Figma and refined motion so changes feel gentle rather than abrupt.",
    ],
    solution:
      "A home screen led by one reassuring number, a timeline that explains upcoming bills in plain English, and spending insights that read like a friendly note, not a spreadsheet.",
    outcomes: [
      { label: "Goal", text: "Make the first screen answer one question well" },
      { label: "Goal", text: "Reduce 'what is this charge?' confusion with plain-language labels" },
      { label: "Goal", text: "Deliver a complete, tested Figma prototype" },
    ],
  },
  {
    slug: "oddly-good-coffee",
    title: "Oddly Good Coffee",
    category: "Branding",
    concept: true,
    tagline: "A roastery brand with a sense of humour.",
    summary: "Identity, packaging and poster system for a specialty roaster.",
    services: ["MADBYTE CREATE"],
    year: "Concept 2025",
    art: { kind: "poster", theme: "ivory" },
    overview:
      "A fictional specialty coffee roaster that takes its beans seriously and itself not at all. The identity pairs a precise typographic system with irreverent, slightly odd illustration.",
    challenge:
      "Specialty coffee branding tends towards the same kraft-paper-and-serif look. We wanted something unmistakable on a crowded shelf.",
    approach: [
      "Built the name and voice first: dry, warm, a bit cheeky.",
      "Developed a flexible mark that can be cropped, stacked and stamped.",
      "Designed a packaging system where each roast gets its own pattern.",
    ],
    solution:
      "A bold wordmark, a rotating set of roast patterns, a poster series and a tone of voice guide. Everything runs from a small kit of shapes and one loud colour.",
    outcomes: [
      { label: "Goal", text: "Stand out on a shelf at three metres" },
      { label: "Goal", text: "A system that scales to new roasts without a redesign" },
      { label: "Goal", text: "A complete brand guideline ready for print vendors" },
    ],
  },
  {
    slug: "orbit-clinic-website",
    title: "Orbit Clinic",
    category: "Development",
    concept: true,
    tagline: "A clinic website that books appointments before you finish reading.",
    summary: "Fast, accessible website with booking built into the page.",
    services: ["MADBYTE BUILD", "MADBYTE DESIGN"],
    year: "Concept 2025",
    art: { kind: "orbit", theme: "navy2" },
    overview:
      "A concept website for a multi-specialty clinic. Patients usually arrive on a phone, often in a hurry, and want three things: services, hours, and a way to book.",
    challenge:
      "Clinic sites tend to be slow, cluttered and hard to use on mobile, exactly where most visitors are.",
    approach: [
      "Mobile-first layouts with the booking action always one thumb away.",
      "Plain-language service pages written for patients, not clinicians.",
      "Accessibility treated as a baseline: contrast, keyboard use, screen readers.",
    ],
    solution:
      "A lightweight Next.js site with a sticky booking sheet, specialist profiles, transparent pricing pages and a content structure the clinic's team can edit themselves.",
    outcomes: [
      { label: "Goal", text: "Booking reachable in two taps from any page" },
      { label: "Goal", text: "Target a high Lighthouse performance and accessibility score" },
      { label: "Goal", text: "Editable content without developer help" },
    ],
  },
  {
    slug: "kiln-and-co-store",
    title: "Kiln & Co.",
    category: "UI/UX",
    concept: true,
    tagline: "An online ceramics shop where the pots do the talking.",
    summary: "E-commerce experience designed around product storytelling.",
    services: ["MADBYTE DESIGN", "MADBYTE CREATE"],
    year: "Concept 2025",
    art: { kind: "blocks", theme: "mist" },
    overview:
      "A concept online store for a small-batch ceramics studio. Each piece is handmade and one of a kind, which most e-commerce templates handle badly.",
    challenge:
      "Standard product grids treat a one-off vase like a pack of socks. The craft, and the reason to pay more for it, gets lost.",
    approach: [
      "Gave each piece its own page with the maker's notes, dimensions and a short story.",
      "Designed a drop-based browsing model: new batches appear, sell and retire.",
      "Kept checkout brutally short.",
    ],
    solution:
      "An editorial storefront with large photography, a calm layout, a 'one of one' availability indicator and a three-step checkout.",
    outcomes: [
      { label: "Goal", text: "Make scarcity and craft visible without pressure tactics" },
      { label: "Goal", text: "Checkout in three steps or fewer" },
      { label: "Goal", text: "A reusable component library for future drops" },
    ],
  },
  {
    slug: "saffron-row-campaign",
    title: "Saffron Row",
    category: "Marketing",
    concept: true,
    tagline: "A launch campaign for a restaurant that hasn't opened yet.",
    summary: "Meta Ads and social concept for a new neighbourhood restaurant.",
    services: ["MADBYTE GROW", "MADBYTE CREATE"],
    year: "Concept 2025",
    art: { kind: "stripes", theme: "champagne" },
    overview:
      "A concept launch campaign for a fictional restaurant. Goal: fill the first month of tables using local social and paid media, without discounting the brand.",
    challenge:
      "New restaurants have no reviews, no regulars and no photos. They need local attention fast and on a modest budget.",
    approach: [
      "Defined three audience groups within a short drive and wrote a hook for each.",
      "Planned a four-week teaser sequence building to opening night.",
      "Set up a test structure for creative, audience and offer.",
    ],
    solution:
      "A phased campaign: curiosity, menu reveal, reservations. It includes ad creative, a content calendar, a lightweight landing page and a weekly reporting template.",
    outcomes: [
      { label: "Goal", text: "A clear test plan that finds the best-performing hook within two weeks" },
      { label: "Goal", text: "Reservations tracked from ad to booking" },
      { label: "Goal", text: "Reusable creative templates for ongoing promotion" },
    ],
  },
  {
    slug: "fieldnote-mobile-app",
    title: "Fieldnote",
    category: "Development",
    concept: true,
    tagline: "A mobile app for engineers who work where Wi-Fi doesn't.",
    summary: "Offline-first field service app for inspections and reports.",
    services: ["MADBYTE BUILD", "MADBYTE DESIGN"],
    year: "Concept 2025",
    art: { kind: "bars", theme: "navy" },
    overview:
      "A concept mobile app for field technicians who capture inspections, photos and signatures on site, often with no signal.",
    challenge:
      "Paper forms get lost and re-typed. Cloud-only apps fail in basements, plant rooms and rural sites.",
    approach: [
      "Designed offline-first, so every action works without a connection and syncs later.",
      "Used large touch targets and high contrast for gloves and daylight.",
      "Generated the final report automatically from captured data.",
    ],
    solution:
      "A React Native app with local storage, background sync, photo annotation and instant PDF reports, plus a web dashboard for office staff.",
    outcomes: [
      { label: "Goal", text: "Work fully without a connection" },
      { label: "Goal", text: "Remove double-entry between site and office" },
      { label: "Goal", text: "Reports ready before the technician leaves site" },
    ],
  },
  {
    slug: "parallel-pulse-brand",
    title: "Parallel Pulse",
    category: "Branding",
    concept: true,
    tagline: "A visual identity for a music-tech start-up.",
    summary: "Brand identity, motion language and campaign visuals.",
    services: ["MADBYTE CREATE", "MADBYTE GROW"],
    year: "Concept 2025",
    art: { kind: "arcs", theme: "navy2" },
    overview:
      "A concept identity for a fictional start-up building collaborative tools for musicians. It needed to feel technical and human in equal measure.",
    challenge:
      "Music-tech brands tend towards neon gradients and waveforms. We wanted something more distinctive and more grown-up.",
    approach: [
      "Used rhythm, repetition and offset as the central visual idea.",
      "Created a pulse-based logo that animates for digital and holds still in print.",
      "Wrote launch campaign concepts around real musician pain points.",
    ],
    solution:
      "A modular logo, a restrained palette, a motion library and a set of launch visuals tested across social, web and print.",
    outcomes: [
      { label: "Goal", text: "A mark that works at favicon size and festival-banner size" },
      { label: "Goal", text: "A motion language the product team can reuse" },
      { label: "Goal", text: "Launch assets across the main social formats" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
