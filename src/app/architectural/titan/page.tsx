import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Titan.json";
export const metadata: Metadata = { title: "TITAN recessed COB spotlight configurator", description: "TITAN, a fixed recessed COB spotlight. Choose watts, beam, colour and control, and read the order code as you go.", alternates: { canonical: "/architectural/titan/" }, openGraph: { title: "TITAN recessed COB spotlight configurator | MIRAKLE", description: "TITAN, a fixed recessed COB spotlight. Choose watts, beam, colour and control, and read the order code as you go.", url: "/architectural/titan/", images: ["/og/architectural.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Titan" />; }
