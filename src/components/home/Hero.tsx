"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The opening screen. One line, one photograph at a time, and the three verticals always in view.
const SLIDES = [
  { id: "arch", no: "01", name: "Architectural", href: "/architectural/", line: "Magnetic track, spotlights, linear light and LED drivers.", img: "/img/cat/elva.jpg", alt: "ELVA 5 magnetic track lighting a living room with a slatted wall", pos: "50% 60%" },
  { id: "ql", no: "02", name: "QuikLit", href: "/quiklit/", line: "Solderless lighting for kitchens, wardrobes and furniture.", img: "/img/cat/ql_cover.jpg", alt: "Furniture shelves lit by slim QuikLit profile lights", pos: "50% 45%" },
  { id: "deco", no: "03", name: "Decorative", href: "/decorative/", line: "Pendants, hanging lights, lamps and wireless lamps.", img: "/img/deco/phase.jpg", alt: "PHASE pendant lights hanging through a spiral staircase", pos: "50% 50%" },
];
const HOLD = 6500;

export default function Hero() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % SLIDES.length), HOLD);
    return () => window.clearTimeout(t);
  }, [i, held]);
  // The rail below stands in for the bottom dock while it is on screen.
  const rail = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = rail.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => document.documentElement.classList.toggle("dock-off", e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); document.documentElement.classList.remove("dock-off"); };
  }, []);
  return (
    <section className="hh" aria-label="MIRAKLE: light, thought through" onPointerLeave={() => setHeld(false)}>
      {SLIDES.map((s, k) => <img key={s.id} src={s.img} alt={k === i ? s.alt : ""} className={"hh-img" + (k === i ? " on" : "")} style={{ objectPosition: s.pos }} fetchPriority={k === 0 ? "high" : "low"} />)}
      <div className="hh-shade" />
      <div className="wrap hh-copy">
        <h1 className="h120 rise"><span><i>Light,</i></span><span><i>thought through.</i></span></h1>
        <p className="cap hh-desc fadeup">Lighting for architecture, furniture and interiors</p>
      </div>
      <nav ref={rail} className="hh-rail" aria-label="The three verticals">
        {SLIDES.map((s, k) => (
          <Link key={s.id} href={s.href} className={"hh-item" + (k === i ? " on" : "")} onPointerEnter={() => { setI(k); setHeld(true); }} onFocus={() => { setI(k); setHeld(true); }} onBlur={() => setHeld(false)}>
            <span className="hh-bar"><span key={`${k}-${i}-${held}`} className={k === i && !held ? "run" : k === i ? "full" : ""} /></span>
            <span className="cap hh-no">{s.no}</span>
            <span className="hh-name">{s.name}</span>
            <span className="hh-line">{s.line}</span>
            <span className="cap hh-go">Explore →</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
