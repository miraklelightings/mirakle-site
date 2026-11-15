import type { Metadata } from "next";
import Listing from "@/components/deco/Listing";
import { MATERIALS, withTag } from "@/lib/deco";

const m = MATERIALS[0];
export const metadata: Metadata = { title: `${m.tag} · Decorative`, description: m.line };
export default function Page() { return <Listing cap="Decorative · by material" title={m.tag} line={m.line} list={withTag(m.tag)} crumb={m.tag} />; }
