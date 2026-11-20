import type { MetadataRoute } from "next";
import { DECO, FAMILIES, MATERIALS } from "@/lib/deco";
import { QL, TECH, hasOwnPage } from "@/lib/products";

export const dynamic = "force-static";
const BASE = "https://www.miraklelightings.com";
// Every page a visitor can reach, with the catalogue edition as its last change. Earlier addresses that only redirect are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const day = new Date("2026-11-19");
  const u = (path: string, priority: number, images?: string[]) => ({ url: BASE + path, lastModified: day, changeFrequency: "monthly" as const, priority, ...(images && images.length ? { images: images.map((i) => BASE + i) } : {}) });
  return [
    u("/", 1),
    u("/architectural/", 0.9), u("/quiklit/", 0.9), u("/decorative/", 0.9),
    u("/architectural/elva-5/", 0.8), u("/architectural/linear/", 0.8), u("/architectural/drivers/", 0.8), u("/architectural/titan/", 0.8),
    u("/quiklit/1707/", 0.8), u("/quiklit/boq/", 0.8),
    u("/about/", 0.6), u("/contact/", 0.6), u("/downloads/", 0.6),
    ...TECH.filter((p) => !hasOwnPage(p)).map((p) => u(`/architectural/${p.slug}/`, 0.7, p.hero ? [p.hero.src] : [])),
    ...QL.filter((p) => !hasOwnPage(p)).map((p) => u(`/quiklit/${p.slug}/`, 0.7, p.hero ? [p.hero.src] : [])),
    ...FAMILIES.map((f) => u(`/decorative/${f.id}/`, 0.8, [f.cover])),
    ...MATERIALS.map((m) => u(`/decorative/${m.id}/`, 0.5)),
    ...DECO.map((d) => u(`/decorative/${d.slug}/`, 0.6, [d.img.src])),
  ];
}
