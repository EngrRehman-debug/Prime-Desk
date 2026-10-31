import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const LAST_UPDATED = new Date("2026-10-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority,
  }));
}
