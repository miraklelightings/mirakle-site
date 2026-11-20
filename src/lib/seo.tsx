// Structured data for search engines. Everything stated here is also visible on the page.
export const SITE_URL = "https://www.miraklelightings.com";
export const SITE_NAME = "MIRAKLE";
export const abs = (path: string) => (path.startsWith("http") ? path : SITE_URL + path);

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const crumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

// A product without a price: the site carries no prices, so no offer is declared.
export const product = (p: { name: string; path: string; image: string[]; description: string; category: string; sku?: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  url: abs(p.path),
  image: p.image.map(abs),
  description: p.description,
  category: p.category,
  ...(p.sku && p.sku.length ? { sku: p.sku.length === 1 ? p.sku[0] : undefined, mpn: p.sku.slice(0, 20).join(", ") } : {}),
  brand: { "@type": "Brand", name: "MIRAKLE" },
  manufacturer: { "@type": "Organization", name: "Hrisha Lighting Projects LLP" },
});
