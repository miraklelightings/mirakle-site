"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades sections in as they scroll into view. Content stays visible if scripts fail.
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal], .dc section, .dc article")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen: leave as is
      if (el.getBoundingClientRect().height > window.innerHeight * 1.5) return; // very tall blocks: no fade
      el.classList.add("reveal"); io.observe(el);
    });
    const safety = window.setTimeout(() => els.forEach((el) => el.classList.add("in")), 6000);
    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, [path]);
  return null;
}
