import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/DecoMarble.json";
export const metadata: Metadata = { title: "Marble \u2014 MIRAKLE Decorative" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
