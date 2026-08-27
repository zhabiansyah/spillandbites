"use client";

import MagneticButton from "@/components/MagneticButton";
import RunningText from "@/components/RunningText";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[80vh] flex-col items-center justify-between overflow-hidden bg-primary pt-20 pb-0 text-center"
    >
      {/* animated blob background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-crispy-yellow/20 blur-[100px]" />
        <div
          className="animate-blob absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-white/15 blur-[110px]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-blob absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crispy-yellow/10 blur-[120px]"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Container Konten Utama (Teks & Tombol) */}
      <div className="relative z-10 my-auto mx-auto flex max-w-3xl flex-col items-center px-6 py-10">
        <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em] text-crispy-yellow">
          Sudah lapar?
        </span>
        <h2 className="font-display text-5xl font-black leading-[0.95] sm:text-6xl md:text-7xl">
          Spill dulu.
          <br />
          <span className="text-crispy-yellow">Gigit sampai habis.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-cream/60">
          Pesan online dan dapatkan Spill Sauce pertamamu gratis. Pengiriman
          tersedia di 6 kota.
        </p>
        <div className="mt-10">
          <MagneticButton>Pesan Sekarang</MagneticButton>
        </div>
      </div>

      {/* RunningText dikeluarkan dari container max-w-3xl agar membentang penuh di dasar section */}
      <div className="relative z-10 w-full">
        <RunningText />
      </div>
    </section>
  );
}