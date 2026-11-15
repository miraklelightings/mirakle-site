import Link from "next/link";
import DecoShell from "./Shell";
import DecoGrid from "./Grid";
import { cardOf, coverOf, designs, type DItem } from "@/lib/deco";

// One family or one material: a short introduction, then every piece.
export default function Listing({ cap, title, line, list, crumb }: { cap: string; title: string; line: string; list: DItem[]; crumb: string }) {
  const cover = coverOf(list)!;
  return (
    <DecoShell>
      <div className="wrap pp-crumb cap grey"><Link href="/decorative/">Decorative</Link> / <span>{crumb}</span></div>
      <section className="wrap dlist-top">
        <div className="dlist-copy">
          <span style={{ display: "block", width: 72, height: 2, background: "var(--deco)" }} />
          <span className="cap grey">{cap}</span>
          <h1 className="h56">{title}</h1>
          <p className="t20 grey" style={{ margin: 0 }}>{line}</p>
          <p className="t14 grey" style={{ margin: 0 }}>{designs(list)} designs. Each piece is named by its code. Press Select to add it to your list; open it for size, material and light source.</p>
        </div>
        <figure className="dlist-img"><img src={cover.src} alt={title} /></figure>
      </section>
      <section className="wrap dlist"><DecoGrid cards={list.map(cardOf)} /></section>
    </DecoShell>
  );
}
