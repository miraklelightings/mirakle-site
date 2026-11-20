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
    // Large photographs drift a little slower than the page, so they feel deep rather than flat.
    const deep = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let ticking = false;
    const drift = () => {
      ticking = false;
      const vh = window.innerHeight;
      deep.forEach((el) => {
        const r = (el.parentElement || el).getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const t = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 across the screen
        el.style.transform = `translate3d(0, ${(-t * 36).toFixed(1)}px, 0) scale(1.1)`;
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } };
    if (deep.length) { drift(); window.addEventListener("scroll", onScroll, { passive: true }); }
    return () => { io.disconnect(); window.clearTimeout(safety); window.removeEventListener("scroll", onScroll); };
  }, [path]);
  return null;
}
