import Link from "next/link";
import { CHAPTERS, QL, TECH, grouped, hrefOf, title, type Product } from "@/lib/products";

export function Card({ p }: { p: Product }) {
  return (
    <Link href={hrefOf(p)} className="pcard">
      <span className={"pcard-img" + (p.kind === "driver" || p.kind === "ql" ? " fit" : "")}>{(p.card || p.hero) && <img src={(p.card || p.hero)!.src} alt={title(p)} loading="lazy" />}</span>
      <span className="pcard-name">{p.name}</span>
      {(p.tagline || p.intro) && <span className="pcard-line">{p.tagline || p.intro.split(". ")[0] + "."}</span>}
    </Link>
  );
}

// Every range in the technical catalogue, chapter by chapter. Pass `only` to show one chapter.
export default function RangeIndex({ only, heading = true }: { only?: string[]; heading?: boolean }) {
  const chapters = CHAPTERS.filter((c) => !only || only.includes(c.name));
  return (
    <section className="range" id="range-index">
      {heading && (
        <div className="wrap range-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
            <span className="cap grey">The catalogue, online</span>
            <h2 className="h40">Every range, product by product.</h2>
          </div>
          <nav className="range-nav cap" aria-label="Chapters">
            {chapters.map((c) => <a key={c.id} href={`#${c.id}`}>{c.n} {c.name}</a>)}
          </nav>
        </div>
      )}
      {chapters.map((c) => {
        const list = TECH.filter((p) => p.chapter === c.name);
        return (
          <div key={c.id} id={c.id} className="wrap range-chapter">
            <div className="range-chapter-head">
              <span className="h28"><span className="grey">{c.n}</span>&nbsp; {c.name}</span>
              <p className="t14 grey" style={{ margin: 0, maxWidth: 560 }}>{c.line}</p>
            </div>
            {grouped(list).map((g) => (
              <div key={g.group} className="range-group">
                <span className="cap grey">{g.group} · {g.items.length}</span>
                <div className="pgrid">{g.items.map((p) => <Card key={p.slug} p={p} />)}</div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}

// QuikLit, product by product.
export function QlIndex() {
  return (
    <section className="range" id="products">
      <div className="wrap range-head">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
          <span className="cap grey">The catalogue, online</span>
          <h2 className="h40">QuikLit, product by product.</h2>
        </div>
      </div>
      <div className="wrap range-chapter" style={{ borderTop: 0, paddingTop: 0 }}>
        {grouped(QL).map((g) => (
          <div key={g.group} className="range-group">
            <span className="cap grey">{g.group} · {g.items.length}</span>
            <div className="pgrid">{g.items.map((p) => <Card key={p.slug} p={p} />)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
