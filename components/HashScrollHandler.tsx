"use client";

import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Wait a tick for Lenis + page content (sequence hero, etc.) to mount.
    const tryScroll = (attempt = 0) => {
      const el = document.querySelector(hash);
      const lenis = (window as any).__lenis;
      if (el && lenis) {
        lenis.scrollTo(el, { duration: 1.2 });
      } else if (el && attempt > 8) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempt < 15) {
        setTimeout(() => tryScroll(attempt + 1), 120);
      }
    };
    setTimeout(() => tryScroll(), 200);
  }, []);

  return null;
}
