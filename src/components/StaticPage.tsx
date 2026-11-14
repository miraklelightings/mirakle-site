import Footer from "./Footer";
export default function StaticPage({ css, body, footer }: { css: string; body: string; footer?: boolean }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dc" dangerouslySetInnerHTML={{ __html: body }} />
      {footer && <Footer />}
    </>
  );
}
