import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Elva5.json";
export const metadata: Metadata = { title: "ELVA 5 magnetic track lighting", description: "ELVA 5, a 48 V magnetic track system with a 5 mm opening: surface and trimless track with linear, grille, spot, zoom, globe and sound modules.", alternates: { canonical: "/architectural/elva-5/" }, openGraph: { title: "ELVA 5 magnetic track lighting | MIRAKLE", description: "ELVA 5, a 48 V magnetic track system with a 5 mm opening: surface and trimless track with linear, grille, spot, zoom, globe and sound modules.", url: "/architectural/elva-5/", images: ["/og/architectural.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Elva5" slot="end"><RangeIndex only={["Magnetic lighting"]} heading={false} /></StaticPage>; }
