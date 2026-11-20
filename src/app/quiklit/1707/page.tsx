import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Quiklit1707.json";
export const metadata: Metadata = { title: "QUIKLIT-1707 recessed LED profile", description: "QUIKLIT-1707, a solderless 17 × 7 mm recessed LED profile with an opal cover, 16 W/m.", alternates: { canonical: "/quiklit/1707/" }, openGraph: { title: "QUIKLIT-1707 recessed LED profile | MIRAKLE", description: "QUIKLIT-1707, a solderless 17 × 7 mm recessed LED profile with an opal cover, 16 W/m.", url: "/quiklit/1707/", images: ["/og/quiklit.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Quiklit1707" />; }
