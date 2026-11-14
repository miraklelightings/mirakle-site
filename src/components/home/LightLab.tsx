"use client";
import Link from "next/link";
import { useState } from "react";

const name = (k: number) => (k < 3300 ? "Warm white" : k < 4500 ? "Neutral white" : k < 5600 ? "Cool white" : "Daylight");

// One room, two sliders: colour temperature and brightness.
export default function LightLab() {
  const [k, setK] = useState(3000);
  const [dim, setDim] = useState(100);
  const t = (k - 2700) / (6500 - 2700);            // 0 warm → 1 cool
  const warm = Math.max(0, 0.22 - t * 0.9);         // extra amber below ~3500K
  const cool = Math.max(0, t - 0.1);                // blue wash above ~3000K
  return (
    <section className="lab" data-reveal>
      <div className="wrap lab-grid">
        <div className="lab-copy">
          <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Try it</span>
          <h2 className="h40">Same room. Different light.</h2>
          <p style={{ margin: 0, color: "var(--on-dark-grey)" }}>
            Colour temperature decides whether a room feels like an evening at home or a working morning. Brightness decides the rest. Slide both.
          </p>
          <label className="lab-field">
            <span className="cap">Colour temperature · <b>{k}K</b> · {name(k)}</span>
            <input type="range" min={2700} max={6500} step={100} value={k} onChange={(e) => setK(Number(e.target.value))} className="lab-range cct" aria-label="Colour temperature in kelvin" />
          </label>
          <label className="lab-field">
            <span className="cap">Brightness · <b>{dim}%</b></span>
            <input type="range" min={10} max={100} step={1} value={dim} onChange={(e) => setDim(Number(e.target.value))} className="lab-range" aria-label="Brightness" />
          </label>
          <p className="t14" style={{ margin: 0, color: "var(--on-dark-grey)" }}>
            TITAN is offered in fixed whites, tunable white 2700–6500K and dim-to-warm. <Link href="/architectural/titan/#configure" style={{ color: "var(--on-dark)" }}>Build a TITAN code →</Link>
          </p>
        </div>
        <figure className="lab-stage">
          <img src="/img/home_lab.jpg" alt="A living room lit by recessed spotlights" style={{ filter: `brightness(${0.18 + (dim / 100) * 0.87}) saturate(${1 - cool * 0.55})` }} />
          <div className="lab-tint" style={{ background: "#ff9a3c", opacity: warm, mixBlendMode: "soft-light" }} />
          <div className="lab-tint" style={{ background: "#9cc4ff", opacity: cool * 0.62, mixBlendMode: "color" }} />
          <div className="lab-tint" style={{ background: "#dfeaff", opacity: cool * 0.18 * (dim / 100), mixBlendMode: "screen" }} />
          <figcaption className="viz-tag">Visualisation · on-screen approximation</figcaption>
        </figure>
      </div>
    </section>
  );
}
