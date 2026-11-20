# MADBYTE

Marketing site for **MADBYTE**, an independent creative technology agency.
*A Little Mad. A Lot Brilliant.*

Next.js (App Router) · React · strict TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · Embla Carousel · Lucide.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm start        # serve the production build
npm run lint
```

Optional env vars (`.env.local`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and Open Graph (e.g. `https://madbyte.com`) |
| `CONTACT_WEBHOOK_URL` | Where the contact form posts enquiries (see below) |

## Routes

`/` · `/about` · `/services` (anchors `#build #design #create #grow`) · `/work` · `/work/[slug]` · `/contact`
Plus `not-found`, `error`, `loading`, `sitemap.xml`, `robots.txt` and a generated Open Graph image.

## Architecture

```
src/
  app/            routes, metadata, sitemap/robots/OG image, api/contact
  components/
    layout/       Header, MobileMenu (inside Header), Footer, SmoothScroll, PageTransition, ScrollProgress, Logo
    ui/           SplitText, Reveal, ScrubText, Counter, Parallax, Divider, MagneticButton,
                  Marquee, Cursor, ProjectArt, ServiceArt, CarouselControls, CtaBand, PageHero
    home/         Hero, HeroVisual, Intro, ServicesStack, FeaturedWork, WhyMadbyte, ProcessHorizontal, Testimonials
    work/         ProjectCard, WorkGallery
    services/     ServiceBlocks (one distinct composition per division)
    about/        TeamAvatar
    contact/      ContactForm
  data/           site.ts, services.ts, projects.ts, content.ts   <- all editable content
  hooks/          useScrollMotion, useFinePointer, useIsoLayoutEffect
  lib/            gsap.ts (plugin registration), validation.ts (shared client/server), cn.ts
```

Pages are server components. Only interactive pieces (animation wrappers, carousels, header, form) are client components.

## How the animation is wired

- **One frame loop.** `SmoothScroll` creates a single Lenis instance with `autoRaf: false`, advances it from `gsap.ticker`, and calls `ScrollTrigger.update` on Lenis scroll events. `gsap.ticker.lagSmoothing(0)` keeps them in step. Cleanup removes the ticker callback and destroys Lenis.
- **Route changes.** `SmoothScroll` jumps to the top (or the `#hash` target) and refreshes ScrollTrigger on every pathname change, and again after fonts load. Lenis `anchors` handles same-page `#links`.
- **Scoped GSAP.** Every animation goes through `useScrollMotion`, which wraps `gsap.context` + `gsap.matchMedia`. Nothing runs under `prefers-reduced-motion`, desktop-only effects (parallax, stacked service panels, horizontal process) only run at ≥1024px, and everything is reverted on unmount.
- **No flash of hidden content.** An inline script in `layout.tsx` adds `html.anim` only when motion is allowed. CSS in `globals.css` hides elements for entrance animations under `.anim` only, so reduced-motion and no-JS visitors see everything.
- **Page transitions.** `PageTransition` plays a navy curtain (framer-motion) around `router.push`. Use `TransitionLink` instead of `next/link` for internal links. Skipped for reduced motion.
- **Horizontal process / stacked services** use CSS `position: sticky` plus a scrubbed transform. No DOM pinning, so React stays happy.
- **Cursor.** A decorative ring only for mouse/trackpad users; the native cursor is never hidden. Opt elements in with `data-cursor="Label"`.

## Replace the demo content

| What | Where |
| --- | --- |
| Email, phone, address, social links | `src/data/site.ts` (all placeholders) |
| Services copy, deliverables, benefits | `src/data/services.ts` |
| Projects (currently **concept** projects) | `src/data/projects.ts` |
| Founders, testimonials, values, process, form options | `src/data/content.ts` |

**Projects.** Each entry has `concept: true` and generative artwork (`art`), because no real work was supplied. When you have real work: add the entry, set `concept: false`, replace `ProjectArt` with `next/image` in `ProjectCard.tsx` and the detail page, and swap the "Goal" outcomes for measured results. The "Concept project" badges and the page copy that says so should be updated at the same time.

**Testimonials and team** are labelled placeholders. Do not publish names, quotes or photos without permission.

## Contact form backend

`src/components/contact/ContactForm.tsx` validates in the browser (accessible errors, focus on first invalid field) and posts to `src/app/api/contact/route.ts`, which re-validates on the server and has a honeypot field.

**Nothing is stored or emailed until you configure delivery.** With no integration the API returns `501` and the form tells the visitor their message was *not* sent and shows the email address.

To connect it:

1. **Webhook:** set `CONTACT_WEBHOOK_URL` (Zapier, Make, n8n, Slack incoming webhook...). The JSON payload is posted as-is.
2. **Direct integration:** edit `deliver()` in the route, e.g. with [Resend](https://resend.com):

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "MADBYTE <noreply@yourdomain.com>",
  to: "hello@yourdomain.com",
  replyTo: payload.email,
  subject: `New enquiry from ${payload.name}`,
  text: JSON.stringify(payload, null, 2),
});
return "sent";
```

Consider adding rate limiting or a CAPTCHA before launch.

## Notes

- Brand colours are tokens in `globals.css` (`navy`, `navy-2`, `ivory`, `mist`, `champagne`) and available as Tailwind utilities.
- Fonts (Bricolage Grotesque, DM Sans, JetBrains Mono) load via `next/font`.
- This build uses a newer Next.js than many guides assume. See `node_modules/next/dist/docs/` and `AGENTS.md` before changing framework conventions.
