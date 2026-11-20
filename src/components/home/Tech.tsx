"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MANAGERS, wa } from "@/lib/site";

// Technical Lighting chapter. The room is dark; the visitor's cursor is the light.
export default function Tech() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let manual = false, raf = 0;
    const set = (x: number, y: number) => { el.style.setProperty("--x", x + "%"); el.style.setProperty("--y", y + "%"); };
    const move = (e: PointerEvent) => { manual = true; const r = el.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100); };
    const leave = () => { manual = false; };
    const drift = (t: number) => { if (!manual) set(60 + Math.sin(t / 2600) * 22, 42 + Math.cos(t / 3400) * 12); raf = requestAnimationFrame(drift); };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(drift);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} className="tech chapter" id="technical">
      <img src="/img/cat/arcus.jpg" alt="A brick wall grazed with light" />
      <div className="tech-shade" />
      <div className="wrap tech-copy">
        <span className="chapter-num" style={{ color: "var(--on-dark-grey)" }}><span style={{ display: "inline-block", width: 56, height: 2, background: "var(--arch)", verticalAlign: "middle", marginRight: 14 }} />01 · Architectural</span>
        <h2 className="h88" style={{ maxWidth: 900 }}>See the light.<br />Never the lamp.</h2>
        <p className="t20" style={{ margin: 0, maxWidth: 560, color: "rgba(246,244,240,.82)" }}>
          A good fitting disappears. What stays is a circle on the floor, a wash on the wall, a glow in the cove.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <Link href="/architectural/" className="btn light">Explore the full range</Link>
          <a href={wa("arch", "Hello MIRAKLE, I have an Architectural lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.arch.name}</a>
        </div>
      </div>
      <span className="viz-tag">Move your cursor</span>
    </section>
  );
}
