"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILES, PIECES, SENSORS, RULES, UNITS, PLACES, WIRING } from "@/lib/quiklit";
import { buildBoq, boqText, toMm, type Run, type Extras, type Cct } from "@/lib/boq";
import { MANAGERS } from "@/lib/site";
import { ENQUIRY_URL } from "@/components/Enhance";
import { DEMO, RECORDED, type Lang } from "./demo";
import { U, capsText } from "@/lib/units";

const blank = (id: number): Run => ({ id, place: "Wardrobe", room: "", profile: "1707", cct: "3K", length: 0, unit: "mm", units: 1, linesEach: 1, corners: 0, sensor: "" });
const PRESETS: { label: string; runs: Omit<Run, "id">[] }[] = [
  { label: "Two-door wardrobe", runs: [
    { place: "Wardrobe", room: "Master bedroom wardrobe", profile: "1010", cct: "3K", length: 2100, unit: "mm", units: 1, linesEach: 2, corners: 0, sensor: "QUIKSENS-TWIN DOOR" } ] },
  { label: "Kitchen under-cabinet", runs: [
    { place: "Kitchen under-cabinet", room: "Kitchen", profile: "0809", cct: "4K", length: 3.6, unit: "m", units: 1, linesEach: 1, corners: 2, sensor: "QUIKSENS-HANDSWEEP" } ] },
  { label: "Walk-in wardrobe", runs: [
    { place: "Walk-in wardrobe", room: "Walk-in shelves", profile: "1707", cct: "3K", length: 900, unit: "mm", units: 1, linesEach: 6, corners: 0, sensor: "QUIKSENS-HUMAN" } ] },
];
const cctName = (c: string) => (c === "3K" ? "3000K warm white" : "4000K natural white");
const n2 = (x: number) => (Math.round(x * 100) / 100).toString();
const plural = (q: number, unit: string) => (q === 1 ? unit.replace(/s$/, "") : unit);

export default function Calculator() {
  const [runs, setRuns] = useState<Run[]>([blank(1)]);
  const [extras, setExtras] = useState<Extras>({});
  const [nextId, setNextId] = useState(2);
  const [who, setWho] = useState({ name: "", mobile: "", firm: "", city: "", project: "" });
  const [sent, setSent] = useState<"" | "sending" | "ok" | "err" | "need">("");

  // ---- guided demo
  const [step, setStep] = useState(-1);
  const [lang, setLang] = useState<Lang>("en");
  // Recorded narration plays when it has been added (see RECORDED in demo.ts); until then the voice is off by default.
  const recorded: Record<string, number> = RECORDED;
  const [voice, setVoice] = useState(RECORDED.en > 0 || RECORDED.hi > 0);
  const [noVoice, setNoVoice] = useState(false);
  const [voicesAt, setVoicesAt] = useState(0);
  useEffect(() => {
    // browsers load their voices a moment after the page; note when they arrive
    if (!("speechSynthesis" in window)) return;
    const ready = () => setVoicesAt(Date.now());
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", ready);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", ready);
  }, []);
  const [paused, setPaused] = useState(false);
  const saved = useRef<{ runs: Run[]; extras: Extras } | null>(null);
  const demoOn = step >= 0;
  const hot = demoOn ? DEMO[step].hot : "";

  const boq = useMemo(() => buildBoq(runs, extras), [runs, extras]);
  const set = (id: number, patch: Partial<Run>) => setRuns((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const add = () => { setRuns((rs) => [...rs, blank(nextId)]); setNextId(nextId + 1); };
  const load = (i: number) => { const rs = PRESETS[i].runs.map((r, k) => ({ ...r, id: nextId + k })); setRuns(rs); setNextId(nextId + rs.length); };
  const setX = (k: string, v: string) => setExtras((e) => ({ ...e, [k]: Math.max(0, Math.floor(Number(v) || 0)) }));
  const hasWork = boq.lines.length > 0;

  const startDemo = () => { saved.current = { runs, extras }; setPaused(false); setStep(0); };
  const stopDemo = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setStep(-1);
    if (saved.current) { setRuns(saved.current.runs); setExtras(saved.current.extras); saved.current = null; }
  };
  useEffect(() => {
    if (step < 0) return;
    const s = DEMO[step];
    setRuns(s.runs.map((r, i) => ({ ...r, id: 9000 + i })));
    setExtras({});
    const t0 = setTimeout(() => document.querySelector("[data-hot='1']")?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    if (paused) return () => clearTimeout(t0);
    const text = s.say[lang];
    const next = () => setStep((x) => (x >= 0 && x < DEMO.length - 1 ? x + 1 : x));
    let timer: ReturnType<typeof setTimeout> | undefined;
    setNoVoice(false);
    const clipLang = lang === "en" ? "en" : "hi";                       // Hinglish is spoken as the Hindi recording
    if (voice && (recorded[clipLang] || 0) > step) {
      const a = new Audio(`/audio/demo/${clipLang}-${String(step + 1).padStart(2, "0")}.mp3`);
      a.onended = () => { timer = setTimeout(next, 600); };
      a.onerror = () => { timer = setTimeout(next, Math.max(4200, text.length * 62)); };
      a.play().catch(() => { timer = setTimeout(next, Math.max(4200, text.length * 62)); });
      return () => { clearTimeout(t0); if (timer) clearTimeout(timer); a.onended = null; a.onerror = null; a.pause(); };
    }
    const v = voice && typeof window !== "undefined" && "speechSynthesis" in window ? bestVoice(lang) : null;
    if (voice && !v) setNoVoice(true);
    if (v) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = v; u.lang = v.lang;
      u.rate = 0.95;
      u.onend = () => { timer = setTimeout(next, 700); };
      window.speechSynthesis.speak(u);
      // safety: some browsers never fire onend
      const guard = setTimeout(next, Math.max(9000, text.length * 110));
      return () => { clearTimeout(t0); clearTimeout(guard); if (timer) clearTimeout(timer); u.onend = null; window.speechSynthesis.cancel(); };
    }
    timer = setTimeout(next, Math.max(4200, text.length * 62));
    return () => { clearTimeout(t0); if (timer) clearTimeout(timer); };
  }, [step, lang, voice, paused, voicesAt]); // eslint-disable-line react-hooks/exhaustive-deps

  const text = boqText(boq, { name: [who.name, who.firm].filter(Boolean).join(", "), project: who.project, city: who.city });
  const m = MANAGERS.ql;
  const sendIt = async () => {
    if (!who.name.trim() || who.mobile.replace(/\D/g, "").length < 10) { setSent("need"); return; }
    setSent("sending");
    try {
      await fetch(ENQUIRY_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({
        world: "ql", form: "BOQ calculator", name: who.name.trim(), mobile: who.mobile.trim(), email: "", company: who.firm.trim(), role: "", city: who.city.trim(), project: who.project.trim(), sendVia: "",
        items: boq.lines.map((l) => `${l.code} × ${l.qty} ${l.unit}`).join("; "),
        message: `${boq.lights} lights, ${n2(boq.metres)} m, ${Math.round(boq.watts)} W. ` + runs.filter((r) => toMm(r) > 0).map((r) => `${r.room || r.place}: ${PROFILES.find((p) => p.key === r.profile)?.name} ${r.length} ${r.unit} × ${r.units} × ${r.linesEach}${r.corners ? `, ${r.corners} corners` : ""}${r.sensor ? `, ${r.sensor}` : ""}`).join(" | "),
        page: typeof window !== "undefined" ? window.location.href : "", website: "",
      }) });
      setSent("ok");
    } catch { setSent("err"); }
  };

  const groups = boq.lines.reduce<{ name: string; lines: typeof boq.lines }[]>((a, l) => { const g = a.find((x) => x.name === l.group); if (g) g.lines.push(l); else a.push({ name: l.group, lines: [l] }); return a; }, []);
  const cap = boq.supplies.reduce((a, s) => a + s.qty * (s.code.endsWith("60W") ? 51 : s.code.endsWith("100W") ? 85 : 127), 0);
  const H = (k: string) => (hot === k ? { "data-hot": "1" } : {});

  return (
    <div className="calc">
      <div className="calc-top no-print">
        <button type="button" className="btn" onClick={demoOn ? stopDemo : startDemo}>{demoOn ? "Close the demo" : "▶ Show me how it works"}</button>
        <span className="cap grey calc-or">or start from</span>
        {PRESETS.map((p, i) => <button key={p.label} type="button" className="btn ghost" disabled={demoOn} onClick={() => load(i)}>{p.label}</button>)}
      </div>

      {demoOn && (
        <div className="calc-demo no-print" role="status" aria-live="polite">
          <div className="calc-demo-head">
            <span className="cap">Demo · {step + 1} of {DEMO.length} · {DEMO[step].title}</span>
            <span className="calc-demo-ctl">
              <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)}><option value="en">ENGLISH</option><option value="hi">हिंदी</option><option value="hg">HINGLISH</option></select>
              <button type="button" onClick={() => setVoice(!voice)} aria-pressed={voice}>{voice ? "Voice on" : "Voice off"}</button>
              <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</button>
              <button type="button" onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>
              <button type="button" onClick={() => setStep(Math.min(DEMO.length - 1, step + 1))} disabled={step === DEMO.length - 1}>Next</button>
            </span>
          </div>
          <p className="t20" lang={lang === "en" ? "en" : "hi"}><U>{DEMO[step].say[lang]}</U></p>
          {voice && noVoice && <span className="t14" style={{ color: "var(--on-dark-grey)" }}>This device has no Indian voice installed, so the demo is showing in text.</span>}
          <div className="calc-demo-bar"><i style={{ width: `${((step + 1) / DEMO.length) * 100}%` }} /></div>
          {step === DEMO.length - 1 && <button type="button" className="btn" onClick={stopDemo}>Clear the demo and start my project</button>}
        </div>
      )}

      <div className="calc-print">
        <b>MIRAKLE QuikLit · Bill of quantities</b>
        <span>{[who.project, who.name, who.firm, who.city, who.mobile].filter(Boolean).join(" · ")}</span>
      </div>

      <section className="calc-runs" aria-label="Lines of light">
        {runs.map((r, i) => {
          const p = PROFILES.find((x) => x.key === r.profile) || PROFILES[0];
          const lines = Math.max(1, r.units) * Math.max(1, r.linesEach);
          const mm = toMm(r);
          return (
            <fieldset key={r.id} className="calc-run" {...H(`r${i}`)}>
              <div className="calc-run-head">
                <span className="cap grey">Line {i + 1}</span>
                {mm > 0 && <span className="t14 grey"><U>{`${lines} ${plural(lines, "lines")} × ${n2(mm / 1000)} m = ${n2((mm / 1000) * lines)} m${p.wpm ? ` · ${n2((mm / 1000) * lines * p.wpm)} W` : ""}`}</U></span>}
                {runs.length > 1 && !demoOn && <button type="button" className="calc-x no-print" onClick={() => setRuns((rs) => rs.filter((x) => x.id !== r.id))}>Remove</button>}
              </div>
              <label className="field" {...H(`r${i}-place`)}>Where is the light
                <select value={r.place} onChange={(e) => set(r.id, { place: e.target.value })}>{PLACES.map((x) => <option key={x} value={x}>{capsText(x)}</option>)}</select></label>
              <label className="field span2" {...H(`r${i}-place`)}>Your name for it
                <input value={r.room} placeholder="e.g. Master bedroom wardrobe" onChange={(e) => set(r.id, { room: e.target.value })} /></label>
              <label className="field span2" {...H(`r${i}-profile`)}>Profile
                <select value={r.profile} onChange={(e) => set(r.id, { profile: e.target.value, corners: 0 })}>
                  {PROFILES.map((x) => <option key={x.key} value={x.key}>{capsText(`${x.name} · ${x.size}${x.wpm ? ` · ${x.wpm} W/m` : ""}`)}</option>)}
                </select></label>
              {!p.noCct && <label className="field" {...H(`r${i}-profile`)}>Light colour
                <select value={r.cct} onChange={(e) => set(r.id, { cct: e.target.value as Cct })}><option value="3K">{capsText(cctName("3K"))}</option><option value="4K">{capsText(cctName("4K"))}</option></select></label>}
              <label className="field" {...H(`r${i}-len`)}>Length of one line
                <span className="calc-len">
                  <input type="number" min={0} step="any" inputMode="decimal" value={r.length || ""} placeholder="0" onChange={(e) => set(r.id, { length: Number(e.target.value) })} />
                  <select aria-label="Unit" value={r.unit} onChange={(e) => set(r.id, { unit: e.target.value })}>{Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{capsText(u.label)}</option>)}</select>
                </span></label>
              <label className="field" {...H(`r${i}-qty`)}>How many of these
                <input type="number" min={1} inputMode="numeric" value={r.units || ""} onChange={(e) => set(r.id, { units: Number(e.target.value) })} /></label>
              <label className="field" {...H(`r${i}-qty`)}>Lines of light in each
                <input type="number" min={1} inputMode="numeric" value={r.linesEach || ""} onChange={(e) => set(r.id, { linesEach: Number(e.target.value) })} /></label>
              {p.corner && !p.rollM && <label className="field" {...H(`r${i}-corners`)}>Corners in one line
                <input type="number" min={0} inputMode="numeric" value={r.corners || ""} placeholder="0" onChange={(e) => set(r.id, { corners: Number(e.target.value) })} /></label>}
              <label className="field span2" {...H(`r${i}-sensor`)}>Sensor, one for each (optional)
                <select value={r.sensor} onChange={(e) => set(r.id, { sensor: e.target.value })}>
                  {SENSORS.map((s) => <option key={s.code} value={s.code}>{capsText(`${s.label}${s.use ? ` · ${s.use}` : ""}`)}</option>)}
                </select></label>
            </fieldset>
          );
        })}
        {!demoOn && <button type="button" className="btn ghost no-print calc-add" onClick={add}>+ Add another line</button>}
      </section>

      <details className="calc-extra no-print-closed">
        <summary><span className="cap">Add QuikMag lights, QuikSpot and extension wires</span><span className="t14 grey">Counted by the piece</span></summary>
        <div className="calc-extra-grid">
          {[...new Set(PIECES.map((x) => x.group))].map((g) => (
            <div key={g} className="calc-extra-col">
              <span className="cap grey">{g}</span>
              <div className="calc-xrow calc-xhead"><span /><span>3000K</span><span>4000K</span></div>
              {PIECES.filter((x) => x.group === g).map((it) => (
                <div key={it.key} className="calc-xrow">
                  <span><U>{it.name}</U> <i className="grey">{it.w} W</i></span>
                  {(["3K", "4K"] as const).map((c) => <input key={c} aria-label={`${it.name} ${c}`} type="number" min={0} inputMode="numeric" placeholder="0" value={extras[`${it.key}|${c}`] || ""} onChange={(e) => setX(`${it.key}|${c}`, e.target.value)} />)}
                </div>
              ))}
            </div>
          ))}
          <div className="calc-extra-col">
            <span className="cap grey">Extension wires, when the supply sits further away</span>
            <div className="calc-xrow calc-xhead"><span /><span>Qty</span><span /></div>
            <div className="calc-xrow"><span>To a light <i className="grey">2000 <span className="u">mm</span></i></span><input aria-label="Extension wire" type="number" min={0} placeholder="0" value={extras.ext || ""} onChange={(e) => setX("ext", e.target.value)} /><span /></div>
            <div className="calc-xrow"><span>To a sensor <i className="grey">1000 <span className="u">mm</span></i></span><input aria-label="Sensor extension wire" type="number" min={0} placeholder="0" value={extras.sensorExt || ""} onChange={(e) => setX("sensorExt", e.target.value)} /><span /></div>
          </div>
        </div>
      </details>

      <section className="calc-out" aria-live="polite" {...H("out")}>
        <div className="calc-out-head">
          <h2 className="h40">Your order list</h2>
          {!hasWork && <p className="t16 grey">Enter a length above and the list builds itself.</p>}
        </div>
        {hasWork && (
          <>
            <div className="calc-tiles">
              <div><b>{boq.lights}</b><span className="cap grey">{plural(boq.lights, "Lights")}</span></div>
              <div><b>{n2(boq.metres)} <span className="u">m</span></b><span className="cap grey">Of light</span></div>
              <div><b>{Math.round(boq.watts)} W</b><span className="cap grey">Total load</span></div>
              <div><b>{cap ? `${Math.round((boq.watts / cap) * 100)}%` : "–"}</b><span className="cap grey">Of safe supply load</span></div>
            </div>
            <div className="calc-table">
              <table>
                <thead><tr><th>Order code</th><th>What it is</th><th className="num">Quantity</th></tr></thead>
                {groups.map((g) => (
                  <tbody key={g.name}>
                    <tr className="calc-g"><td colSpan={3}>{g.name}</td></tr>
                    {g.lines.map((l) => (
                      <tr key={l.code}>
                        <td className="calc-code">{l.code}</td>
                        <td className="grey"><U>{l.desc}</U>{l.note && <em><U>{l.note}</U></em>}</td>
                        <td className="num"><U>{`${l.qty} ${plural(l.qty, l.unit)}`}</U></td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            {boq.spare.some((s) => s.orderM - s.needM > 0.3) && (
              <div className="calc-spare" {...H("spare")}>
                <span className="cap">Spare profile, not waste</span>
                <p className="t16 grey"><U>Profiles come in 3 m lengths, two to a pack. What is left after cutting can light a drawer, a shelf or a niche.</U></p>
                <ul>
                  {boq.spare.filter((s) => s.orderM - s.needM > 0.3).map((s) => (
                    <li key={s.code}><b>{s.code}</b><span><U>{`${n2(s.orderM - s.needM)} m spare: ${summarise(s.offcuts)}`}</U></span></li>
                  ))}
                </ul>
              </div>
            )}

            {boq.warnings.length > 0 && <ul className="calc-warn">{boq.warnings.map((w) => <li key={w}><U>{w}</U></li>)}</ul>}

            <p className="t14 grey calc-rules">
              <U>{`How this is counted: one accessory set for each light; a supply is loaded to no more than ${RULES.loadPct}% of its rating (51 W on 60 W, 85 W on 100 W, 127 W on 150 W); one light for each light port, with the ${WIRING.splitter.ports}-port splitter when you need more; one sensor to a supply; profiles in 6 m packs, with one round packing tube for every ${RULES.tubeM} m. Cutting allows ${RULES.cutMm} mm for each saw cut. Prices are on enquiry. Our team checks every list before quoting.`}</U>
            </p>

            <div className="calc-send no-print" {...H("send")}>
              <span className="cap">Send this list to the QuikLit team</span>
              <div className="calc-send-grid">
                <label className="field">Your name<input value={who.name} autoComplete="name" onChange={(e) => setWho({ ...who, name: e.target.value })} /></label>
                <label className="field">Mobile<input value={who.mobile} inputMode="tel" autoComplete="tel" onChange={(e) => setWho({ ...who, mobile: e.target.value })} /></label>
                <label className="field">Firm<input value={who.firm} autoComplete="organization" onChange={(e) => setWho({ ...who, firm: e.target.value })} /></label>
                <label className="field">City<input value={who.city} onChange={(e) => setWho({ ...who, city: e.target.value })} /></label>
                <label className="field span2">Project<input value={who.project} placeholder="e.g. Shah residence, Bodakdev" onChange={(e) => setWho({ ...who, project: e.target.value })} /></label>
              </div>
              <div className="calc-send-btns">
                <button type="button" className="btn" disabled={sent === "sending" || sent === "ok" || demoOn} onClick={sendIt}>{sent === "ok" ? "Sent ✓" : sent === "sending" ? "Sending…" : "Send for a quote"}</button>
                <a className="btn ghost" href={`https://wa.me/${m.wa}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener">WhatsApp {m.name.split(" ")[0]}</a>
                <a className="btn ghost" href={`mailto:${m.email}?subject=${encodeURIComponent("QuikLit BOQ request")}&body=${encodeURIComponent(text)}`}>Email it</a>
                <button type="button" className="btn ghost" onClick={() => window.print()}>Save as PDF</button>
              </div>
              {sent === "need" && <p className="t14 calc-err">Please add your name and a 10-digit mobile number.</p>}
              {sent === "err" && <p className="t14 calc-err">That did not go through. Please use WhatsApp or email.</p>}
              {sent === "ok" && <p className="t16">Thank you. {m.name} will reply within one working day on {m.phone}.</p>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// The best voice this device has for the language: an Indian English voice for English and Hinglish,
// a Hindi voice for Hindi. Any other accent reads the script badly, so without one the demo stays in text.
function bestVoice(lang: Lang): SpeechSynthesisVoice | null {
  const all = window.speechSynthesis.getVoices();
  const want = lang === "hi" ? "hi-in" : "en-in";
  const list = all.filter((v) => v.lang.replace("_", "-").toLowerCase() === want);
  if (!list.length) return null;
  const rank = (v: SpeechSynthesisVoice) => (/natural|neural|premium|enhanced/i.test(v.name) ? 4 : 0) + (/google|microsoft|siri/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
  return [...list].sort((a, b) => rank(b) - rank(a))[0];
}

function summarise(off: number[]) {
  const m = new Map<number, number>();
  for (const x of off) m.set(x, (m.get(x) || 0) + 1);
  return [...m.entries()].map(([len, q]) => `${q > 1 ? `${q} × ` : ""}${len} mm`).join(", ");
}
