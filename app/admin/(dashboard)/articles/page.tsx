"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Article } from "@prisma/client"; // ✅ Menggunakan tipe data otomatis dari Prisma

function formatDate(val: string | Date | null) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      
      // ✅ Perlindungan ekstra: Pastikan data benar-benar Array sebelum dimasukkan ke state
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("Gagal memuat data:", data);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetch:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (a: Article) => {
    setBusyId(a.id);
    const nextStatus = a.status === "Published" ? "Draft" : "Published";
    const res = await fetch(`/api/articles/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((it) => (it.id === a.id ? updated : it)));
    }
    setBusyId(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus artikel ini?")) return;
    setBusyId(id);
    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
    setBusyId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-orange-600">
            Artikel
          </h1>
          <p className="mt-1 text-sm text-black">
            Kelola artikel/konten blog Spill &amp; Bites.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          + Artikel Baru
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-black/50">Belum ada artikel.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">Judul</th>
                <th className="px-5 py-3">Penulis</th>
                <th className="px-5 py-3">Dibuat</th>
                <th className="px-5 py-3">Terbit</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-b border-black/5 last:border-0">
                  <td className="max-w-xs px-5 py-4">
                    <p className="font-semibold text-black">{a.title}</p>
                    <p className="text-xs text-black/50">{a.excerpt}</p>
                  </td>
                  <td className="px-5 py-4 text-black/80">{a.author}</td>
                  <td className="px-5 py-4 text-xs text-black/60">
                    {formatDate(a.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-xs text-black/60">
                    {formatDate(a.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        disabled={busyId === a.id}
                        onClick={() => toggleStatus(a)}
                        className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 disabled:opacity-50"
                      >
                        {a.status === "Published" ? "Jadikan Draft" : "Terbitkan"}
                      </button>
                      <button
                        disabled={busyId === a.id}
                        onClick={() => remove(a.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </div>
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