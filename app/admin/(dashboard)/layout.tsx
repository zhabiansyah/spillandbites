import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSession();

  // middleware.ts sudah menjaga /admin/*, ini lapisan kedua untuk halaman
  // yang dirender server-side (defense in depth).
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAF9] font-body text-black">
      <AdminSidebar session={session} />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  );
}
