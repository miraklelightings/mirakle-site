import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DecoShell from "@/components/deco/Shell";
import { DecoCard } from "@/components/deco/Grid";
import Listing from "@/components/deco/Listing";
import { SelectButton } from "@/components/deco/Select";
import { DECO, DECO_REDIRECTS, FAMILIES, LIMITED, MATERIALS, TERMS, cardOf, codesOf, familyOf, finishesOf, hrefOf, inFamily, sizesOf, titleOf, withTag, type DItem, type DVariant } from "@/lib/deco";
import { MANAGERS, wa } from "@/lib/site";
import { JsonLd, crumbs, product } from "@/lib/seo";
import { U } from "@/lib/units";

export const dynamicParams = false;
// "marble" has its own page file, as does the old "pendants" address.
const MATS = MATERIALS.filter((m) => m.id !== "marble");
export function generateStaticParams() {
  return [...FAMILIES.map((f) => f.id), ...MATS.map((m) => m.id), ...DECO.map((d) => d.slug), ...Object.keys(DECO_REDIRECTS)].map((slug) => ({ slug }));
}
const lower = (s: string) => s.toLowerCase().replace(/\bmm\b/g, "mm");
const cut = (x: string) => (x.length <= 158 ? x : x.slice(0, x.slice(0, 157).lastIndexOf(" ")).replace(/[,.:;]$/, "") + "…");
const about = (d: DItem) => {
  const v = d.variants[0];
  if (d.family === "wireless") return cut(`${d.name} ${d.kind.toLowerCase()} by MIRAKLE. ${d.codes.length} order ${d.codes.length === 1 ? "code" : "codes"}${finishesOf(d).length ? `, in ${finishesOf(d).map(lower).join(", ")}` : ""}.`);
  return cut(`${d.name} ${d.kind.toLowerCase()} by MIRAKLE. ${[v.finish && `Finish: ${lower(v.finish)}`, v.material && `Material: ${lower(v.material)}`, v.size && `Size: ${v.size}`].filter(Boolean).join(". ")}.`);
};
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = familyOf(slug); const m = MATS.find((x) => x.id === slug); const d = DECO.find((x) => x.slug === slug);
  if (f) return { title: `${f.name} · Decorative Lighting`, description: `${f.name} by MIRAKLE. ${f.line}`, alternates: { canonical: `/decorative/${f.id}/` }, openGraph: { title: `${f.name} · MIRAKLE Decorative`, description: f.line, images: [f.cover], url: `/decorative/${f.id}/` } };
  if (m) return { title: `${m.tag} · Decorative Lighting`, description: `Decorative lights in ${m.tag.toLowerCase()}. ${m.line}`, alternates: { canonical: `/decorative/${m.id}/` } };
  if (d) return { title: `${titleOf(d)} ${d.kind.toLowerCase()} · Decorative`, description: about(d), alternates: { canonical: hrefOf(d) }, openGraph: { title: `${titleOf(d)} · MIRAKLE Decorative`, description: about(d), images: [(d.scenes[0] || d.img).src], url: hrefOf(d) } };
  const to = DECO_REDIRECTS[slug];
  if (to) return { title: "Decorative Lighting", robots: { index: false }, alternates: { canonical: to } };
  return {};
}

// A line the catalogue does not give is left out.
function Spec({ v }: { v: DVariant }) {
  const rows = [["Finish", v.finish], ["Material", v.material], ["Size", v.size], ["Light source", v.source]].filter(([, x]) => x);
  return <dl className="dspec">{rows.map(([k, x]) => <div key={k}><dt>{k}</dt><dd><U>{x}</U></dd></div>)}</dl>;
}

// Wireless lamps: one specification for the design, and a code for every finish and size.
function Codes({ d }: { d: DItem }) {
  const sizes = sizesOf(d), fins = finishesOf(d);
  const at = (f: string, s: string) => d.variants.find((v) => v.finish === f && v.size === s);
  if (!fins.length) return <div className="dcodes"><div className="dcodes-row"><span className="cap">Order code</span>{d.variants.map((v) => <span key={v.code} className="dcodes-cell"><b>{v.code}</b><SelectButton code={v.code} small /></span>)}</div></div>;
  return (
    <div className="dcodes" style={{ ["--cols" as string]: Math.max(sizes.length, 1) }}>
      {sizes.length > 0 && <div className="dcodes-row head"><span className="cap grey">Finish</span>{sizes.map((s) => <span key={s} className="cap grey">{s}</span>)}</div>}
      {fins.map((f) => (
        <div key={f} className="dcodes-row">
          <span className="cap">{f}</span>
          {(sizes.length ? sizes : [""]).map((s) => { const v = at(f, s); return <span key={s} className="dcodes-cell">{v ? <><b>{v.code}</b><SelectButton code={v.code} small /></> : <span className="grey">—</span>}</span>; })}
        </div>
      ))}
    </div>
  );
}

function Piece({ d }: { d: DItem }) {
  const fam = familyOf(d.family)!;
  const m = MANAGERS.deco;
  const sib = inFamily(d.family);
  const i = sib.findIndex((x) => x.slug === d.slug);
  const prev = i > 0 ? sib[i - 1] : null, next = i < sib.length - 1 ? sib[i + 1] : null;
  const more = [...sib.slice(i + 1, i + 5), ...sib.slice(0, 4)].filter((x) => x.slug !== d.slug).slice(0, 4);
  const name = titleOf(d);
  const wireless = d.family === "wireless";
  const one = !wireless && d.variants.length === 1 ? d.variants[0] : null;
  const dims = d.variants.flatMap((v) => v.dims.map((x) => ({ ...x, code: v.code })));
  const ask = `Hello MIRAKLE, I would like details and price of ${d.name} (${d.codes.slice(0, 6).join(", ")}${d.codes.length > 6 ? ", …" : ""}).`;
  return (
    <DecoShell>
      <JsonLd data={crumbs([["Decorative Lighting", "/decorative/"], [fam.name, `/decorative/${fam.id}/`], [d.name, hrefOf(d)]])} />
      <JsonLd data={product({ name: `MIRAKLE ${d.name}`, path: hrefOf(d), image: [d.img.src, ...d.scenes.map((s) => s.src)].slice(0, 3), description: about(d), category: `Decorative lighting > ${fam.name}`, sku: d.codes })} />
      <div className="wrap pp-crumb cap grey"><Link href="/decorative/">Decorative</Link> / <Link href={`/decorative/${fam.id}/`}>{fam.name}</Link> / <span>{d.name}</span></div>
      <section className="wrap pp-top dpiece-top">
        <div className="pp-copy">
          <span className="cap grey">{fam.no} · {d.kind}</span>
          <h1 className="h72">{name}</h1>
          {d.sub && <span className="cap">{d.sub}</span>}
          <span className="cap grey">{codesOf(d)}</span>
          {one ? <Spec v={one} /> : wireless ? (
            <dl className="dspec">{d.spec.slice(0, 5).map(([k, x]) => <div key={k}><dt>{k}</dt><dd><U>{x}</U></dd></div>)}</dl>
          ) : (
            <p className="t20 grey" style={{ margin: 0 }}>{d.codes.length} versions of one design. Sizes and finishes are listed below.</p>
          )}
          <div className="pp-cta">
            {one && <SelectButton code={one.code} />}
            {!one && <a href="#codes" className="btn">Choose a version</a>}
            <a href={wa("deco", ask)} className="btn ghost">WhatsApp {m.name}</a>
          </div>
          <p className="t14 grey dterm">{LIMITED(d.family) ? <><b>Limited edition · While stock lasts.</b> {TERMS.warranty} Confirm stock before you specify.</> : TERMS.wireless}</p>
        </div>
        <figure className="pp-hero dpiece-hero"><img src={d.img.src} alt={`${name} ${d.kind.toLowerCase()}`} width={d.img.w} height={d.img.h} fetchPriority="high" /></figure>
      </section>

      {d.scenes.length > 0 && (
        <section className="dscene">
          {d.scenes.map((s) => <img key={s.src} src={s.src} alt={`${name} in a room`} width={s.w} height={s.h} loading="lazy" />)}
        </section>
      )}

      {wireless && (
        <section className="wrap dwl" id="codes">
          <div className="dwl-col">
            <span className="cap grey">Finishes · order codes</span>
            <Codes d={d} />
            <p className="t14 grey" style={{ margin: 0 }}>Also available online: shop the collection at <a href="https://www.witlamps.com" target="_blank" rel="noopener">www.witlamps.com</a></p>
          </div>
          <div className="dwl-col">
            <span className="cap grey">Specification</span>
            <dl className="dspec">{d.spec.map(([k, x]) => <div key={k}><dt>{k}</dt><dd><U>{x}</U></dd></div>)}</dl>
          </div>
        </section>
      )}

      {!one && !wireless && (
        <section className="wrap dvars" id="codes">
          {d.variants.map((v) => (
            <div key={v.code} className="dvar">
              {v.dims[0] && <img src={v.dims[0].src} alt={`${v.code} with dimensions`} width={v.dims[0].w} height={v.dims[0].h} loading="lazy" />}
              <span className="h28">{v.code}</span>
              <Spec v={v} />
              <SelectButton code={v.code} />
            </div>
          ))}
        </section>
      )}

      {one && dims.length > 0 && (
        <section className="ddims">
          <div className="wrap ddims-in">
            <div className="ddims-copy"><span className="cap grey">Dimensions</span><span className="h28"><U>{one.size}</U></span><span className="t14 grey">Drawings show the outline and main dimensions only. Not to scale.</span></div>
            <div className="ddims-imgs">{dims.map((x) => <img key={x.src} src={x.src} alt={`${x.code} with dimensions`} width={x.w} height={x.h} loading="lazy" />)}</div>
          </div>
        </section>
      )}

      {d.draw.length > 0 && (
        <section className="ddims">
          <div className="wrap ddims-in">
            <div className="ddims-copy"><span className="cap grey">Dimensions · mm</span><span className="h28">{d.sub || d.name}</span><span className="t14 grey">Drawings show the outline and main dimensions only. Not to scale.</span></div>
            <div className="ddims-imgs">{d.draw.map((x) => <img key={x.src} src={x.src} alt={`${name} with dimensions`} width={x.w} height={x.h} loading="lazy" />)}</div>
          </div>
        </section>
      )}

      {d.extra.length > 0 && (
        <section className="wrap dgal">
          <span className="cap grey">In detail</span>
          <div className="dgal-row">{d.extra.map((s) => <img key={s.src} src={s.src} alt={`${name} detail`} width={s.w} height={s.h} loading="lazy" />)}</div>
        </section>
      )}

      <section className="pp-ask">
        <div className="wrap pp-ask-in">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 680 }}>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>{m.name}</span>
            <span className="h28">Price and delivery for {d.name}, on enquiry.</span>
            <span className="t14" style={{ color: "var(--on-dark-grey)" }}>{TERMS.photos}</span>
          </div>
          <div className="pp-cta">
            <Link href="/decorative/#selection" className="btn light">Send my selection</Link>
            <a href={wa("deco", ask)} className="btn ghost-light">WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="wrap pp-more">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }} className="cap">
          {prev ? <Link href={hrefOf(prev)}>← {prev.name}</Link> : <span />}
          <Link href={`/decorative/${fam.id}/`}>All {fam.name.toLowerCase()}</Link>
          {next ? <Link href={hrefOf(next)}>{next.name} →</Link> : <span />}
        </div>
        <div className="dgrid">{more.map((x) => <DecoCard key={x.slug} c={cardOf(x)} />)}</div>
      </section>
    </DecoShell>
  );
}

// An earlier address: send the visitor on, and tell search engines where the page lives now.
function Moved({ to }: { to: string }) {
  return (
    <DecoShell>
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <section className="wrap" style={{ padding: "120px 0" }}><p className="t20">This page has moved. <Link href={to}>Continue to the collection</Link>.</p></section>
    </DecoShell>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = familyOf(slug);
  if (f) {
    const note = f.id === "wireless" ? TERMS.wireless : `${TERMS.limited} ${TERMS.warranty}`;
    return <><JsonLd data={crumbs([["Decorative Lighting", "/decorative/"], [f.name, `/decorative/${f.id}/`]])} /><Listing cap={`Decorative · chapter ${f.no}`} title={f.name} line={f.line} list={inFamily(f.id)} crumb={f.name} cover={f.cover} note={note} /></>;
  }
  const m = MATS.find((x) => x.id === slug);
  if (m) return <Listing cap="Decorative · by material" title={m.tag} line={m.line} list={withTag(m.tag)} crumb={m.tag} />;
  const d = DECO.find((x) => x.slug === slug);
  if (d) return <Piece d={d} />;
  const to = DECO_REDIRECTS[slug];
  if (!to) notFound();
  return <Moved to={to} />;
}
