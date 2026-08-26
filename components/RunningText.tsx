import Image from "next/image";

type Platform = {
  name: string;
  src: string;
};

const PLATFORMS: Platform[] = [
  { name: "GoFood", src: "/logos/gofood.png" },
  { name: "GrabFood", src: "/logos/grabfood.png" },
  { name: "ShopeeFood", src: "/logos/shopeefood.png" },
  { name: "Traveloka Eats", src: "/logos/travelokaeats.png" },
  { name: "Maxim Food", src: "/logos/maximfood.png" },
  { name: "Website Resmi", src: "/logos/website.png" },
];

export default function RunningText() {
  const loopItems = [...PLATFORMS, ...PLATFORMS];

  return (
    // Background diubah menjadi bg-crispy-yellow
    <div className="relative w-full overflow-hidden bg-crispy-yellow py-4">
      {/* Warna teks disesuaikan ke biru gelap (spill-blue-deep) agar kontras di atas warna kuning */}
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-spill-blue-deep/70">
        Tersedia di
      </p>

      <div className="relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12 py-1">
          {loopItems.map((p, i) => (
            <span
              key={`${p.name}-${i}`}
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