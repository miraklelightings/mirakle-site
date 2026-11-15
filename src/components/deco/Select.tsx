"use client";
import { useEffect, useState } from "react";
import { MANAGERS } from "@/lib/site";
import { ENQUIRY_URL } from "@/components/Enhance";

const KEY = "mirakle-deco-selection";
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
const write = (s: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} window.dispatchEvent(new Event("deco-sel")); };

export function useSelection() {
  const [sel, setSel] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSel(read());
    sync();
    window.addEventListener("deco-sel", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("deco-sel", sync); window.removeEventListener("storage", sync); };
  }, []);
  const toggle = (code: string) => { const s = read(); write(s.includes(code) ? s.filter((x) => x !== code) : [...s, code]); };
  return { sel, toggle, clear: () => write([]) };
}

export function SelectButton({ code, small }: { code: string; small?: boolean }) {
  const { sel, toggle } = useSelection();
  const on = sel.includes(code);
  return <button type="button" className={"dsel" + (on ? " on" : "") + (small ? " small" : "")} aria-pressed={on} onClick={(e) => { e.preventDefault(); toggle(code); }}>{on ? "Added ✓" : small ? "+ Select" : `Add ${code} to selection`}</button>;
}

export function SelectionBar() {
  const { sel } = useSelection();
  if (!sel.length) return null;
  return (
    <a href="/decorative/#selection" className="dbar no-print">
      <span className="cap">Your selection · {sel.length} {sel.length === 1 ? "piece" : "pieces"}</span>
      <span className="cap">Send for a quote →</span>
    </a>
  );
}

export function SelectionForm() {
  const { sel, toggle, clear } = useSelection();
  const [f, setF] = useState({ name: "", mobile: "", role: "Interior designer", city: "", project: "Residential", when: "Within a month" });
  const [state, setState] = useState<"" | "need" | "sending" | "ok" | "err">("");
  const m = MANAGERS.deco;
  const text = `Hello MIRAKLE, I would like a quote for: ${sel.join(", ") || "(pieces to be chosen)"}.`;
  const send = async () => {
    if (!f.name.trim() || f.mobile.replace(/\D/g, "").length < 10) { setState("need"); return; }
    setState("sending");
    try {
      await fetch(ENQUIRY_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({
        world: "deco", form: "Decorative selection", name: f.name.trim(), mobile: f.mobile.trim(), email: "", company: "", role: f.role, city: f.city.trim(), project: f.project, sendVia: "",
        items: sel.join(", "), message: `Timing: ${f.when}`, page: window.location.href, website: "",
      }) });
      setState("ok");
    } catch { setState("err"); }
  };
  return (
    <div className="dform">
      <div className="dform-list">
        <span className="cap grey">Your selection · {sel.length} {sel.length === 1 ? "piece" : "pieces"}</span>
        {sel.length === 0 && <p className="t16 grey">Nothing selected yet. Press “Select” on any piece as you browse, and it collects here.</p>}
        <ul>{sel.map((c) => <li key={c}><span>{c}</span><button type="button" onClick={() => toggle(c)} aria-label={`Remove ${c}`}>Remove</button></li>)}</ul>
        {sel.length > 1 && <button type="button" className="dform-clear" onClick={clear}>Clear all</button>}
      </div>
      <div className="dform-fields">
        <label className="field">Your name<input value={f.name} autoComplete="name" onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label className="field">Mobile<input value={f.mobile} inputMode="tel" autoComplete="tel" onChange={(e) => setF({ ...f, mobile: e.target.value })} /></label>
        <label className="field">I am<select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}><option value="Interior designer">INTERIOR DESIGNER</option><option value="Architect">ARCHITECT</option><option value="Homeowner">HOMEOWNER</option><option value="Hotel or restaurant">HOTEL OR RESTAURANT</option></select></label>
        <label className="field">City<input value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></label>
        <label className="field">Project<select value={f.project} onChange={(e) => setF({ ...f, project: e.target.value })}><option value="Residential">RESIDENTIAL</option><option value="Hospitality">HOSPITALITY</option><option value="Commercial">COMMERCIAL</option></select></label>
        <label className="field">When<select value={f.when} onChange={(e) => setF({ ...f, when: e.target.value })}><option value="Within a month">WITHIN A MONTH</option><option value="1–3 months">1–3 MONTHS</option><option value="Later">LATER</option></select></label>
        <div className="dform-btns">
          <button type="button" className="btn" disabled={state === "sending" || state === "ok"} onClick={send}>{state === "ok" ? "Sent ✓" : state === "sending" ? "Sending…" : "Send to the Decorative team"}</button>
          <a className="btn ghost" href={`https://wa.me/${m.wa}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener">WhatsApp {m.name.split(" ")[0]}</a>
        </div>
        {state === "need" && <p className="t14 dform-err">Please add your name and a 10-digit mobile number.</p>}
        {state === "err" && <p className="t14 dform-err">That did not go through. Please use WhatsApp.</p>}
        {state === "ok" && <p className="t16">Thank you. {m.name} will reply within one working day on {m.phone}.</p>}
        <p className="t14 grey">{m.name} · {m.phone} · {m.email}</p>
      </div>
    </div>
  );
}
