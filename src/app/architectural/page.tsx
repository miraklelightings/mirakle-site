import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Architectural.json";
export const metadata: Metadata = { title: "Architectural & Technical Lighting" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} />; }
