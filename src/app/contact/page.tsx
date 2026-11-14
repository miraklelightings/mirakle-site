import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Contact.json";
export const metadata: Metadata = { title: "Contact \u2014 MIRAKLE" };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Contact" />; }
