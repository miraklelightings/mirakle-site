import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { TECH, hasOwnPage, title } from "@/lib/products";

export const dynamicParams = false;
export function generateStaticParams() { return TECH.filter((p) => !hasOwnPage(p)).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = TECH.find((x) => x.slug === slug);
  return p ? { title: `${title(p)} · ${p.group}`, description: p.intro.slice(0, 155) } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = TECH.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProductPage p={p} siblings={TECH.filter((x) => x.chapter === p.chapter)} world="arch" />;
}
