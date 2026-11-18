"use client";
import { useState } from "react";
import Link from "next/link";
import { SelectButton } from "./Select";
import type { CardData } from "@/lib/deco";
import { U } from "@/lib/units";

export function DecoCard({ c }: { c: CardData }) {
  const href = `/decorative/${c.slug}/`;
  return (
    <div className="dcard">
      <Link href={href} className="dcard-img"><img src={c.img.src} alt={`${c.name}, ${c.kind.toLowerCase()}`} width={c.img.w} height={c.img.h} loading="lazy" /></Link>
      <div className="dcard-meta">
        <Link href={href} className="dcard-name">{c.name}</Link>
        {c.codes.length === 1 ? <SelectButton code={c.codes[0]} small /> : <Link href={href} className="dsel small">{c.codes.length} options</Link>}
      </div>
      <span className="dcard-line">{c.codes.length === 1 ? c.codes[0] : c.kind}{c.finish && " · "}<U>{c.finish}</U></span>
    </div>
  );
}

// A chapter or a material, with material filters when there is more than one to choose from.
export default function DecoGrid({ cards, filter = true }: { cards: CardData[]; filter?: boolean }) {
  const tags = [...new Set(cards.flatMap((c) => c.tags))].filter((t) => cards.filter((c) => c.tags.includes(t)).length >= 2);
  const [tag, setTag] = useState("");
  const list = tag ? cards.filter((c) => c.tags.includes(tag)) : cards;
  return (
    <>
      {filter && tags.length > 1 && (
        <div className="dfilter" role="group" aria-label="Filter by material">
          <button type="button" className={"pill" + (tag === "" ? " on" : "")} onClick={() => setTag("")}>All · {cards.length}</button>
          {tags.map((t) => <button key={t} type="button" className={"pill" + (tag === t ? " on" : "")} onClick={() => setTag(t)}>{t} · {cards.filter((c) => c.tags.includes(t)).length}</button>)}
        </div>
      )}
      <div className="dgrid">{list.map((c) => <DecoCard key={c.slug} c={c} />)}</div>
    </>
  );
}
