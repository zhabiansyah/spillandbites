import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import BirthdayBookingForm from "@/components/BirthdayBookingForm";

export const metadata: Metadata = {
  title: "Menu — Spill & Bites",
  description:
    "Menu lengkap Spill & Bites: Boneless Chicken, Signature, Stacker Burger, Ala Carte, Combo, Llips Coffee, dan Dessert.",
};

type Item = {
  name: string;
  desc: string;
  price: string;
  tag?: string;
  gradient: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  note?: string;
  items: Item[];
};

// Foto produk menyusul — kartu di bawah ini sengaja pakai placeholder
// gradient dulu. Ganti field `gradient` dengan foto asli (next/image)
// begitu asetnya siap, tanpa perlu ubah data lain.
const CATEGORIES: Category[] = [
  {
    id: "boneless",
    title: "Boneless Chicken",
    subtitle: "Stay Cool! — Pedas tanpa tulang",
    note: "Tambah on regular coffee apa saja +15K",
    items: [
      {
        name: "Spill Boneless Fried Chicken",
        desc: "Spill Boneless Chicken + Nasi + Spill Blue/Peach Tea + pilih saus: Spill / Garlic / Rendang / Sambal Seblak.",
        price: "38K Original / 43K Spicy",
        tag: "Best Choice",
        gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Spill Boneless Spicy",
        desc: "Spill Boneless Spicy Chicken + Nasi + Spill Blue/Peach Tea + pilih saus: Spill / Garlic / Sambal Seblak.",
        price: "43K",
        tag: "New",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Boneless Chicken Rendang Sauce",
        desc: "Spill Boneless Chicken + Nasi + Spill Blue/Peach Tea + Rendang Sauce. Membara dalam mulut!",
        price: "38K",
        tag: "New Menu",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Boneless Chicken Seblak Sauce",
        desc: "Spill Boneless Chicken + Nasi + Spill Blue/Peach Tea + Sambal Seblak khas Nusantara.",
        price: "38K",
        tag: "New Menu",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Chicky Bites — Spill Sauce",
        desc: "Potongan chicky bites disiram Spill Sauce. Tambah pedas +5K.",
        price: "28K",
        tag: "Best Choice",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "Chicky Bites — Rendang Sauce",
        desc: "Potongan chicky bites disiram Rendang Sauce. Tambah pedas +5K.",
        price: "28K",
        tag: "New",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Chicky Bites — Garlic Sauce",
        desc: "Potongan chicky bites disiram Garlic Sauce creamy. Tambah pedas +5K.",
        price: "28K",
        tag: "New",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Chicky Bites — Seblak Sauce",
        desc: "Potongan chicky bites disiram Sambal Seblak. Tambah pedas +5K.",
        price: "28K",
        tag: "Best Choice",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
    ],
  },
  {
    id: "signature",
    title: "Our Signature",
    subtitle: "Yang bikin Spill & Bites dikenal",
    note: "Tambah on regular coffee apa saja +15K",
    items: [
      {
        name: "Signature Fried Chicken",
        desc: "Large Fried Chicken Ori/Spicy + Nasi + Signature Sauce + White Sauce + Peach Tea/Spill Blue. Pilih saus: Spill (Best Choice), Hanoi, atau Garlic (Best Choice).",
        price: "38K Ori / 40K Spicy",
        tag: "Hot",
        gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Signature Burger",
        desc: "Burger Beef/Chicken + French Fries + Signature Sauce + Peach Tea/Spill Blue. Pilih saus: Spill (Best Choice) atau White.",
        price: "40K / 44K Beef",
        tag: "Best Choice",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
    ],
  },
  {
    id: "stacker",
    title: "Stacker Burger",
    subtitle: "Gak cukup satu gigitan! — Juicy & crispy in every bite",
    items: [
      {
        name: "Pickle Sauce Ori Stacker Burger",
        desc: "Crispy Chicken + Lettuce + Pickle Sauce. Regular atau Jumbo +8K.",
        price: "32K",
        tag: "Best Choice",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Spill Sauce Ori Stacker Burger",
        desc: "Crispy Chicken + Lettuce + Spill Sauce pedas. Regular atau Jumbo +8K.",
        price: "32K",
        tag: "Rating 5★",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Add On — French Fries",
        desc: "Tambahan kentang goreng untuk paket burger kamu.",
        price: "+10K",
        gradient: "from-[#0C3EAA] to-[#04111D]",
      },
      {
        name: "Add On — Peach Tea",
        desc: "Minuman segar pelengkap burger.",
        price: "+8K",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
      {
        name: "Add On — Fried Enoki",
        desc: "Jamur enoki crispy, tambahan renyah untuk burger set.",
        price: "+16.2K",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
    ],
  },
  {
    id: "combo",
    title: "Hepi Hemat & Combo",
    subtitle: "Enak gak harus mahal!",
    note: "Upgrade size ayam +3.9K. Tambah on regular coffee apa saja +15K.",
    items: [
      {
        name: "Hehe 1",
        desc: "Fried Chicken Small Ori/Spicy + Nasi + Peach Tea. Gratis saus extra hot.",
        price: "32K / 34K Spicy",
        gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Hehe 2",
        desc: "Chicken Burger + French Fries + Peach Tea. Gratis saus extra hot.",
        price: "40K / 44K Beef",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Spill Combo 1",
        desc: "Fried Chicken Ori/Spicy + Nasi + PomPom + Spill Blue + White Sauce.",
        price: "42K / 44K Spicy",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Spill Combo 2",
        desc: "Beef/Chicken Burger + French Fries + Crispy Chicken Skin + Spill Blue + White Sauce.",
        price: "45K / 49K Beef",
        gradient: "from-[#0C3EAA] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Spill Platters",
        desc: "Crispy Enoki + Chicken Pop Corn + Tortilla Chips + Garlic Sauce/Spill Sauce.",
        price: "17.9K",
        tag: "New Menu",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "Selera Nusantara 1",
        desc: "2 Boneless Chicken + 2 Nasi + 2 Seblak Sauce + 2 Rendang Sauce + 2 Peach Tea + Free Cream Soup. Cocok untuk berdua.",
        price: "67.9K (dari 124K)",
        tag: "Promo",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
    ],
  },
  {
    id: "alacarte",
    title: "Ala Carte",
    subtitle: "Pick your faves!",
    items: [
      {
        name: "Crispy Fried Chicken — Thigh",
        desc: "Potongan paha ayam goreng crispy.",
        price: "19K / 21K Spicy",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "Crispy Fried Chicken — Wing",
        desc: "Potongan sayap ayam goreng crispy.",
        price: "13K / 15K Spicy",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Crispy Fried Chicken — Drumstick",
        desc: "Potongan paha bawah ayam goreng crispy.",
        price: "13K / 15K Spicy",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
      {
        name: "Crispy Fried Chicken — Rib",
        desc: "Potongan dada ayam goreng crispy.",
        price: "19K / 21K Spicy",
        gradient: "from-[#0C3EAA] to-[#04111D]",
      },
      {
        name: "Beef Patty Burger",
        desc: "Beef Patty Burger + Pickle Sauce.",
        price: "38K",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Chicken Patty Burger",
        desc: "Chicken Patty Burger + Pickle Sauce.",
        price: "34K",
        gradient: "from-[#FF9900] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Spill Cream Soup",
        desc: "Creamy cream soup dengan potongan ayam. Gurih dan creamy.",
        price: "15K",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Spill Bowl — Garlic Sauce",
        desc: "Nasi + ayam crispy + Garlic Sauce creamy. Wangi dan gurih nendang.",
        price: "24.9K",
        tag: "New",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
      {
        name: "Spill Bowl — Hanoi Sauce",
        desc: "Nasi + ayam crispy + Hanoi Sauce, rasa khas Vietnam gurih-manis.",
        price: "24.9K",
        tag: "New",
        gradient: "from-[#0C3EAA] to-[#04111D]",
      },
      {
        name: "Spill Bowl — Seblak Sauce",
        desc: "Nasi + ayam crispy + Sambal Seblak, pedas gurih ala Indonesia.",
        price: "24.9K",
        tag: "New",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Nasi",
        desc: "Porsi nasi putih hangat.",
        price: "8K",
        gradient: "from-[#FFFFFF]/15 via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Crispy Chicken Skin",
        desc: "Kulit ayam crispy, cocok jadi teman makan atau camilan.",
        price: "15K",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "PomPom",
        desc: "Nugget ayam pom-pom, gurih dan renyah.",
        price: "15K",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "French Fries",
        desc: "Kentang goreng renyah porsi ala carte.",
        price: "18K",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
    ],
  },
  {
    id: "saus",
    title: "Saus Tambahan",
    subtitle: "Kunci yang bikin makan makin nikmat",
    items: [
      {
        name: "Spill Sauce",
        desc: "Saus signature andalan, pedas manis.",
        price: "5K",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Garlic Sauce",
        desc: "Saus bawang putih creamy.",
        price: "5K – 8K",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
      {
        name: "Hanoi Sauce",
        desc: "Saus khas Vietnam, gurih dan sedikit manis.",
        price: "5K",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "White Sauce",
        desc: "Saus creamy putih, netral dan lembut.",
        price: "5K",
        gradient: "from-[#FFFFFF]/15 via-[#0B2A4A] to-[#04111D]",
      },
    ],
  },
  {
    id: "coffee",
    title: "Llips Coffee",
    subtitle: "Signature — teman ngopi santai",
    items: [
      {
        name: "Ice Llips Caramel Creamy Latte",
        desc: "Latte creamy dengan karamel signature Llips.",
        price: "29.9K (M) / 35.9K (L)",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Gula Aren Coffee",
        desc: "Kopi susu dengan gula aren khas.",
        price: "24K (M) / 28K (L)",
        gradient: "from-[#FF9900] to-[#04111D]",
      },
      {
        name: "Butterscotch Coffee",
        desc: "Kopi dengan sentuhan manis butterscotch.",
        price: "24K (M) / 28K (L)",
        gradient: "from-[#0C3EAA] to-[#04111D]",
      },
      {
        name: "Cappuccino",
        desc: "Espresso dengan foam susu lembut.",
        price: "29.9K (M) / 35.9K (L)",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Ice Llips Coffee",
        desc: "Kopi susu signature Llips Coffee, dingin dan segar.",
        price: "29.9K (M) / 35.9K (L)",
        gradient: "from-[#0C3EAA] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Seasalt Coffee",
        desc: "Kopi dengan foam seasalt creamy asin-manis.",
        price: "24K (M) / 28K (L)",
        gradient: "from-[#3FA9F5] to-[#04111D]",
      },
      {
        name: "Americano",
        desc: "Espresso hitam murni, klasik dan tegas.",
        price: "19K (M) / 22K (L)",
        gradient: "from-[#081C2E] to-[#04111D]",
      },
      {
        name: "Espresso Shot",
        desc: "Shot espresso pekat untuk penikmat kopi sejati.",
        price: "16K",
        gradient: "from-[#04111D] to-[#000000]/40",
      },
    ],
  },
  {
    id: "dessert",
    title: "Dessert & Pastry",
    subtitle: "Manis penutup yang wajib dicoba",
    items: [
      {
        name: "Spill Burn Original Cheesecake",
        desc: "Burnt cheesecake original, lembut dan legit.",
        price: "26K",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Spill Burn Chocolate Cheesecake",
        desc: "Burnt cheesecake dengan lapisan cokelat.",
        price: "26K",
        gradient: "from-[#7A1F17] via-[#3A1210] to-[#04111D]",
      },
      {
        name: "Spill Burn Blueberry Cheesecake",
        desc: "Burnt cheesecake dengan topping blueberry.",
        price: "26K",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Spill Burn Matcha Cheesecake",
        desc: "Burnt cheesecake rasa matcha yang creamy.",
        price: "26K",
        gradient: "from-[#3FA936] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Matcha Burn Cheesecake",
        desc: "Varian matcha spesial, tersedia di seluruh cabang Spill & Bites.",
        price: "25.85K",
        tag: "New Menu",
        gradient: "from-[#3FA936] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Croissant Sweet Almond",
        desc: "Croissant dengan topping almond manis.",
        price: "25K",
        gradient: "from-[#FFD27A] via-[#FF9900] to-[#04111D]",
      },
      {
        name: "Croissant Nut Chocolate",
        desc: "Croissant dengan lelehan cokelat dan kacang.",
        price: "25K",
        gradient: "from-[#7A1F17] via-[#3A1210] to-[#04111D]",
      },
      {
        name: "Strawberry Entreme",
        desc: "Kue entremet lapisan strawberry.",
        price: "22K",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Spill Sour Sweet Entreme",
        desc: "Kue entremet rasa manis-asam signature.",
        price: "22K",
        gradient: "from-[#3FA9F5] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Blueberry Entreme",
        desc: "Kue entremet lapisan blueberry ungu.",
        price: "22K",
        gradient: "from-[#0C3EAA] via-[#081C2E] to-[#04111D]",
      },
      {
        name: "Belgium Chocolate Entreme",
        desc: "Kue entremet cokelat Belgia premium.",
        price: "22K",
        gradient: "from-[#7A1F17] via-[#3A1210] to-[#04111D]",
      },
    ],
  },
  {
    id: "drinks",
    title: "Flavour Drinks",
    subtitle: "Segar, manis, bikin nagih — tersedia Hot/Ice",
    items: [
      {
        name: "Matcha",
        desc: "Minuman matcha creamy, tersedia hot atau ice.",
        price: "23.9K (M) / 25.9K (L)",
        gradient: "from-[#3FA936] via-[#0B2A4A] to-[#04111D]",
      },
      {
        name: "Red Velvet",
        desc: "Minuman red velvet creamy, tersedia hot atau ice.",
        price: "23.9K (M) / 25.9K (L)",
        gradient: "from-[#E4392B] via-[#7A1F17] to-[#04111D]",
      },
      {
        name: "Spill Chocolate Signature",
        desc: "Cokelat signature yang menenangkan hati, tersedia hot atau ice.",
        price: "25.09K (M) / 27.09K (L)",
        tag: "New Menu",
        gradient: "from-[#7A1F17] via-[#3A1210] to-[#04111D]",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="relative bg-white">
      <PageHero
        eyebrow="Menu Lengkap"
        title={
          <>
            Semua yang
            <br />
            <span className="text-crispy-yellow">bisa kamu spill.</span>
          </>
        }
        description="Dari boneless chicken andalan sampai dessert manis — ini daftar lengkap menu Spill & Bites, sesuai papan menu terbaru 2026."
      />

      {/* quick category nav */}
      <div className="sticky top-[76px] z-30 border-b border-black/5 bg-white/90 px-6 backdrop-blur-md md:px-16">
        <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto py-4 text-sm font-semibold uppercase tracking-widest text-ink-soft [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 whitespace-nowrap transition-colors hover:text-primary"
            >
              {c.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24">
          {CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
                {cat.subtitle}
              </span>
              <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
                {cat.title}
              </h2>
              {cat.note && (
                <p className="mt-2 text-sm text-ink-soft">{cat.note}</p>
              )}

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className={`group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 ${item.gradient}`}
                  >
                    {item.tag && (
                      <span className="w-fit rounded-full bg-spill-blue-deep/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                        {item.tag}
                      </span>
                    )}
                    <div className="mt-auto">
                      <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-cream/70">
                        {item.desc}
                      </p>
                      <p className="mt-3 font-semibold text-cream drop-shadow-[0_1px_3px_rgba(4,17,29,0.6)]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Event package — bukan menu harian, jadi ditaruh terpisah */}
          <section id="birthday" className="scroll-mt-32">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Best Gift For You
            </span>
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Paket Spill Birthday
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Sudah termasuk speaker, MIC & perlengkapan audio, dekorasi
              ulang tahun, ruangan VIP luas, dan undangan digital.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(1,45,180,0.06)]">
                <h3 className="font-display text-xl font-bold text-ink">
                  Spill Kids 1
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  1 Crispy Fried Chicken + 1 Nasi/FF + 1 Spill Blue + 1
                  White Creamy per anak.
                </p>
                <p className="mt-3 font-semibold text-primary">
                  370Rb / 10 anak
                </p>
              </div>
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(1,45,180,0.06)]">
                <h3 className="font-display text-xl font-bold text-ink">
                  Spill Kids 2
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  1 Chicken Burger + 1 French Fries/Nasi + 1 Spill Blue + 1
                  White Creamy per anak.
                </p>
                <p className="mt-3 font-semibold text-primary">
                  470Rb / 10 anak
                </p>
              </div>
            </div>

            <div className="mt-6">
              <BirthdayBookingForm />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
