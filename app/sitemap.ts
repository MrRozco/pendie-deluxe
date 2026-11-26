import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((l) => ({
    url: new URL(l.href, site.url).toString(),
    changeFrequency: "monthly",
    priority: l.href === "/" ? 1 : l.href === "/contact" ? 0.9 : 0.7,
  }));
}
