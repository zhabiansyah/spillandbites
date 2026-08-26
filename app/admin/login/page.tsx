"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login gagal.");
        setLoading(false);
        return;
      }
      const next = params.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/spill-bites-logo.png"
            alt="Spill & Bites"
            width={200}
            height={80}
            className="h-10 w-auto brightness-0"
          />
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-orange-600">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/60">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@spillandbites.com"
              className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
            />
          </div>
          <div className="mb-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/60">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange-600 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-black/[0.03] p-4 text-xs text-black/50">
          <p className="font-semibold text-black/70">Akun demo:</p>
          <p className="mt-1">Admin: admin@spillandbites.com / admin123</p>
          <p>SuperAdmin: superadmin@spillandbites.com / super123</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
