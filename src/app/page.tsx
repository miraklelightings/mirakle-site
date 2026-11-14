import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Main.json";
export const metadata: Metadata = { title: "MIRAKLE \u2014 Light for architecture, furniture and living" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
