export type ServiceId = "build" | "design" | "create" | "grow";

export interface Service {
  id: ServiceId;
  num: string;
  name: string;
  division: string;
  kicker: string;
  headline: string;
  short: string;
  description: string;
  offerings: string[];
  deliverables: string[];
  benefits: { title: string; text: string }[];
  related: { id: ServiceId; why: string }[];
}

export const services: Service[] = [
  {
    id: "build",
    num: "01",
    name: "MADBYTE BUILD",
    division: "Build",
    kicker: "Software that earns its keep",
    headline: "We make the complicated feel simple.",
    short:
      "Websites, web apps, mobile apps and ERP systems, engineered so your team spends less time wrestling software and more time growing.",
    description:
      "Behind every smooth screen is a lot of unglamorous engineering. We do that part properly: clean architecture, honest estimates and software that still behaves in year three. From a sharp marketing site to an ERP that runs a whole operation, we build it to last and to be pleasant to use.",
    offerings: [
      "Web development",
      "Web applications",
      "Mobile applications",
      "ERP systems",
      "Custom software",
      "Automation",
    ],
    deliverables: [
      "Production-ready websites and web apps",
      "iOS and Android applications",
      "ERP modules: inventory, finance, HR, logistics",
      "API design and third-party integrations",
      "Workflow automation that replaces manual busywork",
      "Documentation, handover and support plans",
    ],
    benefits: [
      {
        title: "Fewer manual hours",
        text: "Automation takes over the repetitive work that eats your team's week.",
      },
      {
        title: "One source of truth",
        text: "Systems that talk to each other, so nobody reconciles spreadsheets at midnight.",
      },
      {
        title: "Built to scale",
        text: "Architecture chosen for where the business is going, not just where it is today.",
      },
    ],
    related: [
      { id: "design", why: "Software people actually enjoy using starts with considered UX." },
      { id: "grow", why: "Instrument what we build so growth can be measured, not guessed." },
    ],
  },
  {
    id: "design",
    num: "02",
    name: "MADBYTE DESIGN",
    division: "Design",
    kicker: "Interfaces with opinions",
    headline: "Good ideas deserve better execution.",
    short:
      "UI/UX, product design and interaction design that makes products feel obvious to use and hard to forget.",
    description:
      "Design is how a product behaves, not just how it looks. We research, sketch, prototype and test until the interface disappears and the task just gets done. Then we add the small moments of delight that make people remember it.",
    offerings: [
      "UI/UX design",
      "Figma prototypes",
      "Product design",
      "Interaction design",
      "Digital experiences",
      "Design systems",
    ],
    deliverables: [
      "User flows, wireframes and clickable Figma prototypes",
      "High-fidelity interface design for web and mobile",
      "Component libraries and design systems",
      "Motion and interaction specifications",
      "Usability testing and iteration notes",
      "Developer-ready handoff files",
    ],
    benefits: [
      {
        title: "Less friction, more conversion",
        text: "Clear journeys that guide people to the thing you want them to do.",
      },
      {
        title: "Decisions you can defend",
        text: "Every choice backed by a reason, a test or a user, not a hunch.",
      },
      {
        title: "A product people talk about",
        text: "Distinctive interaction that sets you apart from the template crowd.",
      },
    ],
    related: [
      { id: "build", why: "We design with the build in mind, so what you approve is what ships." },
      { id: "create", why: "Brand and interface share one visual language from day one." },
    ],
  },
  {
    id: "create",
    num: "03",
    name: "MADBYTE CREATE",
    division: "Create",
    kicker: "Brands with a pulse",
    headline: "Ordinary wasn't part of the brief.",
    short:
      "Brand identity, logos, graphic design and campaign creative with enough character to be noticed and enough discipline to last.",
    description:
      "A brand is a promise you keep in public. We find the sharp, true thing about your business and turn it into a name, a mark, a voice and a visual system that works from a favicon to a billboard.",
    offerings: [
      "Brand identity",
      "Logo design",
      "Graphic design",
      "Posters",
      "Creative campaigns",
      "Visual communication",
    ],
    deliverables: [
      "Brand strategy, positioning and tone of voice",
      "Logo suite with usage guidelines",
      "Colour, type and layout systems",
      "Posters, print and social creative",
      "Campaign concepts and key visuals",
      "Brand guidelines and template kits",
    ],
    benefits: [
      {
        title: "Instantly recognisable",
        text: "A look and voice that people can spot with the logo covered.",
      },
      {
        title: "Consistent everywhere",
        text: "Systems and templates so every touchpoint feels like the same company.",
      },
      {
        title: "Premium perception",
        text: "Craft that lets you charge, and be trusted, like the leader you are becoming.",
      },
    ],
    related: [
      { id: "design", why: "Identity extends naturally into product and interface." },
      { id: "grow", why: "Campaign creative is built to perform, not just to look good." },
    ],
  },
  {
    id: "grow",
    num: "04",
    name: "MADBYTE GROW",
    division: "Grow",
    kicker: "Attention that turns into customers",
    headline: "Your business has potential. Let's give it a digital presence.",
    short:
      "Digital marketing, Meta Ads, social strategy and campaign management focused on measurable business growth.",
    description:
      "Launching is the starting line. We plan the channels, craft the creative, run the campaigns and read the numbers honestly, then double down on what works and drop what doesn't.",
    offerings: [
      "Digital marketing",
      "Meta Ads",
      "Social media strategy",
      "Campaign management",
      "Online business growth",
      "Analytics & reporting",
    ],
    deliverables: [
      "Channel strategy and quarterly growth plans",
      "Meta Ads setup, creative testing and optimisation",
      "Content calendars and social direction",
      "Landing pages and conversion tracking",
      "Monthly performance reports in plain language",
      "Ongoing experiments and recommendations",
    ],
    benefits: [
      {
        title: "Spend that's accountable",
        text: "Every pound or dollar tied to a goal, with reporting you can actually read.",
      },
      {
        title: "Learning loops",
        text: "Small, constant tests that make each campaign smarter than the last.",
      },
      {
        title: "Creative and data together",
        text: "The same team that makes the ads reads the results.",
      },
    ],
    related: [
      { id: "create", why: "Strong creative is the cheapest way to improve ad performance." },
      { id: "build", why: "Landing pages, tracking and funnels built by the same hands." },
    ],
  },
];

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;
