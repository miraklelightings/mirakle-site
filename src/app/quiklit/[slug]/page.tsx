import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { QL, hasOwnPage } from "@/lib/products";

export const dynamicParams = false;
export function generateStaticParams() { return QL.filter((p) => !hasOwnPage(p)).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = QL.find((x) => x.slug === slug);
  return p ? { title: `${p.name} · ${p.group}`, description: p.intro.slice(0, 155) } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = QL.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProductPage p={p} siblings={QL} world="ql" />;
}
