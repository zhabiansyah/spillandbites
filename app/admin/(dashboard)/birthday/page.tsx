"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";

// Tipe data manual agar tidak tergantung ekspor Prisma Client
export interface BirthdayBooking {
  id: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  package: string;
  kidsCount: number;
  notes?: string | null;
  status: "Menunggu Konfirmasi" | "Dikonfirmasi" | "Dibatalkan" | string;
}

const STATUSES: BirthdayBooking["status"][] = [
  "Menunggu Konfirmasi",
  "Dikonfirmasi",
  "Dibatalkan",
];

export default function BirthdayPage() {
  const [items, setItems] = useState<BirthdayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/birthday");
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: BirthdayBooking["status"]) => {
    setUpdatingId(id);
    const res = await fetch(`/api/birthday/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((b) => (b.id === id ? updated : b)));
    }
    setUpdatingId(null);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Booking Paket Ulang Tahun
      </h1>
      <p className="mt-1 text-sm text-black">
        Cek dan konfirmasi booking paket Spill Birthday yang masuk.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-black/50">Belum ada booking.</p>
        ) : (
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">Pemesan</th>
                <th className="px-5 py-3">Cabang</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Paket</th>
                <th className="px-5 py-3">Jumlah Anak</th>
                <th className="px-5 py-3">Catatan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black">{b.name}</p>
                    <p className="text-xs text-black/50">{b.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-black/80">{b.branch}</td>
                  <td className="px-5 py-4 text-black/80">{b.date}</td>
                  <td className="px-5 py-4 text-black/80">{b.package}</td>
                  <td className="px-5 py-4 text-black/80">{b.kidsCount} anak</td>
                  <td className="max-w-[180px] px-5 py-4 text-black/60">
                    {b.notes || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) =>
                        updateStatus(
                          b.id,
                          e.target.value as BirthdayBooking["status"]
                        )
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