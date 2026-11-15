import Link from "next/link";
import { MANAGERS, SHOWROOM } from "@/lib/site";

export default function Footer() {
  const m = Object.values(MANAGERS);
  return (
    <footer style={{ background: "var(--ink)", color: "var(--on-dark)", marginTop: 0 }}>
      <div className="wrap" style={{ paddingTop: 72, paddingBottom: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <img src="/Mirakle_Logo_White.svg" alt="MIRAKLE" style={{ height: 20, width: "auto", alignSelf: "flex-start" }} />
          <span className="t14" style={{ color: "var(--on-dark-grey)" }}>Light for architecture · Light for furniture · Light for living</span>
        </div>
        {m.map((x) => (
          <div key={x.email} className="t14" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>{x.role}</span>
            <span>{x.name}</span>
            <a href={`tel:${x.tel}`} style={{ textDecoration: "none" }}>{x.phone}</a>
            <a href={`mailto:${x.email}`} style={{ textDecoration: "none" }}>{x.email}</a>
            <a href={`https://wa.me/${x.wa}`} style={{ textDecoration: "none", color: "var(--on-dark-grey)" }}>WhatsApp →</a>
          </div>
        ))}
        <div className="t14" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Showroom</span>
          <span>{SHOWROOM.address}</span>
          <span style={{ color: "var(--on-dark-grey)" }}>{SHOWROOM.hours}</span>
        </div>
      </div>
      <div className="wrap t14" style={{ borderTop: "1px solid #33302d", paddingTop: 20, paddingBottom: 28, display: "flex", flexWrap: "wrap", gap: 20, color: "var(--on-dark-grey)" }}>
        <span>MIRAKLE is a brand of Hrisha Lighting Projects LLP, Ahmedabad 380054.</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Link href="/downloads/">Downloads</Link><Link href="/contact/">Contact</Link><Link href="/about/">About</Link>
          <a href="https://www.instagram.com/hrisha_lightings">Instagram · @hrisha_lightings</a><a href="https://www.witlamps.com">WIT Lamps</a>
        </span>
      </div>
    </footer>
  );
}
