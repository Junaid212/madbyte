"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = (typeof categories)[number];

// Repeating editorial rhythm: wide, narrow, narrow, wide...
const rhythm = [
  { span: "md:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "md:mt-24" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "md:col-span-7", aspect: "aspect-[4/3]", offset: "md:mt-24" },
];

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((c) => {
          const active = c === filter;
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c)}
              className={cn(
                "label rounded-full border px-5 py-3 transition-colors duration-300",
                active
                  ? "border-navy bg-navy text-ivory"
                  : "border-navy/40 text-navy hover:border-navy",
              )}
            >
              {c} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {list.length} {filter === "All" ? "" : filter} projects
      </p>

      <motion.div layout className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-20">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => {
            const r = rhythm[i % rhythm.length];
            return (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(r.span, r.offset)}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} aspect={r.aspect} tone="light" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
