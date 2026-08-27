"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RatingStars from "@/components/RatingStars";

interface Testimonial {
  name: string;
  handle: string;
  quote: string;
}

interface PlatformRating {
  name: string;
  rating: string;
  count: string;
}

const TESTIMONIALS: Testimonial[] = [
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

const PLATFORM_RATINGS: PlatformRating[] = [
  { name: "Google Review", rating: "4.9", count: "2.100+ ulasan" },
  { name: "GoFood", rating: "4.8", count: "1.500+ ulasan" },
  { name: "GrabFood", rating: "4.9", count: "980+ ulasan" },
  { name: "ShopeeFood", rating: "4.7", count: "1.200+ ulasan" },
];

const UGC_IMAGES: string[] = [
  "/Asset/image1.jpg",
  "/Asset/image2.jpg",
  "/Asset/image3.jpg",
  "/Asset/image4.jpg",
  "/Asset/image5.jpg",
  "/Asset/image6.jpg",
];

export default function Testimonials() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <>
      <section
        id="testimonials"
        className="relative overflow-hidden bg-white px-6 py-24 md:px-16 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <span className="mb-4 block text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Bukti Sosial
          </span>
          <h2 className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Dipercaya ribuan pelanggan
          </h2>

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
        </div>
      </section>

      {/* Social Media Feed Footer - Infinite Carousel */}
      {/* Mengubah py-12 menjadi pt-12 agar tidak ada ruang sisa di bagian bawah */}
      <section className="bg-[#012DB4] pt-12 overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-16">
          <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl text-center md:text-left">
            Instagram &amp; TikTok Spill &amp; Bites
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/spillandbites.id?igsi=MXJxbmhnam14MmFudg=="
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[#E51636] px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Ikuti Instagram
            </a>
            <a
              href="https://www.tiktok.com/@spillandbites"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-900 border border-gray-700"
            >
              Ikuti TikTok
            </a>
          </div>
        </div>

        <div className="relative flex w-full overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...UGC_IMAGES, ...UGC_IMAGES].map((item, i) => (
              <div
                key={i}
                className="relative h-64 w-64 shrink-0 border-r border-[#012DB4] bg-gray-100 sm:h-72 sm:w-72 md:h-80 md:w-80"
              >
                <div className="flex h-full w-full overflow-hidden bg-gray-200">
                        <img
                        src={item}
                         alt="Spill & Bites Carousel"
                         className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                  </div>  
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}