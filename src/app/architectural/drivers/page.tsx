import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Drivers.json";
export const metadata: Metadata = { title: "LED drivers \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Drivers" slot="end"><RangeIndex only={["LED drivers"]} heading={false} /></StaticPage>; }
