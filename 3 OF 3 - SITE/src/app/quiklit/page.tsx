import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import { QlIndex } from "@/components/RangeIndex";
import c from "@/content/Quiklit.json";
export const metadata: Metadata = { title: "QuikLit: solderless lighting for modular furniture", description: "Simplifying modular furniture lighting. Solderless LED profiles, QuikMag magnetic track, spots, sensors and power supplies for kitchens, wardrobes and furniture makers.", alternates: { canonical: "/quiklit/" }, openGraph: { title: "QuikLit: solderless lighting for modular furniture | MIRAKLE", description: "Simplifying modular furniture lighting. Solderless LED profiles, QuikMag magnetic track, spots, sensors and power supplies for kitchens, wardrobes and furniture makers.", url: "/quiklit/", images: ["/og/quiklit.jpg"] } };
export default function Page() { return <StaticPage css={c.css} body={c.body} footer={c.footer} page="Quiklit" slot="end"><QlIndex /></StaticPage>; }
