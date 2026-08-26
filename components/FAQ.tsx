"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "Jam operasional Spill & Bites setiap hari apa saja?",
    a: "Kami buka setiap hari. Senin–Jumat pukul 10.00–22.00, Sabtu–Minggu pukul 10.00–22.30. Jam bisa sedikit berbeda per cabang, cek halaman Lokasi untuk detailnya.",
  },
  {
    q: "Apakah Spill & Bites sudah bersertifikat halal?",
    a: "Sudah. Seluruh cabang Spill & Bites bersertifikat Halal MUI.",
  },
  {
    q: "Bagaimana cara mengumpulkan poin loyalty?",
    a: "Setiap transaksi otomatis menambah poin ke akun Spill Rewards kamu. Poin bisa ditukar dengan potongan harga atau menu gratis. Lihat detailnya di halaman Membership.",
  },
  {
    q: "Bisa pesan untuk acara ulang tahun atau katering?",
    a: "Bisa! Kami punya paket Spill Birthday dan layanan katering untuk acara kamu. Hubungi kami lewat halaman Kontak atau WhatsApp untuk booking.",
  },
  {
    q: "Apakah tersedia di aplikasi pesan-antar?",
    a: "Ya, Spill & Bites tersedia di GoFood, GrabFood, ShopeeFood, dan beberapa platform lain. Cek bagian bawah tombol Pesan Sekarang untuk daftar lengkapnya.",
  },
  {
    q: "Bagaimana jika pesanan saya bermasalah?",
    a: "Kamu bisa langsung chat lewat tombol bantuan di pojok kanan bawah, atau isi form komplain — tim kami akan menindaklanjuti secepatnya.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-3xl">
        <span className="mb-4 block text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">
          FAQ
        </span>
        <h2 className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Pertanyaan yang sering ditanyakan
        </h2>

        <div className="mt-10 divide-y divide-black/5 rounded-2xl border border-black/5">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-5 sm:px-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="pointer"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-ink">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="shrink-0 text-2xl font-light text-primary"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
