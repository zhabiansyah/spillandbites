import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import RatingStars from "@/components/RatingStars";

export const metadata: Metadata = {
  title: "Membership — Spill & Bites",
  description: "Gabung Spill Rewards dan nikmati benefit khusus member.",
};

const TIERS = [
  {
    name: "Spill Starter",
    price: "Gratis",
    highlight: false,
    perks: [
      "Poin 1x dari setiap transaksi",
      "Akses info promo mingguan",
      "Ucapan spesial saat ulang tahun",
    ],
  },
  {
    name: "Spill Gold",
    price: "Rp 25.000/bulan",
    highlight: true,
    perks: [
      "Poin 2x dari setiap transaksi",
      "Cashback 15% otomatis",
      "Gratis ongkir untuk 4x order/bulan",
      "Akses early bird menu baru",
    ],
  },
  {
    name: "Spill Elite",
    price: "Rp 60.000/bulan",
    highlight: false,
    perks: [
      "Poin 3x dari setiap transaksi",
      "Cashback 20% otomatis",
      "Gratis ongkir tanpa batas",
      "Undangan tasting menu eksklusif",
    ],
  },
];

export default function MembershipPage() {
  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Membership"
        title={
          <>
            Spill <span className="text-crispy-yellow">Rewards</span>
          </>
        }
        description="Makin sering spill, makin banyak untungnya. Pilih paket membership yang cocok buat kebiasaan makan kamu."
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.highlight
                  ? "border-secondary bg-secondary/5 shadow-[0_8px_40px_rgba(255,196,0,0.2)]"
                  : "border-black/5 bg-white shadow-[0_8px_30px_rgba(1,45,180,0.06)]"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                  Paling Populer
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-ink">{tier.name}</h3>
              <p className="mt-2 font-display text-3xl font-extrabold text-primary">
                {tier.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-soft">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
              <MagneticButton className="mt-8 w-full justify-center">
                Pilih Paket
              </MagneticButton>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-3 rounded-3xl border border-black/5 bg-primary/5 p-8 text-center">
          <RatingStars rating={4.9} size={22} />
          <p className="font-display text-lg font-bold text-ink">
            4.9 dari 5 — dipercaya ribuan member Spill Rewards
          </p>
          <p className="max-w-md text-sm text-ink-soft">
            Rating rata-rata dari ulasan member aktif di seluruh cabang Spill
            &amp; Bites.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
