export const processSteps = [
  {
    num: "01",
    title: "Discover",
    text: "We start by listening, then asking the awkward questions. Goals, users, constraints, competitors. By the end we know your business well enough to argue with it.",
  },
  {
    num: "02",
    title: "Strategise",
    text: "Insights become a plan: what to make, in what order, measured how. You get a clear roadmap and an honest estimate, no fog.",
  },
  {
    num: "03",
    title: "Design",
    text: "Sketches, systems and prototypes you can click. We test early and change our minds cheaply, long before anything is built.",
  },
  {
    num: "04",
    title: "Develop",
    text: "Clean code, regular demos and no black boxes. You see progress every week and nothing surprising at the end.",
  },
  {
    num: "05",
    title: "Launch & Grow",
    text: "We ship carefully, then stay close: measuring, improving and finding the next thing worth building.",
  },
] as const;

export const pillars = [
  { title: "Creative thinking", text: "Ideas with a point of view. We'd rather be remembered than merely approved." },
  { title: "Intelligent technology", text: "The right tools, chosen for the job. Not the trendy ones, the ones that hold up." },
  { title: "Business strategy", text: "Every decision tied to something your business actually needs to achieve." },
] as const;

export const mindsValues = [
  { title: "Creativity", text: "Designers and brand thinkers who refuse the first idea." },
  { title: "Technical thinking", text: "Engineers who ask 'what happens at ten times the traffic?' before it matters." },
  { title: "Collaboration", text: "No handoffs into the void. Strategy, design and code sit at the same table." },
  { title: "Attention to detail", text: "Spacing, copy, edge cases, error states. We obsess so you don't have to." },
  { title: "Reliable execution", text: "Clear timelines, regular updates, work that ships when we said it would." },
] as const;

/** PLACEHOLDER testimonials. Replace with real, permissioned quotes. */
export const testimonials = [
  {
    quote:
      "This is where a real client quote goes. Keep it short, specific and about the outcome, not the adjectives.",
    name: "Client Name",
    role: "Role, Company",
  },
  {
    quote:
      "Swap in a second endorsement from a project you've actually delivered, ideally with the client's written permission.",
    name: "Client Name",
    role: "Role, Company",
  },
  {
    quote:
      "A third voice. Different industry, different service, same structure: what changed after working with you.",
    name: "Client Name",
    role: "Role, Company",
  },
] as const;

/** PLACEHOLDER founder profiles. Edit freely. */
export const team = [
  { name: "Founder Name 01", role: "Creative Director", bio: "Placeholder bio. Leads concept and art direction. Add two lines about background and what they obsess over." },
  { name: "Founder Name 02", role: "Technology Lead", bio: "Placeholder bio. Owns architecture and engineering standards. Add a favourite stack and a strong opinion." },
  { name: "Founder Name 03", role: "Design Lead", bio: "Placeholder bio. Shapes product and interaction design. Add a line about their process." },
  { name: "Founder Name 04", role: "Brand Lead", bio: "Placeholder bio. Builds identities and voices. Add notable categories or a signature approach." },
  { name: "Founder Name 05", role: "Growth Lead", bio: "Placeholder bio. Runs campaigns and analytics. Add the channels they know best." },
  { name: "Founder Name 06", role: "Delivery Lead", bio: "Placeholder bio. Keeps projects honest and on time. Add how they keep clients calm." },
] as const;

export const values = [
  { title: "Be a little mad", text: "Challenge the default. Ask the question nobody asked." },
  { title: "Make it properly", text: "Polish is a form of respect for the people who use it." },
  { title: "Say it plainly", text: "Honest scope, honest feedback, no jargon fog." },
  { title: "Stay curious", text: "New tools, new crafts, new industries. We never finish learning." },
  { title: "Own the outcome", text: "Done means working for your business, not just launched." },
] as const;

export const budgets = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"] as const;
export const timelines = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Flexible"] as const;
export const serviceOptions = [
  "MADBYTE BUILD",
  "MADBYTE DESIGN",
  "MADBYTE CREATE",
  "MADBYTE GROW",
  "A mix of everything",
  "Not sure yet",
] as const;
