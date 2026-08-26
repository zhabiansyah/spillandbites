"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Category = "Semua" | "Snacks/Bites" | "Beverages/Spill" | "Main Course";

type Item = {
  title: string;
  desc: string;
  category: Exclude<Category, "Semua">;
  tags: ("Best Seller" | "Spicy" | "Recommended")[];
  price: string;
  gradient: string;
  emoji: string;
  available: boolean;
};

const ITEMS: Item[] = [
  {
    title: "Spill Boneless Fried Chicken",
    desc: "Ayam boneless + nasi + minuman + pilih saus signature.",
    category: "Main Course",
    tags: ["Best Seller"],
    price: "38K",
    gradient: "from-[#FFC400] via-[#012DB4] to-[#04111D]",
    emoji: "🍗",
    available: true,
  },
  {
    title: "Burger Mozzarella Drench",
    desc: "Patty crispy, keju leleh, saus signature dalam satu genggaman.",
    category: "Main Course",
    tags: ["Best Seller"],
    price: "38K",
    gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
    emoji: "🍔",
    available: true,
  },
  {
    title: "Boneless Chicken Seblak Sauce",
    desc: "Boneless chicken disiram sambal seblak khas Nusantara.",
    category: "Main Course",
    tags: ["Spicy", "Recommended"],
    price: "38K",
    gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
    emoji: "🌶️",
    available: true,
  },
  {
    title: "Trio Saus Spill",
    desc: "Tiga saus andalan: original, pedas, dan keju dalam satu paket.",
    category: "Snacks/Bites",
    tags: ["Recommended"],
    price: "16K",
    gradient: "from-[#FFFFFF]/20 via-[#0B2A4A] to-[#04111D]",
    emoji: "🥫",
    available: true,
  },
  {
    title: "Cheese Lava Fries",
    desc: "Kentang goreng disiram lelehan keju panas dan bumbu spill.",
    category: "Snacks/Bites",
    tags: ["Best Seller"],
    price: "29K",
    gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
    emoji: "🧀",
    available: true,
  },
  {
    title: "Chicky Bites — Seblak Sauce",
    desc: "Potongan chicky bites pedas gurih ala seblak.",
    category: "Snacks/Bites",
    tags: ["Spicy"],
    price: "28K",
    gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
    emoji: "🍢",
    available: false,
  },
  {
    title: "Mocktail Blue Lagoon",
    desc: "Segar, biru, manis-asam — favorit buat difoto sebelum diminum.",
    category: "Beverages/Spill",
    tags: ["Recommended"],
    price: "22K",
    gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
    emoji: "🍹",
    available: true,
  },
  {
    title: "Ice Llips Caramel Creamy Latte",
    desc: "Latte creamy dengan karamel signature Llips Coffee.",
    category: "Beverages/Spill",
    tags: ["Best Seller"],
    price: "29.9K",
    gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
    emoji: "☕",
    available: true,
  },
  {
    title: "Spill Chocolate Signature",
    desc: "Cokelat signature yang menenangkan hati, hot atau ice.",
    category: "Beverages/Spill",
    tags: ["Recommended"],
    price: "25.09K",
    gradient: "from-[#7A1F17] via-[#3A1210] to-[#04111D]",
    emoji: "🍫",
    available: true,
  },
];

const CATEGORIES: Category[] = [
  "Semua",
  "Main Course",
  "Snacks/Bites",
  "Beverages/Spill",
];

const TAG_STYLE: Record<string, string> = {
  "Best Seller": "bg-secondary text-ink",
  Spicy: "bg-red-600 text-white",
  Recommended: "bg-primary text-white",
};

export default function Bento() {
  const [active, setActive] = useState<Category>("Semua");
  const filtered =
    active === "Semua" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <section id="bento" className="relative bg-white px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Katalog Menu Unggulan
            </span>
            <h2 className="font-display text-4xl font-extrabold leading-[0.95] text-ink sm:text-5xl md:text-6xl">
              Dibuat untuk
              <br />
              di-<span className="text-secondary">spill</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-soft">
            Filter cepat berdasarkan kategori. Foto asli menyusul — tiap
            kartu sudah siap pakai.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="pointer"
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === c
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 bg-white text-ink-soft hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 0.98 }}
                data-cursor="pointer"
                className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 ${item.gradient}`}
              >
                <div className="absolute -right-6 -top-6 text-6xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {item.emoji}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${TAG_STYLE[t]}`}
                    >
                      {t}
                    </span>
                  ))}
                  {!item.available && (
                    <span className="w-fit rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      Habis
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <h3 className="font-display text-lg font-bold leading-tight text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{item.desc}</p>
                  <p className="mt-3 font-semibold text-white drop-shadow-[0_1px_3px_rgba(4,17,29,0.6)]">
                    {item.price}
                  </p>
                </div>

                {!item.available && (
                  <div className="absolute inset-0 bg-black/40" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/menu"
            data-cursor="pointer"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Lihat Menu Lengkap
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
