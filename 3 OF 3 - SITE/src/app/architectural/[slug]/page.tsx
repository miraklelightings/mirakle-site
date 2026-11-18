import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { JsonLd, crumbs, product } from "@/lib/seo";
import { TECH, hasOwnPage, title } from "@/lib/products";

export const dynamicParams = false;
// A description that ends on a whole sentence or word, within what a search result shows.
const cut = (x: string) => { if (x.length <= 158) return x; const a = x.slice(0, 158); const i = a.lastIndexOf(". "); return i > 80 ? a.slice(0, i + 1) : a.slice(0, a.lastIndexOf(" ")) + "…"; };
export function generateStaticParams() { return TECH.filter((p) => !hasOwnPage(p)).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = TECH.find((x) => x.slug === slug);
  if (!p) return {};
  const t = `${title(p)} · ${p.group}`, d = cut(p.intro), path = `/architectural/${p.slug}/`;
  return { title: t, description: d, alternates: { canonical: path }, openGraph: { title: `${t} | MIRAKLE`, description: d, url: path, images: p.hero ? [p.hero.src] : ["/og/home.jpg"] } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = TECH.find((x) => x.slug === slug);
  if (!p) notFound();
  const path = `/architectural/${p.slug}/`;
  return (
    <>
      <JsonLd data={crumbs([["Architectural", "/architectural/"], [title(p), path]])} />
      <JsonLd data={product({ name: `MIRAKLE ${title(p)}`, path, image: p.hero ? [p.hero.src] : [], description: cut(p.intro), category: `Architectural lighting > ${p.group}` })} />
      <ProductPage p={p} siblings={TECH.filter((x) => x.chapter === p.chapter)} world="arch" />
    </>
  );
}
