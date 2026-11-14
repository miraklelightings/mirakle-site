import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Quiklit1707.json";
export const metadata: Metadata = { title: "QUIKLIT-1707 \u2014 QuikLit by MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
