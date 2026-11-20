import data from "@/content/products_deco.json";
import redirects from "@/content/deco_redirects.json";

// Decorative collection: every design in the MIRAKLE Decorative Catalogue 2027–28, under its name and order codes.
export type DImg = { src: string; w: number; h: number };
export type DVariant = { code: string; finish: string; material: string; size: string; source: string; dims: DImg[] };
export type DItem = { slug: string; name: string; sub: string; family: string; kind: string; page: number; codes: string[]; variants: DVariant[]; spec: [string, string][]; img: DImg; scenes: DImg[]; extra: DImg[]; draw: DImg[]; tags: string[] };
export const DECO = data as unknown as DItem[];
// Earlier addresses (by order code, and the six earlier families) and where each one goes now.
export const DECO_REDIRECTS = redirects as Record<string, string>;

// The five chapters of the catalogue, in its order and with its names.
export const FAMILIES = [
  { id: "pendant", no: "01", name: "Pendant lights", short: "Pendant", one: "Pendant light", cover: "/img/deco/ch-pendant.jpg", line: "Single pieces and clusters over tables, islands and stairwells." },
  { id: "hanging", no: "02", name: "Hanging lights", short: "Hanging", one: "Hanging light", cover: "/img/deco/ch-hanging.jpg", line: "Linear lights, rings and chandeliers for dining rooms, lobbies and double heights." },
  { id: "wall-ceiling", no: "03", name: "Wall and ceiling lights", short: "Wall & ceiling", one: "Wall or ceiling light", cover: "/img/deco/ch-wall.jpg", line: "Wall lights and surface ceiling lights for bedrooms, passages and living rooms." },
  { id: "lamps", no: "04", name: "Table and floor lamps", short: "Lamps", one: "Lamp", cover: "/img/deco/ch-lamps.jpg", line: "Table lamps and standing lights for reading corners and living rooms." },
  { id: "wireless", no: "05", name: "Wireless lamps", short: "Wireless", one: "Wireless lamp", cover: "/img/deco/ch-wireless.jpg", line: "Rechargeable lamps for tables, terraces and bedsides. No cable, no socket." },
] as const;
export const MATERIALS = [
  { id: "marble", tag: "Marble & stone", line: "Marble, travertine and stone." },
  { id: "alabaster", tag: "Alabaster", line: "Alabaster, lit from within." },
  { id: "silk", tag: "Silk", line: "Silk over glass and acrylic." },
  { id: "glass", tag: "Glass & crystal", line: "Clear, smoky and amber glass, and crystal." },
  { id: "wood", tag: "Wood", line: "Oak, walnut and wood finishes." },
  { id: "fabric", tag: "Fabric", line: "Fabric shades." },
  { id: "resin", tag: "Resin", line: "Resin." },
] as const;

// What the catalogue says about the range. Chapters 01–04 are a limited edition; chapter 05 is imported.
// Warranty is 1 year on every chapter: printed for 01–04, and confirmed for wireless by Krutish on 19 Nov 2026.
export const LIMITED = (family: string) => family !== "wireless";
export const TERMS = {
  limited: "Limited edition. When a design sells out, it leaves the range and is not made again. Confirm stock for the quantity you need before it goes into a drawing or a quotation.",
  warranty: "1 year warranty. Wrong wiring and physical damage are excluded.",
  wireless: "1 year warranty. Imported, and offered exclusively as part of the MIRAKLE portfolio. Charging and working times are nominal and vary with use.",
  photos: "Photographs are representative. Marble, alabaster, travertine, stone, wood and silk vary from piece to piece. Values are nominal, with a typical tolerance of ±10%.",
};

export const familyOf = (id: string) => FAMILIES.find((f) => f.id === id);
export const inFamily = (id: string) => DECO.filter((d) => d.family === id);
export const withTag = (tag: string) => DECO.filter((d) => d.tags.includes(tag));
// A design is one named piece; a code is one size or finish of it. The charging station is an accessory, not a design.
export const designs = (list: DItem[]) => list.filter((d) => d.kind !== "Accessory").length;
export const codes = (list: DItem[]) => list.reduce((a, d) => a + d.codes.length, 0);
export const hrefOf = (d: DItem) => `/decorative/${d.slug}/`;
export const titleOf = (d: DItem) => d.name;
export const codesOf = (d: DItem) => (d.codes.length > 4 ? `${d.codes.length} order codes` : d.codes.join(" · "));
export const finishesOf = (d: DItem) => [...new Set(d.variants.map((v) => v.finish).filter(Boolean))];
export const sizesOf = (d: DItem) => [...new Set(d.variants.map((v) => v.size).filter(Boolean))];
// The first picture to show for a material: a full room scene where the catalogue has one.
export const coverOf = (list: DItem[]) => list.find((d) => d.scenes.length)?.scenes[0] || list[0]?.img;
export type CardData = { slug: string; name: string; kind: string; codes: string[]; finish: string; img: DImg; tags: string[] };
export const cardOf = (d: DItem): CardData => {
  const f = finishesOf(d).length ? finishesOf(d) : [...new Set(d.variants.map((v) => v.material).filter(Boolean))];
  return { slug: d.slug, name: d.name, kind: d.kind, codes: d.codes, finish: f.length > 3 ? `${f.length} finishes` : f.join(" / "), img: d.img, tags: d.tags };
};
