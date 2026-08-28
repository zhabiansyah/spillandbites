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
    <div className="flex min-h-screen w-full bg-white">
      {/* Kolom Kiri: Form Login */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 md:px-24 lg:w-1/2 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="mb-10">
            {/* PATH UBAH KE /logo.png */}
            <Image
              src="/Asset/logo.png"
              alt="Spill & Bites"
              width={160}
              height={64}
              className="h-10 w-auto" 
            />
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            Selamat Datang!
          </h1>
          <p className="mb-8 text-sm text-gray-500">
            Silakan masukkan detail akun admin Anda untuk masuk ke sistem.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spillandbites.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {error && (
              <p className="mb-4 text-sm font-medium text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-orange-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Kolom Kanan: Gambar & Testimoni */}
      <div className="hidden w-full p-4 lg:block lg:w-1/2">
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-zinc-900">
          {/* PATH UBAH KE /toko1.png */}
          <Image
            src="/Asset/toko1.jpg"
            alt="Background"
            fill
            className="object-cover opacity-70"
          />

          {/* Testimonial Overlay */}
          <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-12">
            {/* Indikator Slider */}
            <div className="mb-6 flex gap-2">
              <div className="h-1.5 w-6 rounded-full bg-white"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
            </div>
            <p className="mb-6 max-w-lg text-lg font-medium leading-relaxed text-white">
              "Sistem manajemen ini sangat membantu operasional restoran. Semuanya menjadi lebih cepat, akurat, dan mudah dipantau dari mana saja."
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Admin Utama</p>
                <p className="text-sm text-white/70">Spill & Bites</p>
              </div>
              <div className="flex gap-4">
                <span className="cursor-pointer text-white/70 hover:text-white">←</span>
                <span className="cursor-pointer text-white/70 hover:text-white">→</span>
              </div>
            </div>
          </div>
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