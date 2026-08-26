"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

type Tab = "chat" | "complaint";

const QUICK_ANSWERS = [
  {
    q: "Jam buka hari ini?",
    a: "Kami buka setiap hari, Senin–Jumat 10.00–22.00 dan Sabtu–Minggu 10.00–22.30 WIB.",
  },
  {
    q: "Lokasi cabang terdekat?",
    a: "Cek halaman Lokasi untuk melihat 6 cabang kami beserta petanya.",
  },
  {
    q: "Bisa reservasi tempat?",
    a: "Bisa, hubungi cabang tujuan lewat WhatsApp atau halaman Kontak untuk reservasi.",
  },
];

export default function FloatingChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="pointer"
        aria-label="Bantuan"
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-[0_8px_24px_rgba(1,45,180,0.4)] transition-transform hover:scale-105"
      >
        {open ? "✕" : "💬"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[80] flex w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
          >
            <div className="bg-primary px-5 py-4 text-white">
              <p className="font-display font-bold">Bantuan Spill & Bites</p>
              <p className="text-xs text-white/70">
                Biasanya balas dalam beberapa menit
              </p>
            </div>

            <div className="flex border-b border-black/5">
              <button
                onClick={() => setTab("chat")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  tab === "chat"
                    ? "border-b-2 border-primary text-primary"
                    : "text-ink-soft"
                }`}
              >
                Tanya Cepat
              </button>
              <button
                onClick={() => setTab("complaint")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  tab === "complaint"
                    ? "border-b-2 border-primary text-primary"
                    : "text-ink-soft"
                }`}
              >
                Laporkan Masalah
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-5">
              {tab === "chat" ? (
                <div className="space-y-3">
                  <p className="text-xs text-ink-soft">
                    Pilih pertanyaan umum di bawah, atau chat langsung via
                    WhatsApp.
                  </p>
                  {QUICK_ANSWERS.map((qa) => (
                    <details
                      key={qa.q}
                      className="rounded-xl border border-black/5 p-3 open:bg-primary/5"
                    >
                      <summary className="cursor-pointer text-sm font-semibold text-ink">
                        {qa.q}
                      </summary>
                      <p className="mt-2 text-sm text-ink-soft">{qa.a}</p>
                    </details>
                  ))}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-bold text-ink"
                  >
                    💬 Chat via WhatsApp
                  </a>
                </div>
              ) : sent ? (
                <div className="py-6 text-center">
                  <p className="text-3xl">✅</p>
                  <p className="mt-3 font-semibold text-ink">
                    Laporan terkirim
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Tim kami akan meninjau dan menindaklanjuti keluhanmu
                    secepatnya.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    setSubmitting(true);
                    try {
                      await fetch("/api/complaints", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderNumber: data.get("orderNumber"),
                          message: data.get("message"),
                          email: data.get("email"),
                          name: data.get("email"),
                        }),
                      });
                      setSent(true);
                    } catch {
                      alert("Gagal mengirim laporan, coba lagi.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="space-y-3"
                >
                  <p className="text-xs text-ink-soft">
                    Ceritakan masalah pesananmu — laporan ini akan masuk ke
                    dashboard Admin.
                  </p>
                  <input
                    name="orderNumber"
                    placeholder="Nomor pesanan (opsional)"
                    className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="Jelaskan kendalanya..."
                    className="w-full resize-none rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email kamu"
                    className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-primary py-3 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {submitting ? "Mengirim..." : "Kirim Laporan"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
