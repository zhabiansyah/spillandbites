"use client";

import { useEffect, useState } from "react";
import type { Promo } from "@prisma/client";

function formatDate(dateValue: string | Date | undefined) {
  if (!dateValue) return "—";
  const d = new Date(dateValue);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PromosManagePage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [validUntil, setValidUntil] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadPromos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/promos");
      if (res.ok) {
        const data = await res.json();
        setPromos(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!validUntil) {
      setError("Tanggal berlaku wajib diisi.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          code,
          discountPercent,
          validUntil, // Mengirim string YYYY-MM-DD
        }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setCode("");
        setDiscountPercent(0);
        setValidUntil("");
        loadPromos();
      } else {
        const data = await res.json();
        setError(data.error || "Gagal membuat promo");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Kelola Promo
      </h1>
      <p className="mt-1 text-sm text-black">
        Tambah dan atur daftar kode promo yang berlaku.
      </p>

      {/* Form Tambah Promo */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-black">Tambah Promo Baru</h2>

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-black/70">
              Judul Promo
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-orange-500"
              placeholder="Diskon Buka Puasa"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70">
              Kode Promo
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm uppercase outline-none focus:border-orange-500"
              placeholder="SPILL50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70">
              Diskon (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70">
              Berlaku Sampai
            </label>
            <input
              type="date"
              required
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-black/70">
              Deskripsi
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-orange-500"
              placeholder="Keterangan singkat promo..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Simpan Promo"}
        </button>
      </form>

      {/* Tabel Daftar Promo */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data promo...</p>
        ) : promos.length === 0 ? (
          <p className="p-6 text-sm text-black/50">Belum ada promo aktif.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Judul</th>
                <th className="px-5 py-3">Diskon</th>
                <th className="px-5 py-3">Berlaku Sampai</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-4 font-mono font-bold text-orange-600">
                    {p.code}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black">{p.title}</p>
                    {p.description && (
                      <p className="text-xs text-black/50">{p.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-semibold text-black">
                    {p.discountPercent}%
                  </td>
                  <td className="px-5 py-4 text-xs text-black/70">
                    {formatDate(p.validUntil)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        p.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}