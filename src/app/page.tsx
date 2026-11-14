import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: 96, paddingBottom: 96, display: "flex", flexDirection: "column", gap: 24 }}>
        <span className="cap grey">MIRAKLE</span>
        <h1 className="h56" style={{ maxWidth: 900 }}>India&apos;s most trusted name in light — for architects, furniture makers and the homes they create.</h1>
        <p className="t20 grey" style={{ margin: 0 }}>Light for architecture · Light for furniture · Light for living</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="btn" href="/quiklit/boq/">QuikLit BOQ calculator</Link>
        </div>
        <p className="t14 grey">Full homepage is being built from the approved design.</p>
      </main>
    </>
  );
}
