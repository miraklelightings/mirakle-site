"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The opening screen. One line, one photograph at a time, and the three verticals always in view.
const SLIDES = [
  { id: "arch", no: "01", name: "Architectural", href: "/architectural/", line: "Magnetic track, spotlights, linear light and LED drivers.", img: "/img/cat/elva.jpg", alt: "ELVA 5 magnetic track lighting a living room with a slatted wall", pos: "50% 45%" },
  { id: "ql", no: "02", name: "QuikLit", href: "/quiklit/", line: "Solderless lighting for kitchens, wardrobes and furniture.", img: "/img/cat/ql_cover.jpg", alt: "Furniture shelves lit by slim QuikLit profile lights", pos: "50% 45%" },
  { id: "deco", no: "03", name: "Decorative", href: "/decorative/", line: "Pendants, hanging lights, lamps and wireless lamps.", img: "/img/deco/phase.jpg", alt: "PHASE pendant lights hanging through a spiral staircase", pos: "50% 50%" },
];
const HOLD = 6500;
// A six-second film made from the same catalogue photograph as slide 01. Larger screens only; the photograph stays underneath as the fallback.
const FILM = "/video/elva.mp4";
// As the camera moves in, the track would climb behind the header. The film is eased down by this much (per cent) over its length so the track stays in view.
const FILM_TOP = 45;

export default function Hero() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % SLIDES.length), HOLD);
    return () => window.clearTimeout(t);
  }, [i, held]);
  const [film, setFilm] = useState(false);
  const [filmOn, setFilmOn] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok = window.matchMedia("(min-width: 900px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !(c && c.saveData);
    if (ok) setFilm(true);
  }, []);
  useEffect(() => {
    const v = vid.current; if (!v) return;
    if (i === 0) {
      try { v.currentTime = 0; } catch { /* not ready yet */ }
      v.play().catch(() => {});
      let raf = 0;
      const follow = () => {
        const k = v.duration ? Math.min(1, Math.max(0, v.currentTime / v.duration)) : 0;
        v.style.objectPosition = `50% ${(FILM_TOP * (1 - k)).toFixed(2)}%`;
        raf = window.requestAnimationFrame(follow);
      };
      raf = window.requestAnimationFrame(follow);
      return () => window.cancelAnimationFrame(raf);
    }
    const t = window.setTimeout(() => v.pause(), 1700);
    return () => window.clearTimeout(t);
  }, [i, film]);
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
      {film && <video ref={vid} className={"hh-img hh-vid" + (i === 0 && filmOn ? " on" : "")} src={FILM} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} style={{ objectPosition: SLIDES[0].pos }} onPlaying={() => setFilmOn(true)} onError={() => { setFilmOn(false); setFilm(false); }} />}
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
