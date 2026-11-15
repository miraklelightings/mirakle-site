import Footer from "./Footer";
import Enhance from "./Enhance";

// A designed page. `children` (optional) are placed at `slot`: "finder" swaps out the old COB finder,
// "end" sits just before the page footer.
export default function StaticPage({ css, body, footer, page, slot, children }: { css: string; body: string; footer?: boolean; page: string; slot?: "finder" | "end"; children?: React.ReactNode }) {
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
