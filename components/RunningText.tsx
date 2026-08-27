import Image from "next/image";

type Platform = {
  name: string;
  src: string;
};

const PLATFORMS: Platform[] = [
  { name: "GoFood", src: "/logos/gofood.png" },
  { name: "GrabFood", src: "/logos/grabfood.png" },
  { name: "ShopeeFood", src: "/logos/shopefood.png" },
  { name: "QPON", src: "/logos/qpon.png" },
  { name: "TiktokGo", src: "/logos/tiktokgo.png" },
];

export default function RunningText() {
  // Kita gandakan item agar cukup panjang untuk layar ultrawide sekalipun
  const baseItems = [...PLATFORMS, ...PLATFORMS];

  return (
    <div className="relative w-full overflow-hidden bg-crispy-yellow py-4">
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-spill-blue-deep/70">
        Tersedia di
      </p>

      {/* Container utama dibuat flex agar track 1 dan track 2 bisa berjejer */}
      <div className="group flex overflow-hidden">
        
        {/* Track 1: Set Pertama */}
        {/* Tambahkan pr-12 (padding-right) agar jarak antar track sama dengan gap-12 */}
        <div className="animate-marquee flex w-max shrink-0 items-center gap-12 pr-12 py-1">
          {baseItems.map((p, i) => (
            <span
              key={`track1-${p.name}-${i}`}
              className="flex h-14 w-36 shrink-0 items-center justify-center opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={140}
                height={56}
                className="h-full w-auto object-contain"
              />
            </span>
          ))}
        </div>

        {/* Track 2: Bayangan/Duplikat untuk efek seamless */}
        <div aria-hidden="true" className="animate-marquee flex w-max shrink-0 items-center gap-12 pr-12 py-1">
          {baseItems.map((p, i) => (
            <span
              key={`track2-${p.name}-${i}`}
              className="flex h-14 w-36 shrink-0 items-center justify-center opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={140}
                height={56}
                className="h-full w-auto object-contain"
              />
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}