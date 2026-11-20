import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { JsonLd, crumbs, product } from "@/lib/seo";
import { QL, hasOwnPage } from "@/lib/products";

export const dynamicParams = false;
// A description that ends on a whole sentence or word, within what a search result shows.
const cut = (x: string) => { if (x.length <= 158) return x; const a = x.slice(0, 158); const i = a.lastIndexOf(". "); return i > 80 ? a.slice(0, i + 1) : a.slice(0, a.lastIndexOf(" ")) + "…"; };
export function generateStaticParams() { return QL.filter((p) => !hasOwnPage(p)).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = QL.find((x) => x.slug === slug);
  if (!p) return {};
  const t = `${p.name} · ${p.group}`, d = cut(p.intro), path = `/quiklit/${p.slug}/`;
  return { title: t, description: d, alternates: { canonical: path }, openGraph: { title: `${t} | MIRAKLE`, description: d, url: path, images: p.hero ? [p.hero.src] : ["/og/home.jpg"] } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = QL.find((x) => x.slug === slug);
  if (!p) notFound();
  const path = `/quiklit/${p.slug}/`;
  return (
    <>
      <JsonLd data={crumbs([["QuikLit", "/quiklit/"], [p.name, path]])} />
      <JsonLd data={product({ name: `MIRAKLE ${p.name}`, path, image: p.hero ? [p.hero.src] : [], description: cut(p.intro), category: `QuikLit furniture lighting > ${p.group}` })} />
      <ProductPage p={p} siblings={QL} world="ql" />
    </>
  );
}
