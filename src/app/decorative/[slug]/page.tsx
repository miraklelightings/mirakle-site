import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DecoShell from "@/components/deco/Shell";
import { DecoCard } from "@/components/deco/Grid";
import Listing from "@/components/deco/Listing";
import { SelectButton } from "@/components/deco/Select";
import { DECO, FAMILIES, MATERIALS, cardOf, familyOf, hrefOf, inFamily, titleOf, withTag, type DItem } from "@/lib/deco";
import { MANAGERS, wa } from "@/lib/site";

export const dynamicParams = false;
// "marble" has its own page file, as does the old "pendants" address.
const MATS = MATERIALS.filter((m) => m.id !== "marble");
export function generateStaticParams() {
  return [...FAMILIES.map((f) => f.id), ...MATS.map((m) => m.id), ...DECO.map((d) => d.slug)].map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = familyOf(slug); const m = MATS.find((x) => x.id === slug); const d = DECO.find((x) => x.slug === slug);
  if (f) return { title: `${f.name} · Decorative`, description: f.line };
  if (m) return { title: `${m.tag} · Decorative`, description: m.line };
  if (d) return { title: `${titleOf(d)} · ${familyOf(d.family)?.one}`, description: `${d.variants[0].finish}. ${d.variants[0].material}. ${d.variants[0].size}.` };
  return {};
}

function Piece({ d }: { d: DItem }) {
  const fam = familyOf(d.family)!;
  const m = MANAGERS.deco;
  const sib = inFamily(d.family);
  const i = sib.findIndex((x) => x.slug === d.slug);
  const prev = i > 0 ? sib[i - 1] : null, next = i < sib.length - 1 ? sib[i + 1] : null;
  const more = [...sib.slice(i + 1, i + 5), ...sib.slice(0, 4)].filter((x) => x.slug !== d.slug).slice(0, 4);
  const name = titleOf(d);
  const one = d.variants.length === 1 ? d.variants[0] : null;
  const dims = d.variants.flatMap((v) => v.dims.map((x) => ({ ...x, code: v.code })));
  return (
    <DecoShell>
      <div className="wrap pp-crumb cap grey"><Link href="/decorative/">Decorative</Link> / <Link href={`/decorative/${fam.id}/`}>{fam.name}</Link> / <span>{d.codes[0]}</span></div>
      <section className="wrap pp-top dpiece-top">
        <div className="pp-copy">
          <span className="pp-line" style={{ background: "var(--deco)" }} />
          <span className="cap grey">{fam.one}</span>
          <h1 className={d.codes.length > 1 ? "h40" : "h56"}>{name}</h1>
          {one ? (
            <dl className="dspec">
              <div><dt>Finish</dt><dd>{one.finish}</dd></div>
              <div><dt>Material</dt><dd>{one.material}</dd></div>
              <div><dt>Size</dt><dd>{one.size}</dd></div>
              <div><dt>Light source</dt><dd>{one.source}</dd></div>
            </dl>
          ) : (
            <p className="t20 grey" style={{ margin: 0 }}>{d.codes.length} versions of one design. Sizes and finishes are listed below.</p>
          )}
          <div className="pp-cta">
            {one && <SelectButton code={one.code} />}
            <a href={wa("deco", `Hello MIRAKLE, I would like details and price of ${d.codes.join(", ")}.`)} className="btn ghost">WhatsApp {m.name}</a>
          </div>
        </div>
        <figure className="pp-hero dpiece-hero"><img src={d.img.src} alt={`${name} in a room`} width={d.img.w} height={d.img.h} /></figure>
      </section>

      {!one && (
        <section className="wrap dvars">
          {d.variants.map((v) => (
            <div key={v.code} className="dvar">
              {v.dims[0] && <img src={v.dims[0].src} alt={`${v.code} with dimensions`} width={v.dims[0].w} height={v.dims[0].h} loading="lazy" />}
              <span className="h28">{v.code}</span>
              <dl className="dspec">
                <div><dt>Finish</dt><dd>{v.finish}</dd></div>
                <div><dt>Material</dt><dd>{v.material}</dd></div>
                <div><dt>Size</dt><dd>{v.size}</dd></div>
                <div><dt>Light source</dt><dd>{v.source}</dd></div>
              </dl>
              <SelectButton code={v.code} />
            </div>
          ))}
        </section>
      )}

      {one && dims.length > 0 && (
        <section className="ddims">
          <div className="wrap ddims-in">
            <div className="ddims-copy"><span className="cap grey">Dimensions</span><span className="h28">{one.size}</span><span className="t14 grey">As drawn in the catalogue. Suspension lengths can be set on site where the piece allows it; ask us before ordering.</span></div>
            <div className="ddims-imgs">{dims.map((x) => <img key={x.src} src={x.src} alt={`${x.code} with dimensions`} width={x.w} height={x.h} loading="lazy" />)}</div>
          </div>
        </section>
      )}

      {(d.scenes.length > 0 || d.extra.length > 0) && (
        <section className="wrap dgal">
          <span className="cap grey">In the room</span>
          {d.scenes.map((s) => <img key={s.src} src={s.src} alt={`${name} in a room`} width={s.w} height={s.h} loading="lazy" className="dgal-wide" />)}
          {d.extra.length > 0 && <div className="dgal-row">{d.extra.map((s) => <img key={s.src} src={s.src} alt={`${name} detail`} width={s.w} height={s.h} loading="lazy" />)}</div>}
        </section>
      )}

      <section className="pp-ask">
        <div className="wrap pp-ask-in">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640 }}>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>{m.role} · {m.name}</span>
            <span className="h28">Price and delivery for {d.codes[0]}, on enquiry.</span>
            <span className="t14" style={{ color: "var(--on-dark-grey)" }}>Photographs are for reference. Finish, size and light source are as listed for each code.</span>
          </div>
          <div className="pp-cta">
            <Link href="/decorative/#selection" className="btn light">Send my selection</Link>
            <a href={wa("deco", `Hello MIRAKLE, I would like details and price of ${d.codes.join(", ")}.`)} className="btn ghost-light">WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="wrap pp-more">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }} className="cap">
          {prev ? <Link href={hrefOf(prev)}>← {prev.codes[0]}</Link> : <span />}
          <Link href={`/decorative/${fam.id}/`}>All {fam.name.toLowerCase()}</Link>
          {next ? <Link href={hrefOf(next)}>{next.codes[0]} →</Link> : <span />}
        </div>
        <div className="dgrid">{more.map((x) => <DecoCard key={x.slug} c={cardOf(x)} />)}</div>
      </section>
    </DecoShell>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = familyOf(slug);
  if (f) return <Listing cap="Decorative · by type" title={f.name} line={f.line} list={inFamily(f.id)} crumb={f.name} />;
  const m = MATS.find((x) => x.id === slug);
  if (m) return <Listing cap="Decorative · by material" title={m.tag} line={m.line} list={withTag(m.tag)} crumb={m.tag} />;
  const d = DECO.find((x) => x.slug === slug);
  if (!d) notFound();
  return <Piece d={d} />;
}
