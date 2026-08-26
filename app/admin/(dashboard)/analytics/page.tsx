"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type AnalyticsData = {
  revenue: { day: string; revenue: number }[];
  bestSellers: { name: string; sold: number }[];
  complaintStats: {
    total: number;
    resolved: number;
    resolutionRate: number;
    avgResolutionHours: number;
  };
};

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return <p className="text-sm text-black/50">Memuat laporan...</p>;
  }

  const totalWeekRevenue = data.revenue.reduce((s, d) => s + d.revenue, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Laporan &amp; Analitik
      </h1>
      <p className="mt-1 text-sm text-black">
        Ringkasan performa mingguan — khusus SuperAdmin.
      </p>
      <p className="mt-2 text-xs text-black/40">
        Catatan: data pendapatan &amp; menu terlaris di bawah ini masih
        contoh (mock) karena belum ada sistem pencatatan transaksi asli.
        Data komplain sudah real dari data komplain yang masuk.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Pendapatan Minggu Ini
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-orange-600">
            {formatRupiah(totalWeekRevenue)}
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Tingkat Penyelesaian Komplain
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-orange-600">
            {data.complaintStats.resolutionRate}%
          </p>
          <p className="text-xs text-black/50">
            {data.complaintStats.resolved} dari {data.complaintStats.total}{" "}
            komplain
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Rata-rata Waktu Penyelesaian
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-orange-600">
            {data.complaintStats.avgResolutionHours} jam
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-orange-600">
          Grafik Pendapatan (7 Hari Terakhir)
        </h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`}
              />
              <Tooltip formatter={(v: number) => formatRupiah(v)} />
              <Bar dataKey="revenue" fill="#012DB4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-orange-600">
          Menu Terlaris
        </h2>
        <div className="mt-4 space-y-3">
          {data.bestSellers.map((item, i) => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="w-6 text-sm font-bold text-black/40">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-black">
                    {item.name}
                  </span>
                  <span className="text-black/50">{item.sold} terjual</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{
                      width: `${(item.sold / data.bestSellers[0].sold) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
