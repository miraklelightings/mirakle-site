import Footer from "./Footer";
import Header from "./Header";
import { WORLD_NAV, type World } from "@/lib/site";
import Enhance from "./Enhance";
import { unitsInHtml } from "@/lib/units";

// A designed page. `children` (optional) are placed at `slot`: "finder" swaps out the old COB finder,
// "end" sits just before the page footer.
export default function StaticPage({ css, body, footer, page, slot, children }: { css: string; body: string; footer?: boolean; page: string; slot?: "finder" | "end"; children?: React.ReactNode }) {
  // Each designed page once carried its own header. The shared one replaces it, so the mark, its size
  // and the navigation are the same on every page.
  const world: World | undefined = /^(Architectural|Titan|Drivers|Linear|Elva5)$/.test(page) ? "arch" : /^Quiklit/.test(page) ? "ql" : undefined;
  const h0 = body.indexOf("<header"), h1 = body.indexOf("</header>");
  if (h0 >= 0 && h1 > h0 && h0 < 2000) {
    // the strip of three verticals that sat above that header goes with it
    const w = body.indexOf('aria-label="MIRAKLE worlds"');
    const bar = w > 0 && w < h0 ? body.lastIndexOf("<div", body.lastIndexOf("<div", w) - 1) : -1;
    body = body.slice(0, bar >= 0 ? bar : h0) + body.slice(h1 + 9);
  }
  const cta = world === "ql" ? { label: "BOQ calculator", href: "/quiklit/boq/" } : world === "arch" ? { label: "Enquire", href: "/contact/?about=arch" } : { label: "Enquire", href: "/contact/" };
  body = unitsInHtml(body);
  let before = body, after = "";
  if (children) {
    // drop the page's outer wrapper so each half is well-formed HTML on its own
    const t = body.trim();
    if (t.startsWith("<div") && t.endsWith("</div>")) body = t.slice(t.indexOf(">") + 1, t.lastIndexOf("</div>"));
    before = body;
  }
  if (children && slot === "finder") {
    const at = body.indexOf('id="finder"');
    const a = at < 0 ? -1 : body.lastIndexOf("<section", at);
    const b = at < 0 ? -1 : body.indexOf("<section", at + 10);
    if (a >= 0 && b > a) { before = body.slice(0, a); after = body.slice(b); }
  } else if (children) {
    const i = body.lastIndexOf("<footer");
    if (i > 0) { before = body.slice(0, i); after = body.slice(i); }
  }
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Header world={world} nav={world ? WORLD_NAV[world] : []} cta={cta} />
      <div className="dc">
        <div dangerouslySetInnerHTML={{ __html: before }} />
        {children}
        {after && <div dangerouslySetInnerHTML={{ __html: after }} />}
      </div>
      {footer && <Footer />}
      <Enhance page={page} />
    </>
  );
}
