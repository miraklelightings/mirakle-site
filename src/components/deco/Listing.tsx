import Link from "next/link";
import DecoShell from "./Shell";
import DecoGrid from "./Grid";
import { cardOf, codes, coverOf, designs, type DItem } from "@/lib/deco";

// One chapter or one material: a full-width photograph, a short introduction, then every design.
export default function Listing({ cap, title, line, list, crumb, cover, note, extra }: { cap: string; title: string; line: string; list: DItem[]; crumb: string; cover?: string; note?: string; extra?: React.ReactNode }) {
  const img = cover || coverOf(list)!.src;
  return (
    <DecoShell>
      <section className="dlhero">
        <img src={img} alt={title} fetchPriority="high" />
        <div className="dlhero-shade" />
        <div className="wrap dlhero-copy">
          <div className="cap dlhero-crumb"><Link href="/decorative/">Decorative</Link> / <span>{crumb}</span></div>
          <span className="cap">{cap}</span>
          <h1 className="h88">{title}</h1>
          <p className="t20" style={{ margin: 0, maxWidth: 620 }}>{line}</p>
          <span className="cap">{designs(list)} designs · {codes(list)} order codes</span>
        </div>
      </section>
      {note && <div className="dnote"><div className="wrap t14">{note}</div></div>}
      {extra}
      <section className="wrap dlist"><DecoGrid cards={list.map(cardOf)} /></section>
    </DecoShell>
  );
}
