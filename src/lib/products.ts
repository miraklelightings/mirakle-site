import tech from "@/content/products.json";
import ql from "@/content/products_ql.json";

export type Img = { src: string; w: number; h: number; title?: string };
export type Table = { title: string; head?: string[]; rows?: string[][]; pairs?: string[][] };
export type Product = {
  slug: string; name: string; chapter: string; family: string; kind: string; group: string; page: number; ext?: string | null;
  tagline: string; intro: string; where?: string; techIntro?: string;
  badges: string[][]; highlights?: { label: string; lines: string[] }[];
  hero: Img | null; card?: Img | null; photo?: Img; tables: Table[]; notes: string[]; drawings: Img[];
};
export const TECH = tech as unknown as Product[];
export const QL = ql as unknown as Product[];

// Pages that were designed by hand keep their own address.
const OWN: Record<string, string> = { titan: "/architectural/titan/" };
export const hrefOf = (p: Product) => p.ext || OWN[p.slug] || (p.kind === "ql" ? `/quiklit/${p.slug}/` : `/architectural/${p.slug}/`);
export const hasOwnPage = (p: Product) => Boolean(p.ext || OWN[p.slug]);
export const title = (p: Product) => (p.kind === "elva" ? `ELVA 5 ${p.name}` : p.kind === "strip" && p.name !== "OPTIPRO" ? `OPTIPRO ${p.name}` : p.name);

export const CHAPTERS = [
  { id: "magnetic", n: "01", name: "Magnetic lighting", line: "ELVA 5, an ultra-slim 48 V magnetic track. Light modules sit in the track; spots, grilles, a marble globe and a speaker click on by magnet.", more: "/architectural/elva-5/" },
  { id: "spotlights", n: "02", name: "Spotlights", line: "Nineteen series of COB spotlights, wall washers and linear lights: recessed, surface and modular, each with its LED driver.", more: "" },
  { id: "linear", n: "03", name: "Linear", line: "OPTIPRO LED strips, the CURVA 3D neon band, the ARCUS façade grazer and SKYLIT modules for stretch ceilings.", more: "/architectural/linear/" },
  { id: "drivers", n: "04", name: "LED drivers", line: "Six families of constant-voltage LED drivers, 24 V and 48 V, indoor and IP67, rated for 100% load.", more: "/architectural/drivers/" },
];
export function grouped(list: Product[]) {
  const out: { group: string; items: Product[] }[] = [];
  for (const p of list) { const g = out.find((x) => x.group === p.group); if (g) g.items.push(p); else out.push({ group: p.group, items: [p] }); }
  return out;
}
