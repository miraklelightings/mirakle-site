import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Linear.json";
export const metadata: Metadata = { title: "Linear lighting \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Linear" slot="end"><RangeIndex only={["Linear"]} heading={false} /></StaticPage>; }
