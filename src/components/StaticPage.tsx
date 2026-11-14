import Footer from "./Footer";
import Enhance from "./Enhance";
export default function StaticPage({ css, body, footer, page }: { css: string; body: string; footer?: boolean; page: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dc" dangerouslySetInnerHTML={{ __html: body }} />
      {footer && <Footer />}
      <Enhance page={page} />
    </>
  );
}
