import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Architectural.json";
export const metadata: Metadata = { title: "Architectural lighting: magnetic track, spotlights, linear, LED drivers", description: "A 48 V magnetic track system, nineteen COB spotlight series, four linear ranges and the LED drivers that run them. Architectural Lighting Catalogue 2027–28.", alternates: { canonical: "/architectural/" }, openGraph: { title: "Architectural lighting: magnetic track, spotlights, linear, LED drivers | MIRAKLE", description: "A 48 V magnetic track system, nineteen COB spotlight series, four linear ranges and the LED drivers that run them. Architectural Lighting Catalogue 2027–28.", url: "/architectural/", images: ["/og/architectural.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Architectural" slot="finder"><RangeIndex /></StaticPage>; }
