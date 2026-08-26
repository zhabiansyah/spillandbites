"use client";

import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

const CONTACTS = [
  { label: "Email", value: "hello@spillandbites.com", href: "mailto:hello@spillandbites.com" },
  { label: "WhatsApp", value: "+62 812 3456 7890", href: "https://wa.me/6281234567890" },
  { label: "Instagram", value: "@spillandbites", href: "https://instagram.com" },
  { label: "TikTok", value: "@spillandbites", href: "https://tiktok.com" },
];

export default function KontakPage() {
  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Kontak Kami"
        title={
          <>
            Ada pertanyaan?
            <br />
            <span className="text-secondary">Spill aja.</span>
          </>
        }
        description="Kerja sama, kritik, saran, atau sekadar mau bilang menunya enak — kami senang dengar dari kamu."
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_30px_rgba(1,45,180,0.06)]"
          >
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
                Nama
              </label>
              <input
                type="text"
                required
                placeholder="Nama lengkap kamu"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="kamu@email.com"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
                Pesan
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tulis pesan kamu di sini..."
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none focus:border-primary"
              />
            </div>
            <MagneticButton type="submit" className="justify-center">
              Kirim Pesan
            </MagneticButton>
          </form>

          <div className="flex flex-col justify-between gap-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink">
                Kontak Langsung
              </h3>
              <div className="mt-6 space-y-4">
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm shadow-[0_4px_16px_rgba(1,45,180,0.05)] transition-colors hover:border-primary/40"
                  >
                    <span className="text-ink-soft">{c.label}</span>
                    <span className="font-semibold text-ink">
                      {c.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-primary/5 p-6">
              <h4 className="font-display text-lg font-bold text-ink">
                Jam Layanan Pelanggan
              </h4>
              <p className="mt-2 text-sm text-ink-soft">
                Setiap hari, 09.00 – 21.00 WIB. Respon rata-rata kurang dari
                1 jam di jam kerja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
