import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/services", "/work", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...work];
}
