"use client";
import { useEffect } from "react";
import { MANAGERS, type World } from "@/lib/site";

export const ENQUIRY_URL =
  "https://script.google.com/a/macros/hrishalightings.com/s/AKfycbwjSCTrIUTXqTDCz3u1AGr5Ux6Z38C_sfGMua1hVIEYNPl5wTMI79GPYVA88l0QclQ5/exec";
const SEL_KEY = "mirakle-deco-selection";

const txt = (el: Element | null) => (el?.textContent || "").replace(/\s+/g, " ").trim();
const getSel = (): string[] => { try { return JSON.parse(localStorage.getItem(SEL_KEY) || "[]"); } catch { return []; } };
const setSel = (s: string[]) => { try { localStorage.setItem(SEL_KEY, JSON.stringify(s)); } catch {} };

function setPressed(b: HTMLElement, on: boolean) {
  b.setAttribute("aria-pressed", String(on));
  // match the design: pressed = ink fill, unpressed = paper
  if (b.style.borderBottom && !b.style.border) { b.style.borderBottom = on ? "2px solid #1A1918" : "2px solid transparent"; return; }
  b.style.background = on ? "#1A1918" : "#F6F4F0";
  b.style.color = on ? "#F6F4F0" : "#1A1918";
  b.style.borderColor = on ? "#1A1918" : "#DCD6CD";
}

// ---------- forms ----------
function collect(form: HTMLFormElement) {
  const fields: Record<string, string> = {};
  form.querySelectorAll("label").forEach((l) => {
    const c = l.querySelector("input,select,textarea") as HTMLInputElement | null;
    if (!c || c.type === "checkbox" || c.type === "radio") return;
    const label = txt(l).replace(txt(c.tagName === "SELECT" ? c : null), "").trim() || (l.firstChild?.textContent || "").trim();
    fields[(l.firstChild?.textContent || label).trim()] = c.value.trim();
  });
  const checks: Record<string, string[]> = {};
  form.querySelectorAll("fieldset").forEach((fs) => {
    const leg = txt(fs.querySelector("legend")) || "Options";
    const on = [...fs.querySelectorAll("label")].filter((l) => (l.querySelector("input") as HTMLInputElement)?.checked).map((l) => txt(l));
    checks[leg] = on;
  });
  return { fields, checks };
}
const pick = (f: Record<string, string>, ...keys: string[]) => {
  for (const x of keys) for (const k of Object.keys(f)) if (k.toLowerCase().startsWith(x) && f[k]) return f[k];
  return "";
};

async function send(payload: Record<string, string>) {
  await fetch(ENQUIRY_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
}

function wireForm(form: HTMLFormElement, pageWorld: World | null, extraItems: () => string, worldsFor?: (f: Record<string, string>, c: Record<string, string[]>) => World[]) {
  const btn = form.querySelector("button") as HTMLButtonElement | null;
  if (!btn || btn.dataset.wired) return;
  btn.dataset.wired = "1";
  const note = document.createElement("p");
  note.style.cssText = "margin:8px 0 0;font-size:14px;color:#B42318";
  btn.after(note);
  btn.addEventListener("click", async () => {
    const { fields, checks } = collect(form);
    const name = pick(fields, "your name", "business name");
    const mobile = pick(fields, "mobile");
    const email = pick(fields, "email");
    if (!name || !(mobile || email)) { note.textContent = "Please add your name and a mobile number."; return; }
    if (mobile && mobile.replace(/\D/g, "").length < 10) { note.textContent = "Please check the mobile number."; return; }
    const required = [...form.querySelectorAll("[required]")] as HTMLInputElement[];
    if (required.some((r) => !r.value.trim())) { note.textContent = "Please fill in every field — our team needs them to send the right files."; return; }
    const items = extraItems();
    if (form.getAttribute("aria-label") === "Request files" && !items) { note.textContent = "Choose at least one catalogue above first."; return; }
    const worlds = (worldsFor ? worldsFor(fields, checks) : [pageWorld || "arch"]).filter(Boolean) as World[];
    const known = ["your name", "business name", "mobile", "mobile (whatsapp)", "email", "city", "city and state", "company", "company or practice", "i am", "project name and stage", "project", "message"];
    const rest = Object.entries(fields).filter(([k, v]) => v && !known.includes(k.toLowerCase())).map(([k, v]) => `${k}: ${v}`);
    const checkLines = Object.entries(checks).filter(([, v]) => v.length).map(([k, v]) => `${k}: ${v.join(", ")}`);
    const sendVia = (checks["Send them on"] || [])[0] || "";
    btn.disabled = true; btn.textContent = "Sending…"; note.textContent = "";
    try {
      for (const w of [...new Set(worlds.length ? worlds : ["arch" as World])]) {
        await send({
          world: w, form: form.getAttribute("aria-label") || "Enquiry", name, mobile, email,
          company: pick(fields, "company", "business name"), role: pick(fields, "i am"), city: pick(fields, "city"),
          project: pick(fields, "project"), sendVia, items,
          message: [pick(fields, "message"), ...rest, ...checkLines.filter((l) => !l.startsWith("Send them on"))].filter(Boolean).join("\n"),
          page: location.href, website: "",
        });
      }
      const who = [...new Set(worlds)].map((w) => MANAGERS[w].name).join(", ");
      form.innerHTML = `<div style="padding:24px;background:#EDE9E3;display:flex;flex-direction:column;gap:8px"><span style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B6660">Received</span><span style="font-size:20px">Thank you, ${name.replace(/</g, "")}.</span><span style="font-size:14px;color:#6B6660">The ${who} will get back to you within 24 hours.</span></div>`;
    } catch {
      btn.disabled = false; btn.textContent = "Try again";
      note.textContent = "Could not send. Please try again, or WhatsApp us.";
    }
  });
}

// ---------- page behaviours ----------
function titanConfigurator(root: HTMLElement) {
  const sec = root.querySelector("#configure"); if (!sec) return;
  const groups = [...sec.querySelectorAll('[role="group"]')] as HTMLElement[];
  const g = (label: string) => groups.find((x) => x.getAttribute("aria-label") === label)!;
  const ctrl = g("Control");
  if (ctrl && ![...ctrl.querySelectorAll("button")].some((b) => txt(b) === "DALI DT8")) {
    const dt6 = [...ctrl.querySelectorAll("button")].find((b) => txt(b) === "DALI DT6")!;
    const dt8 = dt6.cloneNode(true) as HTMLButtonElement; dt8.textContent = "DALI DT8"; dt6.after(dt8);
  }
  const CCT: Record<string, string> = { "3000K": "3K", "4000K": "4K", "5000K": "5K", "Tunable 2700–6500K": "TW", "Dim-to-warm 1800–4000K": "DTW" };
  const CTL: Record<string, string> = { "On/off": "ONF", "Phase-cut": "PHC", "DALI DT6": "DT6", "DALI DT8": "DT8", "Bluetooth": "BLE", "Zigbee": "ZIG", "Matter": "MTR", "Casambi": "CAS" };
  const FIXED_ONLY = ["ONF", "PHC", "DT6"], TUNE_ONLY = ["DT8"];
  const cri = sec.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
  const codeEl = [...sec.querySelectorAll("span")].find((s) => txt(s).startsWith("TTN-")) as HTMLElement;
  const descEl = codeEl?.nextElementSibling as HTMLElement;
  const sendLink = [...sec.querySelectorAll("a")].find((a) => /^Send this (code|configuration)$/.test(txt(a))) as HTMLAnchorElement;
  const cur = (label: string) => txt(g(label)?.querySelector('[aria-pressed="true"]'));
  function update() {
    const cct = CCT[cur("CCT")] || "3K";
    const tunable = cct === "TW" || cct === "DTW";
    [...ctrl.querySelectorAll("button")].forEach((b) => {
      const c = CTL[txt(b)]; const ok = tunable ? !FIXED_ONLY.includes(c) : !TUNE_ONLY.includes(c);
      (b as HTMLButtonElement).disabled = !ok; b.style.opacity = ok ? "1" : "0.35"; b.style.cursor = ok ? "pointer" : "not-allowed";
      if (!ok && b.getAttribute("aria-pressed") === "true") { setPressed(b as HTMLElement, false); }
    });
    if (!ctrl.querySelector('[aria-pressed="true"]')) setPressed([...ctrl.querySelectorAll("button")].find((b) => txt(b) === (tunable ? "DALI DT8" : "DALI DT6")) as HTMLElement, true);
    const w = cur("Watts · cut-out").startsWith("16") ? "16" : "12";
    const body = cur("Trim") === "Matt white" ? "WH" : "BK";
    const refl = cur("Reflector") === "Matt white" ? "WH" : "BK";
    const beam = cur("Beam").replace(/°.*/, "") + "D";
    const ctl = CTL[cur("Control")];
    const code = `TTN-${w}-IP20-REC-${cct}-${body}-${ctl}-${refl}${beam}${cri?.checked ? "-97" : ""}`;
    if (codeEl) codeEl.textContent = code;
    if (descEl) descEl.textContent = `${w} W · IP20 · recessed · ${cur("CCT")} · ${cur("Trim").replace("Matt ", "").toLowerCase()} trim · ${cur("Control")} · ${cur("Reflector").replace("Matt ", "").toLowerCase()} reflector, ${cur("Beam").replace(" · standard", "")} · CRI ${cri?.checked ? "97+" : "90+"}`;
    const box = document.getElementById("beam3m");
    if (box) {
      const deg = parseInt(cur("Beam"), 10) || 36; const dia = 2 * 3 * Math.tan((deg * Math.PI) / 360);
      const half = Math.min(46, (dia / 2) * 13);   // 13 px per metre at this drawing scale
      box.innerHTML = `<svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" style="position:absolute;inset:0;width:100%;height:100%"><defs><linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffd9a0" stop-opacity=".12"/></linearGradient></defs><line x1="4" y1="8" x2="96" y2="8" stroke="#6B6660" stroke-width=".4"/><line x1="4" y1="47" x2="96" y2="47" stroke="#6B6660" stroke-width=".4"/><polygon points="50,8 ${50 - half},47 ${50 + half},47" fill="url(#bg3)" style="transition:all .5s"/><rect x="48.6" y="6.6" width="2.8" height="1.6" fill="#F6F4F0"/><line x1="${50 - half}" y1="51" x2="${50 + half}" y2="51" stroke="#F6F4F0" stroke-width=".3"/><text x="50" y="57" text-anchor="middle" font-size="3.4" fill="#F6F4F0" letter-spacing=".3">Ø ${dia.toFixed(2)} M AT 3 M · ${deg}° BEAM</text><text x="5" y="5.2" font-size="2.6" fill="#A39D94" letter-spacing=".3">CEILING</text><text x="5" y="45.4" font-size="2.6" fill="#A39D94" letter-spacing=".3">FLOOR · 3 M BELOW · NOMINAL GEOMETRY</text></svg>`;
    }
    if (sendLink) sendLink.href = `/contact/?about=arch&msg=${encodeURIComponent("TITAN: " + (descEl?.textContent || ""))}`;
  }
  groups.forEach((grp) => grp.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
    if ((b as HTMLButtonElement).disabled) return;
    grp.querySelectorAll("button").forEach((x) => setPressed(x as HTMLElement, x === b)); update();
  })));
  cri?.addEventListener("change", update);
  update();
}

function typeFilter(root: HTMLElement, cardSel: string, labelOf: (card: Element) => string) {
  const allBtn = [...root.querySelectorAll("button")].find((b) => txt(b) === "All");
  const bar = allBtn?.parentElement; if (!bar) return;
  const btns = [...bar.querySelectorAll("button")] as HTMLElement[];
  const cards = [...root.querySelectorAll(cardSel)] as HTMLElement[];
  btns.forEach((b) => b.addEventListener("click", () => {
    btns.forEach((x) => setPressed(x, x === b));
    const v = txt(b);
    cards.forEach((c) => { c.style.display = v === "All" || labelOf(c).toLowerCase().includes(v.toLowerCase()) ? "" : "none"; });
  }));
}

export default function Enhance({ page }: { page: string }) {
  useEffect(() => {
    const root = document.querySelector(".dc") as HTMLElement; if (!root) return;
    const params = new URLSearchParams(location.search);

    if (page === "Architectural") {
      // COB cards: only TITAN has its own page so far; the rest open an enquiry for that series.
      root.querySelectorAll('a[href="/architectural/titan/"]').forEach((a) => {
        const n = txt(a.querySelector("span")); if (n && n !== "TITAN") (a as HTMLAnchorElement).href = `/contact/?about=arch&msg=${encodeURIComponent("Datasheet and price for " + n)}`;
      });
      typeFilter(root, 'a[href^="/contact/"], a[href="/architectural/titan/"]', (c) => txt(c.querySelector(".cap")));
      const aside = root.querySelector('[aria-label="Filters"]') as HTMLElement | null; if (aside) aside.style.display = "none";
    }
    if (page === "DecoPendant") {
      typeFilter(root, "article", (c) => txt(c));
    }
    if (page === "Titan") titanConfigurator(root);

    // Decorative selection
    root.querySelectorAll("button").forEach((b) => {
      if (txt(b) !== "Add to selection") return;
      const card = b.closest("article") || b.parentElement!.parentElement!;
      const code = (card.textContent || "").match(/HPHL\d+(?:_[A-Z]{1,3}(?![a-z]))?/)?.[0] || txt(card).slice(0, 40);
      const paint = () => { const on = getSel().includes(code); b.textContent = on ? "Added ✓" : "Add to selection"; };
      b.addEventListener("click", () => { const s = getSel(); setSel(s.includes(code) ? s.filter((x) => x !== code) : [...s, code]); paint(); });
      paint();
    });
    const selNote = [...root.querySelectorAll("div")].find((d) => txt(d).startsWith("Selection attached automatically"));
    if (selNote) { const n = getSel().length; selNote.textContent = `Selection attached automatically: ${n} piece${n === 1 ? "" : "s"}${n ? " (" + getSel().join(", ") + ")" : ""}`; }

    // Downloads basket
    const dlButtons = [...root.querySelectorAll("button")].filter((b) => txt(b) === "Add to request" || txt(b) === "Added ✓") as HTMLElement[];
    const dlWorld = (b: Element): World => { const t = txt(b.parentElement).toLowerCase(); return t.startsWith("quiklit") ? "ql" : t.startsWith("decorative") ? "deco" : "arch"; };
    const dlName = (b: Element) => txt(b.parentElement?.querySelector(".h2") || b.parentElement);
    dlButtons.forEach((b) => b.addEventListener("click", () => { const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Added ✓" : "Add to request"; }));
    // smaller toggles (datasheets) on the Downloads page
    if (page === "Downloads") root.querySelectorAll('button[aria-pressed]').forEach((b) => {
      if (dlButtons.includes(b as HTMLElement)) return;
      b.addEventListener("click", () => { const on = b.getAttribute("aria-pressed") !== "true"; setPressed(b as HTMLElement, on); });
    });

    // Prefill from links like /contact/?about=arch&msg=...
    const about = params.get("about"); const msg = params.get("msg");
    root.querySelectorAll("form").forEach((form) => {
      const f = form as HTMLFormElement;
      const label = f.getAttribute("aria-label") || "";
      if (label === "Enquiry") {
        const sel = f.querySelector("select") as HTMLSelectElement | null;
        if (sel && about) sel.selectedIndex = { arch: 0, ql: 1, deco: 2 }[about as World] ?? 0;
        const ta = f.querySelector("textarea"); if (ta && msg) ta.value = msg;
        wireForm(f, null, () => "", () => { const v = (sel?.value || "").toLowerCase(); return [v.includes("quiklit") ? "ql" : v.includes("decorative") ? "deco" : "arch"]; });
      } else if (label === "Dealer enquiry") {
        wireForm(f, null, () => "", (_f, c) => { const on = (c["Interested in"] || []).map((x) => x.toLowerCase()); const w: World[] = []; if (on.some((x) => x.startsWith("arch") || x.startsWith("tech"))) w.push("arch"); if (on.some((x) => x.startsWith("quik"))) w.push("ql"); if (on.some((x) => x.startsWith("deco"))) w.push("deco"); return w.length ? w : ["arch"]; });
      } else if (label === "Request files") {
        const chosen = () => [...root.querySelectorAll('button[aria-pressed="true"]')].filter((b) => txt(b) === "Added ✓" || (page === "Downloads" && !dlButtons.includes(b as HTMLElement)));
        wireForm(f, null,
          () => chosen().map((b) => dlButtons.includes(b as HTMLElement) ? dlName(b) : txt(b.closest("li,tr,div")) || txt(b)).join("\n"),
          () => { const w = chosen().filter((b) => dlButtons.includes(b as HTMLElement)).map(dlWorld); return w.length ? w : ["arch"]; });
      } else {
        const w: World = page.startsWith("Quiklit") ? "ql" : page.startsWith("Deco") ? "deco" : "arch";
        wireForm(f, w, () => (w === "deco" ? getSel().join(", ") : ""));
      }
    });
  }, [page]);
  return null;
}
