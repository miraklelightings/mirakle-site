import { Fragment } from "react";

// MIRAKLE writes everything in capitals, but a unit of measure keeps its own case:
// mm stays mm, W/m stays W/m, lm stays lm. The page is capitalised in CSS (body), and
// these helpers mark the units so the capitals pass over them.
const ALWAYS = "mm²|mm|cm|lm\\/W|lm|W\\/m|cd\\/klm|kHz|Hz|mA|lx";   // never an English word
const AFTER_NUMBER = "cd\\/klm|kg|cd|m|g";                                  // only straight after a figure
const RX = new RegExp(`(?<![A-Za-z])(${ALWAYS})(?![A-Za-z])|(\\d\\s?)(${AFTER_NUMBER})(?![A-Za-z0-9])`, "g");

function parts(text: string) {
  const out: { t: string; unit: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(RX)) {
    const unit = m[1] ?? m[3];
    const start = m.index! + (m[1] ? 0 : m[2].length);
    if (start > last) out.push({ t: text.slice(last, start), unit: false });
    out.push({ t: unit, unit: true });
    last = start + unit.length;
  }
  if (last < text.length) out.push({ t: text.slice(last), unit: false });
  return out;
}

/** For React: <U>{"3000 mm lengths"}</U> */
export function U({ children }: { children?: string | number | null }) {
  if (children === null || children === undefined) return null;
  return <>{parts(String(children)).map((p, i) => (p.unit ? <span key={i} className="u">{p.t}</span> : <Fragment key={i}>{p.t}</Fragment>))}</>;
}

/** For places that take plain text only, such as a dropdown option. */
export const capsText = (text: string) => parts(text).map((p) => (p.unit ? p.t : p.t.toUpperCase())).join("");

/** For a block of ready-made HTML. Text inside tags is left alone. */
export function unitsInHtml(html: string) {
  let skip = 0, option = 0;
  return html.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g, (all, close, tag, rest, text) => {
    if (tag) {
      const t = String(tag).toLowerCase();
      const d = close ? -1 : String(rest).trim().endsWith("/") ? 0 : 1;
      if (t === "script" || t === "style" || t === "textarea" || t === "svg" || t === "title") skip = Math.max(0, skip + d);
      if (t === "option") option = Math.max(0, option + d);
      return all;
    }
    if (skip) return all;
    if (option) return capsText(text);
    return parts(text).map((p) => (p.unit ? `<span class="u">${p.t}</span>` : p.t)).join("");
  });
}
