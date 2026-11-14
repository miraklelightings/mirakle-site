import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Quiklit.json";
export const metadata: Metadata = { title: "QuikLit by Furniture lighting" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Quiklit" />; }
