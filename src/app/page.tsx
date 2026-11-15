import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tech from "@/components/home/Tech";
import RoomLab from "@/components/home/RoomLab";
import { CLIENTS, INSTAGRAM, MANAGERS, wa } from "@/lib/site";

const WITH = ["Architects", "Interior designers", "Lighting consultants", "Developers", "Builders", "Hospitality projects", "Luxury residences", "Commercial projects", "Modular furniture makers"];
const STEPS = [
  { n: "01", t: "Cut", d: "Measure and cut the profile to length." },
  { n: "02", t: "Cap", d: "Wired end cap at one end, end cap at the other." },
  { n: "03", t: "Connect", d: "To the cabinet power supply, with Phoenix terminals." },
  { n: "04", t: "Light", d: "Plug in. It lights. No soldering anywhere." },
];
const PIECES = ["HPHL1166", "HPHL1249", "HPHL1280", "HPHL1252"];

export default function Home() {
  return (
    <>
      <Header nav={[{ label: "About", href: "/about/" }, { label: "Downloads", href: "/downloads/" }, { label: "Contact", href: "/contact/" }]} cta={{ label: "Enquire", href: "/contact/" }} />
      <main>
        {/* Landing: the three verticals */}
        <section className="landing" aria-label="MIRAKLE: three verticals">
          <div className="wrap landing-head">
            <h1 className="h40" style={{ maxWidth: 760 }}>India&apos;s most trusted name in light.</h1>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Three verticals · one maker · Ahmedabad</span>
          </div>
          <div className="worlds" id="worlds">
            <div className="world">
              <img src="/img/home_lobby.jpg" alt="A hotel lobby wall grazed by linear light, track spotlights on the desk" />
              <Link href="/architectural/" aria-label="Architectural" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
              <div className="world-copy" style={{ zIndex: 2, pointerEvents: "none" }}>
                <span className="world-line" style={{ background: "var(--arch)" }} />
                <span className="cap" style={{ color: "var(--on-dark-grey)" }}>01</span>
                <span className="h40">Architectural</span>
                <span className="world-desc">Magnetic track, COB spotlights, linear light and LED drivers for professional projects, architects and interior designers.</span>
                <span className="world-tag">1000+ SKUs · Locally assembled</span>
                <span className="world-cta" style={{ pointerEvents: "auto" }}><Link href="/architectural/" className="btn light">Explore</Link></span>
              </div>
            </div>
            <div className="world big">
              <img src="/img/home_kitchen.jpg" alt="A modular kitchen and shelves lit by slim profile lights" />
              <Link href="/quiklit/" aria-label="QuikLit" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
              <div className="world-copy" style={{ zIndex: 2, pointerEvents: "none" }}>
                <span className="world-line" style={{ background: "var(--ql)" }} />
                <span className="cap" style={{ color: "var(--on-dark-grey)" }}>02</span>
                <span className="h40">QuikLit</span>
                <span className="world-desc">Solderless cabinet and magnetic lighting for modular kitchens, wardrobes and furniture manufacturers.</span>
                <span className="world-tag">Cut · Cap · Connect · Light</span>
                <span className="world-cta" style={{ pointerEvents: "auto" }}><Link href="/quiklit/" className="btn light">Explore</Link><Link href="/quiklit/boq/" className="btn ghost-light">BOQ calculator</Link></span>
              </div>
            </div>
            <div className="world">
              <img src="/img/deco_kitchen.jpg" alt="Brass pendants over a kitchen island" />
              <Link href="/decorative/" aria-label="Decorative Lighting" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
              <div className="world-copy" style={{ zIndex: 2, pointerEvents: "none" }}>
                <span className="world-line" style={{ background: "var(--deco)" }} />
                <span className="cap" style={{ color: "var(--on-dark-grey)" }}>03</span>
                <span className="h40">Decorative Lighting</span>
                <span className="world-desc">Curated designer lights for premium residential, hospitality and commercial spaces.</span>
                <span className="world-tag">214+ curated designer lights</span>
                <span className="world-cta" style={{ pointerEvents: "auto" }}><Link href="/decorative/" className="btn light">Explore</Link></span>
              </div>
            </div>
          </div>
        </section>

        {/* 01 Technical */}
        <Tech />
        <RoomLab />

        {/* 02 QuikLit */}
        <section className="ql chapter" id="quiklit">
          <div className="wrap ql-top">
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span className="ql-line" />
              <span className="chapter-num grey">02 · QuikLit</span>
              <h2 className="h56">Cut. Cap. Connect. Light.</h2>
              <p className="t20 grey" style={{ margin: 0 }}>Solderless cabinet lighting and magnetic lighting for modular kitchens, wardrobes and furniture manufacturers.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/quiklit/boq/" className="btn">Open the BOQ calculator</Link>
                <Link href="/quiklit/" className="btn ghost">Explore QuikLit</Link>
                <a href={wa("ql", "Hello MIRAKLE, I have a QuikLit enquiry.")} className="btn ghost">WhatsApp {MANAGERS.ql.name}</a>
              </div>
            </div>
            <figure className="ql-img" data-reveal style={{ margin: 0 }}><img src="/img/wardrobe.jpg" alt="A wardrobe lit by QuikLit profiles" /></figure>
          </div>
          <div className="wrap ql-steps" data-reveal>
            {STEPS.map((s, i) => (
              <div key={s.n} className="ql-step">
                <img src={`/img/ql_step${i + 1}.jpg`} alt={s.t} />
                <span className="h28">{s.n} {s.t}</span>
                <span className="t14 grey">{s.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Decorative */}
        <section className="deco chapter" id="decorative">
          <div className="deco-grid">
            <div className="deco-main"><img src="/img/deco_dining.jpg" alt="A silk pendant over a dining table" /></div>
            <div className="deco-side" data-reveal>
              <span style={{ display: "block", width: 96, height: 2, background: "var(--deco)" }} />
              <span className="chapter-num" style={{ color: "var(--on-dark-grey)" }}>03 · Decorative Lighting</span>
              <h2 className="h56">214+ curated designer lights.</h2>
              <p className="t20" style={{ margin: 0, color: "rgba(246,244,240,.8)" }}>A carefully selected collection, chosen for form, material and detail. For premium residential, hospitality and commercial spaces.</p>
              <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Marble · Mulberry silk · Glass · Resin · Paper</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/decorative/" className="btn light">Explore Decorative Lighting</Link>
                <a href={wa("deco", "Hello MIRAKLE, I have a Decorative Lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.deco.name}</a>
              </div>
            </div>
          </div>
          <div className="deco-pieces">
            {PIECES.map((p) => <Link key={p} href={`/decorative/${p === "HPHL1252" ? "hphl1252-gd" : p.toLowerCase()}/`} aria-label={p}><img src={`/img/${p}.jpg`} alt={p} /></Link>)}
          </div>
        </section>

        {/* Why light */}
        <section className="story">
          <div className="wrap story-grid">
            <figure className="story-img" data-reveal style={{ margin: 0 }}>
              <img src="/img/home_beam.jpg" alt="A single beam of light landing on travertine" />
              <span className="viz-tag">Visualisation</span>
            </figure>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Our mission</span>
              <h2 className="h40">A fitting is a product. A well-lit room is a solution. We work on the second.</h2>
              <p className="t20" style={{ margin: 0, color: "var(--on-dark-grey)" }}>
                To be India&apos;s most trusted solution-driven lighting company: for the architect who specifies, the factory that builds and the family that lives with the result.
              </p>
              <div><Link href="/about/" className="btn ghost-light">About MIRAKLE</Link></div>
            </div>
          </div>
        </section>

        {/* Who we work with */}
        <div className="marquee" aria-label="Who we work with">
          <div className="marquee-track cap">
            {[...WITH, ...WITH].map((x, i) => <span key={i} className="grey">{x}</span>)}
          </div>
        </div>
        {CLIENTS.length > 0 && (
          <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96, display: "flex", flexDirection: "column", gap: 28 }}>
            <span className="cap grey">Trusted by</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 4 }}>
              {CLIENTS.map((c) => <div key={c} className="t20" style={{ background: "var(--stone)", padding: "28px 24px" }}>{c}</div>)}
            </div>
          </section>
        )}

        {/* Instagram */}
        <section className="insta">
          <a href={INSTAGRAM.url} target="_blank" rel="noopener" className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, paddingTop: 104, paddingBottom: 104 }}>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Follow our work on Instagram</span>
            <span className="h56">{INSTAGRAM.handle}</span>
            <span className="btn light" style={{ marginTop: 8 }}>Open Instagram</span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
