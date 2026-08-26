"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

const BRANCHES = [
  "Jakarta — Kemang",
  "Bandung — Dago",
  "Surabaya — Gubeng",
  "Yogyakarta — Sleman",
  "Medan — Petisah",
  "Bali — Seminyak",
];

export default function ReservasiPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          branch: data.get("branch"),
          date: data.get("date"),
          time: data.get("time"),
          guests: data.get("guests"),
          notes: data.get("notes"),
        }),
      });
      if (res.ok) {
        setDone(true);
        form.reset();
      } else {
        alert("Gagal mengirim reservasi, coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Reservasi"
        title={
          <>
            Amankan meja
            <br />
            <span className="text-secondary">kamu dulu.</span>
          </>
        }
        description="Isi form di bawah, tim cabang akan mengonfirmasi reservasimu lewat telepon/WhatsApp."
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-xl">
          {done ? (
            <div className="rounded-3xl border border-black/5 bg-primary/5 p-10 text-center shadow-[0_8px_30px_rgba(1,45,180,0.06)]">
              <p className="text-4xl">✅</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink">
                Reservasi terkirim!
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Tim cabang akan menghubungimu untuk konfirmasi. Terima kasih!
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
              >
                Buat Reservasi Lain
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_30px_rgba(1,45,180,0.06)]"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                    Nama
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Nama lengkap"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                    No. WhatsApp
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="0812xxxxxxx"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                  Pilih Cabang
                </label>
                <select
                  name="branch"
                  required
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                    Tanggal
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                    Jam
                  </label>
                  <input
                    name="time"
                    type="time"
                    required
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                    Jumlah Tamu
                  </label>
                  <input
                    name="guests"
                    type="number"
                    min={1}
                    required
                    placeholder="2"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
                  Catatan (opsional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Permintaan khusus..."
                  className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                />
              </div>

              <MagneticButton type="submit" className="w-full justify-center">
                {submitting ? "Mengirim..." : "Kirim Reservasi"}
              </MagneticButton>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
