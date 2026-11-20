import { nav, site } from "@/data/site";
import { services } from "@/data/services";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Logo } from "./Logo";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-ivory">
      <div className="container-x pt-20 md:pt-14">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="h-12" />
            <p className="mt-6 max-w-sm text-lead text-ivory/80">{site.tagline}</p>
            <p className="label mt-3 text-champagne">{site.positioning}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="label text-champagne">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="u-link">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="label text-champagne">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <TransitionLink href={`/services#${s.id}`} className="u-link">
                    {s.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label text-champagne">Say hello</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="u-link break-all">
                  {site.email}
                </a>
              </li>
              <li className="text-ivory/70">{site.location}</li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="u-link text-sm">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FooterWordmark />

        <div className="flex flex-col gap-2 border-t border-ivory/15 py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} MADBYTE. All rights reserved.</p>
          <p>Demo projects on this site are concepts, not client work.</p>
        </div>
      </div>
    </footer>
  );
}
