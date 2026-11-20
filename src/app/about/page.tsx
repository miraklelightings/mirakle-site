import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/About.json";
export const metadata: Metadata = { title: "About", description: "MIRAKLE is a brand of Hrisha Lighting Projects LLP, Ahmedabad. Lighting for architecture, furniture and interiors.", alternates: { canonical: "/about/" }, openGraph: { title: "About MIRAKLE | MIRAKLE", description: "MIRAKLE is a brand of Hrisha Lighting Projects LLP, Ahmedabad. Lighting for architecture, furniture and interiors.", url: "/about/", images: ["/og/home.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="About" />; }
