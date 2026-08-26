"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Reservation } from "@/app/api/reservations/route";

const STATUSES: Reservation["status"][] = [
  "Menunggu Konfirmasi",
  "Dikonfirmasi",
  "Dibatalkan",
];

export default function ReservationsPage() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/reservations");
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: Reservation["status"]) => {
    setUpdatingId(id);
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((r) => (r.id === id ? updated : r)));
    }
    setUpdatingId(null);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Reservasi Meja
      </h1>
      <p className="mt-1 text-sm text-black">
        Cek dan konfirmasi reservasi yang masuk dari pelanggan.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-black/50">Belum ada reservasi.</p>
        ) : (
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Cabang</th>
                <th className="px-5 py-3">Tanggal &amp; Jam</th>
                <th className="px-5 py-3">Tamu</th>
                <th className="px-5 py-3">Catatan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black">{r.name}</p>
                    <p className="text-xs text-black/50">{r.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-black/80">{r.branch}</td>
                  <td className="px-5 py-4 text-black/80">
                    {r.date} · {r.time}
                  </td>
                  <td className="px-5 py-4 text-black/80">{r.guests} orang</td>
                  <td className="max-w-[200px] px-5 py-4 text-black/60">
                    {r.notes || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) =>
                        updateStatus(r.id, e.target.value as Reservation["status"])
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
