"use client";

import { useEffect, useState } from "react";
import type { AppUser } from "@/app/api/users/route";

const ROLES: AppUser["role"][] = ["CUSTOMER", "ADMIN", "SUPERADMIN"];

export default function UsersPage() {
  const [items, setItems] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "ADMIN" });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateUser = async (
    id: string,
    patch: Partial<Pick<AppUser, "role" | "status">>
  ) => {
    setBusyId(id);
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((u) => (u.id === id ? updated : u)));
    }
    setBusyId(null);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setForm({ name: "", email: "", role: "ADMIN" });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-orange-600">
            Manajemen Pengguna &amp; Staf
          </h1>
          <p className="mt-1 text-sm text-black">
            Buat akun staf baru, ubah peran, atau blokir akun. Khusus
            SuperAdmin.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          + Buat Akun Staf
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createUser}
          className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-black/10 bg-white p-6 sm:grid-cols-4"
        >
          <input
            required
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-orange-600 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
          >
            Simpan
          </button>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-black/50">Memuat data...</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Poin</th>
                <th className="px-5 py-3">Bergabung</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black">{u.name}</p>
                    <p className="text-xs text-black/50">{u.email}</p>
                  </td>
                  <td className="px-5 py-4 text-black/80">{u.points}</td>
                  <td className="px-5 py-4 text-xs text-black/60">
                    {new Date(u.joinedAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={u.role}
                      disabled={busyId === u.id}
                      onChange={(e) =>
                        updateUser(u.id, {
                          role: e.target.value as AppUser["role"],
                        })
                      }
                      className="rounded-lg border border-black/15 px-2 py-1.5 text-xs font-semibold text-black outline-none focus:border-orange-500 disabled:opacity-50"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        u.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled={busyId === u.id}
                      onClick={() =>
                        updateUser(u.id, {
                          status: u.status === "Aktif" ? "Diblokir" : "Aktif",
                        })
                      }
                      className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 disabled:opacity-50"
                    >
                      {u.status === "Aktif" ? "Blokir" : "Aktifkan"}
                    </button>
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
