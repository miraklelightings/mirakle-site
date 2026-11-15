import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Elva5.json";
export const metadata: Metadata = { title: "ELVA 5 magnetic track \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Elva5" slot="end"><RangeIndex only={["Magnetic lighting"]} heading={false} /></StaticPage>; }
