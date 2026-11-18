import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MIRAKLE", short_name: "MIRAKLE", description: "Lighting for architecture, furniture and interiors.",
    start_url: "/", display: "standalone", background_color: "#F6F4F0", theme_color: "#1A1918",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
