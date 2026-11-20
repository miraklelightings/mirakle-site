import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Tech from "@/components/home/Tech";
import InUse from "@/components/home/InUse";
import { DECO, codes, designs } from "@/lib/deco";
import { CLIENTS, INSTAGRAM, MANAGERS, wa } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const WITH = ["Architects", "Interior designers", "Lighting consultants", "Developers", "Builders", "Hospitality projects", "Luxury residences", "Commercial projects", "Modular furniture makers"];
const STEPS = [
  { n: "01", t: "Cut", d: "Measure and cut the profile to length." },
  { n: "02", t: "Cap", d: "Wired end cap at one end, end cap at the other." },
  { n: "03", t: "Connect", d: "To the cabinet power supply, with Phoenix terminals." },
  { n: "04", t: "Light", d: "Plug in. It lights. No soldering anywhere." },
];
// The four chapters of the Architectural Lighting Catalogue 2027–28.
const RANGE = [
  { no: "01", name: "Magnetic lighting", line: "ELVA 5. A 48 V magnetic track system with a 5 mm opening.", href: "/architectural/elva-5/", img: "/img/cat/track_corridor.jpg" },
  { no: "02", name: "Spotlights", line: "Nineteen COB series, recessed, surface and track.", href: "/architectural/#spotlights", img: "/img/cat/spot_corridor.jpg" },
  { no: "03", name: "Linear", line: "OPTIPRO strips, CURVA, ARCUS and SKYLIT.", href: "/architectural/linear/", img: "/img/cat/curva.jpg" },
  { no: "04", name: "LED drivers", line: "Nineteen drivers in six families.", href: "/architectural/drivers/", img: "/p/vega.jpg", product: true },
];
// Four ideas from the catalogue's pages on light.
const ONLIGHT = [
  { cap: "Light and the body", h: "We are built for daylight.", d: "Cool and bright at noon, warm and low at the edges of the day. A room that follows that curve, quietly, feels right without anyone knowing why." },
  { cap: "Colour of light", h: "Kelvin is a mood.", d: "It is the first decision on any scheme, and the one most often left to chance." },
  { cap: "Colour rendering", h: "CRI is honesty.", d: "How faithfully a light shows colour. CRI 90+ across the catalogue." },
  { cap: "Beam", h: "The angle is the drawing.", d: "Choose the angle for the object, not the room." },
];
const PIECES = [
  { slug: "glacier", name: "GLACIER", img: "/img/deco/glacier.jpg" },
  { slug: "cosmos", name: "COSMOS", img: "/img/deco/cosmos.jpg" },
  { slug: "plume", name: "PLUME", img: "/img/deco/plume.jpg" },
  { slug: "steppe", name: "STEPPE", img: "/img/deco/steppe.jpg" },
];

export default function Home() {
  return (
    <>
      <Header over cta={{ label: "Enquire", href: "/contact/" }} />
      <main>
        <Hero />

        {/* What we believe */}
        <section className="wrap hstate">
          <span className="cap grey" data-reveal>MIRAKLE · Ahmedabad</span>
          <h2 className="h88" data-reveal>Light is the first material.</h2>
          <div className="hstate-cols" data-reveal>
            <p className="t20" style={{ margin: 0 }}>Before stone, before timber, before glass, a space is made of light. Everything else is what the light lands on.</p>
            <p className="t16 grey" style={{ margin: 0 }}>One maker, three verticals: architectural lighting for the people who draw buildings, QuikLit for the people who build furniture, and decorative lighting for the rooms people live in.</p>
          </div>
        </section>

        {/* 01 Architectural */}
        <Tech />
        <section className="hrange">
          <div className="hrange-grid">
            {RANGE.map((r) => (
              <Link key={r.no} href={r.href} className="hrange-item" data-reveal>
                <span className={"hrange-img" + ("product" in r ? " product" : "")}><img src={r.img} alt={r.name} loading="lazy" /></span>
                <span className="cap dim">{r.no}</span>
                <span className="h28">{r.name}</span>
                <span className="t14 dim">{r.line}</span>
              </Link>
            ))}
          </div>
        </section>
        <InUse />

        {/* On light */}
        <section className="honl">
          <div className="wrap honl-in">
            <div className="honl-head" data-reveal><span className="cap grey">On light</span><h2 className="h56">Four things we design by.</h2></div>
            <div className="honl-grid">
              {ONLIGHT.map((x, i) => (
                <div key={x.h} className="honl-item" data-reveal>
                  <span className="cap grey">0{i + 1} · {x.cap}</span>
                  <span className="h28">{x.h}</span>
                  <span className="t14 grey">{x.d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 QuikLit */}
        <section className="hql" id="quiklit">
          <figure className="hql-img"><img src="/img/cat/ql_walkin.jpg" alt="A walk-in wardrobe lit by QuikLit profiles" loading="lazy" data-parallax /></figure>
          <div className="wrap hql-top">
            <div className="hql-copy" data-reveal>
              <span className="cap grey">02 · QuikLit</span>
              <h2 className="h88">Cut. Cap.<br />Connect. Light.</h2>
            </div>
            <div className="hql-side" data-reveal>
              <p className="t20" style={{ margin: 0 }}>Simplifying modular furniture lighting. Solderless profile lights and magnetic lighting for kitchens, wardrobes and furniture makers.</p>
              <div className="hbtns">
                <Link href="/quiklit/" className="btn">Explore QuikLit</Link>
                <a href={wa("ql", "Hello MIRAKLE, I have a QuikLit enquiry.")} className="btn ghost">WhatsApp {MANAGERS.ql.name}</a>
              </div>
            </div>
          </div>
          <div className="wrap ql-steps" data-reveal>
            {STEPS.map((s, i) => (
              <div key={s.n} className="ql-step">
                <img src={`/img/ql_step${i + 1}.jpg`} alt={s.t} loading="lazy" />
                <span className="h28">{s.n} {s.t}</span>
                <span className="t14 grey">{s.d}</span>
              </div>
            ))}
          </div>
          <div className="wrap">
            <Link href="/quiklit/boq/" className="hboq" data-reveal>
              <span className="cap dim">The BOQ calculator</span>
              <span className="h56">Enter each line of light.<br />Get the full order list.</span>
              <span className="t16 dim">Profiles, accessory sets, connectors, sensors and power supplies, with order codes.</span>
              <span className="btn light">Open the calculator</span>
            </Link>
          </div>
        </section>

        {/* 03 Decorative */}
        <section className="hdeco" id="decorative">
          <div className="hdeco-top">
            <figure className="hdeco-img"><img src="/img/deco/cover-lunar.jpg" alt="LUNAR pendant light" loading="lazy" /><figcaption className="cap">Pictured · LUNAR</figcaption></figure>
            <div className="hdeco-copy" data-reveal>
              <span className="cap dim">03 · Decorative Lighting</span>
              <h2 className="h88">Light you<br />live with.</h2>
              <p className="t20 dim" style={{ margin: 0 }}>Pendants, hanging lights, wall and ceiling lights, lamps and a collection of wireless lamps, chosen for the rooms people live in.</p>
              <span className="cap">{designs(DECO)} designs · {codes(DECO)} order codes · Limited edition</span>
              <div className="hbtns">
                <Link href="/decorative/" className="btn light">Explore Decorative</Link>
                <a href={wa("deco", "Hello MIRAKLE, I have a Decorative Lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.deco.name}</a>
              </div>
            </div>
          </div>
          <div className="hdeco-pieces">
            {PIECES.map((p) => <Link key={p.slug} href={`/decorative/${p.slug}/`}><img src={p.img} alt={`${p.name} in a room`} loading="lazy" /><span className="cap">{p.name}</span></Link>)}
          </div>
        </section>

        {/* Mission */}
        <section className="story">
          <div className="wrap story-grid">
            <figure className="story-img" data-reveal style={{ margin: 0 }}>
              <img src="/img/cat/honeycomb.jpg" alt="Close view of a recessed spotlight with a honeycomb louvre" loading="lazy" />
            </figure>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span className="cap dim">Our mission</span>
              <h2 className="h40">A fitting is a product. A well-lit room is a solution. We work on the second.</h2>
              <p className="t20 dim" style={{ margin: 0 }}>To be India&apos;s most trusted solution-driven lighting company: for the architect who specifies, the factory that builds and the family that lives with the result.</p>
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
