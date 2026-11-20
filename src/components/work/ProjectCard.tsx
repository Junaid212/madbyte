import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ProjectArt, invertTheme } from "@/components/ui/ProjectArt";

interface Props {
  project: Project;
  index: number;
  /** Tailwind aspect utility for the image area. */
  aspect?: string;
  className?: string;
  cursor?: string;
  tone?: "dark" | "light";
}

/**
 * Image-led project tile. Hover: art zooms, a second palette wipes up over it
 * and a "View" disc follows in. Server component, CSS-only interaction.
 */
export function ProjectCard({ project: p, index, aspect = "aspect-[4/5]", className, cursor = "View", tone = "dark" }: Props) {
  return (
    <TransitionLink
      href={`/work/${p.slug}`}
      draggable={false}
      className={cn("group block text-left", className)}
      aria-label={`${p.title}, ${p.category} concept project`}
    >
      <div data-cursor={cursor} className={cn("relative overflow-hidden", aspect)}>
        <ProjectArt
          kind={p.art.kind}
          theme={p.art.theme}
          className="absolute inset-0 size-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]"
        />
        <div
          aria-hidden
          className="absolute inset-0 [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
        >
          <ProjectArt
            kind={p.art.kind}
            theme={invertTheme[p.art.theme]}
            className="size-full scale-[1.08] transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100"
          />
        </div>

        <span className="label absolute left-4 top-4 bg-navy px-3 py-1.5 text-[0.62rem] text-champagne">
          Concept project
        </span>
        <span className="display absolute bottom-3 right-4 text-[clamp(3rem,7vw,6rem)] leading-none text-ivory mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className={cn("label", tone === "light" ? "text-navy-2" : "text-champagne")}>{p.category}</p>
          <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-none">
            <span className="u-link">{p.title}</span>
          </h3>
        </div>
      </div>
      <p className="mt-3 max-w-md text-sm opacity-75">{p.summary}</p>
    </TransitionLink>
  );
}
