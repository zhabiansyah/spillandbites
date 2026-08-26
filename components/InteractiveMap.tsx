export default function InteractiveMap({
  query = "Spill and Bites Kemang Jakarta Selatan",
  className = "",
}: {
  query?: string;
  className?: string;
}) {
  // Embed dasar Google Maps tanpa API key. Untuk marker kustom, rating,
  // dan interaksi lanjutan, ganti dengan Google Maps JavaScript API +
  // API key sendiri.
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/10 ${className}`}
    >
      <iframe
        title={`Peta lokasi ${query}`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 260 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
