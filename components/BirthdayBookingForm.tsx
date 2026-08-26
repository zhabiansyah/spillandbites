"use client";

import { useState } from "react";

const BRANCHES = [
  "Jakarta — Kemang",
  "Bandung — Dago",
  "Surabaya — Gubeng",
  "Yogyakarta — Sleman",
  "Medan — Petisah",
  "Bali — Seminyak",
];

export default function BirthdayBookingForm() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/birthday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          branch: data.get("branch"),
          date: data.get("date"),
          package: data.get("package"),
          kidsCount: data.get("kidsCount"),
          notes: data.get("notes"),
        }),
      });
      if (res.ok) {
        setDone(true);
        form.reset();
      } else {
        alert("Gagal mengirim booking, coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        data-cursor="pointer"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
      >
        Booking Sekarang →
      </button>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-black/5 bg-primary/5 p-6 text-center">
        <p className="text-3xl">🎉</p>
        <p className="mt-2 font-semibold text-ink">Booking terkirim!</p>
        <p className="mt-1 text-sm text-ink-soft">
          Tim kami akan menghubungimu untuk konfirmasi jadwal.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(1,45,180,0.06)] sm:grid-cols-2"
    >
      <input
        name="name"
        required
        placeholder="Nama pemesan"
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      />
      <input
        name="phone"
        required
        placeholder="No. WhatsApp"
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      />
      <select
        name="branch"
        required
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      >
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select
        name="package"
        required
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      >
        <option value="Spill Kids 1">Spill Kids 1 — 370Rb/10 anak</option>
        <option value="Spill Kids 2">Spill Kids 2 — 470Rb/10 anak</option>
      </select>
      <input
        name="date"
        type="date"
        required
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      />
      <input
        name="kidsCount"
        type="number"
        min={1}
        required
        placeholder="Jumlah anak"
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
      />
      <textarea
        name="notes"
        rows={2}
        placeholder="Catatan (tema, dekorasi, dll)"
        className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-ink outline-none focus:border-primary sm:col-span-2"
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary py-3 text-sm font-bold text-white disabled:opacity-60 sm:col-span-2"
      >
        {submitting ? "Mengirim..." : "Kirim Booking"}
      </button>
    </form>
  );
}
