import type { Metadata } from "next";
import Link from "next/link";
import DecoShell from "@/components/deco/Shell";
import { SelectionForm } from "@/components/deco/Select";
import { DECO, FAMILIES, MATERIALS, coverOf, designs, inFamily, withTag, hrefOf, titleOf } from "@/lib/deco";
import { MANAGERS, wa } from "@/lib/site";

export const metadata: Metadata = { title: "Decorative Lighting", description: "214+ curated designer lights: pendant, hanging, wall, ceiling, table and floor lights in marble, alabaster, silk, glass and brass." };

const pick = (slug: string) => DECO.find((d) => d.slug === slug)!;
const HERO = pick("hphl1246-s");
const ROOMS = ["hphl1149", "hphl1256-sm1", "hphl1062", "hphl1190", "hpwl1208-bk", "hphl1059", "hpfl1193", "hphl1113", "hpcl1124-a", "hphl1034"].map(pick).filter((d) => d && d.scenes.length);

export default function Page() {
  return (
    <DecoShell>
      <section className="dhero">
        <img src={HERO.scenes[0].src} alt={`${titleOf(HERO)} over a dining table`} className="dhero-img" />
        <div className="dhero-shade" />
        <div className="wrap dhero-copy">
          <span style={{ display: "block", width: 96, height: 2, background: "var(--deco)" }} />
          <span className="cap">Decorative Lighting</span>
          <h1 className="h56">Pieces that hold a room.</h1>
          <p className="t20" style={{ margin: 0, maxWidth: 620 }}>{designs(DECO)}+ curated designer lights. Pendant, hanging, wall, ceiling, table and floor lights in marble, alabaster, silk, glass and brass.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="#types" className="btn light">Browse the collection</a>
            <a href={wa("deco", "Hello MIRAKLE, I have a Decorative Lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.deco.name}</a>
          </div>
        </div>
      </section>

      <section className="wrap dsec" id="types">
        <div className="dsec-head"><span className="cap grey">By type</span><h2 className="h40">Six families, {designs(DECO)} designs.</h2></div>
        <div className="dtiles">
          {FAMILIES.map((f) => {
            const list = inFamily(f.id); const cover = coverOf(list)!;
            return (
              <Link key={f.id} href={`/decorative/${f.id}/`} className="dtile" data-reveal>
                <span className="dtile-img"><img src={cover.src} alt={f.name} loading="lazy" /></span>
                <span className="h28">{f.name}</span>
                <span className="t14 grey">{designs(list)} designs · {f.line}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="dmat">
        <div className="wrap dsec">
          <div className="dsec-head"><span className="cap grey">By material</span><h2 className="h40">Start from what it is made of.</h2></div>
          <div className="dmat-grid">
            {MATERIALS.map((m) => {
              const list = withTag(m.tag);
              return (
                <Link key={m.id} href={`/decorative/${m.id}/`} className="dmat-item">
                  <span className="dmat-img"><img src={list[0].img.src} alt={m.tag} loading="lazy" /></span>
                  <span className="cap">{m.tag}</span>
                  <span className="t14 grey">{list.length} pieces</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dsec" id="rooms">
        <div className="wrap dsec-head"><span className="cap grey">In the room</span><h2 className="h40">See each piece where it lives.</h2></div>
        <div className="drooms">
          {ROOMS.map((d) => (
            <Link key={d.slug} href={hrefOf(d)} className="droom">
              <img src={d.scenes[0].src} alt={titleOf(d)} loading="lazy" />
              <span className="cap">{d.codes[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dselect" id="selection">
        <div className="wrap dsec">
          <div className="dsec-head"><span className="cap grey">Your selection</span><h2 className="h40">Save pieces as you browse. Send the list for a quote.</h2><p className="t16 grey" style={{ margin: 0, maxWidth: 620 }}>Every piece is priced on enquiry. Photographs are for reference; finish, size and light source are as listed for each code.</p></div>
          <SelectionForm />
        </div>
      </section>
    </DecoShell>
  );
}
