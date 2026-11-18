import type { Metadata } from "next";
import Link from "next/link";
import DecoShell from "@/components/deco/Shell";
import { SelectionForm } from "@/components/deco/Select";
import { DECO, FAMILIES, MATERIALS, TERMS, codes, designs, inFamily, withTag } from "@/lib/deco";
import { MANAGERS, wa } from "@/lib/site";

const N = designs(DECO), C = codes(DECO);
export const metadata: Metadata = {
  title: "Decorative Lighting",
  description: `${N} designs in five chapters: pendant lights, hanging lights, wall and ceiling lights, table and floor lamps, and wireless lamps. Limited edition, for homes, hotels, restaurants and retail.`,
  alternates: { canonical: "/decorative/" },
  openGraph: { title: "MIRAKLE Decorative Lighting", description: `Light you live with. ${N} designs in five chapters.`, images: ["/og/decorative.jpg"], url: "/decorative/" },
};

// Feature photographs from the Decorative Catalogue 2027–28, each with the design it shows.
const ROOMS = [
  { slug: "phase", name: "PHASE", img: "/img/deco/phase.jpg" },
  { slug: "glacier", name: "GLACIER", img: "/img/deco/glacier.jpg" },
  { slug: "cosmos", name: "COSMOS", img: "/img/deco/cosmos.jpg" },
  { slug: "steppe", name: "STEPPE", img: "/img/deco/steppe.jpg" },
  { slug: "plume", name: "PLUME", img: "/img/deco/plume.jpg" },
  { slug: "ridge", name: "RIDGE", img: "/img/deco/ridge.jpg" },
  { slug: "garnet", name: "GARNET", img: "/img/deco/garnet.jpg" },
  { slug: "alder", name: "ALDER", img: "/img/deco/alder.jpg" },
];
const LIMITED = [
  { n: "01", t: "Limited stock", d: "Each design is held in a limited quantity." },
  { n: "02", t: "Not restocked", d: "A sold-out design is not reordered and does not return to the range." },
  { n: "03", t: "Check first", d: "Confirm stock for the quantity you need before a design goes into a drawing or a quotation." },
  { n: "04", t: "1 year warranty", d: "On every piece in chapters 01–04. Wrong wiring and physical damage are excluded." },
];

export default function Page() {
  const used = new Set<string>();
  return (
    <DecoShell>
      <section className="dhero">
        <img src="/img/deco/caldera.jpg" alt="CALDERA hanging lights over a living room" className="dhero-img" fetchPriority="high" />
        <div className="dhero-shade" />
        <div className="wrap dhero-copy">
          <span className="cap">Decorative Lighting · Catalogue 2027–28 · Limited edition</span>
          <h1 className="h88">Light you<br />live with.</h1>
          <p className="t20 dhero-line">Pendants, hanging lights, wall and ceiling lights, lamps and a collection of wireless lamps, chosen for the rooms people live in: homes, hotels, restaurants and retail.</p>
          <div className="dhero-btns">
            <a href="#chapters" className="btn light">See the collection</a>
            <a href={wa("deco", "Hello MIRAKLE, I have a Decorative Lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.deco.name}</a>
          </div>
        </div>
        <span className="dhero-tag cap">Pictured · CALDERA</span>
      </section>

      <section className="dfacts">
        <div className="wrap dfacts-in">
          <div><b>{N}</b><span className="cap">Designs</span><span className="t14 grey">Five chapters. Every design with its photographs, specification and order codes.</span></div>
          <div><b>{C}</b><span className="cap">Order codes</span><span className="t14 grey">Every size and finish has its own code. Quote it on every enquiry and order.</span></div>
          <div><b>1 year</b><span className="cap">Warranty</span><span className="t14 grey">On every piece in chapters 01–04.</span></div>
        </div>
      </section>

      <section className="wrap dsec" id="chapters">
        <div className="dsec-head"><span className="cap grey">The collection</span><h2 className="h56">Five chapters.<br />One language.</h2></div>
        <div className="dchap">
          {FAMILIES.map((f) => {
            const list = inFamily(f.id);
            return (
              <Link key={f.id} href={`/decorative/${f.id}/`} className="dchap-item" data-reveal>
                <span className="dchap-img"><img src={f.cover} alt={f.name} loading="lazy" /></span>
                <span className="dchap-no">{f.no}</span>
                <span className="h28">{f.name}</span>
                <span className="t14 grey">{designs(list)} designs · {codes(list)} order codes</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="dband">
        <figure className="dband-img"><img src="/img/deco/saturn.jpg" alt="SATURN pendant in a living room" loading="lazy" /><figcaption className="cap">Pictured · SATURN</figcaption></figure>
        <div className="dband-copy" data-reveal>
          <span className="cap dim">Limited edition</span>
          <h2 className="h56">While stock lasts.</h2>
          <p className="t20 dim" style={{ margin: 0 }}>Every design in chapters 01–04 is a limited edition. When a design sells out, it leaves the range and is not made again.</p>
          <div className="dband-points">
            {LIMITED.map((x) => <div key={x.n}><span className="cap dim">{x.n} · {x.t}</span><span className="t14">{x.d}</span></div>)}
          </div>
        </div>
      </section>

      <section className="dsec" id="rooms">
        <div className="wrap"><div className="dsec-head"><span className="cap grey">In the room</span><h2 className="h56">See each piece where it lives.</h2></div></div>
        <div className="drooms">
          {ROOMS.map((d) => (
            <Link key={d.slug} href={`/decorative/${d.slug}/`} className="droom">
              <img src={d.img} alt={`${d.name} in a room`} loading="lazy" />
              <span className="cap">{d.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dwide">
        <img src="/img/deco/plisse.jpg" alt="PLISSÉ wireless lamps on café tables at dusk" loading="lazy" />
        <div className="dwide-shade" />
        <div className="wrap dwide-copy" data-reveal>
          <span className="cap">05 · Wireless lamps</span>
          <h2 className="h56">Light, untethered.</h2>
          <p className="t20" style={{ margin: 0, maxWidth: 560 }}>Portable, rechargeable lamps. Once charged, they leave the socket behind and go where the evening goes: to the table, the terrace, the bedside.</p>
          <div><Link href="/decorative/wireless/" className="btn light">See the wireless lamps</Link></div>
        </div>
      </section>

      <section className="dmat">
        <div className="wrap dsec">
          <div className="dsec-head"><span className="cap grey">By material</span><h2 className="h40">Start from what it is made of.</h2></div>
          <div className="dmat-grid">
            {MATERIALS.map((m) => {
              const list = withTag(m.tag); const first = list.find((d) => !used.has(d.slug)) || list[0]; used.add(first.slug);
              return (
                <Link key={m.id} href={`/decorative/${m.id}/`} className="dmat-item">
                  <span className="dmat-img"><img src={first.img.src} alt={m.tag} loading="lazy" /></span>
                  <span className="cap">{m.tag}</span>
                  <span className="t14 grey">{list.length} designs</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dselect" id="selection">
        <div className="wrap dsec">
          <div className="dsec-head"><span className="cap grey">Your selection</span><h2 className="h40">Save pieces as you browse. Send the list for a quote.</h2><p className="t16 grey" style={{ margin: 0, maxWidth: 640 }}>Every piece is priced on enquiry. {TERMS.photos}</p></div>
          <SelectionForm />
        </div>
      </section>
    </DecoShell>
  );
}
