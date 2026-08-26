const COLORS: Record<string, string> = {
  Baru: "bg-blue-100 text-blue-700",
  Diproses: "bg-amber-100 text-amber-700",
  Selesai: "bg-green-100 text-green-700",
  "Menunggu Konfirmasi": "bg-amber-100 text-amber-700",
  Dikonfirmasi: "bg-green-100 text-green-700",
  Dibatalkan: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
  Published: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
        COLORS[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
