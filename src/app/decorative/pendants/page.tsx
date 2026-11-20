import type { Metadata } from "next";
import Link from "next/link";

// The earlier address of the pendant chapter. It now sends visitors to the chapter itself.
export const metadata: Metadata = { title: "Pendant lights", robots: { index: false }, alternates: { canonical: "/decorative/pendant/" } };
export default function Page() {
  return (
    <main className="wrap" style={{ padding: "120px 0" }}>
      <meta httpEquiv="refresh" content="0;url=/decorative/pendant/" />
      <p className="t20">This page has moved. <Link href="/decorative/pendant/">Go to pendant lights</Link>.</p>
    </main>
  );
}
