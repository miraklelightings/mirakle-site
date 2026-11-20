import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import c from "@/content/Contact.json";
export const metadata: Metadata = { title: "Contact MIRAKLE", description: "Talk to the Architectural, QuikLit or Decorative desk. Showroom at Maruti Crystal, Bodakdev, Ahmedabad.", alternates: { canonical: "/contact/" }, openGraph: { title: "Contact MIRAKLE | MIRAKLE", description: "Talk to the Architectural, QuikLit or Decorative desk. Showroom at Maruti Crystal, Bodakdev, Ahmedabad.", url: "/contact/", images: ["/og/home.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Contact" />; }
