import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Decorative.json";
export const metadata: Metadata = { title: "MIRAKLE Decorative" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Decorative" />; }
