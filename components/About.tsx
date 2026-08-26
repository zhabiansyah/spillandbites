"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-fade", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".about-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".about-cards",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <span className="about-fade mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Tentang Kami
        </span>
        <h2 className="about-fade font-display text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
          Neo-Fast Food yang{" "}
          <span className="text-secondary">energik</span>,{" "}
          <span className="text-primary">bersih</span>, dan bikin nagih.
        </h2>
        <p className="about-fade mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Spill & Bites lahir dari kecintaan pada ayam goreng kriuk yang
          digelontor keju dan saus signature. Kami hadirkan pengalaman
          makan yang <em>cozy</em>, modern, dan Instagram-able — dari dapur
          terbuka sampai kemasan yang bikin orang lain penasaran pas kamu
          buka.
        </p>

        <div className="about-cards mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { k: "Berdiri", v: "2024", d: "Awal mula Spill & Bites" },
            { k: "Resto", v: "6 Cabang", d: "Tersebar di kota besar" },
            { k: "Sertifikasi", v: "Halal MUI", d: "Terjamin dan tersertifikasi" },
          ].map((item) => (
            <div
              key={item.k}
              className="about-card rounded-2xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(1,45,180,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
                {item.k}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-primary">
                {item.v}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
