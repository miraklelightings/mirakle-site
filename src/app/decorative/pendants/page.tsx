import type { Metadata } from "next";
import Listing from "@/components/deco/Listing";
import { FAMILIES, inFamily } from "@/lib/deco";

// The earlier address of the pendant family. Kept so old links still land on the collection.
const f = FAMILIES[0];
export const metadata: Metadata = { title: `${f.name} · Decorative`, description: f.line };
export default function Page() { return <Listing cap="Decorative · by type" title={f.name} line={f.line} list={inFamily(f.id)} crumb={f.name} />; }
