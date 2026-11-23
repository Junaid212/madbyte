"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blueprintFilters, blueprints } from "@/data/blueprints";
import { cn } from "@/lib/cn";
import { BlueprintCard } from "./BlueprintCard";

type Filter = (typeof blueprintFilters)[number];

export function BlueprintGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? blueprints : blueprints.filter((b) => b.division === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter blueprints by division" className="flex flex-wrap gap-2 md:gap-3">
        {blueprintFilters.map((f) => {
          const active = f === filter;
          const count = f === "All" ? blueprints.length : blueprints.filter((b) => b.division === f).length;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                "label rounded-full border px-5 py-3 transition-colors duration-300",
                active ? "border-navy bg-navy text-ivory" : "border-navy/40 text-navy hover:border-navy",
              )}
            >
              {f} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {list.length} {filter === "All" ? "" : filter} blueprints
      </p>

      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        <AnimatePresence mode="popLayout">
          {list.map((b) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlueprintCard b={b} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
