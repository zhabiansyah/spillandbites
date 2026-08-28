import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  // Added await here if your auth library requires it
  const session = await getSession(); 
  
  // Let PostgreSQL do the counting directly
  const [
    totalComplaints,
    openComplaints,
    totalReservations,
    pendingReservations,
    totalBirthday,
    pendingBirthday,
    totalArticles,
    draftArticles
  ] = await Promise.all([
    db.complaint.count(),
    db.complaint.count({ where: { status: { not: "Selesai" } } }),
    
    db.reservation.count(),
    db.reservation.count({ where: { status: "Menunggu Konfirmasi" } }),
    
    db.birthdayBooking.count(),
    db.birthdayBooking.count({ where: { status: "Menunggu Konfirmasi" } }),
    
    db.article.count(),
    db.article.count({ where: { status: "Draft" } }),
  ]);

  const cards = [
    {
      label: "Komplain Belum Selesai",
      value: openComplaints,
      total: totalComplaints,
      href: "/admin/complaints",
      icon: "📮",
    },
    {
      label: "Reservasi Menunggu",
      value: pendingReservations,
      total: totalReservations,
      href: "/admin/reservations",
      icon: "📅",
    },
    {
      label: "Booking Ulang Tahun Menunggu",
      value: pendingBirthday,
      total: totalBirthday,
      href: "/admin/birthday",
      icon: "🎂",
    },
    {
      label: "Artikel Draft",
      value: draftArticles,
      total: totalArticles,
      href: "/admin/articles",
      icon: "📰",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Halo, {session?.name} 👋
      </h1>
      <p className="mt-1 text-sm text-black">
        Ringkasan aktivitas yang butuh perhatianmu hari ini.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-2xl">{c.icon}</span>
            <p className="mt-4 text-3xl font-extrabold text-orange-600">
              {c.value}
            </p>
            <p className="mt-1 text-sm text-black">
              {c.label}{" "}
              <span className="text-black/40">/ {c.total} total</span>
            </p>
          </Link>
        ))}
      </div>

      {/* Quick access section remains unchanged */}
      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-orange-600">
          Akses cepat
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/complaints"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
          >
            Tinjau Komplain →
          </Link>
          <Link
            href="/admin/reservations"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
          >
            Cek Reservasi →
          </Link>
          <Link
            href="/admin/birthday"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
          >
            Cek Booking Ulang Tahun →
          </Link>
          <Link
            href="/admin/articles/new"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
          >
            Tulis Artikel Baru →
          </Link>
        </div>
      </div>
    </div>
  );
}