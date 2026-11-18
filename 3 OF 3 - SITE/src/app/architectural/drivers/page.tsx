import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import RangeIndex from "@/components/RangeIndex";
import c from "@/content/Drivers.json";
export const metadata: Metadata = { title: "LED drivers: Apollo, Helios, Orion, Eos, Atlas, Vega", description: "Nineteen LED drivers in six families: Apollo, Helios, Orion, Eos, Atlas and Vega.", alternates: { canonical: "/architectural/drivers/" }, openGraph: { title: "LED drivers: Apollo, Helios, Orion, Eos, Atlas, Vega | MIRAKLE", description: "Nineteen LED drivers in six families: Apollo, Helios, Orion, Eos, Atlas and Vega.", url: "/architectural/drivers/", images: ["/og/architectural.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Drivers" slot="end"><RangeIndex only={["LED drivers"]} heading={false} /></StaticPage>; }
