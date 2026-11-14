import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import LightLab from "@/components/home/LightLab";
import { CLIENTS } from "@/lib/site";

const WORLDS = [
  { n: "01", cap: "Architectural & Technical", h: "Light for architecture", img: "/img/home_lobby.jpg", href: "/architectural/", line: "var(--arch)",
    more: "Spotlights, magnetic track, linear and LED drivers, specified with declared data. ELVA 5 · 19 COB series.", cta: "Enter Architectural →" },
  { n: "02", cap: "QuikLit", h: "Light for furniture", img: "/img/home_kitchen.jpg", href: "/quiklit/", line: "var(--ql)",
    more: "Solder-free 24V profiles, magnetic lights, sensors and power for modular furniture. Cut. Cap. Connect. Light.", cta: "Enter QuikLit →" },
  { n: "03", cap: "Decorative", h: "Light for living", img: "/img/home_dining.jpg", href: "/decorative/", line: "var(--deco)",
    more: "Pendant, wall, ceiling, table and floor lights for homes, hotels and restaurants. 214 designs.", cta: "Enter Decorative →" },
];
const WITH = ["Architects", "Interior designers", "Lighting consultants", "Developers", "Builders", "Hospitality projects", "Luxury residences", "Commercial projects", "Modular furniture makers"];
const NEW = [
  { href: "/architectural/titan/", img: "/img/orbis.jpg", cap: "Architectural · COB", t: "ORBIS. Opens from the front for service. Ø50 and up." },
  { href: "/quiklit/1707/", img: "/img/qmag2.jpg", cap: "QuikLit · QuikMag", t: "QuikMag. Spots and grills that click on anywhere along the track." },
  { href: "/decorative/marble/", img: "/img/deco_linear.jpg", cap: "Decorative · Pendant", t: "Lines of light, hung at different heights over a long table." },
];

export default function Home() {
  return (
    <>
      <Header nav={[{ label: "About", href: "/about/" }, { label: "Downloads", href: "/downloads/" }, { label: "Contact", href: "/contact/" }]} cta={{ label: "Enquire", href: "/contact/" }} />
      <main>
        <Hero />

        {/* Three worlds */}
        <section id="worlds" className="worlds" aria-label="Three worlds">
          {WORLDS.map((w) => (
            <Link key={w.href} href={w.href} className="world">
              <img src={w.img} alt={`${w.h} — visualisation`} />
              <div className="world-copy">
                <span className="world-line" style={{ background: w.line }} />
                <span className="cap" style={{ color: "var(--on-dark-grey)" }}>{w.n}&nbsp;&nbsp;{w.cap}</span>
                <span className="h40">{w.h}</span>
                <span className="world-more">{w.more}<br /><span className="cap" style={{ color: "var(--on-dark)", display: "inline-block", marginTop: 10 }}>{w.cta}</span></span>
              </div>
            </Link>
          ))}
        </section>

        {/* Story */}
        <section className="story">
          <div className="wrap story-grid">
            <figure className="story-img" data-reveal style={{ margin: 0 }}>
              <img src="/img/home_beam.jpg" alt="A single beam of light landing on travertine" />
              <span className="viz-tag">Visualisation</span>
            </figure>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Why light</span>
              <h2 className="h40">Nothing is finished until it is lit.</h2>
              <p className="t20" style={{ margin: 0, color: "var(--on-dark-grey)" }}>
                Stone, plaster, timber and fabric are chosen months before anyone sees them properly. Light decides how they finally look.
              </p>
              <ul className="story-list">
                <li><span className="cap" style={{ color: "var(--on-dark-grey)" }}>Beam</span><span><b>Where light lands.</b> A narrow beam picks out one object. A wide one fills a wall.</span></li>
                <li><span className="cap" style={{ color: "var(--on-dark-grey)" }}>Colour</span><span><b>How a room feels.</b> Warm for evenings, neutral for work.</span></li>
                <li><span className="cap" style={{ color: "var(--on-dark-grey)" }}>Glare</span><span><b>What you should not see.</b> The surface, lit. Not the source.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <LightLab />

        {/* Facts */}
        <section className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 48 }}>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
            <span className="cap grey">Who we are</span>
            <h2 className="h40">Three worlds, one maker.</h2>
            <p className="t20 grey" style={{ margin: 0 }}>
              MIRAKLE is the lighting brand of Hrisha Lighting Projects LLP, Ahmedabad: specification lighting for architecture, a solder-free system for modular furniture, and decorative pieces for the rooms in between.
            </p>
          </div>
          <div className="facts" data-reveal>
            <div className="fact"><span className="fact-n">11</span><span className="t14 grey">years in lighting projects</span></div>
            <div className="fact"><span className="fact-n">35</span><span className="t14 grey">people on the team</span></div>
            <div className="fact"><span className="fact-n">19</span><span className="t14 grey">COB spotlight series</span></div>
            <div className="fact"><span className="fact-n">214</span><span className="t14 grey">decorative designs</span></div>
            <div className="fact"><span className="fact-n">5</span><span className="t14 grey">years of warranty on indoor lighting</span></div>
          </div>
        </section>

        {/* Mission */}
        <section style={{ background: "var(--stone)" }}>
          <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 48 }}>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
              <span className="cap grey">Our mission</span>
              <h2 className="h40">A fitting is a product. A well-lit room is a solution. We work on the second.</h2>
              <p className="t20 grey" style={{ margin: 0 }}>
                We set out to be India&apos;s most trusted solution-driven lighting company: for the architect who specifies, the factory that builds and the family that lives with the result.
              </p>
            </div>
            <div className="steps" data-reveal>
              <div className="step"><span className="cap grey">01 · Design support</span><span className="h28">With the architect</span><span className="t14 grey">Layout and fitting selection is done with the architect, ideally before the ceiling is closed.</span></div>
              <div className="step"><span className="cap grey">02 · Made to order</span><span className="h28">For the project</span><span className="t14 grey">COB spotlights are configured for each project and typically dispatched in 2–3 working days, with no minimum order.</span></div>
              <div className="step"><span className="cap grey">03 · Honest data</span><span className="h28">What we can stand behind</span><span className="t14 grey">Every figure is a declared value, typically ±10%. Where we do not have a value, we leave it out.</span></div>
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
          <section className="wrap" style={{ paddingTop: 96, paddingBottom: 24, display: "flex", flexDirection: "column", gap: 28 }}>
            <span className="cap grey">Trusted by</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 4 }}>
              {CLIENTS.map((c) => <div key={c} className="t20" style={{ background: "var(--stone)", padding: "28px 24px" }}>{c}</div>)}
            </div>
          </section>
        )}

        {/* BOQ */}
        <section className="boq" style={{ marginTop: 96 }}>
          <div className="wrap boq-grid">
            <div className="boq-copy" data-reveal>
              <span className="cap grey">QuikLit · for furniture makers</span>
              <h2 className="h40">Your furniture, counted to the last end cap.</h2>
              <p className="t20 grey" style={{ margin: 0 }}>List each run of light. The bill of quantities builds itself: profiles, accessory sets, sensors and 24V supplies.</p>
              <div><Link href="/quiklit/boq/" className="btn">Open the BOQ calculator</Link></div>
            </div>
            <div className="boq-img"><img src="/img/wardrobe.jpg" alt="A wardrobe lit by QuikLit profiles" /></div>
          </div>
        </section>

        {/* New this season */}
        <section className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 36 }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
            <h2 className="h40">New this season</h2>
            <Link href="/downloads/" className="cap">Request the catalogues →</Link>
          </div>
          <div className="cards3" data-reveal>
            {NEW.map((c) => (
              <Link key={c.href} href={c.href} className="card">
                <div className="card-img"><img src={c.img} alt="" /></div>
                <span className="cap grey">{c.cap}</span>
                <span className="t20">{c.t}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
