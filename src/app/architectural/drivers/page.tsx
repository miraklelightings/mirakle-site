import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Drivers.json";
export const metadata: Metadata = { title: "LED drivers \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
