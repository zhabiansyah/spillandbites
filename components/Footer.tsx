import Image from "next/image";
import InteractiveMap from "@/components/InteractiveMap";

const HOURS = [
  { day: "Senin – Jumat", time: "10.00 – 22.00" },
  { day: "Sabtu – Minggu", time: "10.00 – 22.30" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 bg-white px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/spill-bites-logo.png"
            alt="Spill & Bites"
            width={220}
            height={88}
            className="h-30 w-auto brightness-0"
          />
          <p className="mt-1 text-xs uppercase tracking-[0.7em] text-ink-soft/70">
            PT. Royal Inti Nusa
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-soft">
            Neo-fast-food, digelontor keju tiap hari. 6 resto dan terus
            bertambah.
          </p>

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
              🕒 Jam Operasional
            </p>
            <ul className="space-y-1 text-sm text-ink">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-ink-soft">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            💬 Chat WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ink-soft">
              Jelajahi
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="/menu" className="hover:text-primary">Menu</a></li>
              <li><a href="/promo" className="hover:text-primary">Promo</a></li>
              <li><a href="/membership" className="hover:text-primary">Membership</a></li>
              <li><a href="/lokasi" className="hover:text-primary">Lokasi</a></li>
              <li><a href="/reservasi" className="hover:text-primary">Reservasi</a></li>
              <li><a href="/#about" className="hover:text-primary">Tentang</a></li>
              <li><a href="/#testimonials" className="hover:text-primary">Ulasan</a></li>
              <li><a href="/#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ink-soft">
              Kontak
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="/kontak" className="hover:text-primary">Halaman Kontak</a></li>
              <li><a href="mailto:hello@spillandbites.com" className="hover:text-primary">hello@spillandbites.com</a></li>
              <li>+62 812 3456 7890</li>
              <li className="pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
              </li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-primary">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ink-soft">
            Cabang Terdekat
          </p>
          <InteractiveMap className="h-48 w-full" />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-ink-soft sm:flex-row">
        <p>© {new Date().getFullYear()} Spill &amp; Bites. Seluruh hak cipta dilindungi.</p>
        <p>Dibuat untuk konten kamu.</p>
      </div>
    </footer>
  );
}
