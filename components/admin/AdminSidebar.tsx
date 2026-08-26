"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@/lib/auth";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/complaints", label: "Komplain & Keluhan", icon: "📮" },
  { href: "/admin/articles", label: "Artikel", icon: "📰" },
  { href: "/admin/reservations", label: "Reservasi", icon: "📅" },
  { href: "/admin/birthday", label: "Booking Ulang Tahun", icon: "🎂" },
];

const SUPERADMIN_LINKS = [
  { href: "/admin/users", label: "Manajemen User", icon: "👥" },
  { href: "/admin/promos-manage", label: "Manajemen Promo", icon: "🏷️" },
  { href: "/admin/analytics", label: "Laporan & Analitik", icon: "📈" },
];

export default function AdminSidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname?.startsWith(href);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-black/10 bg-white">
      <div className="border-b border-black/5 px-6 py-6">
        <p className="font-display text-lg font-extrabold text-black">
          Spill<span className="text-orange-600">&amp;</span>Bites
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
          {session.role === "superadmin" ? "Super Admin" : "Admin Panel"}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
          Menu Admin
        </p>
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(link.href, link.exact)
                ? "bg-orange-50 text-orange-700"
                : "text-black/70 hover:bg-black/5"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}

        {session.role === "superadmin" && (
          <>
            <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
              Super Admin
            </p>
            {SUPERADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-700"
                    : "text-black/70 hover:bg-black/5"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="border-t border-black/5 p-4">
        <p className="px-2 text-sm font-semibold text-black">{session.name}</p>
        <p className="px-2 text-xs text-black/50">{session.email}</p>
        <button
          onClick={logout}
          className="mt-3 w-full rounded-lg border border-black/10 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
