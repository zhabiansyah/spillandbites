import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Promo — Spill & Bites",
  description: "Promo dan penawaran spesial dari Spill & Bites.",
};

const PROMOS = [
  {
    tag: "Pelajar",
    title: "Diskon 25% Student Promo",
    desc: "Tunjukkan kartu pelajar/mahasiswa aktif dan nikmati potongan 25% untuk semua menu, setiap hari Senin–Jumat.",
    code: "SPILLSTUDENT",
    gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
  },
  {
    tag: "Bundling",
    title: "Paket Berdua Hemat 20%",
    desc: "Pesan 2 menu ayam + 2 minuman dalam satu transaksi, otomatis dapat potongan 20% dari total belanja.",
    code: "BERDUA20",
    gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
  },
  {
    tag: "Member",
    title: "Cashback 15% untuk Member",
    desc: "Khusus member Spill Rewards, dapatkan cashback poin 15% dari setiap transaksi yang bisa ditukar menu gratis.",
    code: "OTOMATIS",
    gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
  },
  {
    tag: "Weekday",
    title: "Jam Ngantor Diskon 10%",
    desc: "Order antara pukul 11.00–14.00 WIB dan dapatkan potongan langsung 10% untuk semua pesanan take away.",
    code: "NGANTOR10",
    gradient: "from-[#0C3EAA] via-[#081C2E] to-[#04111D]",
  },
];

export default function PromoPage() {
  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Promo"
        title={
          <>
            Lagi ada
            <br />
            <span className="text-crispy-yellow">diskon apa?</span>
          </>
        }
        description="Kumpulan promo aktif Spill & Bites bulan ini. Tinggal pilih, tunjukkan syaratnya di kasir atau masukkan kode saat checkout online."
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {PROMOS.map((p) => (
            <div
              key={p.title}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 ${p.gradient}`}
            >
              <span className="w-fit rounded-full bg-spill-blue-deep/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                {p.tag}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-cream/80">{p.desc}</p>
              <div className="mt-6 flex items-center justify-between border-t border-cream/15 pt-4">
                <span className="text-xs uppercase tracking-widest text-cream/50">
                  Kode
                </span>
                <span className="font-mono text-sm font-bold text-crispy-yellow">
                  {p.code}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border border-black/5 bg-primary/5 p-8 text-center shadow-[0_8px_30px_rgba(1,45,180,0.06)] sm:flex-row sm:text-left">
          <div>
            <h4 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Jangan lewatkan promo berikutnya
            </h4>
            <p className="mt-2 text-sm text-ink-soft">
              Gabung Spill Rewards untuk notifikasi promo eksklusif langsung
              ke HP kamu.
            </p>
          </div>
          <MagneticButton className="shrink-0">Gabung Sekarang</MagneticButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
