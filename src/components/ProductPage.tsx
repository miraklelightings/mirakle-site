import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/RangeIndex";
import { MANAGERS, wa, type World, WORLD_NAV } from "@/lib/site";
import { hrefOf, title, type Product, type Table } from "@/lib/products";
import { U } from "@/lib/units";

function TableView({ t }: { t: Table }) {
  return (
    <div className="pt">
      <span className="cap grey"><U>{t.title}</U></span>
      {t.pairs ? (
        <dl className="pt-pairs">
          {t.pairs.map(([k, v], i) => (
            <div key={i}><dt><U>{k}</U></dt><dd>{v.split("\n").map((l, j) => <span key={j}><U>{l}</U></span>)}</dd></div>
          ))}
        </dl>
      ) : (
        <div className="pt-scroll">
          <table>
            {t.head && <thead><tr>{t.head.map((h, i) => <th key={i}><U>{h}</U></th>)}</tr></thead>}
            <tbody>{(t.rows || []).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><U>{c}</U></td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Architectural pages do not publish ordering codes; they are sent on request.
const CODE_COL = /^(code|erp code|order code)$/i;
function withoutCodes(t: Table): Table | null {
  if (!t.head || !t.rows || !t.head.some((h) => CODE_COL.test(h))) return t;
  const keep = t.head.map((h, i) => (CODE_COL.test(h) ? -1 : i)).filter((i) => i >= 0);
  if (!keep.length) return null;
  const rows = t.rows.map((r) => keep.map((i) => r[i] ?? "")).filter((r, i, all) => all.findIndex((x) => x.join("|") === r.join("|")) === i);
  return { ...t, title: t.title.replace(/\s*·\s*codes/i, "").replace(/^Codes$/i, "Versions"), head: keep.map((i) => t.head![i]), rows };
}

export default function ProductPage({ p: raw, siblings, world }: { p: Product; siblings: Product[]; world: World }) {
  const p = world === "arch" ? { ...raw, tables: raw.tables.map(withoutCodes).filter((t): t is Table => Boolean(t)) } : raw;
  const m = MANAGERS[world];
  const name = title(p);
  const back = world === "ql" ? { href: "/quiklit/", label: "QuikLit" } : { href: "/architectural/", label: "Architectural" };
  const nav = WORLD_NAV[world];
  const enquire = `/contact/?about=${world}&msg=${encodeURIComponent("Datasheet and price for " + name)}`;
  const i = siblings.findIndex((s) => s.slug === p.slug);
  const prev = i > 0 ? siblings[i - 1] : null, next = i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : null;
  const more = siblings.filter((s) => s.group === p.group && s.slug !== p.slug).slice(0, 4);
  return (
    <>
      <Header world={world} nav={nav} cta={{ label: "Enquire", href: enquire }} />
      <main className="pp">
        <div className="wrap pp-crumb cap grey">
          <Link href={back.href}>{back.label}</Link> / <span>{p.chapter === "QuikLit" ? p.group : p.chapter}</span>{p.chapter !== "QuikLit" && <> / <span>{p.group}</span></>}
        </div>

        <section className="wrap pp-top">
          <div className="pp-copy">
            <span className="pp-line" style={{ background: world === "ql" ? "var(--ql)" : "var(--arch)" }} />
            <h1 className="h56">{name}</h1>
            {p.tagline && <p className="h28" style={{ margin: 0 }}><U>{p.tagline}</U></p>}
            <p className="t20 grey" style={{ margin: 0 }}><U>{p.intro}</U></p>
            {p.where && <p style={{ margin: 0 }}><span className="cap grey">Where it goes · </span><U>{p.where}</U></p>}
            <div className="pp-cta">
              <Link href={enquire} className="btn">Enquire about {p.name}</Link>
              <a href={wa(world, `Hello MIRAKLE, I would like details of ${name}.`)} className="btn ghost">WhatsApp {m.name}</a>
              {world === "ql" && <Link href="/quiklit/boq/" className="btn ghost">BOQ calculator</Link>}
            </div>
          </div>
          {p.hero && <figure className="pp-hero"><img src={p.hero.src} alt={name} width={p.hero.w} height={p.hero.h} /></figure>}
        </section>

        {p.highlights && p.highlights.length > 0 && (
          <section className="wrap pp-hl">
            {p.highlights.map((h) => (
              <div key={h.label}><span className="cap grey">{h.label}</span>{h.lines.map((l, k) => <span key={k} className="t20"><U>{l}</U></span>)}</div>
            ))}
          </section>
        )}

        {p.badges.length > 0 && (
          <section className="wrap pp-badges">
            {p.badges.map(([a, b], k) => <div key={k}><b><U>{a}</U></b><span className="cap grey"><U>{b}</U></span></div>)}
          </section>
        )}

        {(p.tables.length > 0 || p.photo) && (
          <section className="pp-data">
            <div className="wrap pp-data-grid">
              <div className="pp-data-side">
                <h2 className="h40">Technical data</h2>
                {p.techIntro && <p className="t14 grey" style={{ margin: 0 }}><U>{p.techIntro}</U></p>}
                {p.photo && <img src={p.photo.src} alt={name + " detail"} width={p.photo.w} height={p.photo.h} loading="lazy" />}
              </div>
              <div className="pp-tables">
                {p.tables.map((t, k) => <TableView key={k} t={t} />)}
                {p.notes.map((n, k) => <p key={k} className="t14 grey" style={{ margin: 0 }}><U>{n}</U></p>)}
              </div>
            </div>
          </section>
        )}

        {p.drawings.length > 0 && (
          <section className="wrap pp-draw">
            <span className="cap grey">Drawings and light distribution · dimensions in <span className="u">mm</span></span>
            {p.drawings.map((d) => <img key={d.src} src={d.src} alt={name + " drawing"} width={d.w} height={d.h} loading="lazy" />)}
          </section>
        )}

        <section className="pp-ask">
          <div className="wrap pp-ask-in">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640 }}>
              <span className="cap" style={{ color: "var(--on-dark-grey)" }}>{m.role} · {m.name}</span>
              <span className="h28">Datasheet, files and price for {p.name}, on request.</span>
            </div>
            <div className="pp-cta">
              <Link href="/downloads/" className="btn light">Request the datasheet</Link>
              <a href={wa(world, `Hello MIRAKLE, I would like details of ${name}.`)} className="btn ghost-light">WhatsApp</a>
              <a href={`tel:${m.tel}`} className="btn ghost-light">{m.phone}</a>
            </div>
          </div>
        </section>

        {more.length > 0 && (
          <section className="wrap pp-more">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <h2 className="h28">More in {p.group}</h2>
              <span className="cap" style={{ display: "flex", gap: 20 }}>
                {prev && <Link href={hrefOf(prev)}>← {prev.name}</Link>}
                {next && <Link href={hrefOf(next)}>{next.name} →</Link>}
              </span>
            </div>
            <div className="pgrid">{more.map((s) => <Card key={s.slug} p={s} />)}</div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
