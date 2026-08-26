"use client";

import { useEffect, useState } from "react";
import type { Promo } from "@/app/api/promos/route";

export default function PromosManagePage() {
  const [items, setItems] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    discountPercent: "",
    validUntil: "",
  });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/promos");
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setForm({ title: "", description: "", code: "", discountPercent: "", validUntil: "" });
      setShowForm(false);
    } else {
      alert("Gagal membuat promo. Cek kembali form-nya.");
    }
  };

  const toggleActive = async (p: Promo) => {
    setBusyId(p.id);
    const res = await fetch(`/api/promos/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !p.active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((it) => (it.id === p.id ? updated : it)));
    }
    setBusyId(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus promo ini?")) return;
    setBusyId(id);
    const res = await fetch(`/api/promos/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((p) => p.id !== id));
    setBusyId(null);
  };

  const isExpired = (validUntil: string) =>
    new Date(validUntil).getTime() < Date.now();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-orange-600">
            Manajemen Promo &amp; Kampanye
          </h1>
          <p className="mt-1 text-sm text-black">
            Buat promo baru dan tentukan batas waktu kadaluarsa (validUntil).
            Khusus SuperAdmin.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          + Promo Baru
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={create}
          className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-black/10 bg-white p-6 sm:grid-cols-2"
        >
          <input
            required
            placeholder="Judul promo"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500 sm:col-span-2"
          />
          <textarea
            placeholder="Deskripsi"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500 sm:col-span-2"
          />
          <input
            required
            placeholder="Kode promo (mis. HEMAT20)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
          <input
            type="number"
            min={1}
            max={100}
            placeholder="Diskon (%)"
            value={form.discountPercent}
            onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-black/60">
              Berlaku sampai (validUntil)
            </label>
            <input
              required
              type="date"
              value={form.validUntil}
              onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-orange-600 py-2.5 text-sm font-bold text-white hover:bg-orange-700 sm:col-span-2"
          >
            Simpan Promo
          </button>
        </form>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-black/50">Memuat data...</p>
        ) : (
          items.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-bold text-black">
                  {p.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    !p.active
                      ? "bg-gray-100 text-gray-600"
                      : isExpired(p.validUntil)
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {!p.active
                    ? "Nonaktif"
                    : isExpired(p.validUntil)
                    ? "Kadaluarsa"
                    : "Aktif"}
                </span>
              </div>
              <p className="mt-2 text-sm text-black/70">{p.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-black/50">
                <span className="font-mono font-bold text-orange-600">
                  {p.code}
                </span>
                <span>{p.discountPercent}% off</span>
              </div>
              <p className="mt-1 text-xs text-black/50">
                Berlaku sampai{" "}
                {new Date(p.validUntil).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  disabled={busyId === p.id}
                  onClick={() => toggleActive(p)}
                  className="flex-1 rounded-lg border border-black/15 py-2 text-xs font-semibold text-black hover:bg-black/5 disabled:opacity-50"
                >
                  {p.active ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  disabled={busyId === p.id}
                  onClick={() => remove(p.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
