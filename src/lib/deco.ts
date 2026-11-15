import data from "@/content/products_deco.json";

// Decorative collection: every piece in the MIRAKLE Decorative Luminary catalogue, under its code.
export type DImg = { src: string; w: number; h: number };
export type DVariant = { code: string; finish: string; material: string; size: string; source: string; dims: DImg[] };
export type DItem = { slug: string; family: string; page: number; codes: string[]; variants: DVariant[]; img: DImg; scenes: DImg[]; extra: DImg[]; tags: string[] };
export const DECO = data as unknown as DItem[];

export const FAMILIES = [
  { id: "pendant", name: "Pendant lights", one: "Pendant light", line: "Single pieces and clusters in glass, marble, silk, resin and metal." },
  { id: "hanging", name: "Hanging lights", one: "Hanging light", line: "Linear lights, rings and chandeliers over tables, islands and double heights." },
  { id: "wall", name: "Wall lights", one: "Wall light", line: "Sconces and wall discs in marble, alabaster, glass and brass." },
  { id: "ceiling", name: "Ceiling lights", one: "Ceiling light", line: "Surface ceiling lights for bedrooms, passages and dressing rooms." },
  { id: "table", name: "Table lamps", one: "Table lamp", line: "Lamps in marble, travertine, oak and silk." },
  { id: "floor", name: "Floor lamps", one: "Floor lamp", line: "Standing lights for reading corners and living rooms." },
] as const;
export const MATERIALS = [
  { id: "marble", tag: "Marble & stone", line: "Bulgari and Spanish marble, travertine and sintered stone." },
  { id: "alabaster", tag: "Alabaster", line: "Spanish alabaster, lit from within." },
  { id: "silk", tag: "Silk", line: "Mulberry silk over glass and acrylic." },
  { id: "glass", tag: "Glass & crystal", line: "Clear, smoky and amber glass, and crystal." },
  { id: "wood", tag: "Wood", line: "Oak, walnut and wood finishes." },
  { id: "fabric", tag: "Fabric", line: "Fabric shades and technical cloth." },
  { id: "resin", tag: "Resin", line: "Resin with organic coatings." },
] as const;

export const familyOf = (id: string) => FAMILIES.find((f) => f.id === id);
export const inFamily = (id: string) => DECO.filter((d) => d.family === id);
export const withTag = (tag: string) => DECO.filter((d) => d.tags.includes(tag));
export const designs = (list: DItem[]) => list.reduce((a, d) => a + d.codes.length, 0);
export const hrefOf = (d: DItem) => `/decorative/${d.slug}/`;
export const titleOf = (d: DItem) => d.codes.join(" · ");
// The first picture to show for a family or a material: a full room scene where the catalogue has one.
export const coverOf = (list: DItem[]) => list.find((d) => d.scenes.length)?.scenes[0] || list[0]?.img;
export type CardData = { slug: string; codes: string[]; finish: string; img: DImg; tags: string[] };
export const cardOf = (d: DItem): CardData => ({ slug: d.slug, codes: d.codes, finish: [...new Set(d.variants.map((v) => v.finish || v.material).filter(Boolean))].join(" / "), img: d.img, tags: d.tags });
