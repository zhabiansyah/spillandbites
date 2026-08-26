import MagneticButton from "@/components/MagneticButton";

export default function PromoPoints() {
  return (
    <section className="relative bg-white px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Promo banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#04111D] p-8 text-white sm:p-10">
          <span className="w-fit rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
            Promo Aktif
          </span>
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Diskon 25% Student Promo
          </h3>
          <p className="mt-3 max-w-sm text-white/70">
            Tunjukkan kartu pelajar/mahasiswa aktif dan nikmati potongan
            25% untuk semua menu, Senin–Jumat.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-semibold backdrop-blur-sm">
              Berlaku sampai 31 Des 2026
            </span>
          </div>
          <div className="mt-8">
            <MagneticButton>Lihat Semua Promo</MagneticButton>
          </div>
        </div>

        {/* Loyalty points */}
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_30px_rgba(1,45,180,0.06)] sm:p-10">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            Spill Rewards
          </span>
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Kumpulkan poin, tukar hadiah
          </h3>
          <p className="mt-3 text-ink-soft">
            Setiap transaksi otomatis menambah poin ke akunmu.
          </p>

          <div className="mt-6 space-y-4">
            {[
              { step: "1", text: "Belanja di Spill & Bites, poin otomatis masuk ke akun kamu." },
              { step: "2", text: "Semakin sering spill, semakin cepat poin terkumpul." },
              { step: "3", text: "Tukar poin dengan potongan harga atau menu gratis." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-ink">
                  {s.step}
                </span>
                <p className="pt-1 text-sm text-ink">{s.text}</p>
              </div>
            ))}
          </div>

          <a
            href="/membership"
            data-cursor="pointer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Lihat Paket Membership →
          </a>
        </div>
      </div>
    </section>
  );
}
