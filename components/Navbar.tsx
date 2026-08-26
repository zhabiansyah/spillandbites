"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

type NavLink = {
  label: string;
  href: string;
  type: "anchor" | "page";
};

const LINKS: NavLink[] = [
  { label: "Menu", href: "/menu", type: "page" },
  { label: "Promo", href: "/promo", type: "page" },
  { label: "Membership", href: "/membership", type: "page" },
  { label: "Lokasi", href: "/lokasi", type: "page" },
  { label: "Tentang", href: "#about", type: "anchor" },
  { label: "Ulasan", href: "#testimonials", type: "anchor" },
  { label: "FAQ", href: "#faq", type: "anchor" },
  { label: "Kontak", href: "/kontak", type: "page" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Efek untuk mendeteksi saat halaman di-scroll melewati hero section
  useEffect(() => {
    const handleScroll = () => {
      // window.innerHeight adalah tinggi layar perangkat.
      // Dikurangi 80px (perkiraan tinggi navbar) agar transisi pas di batas section.
      setIsScrolled(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Jalankan sekali saat komponen pertama kali dimuat agar 
    // jika di-refresh di tengah halaman, warnanya langsung menyesuaikan.
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const go = (link: NavLink) => {
    setOpen(false);

    if (link.type === "page") {
      router.push(link.href);
      return;
    }

    if (pathname === "/") {
      const el = document.querySelector(link.href);
      const lenis = (window as any).__lenis;
      if (el && lenis) {
        lenis.scrollTo(el, { duration: 1.4 });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${link.href}`);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-7">
        <a
          href="/"
          data-cursor="pointer"
          // Matikan efek mix-blend-difference saat scroll agar filter warna birunya muncul
          className={`relative z-[70] transition-all duration-300 ${
            isScrolled ? "" : "mix-blend-difference"
          }`}
        >
          <Image
            src="/spill-bites-logo.png"
            alt="Spill & Bites"
            width={220}
            height={88}
            priority
            // Ukuran logo diperbesar
            className="h-20 w-auto transition-all duration-300 sm:h-14 md:h-20"
            // Filter CSS ajaib untuk mengubah PNG menjadi warna #012db4
            style={
              isScrolled
                ? {
                    filter:
                      "brightness(0) saturate(100%) invert(13%) sepia(94%) saturate(4646%) hue-rotate(224deg) brightness(91%) contrast(106%)",
                  }
                : {}
            }
          />
        </a>

        <button
          data-cursor="pointer"
          onClick={() => setOpen((o) => !o)}
          // Sesuaikan warna border menu hamburger saat di-scroll
          className={`relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border backdrop-blur-md transition-all duration-300 md:h-14 md:w-14 ${
            isScrolled
              ? "border-[#012db4] bg-white/50 mix-blend-normal"
              : "border-cream/60 mix-blend-difference"
          }`}
          aria-label="Buka menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            // Sesuaikan warna garis hamburger saat di-scroll
            className={`h-[2px] w-5 transition-colors duration-300 ${
              isScrolled ? "bg-[#012db4]" : "bg-cream"
            }`}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            // Sesuaikan warna garis hamburger saat di-scroll
            className={`h-[2px] w-5 transition-colors duration-300 ${
              isScrolled ? "bg-[#012db4]" : "bg-cream"
            }`}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto bg-spill-blue-deep px-6 py-24 md:px-16 md:py-28"
          >
            <nav className="flex flex-col gap-1 md:gap-2">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  data-cursor="pointer"
                  onClick={() => go(link)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-baseline gap-4 overflow-hidden text-left"
                >
                  <span className="font-mono text-xs text-crispy-yellow/60">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[13vw] font-black uppercase leading-[0.95] text-cream/80 transition-colors duration-300 group-hover:text-crispy-yellow sm:text-[7vw] md:text-[4.8vw]">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cream/40">
                  Hubungi Kami
                </p>
                <a
                  href="mailto:hello@spillandbites.com"
                  data-cursor="pointer"
                  className="mt-2 block font-display text-xl font-bold text-cream underline decoration-crispy-yellow/50 underline-offset-4 hover:text-crispy-yellow md:text-2xl"
                >
                  hello@spillandbites.com
                </a>
              </div>
              <div className="flex gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    className="text-sm font-semibold uppercase tracking-widest text-cream/60 hover:text-crispy-yellow"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}