import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Linear.json";
export const metadata: Metadata = { title: "Linear lighting: OPTIPRO, CURVA, ARCUS, SKYLIT", description: "LED strips and linear light: ten OPTIPRO strips, CURVA, ARCUS and SKYLIT.", alternates: { canonical: "/architectural/linear/" }, openGraph: { title: "Linear lighting: OPTIPRO, CURVA, ARCUS, SKYLIT | MIRAKLE", description: "LED strips and linear light: ten OPTIPRO strips, CURVA, ARCUS and SKYLIT.", url: "/architectural/linear/", images: ["/og/architectural.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Linear" slot="end"><RangeIndex only={["Linear"]} heading={false} /></StaticPage>; }
