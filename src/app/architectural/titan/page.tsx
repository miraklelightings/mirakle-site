import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Titan.json";
export const metadata: Metadata = { title: "TITAN \u2014 Recessed COB spotlight \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
