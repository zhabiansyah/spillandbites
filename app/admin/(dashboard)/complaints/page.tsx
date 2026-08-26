"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Complaint } from "@/app/api/complaints/route";

const STATUSES: Complaint["status"][] = ["Baru", "Diproses", "Selesai"];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ComplaintsPage() {
  const [items, setItems] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"Semua" | Complaint["status"]>("Semua");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/complaints");
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: Complaint["status"]) => {
    setUpdatingId(id);
    const res = await fetch(`/api/complaints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    setUpdatingId(null);
  };

  const filtered =
    filter === "Semua" ? items : items.filter((c) => c.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Tracking Komplain &amp; Keluhan
      </h1>
      <p className="mt-1 text-sm text-black">
        Pantau dan tandai status penanganan setiap laporan pelanggan.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["Semua", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === s
                ? "border-orange-600 bg-orange-600 text-white"
                : "border-black/10 bg-white text-black/60 hover:border-orange-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-black/50">Tidak ada komplain.</p>
        ) : (
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">No. Pesanan</th>
                <th className="px-5 py-3">Pelanggan</th>
                <th className="px-5 py-3">Keluhan</th>
                <th className="px-5 py-3">Masuk</th>
                <th className="px-5 py-3">Ditangani</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ubah Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-4 font-mono text-xs text-black/70">
                    {c.orderNumber}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black">{c.name}</p>
                    <p className="text-xs text-black/50">{c.email}</p>
                  </td>
                  <td className="max-w-xs px-5 py-4 text-black/80">
                    {c.message}
                  </td>
                  <td className="px-5 py-4 text-xs text-black/60">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-xs text-black/60">
                    {formatDate(c.resolvedAt)}
                    {c.handledBy && (
                      <p className="text-black/40">oleh {c.handledBy}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={c.status}
                      disabled={updatingId === c.id}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value as Complaint["status"])
                      }
                      className="rounded-lg border border-black/15 px-2 py-1.5 text-xs font-semibold text-black outline-none focus:border-orange-500 disabled:opacity-50"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
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
