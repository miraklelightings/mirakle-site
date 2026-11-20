import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Downloads.json";
export const metadata: Metadata = { title: "Downloads", description: "Catalogues and documents for MIRAKLE Architectural, QuikLit and Decorative lighting.", alternates: { canonical: "/downloads/" }, openGraph: { title: "Downloads | MIRAKLE", description: "Catalogues and documents for MIRAKLE Architectural, QuikLit and Decorative lighting.", url: "/downloads/", images: ["/og/home.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Downloads" />; }
