"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RatingStars from "@/components/RatingStars";

const TESTIMONIALS = [
  {
    name: "Aya R.",
    handle: "@ayaeatsit",
    quote:
      "Tarikan kejunya aja udah worth it buat datang. Ini ayam goreng paling fotogenik yang pernah aku pesan.",
  },
  {
    name: "Dimas P.",
    handle: "@dimzz",
    quote:
      "Spill & Bites bikin rutinitas Jumat aku berubah total. Trio sausnya juara — susah milih yang paling favorit.",
  },
  {
    name: "Nadya K.",
    handle: "@nadyakay",
    quote:
      "Ini fast food tapi rasanya kayak acara khusus. Tempatnya, lelehannya, semuanya dirancang buat konten.",
  },
];

const PLATFORM_RATINGS = [
  { name: "Google Review", rating: "4.9", count: "2.100+ ulasan" },
  { name: "GoFood", rating: "4.8", count: "1.500+ ulasan" },
  { name: "GrabFood", rating: "4.9", count: "980+ ulasan" },
];

// UGC placeholder — sambungkan ke Instagram Graph API / TikTok API untuk
// menarik postingan bertag @spillandbites secara otomatis.
const UGC_COUNT = 6;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <span className="mb-4 block text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Bukti Sosial
        </span>
        <h2 className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Dipercaya ribuan pelanggan
        </h2>

        {/* Rating badges + halal cert */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {PLATFORM_RATINGS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-3 shadow-[0_8px_24px_rgba(1,45,180,0.08)]"
            >
              <RatingStars rating={Number(p.rating)} size={16} />
              <div className="text-left">
                <p className="text-sm font-bold text-ink">
                  {p.rating} · {p.name}
                </p>
                <p className="text-xs text-ink-soft">{p.count}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">
            <span className="text-xl">✅</span>
            <p className="text-sm font-bold text-primary">
              Bersertifikat Halal MUI
            </p>
          </div>
        </div>

        {/* Testimonial slider */}
        <div className="relative mt-16 flex min-h-[220px] flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.handle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl md:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-6 text-sm uppercase tracking-widest text-ink-soft">
                {t.name} · {t.handle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={tm.handle}
                data-cursor="pointer"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  background: i === index ? "#012DB4" : "rgba(1,45,180,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* UGC / Instagram feed placeholder */}
        <div className="mt-20">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.25em] text-ink-soft">
            #SpillAndBites di Instagram &amp; TikTok
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {Array.from({ length: UGC_COUNT }).map((_, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-secondary/25"
              >
                <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-40 transition-transform duration-300 group-hover:scale-110">
                  📸
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-ink-soft">
            Feed ini placeholder — hubungkan ke Instagram Graph API / TikTok
            API untuk menampilkan postingan bertag otomatis.
          </p>
        </div>
      </div>
    </section>
  );
}
