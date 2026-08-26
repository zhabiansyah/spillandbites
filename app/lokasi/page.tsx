import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import InteractiveMap from "@/components/InteractiveMap";

export const metadata: Metadata = {
  title: "Lokasi — Spill & Bites",
  description: "Temukan cabang Spill & Bites terdekat dari kamu.",
};

const LOCATIONS = [
  {
    city: "Jakarta",
    area: "Kemang, Jakarta Selatan",
    hours: "10.00 – 22.00 WIB",
    rating: 4.9,
    mapQuery: "Kemang Jakarta Selatan",
  },
  {
    city: "Bandung",
    area: "Dago, Bandung",
    hours: "10.00 – 22.00 WIB",
    rating: 4.8,
    mapQuery: "Dago Bandung",
  },
  {
    city: "Surabaya",
    area: "Gubeng, Surabaya",
    hours: "10.00 – 21.30 WIB",
    rating: 4.9,
    mapQuery: "Gubeng Surabaya",
  },
  {
    city: "Yogyakarta",
    area: "Sleman, Yogyakarta",
    hours: "10.00 – 21.30 WIB",
    rating: 4.7,
    mapQuery: "Sleman Yogyakarta",
  },
  {
    city: "Medan",
    area: "Petisah, Medan",
    hours: "10.00 – 21.00 WIB",
    rating: 4.8,
    mapQuery: "Petisah Medan",
  },
  {
    city: "Bali",
    area: "Seminyak, Denpasar",
    hours: "10.00 – 22.30 WITA",
    rating: 5.0,
    mapQuery: "Seminyak Denpasar Bali",
  },
];

export default function LokasiPage() {
  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Lokasi"
        title={
          <>
            6 Resto,
            <br />
            <span className="text-secondary">satu rasa spill.</span>
          </>
        }
        description="Spill & Bites sudah hadir di 6 kota. Cek jam operasional, rating, dan peta tiap cabang sebelum berkunjung."
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_8px_30px_rgba(1,45,180,0.06)]"
            >
              <InteractiveMap query={`Spill and Bites ${loc.mapQuery}`} className="h-36 w-full rounded-none border-0" />
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-ink">
                  {loc.city}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{loc.area}</p>
                <div className="mt-5 space-y-3 border-t border-black/5 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Jam Buka</span>
                    <span className="font-semibold text-ink">{loc.hours}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Rating</span>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={loc.rating} size={14} />
                      <span className="font-semibold text-primary">
                        {loc.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Halo, saya mau tanya soal cabang ${loc.city}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-secondary py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
                >
                  💬 Chat Cabang Ini
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
